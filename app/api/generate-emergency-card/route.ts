// app/api/generate-emergency-card/route.ts
import { NextResponse } from "next/server";
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    // const { patient } = await req.json();
    const patient = await req.json();

    console.log("Patient Data:", patient);

    const openAiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", // or gpt-4 if you have access
          messages: [
            {
              role: "user",
              content: `From the following patient data, generate an Emergency Medical Card.
Return strictly in this JSON format only (no explanations, no extra fields):

{
  "name": "",
  "age": 0,
  "gender": "",
  "bloodGroup": "",
  "emergencyContact": {
    "name": "",
    "relation": "",
    "phone": ""
  },
  "allergies": [],
  "chronicConditions": []
}

Patient Data:
${JSON.stringify(patient, null, 2)}
`,
            },
          ],
          temperature: 0,
        }),
      }
    );

    const data = await openAiRes.json();
    console.log("OpenAI Response:", data);

    if (!data.choices || !data.choices.length) {
      return NextResponse.json(
        { error: "No response from OpenAI" },
        { status: 500 }
      );
    }

    let parsedJson;
    try {
      parsedJson = JSON.parse(data.choices[0].message.content);
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
