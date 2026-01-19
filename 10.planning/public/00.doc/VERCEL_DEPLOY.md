# Vercel 배포 가이드

본 프로젝트(10.planning)를 **Vercel**에 배포하는 방법입니다. Next.js 앱(프레젠테이션·대시보드·설계 문서)을 배포 대상으로 합니다.

---

## 1. 사전 요건

- [Vercel](https://vercel.com) 계정 (GitHub/GitLab/Bitbucket 연동 권장)
- 이 저장소가 GitHub 등에 푸시된 상태

---

## 2. 프로젝트 구조 참고

- **배포 대상**: Next.js 앱 (`next build` / `npm run build:docs`)
- **위치**: 저장소 루트 기준 `10.planning/` 폴더
- **빌드 스크립트**: `package.json`에 `"build": "vite build"`, `"build:docs": "next build"` 가 있으므로 **Next 빌드**를 쓸 때는 `build:docs` 사용

### 2-1. 저장소에 포함된 설정 (자동 적용)

- **`vercel.json`**: `buildCommand`를 `npm run build:docs`로 지정해, Vercel이 `vite build` 대신 **Next 빌드**를 사용하도록 함.
- **`.gitignore`**: `.next/`를 제외해 `.next` 디렉터리가 업로드되지 않도록 함 (경고 방지).

---

## 3. Vercel에서 프로젝트 import

### 3-1. 새 프로젝트 추가

1. [Vercel 대시보드](https://vercel.com/dashboard) → **Add New** → **Project**
2. **Import Git Repository**에서 이 저장소 선택 후 **Import**

### 3-2. 빌드 설정 (필수)

| 설정 | 값 | 비고 |
|------|-----|------|
| **Root Directory** | `10.planning` | 프로젝트가 `10.planning` 안에 있음 |
| **Framework Preset** | Next.js | 자동 감지되면 그대로 사용 |
| **Build Command** | *(비움 또는 기본)* | `vercel.json`으로 `npm run build:docs` 지정됨. UI에서 Override 시 `npm run build:docs` 또는 `next build` |
| **Output Directory** | *(비움)* | Next.js 기본 `.next` 사용 |
| **Install Command** | `npm install` | 기본값 |

- **Root Directory**를 `10.planning`으로 두지 않으면 `package.json`·`next.config.js`를 찾지 못해 빌드가 실패합니다.
- **`vercel.json`**에 `buildCommand: "npm run build:docs"`가 있으면, Vercel UI에서 별도 설정 없이 Next 빌드가 실행됩니다. (없던 경우 가이드대로 Build Command를 `npm run build:docs`로 두세요.)

### 3-3. 환경 변수

- 현재 Next 앱은 별도 환경 변수 없이 동작합니다.
- 외부 API URL, 키 등이 생기면 **Settings → Environment Variables**에서 추가합니다.

---

## 4. 배포

- **Deploy** 클릭 후 빌드·배포가 진행됩니다.
- 완료되면 `https://<프로젝트명>.vercel.app` 형태의 URL이 부여됩니다.

---

## 5. 배포 후 확인

- **메인**: `https://<프로젝트명>.vercel.app/`
- **설계 문서**: `https://<프로젝트명>.vercel.app/docs` 또는 `/#docs`
- **문서 직접 링크**: `/#docs/project-goals`, `/#docs/design-guide` 등 (앱 라우팅 기준)

`public/00.doc/`의 마크다운이 `/00.doc/...`로 제공되므로, 문서 뷰어가 정상 동작하는지 확인합니다.

---

## 6. 커스텀 도메인(선택)

- **Settings → Domains**에서 도메인 추가
- DNS에 Vercel이 안내하는 CNAME/ A 레코드 설정

---

## 7. 트러블슈팅

| 현상 | 점검 |
|------|------|
| 빌드 실패: `package.json` not found | Root Directory가 `10.planning`인지 확인 |
| 빌드 실패: `next` not found | Root를 `10.planning`으로 둔 뒤 `npm install`이 그 안에서 실행되는지 확인. 상위 루트에 `package.json`이 따로 있으면 모노레포 설정이 필요할 수 있음 |
| `npm run build` 사용·Vite 빌드됨 | `vercel.json`의 `buildCommand` 확인. 없으면 UI에서 `npm run build:docs`로 Override |
| `.next` directory 업로드 경고 | `.gitignore`에 `.next/` 포함 후 `.next`를 커밋에서 제거 (`git rm -r --cached 10.planning/.next`) |
| 문서(/00.doc/...) 404 | `public/00.doc/`에 마크다운이 포함돼 배포되는지 확인. `00.doc`를 `.gitignore`에 넣지 않았는지 확인 |

---

## 8. 요약

1. Vercel에서 저장소 **Import**
2. **Root Directory** = `10.planning`
3. **Build Command** = `vercel.json`에 의해 `npm run build:docs` 사용 (Override 없으면 자동)
4. **Deploy** 후 `/`, `/docs`, `/#docs/...` 접속으로 화면·문서 확인
