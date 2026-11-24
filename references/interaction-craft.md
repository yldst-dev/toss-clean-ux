# Interaction Craft: Quiet Chrome, Scroll-less Disclosure, Frequency-Gated Motion & Toss Senior UX

## 1. Linear "Quiet Chrome" + Scroll-less 4-Pattern Progressive Disclosure

Core maxim: **"Don't compete for attention you haven't earned."** Navigation chrome, frames, and dividers recede in low-contrast cool tones so the user's primary task wins immediately. Toss Blue (`#3182F6`) acts strictly as a **system signal** (primary CTA, active tab/chip, single focus ring, key number) — never as decorative wallpaper.

### Viewport-First (`100dvh`) Rules
- **App / Tool / Dashboard Views**: Lock desktop shell to `lg:h-[100dvh] lg:overflow-hidden flex flex-col`. Confine vertical overflow exclusively to the **single active inner data pane** (`min-h-0 flex-1 overflow-y-auto overscroll-contain` + `scrollbar-gutter: stable`).
- **Focused Landing / Funnel Pages**: Show the primary value proposition and interactive funnel immediately above the fold; keep total vertical length disciplined by folding secondary comparisons, terms, and details into tabs, steps, or sheets rather than stacking 6+ vertical sections.
- **Mobile Release (`< 1024px`)**: Never use `h-screen` or `min-h-screen` (`100vh` clips behind mobile browser bars). Use `min-h-[100dvh]` for natural short reflow with `0px` horizontal overflow.

### The 4 Clutter-Free Progressive Disclosure Tools (Replacing Messy Sidebars)
1. **Single Synchronized Top Segmented Switcher (2–5 views)**: `rounded-[16px] p-1 bg-[#E8EFFA]` with `rounded-[12px] bg-[#F9FBFF]` active pill + `layoutId="activeChipIndicator"`. Eliminates sidebars completely for <= 5 views.
2. **Hover / Focus-Within Row Action Toolbars**: Keep secondary row controls (copy, edit, delete icon-only buttons) hidden at rest on desktop and reveal smoothly on `:hover` / `:focus-within` (gated by `@media (hover: hover) and (pointer: fine)`). On mobile, expose via a single clean `MoreHorizontal` button.
3. **Slide-Over Detail Sheet / Bottom Sheet**: Show history, settings, raw inspection, or full legal terms in a clean overlay sheet (`rounded-[20px]` desktop / `rounded-t-[20px]` mobile, `overscroll-contain`, `Esc` closes & returns focus) instead of extending page height.
4. **Command Palette (`⌘K`) for 6+ Actions**: When a workspace grows beyond 5 primary actions, add a zero-animation instant `⌘K` switcher rather than piling side-tabs + top sub-tabs + right inspector rails onto one screen.

---

## 2. Frequency-Gated Motion Physics (Emil Kowalski & Rauno Freiberg)

Match animation energy strictly to **interaction frequency** — never slow down repeated daily actions with heavy springs.

| Interaction Frequency | Examples | Motion Decision |
| :--- | :--- | :--- |
| **100+ times/day (Keyboard / Dense Tool)** | `⌘K` palette, filter toggles, dense list row focus | **`0ms` instant** or `100–120ms` crisp CSS color/opacity transition (no entrance animation) |
| **10–50 times/day (Navigation / Controls)** | Button press (`whileTap={{ scale: 0.965 }}`), tab `layoutId` slide, row hover reveal | Fast **`120–180ms`** `ease-out` (`cubic-bezier(0.23, 1, 0.32, 1)`) or crisp `TOSS_SPRING` (`stiffness: 400, damping: 32, mass: 0.8`) |
| **Occasional (Spatial Transitions)** | Funnel step slide, modal/sheet open-close, inline validation reveal | `motion/react` `TOSS_LAYOUT_SPRING` (`stiffness: 320, damping: 30`) + `<AnimatePresence mode="popLayout" initial={false}>` |
| **Asymmetric Enter / Exit** | Sheets, popovers, inline notices | **Exit faster than enter** (`enter 200–240ms`, `exit 140–160ms`); never animate from `scale(0)` (start from `scale(0.95)`) |
| **Momentum Swipe Dismissal** | Mobile bottom sheets / toasts | Dismiss when `Math.abs(distance) >= threshold || velocity > 0.11` so quick flicks register immediately |

### Zero-CLS State Contract (TDS Interaction Standard)
Every data-backed region must define all 5 explicit states without shifting layout coordinates:
1. **`idle` / ready**
2. **`loading`**: Layout-preserving static skeleton matching exact final dimensions (`CLS = 0`) — prefer over generic centering spinners for content panes.
3. **`empty`**: Clear plain-Korean message + 1 obvious first action button.
4. **`error`**: Gentle, plain-Korean recovery hint + retry/fix action.
5. **`duplicate` / `success`**: Immediate personalized feedback with safe persistence (`localStorage` in mocks).

Always wrap app root in `<MotionConfig reducedMotion="user">`, animate `transform`/`opacity`/`clip-path` only, use CSS `grid-template-rows` for accordion height, and never use `transition-all`.

---

## 3. Accessible Form Craft: "Reward Early, Punish Late"

Grounded in Nielsen Norman Group & WCAG accessibility research:

1. **NEVER Disable the Submit Button for Validation**:
   - Keep submit buttons **always enabled** (disable or show `aria-busy` spinner *only* during an active async request to prevent double-submits).
   - Greyed-out disabled submit buttons vanish from keyboard tab order, fail WCAG contrast, and trap beginners/seniors in a silent dead end with no clue what is missing.
2. **Punish Late (Never Scold Mid-Typing)**:
   - Trigger validation errors **on submit** (or on field `blur` after the user finishes typing) — never flash red errors on the 2nd character while typing a phone number!
3. **Reward Early (Instant Relief on Edit)**:
   - Clear a field's error state on the **very next valid keystroke** as soon as the user starts fixing it.
4. **Guide Directly to the Fix**:
   - On validation failure, programmatically `.focus()` the first invalid input, attach `aria-invalid="true"` + `aria-describedby` + `aria-live="polite"`, and display calm, kind `#1B64DA` guidance (`15px` bold) directly beneath the field.
5. **Custom React Checkbox & Toss-Style Dropdown Interaction Contract**:
   - **`TossCheckbox`**: Support full-row click targeting (`<label>` or `role="checkbox"`), Space-bar toggle, `checked` / `unchecked` / `indeterminate` (`aria-checked="mixed"` for parent-child consent groups), and keep any adjacent link/detail button (`보기`) outside the checkbox toggle target so clicking `보기` opens the sheet without accidentally toggling consent.
   - **`TossSelect` Desktop Listbox**: Implement full WAI-ARIA keyboard interaction (`ArrowDown` / `ArrowUp` to move highlight, `Home` / `End` to jump, `Enter` / `Space` to select & close, `Escape` or outside pointer-down to dismiss without mutating value, and immediate focus return to the trigger button). Animate open (`160ms ease-out`, `scale 0.98 -> 1`, `y -4 -> 0`) and close faster (`110ms`). Automatically flip upward if viewport space below is `< 240px`.
   - **`TossSelect` Mobile BottomSheet (`< 640px`, 5+ options)**: Present options in a Toss Select BottomSheet (`closeOnDimmerClick`, focus lock while open, `Escape` / back-gesture dismissal, momentum swipe-down dismissal, right-aligned `Check` icon) instead of cramped native OS pickers or overflowing popovers. Include a hidden `<input type="hidden" name={name} value={value} />` when submitting inside native `<form>` elements.
   - **Other Custom Controls & Zero Native Popups**:
     - Always add `noValidate` to `<form>` so OS constraint bubbles never override inline `#1B64DA` guidance.
     - Replace `window.alert/confirm/prompt` with non-blocking `TossToast` (auto-dismiss `3s`, pause on hover/focus) or focus-trapped `TossDialog` (`Esc` closes & returns focus to trigger).
     - Replace native `title="..."` attributes with `aria-label` + instant-subsequent React `TossTooltip` (`300ms` first hover, `0ms` sliding between adjacent toolbar buttons; never rely on hover tooltips to convey critical info on mobile).
     - Support keyboard & drag ergonomics on `TossSlider` (`ArrowLeft/Right/Home/End`, `44px` invisible hit target), drag-and-drop highlight (`#E2EEFF`) + file-size validation on `TossFileUpload`, and Space/Enter instant spring toggle on `TossSwitch`.

---

## 4. Toss Senior UX Research: Guarding Against the 5 Senior Misconceptions

From Toss User Research's face-to-face usability testing with 50+ / senior users (7.3M+ senior users):

| Senior Misconception | Real Failure Pattern | Mandatory Prevention Rule in `toss-clean-ux` |
| :--- | :--- | :--- |
| **1. Component Misconception** | Seniors miss clickable links styled as plain text or tiny bare `>` arrows | Give every primary selectable item an unmistakable filled/bordered button surface (`bg-[#ECF2FA]`, `min-h-[56px–68px]`) |
| **2. Example Data Misconception** | Seniors mistake realistic pre-filled example inputs or mock screenshots for their own personal account | Never pre-fill inputs with fake personal data; clearly prefix placeholders with `예: 홍길동…` and label test helpers explicitly (`시험하기`) |
| **3. Motion Misconception** | Seniors try to physically mimic decorative looping animations instead of reading instructions | Zero decorative looping animations or pulsing dots; keep motion strictly reactive to user taps and state changes |
| **4. Writing Misconception** | Ambiguous rhetorical questions or passive jargon confuse seniors ("정말 진행하시겠습니까?") | Apply Toss 5 Core Values (**Clear, Concise 잡초 뽑기, Casual 해요체, Predictable Hint, Easy to Speak**) — tell them directly what pressing the button does |
| **5. Scroll Blindness** | Seniors frequently fail to notice content below the initial fold | Prioritize **Scroll-less Viewport-First (`100dvh`)** layout and **One Thing per Screen** step progression so core actions stay visible without hunting down the page |
