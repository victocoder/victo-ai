// app/api/chat/route.ts
import { doctorSystemInstruciton, expertList } from "@/lib/constants";
import { GoogleGenAI } from "@google/genai";
import { NextRequest } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: NextRequest) {
    const { message, history,expert } = await req.json();
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
        async start(controller) {
            try {
                const chat = ai.chats.create({
                    model: "gemini-2.0-flash",
                    config: {
                        systemInstruction: expertList.filter((val) =>Number(expert.id)==val.num)[0].systemInstruction,
                    },
                    history,
                });

                const geminiStream = await chat.sendMessageStream({ message });

                for await (const chunk of geminiStream) {
                    controller.enqueue(encoder.encode(chunk.text));
                }

                controller.close();
            } catch (error) {
                controller.enqueue(encoder.encode(`Error:`));
                controller.close();
            }
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache",
        },
    });
}
