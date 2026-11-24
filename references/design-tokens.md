# Design Sheet: Dual-Theme OKLCH (Light Blue-White & Toss Cool-Dark), Single Focus Ring, Squircles, CSS Shield & Custom Controls

## 1. Perceptually Uniform Dual-Theme OKLCH Color System

Synthesizes Toss TDS's OKLCH overhaul and live production tokens audited directly from `tossinvest.com` (`--wts-adaptive-*` / `--tw-adaptive-color-*`), `tossbank.com`, `toss.tech`, and `tosspayments.com`.
- **Light Mode (Signature Blue-White)**: Zero `#FFFFFF` glare and zero `#000000` harshness — crisp cool blue-white 4-level elevation (`#E8EFFA` / `#F1F5FB` / `#F9FBFF` / `#ECF2FA`).
- **Dark Mode (Authentic Toss Elevated Cool-Dark)**: Zero `#000000` pure black (prevents OLED smearing & eye halation) and zero `#FFFFFF` large text blocks — authentic Toss WTS charcoal-navy 4-level elevation (`#101013` / `#17171C` / `#202027` / `#2C2C35`) paired with translucent blue-tinted overlays (`rgba(217, 217, 255, 0.11)`).
- **Rule**: Always consume semantic CSS variables (`var(--surface-elevated)`, `var(--text-primary)`, etc.) in components so Light and Dark modes stay 100% synchronized without brittle duplicate `dark:` hex overrides.

### Semantic Token Pairing Table (Light / Dark)

| Semantic Token | Light Blue-White (Hex / OKLCH) | Toss Cool-Dark (Hex / OKLCH) | Role & WCAG Contrast |
| :--- | :--- | :--- | :--- |
| `--surface-recessed` | `#E8EFFA` / `oklch(0.948 0.016 254)` | `#101013` / `oklch(0.174 0.006 286)` | Level 0: Recessed canvas, segmented tracks, alternating bands (`greyBackground`) |
| `--surface-canvas` | `#F1F5FB` / `oklch(0.968 0.011 252)` | `#17171C` / `oklch(0.208 0.009 285)` | Level 1: Primary page canvas (`html, body`, `theme-color`) |
| `--surface-elevated` | `#F9FBFF` / `oklch(0.988 0.006 252)` | `#202027` / `oklch(0.247 0.013 285)` | Level 2: Cards, panels, active tabs, dropdowns, modals (`layeredBackground`) |
| `--surface-field` | `#ECF2FA` / `oklch(0.957 0.013 253)` | `#2C2C35` / `oklch(0.296 0.015 285)` | Level 3: Borderless TDS inputs, floating surfaces, neutral badges (`floatBackground`) |
| `--surface-tint-subtle` | `rgba(2, 32, 71, 0.045)` | `rgba(209, 209, 253, 0.06)` | Adaptive translucent chip/hover fill (works on any surface level) |
| `--surface-tint-hover` | `rgba(2, 32, 71, 0.08)` | `rgba(217, 217, 255, 0.11)` | Adaptive interactive hover / search pill surface (`greyOpacity100`) |
| `--border-hairline` | `rgba(0, 27, 55, 0.10)` | `rgba(222, 222, 255, 0.14)` | `1px` crisp surface divider (`divide-y`, panel hairline, inset ring) |
| `--border-strong` | `rgba(0, 29, 58, 0.18)` | `rgba(222, 222, 255, 0.22)` | Unchecked checkbox hairline, interactive outline hover |
| `--color-primary` | `#3182F6` / `oklch(0.608 0.194 256)` | `#3485FA` / `oklch(0.622 0.194 257)` | Primary CTA fill, active checkbox/switch, key signal |
| `--color-primary-hover` | `#1B64DA` / `oklch(0.525 0.195 258)` | `#449BFF` / `oklch(0.680 0.178 255)` | Primary CTA hover |
| `--color-primary-active` | `#1957C2` / `oklch(0.478 0.184 259)` | `#2970D9` / `oklch(0.562 0.186 258)` | Primary CTA pressed |
| `--color-primary-text` | `#1B64DA` | `#61B0FF` | Blue text/links/gentle guidance (`>= 5.1:1` light, `>= 7.2:1` on `#17171C`/`#202027` dark!) |
| `--color-focus-ring` | `#3182F6` | `#449BFF` | Single focus ring (high visibility on both canvases) |
| `--color-primary-soft` | `#E2EEFF` | `#202C4D` | Soft secondary CTA fill, selected chip/option fill, highlight badge |
| `--color-on-primary` | `#F9FBFF` | `#F4F7FC` | Crisp off-white ink on `#3182F6`/`#3485FA` buttons |
| `--text-primary` | `#191F28` (`14.8:1`) | `#F2F4F8` (`14.2:1` on `#17171C`) | Primary ink (avoids pure `#000000` and pure `#FFFFFF` glare) |
| `--text-secondary` | `#4E5968` (`6.7:1`) | `#C3C3C6` (`9.6:1` on `#17171C`) | Secondary body ink |
| `--text-muted` | `#64707D` (`4.6:1+`) | `#9E9EA4` (`5.3:1+` on `#202027`) | WCAG AA safe muted ink (replaces `#8B95A1` in light & `#62626D` in dark) |
| `--status-success-fg` / `bg` | `#158453` / `#E6F6EE` | `#57C28D` / `rgba(21, 196, 126, 0.14)` | Pair with `CheckCircle2` icon + text (WCAG 1.4.1) |
| `--status-danger-fg` / `bg` | `#C83242` / `#FDEEEF` | `#FF7187` / `rgba(223, 58, 69, 0.16)` | Data alerts / negative metrics (pair with icon + text) |
| `--backdrop-dimmer` | `rgba(15, 23, 42, 0.36)` | `rgba(4, 6, 12, 0.68)` | Modal / BottomSheet dimmer overlay |

### Toss Signature Dual-CTA Pairing (Observed on `tosspayments.com` & `tossplace.com`)
When pairing a primary and secondary action side by side, prefer **Toss Solid Primary + Soft Tinted Secondary** (instead of noisy outlined ghost buttons):
- **Primary**: `bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-on-primary)]`
- **Soft Secondary**: `bg-[var(--color-primary-soft)] text-[var(--color-primary-text)]` (or neutral `bg-[var(--surface-tint-hover)] text-[var(--text-primary)]`)

### Shadowless Depth Rule (0-Blur Inset Hairlines Permitted)
- **Forbidden**: Drop shadows (`box-shadow: 0 4px 12px ...`), `drop-shadow`, `text-shadow`, `shadow-sm/md/lg/xl`.
- **Allowed**: Zero-blur `1px–2px` `inset` borders (`box-shadow: inset 0 0 0 1px var(--border-hairline)` or Tailwind `ring-1 ring-inset` / `focus:ring-2 focus:ring-inset`) — directly matching Toss WTS & Toss Payments production buttons without shifting box width — plus the `0 0 0 1000px ... inset` autofill mask.

---

## 2. Mandatory Base CSS: Dual-Theme Variables, Single Focus Ring & Browser Chrome Shield (`src/index.css`)

```css
:root {
  color-scheme: light;
  --surface-recessed: #E8EFFA;
  --surface-canvas: #F1F5FB;
  --surface-elevated: #F9FBFF;
  --surface-field: #ECF2FA;
  --surface-tint-subtle: rgba(2, 32, 71, 0.045);
  --surface-tint-hover: rgba(2, 32, 71, 0.08);
  --border-hairline: rgba(0, 27, 55, 0.10);
  --border-strong: rgba(0, 29, 58, 0.18);
  --color-primary: #3182F6;
  --color-primary-hover: #1B64DA;
  --color-primary-active: #1957C2;
  --color-primary-text: #1B64DA;
  --color-focus-ring: #3182F6;
  --color-primary-soft: #E2EEFF;
  --color-on-primary: #F9FBFF;
  --text-primary: #191F28;
  --text-secondary: #4E5968;
  --text-muted: #64707D;
  --status-success-fg: #158453;
  --status-success-bg: #E6F6EE;
  --status-danger-fg: #C83242;
  --status-danger-bg: #FDEEEF;
  --backdrop-dimmer: rgba(15, 23, 42, 0.36);
  --scrollbar-thumb: rgba(49, 130, 246, 0.22);
  --scrollbar-thumb-hover: rgba(49, 130, 246, 0.38);
}

[data-theme="dark"],
.dark {
  color-scheme: dark;
  --surface-recessed: #101013;
  --surface-canvas: #17171C;
  --surface-elevated: #202027;
  --surface-field: #2C2C35;
  --surface-tint-subtle: rgba(209, 209, 253, 0.06);
  --surface-tint-hover: rgba(217, 217, 255, 0.11);
  --border-hairline: rgba(222, 222, 255, 0.14);
  --border-strong: rgba(222, 222, 255, 0.24);
  --color-primary: #3485FA;
  --color-primary-hover: #449BFF;
  --color-primary-active: #2970D9;
  --color-primary-text: #61B0FF;
  --color-focus-ring: #449BFF;
  --color-primary-soft: #202C4D;
  --color-on-primary: #F4F7FC;
  --text-primary: #F2F4F8;
  --text-secondary: #C3C3C6;
  --text-muted: #9E9EA4;
  --status-success-fg: #57C28D;
  --status-success-bg: rgba(21, 196, 126, 0.14);
  --status-danger-fg: #FF7187;
  --status-danger-bg: rgba(223, 58, 69, 0.16);
  --backdrop-dimmer: rgba(4, 6, 12, 0.68);
  --scrollbar-thumb: rgba(217, 217, 255, 0.20);
  --scrollbar-thumb-hover: rgba(217, 217, 255, 0.34);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    color-scheme: dark;
    --surface-recessed: #101013;
    --surface-canvas: #17171C;
    --surface-elevated: #202027;
    --surface-field: #2C2C35;
    --surface-tint-subtle: rgba(209, 209, 253, 0.06);
    --surface-tint-hover: rgba(217, 217, 255, 0.11);
    --border-hairline: rgba(222, 222, 255, 0.14);
    --border-strong: rgba(222, 222, 255, 0.24);
    --color-primary: #3485FA;
    --color-primary-hover: #449BFF;
    --color-primary-active: #2970D9;
    --color-primary-text: #61B0FF;
    --color-focus-ring: #449BFF;
    --color-primary-soft: #202C4D;
    --color-on-primary: #F4F7FC;
    --text-primary: #F2F4F8;
    --text-secondary: #C3C3C6;
    --text-muted: #9E9EA4;
    --status-success-fg: #57C28D;
    --status-success-bg: rgba(21, 196, 126, 0.14);
    --status-danger-fg: #FF7187;
    --status-danger-bg: rgba(223, 58, 69, 0.16);
    --backdrop-dimmer: rgba(4, 6, 12, 0.68);
    --scrollbar-thumb: rgba(217, 217, 255, 0.20);
    --scrollbar-thumb-hover: rgba(217, 217, 255, 0.34);
  }
}

@layer base {
  html, body {
    overflow-x: clip;
    background-color: var(--surface-canvas);
    color: var(--text-primary);
    font-family:
      "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont,
      "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
    word-break: keep-all;
    overflow-wrap: break-word;
    -webkit-font-smoothing: antialiased;
    scroll-behavior: smooth;
  }

  h1, h2 { text-wrap: balance; }
  button, a, [role="button"], input { touch-action: manipulation; }
  input, textarea, select { font-size: 16px; }

  :where(a, button, [role="button"], [tabindex]):focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 2px;
  }

  :where(input, textarea, select):focus,
  :where(input, textarea, select):focus-visible {
    outline: none;
  }

  * {
    -webkit-tap-highlight-color: transparent;
    scrollbar-width: thin;
    scrollbar-color: var(--scrollbar-thumb) transparent;
  }

  ::selection {
    background-color: var(--color-primary-soft);
    color: var(--text-primary);
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill {
    box-shadow: 0 0 0 1000px var(--surface-field) inset !important;
    -webkit-text-fill-color: var(--text-primary) !important;
    transition: background-color 5000s ease-in-out 0s;
  }

  input[type="password"]::-ms-reveal,
  input[type="password"]::-ms-clear {
    display: none;
  }

  input[type="search"]::-webkit-search-cancel-button,
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  textarea {
    resize: none;
  }

  @supports (field-sizing: content) {
    textarea[data-autogrow="true"] {
      field-sizing: content;
      min-height: 96px;
      max-height: 260px;
    }
  }

  summary {
    list-style: none;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-thumb);
    border-radius: 9999px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: var(--scrollbar-thumb-hover);
  }
}
```

### FOUC-Free Theme Initialization (`index.html` `<head>`)
```html
<script>
  (function () {
    var saved = localStorage.getItem('theme');
    var theme = saved === 'dark' || saved === 'light'
      ? saved
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  })();
</script>
```

### TDS Filled Input Contract (Dual-Theme Single Focus Ring)
- **Idle**: `bg-[var(--surface-field)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] rounded-[12px] sm:rounded-[14px] border-0 min-h-[54px] sm:min-h-[58px] text-[16px] sm:text-[18px]`
- **Focus**: `focus:outline-none focus-visible:outline-none focus:bg-[var(--surface-elevated)] focus:ring-2 focus:ring-inset focus:ring-[var(--color-focus-ring)]`
- **Gentle Error**: `bg-[var(--color-primary-soft)] ring-2 ring-inset ring-[var(--color-focus-ring)]` + `15px` `text-[var(--color-primary-text)]` guidance below
- **Never** stack `focus:border-*` + `focus:ring-*` on the same element.

---

## 3. Balanced Concentric Squircle Radii (Goldilocks Curve)

Avoid BOTH extremes: harsh boxy `0px–4px` corners on cards/controls AND bloated `>= 26px` / rectangular `rounded-full` balloons. Enforce concentricity:
$$\text{innerRadius} = \max(0,\; \text{outerRadius} - \text{padding})$$

| Pattern | Outer | Padding (`P`) | Inner | Note |
| :--- | :--- | :--- | :--- | :--- |
| Custom React checkbox box | `rounded-[7px]` | — | `14px` crisp `Check` icon | Balanced curve (never `3px` OS box) |
| Data badge / compact icon button | `rounded-[8px]` | — | — | Tidy, never sharp |
| Standard button / input / list row | `rounded-[12px]`–`rounded-[14px]` | — | — | Refined Toss curve |
| Segmented tab bar (default) | `rounded-[16px]` | `p-1` (`4px`) | `rounded-[12px]` | `16 - 4 = 12px` exact sync |
| Segmented tab bar (roomy) | `rounded-[18px]` | `p-1.5` (`6px`) | `rounded-[12px]` | `18 - 6 = 12px` exact sync |
| TossSelect dropdown panel | `rounded-[18px]` | `p-1.5` (`6px`) | `rounded-[12px]` option row | `18 - 6 = 12px` exact sync |
| Card / panel + inset box | `rounded-[20px]` | `p-2` (`8px`) | `rounded-[12px]` | `20 - 8 = 12px` exact sync |
| Card / modal / mobile sheet | `rounded-[18px]`–`rounded-[20px]` | `p-5` / `p-6` | Controls `rounded-[12px]`–`rounded-[14px]` | Balanced softness |
| True 1:1 circles ONLY (avatars, switch thumb, radio) | `rounded-full` | — | — | Never on rectangular boxes |

### Progressive CSS Squircle Enhancement (Chrome/Edge 139+)
```css
.toss-squircle {
  border-radius: 20px;
}
@supports (corner-shape: squircle) {
  .toss-squircle {
    corner-shape: squircle;
  }
}
```

---

## 4. Modern Optical CSS Baseline Craft

### A. Optical Vertical Centering (`text-box-trim`, MDN Baseline)
```css
@supports (text-box: trim-both cap alphabetic) {
  .optical-text {
    text-box: trim-both cap alphabetic;
  }
}
```

### B. Zero Horizontal Scrollbar Jump (`scrollbar-gutter: stable`)
Apply to bounded inner scroll panes (`overflow-y-auto`) and centered modals (`scrollbar-gutter: stable both-edges`) so appearing scrollbars never jerk layouts sideways by ~15px.

### C. Touch-Safe Hover Gating (Eliminating Mobile Sticky Hover)
```css
@media (hover: hover) and (pointer: fine) {
  .row-actions { opacity: 0; }
  .data-row:hover .row-actions,
  .data-row:focus-within .row-actions { opacity: 1; }
}
```

### D. Mobile Virtual Keyboard Viewport Meta (`index.html`)
```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, viewport-fit=cover, interactive-widget=resizes-content"
/>
```

---

## 5. Pretendard Korean Typography Optical Scale

Pretendard is pre-tuned for Hangul + Latin rhythm — **do NOT over-tighten letter-spacing** on body/UI text:

| Role | Size | Unitless `line-height` | Weight | `letter-spacing` |
| :--- | :--- | :--- | :--- | :--- |
| Display / Hero H1 | `clamp(1.9rem, 4.5vw, 3.25rem)` (`30.4px`–`52px`) | `1.28` | `800` | `-0.02em` |
| Section / View H2 | `clamp(1.6rem, 3vw, 2.25rem)` (`26px`–`36px`) | `1.28` | `800` | `-0.015em` |
| Card / Funnel Title H3 | `20px`–`24px` | `1.35` | `700`–`800` | `-0.01em` |
| Subtitle / Lead Body | `17px`–`20px` | `1.55` | `500` | `0` (`tracking-normal`) |
| Body / Labels / Options | `15px`–`18px` | `1.5`–`1.6` | `500`–`700` | `0` |
| Data Badges / Captions | `14px`–`15px` (consumer floor `>= 14px`; `13px tabular-nums` permitted ONLY in dense pro-data/trading table sub-cells) | `1.4` | `500`–`600` | `0` |
| All Numbers / Metrics | `tabular-nums` | — | — | `0` |

---

## 6. Icon-Only Controls & Multi-Channel Data Badges

### A. NN/g Icon-Only Decision Matrix + WCAG 2.2 (SC 2.5.8)
- **Icon-only (no redundant label)** strictly for universal actions: `X`, `Copy`, `RotateCw`/`RefreshCw`, `Trash2`, `Search`, `Download`, `ExternalLink`, `ArrowLeft`, `ChevronLeft/Right`, `Settings`, `Pause/Play`, `MoreHorizontal`, and `Sun/Moon` (theme toggle, modeled after `tossinvest.com`).
- **Keep short 2–3 word label** for domain-specific or ambiguous actions (`전후 비교`, `내 지원금 확인하기`) because hover tooltips fail on touchscreens.
- **Hit Box & Spacing**: Icon `18px–20px` (`strokeWidth={2}`), clickable target `>= 40×40px` desktop / `>= 44–48px` mobile (`>= 56px` for senior primary actions), minimum `8px` (`gap-2`) between adjacent buttons.
- **Mandatory `aria-label`** on every icon-only button; desktop toolbars use **instant-subsequent tooltips** (`300ms` first hover, `0ms` adjacent).

### B. Multi-Channel Functional Metadata Badges (Dual-Theme, Replacing `·` / `—` Chains)
```tsx
<div className="flex flex-wrap items-center justify-between gap-2">
  <div className="flex flex-wrap items-center gap-1.5">
    <span className="optical-text rounded-[8px] bg-[var(--surface-field)] px-2.5 py-1 text-[14px] font-semibold text-[var(--text-secondary)]">
      직접 입력
    </span>
    <span className="optical-text inline-flex items-center gap-1 rounded-[8px] bg-[var(--status-success-bg)] px-2.5 py-1 text-[14px] font-bold text-[var(--status-success-fg)] tabular-nums">
      <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
      52점 → 0점 (-52)
    </span>
  </div>
  <div className="flex flex-wrap items-center gap-1.5">
    <span className="optical-text rounded-[8px] bg-[var(--surface-field)] px-2.5 py-1 text-[14px] font-semibold text-[var(--text-secondary)] tabular-nums">
      대비 7.5
    </span>
    <span className="optical-text rounded-[8px] bg-[var(--color-primary-soft)] px-2.5 py-1 text-[14px] font-semibold text-[var(--color-primary-text)] tabular-nums">
      수정 1회
    </span>
  </div>
</div>
```

---

## 7. Zero Native Browser UI Leaks: Complete Custom React Replacement Matrix

Never render raw OS/browser `<input type="checkbox">`, `<input type="radio">`, `<select>`, or other system widgets — they inject pure `#FFFFFF` fills, harsh `#767676` borders, `3px` jagged corners, and inconsistent OS popups that shatter both Light and Dark themes.

### A. Clean Dual-Theme React Checkbox (`TossCheckbox`)
```tsx
<label className="group flex min-h-[48px] cursor-pointer items-center gap-3 rounded-[14px] bg-[var(--surface-field)] px-4 py-3 select-none">
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => onCheckedChange(e.target.checked)}
    className="peer sr-only"
  />
  <span
    aria-hidden="true"
    className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[7px] transition-colors duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-focus-ring)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--surface-field)] ${
      checked
        ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)]'
        : 'bg-[var(--surface-elevated)] ring-1 ring-inset ring-[var(--border-strong)] group-hover:ring-[var(--color-focus-ring)]'
    }`}
  >
    {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
  </span>
  <span className="text-[16px] font-medium text-[var(--text-primary)]">{label}</span>
</label>
```

### B. Toss-Style Dual-Theme Custom Dropdown (`TossSelect`)
```tsx
<div className="relative">
  <button
    type="button"
    role="combobox"
    aria-haspopup="listbox"
    aria-expanded={open}
    aria-controls={listboxId}
    onClick={() => setOpen((prev) => !prev)}
    className={`flex min-h-[54px] w-full items-center justify-between gap-2 rounded-[14px] px-4 text-left text-[16px] font-medium transition-colors duration-150 focus:outline-none focus-visible:outline-none ${
      open
        ? 'bg-[var(--surface-elevated)] ring-2 ring-inset ring-[var(--color-focus-ring)]'
        : 'bg-[var(--surface-field)] focus-visible:bg-[var(--surface-elevated)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-focus-ring)]'
    }`}
  >
    <span className={selectedOption ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}>
      {selectedOption ? selectedOption.label : placeholder}
    </span>
    <ChevronDown
      aria-hidden="true"
      className={`h-5 w-5 shrink-0 text-[var(--text-muted)] transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
      strokeWidth={2}
    />
  </button>
  {open && (
    <ul
      id={listboxId}
      role="listbox"
      className="absolute z-40 mt-2 max-h-[280px] w-full overflow-y-auto overscroll-contain rounded-[18px] border border-[var(--border-hairline)] bg-[var(--surface-elevated)] p-1.5 [scrollbar-gutter:stable]"
    >
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <li key={opt.value} role="option" aria-selected={isSelected}>
            <button
              type="button"
              onClick={() => handleSelect(opt.value)}
              className={`flex min-h-[44px] w-full items-center justify-between gap-3 rounded-[12px] px-3.5 py-2.5 text-left text-[16px] transition-colors duration-100 ${
                isSelected
                  ? 'bg-[var(--color-primary-soft)] font-bold text-[var(--color-primary-text)]'
                  : 'font-medium text-[var(--text-primary)] hover:bg-[var(--surface-tint-hover)]'
              }`}
            >
              <span className="truncate">{opt.label}</span>
              {isSelected && <Check aria-hidden="true" className="h-[18px] w-[18px] shrink-0 text-[var(--color-primary)]" strokeWidth={2.5} />}
            </button>
          </li>
        );
      })}
    </ul>
  )}
</div>
```

### C. Complete Native Browser UI Leak Replacement Matrix (15 Offenders)

| Native Browser Leak | Why It Breaks Toss Clean UX | Mandatory Dual-Theme Toss Replacement |
| :--- | :--- | :--- |
| **`<input type="checkbox">`** | White box + harsh gray border + `3px` corners in both Light & Dark | **`TossCheckbox`** (`sr-only` + `22px` `rounded-[7px]` + `var(--color-primary)` fill + `Check`/`Minus`) |
| **`<input type="radio">`** | Tiny gray OS circle with inconsistent dot | **`TossRadio`** (`sr-only` + `22px` `rounded-full` ring + `10px` inner dot) or **`TossSelectChip`** |
| **Raw checkbox as toggle** | Ambiguous immediate on/off state | **`TossSwitch`** (`role="switch"`, `48px × 28px` pill track, `22px` thumb animated with `TOSS_SPRING`, `>= 44px` hit target) |
| **`<select>` / `<datalist>`** | OS-dependent gray/dark popups | **`TossSelect` / `TossCombobox`** (shadowless `rounded-[18px] p-1.5` listbox + `rounded-[12px]` rows + right `Check`; mobile `< 640px` 5+ items → Select BottomSheet) |
| **`<input type="range">`** | Jagged OS track/thumb across browsers | **`TossSlider`** (`role="slider"`, `6px` `rounded-full` track + `var(--color-primary)` fill + `22px` thumb, `44px` hit box, `tabular-nums`) |
| **`<input type="date\|time\|datetime-local\|month\|week">`** | Unstylable OS calendar popups & tiny icons | **`TossDatePicker`** (shadowless `rounded-[20px]` React calendar popover on desktop / BottomSheet picker on mobile, `Intl.DateTimeFormat('ko-KR')`) |
| **`<input type="file">`** | Hardcoded OS `"파일 선택"` button | **`TossFileUpload`** (`sr-only` `<input type="file">` + `rounded-[14px]` button or dropzone + `Upload` + selected file badge with `X`) |
| **`<input type="color">`** | Tiny beveled OS swatch & system dialog | **`TossColorPicker`** (`rounded-[8px]` swatches + validated `#HEX` `TossTextField`) |
| **`<input type="number">`** | OS spin arrows + scroll-wheel value mutation | **`type="text" inputMode="numeric"`** (+ optional `Minus`/`Plus` icon-only stepper buttons) |
| **`<input type="search">`** | Clashing OS blue/gray `×` cancel button | Strip `::-webkit-search-cancel-button` + custom Lucide `X` clear button (`aria-label="검색어 지우기"`) |
| **`<progress>` / `<meter>`** | Ugly striped/beveled OS bars | **`TossProgressBar`** (`role="progressbar"`, `h-2 rounded-full bg-[var(--surface-recessed)]` + `var(--color-primary)` bar) |
| **`window.alert / confirm / prompt`** | Freezes main thread, pops ugly OS dialog | **`TossDialog`** (`role="alertdialog" aria-modal="true"`, `rounded-[20px]`) or **`TossToast`** (`role="status" aria-live="polite"`) |
| **Native HTML `title="..."` tooltip** | Delayed (~1s) yellow/gray OS tooltip | Remove `title`; pair `aria-label` + custom **`TossTooltip`** (`rounded-[8px]`, `300ms` first / `0ms` adjacent hover) |
| **HTML5 constraint validation bubble** | Orange/white OS speech bubble | Always put **`noValidate`** on `<form>` + calm inline `text-[var(--color-primary-text)]` guidance |
| **`<details>` / `<summary>` & CSS Chrome Leaks** | Jagged `▸`, yellow autofill, mobile tap flash, Edge eye icon, bulky scrollbars, textarea resizer | Neutralized globally in Section 2 `@layer base` CSS shield (`0 0 0 1000px inset` autofill, `-webkit-tap-highlight-color: transparent`, `::-ms-reveal: none`, `resize: none` + `field-sizing: content`, `6px` subtle scrollbar) |
