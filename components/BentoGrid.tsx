// ============================================================================
// BENTOGRID.TSX - Feature Showcase Grid
// ============================================================================
// This component displays a modern "Bento Box" style grid layout that showcases
// the key features of the application. Named after Japanese bento boxes due to
// the compartmentalized, grid-based design.
//
// Grid Layout (3 columns x 2 rows on desktop):
// ┌─────────┬───────────────────┐
// │  Input  │   Process Engine  │
// │ Sources │                   │
// │         ├───────────────────┤
// │ (tall)  │   Gatekeeper      │
// └─────────┴───────────────────┘

// Import React and hooks
import React, { useEffect, useState } from 'react';

// Import motion for animations
import { motion } from 'framer-motion';

// Import icons from lucide-react library
import { FileText, FileJson, Mic, Activity, Lock, Unlock } from 'lucide-react';

// ============================================================================
// MAIN BENTO GRID COMPONENT
// ============================================================================

/**
 * BentoGrid Component
 * 
 * A feature showcase using a bento-box style grid layout.
 * The grid adapts responsively:
 * - Mobile: Single column, stacked boxes
 * - Desktop: 3 columns x 2 rows with varying box sizes
 */
export const BentoGrid: React.FC = () => {
  return (
    // Main section with border at bottom
    <section className="bg-echo-bg border-b border-echo-border">
      
      {/* GRID CONTAINER */}
      {/* Responsive grid: 1 column on mobile, 3 columns with 2 rows on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 h-auto md:h-[600px] w-full">
        
        {/* ===== BOX 1: INPUT SOURCES (Tall, Left Column) ===== */}
        {/* This box spans 2 rows on desktop, showing data input options */}
        <div className="col-span-1 md:row-span-2 border-r border-b md:border-b-0 border-echo-border p-8 flex flex-col relative group overflow-hidden">
          
          {/* Animated line that sweeps across the top on hover */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-echo-text/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          
          {/* Section title */}
          <h3 className="font-mono text-xs tracking-widest text-echo-text/50 mb-8">01__INPUT_STREAMS</h3>
          
          {/* List of data sources that can be ingested */}
          <div className="flex-1 space-y-4 font-mono text-sm text-echo-text/80">
            {/* Each FeatureItem represents a different data source */}
            <FeatureItem icon={<FileText size={16} />} text="LinkedIn_Profile.pdf" size="2.4MB" />
            <FeatureItem icon={<FileJson size={16} />} text="GitHub_Main_Repo" size="Repo" />
            <FeatureItem icon={<Mic size={16} />} text="Voice_Note_001.mp3" size="04:20" />
            <FeatureItem icon={<FileText size={16} />} text="Obsidian_Vault.zip" size="142MB" />
            <FeatureItem icon={<Activity size={16} />} text="Notion_Brain_Dump" size="API" />
          </div>

          {/* Status indicator at bottom of box */}
          <div className="mt-8 pt-8 border-t border-echo-border/30">
             <div className="flex justify-between font-mono text-xs text-echo-text/40">
               <span>STATUS:</span>
               {/* Pulsing green text to show active listening */}
               <span className="animate-pulse text-green-500">LISTENING</span>
             </div>
          </div>
        </div>

        {/* ===== BOX 2: PROCESS ENGINE (Wide, Top Right) ===== */}
        {/* Spans 2 columns, showing the AI analysis process */}
        <div className="col-span-1 md:col-span-2 border-b border-echo-border p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Section title */}
          <h3 className="font-mono text-xs tracking-widest text-echo-text/50 mb-4">02__PROCESS_ENGINE</h3>
          
          {/* Content centered vertically */}
          <div className="flex-1 flex flex-col justify-center">
             {/* Main heading */}
             <h4 className="font-serif text-3xl md:text-4xl text-echo-text mb-4">Gap Analysis Engine</h4>
             
             {/* Animated scanning effect overlaid on text */}
             <div className="relative font-mono text-xs md:text-sm text-echo-text/40 space-y-1 w-full max-w-lg">
                {/* Animated scanning line that moves down repeatedly */}
                <ScanningLine />
                <p>Analyzing semantic density...</p>
                <p>Structuring unspoken context...</p>
                {/* Redacted text effect (visible but not selectable) */}
                <p className="bg-echo-text/10 text-transparent select-none">REDACTED DATA BLOCK A12</p>
                <p>Mapping neural associations...</p>
             </div>
          </div>
        </div>

        {/* ===== BOX 3: GATEKEEPER (Wide, Bottom Right) ===== */}
        {/* Spans 2 columns, showing the filtering/vetting system */}
        <div className="col-span-1 md:col-span-2 p-8 flex flex-col justify-between bg-echo-bg relative">
          {/* Section title */}
          <h3 className="font-mono text-xs tracking-widest text-echo-text/50 mb-4">03__GATEKEEPER</h3>
          
          {/* Content in a row layout (text left, toggle right) */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 h-full">
            {/* Description text */}
            <div className="max-w-sm">
                <h4 className="font-serif text-2xl text-echo-text mb-2">Symbiotic Filter</h4>
                <p className="font-mono text-sm text-echo-text/60">
                    Automated vetting based on semantic value. Only high-context opportunities pass through.
                </p>
            </div>
            
            {/* Animated allow/deny toggle switch */}
            <AutoToggle />
          </div>
        </div>

      </div>
    </section>
  );
};

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

/**
 * FeatureItem Component
 * 
 * Represents a single data source in the input sources list.
 * Shows an icon, filename, and file size with hover effects.
 * 
 * @param icon - The React icon component to display
 * @param text - The filename or description
 * @param size - File size or type (e.g., "2.4MB", "Repo", "04:20")
 */
const FeatureItem = ({ icon, text, size }: { icon: React.ReactNode, text: string, size: string }) => (
  // Container with hover effect (background changes on hover)
  <div className="flex items-center justify-between group cursor-pointer hover:bg-echo-text/5 p-2 -mx-2 transition-colors">
    {/* Left side: Icon and text */}
    <div className="flex items-center gap-3">
      {/* Icon that brightens on hover */}
      <span className="text-echo-text/40 group-hover:text-echo-text transition-colors">{icon}</span>
      {/* Filename/description */}
      <span>{text}</span>
    </div>
    {/* Right side: Size/type indicator (dimmed) */}
    <span className="text-xs text-echo-text/30">{size}</span>
  </div>
);

/**
 * ScanningLine Component
 * 
 * Creates a horizontal line that continuously scans up and down,
 * simulating a radar or progress scanner effect.
 * Used in the Process Engine box to show active analysis.
 */
const ScanningLine = () => (
  // Animated horizontal line (1px height, green with glow effect)
  <motion.div 
    className="absolute top-0 left-0 w-full h-[1px] bg-green-500/50 shadow-[0_0_8px_rgba(34,197,94,0.6)] z-10"
    // Animation: Move from top (0%) to bottom (100%) and back
    animate={{ top: ['0%', '100%', '0%'] }}
    // Transition settings:
    // - duration: 4 seconds for full cycle
    // - repeat: Loop forever
    // - ease: Linear motion (constant speed)
    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
  />
);

/**
 * AutoToggle Component
 * 
 * An animated toggle switch that automatically flips between DENY and ALLOW states.
 * Demonstrates the gatekeeper's filtering system.
 * 
 * Features:
 * - Animated switch slider that moves left/right
 * - Lock icon (DENY) on the left
 * - Unlock icon (ALLOW) on the right
 * - Toggles every 2.5 seconds automatically
 */
const AutoToggle = () => {
    // State to track whether access is currently allowed or denied
    // starts as false (DENY)
    const [allowed, setAllowed] = useState(false);

    // Effect to automatically toggle the switch every 2.5 seconds
    useEffect(() => {
        // setInterval runs a function repeatedly at specified intervals
        const interval = setInterval(() => {
            // Toggle: if true becomes false, if false becomes true
            setAllowed(prev => !prev);
        }, 2500); // Every 2500 milliseconds (2.5 seconds)
        
        // Cleanup: stop the interval when component unmounts
        return () => clearInterval(interval);
    }, []); // Empty dependency array = run once on mount

    return (
        // Container for the toggle controls
        <div className="flex items-center gap-6 font-mono">
            
            {/* LEFT SIDE: DENY (Lock Icon) */}
            {/* Fades out when allowed is true */}
            <div className={`flex flex-col items-center gap-2 transition-opacity duration-300 ${!allowed ? 'opacity-100' : 'opacity-20'}`}>
                <Lock size={24} className="text-red-500" /> {/* Red lock icon */}
                <span className="text-xs text-red-500">DENY</span>
            </div>

            {/* MIDDLE: TOGGLE SWITCH */}
            {/* Visual representation of an on/off switch */}
            <div className="w-16 h-8 border border-echo-border relative p-1">
                {/* The slider that moves left (DENY) or right (ALLOW) */}
                <motion.div 
                    // Color changes based on state: red for deny, green for allow
                    className={`w-[26px] h-full ${allowed ? 'bg-green-500' : 'bg-red-500'}`}
                    // Animate horizontal position (x)
                    // When allowed=true, move 32px to the right. When false, move to 0 (left)
                    animate={{ x: allowed ? 32 : 0 }}
                    // Spring animation for smooth, bouncy movement
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
            </div>

            {/* RIGHT SIDE: ALLOW (Unlock Icon) */}
            {/* Fades out when allowed is false */}
            <div className={`flex flex-col items-center gap-2 transition-opacity duration-300 ${allowed ? 'opacity-100' : 'opacity-20'}`}>
                <Unlock size={24} className="text-green-500" /> {/* Green unlock icon */}
                <span className="text-xs text-green-500">ALLOW</span>
            </div>
        </div>
    )
}