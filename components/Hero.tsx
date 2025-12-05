// ============================================================================
// HERO.TSX - Landing Page Hero Section
// ============================================================================
// This component displays the main landing page with:
// 1. A hero section with headline and CTA
// 2. An animated terminal simulation showing the AI in action
// 3. Typewriter effects and chat-style messaging

// Import React and hooks for managing state and side effects
import React, { useState, useEffect } from 'react';

// Import animation utilities from framer-motion
import { motion, AnimatePresence } from 'framer-motion';

// Import icons from lucide-react (a popular icon library)
import { ArrowRight, Terminal } from 'lucide-react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Props (properties) that the Hero component receives from its parent
 * 
 * onStart: A function to call when user clicks "Create your Echo" or "Login"
 */
interface HeroProps {
  onStart: () => void;
}

// ============================================================================
// MAIN HERO COMPONENT
// ============================================================================

/**
 * Hero Component
 * 
 * The main landing page component. Uses a two-column grid layout:
 * - Left column: Marketing copy with headline and CTA button
 * - Right column: Interactive terminal simulation
 */
export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    // Main container: Full screen height with dark background
    <section className="screen overflow-hidden flex flex-col selection:bg-white selection:text-black relative">
      
      {/* NAVIGATION BAR */}
      {/* Positioned absolutely at the top, floating above content */}
      <nav className="absolute top-0 w-full flex justify-between px-6 py-6 z-50 font-mono text-xs tracking-widest mix-blend-difference pointer-events-none">
        {/* Left side: Logo/Brand */}
        <span className="pointer-events-auto cursor-default">ECHO / V1</span>
        
        {/* Right side: Login button */}
        <button 
          onClick={onStart}
          className="nav-link pointer-events-auto"
        >
          Login
        </button>
      </nav>

      {/* MAIN CONTENT GRID */}
      {/* Responsive grid: 1 column on mobile, 2 columns on desktop (md: breakpoint) */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 h-full relative z-10">
        
        {/* ===== LEFT COLUMN: MARKETING COPY ===== */}
        <div className="relative h-full flex flex-col justify-center pl-8 md:pl-24 pr-8 border-r border-white/10 order-1 md:order-1">
          
          {/* Animated content wrapper with fade-in effect */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} // Start: invisible and 20px down
            animate={{ opacity: 1, y: 0 }}  // End: fully visible at normal position
            transition={{ 
              duration: 1.0,                // Take 1 second to animate
              ease: [0.16, 1, 0.3, 1]      // Custom easing curve for smooth motion
            }}
            className="z-10"
          >
            <h1 className="hero-title">
              Speak Once.<br />
              {/* Italicized second line for emphasis */}
              <span className="hero-title-emphasis">Echo Forever.</span>
            </h1>
            
            <p className="hero-description">
              Clone your context. Scale your judgment. <br className="hidden md:block"/>
              Let your Digital Twin handle the noise.
            </p>
            
            <button 
              onClick={onStart}
              className="hero-cta"
            >
              Create your Echo 
              {/* Arrow icon that slides right on hover */}
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>

        {/* ===== RIGHT COLUMN: TERMINAL SIMULATION ===== */}
        <div className="relative h-full flex flex-col items-center justify-center p-6 md:p-12 bg-[#050505] order-2 md:order-2">
            {/* Render the animated terminal simulation */}
            <TerminalSimulation />
        </div>

      </div>
    </section>
  );
};

// ============================================================================
// TYPE DEFINITIONS FOR TERMINAL SIMULATION
// ============================================================================

/**
 * Message type for the terminal chat simulation
 * 
 * id: Unique identifier for each message
 * sender: Who sent the message (visitor, AI echo, or system)
 * text: The actual message content
 */
type Message = {
    id: number;
    sender: 'VISITOR' | 'ECHO' | 'SYSTEM';
    text: string;
};

// ============================================================================
// TERMINAL SIMULATION COMPONENT
// ============================================================================

/**
 * TerminalSimulation Component
 * 
 * Displays an animated chat-like interface showing how the AI Echo works.
 * The conversation loops continuously to demonstrate the product.
 * 
 * Animation sequence:
 * 1. Visitor asks to chat (after 800ms)
 * 2. System analyzes (after 2.8s)
 * 3. Echo responds - low priority (after 4.8s)
 * 4. Visitor mentions budget (after 8.5s)
 * 5. Echo escalates - high priority (after 10.5s)
 * 6. Loop restarts (after 15s)
 */
const TerminalSimulation = () => {
    // State to store the list of messages currently displayed
    const [messages, setMessages] = useState<Message[]>([]);
  
    // useEffect runs side effects (like timers) when component mounts
    useEffect(() => {
      // Array to store all timeout IDs so we can clean them up later
      // This prevents memory leaks when component unmounts
      let timeoutIds: ReturnType<typeof setTimeout>[] = [];
  
      // Define the message sequence with timing
      // Each message has: id, sender, text, and delay (when to show it in milliseconds)
      const sequence = [
        { 
          id: 1, 
          sender: 'VISITOR', 
          text: 'Hey, can I pick your brain for 20 mins?', 
          delay: 800  // Show after 800ms (0.8 seconds)
        },
        { 
          id: 2, 
          sender: 'SYSTEM', 
          text: 'ANALYZING RELEVANCE...', 
          delay: 2800  // Show after 2.8 seconds
        },
        { 
          id: 3, 
          sender: 'ECHO', 
          text: '[Low Context]. Please provide a specific agenda. My creator is in Deep Work mode.', 
          delay: 4800  // Show after 4.8 seconds
        },
        { 
          id: 4, 
          sender: 'VISITOR', 
          text: 'I have a $50k budget for a Design System audit.', 
          delay: 8500  // Show after 8.5 seconds
        },
        { 
          id: 5, 
          sender: 'ECHO', 
          text: '[High Priority]. Context Match. Unlocking Calendar...', 
          delay: 10500  // Show after 10.5 seconds
        },
      ];
      
      /**
       * runSimulation Function
       * 
       * This function orchestrates the entire animation loop:
       * 1. Clear all messages to start fresh
       * 2. Schedule each message to appear at its designated time
       * 3. After the sequence completes, wait and restart for continuous loop
       */
      const runSimulation = () => {
          // Reset: Clear all messages to start fresh
          setMessages([]);
          
          // Schedule each message to appear at the right time
          sequence.forEach(msg => {
              // setTimeout schedules a function to run after a delay
              const t = setTimeout(() => {
                  // Add this message to the messages array
                  // 'prev' is the previous state, we create a new array with all old messages plus the new one
                  setMessages(prev => [...prev, msg as Message]);
              }, msg.delay);
              
              // Store the timeout ID so we can cancel it later if needed (cleanup)
              timeoutIds.push(t);
          });
          
          // After all messages have appeared (15 seconds total), restart the simulation
          const resetT = setTimeout(() => {
              runSimulation(); // Recursively call to create infinite loop
          }, 15000);
          timeoutIds.push(resetT);
      }
      
      // Start the first simulation run
      runSimulation();
  
      // Cleanup function: runs when component unmounts
      // Cancel all scheduled timeouts to prevent memory leaks
      // (Important: prevents code from running after component is destroyed)
      return () => timeoutIds.forEach(clearTimeout);
    }, []); // Empty dependency array = run once on mount, never again

    return (
        <div className="w-full max-w-lg">
            {/* Terminal window container with border and subtle glassy background */}
            <div className="w-full border border-white/20 bg-white/[0.02] backdrop-blur-md shadow-2xl relative">
                
                {/* TERMINAL HEADER */}
                {/* Styled to look like a real terminal/command prompt window */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                    {/* Left side: Title with terminal icon and status message */}
                    <div className="flex items-center gap-2 text-[10px] tracking-widest font-mono text-white/40 uppercase">
                        <Terminal size={12} /> {/* Small terminal icon */}
                        <span>ECHO_V1 // STATUS: GUARDING</span>
                    </div>
                    
                    {/* Right side: Fake window control buttons (minimize/maximize decorations) */}
                    <div className="flex gap-1.5">
                        {/* Two square buttons to mimic window controls */}
                        <div className="w-2 h-2 rounded-none bg-white/20"></div>
                        <div className="w-2 h-2 rounded-none bg-white/20"></div>
                    </div>
                </div>

                {/* TERMINAL CONTENT AREA */}
                {/* This is where the messages appear */}
                <div className="p-6 md:p-8 min-h-[300px] md:min-h-[360px] flex flex-col font-mono text-xs md:text-sm">
                    
                    {/* AnimatePresence allows messages to smoothly animate in/out */}
                    {/* popLayout: When a message is added, other elements shift smoothly */}
                    <AnimatePresence mode="popLayout">
                        {/* Loop through all messages and render each one */}
                        {messages.map((msg) => (
                            <ChatBlock key={msg.id} message={msg} />
                        ))}
                    </AnimatePresence>
                    
                    {/* Blinking cursor at the end to show the terminal is "live" and active */}
                    <motion.div 
                        initial={{ opacity: 0 }}  // Start invisible
                        animate={{ opacity: 1 }}  // Fade in
                        className="mt-4"
                    >
                         {/* Animated pulsing cursor (white rectangle) */}
                         <span className="w-2 h-4 bg-white/50 inline-block animate-pulse"/>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

// ============================================================================
// CHAT BLOCK COMPONENT
// ============================================================================

/**
 * ChatBlock Component
 * 
 * Renders a single message in the terminal chat.
 * Different styling based on who sent it (SYSTEM, ECHO, or VISITOR).
 * Each message has:
 * - A header showing the sender
 * - The message content (either plain text or typewriter animation)
 */
const ChatBlock: React.FC<{ message: Message }> = ({ message }) => {
    // Determine message type for conditional styling
    const isSystem = message.sender === 'SYSTEM';
    const isEcho = message.sender === 'ECHO';
    
    return (
        // Animated container that fades in and slides up when appearing
        <motion.div
            initial={{ opacity: 0, y: 10 }}  // Start: invisible, 10px down
            animate={{ opacity: 1, y: 0 }}   // End: visible, normal position
            exit={{ opacity: 0 }}            // When removed: fade out
            className="mb-6 last:mb-0 w-full"
        >
            {/* HEADER LINE */}
            {/* Shows who sent the message with a decorative line */}
            <div className={`flex items-center gap-3 mb-2 text-[10px] tracking-widest uppercase ${isSystem ? 'text-emerald-500/70' : 'text-white/30'}`}>
                {/* Sender name in brackets */}
                <span>[ {message.sender} ]</span>
                {/* Horizontal line that fills remaining space */}
                <div className={`h-[1px] flex-1 ${isSystem ? 'bg-emerald-500/20' : 'bg-white/10'}`}></div>
            </div>
            
            {/* MESSAGE BODY */}
            {/* Different colors for different sender types */}
            <div className={`
                leading-relaxed pl-1
                ${isSystem ? 'text-emerald-400' : ''}          // System messages are green
                ${isEcho ? 'text-white' : ''}                  // Echo messages are white
                ${!isSystem && !isEcho ? 'text-white/50' : ''} // Visitor messages are dimmed
            `}>
                {/* SYSTEM messages show a pulsing indicator */}
                {isSystem ? (
                    <div className="flex items-center gap-2">
                         {/* Pulsing green dot to indicate system activity */}
                         <span className="inline-block w-2 h-2 bg-emerald-500 animate-pulse"></span>
                         {message.text}
                    </div>
                ) : (
                    // ECHO and VISITOR messages use typewriter effect for dramatic reveal
                    <Typewriter text={message.text} speed={25} />
                )}
            </div>
        </motion.div>
    );
};

// ============================================================================
// TYPEWRITER COMPONENT
// ============================================================================

/**
 * Typewriter Component
 * 
 * Creates a typing animation effect where text appears character by character.
 * This makes the chat feel more dynamic and engaging, like someone is actually typing.
 * 
 * @param text - The full text to display
 * @param speed - Milliseconds between each character appearing (lower = faster typing)
 */
const Typewriter = ({ text, speed }: { text: string; speed: number }) => {
    // State to track how much of the text has been revealed so far
    const [displayedText, setDisplayedText] = useState("");
  
    // Effect runs whenever text or speed changes
    useEffect(() => {
      // Reset displayed text when new text arrives
      setDisplayedText("");
      
      // Track which character index we're currently on
      let index = 0;
      
      // setInterval runs a function repeatedly at specified intervals
      const interval = setInterval(() => {
        // If we haven't reached the end of the text yet
        if (index < text.length) {
            // Add one more character to the displayed text
            // 'prev' = previous state, charAt(index) gets character at position 'index'
            setDisplayedText(prev => prev + text.charAt(index));
            index++; // Move to next character
        } else {
            // We've typed the full text, stop the interval
            clearInterval(interval);
        }
      }, speed); // Run every 'speed' milliseconds (e.g., 25ms = very fast typing)
      
      // Cleanup function: stop the interval when component unmounts
      // Important to prevent memory leaks and errors
      return () => clearInterval(interval);
    }, [text, speed]); // Re-run effect if text or speed changes
  
    // Render only the portion of text that's been "typed" so far
    return <span>{displayedText}</span>;
};