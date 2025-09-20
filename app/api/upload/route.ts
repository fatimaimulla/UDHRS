import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // Convert file -> buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Cloudinary
    const uploaded = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "my-documents",
          resource_type: "auto", // 👈 ensures PDFs, videos, images all work
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      )
      uploadStream.end(buffer)
    })

    // Always return only the usable link + meta
    return NextResponse.json({
      url: uploaded.secure_url,
      public_id: uploaded.public_id,
      resource_type: uploaded.resource_type,
      format: uploaded.format,
    })
  } catch (err: any) {
    console.error("Cloudinary upload error:", err)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
