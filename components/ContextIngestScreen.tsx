import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Upload, Loader2 } from 'lucide-react';

interface ContextIngestScreenProps {
  onNext: () => void;
}

export const ContextIngestScreen: React.FC<ContextIngestScreenProps> = ({ onNext }) => {
  const [pdfStatus, setPdfStatus] = useState<'idle' | 'uploading' | 'done'>('idle');
  const [githubStatus, setGithubStatus] = useState<'off' | 'connecting' | 'linked'>('off');
  const [logs, setLogs] = useState<string[]>([]);

  // Helper to add logs with a delay
  const addLog = (text: string, delay = 0) => {
    setTimeout(() => {
      setLogs(prev => [...prev, text]);
    }, delay);
  };

  const handlePdfUpload = () => {
    if (pdfStatus !== 'idle') return;
    setPdfStatus('uploading');
    
    // Simulate upload progress animation duration matches css
    setTimeout(() => {
        setPdfStatus('done');
        // Trigger logs
        addLog("> PARSING_PDF_STRUCTURE... OK", 200);
        addLog("> EXTRACTING_TIMELINE... 4 YEARS FOUND", 800);
        addLog("> IDENTIFYING_SKILLS... [REACT, NODE, DESIGN]", 1400);

        // Auto-navigate after logs are done
        setTimeout(() => {
            onNext();
        }, 3000);
    }, 1500);
  };

  const handleGithubToggle = () => {
    if (githubStatus !== 'off') return;
    setGithubStatus('connecting');

    setTimeout(() => {
        setGithubStatus('linked');
        addLog("> API_HANDSHAKE... SUCCESS", 200);
        addLog("> INDEXING_PINNED_REPOS...", 600);
        addLog("> FOUND: 'fintech-dashboard', 'echo-v1'", 1200);
    }, 2000);
  };

  return (
    <div className="screen-center">
      
      {/* Control Panel Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="context-panel"
      >
        <div className="context-panel-header">
            <h2 className="context-panel-title">Context Load.</h2>
            <p className="context-panel-subtitle">
                &gt; INITIATING NEURAL HANDSHAKE...
            </p>
        </div>

        <div className="context-panel-body space-y-12">
            
            {/* Component 1: Drop Zone */}
            <div className="space-y-4">
                <div className="section-label">01 // Source Material</div>
                
                <div 
                    onClick={handlePdfUpload}
                    className={`upload-bar ${pdfStatus === 'done' ? 'completed' : ''}`}
                >
                    <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: pdfStatus === 'idle' ? "0%" : pdfStatus === 'uploading' ? "45%" : "100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="upload-bar-progress"
                    />

                    <div className="upload-bar-content">
                        <span className="upload-bar-text">
                            {pdfStatus === 'idle' && 'UPLOAD_SOURCE_PDF'}
                            {pdfStatus === 'uploading' && 'PARSING_DATA...'}
                            {pdfStatus === 'done' && 'SOURCE ACQUIRED'}
                        </span>
                        <span>
                            {pdfStatus === 'idle' && <Upload size={16} />}
                            {pdfStatus === 'uploading' && <Loader2 size={16} className="animate-spin" />}
                            {pdfStatus === 'done' && <Check size={16} />}
                        </span>
                    </div>
                </div>

                {/* Terminal Log Output */}
                <div className="min-h-[60px] font-mono text-[10px] text-zinc-500 space-y-1 pl-2 border-l border-white/10">
                    <AnimatePresence>
                        {logs.filter(l => l.includes('PDF') || l.includes('SKILLS') || l.includes('TIMELINE')).map((log, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="uppercase"
                            >
                                {log}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Component 2: Link Switch */}
            <div className="space-y-4 opacity-50 pointer-events-none filter grayscale">
                <div className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">02 // Codebase Index</div>
                
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                    <span className="font-mono text-sm text-zinc-300">GitHub Repositories</span>
                    
                    {/* Bracket Toggle */}
                    <button 
                        onClick={handleGithubToggle}
                        disabled={githubStatus !== 'off'}
                        className="font-mono text-sm focus:outline-none flex items-center gap-2"
                    >
                        {githubStatus === 'connecting' && <Loader2 size={12} className="animate-spin text-zinc-500" />}
                        <span className={`
                            transition-colors duration-300
                            ${githubStatus === 'off' ? 'text-zinc-600' : 'text-white'}
                        `}>
                            [ {githubStatus === 'off' ? 'OFF' : githubStatus === 'connecting' ? 'CONNECTING...' : 'LINKED'} ]
                        </span>
                    </button>
                </div>

                <div className="min-h-[20px] font-mono text-[10px] text-zinc-600 pt-2">
                     OPTIONAL // SKIPPING IN DEMO
                </div>
            </div>

        </div>
      </motion.div>
    </div>
  );
};