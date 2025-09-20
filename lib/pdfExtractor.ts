// @ts-ignore
import pdfParse from "pdf-parse"

/**
 * Extract plain text from a PDF URL using pdf-parse
 * @param url Publicly accessible PDF URL (Cloudinary, S3, etc.)
 * @returns Extracted text content
 */
export async function extractPdfText(url: string): Promise<string> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to fetch PDF: ${res.statusText}`)
  }

  const buffer = Buffer.from(await res.arrayBuffer())
    const data = await pdfParse(buffer)

  return data.text.trim()
}
