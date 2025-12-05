import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type LogLine = {
  id: number;
  type: 'input' | 'process' | 'response' | 'error';
  text: string;
};

export const TerminalDemo: React.FC = () => {
  const [lines, setLines] = useState<LogLine[]>([]);
  
  useEffect(() => {
    let timeoutIds: ReturnType<typeof setTimeout>[] = [];

    const sequence = [
      // Sequence 1: Rejection
      { delay: 1000, type: 'input', text: '> Stranger: Can I pick your brain for 15 mins?' },
      { delay: 3500, type: 'process', text: '[ANALYZING INTENT... LOW CONTEXT DETECTED]' },
      { delay: 5000, type: 'response', text: '> ECHO: I am currently focused on Deep Work. Please refer to my documentation.' },
      
      // Clear
      { delay: 8000, type: 'clear', text: '' },
      
      // Sequence 2: Success
      { delay: 9000, type: 'input', text: '> Stranger: I have a $20k budget for a React System.' },
      { delay: 11500, type: 'process', text: '[ANALYZING INTENT... HIGH VALUE DETECTED]' },
      { delay: 13000, type: 'response', text: '> ECHO: Access Granted. Unlocking calendar slot.' },
    ];

    let startTime = Date.now();
    let isRunning = true;

    const runSequence = () => {
       if (!isRunning) return;
       
       setLines([]); // Start fresh
       
       sequence.forEach(({ delay, type, text }) => {
         const id = setTimeout(() => {
           if (!isRunning) return;
           
           if (type === 'clear') {
             setLines([]);
           } else {
             setLines(prev => [...prev, { id: Date.now(), type: type as any, text }]);
           }
         }, delay);
         timeoutIds.push(id);
       });

       // Loop
       const loopId = setTimeout(runSequence, 16000);
       timeoutIds.push(loopId);
    };

    runSequence();

    return () => {
      isRunning = false;
      timeoutIds.forEach(clearTimeout);
    };
  }, []);

  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 border-b border-echo-border">
      {/* Left: Marketing Copy */}
      <div className="flex flex-col justify-center p-8 md:p-16 border-r border-echo-border">
        <h2 className="font-serif text-5xl md:text-7xl text-echo-text mb-8">
          Silence <br/>
          <span className="text-echo-text/50">the noise.</span>
        </h2>
        <p className="font-mono text-sm md:text-base text-echo-text/70 max-w-md leading-relaxed">
          Your time is a finite asset. ECHO filters incoming requests based on your Resume's learned context, strictly guarding your attention.
        </p>
      </div>

      {/* Right: Terminal */}
      <div className="bg-[#0A0A0A] p-8 md:p-16 flex items-center justify-center relative overflow-hidden">
        {/* Subtle Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-10 opacity-20" />

        <div className="w-full max-w-xl aspect-[4/3] bg-black border border-echo-border p-4 shadow-2xl relative flex flex-col">
          {/* Terminal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-echo-border/30 mb-4">
             <div className="flex gap-2">
               <div className="w-3 h-3 bg-echo-border rounded-full opacity-50"></div>
               <div className="w-3 h-3 bg-echo-border rounded-full opacity-50"></div>
               <div className="w-3 h-3 bg-echo-border rounded-full opacity-50"></div>
             </div>
             <div className="font-mono text-[10px] text-echo-text/30 uppercase tracking-widest">term_v1.0.exe</div>
          </div>

          {/* Terminal Body */}
          <div className="flex-1 font-mono text-sm md:text-base space-y-3 overflow-hidden">
             <AnimatePresence mode='popLayout'>
               {lines.map((line) => (
                 <LogEntry key={line.id} line={line} />
               ))}
             </AnimatePresence>
          </div>
          
          {/* Blinking Cursor at bottom */}
          <div className="mt-2">
            <span className="inline-block w-2 h-4 bg-green-500 animate-pulse"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

const LogEntry: React.FC<{ line: LogLine }> = ({ line }) => {
  let colorClass = "text-echo-text";
  if (line.type === 'process') colorClass = "text-yellow-500 italic text-xs";
  if (line.type === 'response') colorClass = "text-green-500";
  if (line.type === 'error') colorClass = "text-red-500";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      className={`${colorClass}`}
    >
      <Typewriter text={line.text} speed={line.type === 'process' ? 10 : 30} />
    </motion.div>
  );
};

// Component to handle character-by-character typing
const Typewriter = ({ text, speed }: { text: string; speed: number }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};