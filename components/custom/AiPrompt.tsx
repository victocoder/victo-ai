"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github.css' // You can choose a different style from highlight.js
import usePromtStore from '@/store/usePromptStore';
import { set } from 'date-fns';
import { markdownContent } from '@/lib/constants'
import { Send } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { ProgressIndicator } from '@radix-ui/react-progress';
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
        console.log(aiResponse)

    }
    return (
        <div>
              <div className='  pl-[320px] pt-[70px] mb-[200px] '>
                {
                    loading && ( <h1>Thinking....</h1>)
                }
                     {error && <p className='text-red-500'>{error}</p>}
                <h1>{prompt}</h1>
               {
                aiResponse ? (
                     <div className='text-left'>
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                            {aiResponse}
                        </ReactMarkdown>
                    </div>
                ):(<div>
                    <h1 className='text-left'>Welcome to Gemini AI</h1>
                    <p className='text-left'>Please enter your prompt</p>
                </div>)
               }
              </div>
            <div className='fixed bottom-0 left-[300px] right-[0px]  shadow-lg  flex place-content-center bg-accent p-6'>
               <div className=' w-[600px]'>
                 <div className='flex flex-col gap-4'>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-2 relative'>

                        <Textarea
                            name="prompt"
                            rows={60}
                            cols={30}
                            placeholder="AI Prompt"
                            className='
                                border 
                                border-gray-300 
                                rounded-md 
                                px-4 
                                py-2 
                                focus:outline-none 
                                focus:ring-2 
                                focus:ring-primary 
                                transition 
                                text-base
                                shadow-sm
                                h-20
                                w-full

                            '
                            value={formData.prompt}
                            onChange={handleChange}
                            required
                        />
                       <Send  className='absolute bottom-2 right-2' onClick={handleSubmit}/>

                        {/* <button
                            type="submit"
                            className='
                                bg-primary 
                                text-white 
                                font-semibold 
                                rounded-md 
                                px-6 
                                py-2 
                                hover:bg-primary-dark 
                                transition 
                                shadow-sm
                                disabled:opacity-60
                            '
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Submit'}
                        </button> */}
                    </form>
               
                 
                  
                </div>
               </div>
            </div>
        </div>
    )
}

export default AiPrompt
