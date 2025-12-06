import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const BackgroundAnimation: React.FC = () => {
  const [backgroundPoints, setBackgroundPoints] = useState<{id: number, left: string, top: string, delay: number, duration: number}[]>([]);

  useEffect(() => {
    // Generate random points for the background animation
    setBackgroundPoints(Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4
    })));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* Base Grid */}
      <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
              backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
              backgroundSize: '20px 32px',
          }}
      />
      
      {/* Flickering Data Points */}
      {backgroundPoints.map(point => (
          <motion.div
              key={point.id}
              className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full"
              style={{ left: point.left, top: point.top, boxShadow: '0 0 4px #00FFFF' }}
              animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                  duration: point.duration,
                  repeat: Infinity,
                  delay: point.delay,
                  ease: "easeInOut"
              }}
          />
      ))}
      
      {/* Subtle Moving Gradient Orbs */}
       <motion.div 
          animate={{ 
              opacity: [0.03, 0.08, 0.03],
              scale: [1, 1.2, 1],
              x: [-20, 20, -20]
          }}
          transition={{ 
              duration: 15, 
              repeat: Infinity, 
              ease: "easeInOut" 
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"
      />
    </div>
  );
};