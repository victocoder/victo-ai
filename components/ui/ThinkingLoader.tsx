// components/ThinkingLoader.tsx
import { Brain } from 'lucide-react';

export default function ThinkingLoader() {
  return (
    <div className="flex items-center space-x-1 text-sm text-gray-500">
      <span>Thinking</span>
      <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="h-2 w-2 bg-primary rounded-full animate-bounce"></span>
    </div>
  );
}
