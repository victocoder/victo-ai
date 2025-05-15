'use client';
import { useState, useRef, useEffect } from 'react';

export default function StreamingChat() {
  const [input, setInput] = useState('');
  const [streamedText, setStreamedText] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isStreaming || history.length) {
      scrollToBottom();
    }
  }, [streamedText, history]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', parts: [{ text: input }] };
    setHistory((prev) => [...prev, userMessage]);
    setStreamedText('');
    setIsStreaming(true);

    const res = await fetch('/api/gemini/chatstream', {
      method: 'POST',
      body: JSON.stringify({
        message: input,
        history,
      }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();

    if (reader) {
      let fullText = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        fullText += chunk;
        setStreamedText((prev) => prev + chunk);
      }

      const modelMessage = { role: 'model', parts: [{ text: fullText }] };
      setHistory((prev) => [...prev, modelMessage]);
    }

    setInput('');
    setIsStreaming(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4">
      <div className="flex-1 overflow-y-auto space-y-4 max-w-2xl mx-auto mb-4">
        {history.map((entry, idx) => (
          <div
            key={idx}
            className={`flex ${
              entry.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-xl shadow ${
                entry.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-900'
              }`}
            >
              {entry.parts[0].text}
            </div>
          </div>
        ))}

        {/* Streaming Gemini response (live) */}
        {isStreaming && (
          <div className="flex justify-start">
            <div className="max-w-xs px-4 py-2 rounded-xl bg-white text-gray-900 shadow">
              {streamedText}
              <span className="animate-pulse text-gray-400">|</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center gap-2 max-w-2xl mx-auto w-full">
        <input
          className="flex-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          disabled={isStreaming}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 disabled:opacity-50"
          disabled={isStreaming}
        >
          Send
        </button>
      </div>
    </div>
  );
}
