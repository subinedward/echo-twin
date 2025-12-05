// ============================================================================
// NEURALBOOTSCREEN.TSX - System Boot Sequence Animation
// ============================================================================
// This component simulates a terminal "boot sequence" where the AI system
// initializes line by line. It creates a retro, hacker-aesthetic experience
// similar to watching a computer boot up.
//
// How it works:
// 1. Lines appear one at a time with typewriter effect
// 2. Each line shows a system message (e.g., "READING_FILE_BUFFER...")
// 3. After a pause, a result appears (e.g., "[ COMPLETE ]")
// 4. Moves to next line automatically
// 5. When all lines complete, triggers the onComplete callback

// Import React and hooks
import React, { useState, useEffect, useRef } from 'react';

// Import motion for animations
import { motion } from 'framer-motion';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Props for the NeuralBootScreen component
 * 
 * onComplete: Function to call when the boot sequence finishes
 */
interface NeuralBootScreenProps {
  onComplete: () => void;
}

/**
 * LineData Type
 * 
 * Represents a single line in the boot sequence.
 * Each line has:
 * - id: Unique identifier
 * - text: The main message to display
 * - result: Optional result message that appears after the main text
 * - resultColor: Tailwind CSS class for the result text color
 * - pauseAfter: Milliseconds to pause after this line before showing result
 */
type LineData = {
  id: number;
  text: string;
  result?: string;          // Optional: Not all lines have results
  resultColor?: string;     // Optional: Tailwind class like 'text-emerald-500'
  pauseAfter?: number;      // Optional: Defaults to 500ms if not specified
};

// ============================================================================
// BOOT SEQUENCE DATA
// ============================================================================

/**
 * SEQUENCE: Array defining the complete boot sequence
 * 
 * This is the "script" for the boot animation. Each object represents one
 * line that will appear in order. Think of it like a movie script!
 */
const SEQUENCE: LineData[] = [
  { 
    id: 1, 
    text: '> READING_FILE_BUFFER: "PROFILE.PDF"...', 
    result: '[ COMPLETE ]',              // Result shown after pause
    resultColor: 'text-emerald-500',     // Green color for success
    pauseAfter: 500                      // Wait 0.5 seconds before showing result
  },
  { 
    id: 2, 
    text: '> ANALYZING_VOICE_TONE...', 
    result: '(DETECTED: DIRECT, PROFESSIONAL)',  // Result with analysis
    resultColor: 'text-emerald-500',             // Green for success
    pauseAfter: 1200                              // Wait 1.2 seconds
  },
  { 
    id: 3, 
    text: '> CROSS_REF_GITHUB_SKILLS...', 
    result: '[ INDEXED ]', 
    resultColor: 'text-cyan-400',        // Cyan color for this type of result
    pauseAfter: 300                      // Short pause (0.3 seconds)
  },
  { 
    id: 4, 
    text: '> IDENTIFYING_CONTEXT_GAPS...', 
    result: '[ 1 CRITICAL GAP FOUND ]',  // Warning result
    resultColor: 'text-yellow-400',      // Yellow for warnings
    pauseAfter: 800                      // Wait 0.8 seconds
  },
  { 
    id: 5, 
    text: '> SYSTEM_READY.',              // Final line
    result: '',                           // No result for this line
    pauseAfter: 500                       // Final pause before completion
  }
];

export const NeuralBootScreen: React.FC<NeuralBootScreenProps> = ({ onComplete }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [lineStatus, setLineStatus] = useState<'typing' | 'waiting' | 'result' | 'done'>('typing');
  
  // This effect manages the macro-state machine of the sequence
  useEffect(() => {
    if (currentLineIndex >= SEQUENCE.length) {
      const timeout = setTimeout(onComplete, 800);
      return () => clearTimeout(timeout);
    }

    const currentLine = SEQUENCE[currentLineIndex];

    if (lineStatus === 'waiting') {
      const timeout = setTimeout(() => {
        if (currentLine.result) {
          setLineStatus('result');
        } else {
          setLineStatus('done');
        }
      }, currentLine.pauseAfter || 500);
      return () => clearTimeout(timeout);
    }

    if (lineStatus === 'result') {
      const timeout = setTimeout(() => {
        setLineStatus('done');
      }, 400); // Short pause after result appears before moving to next line
      return () => clearTimeout(timeout);
    }

    if (lineStatus === 'done') {
      setCurrentLineIndex(prev => prev + 1);
      setLineStatus('typing');
    }

  }, [currentLineIndex, lineStatus, onComplete]);

  return (
    <div className="min-h-screen w-full bg-black text-white font-mono flex items-center justify-center p-8 relative overflow-hidden">
      
      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 z-50 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] opacity-20" />
      <div className="absolute inset-0 z-40 pointer-events-none mix-blend-overlay opacity-5 animate-pulse bg-white/5" />

      {/* Terminal Container */}
      <div className="max-w-3xl w-full flex flex-col items-start gap-4 z-10">
        
        {SEQUENCE.map((line, index) => {
          // If this line hasn't started yet, don't render it
          if (index > currentLineIndex) return null;

          const isCurrent = index === currentLineIndex;
          const isDone = index < currentLineIndex;

          return (
            <div 
              key={line.id} 
              className={`
                text-sm md:text-lg tracking-wide flex flex-wrap gap-2
                ${isDone ? 'opacity-50 text-zinc-400' : 'opacity-100 text-white shadow-[0_0_10px_rgba(255,255,255,0.4)]'}
                transition-opacity duration-500
              `}
            >
              {/* Typewriter Text */}
              <Typewriter 
                text={line.text} 
                isActive={isCurrent && lineStatus === 'typing'}
                onComplete={() => {
                  if (isCurrent) setLineStatus('waiting');
                }}
              />

              {/* Result Text */}
              {(isDone || (isCurrent && (lineStatus === 'result' || lineStatus === 'done'))) && line.result && (
                <span className={`${line.resultColor || 'text-white'}`}>
                  {line.result}
                </span>
              )}

              {/* Blinking Cursor - Only show on current line */}
              {isCurrent && (
                <BlinkingCursor />
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

const BlinkingCursor = () => (
  <span className="inline-block w-2.5 h-5 bg-white animate-[pulse_1s_ease-in-out_infinite] align-middle ml-1"></span>
);

const Typewriter: React.FC<{ 
  text: string, 
  isActive: boolean, 
  onComplete: () => void 
}> = ({ text, isActive, onComplete }) => {
  const [displayed, setDisplayed] = useState('');
  
  // If not active (meaning it's a past line), show full text immediately
  useEffect(() => {
    if (!isActive && displayed !== text) {
      setDisplayed(text);
    }
  }, [isActive, text, displayed]);

  useEffect(() => {
    if (!isActive) return;

    let index = 0;
    // Faster typing for "Boot" feel
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, index + 1));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
        onComplete();
      }
    }, 30 + Math.random() * 20); // Slight randomness for realism

    return () => clearInterval(interval);
  }, [isActive, text, onComplete]);

  return <span>{displayed}</span>;
};
