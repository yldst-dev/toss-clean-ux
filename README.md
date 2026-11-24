# toss-clean-ux

한국어 웹 앱을 토스처럼 깔끔하고 읽기 쉽게 만드는 프론트엔드 디자인·UX·아키텍처 통합 에이전트 스킬입니다.

실제 토스 서비스(`toss.im`, `tossinvest.com` 라이트·다크 WTS, `tossbank.com`, `toss.tech`, `tosspayments.com`, `docs.tosspayments.com`, `tossplace.com`)의 실측 토큰과 레이아웃을 전수 분석해, **라이트 블루화이트 + 토스 쿨다크 듀얼 테마(OKLCH)**, **여유로운 자연 스크롤과 Peek Effect**, **브라우저 기본 UI 누수 전면 차단**, **쉬운 한국어 UX 라이팅**, **4계층 클린 아키텍처**, 그리고 외부 의존성 없는 **자동 정적 검사 스크립트(`scripts/audit.mjs`)** 까지 하나로 통합했습니다.

---

## 어떤 문제를 해결하나요?

웹 프론트엔드를 빠르게 만들다 보면 아래와 같은 완성도 저하가 반복해서 나타납니다.

- **다크모드 미대응 및 저대비 오류**: 라이트 전용 하드코딩 색상을 그대로 두거나, 순흑(`#000000`) 배경과 눈부신 순백(`#FFFFFF`) 글씨로 다크모드를 대충 반전시켜 눈의 피로를 유발하는 문제
- **억지 스크롤 제한으로 인한 답답함**: 모든 화면을 `100dvh overflow-hidden` 안에 억지로 욱여넣어 여백과 위계가 무너지고, 사용자가 화면이 끝난 것으로 오해하는 문제(NN/g Illusion of Completeness)
- **브라우저 기본 UI 누수**: 순백 배경과 회색 테두리의 기본 체크박스, 운영체제마다 제각각인 `<select>`·날짜·슬라이더·파일 선택 버튼, 노란 자동완성 배경, 투박한 `window.alert` 팝업
- **입력창·모서리 디테일 붕괴**: 포커스 시 파란 테두리가 두 줄로 겹치는 더블 보더, 바깥 트랙과 안쪽 탭의 곡률이 어긋나는 모서리, 지나치게 각지거나 풍선처럼 둥근 박스
- **LLM 특유의 과잉 텍스트와 빈 껍데기 카드**: AI가 웹 화면을 만들 때 관성적으로 넣는 인사말(`환영합니다`, `혁신적인 올인원`), 모든 제목 위 영문 키커, 제목을 다시 풀어쓴 부제목, 3줄짜리 카드 설명문, 중복 안심 문구 때문에 진짜 핵심이 묻히는 문제
- **인지 부하와 계층 오염**: `·`와 `—`로 지표를 한 줄에 뭉쳐 적은 텍스트 벽, 어려운 금융·IT 한자어, `domain`/`application` 계층에 섞인 UI 의존성

---

## 라이트·다크 듀얼 테마 토큰 (실제 토스 TDS/WTS 실측 기반)

컴포넌트에는 고정 Hex 대신 시맨틱 CSS 변수(`var(--surface-elevated)`, `var(--text-primary)` 등)를 사용해 라이트·다크 전환이 깜빡임(FOUC) 없이 자동으로 동작하게 구성합니다.

| 시맨틱 토큰 | 라이트 블루화이트 | 토스 쿨다크 (`[data-theme="dark"]`) | 역할 및 대비 기준 |
| --- | --- | --- | --- |
| `--surface-recessed` | `#E8EFFA` | `#101013` | Level 0: 보조 배경, 세그먼트 트랙 (`greyBackground`) |
| `--surface-canvas` | `#F1F5FB` | `#17171C` | Level 1: 기본 페이지 캔버스 |
| `--surface-elevated` | `#F9FBFF` | `#202027` | Level 2: 카드, 패널, 드롭다운, 모달 (`layeredBackground`) |
| `--surface-field` | `#ECF2FA` | `#2C2C35` | Level 3: 보더리스 입력창, 플로팅 요소, 중립 배지 (`floatBackground`) |
| `--surface-tint-hover` | `rgba(2, 32, 71, 0.08)` | `rgba(217, 217, 255, 0.11)` | 어떤 배경 위에서도 자연스러운 토스식 반투명 호버·칩 오버레이 |
| `--border-hairline` | `rgba(0, 27, 55, 0.10)` | `rgba(222, 222, 255, 0.14)` | `1px` 구분선 및 0-blur 인셋 헤어라인 |
| `--color-primary` | `#3182F6` | `#3485FA` | 핵심 액션 버튼, 활성 체크박스·스위치 |
| `--color-primary-text` | `#1B64DA` | `#61B0FF` | 파란 링크·안내 문구 (양쪽 테마 모두 WCAG AA `>= 5.1:1`) |
| `--color-primary-soft` | `#E2EEFF` | `#202C4D` | 토스식 소프트 보조 버튼 및 선택 항목 배경 |
| `--text-primary` | `#191F28` | `#F2F4F8` | 기본 본문 잉크 (순흑·순백 눈부심 배제) |
| `--text-secondary` | `#4E5968` | `#C3C3C6` | 보조 본문 잉크 |
| `--text-muted` | `#64707D` (`>= 4.6:1`) | `#9E9EA4` (`>= 5.3:1`) | WCAG AA 기준을 통과하는 보조·캡션 잉크 |

---

## 핵심 설계 기준

| 영역 | 주요 규칙 |
| --- | --- |
| **쉐도우리스 듀얼 테마** | 드롭·블러 그림자(`shadow-*`, `drop-shadow`, `text-shadow`)와 순백(`#FFFFFF`)·순흑(`#000000`)을 쓰지 않고 4단계 OKLCH 명도 대비와 `1px` 반투명 헤어라인(0-blur `inset` 링 허용)으로 위계를 나눕니다. |
| **여유로운 자연 스크롤 & Peek Effect** | 랜딩·폼·블로그·문서·일반 대시보드는 답답한 스크롤 제한(`overflow-hidden`)을 금지하고, 자연스러운 세로 스크롤(`min-h-[100dvh]`)과 넉넉한 섹션 여백(`py-14`~`py-24`), 섹션당 1메시지(One Thing), 다음 영역이 살짝 보이는 Peek Effect를 적용합니다. 실시간 다중 패널 도구(토스증권 WTS형 트레이딩·에디터)에 한해서만 데스크탑 분할 뷰(`lg:h-[100dvh]`)를 선택 적용합니다. |
| **단일 포커스 링 (더블 테두리 금지)** | 전역 `:focus-visible`은 버튼·링크에만 한정하고 입력창은 `outline: none` + `focus:ring-2 focus:ring-inset focus:ring-[var(--color-focus-ring)]` 단일 링만 표시합니다. |
| **균형 잡힌 동심원 스쿼클 반경** | `R_inner = R_outer - P` 공식을 유지합니다(`7px` 체크박스, `8px` 배지·아이콘 버튼, `12px~14px` 입력·버튼·리스트, `16px/12px` 세그먼트 탭, `18px/12px` 드롭다운, `18px~20px` 카드·모달). 지원 브라우저에서는 `corner-shape: squircle`을 점진 적용합니다. |
| **브라우저 기본 UI 누수 전면 차단** | 기본 `checkbox`, `radio`, `file`, `range`, `date/time`, `color`, `select`, `datalist`, `progress`, `meter`, `alert/confirm/prompt`, 기본 `title` 툴팁, HTML5 검증 말풍선을 금지합니다. 커스텀 React 컨트롤 15종과 자동완성·터치 하이라이트·스크롤바·Edge 비밀번호 눈 아이콘 차단 CSS 실드를 제공합니다. |
| **직관적 아이콘 버튼 & 멀티채널 배지** | 닫기·복사·새로고침·검색·테마 전환(`Sun/Moon`) 등 보편 아이콘은 중복 글자 없이 아이콘 전용(`aria-label` 필수, `40px+`/`44px+`)으로 둡니다. 지표 나열에 `·`와 `—`를 쓰지 않고 색·아이콘·숫자(`tabular-nums`)를 조합한 `rounded-[8px]` 배지로 정리합니다. |
| **빈도 기반 모션 & 지연 검증 폼** | 하루 수십 번 누르는 조작은 `0ms~150ms` 빠른 전환, 공간 이동만 `motion/react` 스프링을 씁니다. 제출 버튼은 유효성 검사 때문에 비활성화하지 않고, 제출 시 첫 오류 필드로 자동 포커스해 쉬운 해요체로 안내합니다. |
| **70% 텍스트 과감 삭제 & 페이지 재배치** | NN/g 연구(웹 방문자는 전체 글자의 20%~28%만 읽음)와 Steve Krug 원칙(절반을 지우고 남은 것에서 다시 절반을 지움 = 75% 삭제)에 따라 LLM이 생성한 중복·저우선순위 텍스트 70%를 먼저 삭제합니다. 지운 자리에 빈 카드 박스를 남기지 않고, 남은 핵심 30% 문구와 숫자 중심으로 카드 해체·섹션 통폐합·타이포그래피 확대·여백 재조정까지 페이지 배치를 다시 설계합니다. |
| **쉬운 한국어 UX & 4계층 아키텍처** | 일반 화면은 `14px` 이상(금융·분석 고밀도 표 보조 셀만 `13px tabular-nums` 예외), `presentation -> application -> domain <- infrastructure` 단방향 의존성과 라이트·다크 E2E 검증을 강제합니다. |

---

## 디렉터리 구조

```text
toss-clean-ux/
├── SKILL.md                           # 메인 스킬 지침 및 4단계 실행 워크플로
├── references/
│   ├── design-tokens.md               # 라이트·다크 OKLCH 토큰, 단일 포커스 링, 스쿼클, CSS 실드, 커스텀 컨트롤 15종 명세
│   ├── interaction-craft.md           # 자연 스크롤 vs 분할 워크스페이스 기준, 테마 전환, 빈도 기반 모션, 지연 검증 폼, 시니어 5대 오인지 대응
│   ├── ux-writing-anti-slop.md        # 쉬운 한국어 치환표, 중복 제거 맵, 금지 패턴 목록, 웹 인터페이스 체크리스트
│   └── clean-arch-e2e.md              # 4계층 클린 아키텍처 경계 규칙 및 라이트·다크 실브라우저 E2E 검증표
├── scripts/
│   └── audit.mjs                      # 외부 의존성 없는 Node.js 정적 분석 및 빌드 검증 스크립트
├── LICENSE
└── README.md
```

---

## 설치 및 사용 방법

### 1. 스킬 설치

사용 중인 코딩 에이전트의 스킬 디렉터리에 저장소를 클론합니다.

```bash
git clone <repository-url> ~/.agents/skills/toss-clean-ux
# 또는
git clone <repository-url> ~/.claude/skills/toss-clean-ux
# 또는
git clone <repository-url> ~/.gemini/config/skills/toss-clean-ux
```

설치 후 실행 중인 세션에서 스킬 목록을 다시 불러오거나 새 세션을 열면 자동으로 인식됩니다.

### 2. 프롬프트 활용 예시

```text
toss-clean-ux 스킬 기준으로 라이트·다크 모드를 모두 지원하는 신청 랜딩페이지와 2단계 입력 퍼널을 만들어줘.
```

```text
현재 웹 앱을 toss-clean-ux 기준으로 점검해서 다크모드 대비, 더블 테두리, 브라우저 기본 체크박스·드롭다운, 답답한 스크롤 제한 문제를 전부 개선해줘.
```

### 3. 자동 정적 감사 스크립트 단독 실행

`scripts/audit.mjs`는 별도 패키지 설치 없이 Node.js 18 이상에서 바로 실행할 수 있습니다.

```bash
# 정적 규칙 점검만 실행
node ./scripts/audit.mjs /path/to/your-project

# 정적 규칙 점검 + 프로덕션 빌드(npm run build)까지 일괄 검증
node ./scripts/audit.mjs /path/to/your-project --build
```

#### 자동 점검 항목

- `shadowless`: 드롭·블러 그림자 탐지 (0-blur `1px~2px` `inset` 헤어라인 링과 `:-webkit-autofill` 인셋 마스크는 정상 허용)
- `blue-white-palette` / `dark-mode-ready` / `wcag-aa-contrast`: 순백·순흑 차단, 다크모드 CSS 토큰 구비 여부 점검, 라이트(`#8B95A1`)·다크(`#62626D`, `dark:text-[#3182F6]`) 저대비 텍스트 경고
- `single-focus-border`: 전역 `:focus-visible` 아웃라인 충돌 및 `focus:border-*` + `focus:ring-*` 중복 탐지
- `concentric-radius` / `balanced-radius`: 세그먼트 탭 곡률 불일치, 과도하게 둥근 모서리, 각진 박스 탐지
- `custom-form-controls`: `sr-only` 래퍼 없는 기본 `checkbox`/`radio`/`file`, 네이티브 `select`/`datalist`/`range`/`date`/`time`/`color`/`progress`/`meter` 실패 처리 및 `type="number"` 경고
- `native-browser-popup`: `alert`/`confirm`/`prompt` 실패 처리, `<form>`의 `noValidate` 누락 및 기본 `title` 툴팁 경고
- `viewport-scroll-ergonomics` / `mobile-keyboard-viewport`: `h-screen`/`min-h-screen` 차단, 반응형 접두사 없는 `h-[100dvh] overflow-hidden` 답답한 스크롤 잠금 경고, `interactive-widget=resizes-content` 점검
- `icon-only-button` / `punctuation-hygiene` / `form-validation-ux`: 보편 아이콘 옆 중복 텍스트, `—`/`·` 남용, 제출 버튼 비활성화 안티패턴 탐지
- `copy-bloat-70-cut`: LLM 상투적 인사말·과장 문구(`환영합니다`, `혁신적인 올인원`, `Welcome to` 등), 장식용 대문자 키커, 90자 이상 장문 UI 문단 경고 (70% 텍스트 삭제 및 재배치 유도)
- `clean-arch` / `plain-korean` / `zero-duplication` / `senior-font-size` / `anti-slop`: 계층 경계, 전문 용어, 안심 문구 중복(실제 중복 시에만 실패), 글꼴 크기, 금지 패턴 탐지

---

## 권장 기술 스택

- React 18 / 19 + TypeScript + Vite
- Tailwind CSS v4 (또는 동등한 CSS 변수 체계)
- `motion/react`
- `lucide-react`
- Pretendard Variable

---

## 라이선스

[MIT License](./LICENSE)
