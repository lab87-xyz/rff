import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot } from 'lucide-react';

interface MessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export function Message({ role, content }: MessageProps) {
  return (
    <div className={`flex items-start space-x-4 ${role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
      {role === 'assistant' && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500">
          <Bot className="h-5 w-5 text-white" />
        </div>
      )}
      <div
        className={`rounded-lg px-4 py-2 ${
          role === 'assistant'
            ? 'bg-gray-800 text-white'
            : 'bg-red-500 text-white'
        } max-w-[80%]`}
      >
        <ReactMarkdown className="prose prose-invert">
          {content}
        </ReactMarkdown>
      </div>
      {role === 'user' && (
        <div className="h-8 w-8 rounded-full bg-gray-700" />
      )}
    </div>
  );
}