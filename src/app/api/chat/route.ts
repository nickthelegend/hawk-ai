import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { XMLParser } from 'fast-xml-parser';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message, xmlContent, jsonContent } = await req.json();

    let context = '';

    // Check which content type we received and process accordingly
    if (xmlContent) {
      const parser = new XMLParser();
      const jsonObj = parser.parse(xmlContent);
      context = JSON.stringify(jsonObj);
    } else if (jsonContent) {
      // If it's JSON content, we can use it directly
      context = jsonContent;
    } else {
      throw new Error("No content provided");
    }

    // Initialize Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate content using RAG
    const prompt = `
      Context: ${context}
      
      User question: ${message}
      
      Please provide a detailed but concise answer based on the given context. Focus on:
      - Relevant information from the provided data
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