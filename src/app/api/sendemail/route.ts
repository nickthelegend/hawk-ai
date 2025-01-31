import { NextResponse } from "next/server"
import Together from "together-ai"
import { Resend } from "resend"

const together = new Together({ apiKey: "a555dbd37d35a11f45a8072266ec2ad2be13292f4d626639b6e045d895889521" })
const resend = new Resend("re_Y5XGK88G_ESowsegHxLe3LYKMY3R9xMdc")

function generateEmailTemplate(stats: any) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Log Monitoring Report</title>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 0; }
        .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden; }
        .header { background-color: #007bff; color: #ffffff; padding: 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 20px; }
        .statistics { display: flex; justify-content: space-between; margin-bottom: 20px; }
        .stat-box { background-color: #f8f9fa; border: 1px solid #ddd; border-radius: 8px; padding: 15px; text-align: center; flex: 1; margin: 0 10px; }
        .stat-box h2 { margin: 0; font-size: 18px; color: #007bff; }
        .stat-box p { margin: 5px 0 0; font-size: 24px; font-weight: bold; color: #333; }
        .footer { background-color: #f8f9fa; padding: 10px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>Log Monitoring Report</h1>
        </div>
        <div class="content">
          <h2>Analysis Summary</h2>
          <p>${stats.summary}</p>
          <h3>Recommendations</h3>
          <p>${stats.recommendations}</p>
        </div>
        <div class="footer">
          <p>&copy; 2023 Your Company. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export async function POST(req: Request) {
  try {
    const { email, jsonData } = await req.json()

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 })
    }

    if (!jsonData || Object.keys(jsonData).length === 0) {
      return NextResponse.json({ success: false, error: "JSON data is empty" }, { status: 400 })
    }

    // Process the JSON data with DeepSeek
    const response = await together.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an assistant tasked with summarizing tables and text. Give a concise summary of the table or text.\n\nObjective: Analyze a text containing Windows logs or related security events and detect vulnerabilities, risks, and insights.\nInstructions for the system:\n\nLog Identification:\n\nExtract critical event details such as login times, logoff times, failed login attempts, warnings, and errors.\nDetect specific Event IDs (e.g., 4624 for login, 4634 for logoff, 4625 for failed login attempts).\nRisk Analysis:\n\nIdentify potential vulnerabilities, including:\nUnauthorized access attempts.\nRepeated failed login attempts (indicating a brute force attack).\nLogin anomalies such as unusual login times or locations.\nFlag warnings or errors that could indicate system or application vulnerabilities.\nSeverity Categorization:\n\nClassify detected events into categories:\nCritical: Immediate action required (e.g., multiple failed logins or unauthorized access).\nWarning: Potential risks that need monitoring (e.g., unexpected login hours).\nInformational: General activity logs (e.g., regular logins/logoffs).\nActionable Insights:\n\nProvide recommendations to mitigate identified risks.\nHighlight any suspicious patterns or activities in plain language.\nOutput Format:\n\nSummarize findings in the following format\n\n*Summary of Detected Vulnerabilities and Risks:\n- Critical Risks:\n  1. [Description of risk with relevant details]\n  2. [Description of risk with relevant details]\n- Warnings:\n  1. [Description of warning with relevant details]\n- Informational:\n  1. [Details of regular user activity or other logs]\n\n*Recommendations:\n- [Mitigation recommendation 1]\n- [Mitigation recommendation 2]",
        },
        {
          role: "user",
          content: JSON.stringify(jsonData),
        },
      ],
      model: "deepseek-ai/DeepSeek-V3",
      max_tokens: 512,
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      repetition_penalty: 1,
      stop: ["<｜end of sentence｜>"],
    })

    const analysis = response.choices[0]?.message?.content || "No analysis available."

    const stats = {
      summary: analysis.split("*Recommendations:")[0],
      recommendations: analysis.split("*Recommendations:")[1] || "No specific recommendations.",
    }

    // Add the email to the audience
    try {
      await resend.contacts.create({
        email: email,
        firstName: "",
        lastName: "",
        unsubscribed: false,
        audienceId: "1b2d8704-0b98-4e0b-816a-7899c9603eac",
      })
    } catch (error) {
      console.error("Error adding contact to audience:", error)
      // Continue with sending email even if adding to audience fails
    }

    // Generate and send the email
    const emailHtml = generateEmailTemplate(stats)
    const emailResponse = await resend.emails.send({
      from: "admin@nickthelegend.tech",
      to: email,
      subject: "Log Monitoring Report - Security Analysis",
      html: emailHtml,
    })

    return NextResponse.json({ success: true, data: emailResponse })
  } catch (error) {
    console.error("Error in sendemail route:", error)
    return NextResponse.json({ success: false, error: "Failed to process your request" }, { status: 500 })
  }
}

