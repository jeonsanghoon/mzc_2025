# 인프라 (Lambda)

DESIGN_GUIDE 구현 로드맵 **1단계: 데이터 수집 및 통합** 기반 구조입니다.

## 구성

| 디렉터리 | 용도 |
|----------|------|
| `lambda/` | Node.js 20.x ESM (`.mjs`) — YAML 변환, 수집·표준화 등 |

## 1단계 범위 (참고)

- **Lambda(YAML 변환)** — 제품별 YAML 기반 데이터 변환
- Data Contract 스키마·검증, 다중 프로토콜(TCP/MQTT/REST)

## 실행

- **Lambda 로컬**: `cd lambda/yaml-transform && node index.mjs` 또는 SAM/Serverless로 테스트

상세: [00.doc/DESIGN_GUIDE.md](../10.planning/00.doc/DESIGN_GUIDE.md) 구현 로드맵
