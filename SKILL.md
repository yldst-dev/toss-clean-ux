---
name: toss-clean-ux
description: >-
  All-in-one Toss-style shadowless OKLCH blue-white design system, single focus
  ring (zero double borders), balanced concentric squircle radii, zero native
  browser UI leaks (custom React checkbox/radio/switch/select/slider/date/file/
  dialog/tooltip + autofill/scrollbar/tap-highlight CSS shield), icon-only
  intuitive controls (NN/g + WCAG 2.2), clean multi-channel data badges instead
  of middle-dot/em-dash walls, scroll-less quiet-chrome responsive layouts,
  frequency-gated motion/react physics, reward-early-punish-late accessible
  forms, zero-duplication plain-Korean UX writing & Toss senior 5-misconception
  guardrails, 4-layer Clean Architecture, and automated clean-build + E2E
  verification gate. Use when building, redesigning, or auditing Korean
  fintech, lead-generation, tool workspaces, landing pages, or beginner/senior-
  friendly React + Vite + TypeScript + motion/react web apps.
---

# Toss Clean UX — Unified Design Engineering, Writing, Architecture & Finish-Gate Skill

Build or refactor React + Vite + TypeScript + `motion/react` interfaces synthesizing Toss Design System (TDS OKLCH overhaul & 7.3M+ senior UX research), Linear Quiet Chrome, Apple HIG / CSS `corner-shape: squircle`, MDN Baseline optical CSS (`text-box-trim`, `scrollbar-gutter: stable`), NN/g + WCAG 2.2 accessibility, Emil Kowalski / Rauno Freiberg frequency-gated motion, and strict 4-layer Clean Architecture.

## Core Non-Negotiables

1. **Shadowless OKLCH 4-Level Blue-White & AA Contrast** — Zero `box-shadow`, `drop-shadow`, `text-shadow`, or `shadow-*` classes (single focus inset ring excluded). Zero pure `#FFFFFF`/`bg-white` backgrounds and zero `#000000`/`bg-black`/`text-black`. Separate elevation strictly via 4 perceptually uniform OKLCH blue-white tonal levels (`#E8EFFA` / `#F1F5FB` / `#F9FBFF` / `#ECF2FA`), `1px solid rgba(49, 130, 246, 0.10)` hairlines, and a single `backdrop-blur-[16px]` sticky header. Keep muted text at **`#64707D`** (WCAG AA `4.5:1+` / APCA `Lc 60+`) so low-contrast monitors and senior eyes read every label effortlessly.
   → Full semantic OKLCH tokens, focus-ring fix, squircle radii & optical CSS: [references/design-tokens.md](./references/design-tokens.md)
2. **Single Focus Border Only (Zero Double Borders)** — Scope global `:focus-visible` strictly to `:where(a, button, [role="button"], [tabindex]):focus-visible` and clear `outline: none` on `input, textarea, select`. Every focusable element owns **exactly one** focus visual (`focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-inset focus:ring-[#3182F6]`; never stack `border` + `ring` + `outline`).
3. **Balanced Concentric Squircle Radii (`R_inner = R_outer - P`)** — Never harshly boxy (`0px–4px`) AND never balloon-like (`rounded-full` on rectangular bars/inputs or `>= 26px`). Standard scale: `8px` badges/icon buttons, `12px–14px` inputs/buttons/list rows/active tabs, `16px` segmented track (`p-1` → `12px` child), `18px–20px` cards/modals. Enhance with `@supports (corner-shape: squircle) { corner-shape: squircle; }` (Chrome/Edge 139+) for continuous curvature with graceful fallback.
4. **Icon-Only Intuitive Controls (NN/g + WCAG 2.2) & Clean Multi-Channel Badges** —
   - **Icon-Only Rule**: Render **icon only** (mandatory `aria-label` + instant-subsequent desktop tooltips) strictly for the 12 universally recognized actions (`X`, `Copy`, `RotateCw`, `Trash2`, `Search`, `Download`, `ExternalLink`, `ArrowLeft`, `Chevron`, `Settings`, `Pause/Play`, `MoreHorizontal`), with `>= 40px` desktop / `>= 44–48px` mobile hit boxes and `>= 8px` spacing. Keep 2–3 word labels on domain-specific/ambiguous actions.
   - **Zero `·` / `—` Walls**: Never glue metrics with middle dots (`대비 7.5 · 수정 1회`) or chain copy with em-dashes (`—`). Use clean `rounded-[8px]` tonal metadata badges (`tabular-nums`, `text-box: trim-both cap alphabetic`), pairing color + icon/text for color-blind accessibility (WCAG 1.4.1).
5. **Scroll-less Quiet Chrome & Clutter-Free Progressive Disclosure** — Fit primary desktop tool/app views inside `100dvh` (`lg:h-[100dvh] lg:overflow-hidden` with `min-h-0 flex-1 overflow-y-auto overscroll-contain` + `scrollbar-gutter: stable` on the single scrollable pane), releasing to natural `min-h-[100dvh]` flow on mobile (`360px–1023px`, never `h-screen`/`min-h-screen`, include `interactive-widget=resizes-content`).
   - **Max 1 clean navigation axis**: prefer 1 synchronized top segmented switcher (3–5 items). Keep chrome quiet (Toss Blue `#3182F6` reserved strictly for system signals). Reveal secondary complexity via hover/focus row toolbars, slide-over sheets, or `⌘K` — never cluttered side-tabs or multi-rail chrome.
   → Quiet Chrome, Frequency-Gated Motion, Reward-Early-Punish-Late Forms & Toss Senior 5-Misconception Playbook: [references/interaction-craft.md](./references/interaction-craft.md)
6. **Zero Native Browser UI Leaks, Custom React Controls & Accessible Form Craft** —
   - **Ban ALL Raw Browser Widgets**: Never expose OS-native `<input type="checkbox|radio|file">` (without `sr-only` wrapper), `<select>`, `<datalist>`, `<input type="range|date|time|datetime-local|month|week|color">`, `<progress>`, or `<meter>`. Replace with shadowless Toss-style React controls: **`TossCheckbox`** (`22px` `rounded-[7px]`, `#3182F6` fill + `Check`), **`TossSelect`** (`rounded-[18px] p-1.5` listbox + `rounded-[12px]` rows + right `Check`, mobile Select BottomSheet for 5+ items), **`TossSwitch`**, **`TossSlider`**, **`TossDatePicker`**, **`TossFileUpload`**, **`TossProgressBar`**, and `type="text" inputMode="numeric"` (avoiding `<input type="number">` OS spinners & scroll-wheel bugs).
   - **Ban Native Browser Popups & OS Chrome Leaks**: Strictly forbid `window.alert()`, `window.confirm()`, `window.prompt()` (use `TossDialog`/`TossToast`), native HTML `title="..."` tooltips (use `aria-label` + React `TossTooltip`), and raw HTML5 validation bubbles (always set `noValidate` on `<form>`). Neutralize `:-webkit-autofill` yellow/blue boxes, `-webkit-tap-highlight-color`, Edge `::-ms-reveal`, search `::-webkit-search-cancel-button`, bulky scrollbars, `<details>` triangles, and jagged `<textarea>` resize grippers in base CSS.
   - **Frequency-Gated Motion**: High-frequency actions (`100×/day`: `⌘K`, filter toggles, dense row selection) use `0ms` or `100–150ms` CSS transitions; spatial transitions (funnel steps, dropdown/sheets, `layoutId` tab slides) use `motion/react` springs (`exit 150ms < enter 220ms`, gate hover behind `@media (hover: hover) and (pointer: fine)`).
   - **Reward Early, Punish Late**: Never disable submit buttons for validation (keep clickable except while actively loading); validate on submit/blur ("punish late"), clear immediately on edit ("reward early"), and auto-focus the first invalid field with gentle `#1B64DA` guidance.
7. **Zero AI Slop, Zero Duplication & Plain-Korean Toss Writing** — Apply Toss 5 Core Values (Clear, Concise "잡초 뽑기", Casual 해요체, Predictable Hint, Easy to Speak) and **Toss 5 Senior Misconception Guardrails** (clear clickable affordance, unmistakable demo labels, no confusing decorative motion, direct copy, scroll-less key actions). Ban jargon, nested cards, 3-up card grids, `animate-ping`, `transition-all`, `Sparkles`, kickers, emojis, and duplicated reassurance (`30초`, `무료`, `신용점수` appear **once** beneath final CTA). Minimum font **`>= 14px`** everywhere; keep Pretendard `letter-spacing: 0` on `14px–20px` UI copy (`-0.02em` only on `>= 32px` Display H1).
   → Complete ban list, copy dictionary & Web Interface Guidelines: [references/ux-writing-anti-slop.md](./references/ux-writing-anti-slop.md)
8. **Strict 4-Layer Clean Architecture & Verification Gate** — Enforce `presentation -> application -> domain <- infrastructure` (`0` React/Motion/UI imports in `src/domain/`). Every async surface implements a zero-CLS state contract (`idle / loading skeleton / empty / gentle error / duplicate / success`).
   → Layer blueprint & real-browser E2E protocol: [references/clean-arch-e2e.md](./references/clean-arch-e2e.md)

---

## Execution Workflow

### Step 1. Pre-Modification Audit
1. Check `package.json` for `motion` (`motion/react`) and `lucide-react`; inspect `index.html` (`viewport-fit=cover`, `interactive-widget=resizes-content`) and `index.css` (global `:focus-visible` double-border traps, OKLCH contrast, scrollbars).
2. Run the bundled audit script (`scripts/audit.mjs` inside this skill directory) for a baseline:
   ```bash
   node <skill-dir>/scripts/audit.mjs <project-root>
   ```
3. Preserve working `domain`/`application`/`infrastructure` interfaces when refactoring UI/copy.

### Step 2. Apply Optical Tokens, Browser Chrome Shield & Scroll-less Layout
- Configure `src/index.css` per [references/design-tokens.md](./references/design-tokens.md): OKLCH 4-level blue-white tokens (`--text-muted: #64707D`), double-border-safe focus rules, global Browser Chrome Neutralization Shield (`-webkit-tap-highlight-color`, `:-webkit-autofill`, `::-ms-reveal`, search/number pseudo-elements, thin blue-tinted scrollbars, `field-sizing: content`), progressive `@supports (corner-shape: squircle)`, Baseline `text-box: trim-both cap alphabetic`, `scrollbar-gutter: stable`, `@media (hover: hover) and (pointer: fine)`, and `0` shadows.
- Architect desktop as scroll-less `100dvh` with max 1 navigation axis and synchronized concentric radii (`R_inner = R_outer - P`).

### Step 3. Refine Custom Form Controls, Micro-Interactions & Copy
- Replace every native browser widget/popup (`checkbox`, `radio`, `select`, `datalist`, `range`, `date/time`, `file`, `color`, `progress`, `alert/confirm/prompt`, `title` tooltip, HTML5 bubbles) with custom Toss-style React components (`TossCheckbox`, `TossSelect`, `TossSwitch`, `TossSlider`, `TossDatePicker`, `TossFileUpload`, `TossDialog`, `TossToast`, `TossTooltip`, `<form noValidate>`); apply frequency-gated motion, reward-early-punish-late forms, icon-only controls, clean multi-channel data badges, and plain-Korean zero-duplication copy per [references/design-tokens.md](./references/design-tokens.md), [references/interaction-craft.md](./references/interaction-craft.md), and [references/ux-writing-anti-slop.md](./references/ux-writing-anti-slop.md).

### Step 4. Mandatory Verification Gate (Zero Violations Required)
1. **Static & Build Gate** — Run the bundled auditor with `--build` (`tsc -b && vite build`):
   ```bash
   node <skill-dir>/scripts/audit.mjs <project-root> --build
   ```
   Fix every error until exit code is `0`.
2. **Real Browser E2E & Visual Gate** — Render at `1440×900`, `375×812`, and `360×780` (via `ego-browser` if available) and inspect screenshots for focused inputs (`0` double borders), balanced concentric squircle corners, icon-only controls, scannable data badges, scroll-less viewport fit, zero CLS, and all states in [references/clean-arch-e2e.md](./references/clean-arch-e2e.md).
