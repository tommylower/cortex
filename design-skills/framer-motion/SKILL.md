# Framer Motion Patterns

Animation patterns for React/Next.js using Framer Motion. Use for scroll-triggered reveals, hover states, transitions, and micro-interactions.

## Installation
```bash
pnpm add framer-motion
```

## Core Patterns

### Fade-up on scroll (section entries)
```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  {children}
</motion.div>
```

### Staggered children (card grids, lists)
```tsx
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

<motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
  {items.map((i) => (
    <motion.div key={i} variants={item}>{i}</motion.div>
  ))}
</motion.div>
```

### Hover scale (cards, buttons)
```tsx
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 25 }}
>
  {children}
</motion.div>
```

### Smooth accordion (FAQ)
```tsx
import { AnimatePresence, motion } from 'framer-motion'

<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {content}
    </motion.div>
  )}
</AnimatePresence>
```

### Navigation blur on scroll
```tsx
const [scrolled, setScrolled] = useState(false)

useEffect(() => {
  const handler = () => setScrolled(window.scrollY > 20)
  window.addEventListener('scroll', handler)
  return () => window.removeEventListener('scroll', handler)
}, [])

<motion.nav
  animate={{
    backgroundColor: scrolled ? "rgba(10, 14, 39, 0.8)" : "transparent",
    backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
  }}
  transition={{ duration: 0.2 }}
>
```

### Page/section transitions
```tsx
<motion.section
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.4, delay: 0.1 }}
>
```

## Timing Guidelines

- Micro-interactions (hover, tap): 100-200ms
- Element reveals (fade-up): 300-500ms
- Section transitions: 400-600ms
- Stagger delay between children: 50-100ms
- Spring stiffness for UI: 300-500
- Spring damping for UI: 20-30

## Principles

- Every animation serves a purpose: direct attention, confirm interaction, or reveal content
- No decorative animation — if removing it doesn't hurt clarity, remove it
- Use `viewport={{ once: true }}` for scroll reveals so they don't replay
- Prefer springs over duration-based for interactive elements (hover, drag)
- Prefer easeOut for entrances, easeIn for exits
- Keep total animation time under 600ms — anything longer feels sluggish
- Use DialKit to tune spring values in real time during polish phase
