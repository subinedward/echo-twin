import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mic, StopCircle, Check } from 'lucide-react';

interface VoiceCaptureScreenProps {
  onConfirm: () => void;
}

export const VoiceCaptureScreen: React.FC<VoiceCaptureScreenProps> = ({ onConfirm }) => {
  const [status, setStatus] = useState<'idle' | 'recording' | 'processing' | 'streaming' | 'done'>('idle');
  const [audioData, setAudioData] = useState<number[]>(new Array(5).fill(10)); // 5 bars
  const analyserRef = useRef<AnalyserContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);

  // Constants
  const TARGET_TEXT = "I'm a senior product designer focused on Fintech. I hate making logos, I love building design systems. I'm looking for contract work, $150/hr minimum. No equity-only deals.";

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

  const startRecording = async () => {
    try {
      setStatus('recording');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      
      analyser.fftSize = 32;
      source.connect(analyser);
      
      analyserRef.current = { analyser, audioContext, source };
      
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      const updateVisualizer = () => {
        analyser.getByteFrequencyData(dataArray);
        
        // Extract 5 distinct points from the frequency data
        const bars = [
            dataArray[0],
            dataArray[2],
            dataArray[4],
            dataArray[6],
            dataArray[8]
        ].map(val => Math.max(10, val)); // Min height 10

        setAudioData(bars);
        rafRef.current = requestAnimationFrame(updateVisualizer);
      };
      
      updateVisualizer();
      
    } catch (err) {
      console.error("Mic permission denied, falling back to simulation", err);
      // Fallback simulation
      setStatus('recording');
      const interval = setInterval(() => {
          setAudioData(prev => prev.map(() => Math.random() * 200 + 20));
      }, 100);
      (rafRef.current as any) = interval; // Hacky type cast for storage
    }
  };

  const stopRecording = () => {
    if (status !== 'recording') return;
    
    // Stop stream
    if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    // Stop RAF or Interval
    if (rafRef.current) {
        // Check if it's an ID or interval
        if (typeof rafRef.current === 'number') cancelAnimationFrame(rafRef.current);
        else clearInterval(rafRef.current as any);
    }
    
    // Stop Audio Context
    if (analyserRef.current) {
        analyserRef.current.audioContext.close();
    }

    // Reset visualizer to flat line
    setAudioData(new Array(5).fill(2));
    
    setStatus('processing');
    
    // Simulate Processing Delay then streaming
    setTimeout(() => {
        setStatus('streaming');
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-[#E5E5E5] flex items-center justify-center p-6">
      
      <div className="w-full max-w-xl flex flex-col items-center text-center space-y-12">
        
        {/* Component 1: Human Prompt */}
        <div className="space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl">Speak your intent.</h2>
            <p className="font-mono text-sm text-zinc-500 max-w-md mx-auto">
                What are you looking for right now? Don't overthink it. Just talk.
            </p>
        </div>

        {/* Component 2: Input Device (Sensory Square) */}
        <div className="flex flex-col items-center gap-8">
            <div className={`
                w-32 h-32 border transition-all duration-300 flex items-center justify-center relative
                ${status === 'recording' ? 'border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'border-white/20'}
            `}>
                {/* Visualizer Bars */}
                <div className="flex items-center gap-1 h-full px-4">
                    {audioData.map((val, i) => (
                        <div 
                            key={i}
                            className="w-3 bg-white transition-all duration-75 ease-linear"
                            style={{ height: `${(val / 255) * 80}%` }}
                        />
                    ))}
                </div>

                {/* Tally Light Center (Only when idle or processing) */}
                {status === 'recording' ? null : (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                         <div className={`w-2 h-2 bg-red-500 ${status === 'idle' ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
                    </div>
                )}
            </div>

            {/* Action Button */}
            {status === 'idle' && (
                <button 
                    onClick={startRecording}
                    className="group px-8 py-4 bg-[#050505] border border-white/20 text-white font-mono text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
                >
                    [ INITIATE RECORDING ]
                </button>
            )}

            {status === 'recording' && (
                <button 
                    onClick={stopRecording}
                    className="px-8 py-4 bg-[#050505] border border-red-500/50 text-red-500 font-mono text-xs tracking-widest uppercase hover:bg-red-500 hover:text-black transition-colors animate-pulse"
                >
                    [ STOP TRANSMISSION ]
                </button>
            )}

            {(status === 'processing' || status === 'streaming' || status === 'done') && (
                <div className="h-12 flex items-center font-mono text-xs text-zinc-500 uppercase tracking-widest">
                    {status === 'processing' && (
                        <span className="animate-pulse">&gt; UPSAMPLING AUDIO...</span>
                    )}
                    {status !== 'processing' && <span className="text-emerald-500">TRANSMISSION RECEIVED</span>}
                </div>
            )}
        </div>

        {/* Component 3: Transmutation (Output) */}
        <div className="w-full min-h-[120px] text-left">
            {(status === 'streaming' || status === 'done') && (
                <TypewriterBlock 
                    text={TARGET_TEXT} 
                    onComplete={() => setStatus('done')} 
                />
            )}
        </div>

        {/* Component 4: Navigation */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: status === 'done' ? 1 : 0 }}
            className="w-full flex justify-center"
        >
            <button 
                onClick={onConfirm}
                disabled={status !== 'done'}
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors font-mono text-sm group"
            >
                Confirm & Analyze <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
        </motion.div>

      </div>
    </div>
  );
};

// Types needed for Analyser logic
interface AnalyserContext {
    analyser: AnalyserNode;
    audioContext: AudioContext;
    source: MediaStreamAudioSourceNode;
}

const TypewriterBlock: React.FC<{ text: string, onComplete: () => void }> = ({ text, onComplete }) => {
    const [display, setDisplay] = useState('');

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplay(text.slice(0, i));
            i++;
            if (i > text.length) {
                clearInterval(interval);
                onComplete();
            }
        }, 30); // Fast typing speed
        return () => clearInterval(interval);
    }, [text]);

    return (
        <div className="font-serif text-xl md:text-2xl leading-relaxed text-white">
            {display}
            <span className="inline-block w-2 h-6 bg-white ml-1 animate-pulse align-middle" />
        </div>
    );
};
