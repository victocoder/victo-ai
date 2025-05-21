// app/api/chat/route.ts
import { doctorSystemInstruciton, expertList } from "@/lib/constants";
import { GoogleGenAI, HarmBlockThreshold, HarmCategory, LiveServerMessage, Modality } from "@google/genai";
import { NextRequest } from "next/server";
import fs from 'fs/promises'; // For async file operations
import { Buffer } from 'buffer'; // Node.js Buffer

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
const SAMPLE_RATE = 24000;
const NUM_CHANNELS = 1;
const BITS_PER_SAMPLE = 16; // 2 bytes per sample

function createWavHeader(dataLength: number) {
    const buffer = Buffer.alloc(44);
    const GIGA = 4294967296; // 2^32

    // RIFF chunk descriptor
    buffer.write('RIFF', 0);
    buffer.writeUInt32LE(36 + dataLength, 4); // ChunkSize
    buffer.write('WAVE', 8);

    // "fmt " sub-chunk
    buffer.write('fmt ', 12);
    buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
    buffer.writeUInt16LE(1, 20);  // AudioFormat (1 for PCM)
    buffer.writeUInt16LE(NUM_CHANNELS, 22);
    buffer.writeUInt32LE(SAMPLE_RATE, 24);
    const byteRate = SAMPLE_RATE * NUM_CHANNELS * (BITS_PER_SAMPLE / 8);
    buffer.writeUInt32LE(byteRate, 28);
    const blockAlign = NUM_CHANNELS * (BITS_PER_SAMPLE / 8);
    buffer.writeUInt16LE(blockAlign, 32);
    buffer.writeUInt16LE(BITS_PER_SAMPLE, 34);

    // "data" sub-chunk
    buffer.write('data', 36);
    buffer.writeUInt32LE(dataLength, 40); // Subchunk2Size (data length)

    return buffer;
}
export async function POST(req: NextRequest) {
    const { message, history, expert } = await req.json();
    const encoder = new TextEncoder();
    console.log("chatttt", message)
    const audioChunks: Buffer[] = [];

    const session = await ai.live.connect({
        model: "gemini-2.0-flash-live-001",
        config: {
            systemInstruction: doctorSystemInstruciton,
            responseModalities: [Modality.AUDIO],
        },
        callbacks: {
            onopen: () => {
                console.log('Connected to the socket.');
            },
            onmessage: async (e: LiveServerMessage) => {

                console.log(e.data)
                if (typeof e.data === 'string') {
                    const audioData = Buffer.from(e.data, 'base64');
                    audioChunks.push(audioData);
                    process.stdout.write("."); // Progress indicator
                    return console.log('Received message from the server: %s\n', e.data);
                } else {
                    console.warn('Received undefined or non-string data from the server.');
                }
                if (audioChunks.length === 0) {
                    console.error("No audio data received.");
                    // const response = await result.response; // Try to get full response for error details
                    // console.error("Full response (if any):", JSON.stringify(response.text ? response.text() : response, null, 2));
                    return;
                }

                const audioData = Buffer.concat(audioChunks);
                const wavHeader = createWavHeader(audioData.length);
                const wavBuffer = Buffer.concat([wavHeader, audioData]);

                const outputFileName = "audio_output.wav";
                await fs.writeFile(outputFileName, wavBuffer);
                console.log(`Audio saved to ${outputFileName}`);
            },
            onerror: (e: ErrorEvent) => {
                console.log('Error occurred: %s\n', e.error);
            },
            onclose: (e: CloseEvent) => {
                console.log('Connection closed.');
            },
        },
    });
    const result = session.sendClientContent({
        turns: message,

        turnComplete: true
    })
    console.log(result)


    return new Response(
        JSON.stringify({
            text: "success",
            // updatedHistory: [...history],
        }),
        {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}
