---
name: toss-clean-ux
description: >-
  All-in-one Toss-style shadowless OKLCH dual-theme design system (Light
  Blue-White + Toss Elevated Cool-Dark Mode grounded in live TDS/WTS tokens),
  single focus ring (zero double borders), balanced concentric squircle radii,
  zero native browser UI leaks (custom React checkbox/radio/switch/select/
  slider/date/file/dialog/tooltip + autofill/scrollbar/tap-highlight CSS
  shield), icon-only intuitive controls (NN/g + WCAG 2.2), clean multi-channel
  data badges, spacious natural scrolling with Peek Effect (opt-in split-pane
  only for live multi-pane tools), frequency-gated motion/react physics,
  reward-early-punish-late accessible forms, 70% LLM copy purge with structural
  page re-layout (NN/g 20-28% read rate & Krug cut-half-twice), plain-Korean UX
  writing & Toss senior 5-misconception guardrails, 4-layer Clean Architecture,
  and automated clean-build + E2E verification gate. Use when building, redesigning, or
  auditing Korean fintech, lead-generation, dashboards, tool workspaces,
  landing pages, or beginner/senior-friendly React + Vite + TypeScript +
  motion/react web apps.
---

# Toss Clean UX — Unified Design Engineering, Dual-Theme, Writing & Finish-Gate Skill

Build or refactor React + Vite + TypeScript + `motion/react` interfaces grounded in **live production audits across the Toss ecosystem** (`toss.im`, `tossinvest.com` Light & Dark WTS, `tossbank.com`, `toss.tech`, `tosspayments.com`, `docs.tosspayments.com`, `tossplace.com`), Toss TDS OKLCH dual-theme architecture, NN/g scrolling & form psychology, WCAG 2.2 accessibility, Apple/CSS `corner-shape: squircle`, MDN Baseline optical CSS (`text-box-trim`, `scrollbar-gutter: stable`), Emil Kowalski / Rauno Freiberg frequency-gated motion, and strict 4-layer Clean Architecture.

## Core Non-Negotiables

1. **Dual-Theme Shadowless OKLCH System (Light Blue-White + Toss Cool-Dark)** — Zero drop/elevation shadows (`box-shadow` drop blurs, `drop-shadow`, `text-shadow`, `shadow-*`; only zero-blur `1px–2px` `inset` hairlines/focus rings and autofill inset masks are permitted). Zero pure `#FFFFFF`/`bg-white` backgrounds and zero pure `#000000`/`bg-black`/`text-black` anywhere. Always define semantic CSS variables under `:root` (Light Blue-White: `#E8EFFA` / `#F1F5FB` / `#F9FBFF` / `#ECF2FA`, muted ink `#64707D` `>= 4.6:1`) AND `[data-theme="dark"], .dark` (Toss Elevated Cool-Dark: `#101013` / `#17171C` / `#202027` / `#2C2C35`, primary ink `#F2F4F8`, muted ink `#9E9EA4` `>= 5.3:1`, dark primary CTA `#3485FA`, dark link/focus blue `#449BFF`–`#61B0FF`) plus Toss-style cool translucent overlays (`--surface-tint-subtle`, `--surface-tint-hover`, `--border-hairline`). Components reference semantic variables (`var(--...)`) so Light/Dark switching works automatically without FOUC.
   → Full Light + Dark OKLCH token sheet, theme toggle, focus-ring fix, squircle radii, CSS shield & custom controls: [references/design-tokens.md](./references/design-tokens.md)
2. **Single Focus Border Only (Zero Double Borders)** — Scope global `:focus-visible` strictly to `:where(a, button, [role="button"], [tabindex]):focus-visible` and clear `outline: none` on `input, textarea, select`. Every focusable element owns **exactly one** focus visual (`focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--color-focus-ring)]`; never stack `border` + `ring` + `outline`).
3. **Balanced Concentric Squircle Radii (`R_inner = R_outer - P`)** — Never harshly boxy (`0px–4px` on cards/controls) AND never balloon-like (`rounded-full` on rectangular bars/inputs or `>= 26px`). Standard scale: `7px` custom checkbox, `8px` badges/compact icon buttons, `12px–14px` inputs/buttons/list rows/active tabs, `16px` segmented track (`p-1` → `12px` child), `18px` dropdown menu (`p-1.5` → `12px` row), `18px–20px` cards/modals/sheets. Enhance progressively with `@supports (corner-shape: squircle) { corner-shape: squircle; }`.
4. **Icon-Only Intuitive Controls (NN/g + WCAG 2.2) & Clean Multi-Channel Badges** —
   - **Icon-Only Rule**: Render **icon only** (mandatory `aria-label` + instant-subsequent desktop tooltips) strictly for the 12 universally recognized actions (`X`, `Copy`, `RotateCw`, `Trash2`, `Search`, `Download`, `ExternalLink`, `ArrowLeft`, `Chevron`, `Settings`, `Pause/Play`, `MoreHorizontal`, plus `Sun/Moon` theme toggle), with `>= 40px` desktop / `>= 44–48px` mobile hit boxes and `>= 8px` spacing. Keep 2–3 word labels on domain-specific/ambiguous actions.
   - **Zero `·` / `—` Metric Walls**: Never glue metrics with middle dots (`대비 7.5 · 수정 1회`) or chain copy with em-dashes (`—`). Use clean `rounded-[8px]` tonal badges (`tabular-nums`, `text-box: trim-both cap alphabetic`), pairing surface tint + icon + text for color-blind accessibility (WCAG 1.4.1).
5. **Spacious Natural Scrolling, Peek Effect & Quiet Chrome (No Claustrophobic Scroll Locks)** —
   - **Natural Scroll by Default**: Never trap landing pages, forms, blogs, docs, or standard SaaS pages inside cramped `h-[100dvh] overflow-hidden` boxes. Embrace natural fluid vertical scrolling (`min-h-[100dvh]`) with **Toss-style generous whitespace** (`py-14`–`py-24`), **One Thing per Section**, crystal-clear **above-the-fold primary focus**, and NN/g's **Peek Effect** (gently hinting the next section near the fold to avoid the Illusion of Completeness).
   - **Opt-In Split-Pane Workspace ONLY for Multi-Pane Live Tools**: Use a desktop split-pane shell (`lg:h-[100dvh] flex flex-col`) strictly for real-time multi-pane apps (like Toss Securities WTS charts + orderbooks, live editors, split previews) where simultaneous viewing is required; keep every inner pane spacious and independently scrollable (`min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-gutter:stable]`) and release to natural `min-h-[100dvh]` below `1024px`. Never use `h-screen` / `min-h-screen` (breaks mobile browser bars); always include `interactive-widget=resizes-content`.
   - **Quiet Chrome & Clean Navigation**: Prefer top navigation + at most ONE clean secondary axis (either a synchronized top segmented switcher or one airy left navigation tree like `docs.tosspayments.com`). Reserve Toss Blue strictly for system signals and primary/soft-secondary CTA pairs.
   → Spacious Scroll vs Split-Pane Decision Matrix, Theme Switching, Frequency-Gated Motion, Accessible Forms & Senior 5-Misconception Playbook: [references/interaction-craft.md](./references/interaction-craft.md)
6. **Zero Native Browser UI Leaks, Custom React Controls & Accessible Form Craft** —
   - **Ban ALL Raw Browser Widgets**: Never expose OS-native `<input type="checkbox|radio|file">` (without `sr-only` wrapper), `<select>`, `<datalist>`, `<input type="range|date|time|datetime-local|month|week|color">`, `<progress>`, or `<meter>`. Replace with shadowless dual-theme Toss React controls (`TossCheckbox`, `TossSelect` with concentric `rounded-[18px] p-1.5` / `rounded-[12px]` rows + right `Check` or mobile BottomSheet, `TossSwitch`, `TossSlider`, `TossDatePicker`, `TossFileUpload`, `TossProgressBar`), and prefer `type="text" inputMode="numeric"` over `<input type="number">`.
   - **Ban Native Browser Popups & OS Chrome Leaks**: Forbid `window.alert/confirm/prompt` (`TossDialog`/`TossToast`), native HTML `title="..."` tooltips (`aria-label` + `TossTooltip`), and raw HTML5 validation bubbles (`<form noValidate>`). Neutralize `:-webkit-autofill`, `-webkit-tap-highlight-color`, Edge `::-ms-reveal`, search cancel icons, bulky scrollbars, `<details>` triangles, and `<textarea>` resize grippers in base CSS.
   - **Frequency-Gated Motion & Reward-Early-Punish-Late Forms**: Use `0ms–150ms` CSS for high-frequency actions, `motion/react` springs for spatial transitions (`exit` faster than `enter`, hover gated by `@media (hover: hover) and (pointer: fine)`). Never disable submit buttons for client validation; validate on submit/blur, clear on edit, and focus the first invalid field with gentle guidance.
7. **70% LLM Copy Purge, Mandatory Structural Re-Layout & Plain-Korean Toss Writing** — LLMs systematically over-generate UI text ("More is Better" bias), while NN/g research proves users read only **20%–28%** of web words and Steve Krug's rule cuts half, then half again (**75% cut**). On EVERY generated or redesigned screen:
   - **Pass 1 (Ruthless 70% Copy Purge)**: Delete ~70% of duplicate, low-priority, and filler text — all happy talk/greetings (`환영합니다`, `혁신적인 올인원`), eyebrow kickers, subtitles repeating headings, obvious UI instructions (`아래 버튼을 눌러주세요`), symmetrical card filler paragraphs, duplicate reassurance, and Korean filler modifiers ("잡초 뽑기"). Keep **only the essential ~30%**: core value/headline, concrete numbers/status, unmistakable labels/actions, and single-exposure safety/error hints. Move necessary deep details into sheets/accordions.
   - **Pass 2 (Mandatory Structural Re-Layout)**: Never leave awkward hollow boxes after deleting text! Dissolve emptied card shells into open Toss-style typographic stacks or hairline `divide-y` lists, enlarge surviving headlines/metrics, merge thin redundant sections, and rebalance macro (`py-14`–`py-24`) vs. micro (`gap-2`–`gap-3`) whitespace so the page scans like a billboard in **3 seconds**.
   - **Plain-Korean Toss Voice & Typography Floor**: Apply Toss 5 Core Values and **Toss 5 Senior Misconception Guardrails**. Ban jargon, nested cards, 3-up feature card grids, `animate-ping`, `transition-all`, `Sparkles`, kickers, emojis, and duplicated reassurance (`30초`, `무료`, `신용점수` appear at most **once** beneath final CTA when used). Minimum font **`>= 14px`** on all consumer, landing, editorial, and form UI (`13px tabular-nums` permitted strictly for dense pro-data/trading table secondary cells); keep Pretendard `letter-spacing: 0` on `14px–20px` UI copy (`-0.02em` only on `>= 32px` Display H1).
   → 70% Copy Purge + Re-Layout protocol, ban list, copy dictionary & Web Interface Guidelines: [references/ux-writing-anti-slop.md](./references/ux-writing-anti-slop.md)
8. **Strict 4-Layer Clean Architecture & Verification Gate** — Enforce `presentation -> application -> domain <- infrastructure` (`0` React/Motion/UI imports in `src/domain/`). Every async surface implements a zero-CLS state contract (`idle / loading skeleton / empty / gentle error / duplicate / success`).
   → Layer blueprint & real-browser dual-theme E2E protocol: [references/clean-arch-e2e.md](./references/clean-arch-e2e.md)

---

## Execution Workflow

### Step 1. Pre-Modification Audit
1. Check `package.json` for `motion` (`motion/react`) and `lucide-react`; inspect `index.html` (`viewport-fit=cover`, `interactive-widget=resizes-content`, FOUC-free theme init) and `index.css` (Light + Dark semantic CSS variables, `:focus-visible` double-border traps, Browser Chrome Shield).
2. Run the bundled audit script (`scripts/audit.mjs` inside this skill directory) for a baseline:
   ```bash
   node <skill-dir>/scripts/audit.mjs <project-root>
   ```
3. Preserve working `domain`/`application`/`infrastructure` interfaces when refactoring UI/copy.

### Step 2. Apply Dual-Theme OKLCH Tokens, Browser Chrome Shield & Breathable Layout
- Configure `src/index.css` per [references/design-tokens.md](./references/design-tokens.md): paired `:root` (Light Blue-White) and `[data-theme="dark"], .dark` (Toss Cool-Dark) semantic tokens, double-border-safe focus rules, global Browser Chrome Neutralization Shield, progressive `corner-shape: squircle`, `text-box: trim-both cap alphabetic`, `scrollbar-gutter: stable`, and `@media (hover: hover) and (pointer: fine)`.
- Choose the right scroll ergonomics from [references/interaction-craft.md](./references/interaction-craft.md): spacious natural vertical scroll (`min-h-[100dvh]`) with Peek Effect for content/landing/forms/docs, or opt-in `lg:h-[100dvh]` multi-pane shell strictly for live multi-pane tools.

### Step 3. Execute 70% Copy Purge + Structural Re-Layout & Custom Controls
- **Copy Purge & Re-Layout First**: Strip ~70% of redundant/low-priority LLM-generated text (keeping only the essential ~30% per [references/ux-writing-anti-slop.md](./references/ux-writing-anti-slop.md)), then re-architect the page layout around what survives (dissolve empty cards, merge thin sections, enlarge focal typography, expand breathing room).
- **Controls & Craft**: Replace every native browser widget/popup with dual-theme Toss React components (`TossCheckbox`, `TossSelect`, `TossSwitch`, `TossSlider`, `TossDatePicker`, `TossFileUpload`, `TossDialog`, `TossToast`, `TossTooltip`, `<form noValidate>`); wire a clean `Sun/Moon` icon-only theme switcher when offering manual theme selection; apply frequency-gated motion, reward-early-punish-late forms, icon-only controls, and clean multi-channel badges.

### Step 4. Mandatory Verification Gate (Zero Violations Required)
1. **Static & Build Gate** — Run the bundled auditor with `--build` (`tsc -b && vite build`):
   ```bash
   node <skill-dir>/scripts/audit.mjs <project-root> --build
   ```
   Fix every error until exit code is `0`.
2. **Real Browser Dual-Theme E2E & Visual Gate** — Render BOTH **Light Mode** and **Dark Mode** at `1440×900`, `375×812`, and `360×780` (via `ego-browser` if available) and inspect screenshots for dual-theme contrast, focused inputs (`0` double borders), custom form controls, balanced concentric squircle corners, breathable scroll rhythm (`0px` horizontal overflow), zero CLS, and all states in [references/clean-arch-e2e.md](./references/clean-arch-e2e.md).
