'use client';
import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

export default function ChatPage() {
    const [input, setInput] = useState('');
    const [chatHistory, setChatHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [chatHistory]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const message = input.trim();
        setLoading(true);
        setInput('');

        const res = await fetch('/api/gemini/chat', {
            method: 'POST',
            body: JSON.stringify({ message, history: chatHistory }),
        });

        const data = await res.json();
        setChatHistory(data.updatedHistory);
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatHistory.map((entry, idx) => (
                    <div
                        key={idx}
                        className={`flex ${entry.role === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                    >
                        <div
                            className={`px-4 py-2 rounded-2xl shadow-md ${entry.role === 'user'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-gray-800'
                                }`}
                        >
                            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                {entry.parts[0].text.toString()}
                            </ReactMarkdown>

                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="text-gray-500 text-sm">Thinking...</div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t flex items-center space-x-2">
                <input
                    className="flex-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                />
                <button
                    className="bg-blue-500 px-4 py-2 rounded-xl hover:bg-blue-600"
                    onClick={sendMessage}
                    disabled={loading}
                >
                    Send
                </button>
            </div>
        </div>
    );
}
