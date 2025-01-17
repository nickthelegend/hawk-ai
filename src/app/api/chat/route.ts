import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { XMLParser } from 'fast-xml-parser';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message, xmlContent } = await req.json();

    // Parse XML content
    const parser = new XMLParser();
    const jsonObj = parser.parse(xmlContent);

    // Initialize Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Prepare context for RAG
    const context = JSON.stringify(jsonObj);

    // Generate content using RAG
    const prompt = `
      Context: ${context}
      
      User question: ${message}
      
      Please provide a detailed but concise answer based on the given XML content context. Focus on:
      - Relevant information from the XML
      - Security-related insights if applicable
      - Clear and accurate responses
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Error in chat route:", error);
    return NextResponse.json(
      { error: "Failed to process your request" },
      { status: 500 }
    );
  }
}

