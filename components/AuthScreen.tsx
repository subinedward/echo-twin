import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowLeft, Loader2 } from 'lucide-react';
import { Logo } from './Logo';
import { WelcomeScreen } from './WelcomeScreen';

const toTitleCase = (str: string) => {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  );
};

interface AuthScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onBack, onComplete }) => {
  const [status, setStatus] = useState<'idle' | 'verifying' | 'granted'>('idle');
  const [socialStatus, setSocialStatus] = useState<'idle' | 'verifying' | 'connected'>('idle');
  const [selectedProvider, setSelectedProvider] = useState<'google' | 'linkedin' | null>(null);
  const [name, setName] = useState('');
  const [twinsCount, setTwinsCount] = useState(100);
  const [conversationsCount, setConversationsCount] = useState(657);

  useEffect(() => {
    const twinsInterval = setInterval(() => {
      setTwinsCount(prev => prev + 1);
    }, 1000); // Increment twins every 1 second

    const conversationsInterval = setInterval(() => {
      setConversationsCount(prev => prev + 1);
    }, 400); // Increment conversations every 2 seconds

    return () => {
      clearInterval(twinsInterval);
      clearInterval(conversationsInterval);
    };
  }, []);

  const handleSocialAuth = (provider: 'google' | 'linkedin') => {
    if (socialStatus !== 'idle') return;
    setSocialStatus('verifying');
    setSelectedProvider(provider);
    
    // Simulate Social Auth delay
    setTimeout(() => {
      setSocialStatus('connected');
    }, 1500);
  };

  const handleAuth = () => {
    if (status !== 'idle') return;
    setStatus('verifying');
    
    // Simulate API delay
    setTimeout(() => {
      setStatus('granted');
    }, 1500);
  };

  return (
    <div className="h-screen w-full bg-[#050505] text-[#E5E5E5] flex flex-col md:flex-row overflow-hidden relative">
      
      {/* Exit Animation Overlay */}
      <AnimatePresence>
        {status === 'granted' && (
          <WelcomeScreen onComplete={onComplete} name={toTitleCase(name)} />
        )}
      </AnimatePresence>

      {/* LEFT COLUMN: FORM */}
      <div className="w-full md:w-1/2 h-full border-r border-white/10 flex flex-col relative z-20 bg-[#050505] min-h-screen md:min-h-0">
        <button 
          onClick={onBack}
          className="back-btn"
        >
          <ArrowLeft size={14} /> Back
        </button>

        <div className="flex-1 flex flex-col items-center justify-center px-8 md:px-24">
           <div className="w-full max-w-sm space-y-8">
              <div className="space-y-2 flex flex-col items-center">
                <Logo />
                <h2 className="heading-md text-center">Create an account</h2>
              </div>

              {/* Form Inputs */}
              <div className="space-y-4">
                 {/* Social Buttons */}
                 {(socialStatus === 'idle' || selectedProvider === 'google') && (
                 <button 
                   onClick={() => handleSocialAuth('google')}
                   disabled={socialStatus !== 'idle'}
                   className={`auth-social-btn ${socialStatus === 'connected' ? 'border-emerald-500/50 text-emerald-500 bg-emerald-500/10' : ''}`}
                 >
                    {socialStatus === 'connected' ? (
                        <Check size={16} />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor"/>
                        </svg>
                    )}
                    {socialStatus === 'verifying' ? 'VERIFYING...' : socialStatus === 'connected' ? 'CONNECTED WITH GOOGLE' : 'GET STARTED WITH GOOGLE'}
                 </button>
                 )}
                 
                 {(socialStatus === 'idle' || selectedProvider === 'linkedin') && (
                    <button 
                        onClick={() => handleSocialAuth('linkedin')}
                        disabled={socialStatus !== 'idle'}
                        className={`auth-social-btn ${socialStatus === 'connected' ? 'border-emerald-500/50 text-emerald-500 bg-emerald-500/10' : ''}`}
                    >
                        {socialStatus === 'connected' ? (
                            <Check size={16} />
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>
                            </svg>
                        )}
                        {socialStatus === 'verifying' ? 'VERIFYING...' : socialStatus === 'connected' ? 'CONNECTED WITH LINKEDIN' : 'GET STARTED WITH LINKEDIN'}
                    </button>
                 )}

                 {/* Divider & Name Input - Only show after social connection */}
                 <AnimatePresence>
                    {socialStatus === 'connected' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="space-y-4 overflow-hidden"
                        >
                            <div className="divider-text pt-4">
                                <span>// COMPLETE PROFILE //</span>
                            </div>

                            <div className="space-y-6">
                                <input 
                                type="text" 
                                placeholder="ENTER NAME"
                                className="auth-input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoFocus
                                />
                                
                                <button 
                                onClick={handleAuth}
                                disabled={status !== 'idle' || !name.trim()}
                                className="auth-submit-btn"
                                >
                                {status === 'idle' && '[ CREATE ACCOUNT ]'}
                                {status === 'verifying' && (
                                    <>
                                    <Loader2 size={14} className="animate-spin" /> VERIFYING...
                                    </>
                                )}
                                {status === 'granted' && (
                                    <>
                                    <Check size={14} /> ACCESS GRANTED
                                    </>
                                )}
                                </button>
                            </div>
                        </motion.div>
                    )}
                 </AnimatePresence>
              </div>
           </div>
        </div>
      </div>

      {/* RIGHT COLUMN: DIGITAL TWIN INITIATION */}
      <div className="hidden md:flex w-1/2 h-full bg-[#050505] items-center justify-center relative overflow-hidden min-h-screen md:min-h-0">
         {/* Status Text */}
         <div className="absolute top-6 right-6 font-mono text-[10px] text-zinc-600 text-right space-y-1">
            <p>NUMBER OF DIGITAL TWINS CREATED: {twinsCount}</p>
            <p>CONVERSATIONS HANDLED: {conversationsCount}</p>
         </div>

         <DigitalTwinInitiation />
      </div>

    </div>
  );
};

const DigitalTwinInitiation = () => {
    return (
        <div className="relative w-[500px] h-[500px] flex items-center justify-center">
            {/* Core Glow */}
            <motion.div
                animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"
            />

            {/* Central Sphere / Core */}
            <div className="relative z-10 w-24 h-24 rounded-full bg-black border border-cyan-500/30 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.2),transparent)]" />
                {/* Inner pulsing core */}
                <motion.div
                    animate={{ scale: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-8 h-8 bg-cyan-400 rounded-full blur-md"
                />
            </div>

            {/* Orbiting Data Rings */}
            {[1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                    transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                    className={`absolute rounded-full border border-dashed ${
                        i === 1 ? 'w-48 h-48 border-emerald-500/20' : 
                        i === 2 ? 'w-72 h-72 border-cyan-500/10' : 
                        'w-96 h-96 border-white/5'
                    }`}
                >
                    {/* Orbital Particle */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />
                </motion.div>
            ))}

            {/* Scanning Plane */}
            <motion.div
                animate={{ 
                    rotateX: [0, 360],
                    rotateY: [0, 360],
                    rotateZ: [0, 180]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute w-64 h-64 border border-cyan-500/10 rounded-full"
                style={{ transformStyle: 'preserve-3d' }}
            />

            {/* Vertical Scanning Line */}
            <motion.div
                initial={{ top: '0%', opacity: 0 }}
                animate={{ 
                    top: ['0%', '100%'],
                    opacity: [0, 1, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
            />
        </div>
    );
};