# 4-Layer Clean Architecture & Real-Browser Dual-Theme E2E Protocol

## 1. Strict 4-Layer Dependency Direction

```text
src/
├── domain/                  # PURE TypeScript ONLY (0 react, 0 motion, 0 lucide-react)
│   ├── entities/            # Entities, option metadata, pure calculation functions
│   ├── valueObjects/        # Immutable VOs (e.g. PhoneNumber auto-format/validate/mask)
│   └── repositories/        # Abstract repository interfaces only
├── application/             # Depends ONLY on domain/
│   └── useCases/            # Validation, duplicate checks, DTO orchestration
├── infrastructure/          # Depends ONLY on domain/ (implements repository interfaces)
│   ├── mocks/               # Realistic Korean mock data (zero Lorem ipsum / 테스트1)
│   └── repositories/        # Async delay simulation (800ms) + safe localStorage persistence
└── presentation/            # React + motion/react + lucide-react
    ├── styles/              # motionPresets.ts
    ├── hooks/               # Funnel, theme & state hooks talking ONLY to application/ use cases
    ├── components/
    │   ├── ui/              # TossButton, TossTextField, TossSelect, TossSelectChip, TossCheckbox, TossSwitch, TossSlider, TossDatePicker, TossFileUpload, TossDialog, TossToast, TossTooltip, ThemeToggle, TermsBottomSheetModal
    │   ├── funnel/          # InteractiveLeadFunnelCard (2-step auto-advance + report)
    │   └── sections/        # Clean top header, segmented views, spacious hero/sections, mobile floating CTA
    └── pages/               # Composition Root / DI wiring ONLY
```

### Dependency Rules
- `src/domain/` imports NOTHING outside `src/domain/`.
- `src/application/` imports ONLY from `src/domain/`.
- `src/infrastructure/` imports ONLY from `src/domain/`.
- `src/presentation/components/` and `src/presentation/hooks/` import ONLY from `application/` and `domain/`.
- Only the Composition Root (`src/presentation/pages/...`) instantiates concrete infrastructure repositories and injects them into application use cases.

---

## 2. E2E & Visual Verification Checklist (Light + Dark, Desktop + Mobile)

Verify in a real Chromium browser (e.g., `ego-browser`) in BOTH **Light Mode** (`prefers-color-scheme: light` / `[data-theme="light"]`) and **Dark Mode** (`prefers-color-scheme: dark` / `[data-theme="dark"]`) at **`1440×900`**, **`375×812`**, and **`360×780`**:

| Check | Target Pass Criteria |
| :--- | :--- |
| **Dual-Theme Light & Dark parity** | Light renders cool blue-white (`#F1F5FB` / `#F9FBFF` / `#ECF2FA`); Dark renders authentic Toss cool-charcoal (`#101013` / `#17171C` / `#202027` / `#2C2C35`); `0` `rgb(255, 255, 255)` and `0` `rgb(0, 0, 0)` backgrounds; reload preserves theme with `0` FOUC |
| **WCAG AA contrast in BOTH themes** | Light muted ink (`#64707D`, `>= 4.6:1`) and Dark muted ink (`#9E9EA4`, `>= 5.3:1`) + Dark blue text (`#449BFF`–`#61B0FF`) pass `>= 4.5:1`; status badges pair color + icon + text (WCAG 1.4.1) |
| **Single focus border (zero double border)** | Focus every input/trigger in Light & Dark: `getComputedStyle(el).outlineStyle === 'none'` when `boxShadow` draws an inset ring — visually confirm ONE single blue ring with zero gap/outer halo |
| **Balanced concentric squircle radii** | Cards/panels `18px–20px`, dropdown `18px` (`p-1.5` → `12px` rows), controls `12px–14px`, badges `8px`, checkbox `7px`; `Math.abs((outerRadius - padding) - innerRadius) <= 2` on nested tracks; `corner-shape: squircle` active on Chrome 139+ |
| **Zero native browser UI leaks** | Zero visible native `<input type="checkbox\|radio\|file\|range\|date\|time\|color">`, `<select>`, `<datalist>`, `<progress>`, `<meter>`, `alert/confirm/prompt`, native `title="..."` tooltips, or OS validation bubbles (`<form noValidate>`); verify `TossCheckbox`, `TossSelect` (`Arrow/Enter/Esc`), and CSS chrome shield (`autofill`, `tap-highlight`, `scrollbar`, `ms-reveal`, `resize: none`) |
| **Breathable scroll ergonomics & zero CLS** | Content/landing/form/docs pages scroll naturally (`min-h-[100dvh]`, zero cramped `overflow-hidden` clipping) with clear above-the-fold primary focus + gentle Peek Effect; opt-in multi-pane tools (`lg:h-[100dvh]`) release cleanly to natural scroll below `1024px`; `0px` horizontal overflow at `1440`, `375`, `360`; `scrollbar-gutter: stable` on inner scrollers |
| **Icon-only buttons (NN/g + WCAG 2.2)** | Universal icon buttons (including `Sun/Moon` theme toggle) have no redundant text, carry `aria-label`, hit box `>= 40px` desktop / `>= 44–48px` mobile, `>= 8px` spacing; ambiguous actions keep short 2–3 word labels |
| **Zero `·` / `—` metric clutter** | Multi-metric rows display structured tonal badges (`rounded-[8px]`, optically centered via `text-box: trim-both cap alphabetic`) |
| **Mobile virtual keyboard & touch hygiene** | `index.html` includes `viewport-fit=cover, interactive-widget=resizes-content`; hover styles gated via `@media (hover: hover) and (pointer: fine)` |
| **Runtime shadowless check** | `0` non-inset blur `box-shadow` elements (0-blur `1px–2px` `inset` hairlines/focus rings and `1000px inset` autofill masks allowed) |
| **Typography & Pretendard optics** | Desktop `H1 >= 44px`, Mobile `H1 >= 30px`, consumer min font `>= 14px` (`13px tabular-nums` strictly in dense data table sub-cells), `letter-spacing: 0` on `14px–20px` UI text |
| **Reward-early-punish-late form E2E** | Submit stays enabled before validation; empty submit focuses first invalid input with calm guidance; typing clears error immediately; `0` console/page errors |
| **70% copy purge & structural re-layout** | Visually inspect every viewport (`1440×900`, `375×812`): zero happy-talk paragraphs, zero eyebrow kickers, zero obvious click instructions, zero hollow half-empty boxes left after copy deletion; each section communicates One Thing in `<= 3 seconds` with balanced macro/micro whitespace |
| **Zero-duplication copy check** | Reassurance keywords (`30초`, `무료`, `신용점수`) appear at most `1` time total when used |
