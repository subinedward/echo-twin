// ============================================================================
// APP.TSX - Main Application Component
// ============================================================================
// This is the root component of the application that manages the entire
// user journey through different screens using a simple view-based router.

// Import React and the useState hook for managing component state
import React, { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

// Import all screen components that make up the application flow
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { NetworkGlobe } from './components/NetworkGlobe';
import { Footer } from './components/Footer';
import { AuthScreen } from './components/AuthScreen';
import { ContextIngestScreen } from './components/ContextIngestScreen';
import { VoiceCaptureScreen } from './components/VoiceCaptureScreen';
import { NeuralBootScreen } from './components/NeuralBootScreen';
import { GapResolutionScreen } from './components/GapResolutionScreen';
import { DashboardScreen } from './components/DashboardScreen';

// Import animation components from framer-motion for smooth transitions
// AnimatePresence: Allows components to animate when they're removed from the React tree
// motion: Creates animated versions of HTML elements
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Main App Component
 * 
 * This component acts as the central hub that controls which screen the user sees.
 * It uses a simple state-based routing system (no React Router needed for this demo).
 * 
 * User Flow:
 * 1. landing -> User sees the hero page with marketing content
 * 2. auth -> User authenticates/logs in
 * 3. ingest -> User uploads their context data (PDF, GitHub, etc.)
 * 4. voice -> User records a voice sample
 * 5. boot -> System "boots up" the AI twin
 * 6. interview -> System asks questions to fill knowledge gaps
 * 7. dashboard -> User sees their active AI twin dashboard
 */
function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  return (
    <main className="bg-echo-bg min-h-screen text-echo-text selection:bg-echo-text selection:text-echo-bg">
      
      {/* AnimatePresence manages exit animations for components being removed */}
      {/* mode="wait" means new component waits for old one to finish exiting */}
      <AnimatePresence mode="wait">
        <div key={location.pathname}>
          <Routes location={location}>
            
            {/* LANDING PAGE VIEW */}
            <Route path="/" element={
              <motion.div 
                exit={{ opacity: 0, x: -20 }} 
                transition={{ duration: 0.5 }}
              >
                <Hero onStart={() => navigate('/auth')} />
                <BentoGrid />
                <NetworkGlobe />
                <Footer />
              </motion.div>
            } />
            
            {/* AUTHENTICATION VIEW */}
            <Route path="/auth" element={
              <motion.div 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0 }} 
                transition={{ duration: 0.5 }}
              >
                <AuthScreen 
                  onBack={() => navigate('/')} 
                  onComplete={(name: string) => {
                    setUserName(name);
                    navigate('/ingest');
                  }} 
                />
              </motion.div>
            } />

            {/* CONTEXT INGESTION VIEW */}
            <Route path="/ingest" element={
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                transition={{ duration: 0.8 }}
              >
                <ContextIngestScreen 
                  onNext={() => navigate('/voice')} 
                  userName={userName}
                />
              </motion.div>
            } />

            {/* VOICE CAPTURE VIEW */}
            <Route path="/voice" element={
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <VoiceCaptureScreen onConfirm={() => navigate('/boot')} />
              </motion.div>
            } />

            {/* NEURAL BOOT VIEW */}
            <Route path="/boot" element={
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <NeuralBootScreen onComplete={() => navigate('/interview')} />
              </motion.div>
            } />

            {/* GAP RESOLUTION VIEW (Interview) */}
            <Route path="/interview" element={
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <GapResolutionScreen onDeploy={() => navigate('/dashboard')} />
              </motion.div>
            } />

            {/* DASHBOARD VIEW */}
            <Route path="/dashboard" element={
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <DashboardScreen />
              </motion.div>
            } />

          </Routes>
        </div>
      </AnimatePresence>
    </main>
  );
}

// Export the App component as the default export
// This allows other files to import it with: import App from './App'
export default App;