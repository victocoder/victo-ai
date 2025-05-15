'use client';


import { getStreamedAIResponse, useAIStore } from '@/store/useStremStore';
import { useEffect, useRef, useState } from 'react';

export default function AIStreamComponent() {
  const response = useAIStore((state) => state.response);
  const loading = useAIStore((state) => state.loading);

  const containerRef = useRef<HTMLPreElement>(null);
  const [userScrolled, setUserScrolled] = useState(false);

  // Scroll only if the user hasn’t scrolled up manually
  useEffect(() => {
    const container = containerRef.current;
    if (!container || userScrolled) return;

    container.scrollTop = container.scrollHeight;
  }, [response, userScrolled]);

  // Detect if user scrolls manually
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isAtBottom =
        container.scrollHeight - container.scrollTop === container.clientHeight;
      setUserScrolled(!isAtBottom);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    setUserScrolled(false); // reset scroll state when generating new response
    getStreamedAIResponse('Explain how AI works');
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <button
        onClick={handleClick}
        disabled={loading}
        className="px-4 py-2 bg-blue-600  rounded disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Stream AI Response'}
      </button>

      <pre
        ref={containerRef}
        className="mt-4 max-h-96 overflow-y-auto whitespace-pre-wrap  p-4 rounded border border-gray-300 scroll-smooth"
      >
        {response}
      </pre>
    </div>
  );
}
