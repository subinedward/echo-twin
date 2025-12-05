// ============================================================================
// BUTTON.TSX - Reusable Button Component
// ============================================================================
// This is a generic, reusable button component with built-in animations.
// It can be styled as either a primary (filled) or secondary (outlined) button.

// Import React library
import React from 'react';

// Import motion from framer-motion for animations
// HTMLMotionProps provides TypeScript types for animated HTML elements
import { motion, HTMLMotionProps } from 'framer-motion';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * ButtonProps Interface
 * 
 * Defines all the properties this button component can accept:
 * - children: The content inside the button (text, icons, etc.)
 * - primary: Whether to use primary (filled) or secondary (outline) styling
 * - ...props: Any other standard button props (onClick, disabled, etc.)
 */
interface ButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;  // Content to display inside button
  primary?: boolean;          // Optional: defaults to true (primary style)
}

// ============================================================================
// BUTTON COMPONENT
// ============================================================================

/**
 * Button Component
 * 
 * A customizable button with:
 * - Hover animation (slight scale up)
 * - Click animation (slight scale down)
 * - Two style variants: primary (filled) and secondary (outlined)
 * - Monospace font with uppercase text and wide letter spacing
 * 
 * Usage examples:
 * <Button onClick={handleClick}>Click Me</Button>
 * <Button primary={false}>Secondary Button</Button>
 */
export const Button: React.FC<ButtonProps> = ({ 
  children,           // Button content (e.g., "Submit", "Cancel")
  primary = true,     // Default to primary style if not specified
  ...props            // Spread remaining props (onClick, className, etc.)
}) => {
  return (
    // motion.button creates an animated button element
    <motion.button
      // HOVER ANIMATION
      // When user hovers, scale button to 102% of original size (slight grow effect)
      whileHover={{ scale: 1.02 }}
      
      // CLICK ANIMATION  
      // When user clicks, scale button to 98% of original size (slight press effect)
      whileTap={{ scale: 0.98 }}
      
      // CSS CLASSES
      // Base styles applied to all buttons, with conditional styles based on 'primary' prop
      className={`
        px-8 py-4 font-mono text-sm tracking-wider uppercase border rounded-none transition-colors duration-200
        ${primary 
          // PRIMARY STYLE: Filled button with accent color
          ? 'bg-echo-accent text-echo-bg border-echo-accent hover:bg-echo-bg hover:text-echo-accent' 
          // SECONDARY STYLE: Outlined button with transparent background
          : 'bg-transparent text-echo-text border-echo-border hover:border-echo-accent hover:text-echo-accent'}
      `}
      
      // Spread any additional props passed to the component
      // This allows users to add onClick, disabled, aria-label, etc.
      {...props}
    >
      {/* Render the button's children (the content inside the button) */}
      {children}
    </motion.button>
  );
};