# Sunny Day Mascot

A theme for the Claude desktop app. It puts an animated meadow on a clear, sunny day behind your conversation. The little orange mascot flies a kite, jumps for joy, rides a swing, fishes at a pond and floats by in a hot-air balloon, while clouds drift, the sun turns and a butterfly flutters past. The app's colours change to a matching sky-blue light palette, and the chat sits on frosted glass so text stays readable.

The theme shows in the Claude desktop and mobile apps; the terminal draws no themes. It keeps the app in light mode while it is on, and the scene stays still if your system asks for reduced motion.

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install sunny-day-mascot --marketplace richyuen/sunny-day-mascot
```

Answer `y` to add the marketplace, then pick a scope (user is first). The theme applies from the next session you start.

From a shell:

```bash
claude plugin install sunny-day-mascot --marketplace richyuen/sunny-day-mascot
```

In the desktop app, where `/plugin` does not run: click + next to the prompt box, then Plugins, Add marketplace with `richyuen/sunny-day-mascot`, then Add plugin.

## How it works

- `hooks/register.tsx` sets the theme at session start: a colour palette built with `make-colors.js` and a backdrop scene.
- `hooks/scene.ts` is the scene: one SVG animated with CSS `@keyframes`.

The mascots sit in the outer strips of one 1320 x 1000 picture, scaled to fit the window, so on a window about 1320 px wide or wider they stay clear of the frosted chat column; the sky and hills run past the picture to fill any window.

The desktop app draws a backdrop as a still picture if its SVG contains `@media (max-aspect-ratio: ...)` rules, draws nested `<svg>` layers blank, and does not run SVG animation tags such as `<animate>`. Keep to one root `<svg>`, CSS animation and a `prefers-reduced-motion` media query.

`hooks/make-colors.js` and `hooks/make-colors.d.ts` are the palette helper that Claude Code's mod-authoring guide asks mods to copy in unchanged.
