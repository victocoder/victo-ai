"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github.css' // You can choose a different style from highlight.js

const AiPrompt = () => {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const [prompt, setPrompt] = useState<string>('')
    const [response, setResponse] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value)
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: "Hello there",
                config: {
                    systemInstruction: "You are a coding teacher AI named CodeBuddy. Your job is to teach beginners the fundamentals of HTML and CSS. Provide clear explanations, examples, and answer questions related to web development. Encourage hands-on practice and guide users through creating simple web pages.",
                },
            });

            if (!response.text) {
                throw new Error('Failed to fetch response')
            }
            setResponse(response.text)
        } catch (err: any) {
            setError(err.message || 'An error occurred')
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='fixed bottom-8 left-[400px] right-[400px]   bg-white shadow-lg'>
            <div className='flex flex-col gap-4'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                    <Input
                        type="text"
                        value={prompt}
                        onChange={handlePromptChange}
                        placeholder="Enter your prompt"
                        className='border p-2 rounded'
                    />
                    {/* <button
                        type="submit"
                        className=''
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Submit'}
                    </button> */}
                </form>
                {error && <p className='text-red-500'>{error}</p>}
                {response && (
                    <div className='  text-left'>
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                            {response}
                        </ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AiPrompt
