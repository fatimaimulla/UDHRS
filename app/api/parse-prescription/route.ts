// app/api/parse-prescription/route.ts
import { NextResponse } from "next/server";
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { transcript } = await req.json();

    const openAiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", // or "gpt-4" if you have access
          messages: [
            {
              role: "user",
              content: `Extract the medicines, strengths, frequency per day, and duration from this text: "${transcript}". Return JSON only in this exact format without explanation:
{
  "medicine": [],
  "medicineStrength": [],
  "frequencyForDay": [],
  "forHowManyDays": []
}
Use these frequency terms where appropriate: "OD", "BD", "TDS", "Morning Only", "Evening Only", "Morning & Evening".`,
            },
          ],
          temperature: 0,
        }),
      }
    );

    const data = await openAiRes.json();

    if (!data.choices || !data.choices.length) {
      return NextResponse.json(
        { error: "No response from OpenAI" },
        { status: 500 }
      );
    }

    let parsedJson;
    try {
      parsedJson = JSON.parse(data.choices[0].message.content);
      console.log( parsedJson)
    } catch (err) {
      parsedJson = {
        error: "Failed to parse AI output",
        raw: data.choices[0].message.content,
      };
    }

    return NextResponse.json(parsedJson);
  } catch (error) {
    console.error("Internal error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
