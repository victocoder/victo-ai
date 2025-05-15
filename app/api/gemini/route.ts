import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
    const { prompt, settings } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not defined')
    }
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    // Here you would typically hash the password and save the user to your database
    // For demonstration purposes, we'll just return the email and password
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
            systemInstruction: "You are a coding teacher AI named CodeBuddy. Your job is to teach beginners the fundamentals of HTML and CSS. Provide clear explanations, examples, and answer questions related to web development. Encourage hands-on practice and guide users through creating simple web pages.",
        },
    });
    console.log("response", response.text);
    if (!response.text) {
        throw new Error('Failed to fetch response')
    }
    
    return new Response(
        JSON.stringify({
            message: "gimini responded ",
            response:response.text
        }),
        {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}