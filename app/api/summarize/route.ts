import { NextResponse } from "next/server"
import * as pdfjsLib from "pdfjs-dist"

import OpenAI from "openai"

// ✅ Force Node.js runtime (not edge)
export const runtime = "nodejs"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// --- Extract text from PDF ---
async function extractPdfText(url: string): Promise<string> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to fetch PDF: ${res.statusText}`)
  }

  const buffer = await res.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise

  let text = ""
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    text += content.items.map((item: any) => item.str).join(" ") + "\n"
  }

  return text
}

// --- API Route ---
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { fileUrl, fileName, category, uploadedAt } = body

    if (!fileUrl) {
      return NextResponse.json({ error: "fileUrl is required" }, { status: 400 })
    }

    // Extract PDF text
    const extractedText = await extractPdfText(fileUrl)

    // Prepare GPT prompt
    const prompt = `You are a helpful medical assistant. Summarize the following medical report clearly and concisely.
- File Name: ${fileName || "Unknown"}
- Category: ${category || "General"}
- Uploaded On: ${uploadedAt ? new Date(uploadedAt).toDateString() : "N/A"}

Report Content:
${extractedText}`

    // Call OpenAI
    const response = await client.responses.create({
      model: "gpt-4.1",
      input: [
        {
          role: "user",
          content: [{ type: "input_text", text: prompt }],
        },
      ],
    })

    const summary = response.output_text ?? "No summary generated"

    return NextResponse.json({ summary }, { status: 200 })
  } catch (err: any) {
    console.error("Summarization error:", err)
    return NextResponse.json(
      { error: err.message || "Failed to summarize document" },
      { status: 500 }
    )
  }
}
