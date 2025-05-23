import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {

    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not defined')
    }
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    // Here you would typically hash the password and save the user to your database
    // For demonstration purposes, we'll just return the email and password
    const { message, history } = await req.json();

    const chat = ai.chats.create({
        model: "gemini-2.0-flash",
        history, // pass the full history here
    });

    const response = await chat.sendMessage({ message });
  
    const newModelReply = {
        role: "model",
        parts: [{ text: response.text }],
    };

   
    if (!response.text) {
        throw new Error('Failed to fetch response')
    }

    return new Response(
        JSON.stringify({
            text: response.text,
            updatedHistory: [...history],
        }),
        {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}