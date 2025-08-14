import React, { useState } from 'react';
import { MessageSquare, Send, Loader, AlertTriangle, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const LegalAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your AI Legal Assistant. I can help you understand Indian laws, legal procedures, and provide general legal information. How can I assist you today?',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'assistant',
        content: `Based on your query about "${input.trim()}", here's what I can tell you:

This is a general legal information response. Please note that this is not legal advice and you should consult with a qualified advocate for specific legal matters.

For your specific situation, I recommend:
1. Consulting with a qualified legal professional
2. Reviewing relevant legal documents
3. Understanding your rights under Indian law

Would you like me to help you find relevant legal documents or connect you with an advocate?`,
        timestamp: new Date(),
        sources: [
          { title: 'Indian Contract Act, 1872', url: '#' },
          { title: 'Consumer Protection Act, 2019', url: '#' }
        ]
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const quickQuestions = [
    'What are my rights as a consumer?',
    'How to file a complaint in consumer court?',
    'What is the process for property registration?',
    'How to get legal aid in India?',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          AI Legal Assistant
        </h1>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-amber-800">Important Disclaimer</h3>
              <p className="text-sm text-amber-700 mt-1">
                This AI assistant provides general legal information only and does not constitute legal advice. 
                For specific legal matters, please consult with a qualified advocate.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-96 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                {message.sources && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-600 mb-1">Relevant sources:</p>
                    {message.sources.map((source, index) => (
                      <a
                        key={index}
                        href={source.url}
                        className="block text-xs text-blue-600 hover:text-blue-800"
                      >
                        {source.title}
                      </a>
                    ))}
                  </div>
                )}
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg px-4 py-2">
                <Loader className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about Indian law..."
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <Button onClick={handleSend} disabled={!input.trim() || isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => setInput(question)}
              className="text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <MessageSquare className="h-5 w-5 text-blue-600 mb-2" />
              <p className="text-sm text-gray-900">{question}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">
          How to Use the Legal Assistant
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-blue-800 mb-2">What I can help with:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• General legal information about Indian laws</li>
              <li>• Explanation of legal procedures</li>
              <li>• Finding relevant legal documents</li>
              <li>• Understanding your legal rights</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-2">What I cannot do:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Provide specific legal advice</li>
              <li>• Replace consultation with an advocate</li>
              <li>• Guarantee legal outcomes</li>
              <li>• Handle confidential legal matters</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
