# Interaction Craft: Breathable Natural Scrolling, Dual-Theme Ergonomics, Frequency-Gated Motion & Toss Senior UX

## 1. Breathable Natural Scrolling vs. Opt-In Split-Pane Workspaces

Grounded in **Nielsen Norman Group ("Scrolling and Attention" & "The Fold Manifesto")** and our **live audit of 7 Toss production properties** (`toss.im`, `tossbank.com`, `toss.tech`, `tosspayments.com`, `docs.tosspayments.com`, `tossplace.com`, `tossinvest.com`):

### Why Forced "Scroll-less" Everywhere Is an Anti-Pattern
- Cramping content into a locked `h-[100dvh] overflow-hidden` viewport creates **claustrophobia**, destroys typographic hierarchy, and triggers NN/g's **"Illusion of Completeness"** (users assume a packed box contains everything and stop exploring).
- Real Toss landing pages (`toss.im`, `tossbank.com`, `tosspayments.com`) and editorial/docs pages (`toss.tech`, `docs.tosspayments.com`) NEVER restrict scrolling — they give every section **generous whitespace (`py-14`–`py-24`)** and **One Thing per Section**, so scrolling feels effortless and unhurried.
- ONLY real-time multi-pane terminals (like Toss Securities WTS `tossinvest.com`, where chart + orderbook + live watchlist must coexist simultaneously) use a viewport-fitted shell — and even there, every pane scrolls smoothly with generous breathing room.

### Page-Type Scroll & Navigation Decision Matrix

| Product / Page Type | Scroll Strategy | Navigation & Spacing Rule |
| :--- | :--- | :--- |
| **Landing, Lead Funnel, Onboarding, Forms** (`toss.im`, `tossbank.com`, `tosspayments.com`) | **Natural Fluid Scroll (`min-h-[100dvh]`)** — NEVER clamp with `overflow-hidden` | Crisp above-the-fold focal point (headline + value + primary action) + generous section breathing room (`py-14`–`py-24`) + **The Peek Effect** (let the top of the next section gently peek near the fold to invite scrolling) |
| **Editorial, Blog, Knowledge Base, Docs** (`toss.tech`, `docs.tosspayments.com`) | **Natural Fluid Scroll (`min-h-[100dvh]`)** | Centered reading measure (`max-w-[720px]`–`max-w-[1120px]`), airy list rows without card-wall clutter, optional 1 sticky sidebar (`top-20`) |
| **Standard SaaS Dashboard & Settings** | **Natural Fluid Scroll (`min-h-[100dvh]`)** | Top bar + max 1 clean navigation axis (either 1 top segmented switcher for 2–5 views OR 1 airy left rail — never double sidebars + nested sub-tab stacks) |
| **Real-Time Multi-Pane Live Workspace ONLY** (`tossinvest.com` WTS, IDE, split preview) | **Opt-In Desktop Split-Pane (`lg:h-[100dvh] flex flex-col`)**, releasing to `min-h-[100dvh]` below `1024px` | Each pane uses `min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-gutter:stable]` with generous internal padding so nothing ever feels cramped |

- **Universal Mobile Rule**: NEVER use `h-screen` or `min-h-screen` (`100vh` clips behind mobile browser chrome). Always use `min-h-[100dvh]` and include `interactive-widget=resizes-content` in `<meta name="viewport">`.

### Post-Purge Structural Re-Layout & Exception-Only Disclosure ("Silence When Healthy")
- Apply the **`>50%` Necessity Gate (Manga-Panel Rule)** BEFORE layout: omit speculative top 3-up/4-up KPI strips, internal plumbing telemetry (`열린 탭 0개`, `초당 처리량 0.0`), and permanent all-zero error/quarantine boxes (`격리 0 | 오류 0`) so the user lands immediately on their actual work without scrolling past dead telemetry.
- Follow **Silence When Healthy**: show zero error panels when `errors === 0`, and surface ONE calm, actionable banner/badge strictly when `count > 0` (never style `0` in danger red/amber).
- Cutting ~70% of redundant LLM copy directly upgrades spatial ergonomics: instead of shrinking boxes or leaving dead holes inside old multi-card grids, **re-layout the page from scratch around the surviving ~30% essential copy**.
- Replace text-padded 3-column card grids with clean 2-column focal splits, hairline `divide-y` stat lists, or open typographic sections (`py-14`–`py-24`) where generous whitespace frames a single unmistakable action and lets the next section's Peek Effect sit cleanly near the fold.

### Linear "Quiet Chrome" & Progressive Disclosure
Core maxim: **"Don't compete for attention you haven't earned."**
- Keep headers, navigation, and dividers quiet in neutral surface tones; reserve `var(--color-primary)` strictly for system signals (primary CTA, active state, single focus ring, key metric).
- Reveal secondary complexity cleanly via **top segmented switchers** (`rounded-[16px] p-1` + `rounded-[12px]` active pill), **hover/focus-within row actions** (gated by `@media (hover: hover) and (pointer: fine)`), **slide-over/bottom sheets** (`rounded-[20px]` / `rounded-t-[20px]`), or **`⌘K` command search** (like `docs.tosspayments.com` & `tossinvest.com`) when 6+ destinations exist.

### Dual-Theme Switching Ergonomics (Modeled on `tossinvest.com`)
- Default to system `prefers-color-scheme` on first visit; persist explicit user choice in `localStorage` and apply before first paint in `index.html` (`0` light/dark flash).
- Provide a single quiet icon-only `Sun` / `Moon` toggle button (`aria-label="다크 모드로 전환"` / `"라이트 모드로 전환"`, `>= 40px` hit target, `rounded-[8px]`) in the header or utility corner.
- Never run `transition-all` on `html/body` during theme toggles (causes sluggish cross-fade lag on large tables); switch semantic CSS variables crisply.

---

## 2. Frequency-Gated Motion Physics (Emil Kowalski & Rauno Freiberg)

Match animation energy strictly to **interaction frequency** — never slow down repeated daily actions with heavy springs.

| Interaction Frequency | Examples | Motion Decision |
| :--- | :--- | :--- |
| **100+ times/day (Keyboard / Dense Tool)** | `⌘K` palette, filter toggles, dense row focus, theme switch | **`0ms` instant** or `100–120ms` crisp CSS color/opacity transition (no entrance animation) |
| **10–50 times/day (Navigation / Controls)** | Button press (`whileTap={{ scale: 0.965 }}`), tab `layoutId` slide, row hover reveal | Fast **`120–180ms`** `ease-out` (`cubic-bezier(0.23, 1, 0.32, 1)`) or crisp `TOSS_SPRING` (`stiffness: 400, damping: 32, mass: 0.8`) |
| **Occasional (Spatial Transitions)** | Funnel step slide, modal/sheet/dropdown open-close, inline validation reveal | `motion/react` `TOSS_LAYOUT_SPRING` (`stiffness: 320, damping: 30`) + `<AnimatePresence mode="popLayout" initial={false}>` |
| **Asymmetric Enter / Exit** | Sheets, popovers, dropdowns, inline notices | **Exit faster than enter** (`enter 160–220ms`, `exit 110–150ms`); never animate from `scale(0)` (start from `scale(0.96–0.98)`) |
| **Momentum Swipe Dismissal** | Mobile bottom sheets / toasts | Dismiss when `Math.abs(distance) >= threshold || velocity > 0.11` so quick flicks register immediately |

### Zero-CLS State Contract (TDS Interaction Standard)
Every data-backed region defines all 5 explicit states without shifting layout coordinates:
1. **`idle` / ready**
2. **`loading`**: Layout-preserving static skeleton matching exact final dimensions (`CLS = 0`) using `var(--surface-field)` — prefer over generic centering spinners.
3. **`empty`**: Clear plain-Korean message + 1 obvious first action button.
4. **`error`**: Gentle, plain-Korean recovery hint + retry/fix action.
5. **`duplicate` / `success`**: Immediate personalized feedback with safe persistence.

Always wrap app root in `<MotionConfig reducedMotion="user">`, animate `transform`/`opacity`/`clip-path` only, use CSS `grid-template-rows` for accordion height, and never use `transition-all`.

---

## 3. Accessible Form Craft: "Reward Early, Punish Late" & Custom Controls

Grounded in Nielsen Norman Group & WCAG 2.2 accessibility research:

1. **NEVER Disable the Submit Button for Validation**:
   - Keep submit buttons **always enabled** (disable or show `aria-busy` spinner *only* during an active async request to prevent double-submits).
2. **Punish Late (Never Scold Mid-Typing)**:
   - Always put `noValidate` on `<form>` to block harsh native browser bubbles; trigger validation **on submit** (or `blur` after finishing input).
3. **Reward Early (Instant Relief on Edit)**:
   - Clear a field's error state on the **very next valid keystroke** as soon as the user starts fixing it.
4. **Guide Directly to the Fix**:
   - On validation failure, programmatically `.focus()` the first invalid input, attach `aria-invalid="true"` + `aria-describedby` + `aria-live="polite"`, and display calm `15px` bold `text-[var(--color-primary-text)]` guidance directly beneath the field.
5. **Custom React Controls & Zero Native Popups**:
   - **`TossCheckbox`**: Full-row click targeting (`<label>` or `role="checkbox"`), Space-bar toggle, `checked`/`unchecked`/`indeterminate` (`aria-checked="mixed"`), keeping adjacent `보기` links outside the toggle target.
   - **`TossSelect`**: Full WAI-ARIA keyboard listbox (`ArrowDown`/`ArrowUp`, `Home`/`End`, `Enter`/`Space`, `Escape`/outside pointer-down, focus return to trigger, auto-flip upward if `< 240px` space below); on `< 640px` mobile with 5+ options, present inside a Toss Select BottomSheet (`closeOnDimmerClick`, focus lock, momentum swipe-down, right-aligned `Check` icon).
   - **`TossDialog` / `TossToast` / `TossTooltip`**: Replace `window.alert/confirm/prompt` with focus-trapped `TossDialog` or `3s` auto-dismiss `TossToast` (pauses on hover/focus); replace native `title="..."` with `aria-label` + instant-subsequent `TossTooltip` (`300ms` first, `0ms` adjacent).
   - **`TossSlider` / `TossFileUpload` / `TossSwitch`**: Keyboard & pointer drag (`ArrowLeft/Right/Home/End`, `44px` hit target) on `TossSlider`; drag-over `var(--color-primary-soft)` highlight + file validation on `TossFileUpload`; crisp spring toggle on `TossSwitch`.

---

## 4. Toss Senior UX Research: Guarding Against the 5 Senior Misconceptions

From Toss User Research's face-to-face usability testing with 50+ / senior users (7.3M+ senior users):

| Senior Misconception | Real Failure Pattern | Mandatory Prevention Rule in `toss-clean-ux` |
| :--- | :--- | :--- |
| **1. Component Misconception** | Seniors miss clickable links styled as plain text or tiny bare `>` arrows | Give every primary selectable item an unmistakable filled button surface (`bg-[var(--surface-field)]`, `min-h-[56px–68px]`) |
| **2. Example Data Misconception** | Seniors mistake realistic pre-filled inputs or mock screenshots for their own account | Never pre-fill inputs with fake personal data; clearly prefix placeholders with `예: 홍길동…` and label test helpers explicitly (`시험하기`) |
| **3. Motion Misconception** | Seniors try to physically mimic decorative looping animations instead of reading instructions | Zero decorative looping animations or pulsing dots; keep motion strictly reactive to user taps and state changes |
| **4. Writing Misconception** | Ambiguous rhetorical questions or passive jargon confuse seniors ("정말 진행하시겠습니까?") | Apply Toss 5 Core Values (**Clear, Concise 잡초 뽑기, Casual 해요체, Predictable Hint, Easy to Speak**) — tell them directly what pressing the button does |
| **5. Scroll Blindness** | Seniors miss core actions buried far down a cluttered page, yet feel suffocated by crammed boxes | Put the **primary action cleanly above the fold** with generous whitespace, and use **One Thing per Section + The Peek Effect** so downward scrolling is obvious and unhurried |
