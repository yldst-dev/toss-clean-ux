# Design Sheet: OKLCH Shadowless Blue-White, Single Focus Ring, Concentric Squircles & Optical CSS

## 1. Perceptually Uniform OKLCH 4-Level Blue-White Color System

Inspired by Toss TDS's OKLCH color system overhaul: keep Hue (`~252`) and subtle Chroma consistent while stepping Lightness (`L`) cleanly so shadowless surfaces stay distinguishable even on low-contrast office monitors and aging eyes. Zero `#FFFFFF`/`bg-white` backgrounds, zero `#000000`/`bg-black`/`text-black`, zero drop/elevation shadows.

| Semantic Token | Hex Fallback | OKLCH Equivalent | WCAG Contrast / Role |
| :--- | :--- | :--- | :--- |
| `--surface-recessed` (`--bg-section-alt`) | `#E8EFFA` | `oklch(0.948 0.016 254)` | Level 0: Alternating sections, segmented control tracks |
| `--surface-canvas` (`--bg-canvas`) | `#F1F5FB` | `oklch(0.968 0.011 252)` | Level 1: Primary canvas (`html, body`, `theme-color`) |
| `--surface-elevated` (`--bg-surface`) | `#F9FBFF` | `oklch(0.988 0.006 252)` | Level 2: Funnel card, workspace panel, active tab, modal/sheet |
| `--surface-field` (`--bg-input`) | `#ECF2FA` | `oklch(0.957 0.013 253)` | Level 3: Borderless TDS filled inputs, unselected rows, neutral badges |
| `--border-hairline` (`--border-surface`) | `rgba(49, 130, 246, 0.10)` | `oklch(0.61 0.19 255 / 0.10)` | `1px solid` on Level 2 surfaces & `divide-y`/`divide-x` rules |
| `--color-primary` | `#3182F6` | `oklch(0.608 0.194 256)` | System signal ONLY: primary CTA, active state, single focus ring, key metric |
| `--color-primary-hover` | `#1B64DA` | `oklch(0.525 0.195 258)` | Primary CTA hover, selected text, gentle error notice ink (`5.1:1+`) |
| `--color-primary-active` | `#1957C2` | `oklch(0.478 0.184 259)` | Primary CTA pressed state |
| `--color-primary-soft` | `#E2EEFF` | `oklch(0.935 0.028 254)` | Selected chip fill, highlight badges, secondary CTA fill |
| `--color-on-primary` | `#F9FBFF` | `oklch(0.988 0.006 252)` | Ink on `#3182F6` buttons (avoids raw `#FFFFFF`) |
| `--text-primary` | `#191F28` | `oklch(0.238 0.016 255)` | Primary ink (`14.8:1` on canvas) |
| `--text-secondary` | `#4E5968` | `oklch(0.456 0.022 255)` | Secondary ink (`6.7:1` on canvas) |
| `--text-muted` | `#64707D` | `oklch(0.542 0.020 252)` | WCAG AA safe muted ink (`4.6:1+` on `#F1F5FB` & `#F9FBFF`; replaces `#8B95A1` which fails AA at `2.8:1`) |
| `--status-success-fg` / `bg` | `#158453` / `#E6F6EE` | `oklch(0.535 0.130 156)` | Pair with `CheckCircle2` icon + text (WCAG 1.4.1 color-blind safe) |
| `--status-danger-fg` / `bg` | `#C83242` / `#FDEEEF` | `oklch(0.515 0.185 18)` | Data-driven alert/negative metric badges only (pair with icon + text) |

---

## 2. Single Focus Ring Rule (Zero Double Borders)

**Root Cause**: Unguarded global `:focus-visible { outline: 2px solid #3182F6; outline-offset: 2px; }` combined with `focus:ring-2 focus:ring-inset` draws TWO concentric blue lines around `<input>` elements.

### Mandatory Base CSS (`src/index.css`)
```css
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

  @media (pointer: fine) {
    html { overscroll-behavior: none; }
  }

  h1, h2 { text-wrap: balance; }
  button, a, [role="button"], input { touch-action: manipulation; }
  input, textarea, select { font-size: 16px; }

  :where(a, button, [role="button"], [tabindex]):focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  :where(input, textarea, select):focus,
  :where(input, textarea, select):focus-visible {
    outline: none;
  }

  * {
    -webkit-tap-highlight-color: transparent;
    scrollbar-width: thin;
    scrollbar-color: rgba(49, 130, 246, 0.22) transparent;
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
    background-color: rgba(49, 130, 246, 0.22);
    border-radius: 9999px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(49, 130, 246, 0.38);
  }
}
```

### TDS Filled Input Contract
- **Idle**: `bg-[#ECF2FA] rounded-[12px] sm:rounded-[14px] border-0 min-h-[56px] sm:min-h-[58px] text-[18px] sm:text-[20px]`
- **Focus**: `focus:outline-none focus-visible:outline-none focus:bg-[#F9FBFF] focus:ring-2 focus:ring-inset focus:ring-[#3182F6]`
- **Gentle Error**: `bg-[#E2EEFF] ring-2 ring-inset ring-[#3182F6]` + `15px` `#1B64DA` guidance text below
- **Never** stack `focus:border-*` + `focus:ring-*` on the same element.

---

## 3. Balanced Concentric Squircle Radii (Goldilocks Curve)

Avoid BOTH extremes: harsh boxy `0px–4px` corners AND bloated `>= 26px` / rectangular `rounded-full` balloons. Always enforce concentricity:
$$\text{innerRadius} = \max(0,\; \text{outerRadius} - \text{padding})$$

| Pattern | Outer | Padding (`P`) | Inner | Note |
| :--- | :--- | :--- | :--- | :--- |
| Data badge / compact icon button | `rounded-[8px]` | — | — | Tidy, never sharp |
| Standard button / input / list row | `rounded-[12px]`–`rounded-[14px]` | — | — | Refined Toss curve |
| Segmented tab bar (default) | `rounded-[16px]` | `p-1` (`4px`) | `rounded-[12px]` | `16 - 4 = 12px` exact sync |
| Segmented tab bar (roomy) | `rounded-[18px]` | `p-1.5` (`6px`) | `rounded-[12px]` | `18 - 6 = 12px` exact sync |
| Card / panel + inset box | `rounded-[20px]` | `p-2` (`8px`) | `rounded-[12px]` | `20 - 8 = 12px` exact sync |
| TossSelect dropdown panel | `rounded-[18px]` | `p-1.5` (`6px`) | `rounded-[12px]` option row | `18 - 6 = 12px` exact sync |
| Custom React checkbox box | `rounded-[7px]` | — | `14px` crisp `Check` icon | Soft balanced square (never `3px` OS box) |
| Card / modal / mobile sheet | `rounded-[18px]`–`rounded-[20px]` | `p-5` / `p-6` | Controls `rounded-[12px]`–`rounded-[14px]` | Balanced softness |
| True 1:1 circles ONLY (avatars, status dot) | `rounded-full` | — | — | Never on rectangular boxes |

### Progressive CSS Squircle Enhancement (Chrome/Edge 139+)
Standard circular `border-radius` has a subtle tangent pinch where straight line meets arc. Progressively enhance surfaces with continuous curvature while keeping balanced fallback radii for Safari/Firefox:

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
*Optical note*: Squircles add slightly more visual corner mass — give icon buttons `2px` generous inner padding so glyphs never feel cramped.

---

## 4. Modern Optical CSS Baseline Craft

### A. Optical Vertical Centering (`text-box-trim`, MDN Baseline)
Eliminates Hangul/Latin ascender-descender vertical float inside compact badges and single-line buttons:
```css
@supports (text-box: trim-both cap alphabetic) {
  .optical-text {
    text-box: trim-both cap alphabetic;
  }
}
```

### B. Zero Horizontal Scrollbar Jump (`scrollbar-gutter: stable`)
Apply to bounded inner scroll regions (`overflow-y-auto`) and centered modals (`scrollbar-gutter: stable both-edges`) so appearing scrollbars never jerk layouts sideways by ~15px.

### C. Touch-Safe Hover Gating (Eliminating Mobile Sticky Hover)
Never trigger hover color/lift states on touch taps — wrap decorative hover polish inside pointer capability queries:
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
Ensures virtual keyboards resize the layout viewport cleanly so bottom action bars never sink behind the keyboard.

---

## 5. Pretendard Korean Typography Optical Scale

Pretendard is pre-tuned for Hangul + Latin rhythm — **do NOT over-tighten letter-spacing** on body/UI text:

| Role | Size | Unitless `line-height` | Weight | `letter-spacing` |
| :--- | :--- | :--- | :--- | :--- |
| Display / Hero H1 | `clamp(1.9rem, 4.5vw, 3.125rem)` (`30.4px`–`50px`) | `1.28` | `800` | `-0.02em` |
| Section / View H2 | `clamp(1.6rem, 3vw, 2.25rem)` (`26px`–`36px`) | `1.28` | `800` | `-0.015em` |
| Card / Funnel Title H3 | `20px`–`24px` | `1.35` | `700`–`800` | `-0.01em` |
| Subtitle / Lead Body | `17px`–`20px` | `1.55` | `500` | `0` (`tracking-normal`) |
| Body / Labels / Options | `16px`–`18px` | `1.5`–`1.6` | `500`–`700` | `0` |
| Data Badges / Captions | `14px`–`15px` (strict floor `>= 14px`) | `1.4` | `500`–`600` | `0` |
| All Numbers / Metrics | `tabular-nums` | — | — | `0` |

---

## 6. Icon-Only Controls & Multi-Channel Data Badges

### A. NN/g Icon-Only Decision Matrix + WCAG 2.2 (SC 2.5.8)
- **Icon-only (no redundant label)** strictly for the 12 universal icons: `X`, `Copy`, `RotateCw`/`RefreshCw`, `Trash2`, `Search`, `Download`, `ExternalLink`, `ArrowLeft`, `ChevronLeft/Right`, `Settings`, `Pause/Play`, `MoreHorizontal`.
- **Keep short 2–3 word label** for domain-specific or ambiguous actions (`전후 비교`, `내 지원금 확인하기`) because hover tooltips fail on touchscreens.
- **Hit Box & Spacing**: Icon `18px–20px` (`strokeWidth={2}`), clickable target `>= 40×40px` desktop / `>= 44–48px` mobile (`>= 56px` for senior primary actions), minimum `8px` (`gap-2`) between adjacent buttons.
- **Mandatory `aria-label`** on every icon-only button; desktop toolbars use **instant-subsequent tooltips** (`300ms` delay on first hover, `0ms` when sliding to an adjacent icon button).

### B. Multi-Channel Functional Metadata Badges (Replacing `·` / `—` Chains)
Combine **surface tint + explicit label (and semantic icon when showing status)** so color-blind users never rely on color alone (WCAG 1.4.1):
```tsx
<div className="flex flex-wrap items-center justify-between gap-2">
  <div className="flex flex-wrap items-center gap-1.5">
    <span className="optical-text rounded-[8px] bg-[#ECF2FA] px-2.5 py-1 text-[14px] font-semibold text-[#4E5968]">
      직접 입력
    </span>
    <span className="optical-text inline-flex items-center gap-1 rounded-[8px] bg-[#E6F6EE] px-2.5 py-1 text-[14px] font-bold text-[#158453] tabular-nums">
      <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
      52점 → 0점 (-52)
    </span>
  </div>
  <div className="flex flex-wrap items-center gap-1.5">
    <span className="optical-text rounded-[8px] bg-[#ECF2FA] px-2.5 py-1 text-[14px] font-semibold text-[#4E5968] tabular-nums">
      대비 7.5
    </span>
    <span className="optical-text rounded-[8px] bg-[#E2EEFF] px-2.5 py-1 text-[14px] font-semibold text-[#1B64DA] tabular-nums">
      수정 1회
    </span>
  </div>
</div>
```

---

## 7. Custom React Form Controls (Zero Native Browser Checkbox / `<select>`)

Never render raw OS/browser `<input type="checkbox">`, `<input type="radio">`, or `<select>` elements — they inject pure `#FFFFFF` fills, harsh `#767676` borders, `3px` jagged corners, and inconsistent OS dropdown popups that shatter the Toss blue-white aesthetic.

### A. Clean React Checkbox (`TossCheckbox`)
Keep full native keyboard/form semantics using an `sr-only` `<input type="checkbox" />` (or `role="checkbox"` button) wrapped inside a generous clickable row (`min-h-[44px]` desktop / `min-h-[52px]` senior rows):

| State | Visual Surface (`22px × 22px`, `rounded-[7px]`) | Icon / Focus |
| :--- | :--- | :--- |
| **Unchecked** | `bg-[#F9FBFF] ring-1 ring-inset ring-[rgba(49,130,246,0.24)]` | Empty; fine-pointer hover strengthens ring to `rgba(49,130,246,0.48)` |
| **Checked** | `bg-[#3182F6] ring-0` | Crisp `#F9FBFF` Lucide `Check` (`h-3.5 w-3.5`, `strokeWidth={3}`), `120ms` opacity/scale reveal |
| **Indeterminate** | `bg-[#3182F6] ring-0` | Crisp `#F9FBFF` Lucide `Minus` (`h-3.5 w-3.5`, `strokeWidth={3}`), `aria-checked="mixed"` |
| **Keyboard Focus** | Single ring via `peer-focus-visible:ring-2 peer-focus-visible:ring-[#3182F6] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#ECF2FA]` | Strictly 1 ring, zero double borders |
| **Gentle Error** | `bg-[#E2EEFF] ring-2 ring-inset ring-[#3182F6]` | Paired with `15px` `#1B64DA` guidance text below |
| **Disabled** | `bg-[#ECF2FA] opacity-50 cursor-not-allowed` | Non-interactive |

```tsx
<label className="group flex min-h-[48px] cursor-pointer items-center gap-3 rounded-[14px] bg-[#ECF2FA] px-4 py-3 select-none">
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => onCheckedChange(e.target.checked)}
    className="peer sr-only"
  />
  <span
    aria-hidden="true"
    className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[7px] transition-colors duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-[#3182F6] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#ECF2FA] ${
      checked
        ? 'bg-[#3182F6] text-[#F9FBFF]'
        : 'bg-[#F9FBFF] ring-1 ring-inset ring-[rgba(49,130,246,0.24)] group-hover:ring-[rgba(49,130,246,0.48)]'
    }`}
  >
    {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
  </span>
  <span className="text-[16px] font-medium text-[#191F28]">{label}</span>
</label>
```

### B. Toss-Style Custom Dropdown (`TossSelect`)
Replace every native `<select>` with a shadowless Toss-style combobox trigger + concentric floating listbox (desktop) or Select BottomSheet (mobile when 5+ options):

| Part | Exact Shadowless Toss Spec |
| :--- | :--- |
| **Trigger Button** | `role="combobox"`, `aria-haspopup="listbox"`, `aria-expanded={open}`, `min-h-[52px] sm:min-h-[56px] w-full rounded-[12px] sm:rounded-[14px] bg-[#ECF2FA] px-4 flex items-center justify-between gap-2 text-[16px] font-medium` (placeholder `#64707D`, selected `#191F28`) |
| **Trigger Open / Focus** | `bg-[#F9FBFF] ring-2 ring-inset ring-[#3182F6] focus:outline-none focus-visible:outline-none` (ONE ring only); right `ChevronDown` (`h-5 w-5 text-[#64707D]`) rotates `180deg` in `150ms` |
| **Desktop Menu Panel** | Shadowless `rounded-[18px] p-1.5 bg-[#F9FBFF] border border-[rgba(49,130,246,0.16)] max-h-[280px] overflow-y-auto overscroll-contain` + `scrollbar-gutter: stable` (zero `shadow-*`!) |
| **Option Item** | `role="option"`, `aria-selected={selected}`, `min-h-[44px] w-full rounded-[12px] px-3.5 py-2.5 flex items-center justify-between gap-3 text-left text-[16px]` (`18 - 6 = 12px` concentric sync!) |
| **Option States** | Idle `text-[#191F28]`; Hover / Keyboard Active `bg-[#ECF2FA]`; Selected `bg-[#E2EEFF] text-[#1B64DA] font-bold` + right-aligned `Check` (`h-[18px] w-[18px] text-[#3182F6] shrink-0`, `strokeWidth={2.5}`) |
| **Mobile (`< 640px`, 5+ options)** | Render the same option rows inside a Toss Select BottomSheet (`rounded-t-[20px] bg-[#F9FBFF]`, `Menu.Header` title + icon-only `X` button, dimmer click closes, `pb-[env(safe-area-inset-bottom)]`) |

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
        ? 'bg-[#F9FBFF] ring-2 ring-inset ring-[#3182F6]'
        : 'bg-[#ECF2FA] focus-visible:bg-[#F9FBFF] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#3182F6]'
    }`}
  >
    <span className={selectedOption ? 'text-[#191F28]' : 'text-[#64707D]'}>
      {selectedOption ? selectedOption.label : placeholder}
    </span>
    <ChevronDown
      aria-hidden="true"
      className={`h-5 w-5 shrink-0 text-[#64707D] transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
      strokeWidth={2}
    />
  </button>
  {open && (
    <ul
      id={listboxId}
      role="listbox"
      className="absolute z-40 mt-2 max-h-[280px] w-full overflow-y-auto overscroll-contain rounded-[18px] border border-[rgba(49,130,246,0.16)] bg-[#F9FBFF] p-1.5 [scrollbar-gutter:stable]"
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
                  ? 'bg-[#E2EEFF] font-bold text-[#1B64DA]'
                  : 'font-medium text-[#191F28] hover:bg-[#ECF2FA]'
              }`}
            >
              <span className="truncate">{opt.label}</span>
              {isSelected && <Check aria-hidden="true" className="h-[18px] w-[18px] shrink-0 text-[#3182F6]" strokeWidth={2.5} />}
            </button>
          </li>
        );
      })}
    </ul>
  )}
</div>
```

### C. Complete Native Browser UI Leak Replacement Matrix

Beyond checkboxes and `<select>`, neutralize EVERY remaining OS-default widget and browser popup leak:

| Native Browser Leak | Why It Breaks Toss Clean UX | Mandatory Toss-Style Replacement |
| :--- | :--- | :--- |
| **`<input type="radio">`** | Tiny gray OS circle with harsh border and inconsistent dot fill | **`TossRadio`** (`sr-only` input + `22px` `rounded-full` `#F9FBFF` ring → `#3182F6` `2px` border + `10px` inner dot) or full-row **`TossSelectChip`** |
| **Raw checkbox used as toggle** | Ambiguous immediate on/off state in settings | **`TossSwitch`** (`role="switch"`, `aria-checked`, `48px × 28px` pill track `#D5DFEE` off / `#3182F6` on, `22px` `#F9FBFF` thumb animated with `TOSS_SPRING`, `min-h-[44px]` hit target) |
| **`<input type="range">`** | Jagged OS slider track/thumb differing wildly on Safari/Chrome/Windows | **`TossSlider`** (`role="slider"`, `6px` `rounded-full bg-[#E8EFFA]` track, `#3182F6` filled range, `22px` `#F9FBFF` thumb with `2px solid #3182F6`, `44px` hit box, `tabular-nums` value) |
| **`<input type="date\|time\|datetime-local\|month\|week">`** | Unstylable OS calendar popups, tiny gray icons, broken Korean UX | **`TossDatePicker`** (shadowless `rounded-[20px]` React calendar grid popover on desktop / Toss BottomSheet calendar or wheel picker on mobile, `Intl.DateTimeFormat('ko-KR')`, `tabular-nums`) |
| **`<input type="file">`** | Hardcoded OS `"파일 선택 / 선택된 파일 없음"` button in system font | **`TossFileUpload`** (`sr-only` `<input type="file">` triggered by `rounded-[14px]` Toss button or `#ECF2FA`/`#F9FBFF` dashed dropzone + Lucide `Upload` + selected file badge with icon-only `X` clear) |
| **`<input type="color">`** | Tiny beveled OS swatch box & system dialog | **`TossColorPicker`** (curated tonal swatch buttons `rounded-[8px]` + validated `#HEX` `TossTextField`) |
| **`<input type="number">`** | Ugly OS up/down spin arrows + accidental scroll-wheel value mutation | Use **`type="text" inputMode="numeric"`** (or `decimal`) with explicit formatting; if stepping is needed, add clean `Minus` / `Plus` icon-only buttons (`40px+`) |
| **`<input type="search">`** | Clashing OS blue/gray `×` cancel button | Strip `::-webkit-search-cancel-button` in base CSS and render a clean Lucide `X` icon-only clear button (`aria-label="검색어 지우기"`) |
| **`<datalist>`** | Unstylable OS autocomplete dropdown | **`TossCombobox`** reusing `TossSelect` shadowless `rounded-[18px] p-1.5` listbox + `rounded-[12px]` rows |
| **`<progress>` / `<meter>`** | Ugly striped/beveled OS bars | **`TossProgressBar`** (`role="progressbar"`, `h-2 rounded-full bg-[#E8EFFA]` + `#3182F6` smooth bar, `tabular-nums` label) |
| **`window.alert / confirm / prompt`** | Freezes main thread, pops jarring OS modal with browser URL header | **`TossDialog`** (`role="alertdialog" aria-modal="true"`, shadowless `rounded-[20px] bg-[#F9FBFF]`) for decisions; **`TossToast`** (`role="status" aria-live="polite"`, `rounded-[14px] bg-[#191F28] text-[#F9FBFF]`) for transient feedback |
| **Native HTML `title="..."` tooltip** | Delayed (~1s) ugly yellow/gray OS box, fails on touch | Remove `title` on interactive controls; use `aria-label` + custom React **`TossTooltip`** (`rounded-[8px] bg-[#191F28] text-[#F9FBFF] text-[14px]`, `300ms` first / `0ms` adjacent hover) |
| **HTML5 constraint validation bubble** | Ugly orange/white OS speech bubble (`"이 입력란을 작성하세요."`) | Always put **`noValidate`** on `<form>` and render calm `#1B64DA` inline validation below the field |
| **`<details>` / `<summary>` default `▸`** | Jagged browser triangle & abrupt snap | Strip `::-webkit-details-marker` or build custom React accordion (`button aria-expanded` + rotating `ChevronDown` + CSS `grid-template-rows`) |
| **Hidden CSS Chrome Leaks** | Yellow/blue `:-webkit-autofill`, mobile gray tap flash, Edge duplicate password eye `::-ms-reveal`, bulky Windows scrollbars, jagged `<textarea>` resize gripper | Neutralized globally in Section 2 `@layer base` CSS shield (`0 0 0 1000px inset` autofill override, `-webkit-tap-highlight-color: transparent`, `::-ms-reveal: none`, `resize: none` + `field-sizing: content`, `6px` subtle blue-tinted scrollbar) |
