"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github.css' // You can choose a different style from highlight.js
import usePromtStore from '@/store/usePromptStore';
import { set } from 'date-fns';

const AiPrompt = () => {
    const { askAi, aiResponse, loading, error } = usePromtStore()


    const [prompt, setPrompt] = useState<string>('')
    const [response, setResponse] = useState<string>('')
    const [formData, setFormData] = useState<PromptFormData>({
        prompt: '',

    })

    const handleChange = (e: { target: { name: any; value: any } }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value)
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const aiResponse = await askAi(formData);
       
        
    }
    return (
        <div className='fixed bottom-8 left-[400px] right-[400px]   bg-white shadow-lg'>
            <div className='flex flex-col gap-4'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-2'>

                    <Input
                        name="prompt"
                        type="text"
                        placeholder="AI Prompt"
                        value={formData.prompt}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="submit"
                        className='text-primary'
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Submit'}
                    </button>
                </form>
                {error && <p className='text-red-500'>{error}</p>}
                {aiResponse && (
                    <div className='  text-left'>
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                            {aiResponse}
                        </ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AiPrompt
