# UX Writing, Zero-Duplication & Anti-AI-Slop Rules

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
  - Good: Render each item as a clean, understated **multi-channel metadata badge** (`rounded-[8px]`, `#ECF2FA` / `#E2EEFF` / `#E6F6EE`, `gap-1.5`–`gap-2`, `tabular-nums`, semantic icon + text for status) or aligned columns.
  - Keep `·` ONLY inside standard Korean compound nouns (`시·군·구`, `어린이·시니어`), never as a layout separator between stats.

### Icon-Only Self-Explanatory Buttons (NN/g Verified)
- Only the **12 universal icons** (`X`, `Copy`, `RotateCw`/`RefreshCw`, `Trash2`, `Search`, `Download`, `ExternalLink`, `ArrowLeft`, `ChevronLeft/Right`, `Settings`, `Pause/Play`, `MoreHorizontal`) render **icon only** with zero redundant words (`닫기`, `복사`, `새로고침`, `삭제`, `검색`).
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

## 2. Zero-Duplication Map (1 Message = 1 Exposure)

| Region | Allowed Message | Strictly Banned Duplicates |
| :--- | :--- | :--- |
| Header CTA | Action only (`지원금 확인하기`) | `30초`, `무료`, `신용점수` |
| Hero Left | 1 core benefit + 1-line explanation + quiet live proof | `30초`, `무료`, `신용점수`, `수수료 0원`, 3-col trust cards |
| Funnel Step 1 | Single situation question (`지금 어떤 일을 하고 계세요?`) | Extra reassurance footer lines |
| Funnel Step 2 (Bottom of Final CTA) | **THE ONLY HOME** for reassurance: `30초면 끝나고 무료예요. 확인해도 신용점수는 그대로예요.` | — |
| Secondary Views / Tabs | Distinct concrete value or concise answers (zero overlap) | `30초`, `무료`, `신용점수` |
| Mobile Floating CTA | Single clean button (`내 지원금 확인하기`) | Reassurance sub-banner above button |

---

## 3. Anti-AI-Slop Ban List (Synthesized from 6 Skills + Research)

Reject every item below unless explicitly requested by the user:
1. **Double focus borders** — Never stack global `:focus-visible` `outline` + `focus:ring-*` (or `focus:border-*` + `focus:ring-*`).
2. **Extreme or mismatched corner radii** — Ban `0px–4px` sharp corners on cards/list rows/inputs AND ban `rounded-full` / `>= 26px` balloons on rectangular containers; enforce `R_inner = R_outer - P` + progressive `corner-shape: squircle`.
3. **Low-contrast muted text & color-only statuses** — Ban `#8B95A1` on light canvases (`< 4.5:1`); use `#64707D` (`>= 4.5:1`) and pair color + icon/text on status badges.
4. **Disabled submit buttons for validation** — Never grey-out/disable submit CTAs waiting for form validity; keep clickable and guide to the first error on submit.
5. **Raw native browser widgets, OS popups & browser chrome leaks** — Never expose OS-default `<input type="checkbox|radio|file|range|date|time|color">`, `<select>`, `<datalist>`, `<progress>`, `<meter>`, `window.alert/confirm/prompt`, native `title="..."` tooltips, or HTML5 constraint validation bubbles (`<form>` without `noValidate`). Replace with shadowless Toss-style React components (`TossCheckbox`, `TossSelect`, `TossSwitch`, `TossSlider`, `TossDatePicker`, `TossFileUpload`, `TossDialog`, `TossToast`, `TossTooltip`) and apply the global CSS Browser Chrome Shield (`:-webkit-autofill`, `-webkit-tap-highlight-color`, `::-ms-reveal`, scrollbars, `resize: none`).
6. **Middle-dot (`·`) & em-dash (`—`) text walls** — Replace middot-glued metrics with clean tonal badges; remove decorative em-dashes.
7. **Redundant text on self-evident icon buttons** — Never put `닫기`/`복사`/`새로고침` beside universal icons.
8. **Endless vertical scroll sprawl & cluttered side-tabs** — Prefer `100dvh` viewport-first layouts, quiet chrome, and max 1 navigation axis.
9. **Nested cards, card walls & 3-up card grids (`lg:grid-cols-3`)** — Use hairline `divide-y`/`divide-x` lists or spacious 2-column layouts.
10. **Gradients, glows, pulsing halos (`animate-ping`), kickers, `01/02/03` ordinals, hype badges, pastel icon tiles, `Sparkles`, emojis, `line-through`, `transition-all`, hover lift on static cards, `Inter`/`Roboto`/`Space Grotesk` defaults**.

---

## 4. Web Interface Guidelines Checklist

- **Accessibility**: Skip link (`#main-content`), `aria-label` on every icon-only button, `aria-hidden="true"` on decorative icons, `aria-live="polite"` on async errors/results, `role="dialog" aria-modal="true"` + ESC close + `overscroll-contain` + `scrollbar-gutter: stable` on modals, pause/resume toggle on auto-rotating tickers (> 5s).
- **Forms**: Always put `noValidate` on `<form>`; fixed `<label htmlFor>` above every `<input>` / custom `TossSelect`; custom React `TossCheckbox` / `TossSelect` / `TossSwitch` / `TossSlider` / `TossDatePicker` / `TossFileUpload` (zero raw native widgets, zero `alert/confirm/prompt`, zero `title="..."` tooltips); WAI-ARIA keyboard listbox on `TossSelect` (`ArrowUp/Down`, `Enter`, `Esc`, focus return); prefer `type="text" inputMode="numeric"` over `type="number"`; explicit `name`, `autoComplete`, `spellCheck={false}`, never block paste, real ellipsis `…`, never disable submit for validation, auto-focus first invalid field on submit, `focus:outline-none focus-visible:outline-none`.
- **Formatting & Stability**: `Intl.DateTimeFormat('ko-KR')`, `toLocaleString('ko-KR')`, `translate="no"` on brand names/codes, `whitespace-nowrap` on phone numbers/codes, `interactive-widget=resizes-content` in viewport meta, `@media (hover: hover) and (pointer: fine)` hover gating.
- **Required States**: Loading (zero-CLS skeleton), empty (with recovery CTA), gentle error, duplicate/conflict, completion, and `360px` mobile states.
