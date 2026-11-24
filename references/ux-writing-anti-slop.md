# UX Writing, >50% Necessity Gate, 70% Copy Purge & Re-Layout, and Anti-AI-Slop Rules

## 0. The >50% Necessity Gate ("Manga-Panel Editing" / 만화책 컷 원칙)

A great interface is edited like a great comic/manga (**만화책**): **include ONLY the scenes needed to advance the user's current action — cut every unnecessary inner monologue, flashback, and speculative "just-in-case" panel.**

### Default = OMIT (Earn Every Pixel)
- Before adding ANY KPI card, counter box, summary strip, or status widget, ask:
  > *"Would more than 50% of real users genuinely need this right now to decide their next action, or have enough users actively asked for it?"*
- If the answer is **NO** → **leave it OUT.** Wait until >50% of users say it is needed or real user demand proves it. Never pad the top of an app with speculative stat cards just to "make it look like a dashboard."

### 4 Banned Speculative Dashboard Patterns (Eliminated by Default)
1. **Vanity 3-Up / 4-Up Top KPI Strips**: Rows of equal boxes (`초당 처리량 0.0 건/초`, `대기 중인 작업 0건`, `개편 완료 0곳`, `누적 품질 개선 0점`) stuffed with decorative corner icons and secondary sub-captions that merely report idle zeros.
2. **Permanent All-Zero Error / Quarantine Strips ("Silence When Healthy")**: Dedicated 3-column counter boxes showing `격리 0 | 수집 오류 0 | 개편 오류 0` when nothing is wrong.
   - **Mandatory Rule**: When healthy (`count === 0`), **hide error/quarantine blocks completely** (0 visual noise). Surface a **single concise, actionable alert** (`수집 오류 2건 확인하기`) ONLY when `count > 0`.
3. **Screaming Danger Red / Amber on `0`**: Never style `0` in red (`#C83242` / `#FF7187`) or warning amber! Red signals an active problem right now — coloring `0` red creates instant false-alarm fatigue.
4. **Leaked Developer / Backend Plumbing Telemetry**: Exposing internal worker metrics (`열린 브라우저 탭 0개`, `전송 대기 알림 0건`, `브라우저 정상`, `0.0 req/s`) to end users. Keep user screens focused strictly on user work outcomes; hide diagnostics unless explicitly requested.

---

## 0.B Mandatory Two-Pass Protocol: 70% LLM Copy Purge & Structural Re-Layout

Grounded in **Nielsen Norman Group** (*users read only 20%–28% of words on a web page*), **Steve Krug** (*"Get rid of half the words on each page, then get rid of half of what's left"* = **75% cut**), and LLM verbosity bias studies (LLMs compulsively over-explain, pad cards symmetrically, and stack redundant sections):

### Pass 1 — Ruthless 70% Copy Purge (Keep ONLY the Essential ~30%)
Audit every visible string on the page and sort it into 3 strict buckets before touching CSS:

| Bucket | Share | What Belongs Here | Action |
| :--- | :--- | :--- | :--- |
| **Tier 1: Essential** | **~30%** | Core value headline, raw concrete proof/numbers (`tabular-nums`), clear field labels & unmistakable action buttons, single-exposure safety/gentle error hints | **KEEP & PROMOTE** (enlarge scale, strengthen contrast) |
| **Tier 2: Secondary** | **~15%** | Detailed terms, calculation breakdown, extended help, edge-case FAQs | **FOLD** behind progressive disclosure (`BottomSheet`, `Dialog`, accordion, `TossTooltip`) |
| **Tier 3: Redundant / Low-Priority Filler** | **~55%** | Happy talk/greetings (`환영합니다`, `혁신적인 올인원 플랫폼`), eyebrow kickers (`WHY US`, `01.`), subtitles restating headings, obvious UI instructions (`아래 입력창에 적고 버튼을 눌러주세요`), symmetrical card body paragraphs when the title already says it all, repeated trust badges, filler Korean modifiers ("잡초") | **DELETE COMPLETELY** |

#### Concrete Purge + Re-Layout Transformation
- **Before (Typical LLM Bloated Hero + 3-Card Section — 100% text)**:
  - Eyebrow kicker `AI 기반 스마트 정책자금 매칭 플랫폼` + 2-line H1 + 3-line welcoming paragraph + 4 trust pills + 3 equal feature cards each containing an icon tile, heading, and 3-line explanation + repeated footer reassurance banner.
- **After Pass 1 (70% Purged — ~30% Essential Text)**:
  - 1 crisp H1 (`내가 받을 지원금,\n얼마인지 알아보세요`) + 1 short line (`내 상황만 고르면 받을 돈을 바로 보여드려요.`) + interactive 2-step input card + single reassurance line strictly beneath the final CTA + 1 open hairline proof list (title + concrete number only, 0 body filler).

### Pass 2 — Mandatory Structural Re-Layout ("다시 페이지 배치하라")
Deleting 70% of text while keeping old LLM boxes intact leaves hollow, lopsided voids. Immediately re-compose the page structure around the surviving 30%:
1. **Dissolve Emptied Card Shells**: When a card drops from title + 3-line paragraph to title + short metric, remove the heavy card container and switch to an open `toss.tech`-style typographic layout, hairline `divide-y` row list, or clean 2-column anchor pair.
2. **Merge or Delete Thin Redundant Sections**: If two adjacent LLM sections ("주요 특징" + "도입 효과") shrink to 2 lines each after purging, fuse them into 1 decisive section or cut the weaker section entirely.
3. **Recalibrate Macro vs. Micro Whitespace**: Expand macro section breathing room (`py-14`–`py-24`) while keeping micro spacing tight (`gap-2`–`gap-3`) between related label/value pairs so sparse copy feels deliberately calm and sculptural.
4. **Billboard-at-60-mph Scale Check**: Enlarge the surviving focal headline and hero metric so a first-time visitor grasps *what it is* and *what to click* within **3 seconds** without reading a single paragraph.

---

## 1. Toss UX Writing 5 Core Values & Plain-Korean Test

Every visible sentence must satisfy Toss's 5 Core Values (**Clear · Concise · Casual · Predictable Hint · Easy to Speak**) and pass the **3-second comprehension test** for both a 3rd-grade child and a 70-year-old adult:
- **잡초 뽑기 (Weed Cutting)**: Delete filler modifiers that add zero meaning (`앞으로 받을 지원금` → `받을 지원금`, `최적화된 맞춤형 프로세스` → delete).
- **Predictable Hint**: Every button and step tells the user *what will happen next* (`내 지원금 확인하기`, `위로 올라가서 확인하기`), removing fear of accidental charges or submissions.
- **Easy to Speak**: Read every line aloud — if it trips the tongue or takes two breaths, split or shorten it.

### Length & Density Budgets
- **Main Headline (`h1`)**: `<= 20 chars` including spaces, max 2 lines (e.g. `내가 받을 지원금,\n얼마인지 알아보세요`).
- **Hero Subtitle**: `<= 30 chars`, 1 single line (e.g. `내 상황만 고르면 받을 돈을 바로 보여드려요.`).
- **Card / Row Body**: Max 2 lines. If the heading is already self-explanatory, delete the body copy completely.
- **Hero Text Ceiling**: Max 3 text elements on first screen (H1 + 1-line subtitle + optional compact live proof).

### Punctuation Hygiene: Ban `·` (Middle-Dot) & `—` (Em-Dash) Abuse
- **No Em-Dash (`—`) Chains**: Never join clauses or subtitles with `—`. Split into separate typography elements, line breaks, or natural Korean sentence endings.
- **No Middle-Dot (`·`) Metric Concatenation**: Never jam multiple metrics, statuses, or metadata values into one string separated by `·`:
  - Bad: `대비 7.5 · 수정 1회` / `직접 입력 · 52점 → 0점 (-52)` / `서울 강남구 · 4년 차 · 카페`
  - Good: Render each item as a clean, understated **multi-channel metadata badge** (`rounded-[8px]`, `gap-1.5`–`gap-2`, `tabular-nums`, semantic icon + text for status) or aligned columns.
  - Keep `·` ONLY inside standard Korean compound nouns (`시·군·구`, `예금·적금`, `어린이·시니어`), never as a layout separator between stats.

### Icon-Only Self-Explanatory Buttons (NN/g Verified)
- Only **universal icons** (`X`, `Copy`, `RotateCw`/`RefreshCw`, `Trash2`, `Search`, `Download`, `ExternalLink`, `ArrowLeft`, `ChevronLeft/Right`, `Settings`, `Pause/Play`, `MoreHorizontal`, `Sun/Moon`) render **icon only** with zero redundant words (`닫기`, `복사`, `새로고침`, `삭제`, `검색`).
- Every icon-only button requires `aria-label` (and desktop instant-subsequent tooltip).
- Ambiguous or domain-specific actions (`전후 비교`, `내 지원금 확인하기`) ALWAYS keep short, clear Korean text labels.

### Banned Jargon → Everyday Spoken Korean
| Avoid (Hard Sino-Korean / Finance / IT) | Use Instead (Plain Spoken Korean) |
| :--- | :--- |
| 진단, 산출, 프로세스, 솔루션, 컨설팅 | 알아보기, 확인하기, 도와드려요 |
| 제출, 데이터, 리포트, 매칭, 적합도 | 보내기, 결과, 골라드려요, 나에게 맞는 |
| 이차보전, 대환, 운전자금, 가조회 | 이자 지원, 낮은 이자로 바꾸기, 운영비, 미리 확인 |
| 경정청구, 세액공제, 소급, 재무제표, 공동인증서 | 못 돌려받은 세금, 서류 |
| AES-256, TLS 1.3, NICE·KCB, B2B SaaS, CFO | 안전하게 지워요, 신용점수, 작은 회사 대표님 |
| 제3자 정보 제공 동의 | 담당자 연결 안내 |
| 개인사업자 / 법인사업자 / 예비창업자 | 가게나 사업체를 운영해요 / 회사(법인)를 운영해요 / 곧 가게나 일을 시작해요 |

### Gentle Error Copy (Reward Early, Punish Late)
- Name missing: `"성함을 2글자 이상 적어주세요."`
- Phone incomplete: `"휴대폰 번호 11자리를 모두 적어주세요."`
- Consent unchecked: `"결과를 보시려면 아래 동의 칸을 꼭 눌러주세요."`
- Duplicate phone: `"이미 결과를 확인하신 번호예요."`

---

## 2. Zero-Duplication Map (1 Message = 1 Exposure, When Reassurance Copy Applies)

| Region | Allowed Message | Strictly Banned Duplicates |
| :--- | :--- | :--- |
| Header CTA | Action only (`지원금 확인하기`) | `30초`, `무료`, `신용점수` |
| Hero Left | 1 core benefit + 1-line explanation + quiet live proof | `30초`, `무료`, `신용점수`, `수수료 0원`, 3-col trust cards |
| Funnel Step 1 | Single situation question (`지금 어떤 일을 하고 계세요?`) | Extra reassurance footer lines |
| Funnel Step 2 (Bottom of Final CTA) | **THE ONLY HOME** for reassurance: `30초면 끝나고 무료예요. 확인해도 신용점수는 그대로예요.` | — |
| Secondary Views / Tabs | Distinct concrete value or concise answers (zero overlap) | `30초`, `무료`, `신용점수` |
| Mobile Floating CTA | Single clean button (`내 지원금 확인하기`) | Reassurance sub-banner above button |

---

## 3. Anti-AI-Slop Ban List (Synthesized from Live Toss Audit + 6 Skills)

Reject every item below unless explicitly requested by the user:
1. **Double focus borders** — Never stack global `:focus-visible` `outline` + `focus:ring-*` (or `focus:border-*` + `focus:ring-*`).
2. **Extreme or mismatched corner radii** — Ban `0px–4px` sharp corners on cards/list rows/inputs AND ban `rounded-full` / `>= 26px` balloons on rectangular containers; enforce `R_inner = R_outer - P` + progressive `corner-shape: squircle`.
3. **Low-contrast text, pure `#000000`/`#FFFFFF` glare & color-only statuses** — Ban `#8B95A1` on light canvases (`< 4.5:1`), ban `#62626D` or low-luminance `#3182F6` text on dark canvases (`use #9E9EA4` muted ink and `#449BFF`–`#61B0FF` blue text in dark mode), ban pure `#000000`/`#FFFFFF` surfaces, and pair color + icon/text on status badges.
4. **Disabled submit buttons for validation** — Never grey-out/disable submit CTAs waiting for form validity; keep clickable and guide to the first error on submit.
5. **Raw native browser widgets, OS popups & browser chrome leaks** — Never expose OS-default `<input type="checkbox|radio|file|range|date|time|color">`, `<select>`, `<datalist>`, `<progress>`, `<meter>`, `window.alert/confirm/prompt`, native `title="..."` tooltips, or HTML5 constraint validation bubbles (`<form>` without `noValidate`). Replace with shadowless dual-theme React components and apply the global CSS Browser Chrome Shield (`:-webkit-autofill`, `-webkit-tap-highlight-color`, `::-ms-reveal`, scrollbars, `resize: none`).
6. **Middle-dot (`·`) & em-dash (`—`) text walls** — Replace middot-glued metrics with clean tonal badges; remove decorative em-dashes.
7. **Redundant text on self-evident icon buttons** — Never put `닫기`/`복사`/`새로고침` beside universal icons.
8. **Claustrophobic scroll-locked traps AND bloated multi-rail chrome** — Never trap landing/form/editorial/docs pages inside cramped `h-[100dvh] overflow-hidden` boxes; embrace spacious natural scrolling (`min-h-[100dvh]`) with One Thing per Section + Peek Effect, and reserve `lg:h-[100dvh]` split-pane shells strictly for live multi-pane tools.
9. **Nested cards, card walls, un-relayed hollow containers & 3-up feature card grids (`lg:grid-cols-3`)** — Never leave half-empty card boxes after cutting copy; dissolve them into airy open lists (`toss.tech` style), hairline `divide-y`/`divide-x` rows, or spacious 2-column layouts.
10. **Speculative dashboard KPI strips, permanent all-zero error boxes, red-colored `0`s & leaked developer telemetry** — Apply the `>50%` Necessity Gate (Manga-Panel Rule) and Silence When Healthy: omit idle KPI bars (`초당 처리량 0.0`, `열린 탭 0개`) and permanent `격리 0 | 오류 0` counter rows completely; show a single actionable alert only when `count > 0`.
11. **LLM verbosity bloat ("happy talk", greetings, obvious click instructions, eyebrow kickers, `01/02/03` ordinals)** — Purge ~70% of non-essential text first, then re-layout the page around the essential ~30%.
12. **Gradients, glows, pulsing halos (`animate-ping`), hype badges, pastel icon tiles, `Sparkles`, emojis, `line-through`, `transition-all`, hover lift on static cards, `Inter`/`Roboto`/`Space Grotesk` defaults**.

---

## 4. Web Interface Guidelines Checklist

- **Accessibility & Dual Theme**: Skip link (`#main-content`), `aria-label` on every icon-only button (including `Sun/Moon` theme switcher), `aria-hidden="true"` on decorative icons, `aria-live="polite"` on async errors/results, `role="dialog" aria-modal="true"` + ESC close + `overscroll-contain` + `scrollbar-gutter: stable` on modals, pause/resume toggle on auto-rotating tickers (> 5s), FOUC-free Light/Dark theme persistence.
- **Forms**: Always put `noValidate` on `<form>`; fixed `<label htmlFor>` above every `<input>` / custom `TossSelect`; custom React `TossCheckbox` / `TossSelect` / `TossSwitch` / `TossSlider` / `TossDatePicker` / `TossFileUpload` (zero raw native widgets, zero `alert/confirm/prompt`, zero `title="..."` tooltips); WAI-ARIA keyboard listbox on `TossSelect` (`ArrowUp/Down`, `Enter`, `Esc`, focus return); prefer `type="text" inputMode="numeric"` over `type="number"`; explicit `name`, `autoComplete`, `spellCheck={false}`, never block paste, real ellipsis `…`, never disable submit for validation, auto-focus first invalid field on submit, `focus:outline-none focus-visible:outline-none`.
- **Formatting & Stability**: `Intl.DateTimeFormat('ko-KR')`, `toLocaleString('ko-KR')`, `translate="no"` on brand names/codes, `whitespace-nowrap` on phone numbers/codes, `interactive-widget=resizes-content` in viewport meta, `@media (hover: hover) and (pointer: fine)` hover gating.
- **Required States**: Loading (zero-CLS skeleton), empty (with recovery CTA), gentle error, duplicate/conflict, completion, Light & Dark modes, and `360px` mobile states.
