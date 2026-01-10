import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  AlertTriangle,
  Database,
  Cog,
  Users,
  Shield,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  Target,
  Zap,
  Activity,
  Link as LinkIcon,
  LineChart,
  WifiOff,
  Clock,
} from "lucide-react";

/** 공용 코드 블록: 텍스트가 컨테이너 밖으로 넘치지 않도록 보장 */
function CodeBlock({
  label,
  code,
  rows = 12,
}: {
  label: string;
  code: string;
  rows?: number;
}) {
  return (
    <div className="min-w-0">
      <div className="text-xs font-medium mb-1">{label}</div>
      <div className="rounded-lg ring-1 ring-slate-200 overflow-hidden">
        <textarea
          readOnly
          value={code}
          rows={rows}
          aria-label={label}
          className={[
            // 크기/레이아웃
            "block w-full max-w-full min-w-0 resize-none",
            // 스크롤
            "overflow-auto overflow-x-auto overscroll-contain",
            // 코드 스타일
            "bg-slate-900 text-slate-100 font-mono",
            "text-[11px] sm:text-xs leading-5 p-3 sm:p-4 outline-none",
          ].join(" ")}
        />
      </div>
    </div>
  );
}

// 전체 화면 컴포넌트
export function ProblemFrame() {
  // 1) 고객 문제 영역
  const problems = [
    {
      category: "데이터 문제",
      icon: Database,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      issues: [
        "RDBMS / NoSQL / File / IoT 장비별로 분산 → 통합 불가",
        "표준 스키마, 시간대, 단위, ID 불일치 → 분석 불신",
        "실시간은 일부만 필요하지만 무분별 수집 → 장애 & 비용 증가",
      ],
    },
    {
      category: "운영 문제",
      icon: Cog,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      issues: [
        "알람 오탐/미탐 → 운영 혼란, 대응 지연 (평균 복구 시간 증가)",
        "근본 원인 분석 지연 → 서비스 수준 협약 준수 실패",
        "통신 오류 누적 시 배치(시간별) 점검 필요 → 실시간 누락 보완",
      ],
    },
    {
      category: "제품 문제",
      icon: AlertTriangle,
      color: "text-red-500",
      bgColor: "bg-red-50",
      issues: [
        "제품/펌웨어별 성능 데이터 부족 → 불량 원인 규명 지연",
        "고객사별 맞춤 서비스 수준 협약 대응 불가 → 만족도/재구매율 하락",
      ],
    },
    {
      category: "서비스 문제",
      icon: Users,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      issues: [
        "원격 제어/무선 펌웨어 업데이트 미흡 → 현장 출동↑, 운영비용↑",
      ],
    },
    {
      category: "보안/비용 문제",
      icon: Shield,
      color: "text-green-500",
      bgColor: "bg-green-50",
      issues: [
        "권한 관리/감사 체계 미비 → 규제 리스크",
        "불필요한 장기 DB 보관 → 비용 과다",
      ],
    },
  ];

  // 2) 룰 엔진 + 배치 통신 오류 점검 예시 (JSON key는 영문 유지)
  const ruleEngines = [
    {
      key: "threshold",
      title: "임계값(Threshold) 룰",
      icon: Activity,
      color: "text-blue-600",
      desc: "사전에 정의된 기준값을 초과/미달하면 알람을 발생시킵니다.",
      bullets: [
        "냉장창고 온도: -2℃ 미만 또는 8℃ 초과 3분 지속 시 경보",
        "서버 CPU 사용률: 90% 이상 5분 지속 시 경보",
        "정수기 필터 수명: 10% 이하로 하락 시 교체 알림",
      ],
      example: `{
  "type": "threshold",
  "metric": "temperature",
  "resource": "cold_storage/zone-A",
  "lt": -2,
  "gt": 8,
  "duration": "3m",
  "severity": "high",
  "notify": ["ops", "oncall"]
}`,
    },
    {
      key: "anomaly",
      title: "이상탐지(Anomaly) 룰",
      icon: LineChart,
      color: "text-orange-600",
      desc: "정상 패턴과 벗어난 급격한 변화나 드문 값을 탐지합니다.",
      bullets: [
        "CO₂가 평시 500~700ppm → 1,200ppm 급증 시 이상 알림",
        "네트워크 트래픽이 최근 2주 이동평균 대비 300% 급증",
        "배터리 잔량이 5분 내 20%p 급락",
      ],
      example: `{
  "type": "anomaly",
  "metric": "co2_ppm",
  "method": "ewma",
  "window": "2w",
  "sigma": 3,
  "change_ratio_gt": 2.0,
  "min_points": 20,
  "severity": "medium"
}`,
    },
    {
      key: "correlation",
      title: "상관관계(Correlation) 룰",
      icon: LinkIcon,
      color: "text-purple-600",
      desc: "여러 센서/이벤트를 조합해 조건 충족 시 알람을 발생시킵니다.",
      bullets: [
        "출입문 센서=열림 + CCTV 모션=없음(3분) → 침입 의심",
        "가스밸브=열림 + 온도상승=없음(2분) → 보일러 점화 불량",
        "전력소비 급증 + 냉각기 가동률 하락 → 냉각 장애",
      ],
      example: `{
  "type": "correlation",
  "any": [
    {
      "all": [
        { "source": "door.sensor", "field": "state", "eq": "open" },
        { "source": "cctv.motion", "field": "count", "eq": 0, "duration": "3m" }
      ]
    },
    {
      "all": [
        { "source": "gas.valve", "field": "state", "eq": "open" },
        { "source": "boiler.temp", "field": "delta", "lt": 0.5, "duration": "2m" }
      ]
    }
  ],
  "severity": "high"
}`,
    },
    {
      key: "predictive",
      title: "예측(Predictive) 룰",
      icon: Zap,
      color: "text-green-700",
      desc: "머신러닝/통계 모델로 향후 위험을 사전에 경고합니다.",
      bullets: [
        "컴프레서 진동+전류 패턴 → 14일 내 고장확률 80% 이상 시 사전점검",
        "배터리 충방전/온도 → 30일 내 수명 종료 예측 시 교체 알림",
        "서버 리소스 로그 → 48시간 내 다운타임 확률 70% 시 용량 증설 알림",
      ],
      example: `{
  "type": "predictive",
  "model": "xgboost_failure",
  "features": ["vibration_rms", "current_amp", "temp_c"],
  "predictive_window": "14d",
  "threshold_prob": 0.8,
  "explainability": true,
  "actions": ["create_maintenance_workorder"]
}`,
    },
    {
      key: "batchCheck",
      title: "통신 오류 배치 체크(시간별)",
      icon: WifiOff,
      color: "text-red-600",
      desc: "실시간 누락을 보완하기 위해 시간 단위로 통신 오류를 집계·검증합니다.",
      bullets: [
        "디바이스 주기 데이터 미수신 건을 시간 단위로 집계",
        "허브/지역/고객사 단위 집계 및 전일 대비 증감률 계산",
        "누적 재전송 실패/지연(그레이스) 고려하여 경보",
      ],
      example: `{
  "type": "batch_check",
  "target": "device_comm_error",
  "schedule": "cron(0 * * * ? *)",            // 매 정시(UTC) 실행 (AWS 크론 표기 예)
  "window_minutes": 60,                         // 체크 윈도우: 최근 60분
  "grace_period_minutes": 10,                   // 지연 허용치
  "consecutive_miss_threshold": 2,              // 연속 미수신 임계치
  "aggregate": ["customer_id", "hub_id"],      // 집계 키
  "severity": "high",
  "actions": ["notify_owner", "open_ticket"]
}`,
    },
  ];

  // 3) 배치 스케줄 프리셋(문서용, 실제 상태 관리 X)
  const batchPresets = [
    {
      label: "15분",
      value: "rate(15 minutes)",
      note: "고빈도 장애 구간 모니터링",
    },
    {
      label: "매시간",
      value: "cron(0 * * * ? *)",
      note: "표준 시간별 집계(권장)",
    },
    {
      label: "6시간",
      value: "cron(0 */6 * * ? *)",
      note: "야간/저부하 구간",
    },
    {
      label: "매일 00:10",
      value: "cron(10 0 * * ? *)",
      note: "일일 리포트",
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 헤더 */}
      <div className="text-center mb-4 sm:mb-8">
        <h2 className="mb-2 text-red-600 text-sm sm:text-base flex items-center justify-center gap-2">
          <AlertTriangle className="h-5 w-5 inline-block" strokeWidth={2.5} />
          🔴 프레임 1. 고객사 문제 (문제 발견)
        </h2>
        <p className="text-muted-foreground text-sm">
          현재 고객사들이 직면하고 있는 핵심 문제점들을 5개
          영역으로 분류
        </p>
      </div>

      {/* 문제 카드 */}
      <div className="grid gap-3 sm:gap-6">
        {problems.map((problem, index) => (
          <Card
            key={index}
            className="relative overflow-hidden"
          >
            <div
              className={`absolute top-0 left-0 w-1 h-full ${problem.bgColor}`}
            ></div>
            <CardHeader className="flex flex-row items-start sm:items-center space-y-0 pb-2 sm:pb-4 min-w-0 p-3 sm:p-6">
              <div
                className={`p-3 sm:p-4 rounded-full ${problem.bgColor} mr-3 sm:mr-4 flex-shrink-0`}
              >
                <problem.icon
                  className={`h-6 w-6 sm:h-8 sm:w-8 ${problem.color} flex-shrink-0`}
                  strokeWidth={2.5}
                />
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-base sm:text-lg">
                  {problem.category}
                </CardTitle>
                <Badge variant="outline" className="mt-1 text-xs">
                  {problem.issues.length}개 문제점
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <div className="space-y-2 sm:space-y-3">
                {problem.issues.map((issue, issueIndex) => (
                  <div
                    key={issueIndex}
                    className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-slate-50"
                  >
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-slate-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                    <p className="text-xs sm:text-sm leading-relaxed">
                      {issue}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 영향 요약 */}
      <Card className="border-2 border-red-200 bg-red-50/50">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-red-700 text-base sm:text-lg">
            <AlertTriangle className="h-5 w-5 flex-shrink-0" strokeWidth={2.5} /> 전체적인 영향
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <div className="text-center p-3 sm:p-4 bg-white rounded-lg">
              <DollarSign className="h-10 w-10 sm:h-12 sm:w-12 text-red-500 mx-auto mb-3 flex-shrink-0" strokeWidth={2.5} />
              <div className="font-medium text-red-700 text-sm sm:text-base">
                운영 비용 증가
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                현장 출동, 장애 대응
              </div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-white rounded-lg">
              <Users className="h-10 w-10 sm:h-12 sm:w-12 text-red-500 mx-auto mb-3 flex-shrink-0" strokeWidth={2.5} />
              <div className="font-medium text-red-700 text-sm sm:text-base">
                고객 만족도 하락
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                서비스 협약 위반, 재구매율 저하
              </div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-white rounded-lg">
              <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-red-500 mx-auto mb-3 flex-shrink-0" strokeWidth={2.5} />
              <div className="font-medium text-red-700 text-sm sm:text-base">
                규제 리스크
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                보안, 감사 체계 미비
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 로드맵 */}
      <Card className="border-2 border-green-200 bg-green-50/50">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-green-700 text-base sm:text-lg">
            <Target className="h-5 w-5 flex-shrink-0" strokeWidth={2.5} /> 구체적 해결 방안
            로드맵
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            각 문제영역별 단계적 해결 방안과 예상 효과
          </p>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className="space-y-4 sm:space-y-6 w-full">
            {/* 1단계 */}
            <StageOne />
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mx-auto" />
            {/* 2단계 (룰 엔진 + 예시) */}
            <StageTwo ruleEngines={ruleEngines} />
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mx-auto" />
            {/* 3단계 */}
            <StageThree />
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mx-auto" />
            {/* 4단계 */}
            <StageFour />
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mx-auto" />
            {/* 5단계 */}
            <StageFive />
          </div>

          {/* 전체 효과 */}
          <OverallImpact />

          {/* 통신 오류 배치 체크: 주기 설정 프리셋 문서 카드 */}
          <BatchSchedulePresets presets={batchPresets} />
        </CardContent>
      </Card>
    </div>
  );
}

// ===== 분리된 섹션 컴포넌트들 =====
function StageOne() {
  return (
    <div className="relative w-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">
          1
        </div>
        <h3 className="font-medium text-blue-700 text-sm sm:text-base flex-1 min-w-0">
          데이터 통합 및 표준화 (1-2개월)
        </h3>
      </div>
      <div className="ml-0 sm:ml-11 space-y-2 sm:space-y-3 w-full">
        <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-blue-50 rounded-lg w-full">
          <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-xs sm:text-sm">
              통합 스키마 설계 및 Data Contract 구축
            </div>
            <div className="text-xs text-muted-foreground">
              7개 도메인(디바이스, 이벤트, 알람 등) 표준 스키마
              정의
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-blue-50 rounded-lg w-full">
          <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-xs sm:text-sm">
              S3 Data Lake 3계층 구조 구축
            </div>
            <div className="text-xs text-muted-foreground">
              Raw → Standardized → Curated 데이터 파이프라인
            </div>
          </div>
        </div>
        <div className="text-xs text-green-600 font-medium w-full">
          → 예상 효과: 데이터 신뢰도 85% 향상, 분석 시간 60%
          단축
        </div>
      </div>
    </div>
  );
}

function StageTwo({ ruleEngines }: { ruleEngines: any[] }) {
  return (
    <div className="relative w-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">
          2
        </div>
        <h3 className="font-medium text-orange-700 text-sm sm:text-base flex-1 min-w-0">
          지능형 모니터링 시스템 구축 (2-3개월)
        </h3>
      </div>
      <div className="ml-0 sm:ml-11 space-y-2 sm:space-y-3 w-full">
        <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-orange-50 rounded-lg w-full">
          <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-xs sm:text-sm">
              4가지 룰 타입 기반 실시간 알람 시스템
            </div>
            <div className="text-xs text-muted-foreground">
              Threshold, Anomaly, Correlation, Predictive 룰
              엔진
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-orange-50 rounded-lg w-full">
          <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-xs sm:text-sm">
              AI 기반 False Positive 감소 알고리즘
            </div>
            <div className="text-xs text-muted-foreground">
              과거 패턴 학습을 통한 오탐 필터링
            </div>
          </div>
        </div>
        <div className="text-xs text-green-600 font-medium w-full">
          → 예상 효과: 알람 오탐률 30% 감소, 진짜 문제 놓침 50%
          감소
        </div>

        {/* 룰 엔진 예시 카드 */}
        <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4 w-full">
          {ruleEngines.map((r) => (
            <Card
              key={r.key}
              className="border border-orange-200 w-full"
            >
              <CardHeader className="pb-2 p-3 sm:p-6">
                <CardTitle
                  className={`flex items-center gap-2 ${r.color} text-sm sm:text-base`}
                >
                  <r.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" /> 
                  <span className="flex-1 min-w-0">{r.title}</span>
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  {r.desc}
                </p>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3 min-w-0 p-3 sm:p-6">
                <ul className="list-disc ml-4 sm:ml-5 text-xs sm:text-sm space-y-1">
                  {r.bullets.map((b: string, i: number) => (
                    <li key={i} className="break-words">{b}</li>
                  ))}
                </ul>
                <div className="text-xs text-muted-foreground">
                  예시 설정(JSON) — key는 영문 유지
                </div>
                <pre className="bg-slate-900 text-slate-100 p-2 sm:p-3 rounded-lg overflow-auto text-xs w-full">
                  {r.example}
                </pre>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function StageThree() {
  return (
    <div className="relative w-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">
          3
        </div>
        <h3 className="font-medium text-green-700 text-sm sm:text-base flex-1 min-w-0">
          Shadow 기반 원격 제어 및 무선 업데이트 (3-4개월)
        </h3>
      </div>
      <div className="ml-0 sm:ml-11 space-y-2 sm:space-y-3 w-full">
        <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-green-50 rounded-lg w-full">
          <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-xs sm:text-sm">
              AWS IoT Device Shadow 기반 안전한 원격 제어
            </div>
            <div className="text-xs text-muted-foreground">
              오프라인/온라인 상태 관계없이 제어 명령 전달
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-green-50 rounded-lg w-full">
          <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-xs sm:text-sm">
              단계별 무선 펌웨어 업데이트 시스템
            </div>
            <div className="text-xs text-muted-foreground">
              Test → Pilot → Production 단계별 배포 및 롤백
            </div>
          </div>
        </div>

        {/* 예시 카드 2개 - 모바일에서는 위아래로 배치 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full">
          {/* Shadow 제어 요청 */}
          <Card className="border border-green-200 w-full">
            <CardHeader className="pb-2 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium">
                Shadow 제어 요청 예시
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <pre className="bg-slate-900 text-slate-100 p-2 sm:p-3 rounded-lg overflow-auto text-xs w-full">{`Topic: $aws/things/{thingName}/shadow/name/ceslink-stg-control/update
{
  "state": {
    "desired": {
      "fan_speed": 3,
      "target_temp": 23
    }
  }
}`}</pre>
            </CardContent>
          </Card>

          {/* 알람 발행 예시 */}
          <Card className="border border-green-200 w-full">
            <CardHeader className="pb-2 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium">
                알람 발행(서버→운영) 예시
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <pre className="bg-slate-900 text-slate-100 p-2 sm:p-3 rounded-lg overflow-auto text-xs w-full">{`Topic: ceslink/stg/{hub_id}/{device_id}/event/alarm
{
  "rule_id": "cooling_correlation_v1",
  "severity": "high",
  "detected_at": 1757302987646,
  "details": {
    "power_kw": 12.3,
    "chiller_util": 0.18,
    "reason": "Power up with chiller down"
  }
}`}</pre>
            </CardContent>
          </Card>
        </div>

        <div className="text-xs text-green-600 font-medium w-full">
          → 예상 효과: 현장 출동 70% 감소, 무선 업데이트 성공률 98% 달성
        </div>
      </div>
    </div>
  );
}


function StageFour() {
  return (
    <div className="relative w-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">
          4
        </div>
        <h3 className="font-medium text-purple-700 text-sm sm:text-base flex-1 min-w-0">
          자동 진단 및 대응 시스템 (4-5개월)
        </h3>
      </div>
      <div className="ml-0 sm:ml-11 space-y-2 sm:space-y-3 w-full">
        <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-purple-50 rounded-lg w-full">
          <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-xs sm:text-sm">
              AI 기반 근본 원인 분석 (RCA) 엔진
            </div>
            <div className="text-xs text-muted-foreground">
              Amazon Bedrock 활용 자동 장애 원인 분석
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-purple-50 rounded-lg w-full">
          <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-xs sm:text-sm">
              폐쇄 루프 자동 대응 시스템
            </div>
            <div className="text-xs text-muted-foreground">
              문제 감지 → 원인 분석 → 자동 조치 → 결과 검증
            </div>
          </div>
        </div>
        <div className="text-xs text-green-600 font-medium w-full">
          → 예상 효과: 평균 복구 시간 40% 단축, 장애 자동 해결률
          60% 달성
        </div>
      </div>
    </div>
  );
}

function StageFive() {
  return (
    <div className="relative w-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">
          5
        </div>
        <h3 className="font-medium text-indigo-700 text-sm sm:text-base flex-1 min-w-0">
          고객별 맞춤 서비스 및 예측 분석 (5-6개월)
        </h3>
      </div>
      <div className="ml-0 sm:ml-11 space-y-2 sm:space-y-3 w-full">
        <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-indigo-50 rounded-lg w-full">
          <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-xs sm:text-sm">
              고객별 맞춤 서비스 수준 협약 관리
            </div>
            <div className="text-xs text-muted-foreground">
              산업별, 고객별 차별화된 모니터링 및 대응 정책
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-indigo-50 rounded-lg w-full">
          <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-xs sm:text-sm">
              예측 분석 및 예방 정비 시스템
            </div>
            <div className="text-xs text-muted-foreground">
              SageMaker 활용 장애 예측 및 사전 조치
            </div>
          </div>
        </div>
        <div className="text-xs text-green-600 font-medium w-full">
          → 예상 효과: 고객 만족도 25% 향상, 예방 정비로 인한
          다운타임 50% 감소
        </div>
      </div>
    </div>
  );
}

function OverallImpact() {
  return (
    <div className="mt-4 sm:mt-8 p-3 sm:p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg border-2 border-green-200 w-full">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="h-5 w-5 text-green-600 flex-shrink-0" strokeWidth={2.5} />
        <h4 className="font-medium text-green-700 text-sm sm:text-base flex-1 min-w-0">
          전체 로드맵 완료 시 예상 효과
        </h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="flex-1 min-w-0">운영 비용 절감:</span>
            <span className="font-medium text-green-600 flex-shrink-0">
              40% 감소
            </span>
          </div>
          <div className="flex justify-between">
            <span className="flex-1 min-w-0">알람 오탐률:</span>
            <span className="font-medium text-green-600 flex-shrink-0">
              30% 감소
            </span>
          </div>
          <div className="flex justify-between">
            <span className="flex-1 min-w-0">평균 복구 시간:</span>
            <span className="font-medium text-green-600 flex-shrink-0">
              40% 단축
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="flex-1 min-w-0">무선 업데이트 성공률:</span>
            <span className="font-medium text-green-600 flex-shrink-0">
              98% 달성
            </span>
          </div>
          <div className="flex justify-between">
            <span className="flex-1 min-w-0">고객 만족도:</span>
            <span className="font-medium text-green-600 flex-shrink-0">
              25% 향상
            </span>
          </div>
          <div className="flex justify-between">
            <span className="flex-1 min-w-0">ROI 회수 기간:</span>
            <span className="font-medium text-green-600 flex-shrink-0">
              12개월
            </span>
          </div>
        </div>
      </div>
      <div className="mt-3 sm:mt-4 flex justify-center sm:justify-end">
        <Button size="sm" className="text-xs sm:text-sm">세부 설계 문서 보기</Button>
      </div>
    </div>
  );
}

function BatchSchedulePresets({
  presets,
}: {
  presets: { label: string; value: string; note: string }[];
}) {
  return (
    <Card className="mt-4 sm:mt-8 border-2 border-slate-200 bg-white w-full">
      <CardHeader className="p-3 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-slate-700 text-sm sm:text-base">
          <Clock className="h-5 w-5 flex-shrink-0" strokeWidth={2.5} /> 
          <span className="flex-1 min-w-0">통신 오류 배치 체크 주기 설정 (문서용 프리셋)</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 sm:space-y-3 p-3 sm:p-6">
        <p className="text-xs sm:text-sm text-muted-foreground">
          실제 운영에서는 <b>AWS EventBridge</b> 스케줄(예:{" "}
          <code>rate</code> 또는 <code>cron</code>)로 설정하고,
          Lambda가 최근 <b>window_minutes</b> 동안의
          미수신/지연을 집계한 후 임계치 초과 시 알림/티켓을
          발행합니다.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 w-full">
          {presets.map((p, i) => (
            <div
              key={i}
              className="p-2 sm:p-3 rounded-lg border bg-slate-50 w-full"
            >
              <div className="text-xs sm:text-sm font-medium">
                {p.label}
              </div>
              <div className="text-xs text-slate-600 break-all">
                {p.value}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {p.note}
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs text-muted-foreground break-words">
          예시 JSON 키(영문 고정): <code>type</code>,{" "}
          <code>target</code>, <code>schedule</code>,{" "}
          <code>window_minutes</code>,{" "}
          <code>grace_period_minutes</code>,{" "}
          <code>consecutive_miss_threshold</code>,{" "}
          <code>aggregate</code>, <code>actions</code>
        </div>
      </CardContent>
    </Card>
  );
}