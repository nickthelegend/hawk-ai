import { NextResponse } from 'next/server';
import Together from "together-ai";

const together = new Together({ apiKey: 'a555dbd37d35a11f45a8072266ec2ad2be13292f4d626639b6e045d895889521' });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await together.chat.completions.create({
      messages: [
        {
          "role": "system",
          "content": "You are an assistant tasked with summarizing tables and text. Give a concise summary of the table or text.\n\nObjective: Analyze a text containing Windows logs or related security events and detect vulnerabilities, risks, and insights.\nInstructions for the system:\n\nLog Identification:\n\nExtract critical event details such as login times, logoff times, failed login attempts, warnings, and errors.\nDetect specific Event IDs (e.g., 4624 for login, 4634 for logoff, 4625 for failed login attempts).\nRisk Analysis:\n\nIdentify potential vulnerabilities, including:\nUnauthorized access attempts.\nRepeated failed login attempts (indicating a brute force attack).\nLogin anomalies such as unusual login times or locations.\nFlag warnings or errors that could indicate system or application vulnerabilities.\nSeverity Categorization:\n\nClassify detected events into categories:\nCritical: Immediate action required (e.g., multiple failed logins or unauthorized access).\nWarning: Potential risks that need monitoring (e.g., unexpected login hours).\nInformational: General activity logs (e.g., regular logins/logoffs).\nActionable Insights:\n\nProvide recommendations to mitigate identified risks.\nHighlight any suspicious patterns or activities in plain language.\nOutput Format:\n\nSummarize findings in the following format\n\n*Summary of Detected Vulnerabilities and Risks:\n- Critical Risks:\n  1. [Description of risk with relevant details]\n  2. [Description of risk with relevant details]\n- Warnings:\n  1. [Description of warning with relevant details]\n- Informational:\n  1. [Details of regular user activity or other logs]\n\n*Recommendations:\n- [Mitigation recommendation 1]\n- [Mitigation recommendation 2]"
        },
        ...messages
      ],
      model: "deepseek-ai/DeepSeek-V3",
      max_tokens: 512,
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      repetition_penalty: 1,
      stop: ["<｜end▁of▁sentence｜>"],
      stream: true
    });

    // Create a ReadableStream to stream the response
    const stream = new ReadableStream({
      async start(controller) {
        for await (const token of response) {
          const content = token.choices[0]?.delta?.content;
          if (content) {
            controller.enqueue(content);
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error("Error in deepseek route:", error);
    return NextResponse.json(
      { error: "Failed to process your request" },
      { status: 500 }
    );
  }
}