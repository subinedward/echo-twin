// ============================================================================
// APP.TSX - Main Application Component
// ============================================================================
// This is the root component of the application that manages the entire
// user journey through different screens using a simple view-based router.

// Import React and the useState hook for managing component state
import React, { useState } from 'react';

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
  // STATE MANAGEMENT
  // ---------------
  // The 'view' state determines which screen is currently visible
  // TypeScript type ensures only valid view names can be used
  const [view, setView] = useState<'landing' | 'auth' | 'ingest' | 'voice' | 'boot' | 'interview' | 'dashboard'>('landing');

  return (
    // Main container with full height and custom background colors
    // The selection pseudo-class inverts colors when user selects text
    <main className="bg-echo-bg min-h-screen text-echo-text selection:bg-echo-text selection:text-echo-bg">
      
      {/* AnimatePresence manages exit animations for components being removed */}
      {/* mode="wait" means new component waits for old one to finish exiting */}
      <AnimatePresence mode="wait">
        
        {/* LANDING PAGE VIEW */}
        {/* Shows when view === 'landing' */}
        {view === 'landing' && (
          <motion.div 
            key="landing" // Unique key required by AnimatePresence
            exit={{ opacity: 0, x: -20 }} // Fade out and slide left when leaving
            transition={{ duration: 0.5 }} // Animation takes 0.5 seconds
          >
            {/* The landing page is composed of multiple sections */}
            <Hero onStart={() => setView('auth')} /> {/* Hero section with CTA button */}
            <BentoGrid /> {/* Feature showcase in grid layout */}
            <NetworkGlobe /> {/* 3D globe visualization */}
            <Footer /> {/* Simple footer */}
          </motion.div>
        )}
        
        {/* AUTHENTICATION VIEW */}
        {/* Shows when view === 'auth' */}
        {view === 'auth' && (
          <motion.div 
            key="auth"
            initial={{ opacity: 0, x: 20 }} // Start invisible and to the right
            animate={{ opacity: 1, x: 0 }} // Fade in and move to normal position
            exit={{ opacity: 0 }} // Fade out when leaving
            transition={{ duration: 0.5 }}
          >
            {/* Auth screen with callback functions to navigate */}
            <AuthScreen 
              onBack={() => setView('landing')}  // Go back to landing page
              onComplete={() => setView('ingest')}  // Move to next step after auth
            />
          </motion.div>
        )}

        {/* CONTEXT INGESTION VIEW */}
        {/* Shows when view === 'ingest' */}
        {view === 'ingest' && (
          <motion.div 
            key="ingest"
            initial={{ opacity: 0 }} // Start invisible
            animate={{ opacity: 1 }} // Fade in
            exit={{ opacity: 0 }} // Fade out
            transition={{ duration: 0.8 }} // Slightly longer transition
          >
            {/* Screen for uploading documents and connecting data sources */}
            <ContextIngestScreen onNext={() => setView('voice')} />
          </motion.div>
        )}

        {/* VOICE CAPTURE VIEW */}
        {/* Shows when view === 'voice' */}
        {view === 'voice' && (
          <motion.div 
            key="voice"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Screen for recording user's voice for AI cloning */}
            <VoiceCaptureScreen onConfirm={() => setView('boot')} />
          </motion.div>
        )}

        {/* NEURAL BOOT VIEW */}
        {/* Shows when view === 'boot' */}
        {view === 'boot' && (
          <motion.div 
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Terminal-style screen showing system "booting up" the AI */}
            <NeuralBootScreen onComplete={() => setView('interview')} />
          </motion.div>
        )}

        {/* GAP RESOLUTION VIEW (Interview) */}
        {/* Shows when view === 'interview' */}
        {view === 'interview' && (
          <motion.div 
            key="interview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Chat interface where AI asks questions to fill knowledge gaps */}
            <GapResolutionScreen onDeploy={() => setView('dashboard')} />
          </motion.div>
        )}

        {/* DASHBOARD VIEW */}
        {/* Shows when view === 'dashboard' - This is the final destination */}
        {view === 'dashboard' && (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }} // No exit animation - this is the end state
          >
            {/* Main control panel for managing the AI twin */}
            <DashboardScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// Export the App component as the default export
// This allows other files to import it with: import App from './App'
export default App;