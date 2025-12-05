import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ArrowRight } from 'lucide-react';

interface GapResolutionScreenProps {
  onDeploy: () => void;
}

type Message = {
  id: string;
  sender: 'SYSTEM' | 'USER';
  text: string;
};

export const GapResolutionScreen: React.FC<GapResolutionScreenProps> = ({ onDeploy }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'sys_1', 
      sender: 'SYSTEM', 
      text: "I've ingested your data. I see you want contract work, but your resume doesn't mention your availability. Can you start immediately?" 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [inputActive, setInputActive] = useState(true);
  const [step, setStep] = useState(1); // 1: Input, 2: Processing, 3: Done
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, step]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // 1. Add User Message
    const userMsg: Message = { id: 'usr_1', sender: 'USER', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setInputActive(false);
    setStep(2);

    // 2. Simulate AI Processing & Response
    setTimeout(() => {
      const sysMsg: Message = { 
        id: 'sys_2', 
        sender: 'SYSTEM', 
        text: "Got it. Updating your Twin. Your link is ready." 
      };
      setMessages(prev => [...prev, sysMsg]);
      setStep(3);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-[#E5E5E5] flex justify-center p-6 md:p-12 font-mono">
      
      <div className="w-full max-w-2xl flex flex-col h-full relative">
        
        {/* Header */}
        <div className="text-center mb-12 opacity-50 text-[10px] tracking-widest uppercase">
          SESSION_ID: 0X92_GAP_RESOLUTION
        </div>

        {/* Chat Stream */}
        <div className="flex-1 space-y-8 pb-32">
          <AnimatePresence>
            {messages.map((msg) => (
              <MessageBlock key={msg.id} message={msg} />
            ))}
          </AnimatePresence>
          
          {/* Typing Indicator */}
          {step === 2 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="pl-4 border-l-2 border-white/20 text-xs text-zinc-500"
            >
              ECHO_CORE IS TYPING...
            </motion.div>
          )}

          {/* Input Field */}
          {inputActive && (
            <motion.form 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="mt-8"
            >
              <div className="text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">
                &gt; OPERATOR_INPUT:
              </div>
              <input 
                autoFocus
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your answer..."
                className="w-full bg-transparent border-none outline-none text-lg md:text-xl text-white placeholder-zinc-700 font-serif italic"
              />
            </motion.form>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Deploy Action (Footer) */}
        <AnimatePresence>
          {step === 3 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="fixed bottom-0 left-0 w-full p-6 md:p-12 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent flex justify-center pointer-events-none"
            >
              <button 
                onClick={onDeploy}
                className="pointer-events-auto w-full max-w-2xl bg-white text-black h-20 flex items-center justify-between px-8 hover:scale-[1.01] active:scale-[0.99] transition-transform group overflow-hidden relative"
              >
                {/* Marquee Effect on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-10 pointer-events-none overflow-hidden whitespace-nowrap">
                   <div className="animate-marquee font-mono text-[100px] font-bold uppercase tracking-tighter">
                      DEPLOYING TO EDGE // DEPLOYING TO EDGE // DEPLOYING TO EDGE
                   </div>
                </div>

                <div className="flex items-center gap-4 z-10">
                  <Globe className="w-5 h-5" />
                  <span className="font-mono text-sm md:text-base font-bold tracking-widest uppercase">
                    [ PUBLISH & VIEW TWIN ]
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 z-10 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

const MessageBlock: React.FC<{ message: Message }> = ({ message }) => {
  const isSystem = message.sender === 'SYSTEM';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`
        pl-6 border-l-2 
        ${isSystem ? 'border-white' : 'border-zinc-700'}
      `}
    >
      <div className={`
        text-[10px] tracking-widest uppercase mb-2 font-bold
        ${isSystem ? 'text-white' : 'text-zinc-500'}
      `}>
        {isSystem ? 'ECHO_CORE' : 'YOU'}
      </div>
      <div className={`
        text-lg md:text-xl leading-relaxed max-w-lg
        ${isSystem ? 'font-serif text-[#E5E5E5]' : 'font-serif text-zinc-400 italic'}
      `}>
        {message.text}
      </div>
    </motion.div>
  );
};