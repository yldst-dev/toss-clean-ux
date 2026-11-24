# 4-Layer Clean Architecture & Real-Browser E2E Protocol

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
    ├── hooks/               # Funnel & state hooks talking ONLY to application/ use cases
    ├── components/
    │   ├── ui/              # TossButton, TossTextField, TossSelect, TossSelectChip, TossCheckbox, TossSwitch, TossSlider, TossDatePicker, TossFileUpload, TossDialog, TossToast, TossTooltip, TermsBottomSheetModal
    │   ├── funnel/          # InteractiveLeadFunnelCard (2-step auto-advance + report)
    │   └── sections/        # Clean top header, segmented views, hero/workspace, mobile floating CTA
    └── pages/               # Composition Root / DI wiring ONLY
```

### Dependency Rules
- `src/domain/` imports NOTHING outside `src/domain/`.
- `src/application/` imports ONLY from `src/domain/`.
- `src/infrastructure/` imports ONLY from `src/domain/`.
- `src/presentation/components/` and `src/presentation/hooks/` import ONLY from `application/` and `domain/`.
- Only the Composition Root (`src/presentation/pages/...`) instantiates concrete infrastructure repositories and injects them into application use cases.

---

## 2. E2E & Visual Verification Checklist (Desktop + Mobile)

Verify in a real Chromium browser (e.g., `ego-browser`) at **`1440×900`**, **`375×812`**, and **`360×780`**:

| Check | Target Pass Criteria |
| :--- | :--- |
| **Single focus border (zero double border)** | Focus every `<input>` / `<textarea>` / `<select>`: `getComputedStyle(el).outlineStyle === 'none'` when `boxShadow` draws an inset ring — visually confirm ONE single blue ring with zero gap/outer halo |
| **Balanced concentric squircle radii** | Cards/panels `18px–20px`, controls/list rows `12px–14px`, badges `8px`; zero harsh `0px–4px` selected list cards, zero `rounded-full` rectangular tracks/inputs, `Math.abs((outerRadius - padding) - innerRadius) <= 2` on nested tabs/containers, `corner-shape: squircle` active on Chrome 139+ |
| **WCAG AA / APCA muted contrast** | Verify muted text (`#64707D`) and all status badges pass `>= 4.5:1` contrast, and status badges include both icon/text and color (never color alone) |
| **Icon-only buttons (NN/g + WCAG 2.2)** | Universal 12 icon buttons have no redundant text, carry `aria-label`, hit box `>= 40px` desktop / `>= 44–48px` mobile, `>= 8px` spacing; ambiguous actions retain clear 2–3 word labels |
| **Zero `·` / `—` metric clutter** | Multi-metric rows display structured tonal badges (`rounded-[8px]`, optically centered via `text-box: trim-both cap alphabetic`) |
| **Scroll-less viewport fit & zero CLS** | For app/tool views at `1440×900`, `document.documentElement.scrollHeight <= window.innerHeight * 1.15`; inner scrollers use `scrollbar-gutter: stable`; zero messy multi-rail side-tabs |
| **Mobile virtual keyboard & touch hygiene** | `index.html` includes `viewport-fit=cover, interactive-widget=resizes-content`; hover styles gated via `@media (hover: hover) and (pointer: fine)`; `0px` horizontal overflow at `1440`, `375`, `360` |
| **Runtime shadowless & pure-white check** | `0` non-inset `box-shadow` elements; `0` `rgb(255, 255, 255)` backgrounds |
| **Typography & Pretendard optics** | Desktop `H1 >= 44px`, Mobile `H1 >= 30px`, min visible font `>= 14px`, `letter-spacing: 0` on `14px–20px` UI text |
| **Zero native browser UI leaks** | Zero visible native `<input type="checkbox\|radio\|file\|range\|date\|time\|color">`, `<select>`, `<datalist>`, `<progress>`, `<meter>`, `alert/confirm/prompt`, native `title="..."` tooltips, or OS validation bubbles (`<form noValidate>`); verify `TossCheckbox` (`rounded-[7px]`, `#3182F6` fill + `Check`), `TossSelect` (shadowless `rounded-[18px] p-1.5` listbox + `rounded-[12px]` rows + right `Check` + `Arrow/Enter/Esc`), and base CSS chrome shield (`autofill`, `tap-highlight`, `scrollbar`, `ms-reveal`, `resize: none`) |
| **Reward-early-punish-late form E2E** | Submit button stays enabled before validation; empty submit focuses first invalid input with calm `#1B64DA` notice; typing clears error immediately; duplicate phone (`010-9999-9999`) triggers duplicate view; fresh submit persists to `localStorage`; `0` console/page errors |
| **Zero-duplication copy check** | Visible occurrences of `30초`, `무료`, `신용점수` are `0` outside the single reassurance spot and `1` total |
