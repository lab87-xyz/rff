import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Bot, FileUp, Send, Loader2 } from 'lucide-react';
import { Message } from './Message';
import { SubscriptionModal } from './SubscriptionModal';

export function Chat() {
  const { user } = useUser();
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate API call to Claude
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm Claude 3.5 Sonnet, and I'm here to help identify potential red flags in your situation. What would you like me to analyze?"
      }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleFileUpload = () => {
    setShowSubscriptionModal(true);
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="bg-gray-800 px-6 py-4 shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bot className="h-8 w-8 text-red-500" />
            <h1 className="text-xl font-bold text-white">Red Flag Finder</h1>
          </div>
          <div className="flex items-center space-x-4">
            <img
              src={user?.profileImageUrl}
              alt={user?.fullName || 'User'}
              className="h-8 w-8 rounded-full"
            />
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-900 p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.map((message, index) => (
            <Message key={index} {...message} />
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2 text-gray-400">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Claude is thinking...</span>
            </div>
          )}
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="border-t border-gray-700 bg-gray-800 p-4">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={handleFileUpload}
              className="flex items-center justify-center rounded-full bg-gray-700 p-2 text-gray-300 hover:bg-gray-600"
            >
              <FileUp className="h-5 w-5" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Claude to analyze anything..."
              className="flex-1 rounded-lg bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex items-center justify-center rounded-full bg-red-500 p-2 text-white hover:bg-red-600 disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </form>

      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
      />
    </div>
  );
}