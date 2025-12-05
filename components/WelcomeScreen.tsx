import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeScreenProps {
  onComplete: () => void;
  name: string;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete, name }) => {
  const [step, setStep] = useState<'init' | 'access' | 'welcome' | 'exit'>('init');

  useEffect(() => {
    // Sequence controller
    const sequence = async () => {
      // Step 1: Init (short pause)
      await new Promise(r => setTimeout(r, 500));
      setStep('access');

      // Step 2: Access Granted (show for 2s)
      await new Promise(r => setTimeout(r, 2000));
      setStep('welcome');

      // Step 3: Welcome Home (show for 2.5s)
      await new Promise(r => setTimeout(r, 2500));
      setStep('exit');

      // Step 4: Exit animation (1s) then complete
      await new Promise(r => setTimeout(r, 1000));
      onComplete();
    };

    sequence();
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />

      <AnimatePresence mode="wait">
        {step === 'access' && (
          <motion.div
            key="access"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="h-[1px] bg-emerald-500 w-64 absolute top-1/2 left-0 -translate-y-1/2"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.5, 1] }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="px-4 py-2 bg-[#050505] border border-emerald-500/30 text-emerald-500 font-mono text-sm tracking-[0.2em] relative z-10"
              >
                ACCOUNT CREATED
              </motion.div>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.8 }}
              className="font-mono text-[10px] text-emerald-500/50"
            >
              ID: 8492-ALPHA-KILO
            </motion.p>
          </motion.div>
        )}

        {step === 'welcome' && (
          <motion.div
            key="welcome"
            className="relative z-10 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-2"
            >
              <h1 className="font-serif text-4xl md:text-6xl text-[#E5E5E5] tracking-tight">
                Welcome, {name}
              </h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100px" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-[1px] bg-white/20 mx-auto"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-8 flex flex-col items-center gap-2"
            >
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scaleY: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    className="w-[2px] h-4 bg-cyan-500"
                  />
                ))}
              </div>
              <p className="font-mono text-[10px] text-cyan-500/60 tracking-widest uppercase">
                Initializing Environment
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Corners */}
      <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-white/20" />
      <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-white/20" />
      <div className="absolute bottom-8 left-8 w-4 h-4 border-b border-l border-white/20" />
      <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-white/20" />
    </motion.div>
  );
};
