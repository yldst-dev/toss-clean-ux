# toss-clean-ux

한국어 웹 앱을 토스처럼 깔끔하고 읽기 쉽게 만드는 프론트엔드 디자인·UX·아키텍처 통합 에이전트 스킬입니다.

쉐도우리스(Shadowless) OKLCH 블루화이트 디자인 시스템, 브라우저 기본 UI 누수 전면 차단, 쉬운 한국어 UX 라이팅, 시니어·모바일 접근성, 4계층 클린 아키텍처, 그리고 외부 의존성 없는 자동 정적 검사 스크립트(`scripts/audit.mjs`)까지 하나로 묶었습니다.

---

## 어떤 문제를 해결하나요?

웹 프론트엔드를 빠르게 만들다 보면 아래와 같은 완성도 저하가 반복해서 나타납니다.

- **뻔한 템플릿 인상**: 보라색 그라데이션, 카드 안에 카드를 겹친 레이아웃, 3열 기능 카드, 글로우·펄스 점 등 천편일률적인 시각 패턴
- **입력창과 모서리 디테일 붕괴**: 포커스 시 파란 테두리가 두 줄로 겹치는 더블 보더, 바깥 트랙과 안쪽 탭의 곡률이 어긋나는 모서리, 지나치게 둥글거나 각진 박스
- **브라우저 기본 UI 누수**: 순백 배경에 회색 테두리가 뜨는 기본 체크박스, 운영체제마다 제각각인 `<select>`·날짜·슬라이더·파일 선택 버튼, 노란 자동완성 배경, 투박한 `window.alert` 팝업
- **인지 부하와 가독성 저하**: `·`와 `—`로 정보를 한 줄에 욱여넣은 메타데이터, 화면 곳곳에 중복 노출되는 안심 문구(`30초`, `무료`, `신용점수`), 13px 이하 작은 글씨와 어려운 금융·IT 전문 용어
- **계층 오염**: `domain`이나 `application` 로직 안에 UI 라이브러리 의존성이 섞여 유지보수가 어려워지는 구조

`toss-clean-ux`는 설계 기준 문서와 실행 가능한 자동 점검 스크립트를 함께 제공해, 작업 도중과 완료 시점에 위 문제를 일관되게 걸러냅니다.

---

## 핵심 설계 기준

| 영역 | 주요 규칙 |
| --- | --- |
| **OKLCH 4단계 쉐도우리스 블루화이트** | 그림자(`box-shadow`, `shadow-*`), 순백(`#FFFFFF`), 순흑(`#000000`)을 쓰지 않고 `#E8EFFA` · `#F1F5FB` · `#F9FBFF` · `#ECF2FA` 4단계 면 대비와 `1px` 블루 헤어라인으로 층위를 나눕니다. 보조 텍스트는 WCAG AA `4.5:1` 이상을 충족하는 `#64707D`를 기본으로 씁니다. |
| **단일 포커스 링 (더블 테두리 금지)** | 전역 `:focus-visible` 범위를 버튼·링크로 한정하고 입력 요소는 `outline: none`과 `focus:ring-2 focus:ring-inset focus:ring-[#3182F6]` 단일 링만 표시합니다. |
| **균형 잡힌 동심원 스쿼클 반경** | 지나치게 각진 `0px~4px`와 과도한 `26px+` 풍선 모서리를 모두 피합니다. `R_inner = R_outer - P` 공식을 지키며(`8px` 배지, `12px~14px` 입력·버튼, `16px/12px` 세그먼트 탭, `18px~20px` 카드·드롭다운) 지원 브라우저에서는 `corner-shape: squircle`로 점진 향상합니다. |
| **브라우저 기본 UI 누수 전면 차단** | 기본 `<input type="checkbox\|radio\|file\|range\|date\|time\|color">`, `<select>`, `<datalist>`, `<progress>`, `<meter>`, `alert/confirm/prompt`, 기본 `title` 툴팁, HTML5 검증 말풍선을 금지합니다. 커스텀 React 컨트롤(`TossCheckbox`, `TossSelect`, `TossSwitch`, `TossSlider`, `TossDatePicker`, `TossFileUpload`, `TossDialog`, `TossToast`, `TossTooltip`)과 자동완성·터치 하이라이트·스크롤바·Edge 비밀번호 눈 아이콘 차단 CSS 실드를 적용합니다. |
| **직관적 아이콘 버튼 & 멀티채널 배지** | 닫기·복사·새로고침·검색 등 보편적인 12종 아이콘은 중복 글자 없이 아이콘 전용(`aria-label` 필수, 데스크탑 `40px+` / 모바일 `44px~48px+`)으로 둡니다. 지표 나열에 `·`와 `—`를 쓰지 않고 색·아이콘·숫자(`tabular-nums`)를 조합한 `rounded-[8px]` 배지로 정리합니다. |
| **스크롤리스 콰이어트 크롬 & 빈도 기반 모션** | 데스크탑 앱 화면은 `100dvh` 안에서 단일 스크롤 영역(`scrollbar-gutter: stable`)과 최대 1개의 탐색 축만 유지하고 모바일은 자연스러운 `min-h-[100dvh]`와 `interactive-widget=resizes-content`로 대응합니다. 자주 누르는 조작은 `0ms~150ms` 빠른 전환, 공간 이동만 `motion/react` 스프링을 씁니다. |
| **쉬운 한국어 UX & 시니어 접근성** | 초등학생과 70대 어르신도 3초 안에 이해하는 해요체 구어체를 쓰고, 안심 문구는 최종 행동 버튼 아래 단 1곳에만 둡니다. 제출 버튼은 유효성 검사 때문에 비활성화하지 않고, 제출 시 첫 오류 필드로 자동 포커스해 부드럽게 안내합니다. 모든 글자는 `14px` 이상, 모바일 입력창은 `16px` 이상을 유지합니다. |
| **4계층 클린 아키텍처 & 검증 게이트** | `presentation -> application -> domain <- infrastructure` 단방향 의존성을 강제하며, 작업 후 정적 감사 + 프로덕션 빌드 + 데스크탑(`1440px`)·모바일(`375px`, `360px`) 화면 검증을 통과해야 완료로 인정합니다. |

---

## 디렉터리 구조

```text
toss-clean-ux/
├── SKILL.md                           # 메인 스킬 지침 및 4단계 실행 워크플로
├── references/
│   ├── design-tokens.md               # OKLCH 토큰, 단일 포커스 링, 스쿼클, CSS 실드, 커스텀 컨트롤 15종 명세
│   ├── interaction-craft.md           # Quiet Chrome, 스크롤리스 점진 공개, 빈도 기반 모션, 지연 검증 폼, 시니어 5대 오인지 대응
│   ├── ux-writing-anti-slop.md        # 쉬운 한국어 치환표, 중복 제거 맵, 금지 패턴 목록, 웹 인터페이스 체크리스트
│   └── clean-arch-e2e.md              # 4계층 클린 아키텍처 경계 규칙 및 실브라우저 E2E 시각 검증표
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
# 공통 스킬 경로 예시 (환경에 맞는 경로 선택)
git clone <repository-url> ~/.agents/skills/toss-clean-ux
# 또는
git clone <repository-url> ~/.claude/skills/toss-clean-ux
# 또는
git clone <repository-url> ~/.gemini/config/skills/toss-clean-ux
```

설치 후 실행 중인 세션에서 스킬 목록을 다시 불러오거나 새 세션을 열면 자동으로 인식됩니다.

### 2. 프롬프트 활용 예시

```text
toss-clean-ux 스킬 기준으로 신청 랜딩페이지와 2단계 입력 퍼널을 만들어줘.
```

```text
현재 대시보드 화면을 toss-clean-ux 기준으로 점검해서 더블 테두리, 브라우저 기본 체크박스·드롭다운, 가독성 문제를 전부 정리해줘.
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

- `shadowless`: 그림자 클래스 및 CSS 속성 탐지 (`:-webkit-autofill` 배경 덮어쓰기 인셋 마스크는 예외 허용)
- `blue-white-palette`: 순백(`#FFFFFF`, `bg-white`) 및 순흑(`#000000`, `bg-black`, `text-black`) 탐지
- `single-focus-border`: 전역 `:focus-visible` 아웃라인 충돌 및 `focus:border-*` + `focus:ring-*` 중복 탐지
- `concentric-radius` / `balanced-radius`: 세그먼트 탭 곡률 불일치, 과도하게 둥근 모서리, 각진 박스 탐지
- `custom-form-controls`: `sr-only` 래퍼 없는 기본 `checkbox`/`radio`/`file`, 네이티브 `select`/`datalist`/`range`/`date`/`time`/`color`/`progress`/`meter` 탐지
- `native-browser-popup`: `alert`/`confirm`/`prompt` 호출 실패 처리, `<form>`의 `noValidate` 누락 및 기본 `title` 툴팁 경고
- `wcag-aa-contrast`: 저대비 회색 텍스트(`#8B95A1`) 경고 및 `#64707D` 권장
- `icon-only-button` / `punctuation-hygiene`: 보편 아이콘 옆 중복 텍스트, `—` 남용, `·` 지표 나열 탐지
- `scroll-less-responsive` / `mobile-keyboard-viewport`: `h-screen`/`min-h-screen` 금지 및 `interactive-widget=resizes-content` 점검
- `form-validation-ux`: 유효성 검사 목적의 제출 버튼 비활성화 안티패턴 탐지
- `clean-arch`: `domain`/`application`/`infrastructure` 계층 간 금지된 역방향·UI 의존성 탐지
- `plain-korean` / `zero-duplication` / `senior-font-size` / `anti-slop`: 전문 용어, 안심 문구 중복, `14px` 미만 글씨, 금지 패턴 탐지

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
