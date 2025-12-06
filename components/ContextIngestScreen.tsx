import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, Brain, Linkedin, Mail, Github, ArrowRight, Chrome } from 'lucide-react';
import { BackgroundAnimation } from './BackgroundAnimation';

interface ContextIngestScreenProps {
  onNext: () => void;
  userName: string;
}

const SOURCES = [
  {
    id: 'google',
    label: 'Google Account',
    icon: Chrome,
    description: "We need access to your email and calendar to understand your communication patterns, schedule, and professional network.",
    usage: [
      "Analyze communication tone and frequency",
      "Map professional relationships",
      "Identify key projects and timelines"
    ]
  },
  {
    id: 'linkedin',
    label: 'LinkedIn Profile',
    icon: Linkedin,
    description: "Your professional history helps us construct a capability matrix and understand your career trajectory.",
    usage: [
      "Extract skills and endorsements",
      "Map career progression",
      "Identify industry influence"
    ]
  },
  {
    id: 'github',
    label: 'GitHub Account',
    icon: Github,
    description: "Analyzing your code repositories allows us to calibrate your digital twin's logic centers and problem-solving style.",
    usage: [
      "Analyze coding patterns and style",
      "Identify technical strengths",
      "Map contribution frequency"
    ]
  },
  {
    id: 'llm',
    label: 'Connect LLM',
    icon: Brain,
    description: "A neural handshake synchronizes your cognitive patterns with the digital twin's core processing unit.",
    usage: [
      "Establish baseline personality",
      "Synchronize decision-making models",
      "Finalize neural integration"
    ]
  }
] as const;

const STEP_MESSAGES = [
  ["Hang in there, just three more steps, you can do it", "Step 1 of 4", "You've got this!", "Step 1 of 4"],
  ["Halfway there!", "Step 2 of 4", "Keep pushing forward", "Step 2 of 4"],
  ["Almost done!", "Step 3 of 4", "One more step to go", "Step 3 of 4"],
  ["Final step!", "Step 4 of 4", "You have almost created your digital twin!", "Step 4 of 4"]
];

export const ContextIngestScreen: React.FC<ContextIngestScreenProps> = ({ onNext, userName }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'processing' | 'done'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const currentSource = SOURCES[currentStep];

  useEffect(() => {
    setCurrentMessageIndex(0);
    const interval = setInterval(() => {
      setCurrentMessageIndex(prev => (prev + 1) % STEP_MESSAGES[currentStep].length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentStep]);

  const addLog = (text: string) => {
    setLogs(prev => [...prev, text]);
  };

  const handleSkip = () => {
    if (currentStep < SOURCES.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onNext();
    }
  };

  const handleConnect = () => {
    if (connectionStatus !== 'idle') return;
    setConnectionStatus('connecting');
    setProgress(10);
    setLogs([]);

    const option = currentSource.id;

    if (option === 'llm') {
        // LLM Specific Flow
        setTimeout(() => {
            setConnectionStatus('processing');
            setProgress(30);
            addLog("> INITIATING_NEURAL_HANDSHAKE...");
            
            setTimeout(() => {
                addLog("> AUTHENTICATING_PROVIDER_TOKEN... OK");
                setProgress(45);
            }, 800);

            setTimeout(() => {
                addLog("> FETCHING_MEMORY_FRAGMENTS...");
                setProgress(60);
            }, 1600);

            setTimeout(() => {
                addLog("> ANALYZING_CONTEXT_VECTORS...");
                setProgress(75);
            }, 2400);

            setTimeout(() => {
                addLog("> FILTERING_PII_DATA... [REDACTED]");
                addLog("> REMOVING_IRRELEVANT_NOISE...");
                setProgress(90);
            }, 3200);

            setTimeout(() => {
                setConnectionStatus('done');
                setProgress(100);
                addLog("> MEMORY_INTEGRATION_COMPLETE");
                
                setTimeout(() => {
                    setCompletedSteps(prev => new Set(prev).add(option));
                    setConnectionStatus('idle');
                    if (currentStep < SOURCES.length - 1) {
                        setCurrentStep(prev => prev + 1);
                    } else {
                        onNext();
                    }
                }, 1500);
            }, 4500);

        }, 1500);
    } else {
        // Generic Flow for others
        setTimeout(() => {
            setConnectionStatus('processing');
            setProgress(50);
            addLog(`> CONNECTING_TO_${option.toUpperCase()}...`);
            
            setTimeout(() => {
                addLog("> IMPORTING_PROFILE_DATA...");
                setProgress(80);
            }, 1000);

            setTimeout(() => {
                setConnectionStatus('done');
                setProgress(100);
                addLog("> SYNC_COMPLETE");
                setTimeout(() => {
                    setCompletedSteps(prev => new Set(prev).add(option));
                    setConnectionStatus('idle');
                    if (currentStep < SOURCES.length - 1) {
                        setCurrentStep(prev => prev + 1);
                    } else {
                        onNext();
                    }
                }, 1000);
            }, 2500);
        }, 1000);
    }
  };

  return (
    <div className="screen-center relative overflow-hidden">
      <BackgroundAnimation />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl p-8 relative z-10"
      >
        {/* Header Section */}
        <div className="mb-12 space-y-2">
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-zinc-400 font-mono text-sm"
            >
                WELCOME, {userName ? userName.toUpperCase() : 'USER'}
            </motion.p>
            <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-serif text-white"
            >
                Let's get to know better about you
            </motion.h1>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
            <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-2 uppercase">
                <span>Initialization Sequence</span>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={currentMessageIndex}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        {STEP_MESSAGES[currentStep][currentMessageIndex]}
                    </motion.span>
                </AnimatePresence>
            </div>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep) / SOURCES.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>
        </div>

        {/* Connection Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {SOURCES.map((source, index) => {
                const isActive = index === currentStep;
                const isCompleted = completedSteps.has(source.id);
                
                return (
                    <div
                        key={source.id}
                        className={`
                            relative p-8 border transition-all duration-500 overflow-hidden
                            ${isActive 
                                ? 'border-white/20 bg-white/10 scale-105 z-10' 
                                : isCompleted
                                    ? 'border-emerald-500/30 bg-emerald-500/5 opacity-60'
                                    : 'border-white/5 bg-white/5 opacity-30 grayscale'
                            }
                        `}
                    >
                        {isActive && (
                            <>
                                <span className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent animate-border-flow-top" />
                                <span className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent animate-border-flow-right" />
                                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent animate-border-flow-bottom" />
                                <span className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent animate-border-flow-left" />
                            </>
                        )}
                        {isCompleted && (
                            <div className="absolute top-2 right-2 text-emerald-500">
                                <Check size={16} />
                            </div>
                        )}
                        {source.id === 'llm' ? (
                            <div className={`mb-4 flex gap-1 transition-colors ${isActive ? 'text-white' : isCompleted ? 'text-emerald-500' : 'text-zinc-500'}`}>
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor" d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0726zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
                                </svg>
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor" d="M21.75 0H2.25C1.01 0 0 1.01 0 2.25v19.5C0 22.99 1.01 24 2.25 24h19.5c1.24 0 2.25-1.01 2.25-2.25V2.25C24 1.01 22.99 0 21.75 0zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
                                </svg>
                                
                            </div>
                        ) : (
                            <source.icon 
                                className={`mb-4 transition-colors ${isActive ? 'text-white' : isCompleted ? 'text-emerald-500' : 'text-zinc-500'}`} 
                                size={24} 
                            />
                        )}
                        <div className="font-mono text-xs text-zinc-500 mb-1">SOURCE 0{index + 1}</div>
                        <div className={`text-sm font-medium ${isCompleted ? 'text-emerald-400' : 'text-white'}`}>
                            {source.label}
                        </div>
                    </div>
                );
            })}
        </div>

        {/* Active Step Context / Logs Area */}
        <div className="min-h-[200px] border-t border-white/10 pt-8">
            <AnimatePresence mode="wait">
                {connectionStatus === 'idle' ? (
                    <motion.div
                        key="context-info"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        <div className="space-y-4">
                            <h3 className="text-lg font-serif text-white">Why connect {currentSource.label}?</h3>
                            <p className="text-sm text-zinc-400 leading-relaxed">
                                {currentSource.description}
                            </p>
                            
                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={handleConnect}
                                    className="px-6 py-2 bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-colors flex items-center gap-2"
                                >
                                    Connect Source <ArrowRight size={16} className="button-arrow" />
                                </button>
                                <button
                                    onClick={handleSkip}
                                    className="px-6 py-2 border border-white/10 text-zinc-400 text-sm font-medium hover:bg-white/5 hover:text-white transition-colors"
                                >
                                    Skip for now
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Data Usage Protocols</h4>
                            <ul className="space-y-3">
                                {currentSource.usage.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                                        <div className="mt-1.5 w-1 h-1 rounded-full bg-zinc-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="connection-logs"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-3 text-sm font-mono mb-6">
                            {connectionStatus === 'done' ? (
                                <Check size={16} className="text-emerald-500" />
                            ) : (
                                <Loader2 size={16} className="animate-spin text-zinc-400" />
                            )}
                            <span className="text-zinc-300">
                                {currentSource.id === 'llm' ? 'NEURAL_SYNC_IN_PROGRESS' : 'DATA_INGESTION_ACTIVE'}
                            </span>
                            <span className="text-zinc-600">|</span>
                            <span className="text-zinc-500">{progress}%</span>
                        </div>

                        <div className="font-mono text-[10px] text-zinc-500 space-y-1 pl-4 border-l border-white/10">
                            {logs.map((log, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="uppercase"
                                >
                                    {log}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
};