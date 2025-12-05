// ============================================================================
// FOOTER.TSX - Simple Footer Component
// ============================================================================
// This is a minimalist footer that appears at the bottom of the landing page.
// It displays the brand name and copyright year in a clean, modern style.

// Import React library
import React from 'react';

/**
 * Footer Component
 * 
 * A simple, centered footer with:
 * - A decorative horizontal line
 * - Copyright text with brand name and year
 * 
 * Uses monospace font and minimal styling to match the overall design aesthetic
 */
export const Footer: React.FC = () => {
  return (
    // Footer container with border, padding, and centered text
    <footer className="py-12 border-t border-echo-border bg-echo-bg text-center">
       {/* Decorative line (thin horizontal bar) centered above the text */}
       <div className="w-12 h-[1px] bg-echo-text mx-auto mb-6"></div>
       
       {/* Copyright text styled in monospace font with wide letter spacing */}
       <p className="font-mono text-xs text-echo-text/40 tracking-[0.2em] uppercase">
         ECHO_SYSTEMS © 2025
       </p>
    </footer>
  );
};