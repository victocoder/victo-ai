"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Textarea } from '../ui/textarea'
import { Send } from 'lucide-react'
import { aiChatHistory } from '@/lib/constants'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import ThinkingLoader from '../ui/ThinkingLoader'
import useExpertStore from '@/store/useExpertStore'
import { motion } from "framer-motion";

const container = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};
const AiChat = () => {
    const [input, setInput] = useState('');
    const [placeHolder, setPlaceHolder] = useState('Hello');
    const [history, setHistory] = useState<any[]>([]);
    const [streamedText, setStreamedText] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [isUserAtBottom, setIsUserAtBottom] = useState(true);

    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const { expert } = useExpertStore()
    const [isUserScrolling, setIsUserScrolling] = useState(false);

    const handleScroll = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const { scrollTop, scrollHeight, clientHeight } = target;
        const isAtBottom = scrollHeight - scrollTop <= clientHeight + 20; // Adjust threshold as needed

        setIsUserScrolling(!isAtBottom);
    };

    const scrollToBottom = () => {
        if (!isUserScrolling) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const container = document.getElementById('chat-container');
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => {
                container.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [history]);
    useEffect(() => {
        setPlaceHolder(`Ask ${expert.name}`)
        setHistory([])
        // sendMessage()


    }, [expert])
    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', parts: [{ text: input }] };
        const updatedHistory = [...history, userMessage];

        // setInput('');
        setIsStreaming(true);
        setStreamedText('');
        setHistory(updatedHistory);

        const res = await fetch('/api/gemini/chatstream', {
            method: 'POST',
            body: JSON.stringify({
                message: input,
                history: updatedHistory,
                expert: expert
            }),
        });

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let fullText = '';

        if (reader) {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value);
                fullText += chunk;
                setStreamedText((prev) => prev + chunk);
            }

            const modelMessage = { role: 'model', parts: [{ text: fullText }] };
            setHistory((prev) => [...prev, modelMessage]);
            setStreamedText('');
            setInput("")
            setIsStreaming(false);
        }
    };

    return (
        <div>
            <div ref={chatContainerRef}
                className='md:pl-[320px] pt-[70px] mb-[200px] '>

                {
                    history.length == 0 ? <motion.div
                      key={expert.name}
                        className="flex flex-col justify-center items-center gap-4 pt-20"
                        variants={container}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h1 className="text-2xl font-extrabold" variants={fadeUp}>
                            {expert.name}
                        </motion.h1>

                        <motion.p className="text-center max-w-[600px]" variants={fadeUp}>
                            {expert.expertDiscription}
                        </motion.p>
                    </motion.div> : <>
                        {
                            history.map((entry, index) => (
                                <div key={index}>
                                    {
                                        entry.role == "user" ?
                                            <div className='flex justify-end  pr-4 mb-4'>

                                                <div className='bg-card text-left rounded-2xl shadow-md px-4 py-2'>
                                                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                                        {entry.parts[0].text}
                                                    </ReactMarkdown>
                                                </div>
                                            </div> :
                                            <div className=' pr-4 mb-4'>

                                                <div className='text-left rounded-2xl shadow-md px-4 py-2'>
                                                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                                        {entry.parts[0].text.toString()}
                                                    </ReactMarkdown>
                                                </div>
                                            </div>
                                    }
                                </div>
                            ))
                        }
                    </>
                }
                {isStreaming && (
                    <div className=' pr-4 mb-4'>
                        {
                            streamedText ? <div className='text-left rounded-2xl shadow-md px-4 py-2'>
                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                    {streamedText}

                                </ReactMarkdown>
                            </div> : <div className='text-left rounded-2xl shadow-md px-4 py-2'>
                                <ThinkingLoader />
                            </div>
                        }

                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>
            <div className='fixed bottom-0 md:left-[310px] md:right-[10px] rounded-3xl  shadow-lg  flex place-content-center bg-card p-6 max-md:w-full'>
                <div className='w-full md:w-[600px]'>
                    <div className='flex flex-col gap-4'>
                        <form className='flex flex-col gap-2 relative'>

                            <Textarea
                                name="prompt"
                                rows={60}
                                cols={30}
                                placeholder={placeHolder}
                                className='
                                border 
                                border-gray-300 
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
                                rounded-2xl

                            '

                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                // value={formData.prompt}
                                // onChange={handleChange}
                                required
                            />
                            <div className="bg-primary rounded-full absolute bottom-2 right-2 p-2 animate-pulse cursor-pointer">
                                <Send className="" onClick={sendMessage} />
                            </div>
                        </form>



                    </div>
                </div>
            </div>
        </div>
    )
}

export default AiChat
