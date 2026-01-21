/**
 * Lambda: YAML 변환 (1단계 데이터 수집·통합)
 * - 런타임: Node.js 20.x
 * - 모듈: ESM (.mjs)
 * - 입력: Kinesis/이벤트 payload → 제품별 YAML 스펙으로 변환 → 표준 JSON
 */

/**
 * @param {import('aws-lambda').KinesisStreamHandlerEvent | object} event
 * @param {import('aws-lambda').Context} context
 */
export async function handler(event, context) {
  console.log('yaml-transform invoke', { requestId: context.awsRequestId });

  // TODO: 제품별 YAML 로드, 페이로드 파싱, 스키마 검증, 표준 JSON 반환
  return { ok: true, requestId: context.awsRequestId };
}
