'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { askChatbot } from '@/ai/flows/chatbot-flow';
import { cn } from '@/lib/utils';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  isTyping?: boolean;
  suggestedQuestions?: string[];
};

const preloadedQuestions = [
    "What is the best fertilizer for wheat?",
    "How to control rice blast disease?",
    "What is the PM-KISAN scheme?",
    "When is the best time to sow mustard?",
    "How much water does sugarcane need?",
    "What are the symptoms of Fall Armyworm in maize?",
    "Which crops grow well in black soil?",
    "How to get a Kisan Credit Card?",
    "What is the ideal temperature for potato cultivation?",
    "How to manage pink bollworm in cotton?",
];


export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          id: 1,
          text: "Hello! I'm AgroWise Bot. How can I help you today? You can ask me a question or choose one of the suggestions below.",
          sender: 'bot',
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSend = async (question?: string) => {
    const currentInput = question || input;
    if (currentInput.trim() === '' || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      text: currentInput,
      sender: 'user',
    };

    setMessages(prev => [...prev.map(m => ({ ...m, suggestedQuestions: [] })), userMessage, { id: Date.now() + 1, text: '', sender: 'bot', isTyping: true }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askChatbot({ question: currentInput });
      const botMessage: Message = {
        id: Date.now() + 2,
        text: response.answer,
        sender: 'bot',
        suggestedQuestions: response.suggestedQuestions,
      };
      setMessages(prev => prev.filter(m => !m.isTyping).concat(botMessage));
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: Message = {
        id: Date.now() + 2,
        text: "I'm sorry, I'm having trouble connecting. Please try again later.",
        sender: 'bot',
      };
       setMessages(prev => prev.filter(m => !m.isTyping).concat(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePreloadedQuestion = (question: string) => {
    handleSend(question);
  };


  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="rounded-full h-16 w-16 shadow-lg"
        >
          {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
        </Button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Card className="w-[380px] h-[550px] flex flex-col shadow-2xl rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 font-headline">
                <Bot /> AgroWise Bot
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                 <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea className="h-full" ref={scrollAreaRef}>
                 <div className="p-6 space-y-4">
                    {messages.map((message, msgIndex) => (
                      <div key={message.id}>
                        <div
                          className={cn(
                              'flex gap-3 text-sm',
                              message.sender === 'user' ? 'justify-end' : 'justify-start'
                          )}
                        >
                          {message.sender === 'bot' && (
                              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                              <Bot className="h-5 w-5 text-primary" />
                              </div>
                          )}
                          <div
                              className={cn(
                              'rounded-lg px-4 py-2 max-w-[80%]',
                              message.sender === 'user'
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted'
                              )}
                          >
                              {message.isTyping ? (
                                  <div className="flex items-center gap-2">
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                      <span>Typing...</span>
                                  </div>
                              ) : (
                                  message.text
                              )}
                          </div>
                          {message.sender === 'user' && (
                              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                <User className="h-5 w-5 text-muted-foreground" />
                              </div>
                          )}
                        </div>
                        
                        {message.sender === 'bot' && message.suggestedQuestions && message.suggestedQuestions.length > 0 && (
                          <div className="space-y-2 pt-4 ml-11">
                              {message.suggestedQuestions.map((q, i) => (
                                  <Button key={i} variant="outline" size="sm" className="w-full justify-start h-auto" onClick={() => handlePreloadedQuestion(q)} disabled={isLoading}>
                                      <span className="text-wrap text-left">{q}</span>
                                  </Button>
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
                    {messages.length === 1 && (
                        <div className="space-y-2 pt-4">
                            {preloadedQuestions.map((q, i) => (
                                <Button key={i} variant="outline" size="sm" className="w-full justify-start h-auto" onClick={() => handlePreloadedQuestion(q)}>
                                    <span className="text-wrap text-left">{q}</span>
                                </Button>
                            ))}
                        </div>
                    )}
                 </div>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex w-full items-center space-x-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
