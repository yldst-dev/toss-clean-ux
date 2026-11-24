#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const args = process.argv.slice(2);
const runBuild = args.includes('--build');
const rootArg = args.find((a) => !a.startsWith('--')) || process.cwd();
const rootDir = path.resolve(rootArg);

const IGNORE_DIRS = new Set(['node_modules', 'dist', 'build', '.git', '.next', 'coverage']);
const CODE_EXTS = new Set(['.ts', '.tsx', '.css', '.html']);

function walk(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, results);
    } else if (CODE_EXTS.has(path.extname(entry.name))) {
      results.push(full);
    }
  }
  return results;
}

function rel(file) {
  return path.relative(rootDir, file);
}

function stripComments(line) {
  return line.replace(/\/\/.*$/, '').replace(/\/\*.*?\*\//g, '');
}

function findJsxTags(source, tagName) {
  const results = [];
  const token = `<${tagName}`;
  let i = 0;
  let lineNo = 1;
  while (i < source.length) {
    const ch = source[i];
    if (ch === '\n') {
      lineNo += 1;
      i += 1;
      continue;
    }
    if (ch === '/' && source[i + 1] === '/' && (i === 0 || /\s/.test(source[i - 1]))) {
      while (i < source.length && source[i] !== '\n') i += 1;
      continue;
    }
    if (ch === '/' && source[i + 1] === '*') {
      i += 2;
      while (i < source.length && !(source[i] === '*' && source[i + 1] === '/')) {
        if (source[i] === '\n') lineNo += 1;
        i += 1;
      }
      i += 2;
      continue;
    }
    if (source.startsWith(token, i)) {
      const next = source[i + token.length];
      if (next === '>' || next === '/' || /\s/.test(next)) {
        const start = i;
        const startLine = lineNo;
        let braceDepth = 0;
        let quote = null;
        i += token.length;
        while (i < source.length) {
          const c = source[i];
          if (c === '\n') lineNo += 1;
          if (quote) {
            if (c === '\\') {
              i += 2;
              continue;
            }
            if (c === quote) quote = null;
          } else if (c === '"' || c === "'" || c === '`') {
            quote = c;
          } else if (c === '{') {
            braceDepth += 1;
          } else if (c === '}') {
            braceDepth = Math.max(0, braceDepth - 1);
          } else if (c === '>' && braceDepth === 0) {
            i += 1;
            break;
          }
          i += 1;
        }
        results.push({ raw: source.slice(start, i), lineNo: startLine });
        continue;
      }
    }
    i += 1;
  }
  return results;
}

const files = [
  ...walk(path.join(rootDir, 'src')),
  ...(fs.existsSync(path.join(rootDir, 'index.html')) ? [path.join(rootDir, 'index.html')] : []),
];

const findings = [];
const warnings = [];

function fail(gate, file, lineNo, detail) {
  findings.push({ gate, file: rel(file), lineNo, detail });
}

function warn(gate, file, lineNo, detail) {
  warnings.push({ gate, file: rel(file), lineNo, detail });
}

const REASSURANCE_KEYWORDS = ['30초', '무료', '신용점수'];
const reassuranceHits = Object.fromEntries(REASSURANCE_KEYWORDS.map((k) => [k, []]));

const JARGON_REGEX =
  /(진단|산출|프로세스|솔루션|컨설팅|데이터|제출|이차보전|경정청구|운전자금|대환|매칭|리포트|가조회|적합도|보증서|세액공제|소급|재무제표|공동인증서|AES-256|TLS\s*1|NICE|KCB|B2B|SaaS|CFO)/;

const LLM_FILLER_REGEX =
  /(환영합니다|올인원\s*(플랫폼|솔루션|서비스)|혁신적인\s*(플랫폼|서비스|경험)|차세대\s*(플랫폼|솔루션)|원스톱\s*(서비스|솔루션)|지금\s*바로\s*경험해|아래\s*(버튼|입력창)을?\s*(클릭|눌러|입력)|Welcome to\b|All-in-one platform|Next-generation\b|Revolutionize\b|Seamlessly\b)/i;

const KICKER_SPAM_REGEX = /\buppercase\b[^"'`]*\btracking-(?:widest|\[0\.[123]\d*em\])/;

const INTERNAL_TELEMETRY_REGEX =
  /(초당\s*처리량|열린\s*(?:브라우저\s*)?탭|전송\s*대기\s*알림|큐\s*대기|워커\s*상태|req\/s\b|건\/초)/i;

const ERROR_COUNTER_TERMS_REGEX = /(격리|수집\s*오류|개편\s*오류|처리\s*오류|실패\s*건수|대기\s*중인\s*작업|누적\s*품질)/;

const SHADOW_REGEX = /(box-shadow|drop-shadow|text-shadow|\bshadow-|\bshadow\b)/i;
const SAFE_INSET_BOX_SHADOW_REGEX =
  /box-shadow\s*:\s*(?:inset\s+0(?:px)?\s+0(?:px)?\s+0(?:px)?\s+(?:[12]px|1000px)\s+[^;]+|0(?:px)?\s+0(?:px)?\s+0(?:px)?\s+(?:[12]px|1000px)\s+[^;]+\binset\b)/i;
const PURE_WHITE_BLACK_REGEX =
  /(#ffffff\b|#fff\b|#000000\b|#000\b|\bbg-white\b|\bbg-black\b|\btext-black\b)/i;
const TINY_FONT_REGEX = /text-\[(10|11|12)(\.[0-9]+)?px\]/;
const OVER_ROUNDED_REGEX = /\brounded-(3xl|\[(?:2[6-9]|[3-9]\d)px\])\b/;
const TOO_SHARP_CARD_REGEX = /\brounded-(none|sm|\[[0-4]px\])\b/;
const MIDDOT_CONCAT_REGEX = /\s·\s|['"`]\s*·\s*['"`]/;
const INTUITIVE_ICON_REDUNDANT_LABEL_REGEX =
  /<(X|Copy|RotateCw|RefreshCw|Trash2|Search|Download|ExternalLink|Settings|Pause|Play|Sun|Moon)\b[^>]*\/>[\s\S]{0,90}?(닫기|복사|새로고침|삭제|검색|다운로드|설정|일시정지|재생)/g;
const DISABLED_SUBMIT_ANTI_PATTERN_REGEX =
  /<(?:button|TossButton)\b[^>]*type=["']submit["'][^>]*disabled=\{[^}]*(?:!isValid|!canSubmit|!isFormValid|!consent|!checked|!agreed)/g;

let glassBlurCount = 0;
let cssFileCount = 0;
let hasDarkThemeTokens = false;

for (const file of files) {
  const r = rel(file);
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split(/\r?\n/);
  const ext = path.extname(file);
  const isPresentation = r.startsWith(`src${path.sep}presentation${path.sep}`);
  const isDomain = r.startsWith(`src${path.sep}domain${path.sep}`);
  const isApplication = r.startsWith(`src${path.sep}application${path.sep}`);
  const isInfrastructure = r.startsWith(`src${path.sep}infrastructure${path.sep}`);
  const isUserCopyFile =
    isPresentation ||
    r.includes(`infrastructure${path.sep}mocks`) ||
    isApplication ||
    r.includes(`domain${path.sep}entities`) ||
    r === 'index.html';

  if (r === 'index.html') {
    if (/name=["']viewport["']/.test(content) && !/interactive-widget=resizes-content/.test(content)) {
      warn(
        'mobile-keyboard-viewport',
        file,
        1,
        'Add `interactive-widget=resizes-content` to <meta name="viewport"> so mobile virtual keyboards do not obscure bottom CTAs.',
      );
    }
  }

  if (ext === '.css') {
    cssFileCount += 1;
    if (/(\[data-theme=["']dark["']\]|prefers-color-scheme\s*:\s*dark|^\s*\.dark\b)/m.test(content)) {
      hasDarkThemeTokens = true;
    }
    const bareFocusVisibleMatch = content.match(/(^|[\s{;]):focus-visible\s*\{[^}]*outline\s*:/m);
    if (bareFocusVisibleMatch) {
      const idx = content.slice(0, bareFocusVisibleMatch.index).split(/\r?\n/).length;
      fail(
        'single-focus-border',
        file,
        idx,
        'Bare `:focus-visible { outline: ... }` collides with focus:ring-* on inputs and creates double borders. Scope to `:where(a, button, [role="button"], [tabindex]):focus-visible` and clear outline on inputs.',
      );
    }
  }

  if (isPresentation && ext === '.tsx') {
    const tablistBlocks = content.match(/role="tablist"[\s\S]{0,900}/g) || [];
    for (const block of tablistBlocks) {
      const outerFull = /rounded-full/.test(block.split('<')[0] || block.slice(0, 180));
      const innerSquare = /rounded-\[(4|6|8|10|12)px\]|rounded-(md|lg|xl)\b/.test(block);
      if (outerFull && innerSquare) {
        const lineNo = content.slice(0, content.indexOf(block)).split(/\r?\n/).length;
        fail(
          'concentric-radius',
          file,
          lineNo,
          'Mismatched segmented tab radii: `rounded-full` outer track wrapping square/small-radius inner tab. Use `rounded-[16px] p-1` + `rounded-[12px]`.',
        );
      }
      const outer16 = /rounded-\[16px\]/.test(block.slice(0, 220));
      const inner8 = /rounded-\[8px\]/.test(block);
      if (outer16 && inner8) {
        const lineNo = content.slice(0, content.indexOf(block)).split(/\r?\n/).length;
        fail(
          'concentric-radius',
          file,
          lineNo,
          'Mismatched segmented tab radii: `rounded-[16px]` outer track with `rounded-[8px]` inner tab. Use `rounded-[16px] p-1` + `rounded-[12px]`.',
        );
      }
    }

    for (const match of content.matchAll(INTUITIVE_ICON_REDUNDANT_LABEL_REGEX)) {
      const lineNo = content.slice(0, match.index).split(/\r?\n/).length;
      warn(
        'icon-only-button',
        file,
        lineNo,
        `Intuitive icon <${match[1]} /> paired with redundant label "${match[2]}". Prefer icon-only button with aria-label.`,
      );
    }

    for (const match of content.matchAll(DISABLED_SUBMIT_ANTI_PATTERN_REGEX)) {
      const lineNo = content.slice(0, match.index).split(/\r?\n/).length;
      warn(
        'form-validation-ux',
        file,
        lineNo,
        'Avoid disabling submit buttons for client validation (NN/g anti-pattern). Keep submit enabled and focus the first invalid field with gentle guidance.',
      );
    }

    for (const tag of findJsxTags(content, 'input')) {
      const srOnlyRequired = tag.raw.match(/type\s*=\s*(?:\{\s*)?["'](checkbox|radio|file)["']/);
      if (srOnlyRequired && !/\bsr-only\b/.test(tag.raw)) {
        fail(
          'custom-form-controls',
          file,
          tag.lineNo,
          `Native browser <input type="${srOnlyRequired[1]}"> detected without sr-only custom wrapper. Build a clean React TossCheckbox/TossRadio/TossFileUpload instead of exposing OS-native controls.`,
        );
      }
      const bannedNativeType = tag.raw.match(
        /type\s*=\s*(?:\{\s*)?["'](range|date|time|datetime-local|month|week|color)["']/,
      );
      if (bannedNativeType) {
        fail(
          'custom-form-controls',
          file,
          tag.lineNo,
          `Native browser <input type="${bannedNativeType[1]}"> leaks inconsistent OS UI. Use a Toss-style custom React control (TossSlider, TossDatePicker, or TossColorPicker).`,
        );
      }
      if (/type\s*=\s*(?:\{\s*)?["']number["']/.test(tag.raw)) {
        warn(
          'custom-form-controls',
          file,
          tag.lineNo,
          'Prefer <input type="text" inputMode="numeric"> over type="number" to avoid ugly OS spin buttons and accidental mouse-wheel value mutations.',
        );
      }
    }

    for (const tag of findJsxTags(content, 'select')) {
      fail(
        'custom-form-controls',
        file,
        tag.lineNo,
        'Native browser <select> detected. Use a Toss-style custom React dropdown (TossSelect: combobox trigger + shadowless rounded-[18px] p-1.5 listbox + rounded-[12px] options with right-aligned Check icon, or mobile Select BottomSheet).',
      );
    }

    for (const tag of findJsxTags(content, 'datalist')) {
      fail(
        'custom-form-controls',
        file,
        tag.lineNo,
        'Native browser <datalist> popup detected. Use a Toss-style custom React combobox (TossCombobox) matching TossSelect.',
      );
    }

    for (const nativeMeterTag of ['progress', 'meter']) {
      for (const tag of findJsxTags(content, nativeMeterTag)) {
        fail(
          'custom-form-controls',
          file,
          tag.lineNo,
          `Native browser <${nativeMeterTag}> leaks OS chrome. Render a custom role="progressbar" bar (h-2 rounded-full bg-[var(--surface-recessed)] + var(--color-primary) fill).`,
        );
      }
    }

    for (const tag of findJsxTags(content, 'form')) {
      if (!/\bnoValidate\b/.test(tag.raw)) {
        warn(
          'native-browser-popup',
          file,
          tag.lineNo,
          'Add `noValidate` to <form> to suppress ugly OS constraint validation bubbles and show calm inline guidance.',
        );
      }
    }

    for (const interactiveTag of ['button', 'a', 'input', 'span']) {
      for (const tag of findJsxTags(content, interactiveTag)) {
        if (/\btitle\s*=\s*(?:\{|["'])/.test(tag.raw)) {
          warn(
            'native-browser-popup',
            file,
            tag.lineNo,
            `Native HTML title attribute on <${interactiveTag}> triggers delayed OS tooltip. Use aria-label + custom React TossTooltip instead.`,
          );
        }
      }
    }
  }

  lines.forEach((rawLine, idx) => {
    const lineNo = idx + 1;
    const code = stripComments(rawLine);
    if (!code.trim()) return;

    if (SHADOW_REGEX.test(code)) {
      const isSafeInsetCss = ext === '.css' && SAFE_INSET_BOX_SHADOW_REGEX.test(code);
      if (!isSafeInsetCss) {
        fail('shadowless', file, lineNo, `Drop/blur shadow token/class detected: ${code.trim()}`);
      }
    }

    if (PURE_WHITE_BLACK_REGEX.test(code)) {
      fail('blue-white-palette', file, lineNo, `Pure white/black detected: ${code.trim()}`);
    }

    if ((isPresentation || isApplication) && /(?:window\.|(?<![.\w]))(alert|confirm|prompt)\s*\(/.test(code)) {
      fail(
        'native-browser-popup',
        file,
        lineNo,
        `Native browser popup (${code.trim()}) breaks Toss UX. Use shadowless React TossDialog or TossToast instead.`,
      );
    }

    if (isPresentation) {
      if (/focus:border-/.test(code) && /focus:ring-/.test(code)) {
        fail(
          'single-focus-border',
          file,
          lineNo,
          `Double focus border risk (focus:border-* + focus:ring-* stacked): ${code.trim()}`,
        );
      }
      if (/focus:ring-/.test(code) && /outline-none/.test(code) && !/focus-visible:outline-none/.test(code)) {
        warn(
          'single-focus-border',
          file,
          lineNo,
          'Prefer explicit `focus:outline-none focus-visible:outline-none` alongside `focus:ring-*` to guarantee zero double focus borders.',
        );
      }
      if (/text-\[#8B95A1\]/i.test(code)) {
        warn(
          'wcag-aa-contrast',
          file,
          lineNo,
          '`text-[#8B95A1]` falls below WCAG AA 4.5:1 on light canvases (~2.8:1). Use `text-[var(--text-muted)]` (`#64707D` light / `#9E9EA4` dark).',
        );
      }
      if (/dark:text-\[#3182F6\]/i.test(code) || /text-\[#(?:62626D|4D4D59)\]/i.test(code)) {
        warn(
          'wcag-aa-contrast',
          file,
          lineNo,
          'Low-contrast dark-mode text detected. Use `text-[var(--color-primary-text)]` (`#61B0FF`) for dark blue text and `text-[var(--text-muted)]` (`#9E9EA4`) for dark muted text.',
        );
      }
      if (OVER_ROUNDED_REGEX.test(code)) {
        fail(
          'balanced-radius',
          file,
          lineNo,
          `Over-rounded balloon corner detected (keep cards <= 20px, controls 12px–14px): ${code.trim()}`,
        );
      }
      if (TOO_SHARP_CARD_REGEX.test(code) && /(border|toss-surface|input|button|bg-\[)/.test(code)) {
        fail(
          'balanced-radius',
          file,
          lineNo,
          `Harshly boxy corner (0px–4px) on surface/control (use 7px checkbox, 8px badges, 12px–14px controls, 18px–20px cards): ${code.trim()}`,
        );
      }
      if (/rounded-full/.test(code) && /(input|tablist|px-[3-6]|w-full)/.test(code)) {
        fail(
          'balanced-radius',
          file,
          lineNo,
          `Avoid rounded-full on rectangular inputs/tabs/buttons; reserve rounded-full for true 1:1 circles: ${code.trim()}`,
        );
      }
      if (/(?:^|[\s"'`])(min-)?h-screen\b/.test(code)) {
        fail(
          'viewport-scroll-ergonomics',
          file,
          lineNo,
          'Avoid `h-screen` / `min-h-screen` (100vh clips behind mobile browser bars). Use `min-h-[100dvh]` for breathable natural scroll (or `lg:h-[100dvh]` only for multi-pane live tools).',
        );
      }
      if (/(?:^|[\s"'`])h-\[100dvh\]/.test(code) && /\boverflow-hidden\b/.test(code)) {
        warn(
          'viewport-scroll-ergonomics',
          file,
          lineNo,
          'Unconditional `h-[100dvh] overflow-hidden` traps mobile/content pages in a cramped scroll lock. Prefer breathable `min-h-[100dvh]` natural scroll, or scope split-pane shells strictly to `lg:h-[100dvh]`.',
        );
      }
    }

    if (isDomain) {
      if (/from\s+['"](react|motion|lucide-react|framer-motion)/.test(code)) {
        fail('clean-arch', file, lineNo, `Forbidden UI import in domain: ${code.trim()}`);
      }
      if (/from\s+['"].*(application|infrastructure|presentation)/.test(code)) {
        fail('clean-arch', file, lineNo, `Forbidden outer-layer import in domain: ${code.trim()}`);
      }
    }
    if (isApplication) {
      if (/from\s+['"](react|motion|lucide-react|framer-motion)/.test(code)) {
        fail('clean-arch', file, lineNo, `Forbidden UI import in application: ${code.trim()}`);
      }
      if (/from\s+['"].*(infrastructure|presentation)/.test(code)) {
        fail('clean-arch', file, lineNo, `Forbidden outer-layer import in application: ${code.trim()}`);
      }
    }
    if (isInfrastructure) {
      if (/from\s+['"](react|motion|lucide-react|framer-motion)/.test(code)) {
        fail('clean-arch', file, lineNo, `Forbidden UI import in infrastructure: ${code.trim()}`);
      }
      if (/from\s+['"].*(application|presentation)/.test(code)) {
        fail('clean-arch', file, lineNo, `Forbidden cross-layer import in infrastructure: ${code.trim()}`);
      }
    }

    if (isPresentation) {
      if (TINY_FONT_REGEX.test(code)) {
        fail('senior-font-size', file, lineNo, `Font <= 12px found (keep consumer UI >= 14px): ${code.trim()}`);
      }
      if (/text-\[13(\.[0-9]+)?px\]/.test(code) && !/tabular-nums/.test(code)) {
        warn(
          'senior-font-size',
          file,
          lineNo,
          `13px text found without tabular-nums: keep consumer/senior UI >= 14px (13px tabular-nums permitted only in dense data table cells): ${code.trim()}`,
        );
      }
      if (/framer-motion/.test(code)) {
        fail('motion-import', file, lineNo, `Use 'motion/react' instead of 'framer-motion'`);
      }
      if (/animate-ping/.test(code)) {
        fail('anti-slop', file, lineNo, `Glowing/pulsing status dot (animate-ping) forbidden`);
      }
      if (/transition-all/.test(code)) {
        fail('anti-slop', file, lineNo, `transition-all forbidden; specify exact CSS properties`);
      }
      if (/lg:grid-cols-3/.test(code)) {
        fail('anti-slop', file, lineNo, `3-up equal card grid (lg:grid-cols-3) forbidden`);
      }
      if (/(?:^|[\s"'`])(?:sm:|md:|lg:|xl:)?grid-cols-4\b/.test(code) && !/(calendar|swatch|gallery|photo|day)/i.test(r)) {
        warn(
          'earn-your-pixels-50-gate',
          file,
          lineNo,
          '4-column KPI/stat strip detected. Apply the >50% Necessity Gate (Manga-Panel Rule): omit speculative stat strips until >50% of users genuinely need every metric.',
        );
      }
      if (
        /(?:^|[\s"'`])(?:sm:|md:)?grid-cols-3\b/.test(code) &&
        !/role=["']tablist["']/.test(code) &&
        ERROR_COUNTER_TERMS_REGEX.test(content)
      ) {
        warn(
          'earn-your-pixels-50-gate',
          file,
          lineNo,
          '3-column error/status counter strip detected. Follow Silence When Healthy: hide zero-count error/quarantine boxes when healthy and surface one alert only when count > 0.',
        );
      }
      if (/border-l-4/.test(code)) {
        fail('anti-slop', file, lineNo, `Left border accent stripe (border-l-4) forbidden`);
      }
      if (/line-through/.test(code)) {
        fail('anti-slop', file, lineNo, `Decorative strike-through forbidden`);
      }
      if (/\bSparkles\b/.test(code)) {
        fail('anti-slop', file, lineNo, `Default Sparkles icon forbidden; use semantic icon`);
      }
      if (KICKER_SPAM_REGEX.test(code)) {
        warn(
          'copy-bloat-70-cut',
          file,
          lineNo,
          'Uppercase wide-tracked eyebrow kicker detected. Purge decorative kickers (70% Copy Purge) and let the headline stand cleanly.',
        );
      }
      if (/—/.test(code)) {
        fail(
          'punctuation-hygiene',
          file,
          lineNo,
          `Em-dash (—) overuse in UI copy; split cleanly or use natural phrasing: ${code.trim()}`,
        );
      }
      if (MIDDOT_CONCAT_REGEX.test(code)) {
        warn(
          'punctuation-hygiene',
          file,
          lineNo,
          `Middle-dot (·) concatenation detected; prefer clean tonal badges (rounded-[8px]) for multiple metrics/metadata: ${code.trim()}`,
        );
      }
      if (/backdrop-blur/.test(code)) {
        glassBlurCount += 1;
        if (glassBlurCount > 1) {
          fail('anti-slop', file, lineNo, `Multiple backdrop-blur surfaces (${glassBlurCount}); max 1 header blur`);
        }
      }
    }

    if (isUserCopyFile) {
      const isLegalOrTermsFile = /(terms|privacy|policy|legal|consentdetail)/i.test(r);
      const jargonMatch = code.match(JARGON_REGEX);
      if (jargonMatch) {
        fail('plain-korean', file, lineNo, `Hard jargon "${jargonMatch[0]}": ${code.trim()}`);
      }
      const fillerMatch = code.match(LLM_FILLER_REGEX);
      if (fillerMatch) {
        warn(
          'copy-bloat-70-cut',
          file,
          lineNo,
          `LLM filler / happy-talk phrase "${fillerMatch[0]}" detected. Apply the 70% Copy Purge rule and re-layout around concrete essential copy.`,
        );
      }
      const telemetryMatch = code.match(INTERNAL_TELEMETRY_REGEX);
      if (telemetryMatch) {
        warn(
          'earn-your-pixels-50-gate',
          file,
          lineNo,
          `Internal plumbing telemetry "${telemetryMatch[0]}" detected in user UI. Omit developer stats unless >50% of users explicitly need them.`,
        );
      }
      if (!isLegalOrTermsFile && /[가-힣]/.test(code) && !/(className=|import\s+|from\s+['"]|aria-label=|placeholder=)/.test(code)) {
        const plainText = code
          .replace(/<[^>]+>/g, ' ')
          .replace(/\{[^}]*\}/g, ' ')
          .replace(/^\s*(?:const|let|var|return|\w+\s*:)\s*/, '')
          .replace(/['"`,;]/g, '')
          .replace(/\s+/g, ' ')
          .trim();
        if (plainText.length >= 90 && (plainText.match(/[가-힣]/g) || []).length >= 30) {
          warn(
            'copy-bloat-70-cut',
            file,
            lineNo,
            `Verbose UI copy block (${plainText.length} chars) detected. Cut ~70% redundant/low-priority text (keep <= 1 concise line) and re-layout the section.`,
          );
        }
      }
      for (const kw of REASSURANCE_KEYWORDS) {
        if (code.includes(kw)) {
          reassuranceHits[kw].push(`${r}:${lineNo}`);
        }
      }
    }
  });
}

if (cssFileCount > 0 && !hasDarkThemeTokens) {
  warn(
    'dark-mode-ready',
    rootDir,
    0,
    'No dark theme tokens detected in CSS (`[data-theme="dark"]`, `.dark`, or `prefers-color-scheme: dark`). Define paired Toss Cool-Dark semantic tokens (`#101013` / `#17171C` / `#202027` / `#2C2C35`).',
  );
}

for (const [kw, locations] of Object.entries(reassuranceHits)) {
  if (locations.length > 1) {
    fail(
      'zero-duplication',
      path.join(rootDir, locations[0].split(':')[0]),
      Number(locations[0].split(':')[1]) || 1,
      `Keyword "${kw}" repeated ${locations.length} times (max 1): ${locations.join(', ')}`,
    );
  }
}

let buildPassed = null;
if (runBuild) {
  try {
    execSync('npm run build', { cwd: rootDir, stdio: 'pipe' });
    buildPassed = true;
  } catch (err) {
    buildPassed = false;
    const stderr = err.stderr?.toString() || err.stdout?.toString() || String(err);
    fail('clean-build', path.join(rootDir, 'package.json'), 1, `npm run build failed:\n${stderr.slice(0, 800)}`);
  }
}

console.log(`\ntoss-clean-ux audit — scanned ${files.length} files under ${rootDir}\n`);

if (findings.length === 0) {
  console.log('✓ PASS — 0 violations across all gates:');
  console.log('  • Dual-theme shadowless OKLCH system (Light Blue-White + Toss Cool-Dark, 0 drop shadows, 0 pure white/black)');
  console.log('  • Single focus ring (0 double-border CSS/input collisions)');
  console.log('  • Balanced concentric squircle radii (7px checkbox, 8px badges, 12px–14px controls, 18px–20px cards/menus)');
  console.log('  • Zero native browser UI leaks (0 raw checkbox/radio/file/range/date/select/progress/alert popups)');
  console.log('  • Clean multi-channel badges & punctuation hygiene (0 em-dash/middot metric walls)');
  console.log('  • Breathable viewport scroll ergonomics (0 h-screen traps, natural scroll first)');
  console.log('  • Anti-AI-slop rules (0 forbidden patterns, glass surfaces: ' + glassBlurCount + '/1)');
  console.log('  • >50% necessity gate (Manga-Panel Rule) & 70% copy-purge hygiene');
  console.log('  • Plain-Korean readability & >= 14px consumer typography');
  console.log('  • Strict 4-layer Clean Architecture dependency boundaries');
  if (runBuild && buildPassed) {
    console.log('  • Clean production build (npm run build passed)');
  }
} else {
  const byGate = new Map();
  for (const f of findings) {
    if (!byGate.has(f.gate)) byGate.set(f.gate, []);
    byGate.get(f.gate).push(f);
  }
  for (const [gate, items] of byGate.entries()) {
    console.log(`[FAIL] ${gate} (${items.length})`);
    for (const item of items) {
      console.log(`  ${item.file}:${item.lineNo}  ${item.detail}`);
    }
    console.log('');
  }
}

if (warnings.length > 0) {
  console.log(`\nWarnings (${warnings.length}):`);
  for (const w of warnings) {
    const loc = w.lineNo > 0 ? `${w.file}:${w.lineNo}  ` : '';
    console.log(`  [warn] ${w.gate}  ${loc}${w.detail}`);
  }
}

process.exit(findings.length === 0 ? 0 : 1);
