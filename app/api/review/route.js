
import { NextResponse } from "next/server";

import OpenAI from "openai";
import { stringify } from "postcss";

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(request) {
    try {

        let { code, lang } = await request.json()
        // console.log(code)
        if (!code || !lang) {
            return NextResponse.json({ success: false, feedback: "Missing language or code" }, { status: 400 });
        }
        const strcode =JSON.stringify(code).split("paste your code here...")[1]
        console.log(strcode)
        // console.log(typeof(code))
        const prompt = `
You are a code review assistant.
Analyze the following ${lang} code and provide the below in their order and their headlines must be as given :
1. Code quality review.
2. Possible bugs or logical issues.
3. Suggestions for performance improvements.
4. Any security concerns.

Code:
${strcode}
`;
        const completion = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: "You are an expert software engineer and expert at competitive programming also you have very good knowledge of ml libraries and their usecases " },
                { role: "user", content: prompt },
            ],
        });
        // console.log("nxt line will give the completion ")
        // console.log(completion)
        const feedback = completion.choices[0].message.content;

        return Response.json({ success: true, feedback });



    }
    catch (err) {
        console.error("Error:", err);
        return Response.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }



};


