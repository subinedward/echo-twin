# Quick Migration Guide for Remaining Components

This guide helps you refactor the remaining components to use global CSS classes.

## Components to Migrate

- [ ] VoiceCaptureScreen.tsx
- [ ] NeuralBootScreen.tsx
- [ ] GapResolutionScreen.tsx
- [ ] DashboardScreen.tsx
- [ ] BentoGrid.tsx
- [ ] Footer.tsx
- [ ] NetworkGlobe.tsx
- [ ] TerminalDemo.tsx

## Common Pattern Replacements

### Screen Layouts

| Before | After |
|--------|-------|
| `className="min-h-screen w-full bg-[#050505] text-[#E5E5E5]"` | `className="screen"` |
| `className="min-h-screen w-full bg-[#050505] flex items-center justify-center"` | `className="screen-center"` |
| `className="h-screen flex flex-col md:flex-row"` | `className="screen-split"` |

### Typography

| Before | After |
|--------|-------|
| `className="font-serif text-6xl md:text-8xl"` | `className="heading-xl"` |
| `className="font-serif text-5xl md:text-6xl"` | `className="heading-lg"` |
| `className="font-serif text-4xl md:text-5xl"` | `className="heading-md"` |
| `className="font-mono text-xs text-zinc-500 tracking-widest uppercase"` | `className="text-mono-xs"` |
| `className="font-mono text-sm"` | `className="text-mono-sm"` |

### Buttons

| Before | After |
|--------|-------|
| `className="px-8 py-4 border border-white/20 hover:bg-white hover:text-black transition-colors font-mono text-xs uppercase tracking-widest"` | `className="btn-primary"` |
| `className="border border-white/10 hover:border-white/20 transition-colors"` | `className="btn-secondary"` |

### Inputs

| Before | After |
|--------|-------|
| `className="w-full bg-transparent border-b border-zinc-700 py-3 font-mono text-sm focus:outline-none focus:border-white"` | `className="auth-input"` |
| `className="w-full p-4 bg-transparent border border-white/20 font-mono"` | `className="input-field"` |

### Status & Console

| Before | After |
|--------|-------|
| `className="font-mono text-sm text-zinc-500"` | `className="console-line"` |
| `className="font-mono text-sm text-emerald-500"` | `className="console-line success"` |
| `className="w-2 h-2 bg-zinc-700 animate-pulse"` | `className="status-dot active"` |

### Navigation

| Before | After |
|--------|-------|
| `className="absolute top-6 left-6 text-white/40 hover:text-white transition-colors font-mono text-xs uppercase"` | `className="back-btn"` |
| `className="font-mono text-xs tracking-widest uppercase hover:text-white transition-colors"` | `className="nav-link"` |

## Step-by-Step Process

### 1. Identify Repeated Patterns
Look for repeated className combinations that appear multiple times.

### 2. Check if Class Exists
Search `styles/global.css` to see if a class already exists for that pattern.

### 3. Create New Class if Needed
If no class exists, add it to `styles/global.css`:

```css
/* Add to appropriate section */
.your-new-class {
  /* copy styles from inline classes */
}
```

### 4. Replace in Component
Replace the long className with your new class.

### 5. Test
Make sure the component still looks the same.

## Example: VoiceCaptureScreen.tsx

### Before:
```tsx
<div className="min-h-screen w-full bg-[#050505] text-[#E5E5E5] flex items-center justify-center p-6">
  <div className="w-full max-w-xl flex flex-col items-center text-center space-y-12">
    <h2 className="font-serif text-4xl md:text-5xl">Speak your intent.</h2>
    <p className="font-mono text-sm text-zinc-500 max-w-md mx-auto">
      Your Echo needs to learn your voice signature...
    </p>
  </div>
</div>
```

### After:
```tsx
<div className="screen-center">
  <div className="w-full max-w-xl flex flex-col items-center text-center space-y-12">
    <h2 className="heading-md">Speak your intent.</h2>
    <p className="text-mono-sm text-muted max-w-md mx-auto">
      Your Echo needs to learn your voice signature...
    </p>
  </div>
</div>
```

## When to Keep Tailwind

Keep Tailwind classes for:
- **Spacing**: `p-6`, `m-4`, `space-y-12`, `gap-3`
- **Layout**: `flex`, `grid`, `grid-cols-2`, `items-center`
- **Responsive**: `md:flex-row`, `lg:px-12`
- **One-off sizing**: `w-full`, `max-w-xl`, `h-16`
- **Z-index**: `z-10`, `z-50`

Replace with global CSS for:
- **Colors**: `bg-[#050505]` → use class
- **Typography**: `font-serif text-5xl` → use class
- **Borders**: `border border-white/20` → use class
- **Transitions**: `transition-colors duration-300` → use class
- **Repeated patterns**: anything used 2+ times

## Pro Tips

1. **Search before creating**: Use Ctrl+F in `global.css` to see if a class exists
2. **Name by purpose**: `.upload-bar` not `.white-border-box`
3. **Group related styles**: Keep component-specific classes together
4. **Document as you go**: Add comments in `global.css`
5. **Test incrementally**: Refactor one component at a time

## Quick Reference

For the complete list of available classes, see:
- `styles/global.css` - All class definitions
- `styles/README.md` - Detailed documentation with examples

## Need Help?

If you're unsure how to refactor a specific pattern:
1. Check the already-refactored components (AuthScreen, Hero, ContextIngestScreen)
2. Look for similar patterns in `global.css`
3. Create a new class following the existing naming conventions
