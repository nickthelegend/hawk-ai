import { NextResponse } from "next/server"
import Together from "together-ai"
import { Resend } from "resend"
import { marked } from "marked"

const together = new Together({ apiKey: "a555dbd37d35a11f45a8072266ec2ad2be13292f4d626639b6e045d895889521" })
const resend = new Resend("re_Y5XGK88G_ESowsegHxLe3LYKMY3R9xMdc")

function generateEmailTemplate(content: string) {
  // Parse the markdown content
  const htmlContent = marked(content)

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Log Monitoring Report</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .email-container {
          max-width: 800px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #007BFF;
          color: #ffffff;
          padding: 30px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 32px;
          font-weight: bold;
        }
        .content {
          padding: 40px;
        }
        h2 {
          color: #2c3e50;
          font-size: 24px;
          margin-top: 0;
          margin-bottom: 20px;
        }
        h3 {
          color: #2c3e50;
          font-size: 20px;
          margin-top: 30px;
          margin-bottom: 15px;
        }
        ul, ol {
          padding-left: 20px;
          margin-bottom: 20px;
        }
        li {
          margin-bottom: 8px;
        }
        p {
          margin: 0 0 15px;
        }
        .footer {
          background-color: #f8f9fa;
          padding: 20px;
          text-align: center;
          font-size: 14px;
          color: #666;
          border-top: 1px solid #eee;
        }
        code {
          background-color: #f4f4f4;
          padding: 2px 4px;
          border-radius: 4px;
          font-family: monospace;
        }
        pre {
          background-color: #f4f4f4;
          padding: 15px;
          border-radius: 4px;
          overflow-x: auto;
          margin: 15px 0;
        }
        blockquote {
          border-left: 4px solid #007BFF;
          margin: 0 0 20px;
          padding: 10px 20px;
          background-color: #f8f9fa;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>Log Monitoring Report</h1>
        </div>
        <div class="content">
          ${htmlContent}
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} HawkAI. All rights reserved.</p>
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
            "You are an assistant tasked with summarizing tables and text. Give a concise summary of the table or text.\n\nObjective: Analyze a text containing Windows logs or related security events and detect vulnerabilities, risks, and insights.\nInstructions for the system:\n\nLog Identification:\n\nExtract critical event details such as login times, logoff times, failed login attempts, warnings, and errors.\nDetect specific Event IDs (e.g., 4624 for login, 4634 for logoff, 4625 for failed login attempts).\nRisk Analysis:\n\nIdentify potential vulnerabilities, including:\nUnauthorized access attempts.\nRepeated failed login attempts (indicating a brute force attack).\nLogin anomalies such as unusual login times or locations.\nFlag warnings or errors that could indicate system or application vulnerabilities.\nSeverity Categorization:\n\nClassify detected events into categories:\nCritical: Immediate action required (e.g., multiple failed logins or unauthorized access).\nWarning: Potential risks that need monitoring (e.g., unexpected login hours).\nInformational: General activity logs (e.g., regular logins/logoffs).\nActionable Insights:\n\nProvide recommendations to mitigate identified risks.\nHighlight any suspicious patterns or activities in plain language.\nOutput Format:\n\n## Analysis Summary\n\n*Summary of Detected Vulnerabilities and Risks:\n- Critical Risks:\n  1. [Description of risk with relevant details]\n  2. [Description of risk with relevant details]\n- Warnings:\n  1. [Description of warning with relevant details]\n- Informational:\n  1. [Details of regular user activity or other logs]\n\n## Recommendations\n- [Mitigation recommendation 1]\n- [Mitigation recommendation 2]",
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
    const emailHtml = generateEmailTemplate(analysis)
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

