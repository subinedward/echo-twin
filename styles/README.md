# Echo Systems - Global Styling Guide

## Overview

All fonts, colors, and common styles are centralized in `/styles/global.css`. This makes it easy to maintain a consistent design and update styles across the entire application from one location.

## Quick Start

### Changing Fonts

To change the font throughout the application, simply edit the CSS variables in `global.css`:

```css
:root {
  /* Change these to any Google Font or system font */
  --font-serif: 'Lora', serif;        /* Currently Lora - for headings */
  --font-mono: 'JetBrains Mono', monospace;  /* For code/technical text */
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

**Don't forget to update `index.html`** to load the new font from Google Fonts if using a web font.

### Changing Colors

All colors are defined as CSS variables. Update them in one place:

```css
:root {
  --color-bg-primary: #050505;      /* Main background */
  --color-text-primary: #E5E5E5;    /* Main text color */
  --color-accent: #FFFFFF;          /* Accent/highlight color */
  /* ... and more */
}
```

## Available CSS Classes

### Typography

#### Headings (Uses Serif Font)
- `.heading-xl` - Extra large headings (60px)
- `.heading-lg` - Large headings (48px)
- `.heading-md` - Medium headings (36px)
- `.heading-sm` - Small headings (30px)

#### Text Styles
- `.text-mono-xs` - Tiny monospace text with wide letter spacing
- `.text-mono-sm` - Small monospace text
- `.text-mono-base` - Regular monospace text
- `.text-muted` - Muted/gray text
- `.text-code` - Code-style text

#### Font Family Classes
- `.font-serif` - Apply serif font (Lora)
- `.font-mono` - Apply monospace font (JetBrains Mono)
- `.font-sans` - Apply sans-serif font

### Buttons

#### Primary Button
```tsx
<button className="btn-primary">
  Click Me
</button>
```

#### Secondary Button
```tsx
<button className="btn-secondary">
  Secondary Action
</button>
```

#### Icon Button
```tsx
<button className="btn-icon">
  <Icon />
</button>
```

### Form Elements

#### Input Field
```tsx
<input className="input-field" placeholder="Enter text" />
```

#### Label
```tsx
<label className="label">Field Name</label>
```

### Layout Components

#### Container
```tsx
<div className="container">
  {/* Centered content with max-width */}
</div>
```

#### Screen Layouts
```tsx
{/* Full-height centered screen */}
<div className="screen-center">
  <div>Content</div>
</div>

{/* Split screen (two columns on desktop) */}
<div className="screen-split">
  <div className="screen-split-left">Left Content</div>
  <div className="screen-split-right">Right Content</div>
</div>
```

#### Card
```tsx
<div className="card">
  Card content with border and padding
</div>
```

### Component-Specific Classes

#### Auth Screen
- `.auth-social-btn` - Social login buttons (Google, LinkedIn, etc.)
- `.auth-input` - Input fields for authentication
- `.auth-submit-btn` - Submit/authenticate button

#### Hero Screen
- `.hero-title` - Main hero heading
- `.hero-title-emphasis` - Emphasized text within hero title
- `.hero-description` - Subheading/description text
- `.hero-cta` - Call-to-action button/link

#### Navigation
- `.nav-link` - Navigation links
- `.back-btn` - Back navigation button

#### Upload/Progress
- `.upload-bar` - Upload progress bar container
- `.upload-bar-progress` - Progress bar fill
- `.upload-bar-content` - Content overlay on progress bar
- `.upload-bar-text` - Text inside progress bar

#### Console/Terminal
- `.console-line` - Terminal/console line
- `.console-line.success` - Success message (green)
- `.console-line.error` - Error message (red)
- `.console-line.warning` - Warning message (yellow)

#### Context Panel
- `.context-panel` - Main panel container
- `.context-panel-header` - Panel header section
- `.context-panel-title` - Panel title
- `.context-panel-subtitle` - Panel subtitle
- `.context-panel-body` - Panel body content

#### Voice Capture
- `.voice-visualizer` - Voice waveform visualizer container
- `.voice-visualizer.recording` - Recording state
- `.voice-visualizer-bars` - Container for visualization bars
- `.voice-visualizer-bar` - Individual bar in visualizer

### Utility Classes

#### Borders
- `.border-primary` - Standard border
- `.border-light` - Light/subtle border

#### Transitions
- `.transition-base` - Standard transition (300ms)
- `.transition-fast` - Fast transition (150ms)

#### Status Indicators
- `.status-dot` - Status indicator dot
- `.status-dot.active` - Active/success status (green, pulsing)
- `.status-dot.error` - Error status (red)
- `.status-dot.warning` - Warning status (yellow)

#### Dividers
```tsx
{/* Simple divider line */}
<div className="divider" />

{/* Divider with text */}
<div className="divider-text">
  <span>OR</span>
</div>
```

## Usage Examples

### Example 1: Auth Screen Button

**Before (inline styles):**
```tsx
<button className="w-full py-4 border border-white/20 hover:bg-white hover:text-black transition-all duration-300 font-mono text-xs tracking-widest uppercase">
  Continue with Google
</button>
```

**After (using global CSS):**
```tsx
<button className="auth-social-btn">
  Continue with Google
</button>
```

### Example 2: Hero Title

**Before:**
```tsx
<h1 className="font-serif text-6xl md:text-8xl leading-[0.9] mb-8 text-[#E5E5E5]">
  Speak Once.<br />
  <span className="italic text-white">Echo Forever.</span>
</h1>
```

**After:**
```tsx
<h1 className="hero-title">
  Speak Once.<br />
  <span className="hero-title-emphasis">Echo Forever.</span>
</h1>
```

### Example 3: Input Field

**Before:**
```tsx
<input 
  className="w-full bg-transparent border-b border-zinc-700 py-3 font-mono text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-white transition-colors uppercase"
  placeholder="ENTER_ACCESS_KEY"
/>
```

**After:**
```tsx
<input 
  className="auth-input"
  placeholder="ENTER_ACCESS_KEY"
/>
```

## Best Practices

1. **Use CSS classes instead of inline Tailwind classes** for repeated patterns
2. **Keep Tailwind for one-off spacing** (margins, padding, grid layouts)
3. **Update CSS variables** in `global.css` for design system changes
4. **Create new component classes** in `global.css` when you see repeated patterns
5. **Use semantic class names** that describe purpose, not appearance

## Customization Checklist

When customizing the design:

- [ ] Update `--font-serif` in `global.css` (currently Lora)
- [ ] Update `--font-mono` in `global.css` (currently JetBrains Mono)
- [ ] Update Google Fonts link in `index.html`
- [ ] Adjust color variables in `global.css` if needed
- [ ] Test across all screens to ensure consistency

## File Structure

```
echo-systems/
├── styles/
│   └── global.css          # ← All global styles here
├── index.html              # ← Links to global.css, loads fonts
└── components/
    └── *.tsx              # Components use classes from global.css
```

## Support

For questions or issues with styling, refer to the CSS variables and classes defined in `/styles/global.css`. All values are centralized there for easy maintenance.
