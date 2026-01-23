import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  AlertTriangle,
  TrendingUp,
  Zap,
  BarChart3,
  Bell,
  Target,
  CheckCircle2,
  Clock,
  Database,
  Activity,
  Settings,
  Users,
  GitBranch,
  Layers,
  AlertCircle,
  Play,
  Archive,
  Cloud,
  Search,
  Wifi,
  WifiOff,
  Router,
  Signal,
  NetworkIcon,
  HardDrive,
  Settings2,
} from "lucide-react";

export function MonitoringFrame() {
  // AWS 서비스별 경보 정보 (서버에서 5분마다 갱신된 데이터를 표시)
  const awsServices = [
    {
      service: "Lambda",
      description: "YAML 변환, 실시간 처리",
      alerts: 12,
      status: "문제",
      monitoring: "정상",
      issues: ["에러율 증가", "타임아웃 발생"],
    },
    {
      service: "Kinesis Data Streams",
      description: "실시간 데이터 스트리밍",
      alerts: 8,
      status: "문제",
      monitoring: "정상",
      issues: ["PutRecords 실패", "처리량 저하"],
    },
    {
      service: "DocumentDB",
      description: "Hot 데이터 저장",
      alerts: 5,
      status: "주의",
      monitoring: "정상",
      issues: ["연결 지연"],
    },
    {
      service: "Aurora (RDS)",
      description: "Warm 데이터, 기초 정보",
      alerts: 3,
      status: "정상",
      monitoring: "정상",
      issues: [],
    },
    {
      service: "ECS",
      description: "TCP 수신 서비스",
      alerts: 0,
      status: "정상",
      monitoring: "정상",
      issues: [],
    },
    {
      service: "S3",
      description: "Raw/Standardized/Curated",
      alerts: 0,
      status: "정상",
      monitoring: "정상",
      issues: [],
    },
    {
      service: "CloudWatch",
      description: "모니터링 및 알람",
      alerts: 0,
      status: "정상",
      monitoring: "정상",
      issues: [],
    },
    {
      service: "EventBridge",
      description: "이벤트 라우팅",
      alerts: 0,
      status: "정상",
      monitoring: "부족",
      issues: [],
    },
    {
      service: "SNS",
      description: "알림 발송",
      alerts: 0,
      status: "정상",
      monitoring: "부족",
      issues: [],
    },
  ];

  // 정렬: 문제가 있는 서비스부터, 문제가 많은 순, 그 다음 정상 모니터링 순
  const sortedAwsServices = [...awsServices].sort((a, b) => {
    // 1. 문제가 있는 서비스 우선 (status가 "문제" > "주의" > "정상")
    const statusOrder = { "문제": 0, "주의": 1, "정상": 2 };
    const statusDiff = statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder];
    if (statusDiff !== 0) return statusDiff;
    
    // 2. 같은 상태면 경보 수가 많은 순
    if (a.alerts !== b.alerts) return b.alerts - a.alerts;
    
    // 3. 경보 수도 같으면 모니터링 상태 (부족 < 정상)
    const monitoringOrder = { "부족": 0, "정상": 1 };
    return monitoringOrder[a.monitoring as keyof typeof monitoringOrder] - monitoringOrder[b.monitoring as keyof typeof monitoringOrder];
  });

  // 통신오류 모니터링 데이터
  const communicationErrors = [
    {
      category: "연결 실패",
      description: "디바이스-서버 간 초기 연결 실패",
      causes: [
        "네트워크 연결 불안정",
        "인증 정보 오류",
        "방화벽 차단",
        "DNS 해석 실패",
      ],
      monitoring: [
        "연결 시도 횟수 추적",
        "실패 원인별 분류",
        "지역별 연결 성공률",
        "시간대별 패턴 분석",
      ],
      metrics: {
        threshold: "연속 3회 실패",
        escalation: "5분 내 복구 시도",
        alert: "즉시 알림",
      },
      icon: WifiOff,
      color: "text-red-600",
      bgColor: "bg-red-50 border-red-200",
    },
    {
      category: "데이터 전송 지연",
      description: "정상 연결 상태에서 데이터 전송 지연 발생",
      causes: [
        "네트워크 대역폭 부족",
        "서버 부하 증가",
        "큐 병목 현상",
        "디바이스 처리 지연",
      ],
      monitoring: [
        "응답 시간 측정 (RTT)",
        "패킷 손실률 추적",
        "큐 대기 시간 모니터링",
        "처리량(Throughput) 측정",
      ],
      metrics: {
        threshold: "응답시간 >5초",
        escalation: "3회 연속 지연",
        alert: "경고 수준",
      },
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50 border-orange-200",
    },
    {
      category: "주기적 끊김",
      description: "일정 주기로 발생하는 통신 단절",
      causes: [
        "ISP 네트워크 불안정",
        "디바이스 전력 관리",
        "주기적 서버 점검",
        "로드밸런서 이슈",
      ],
      monitoring: [
        "단절 주기 패턴 분석",
        "재연결 소요 시간",
        "영향받는 디바이스 군집",
        "시간대별 발생 빈도",
      ],
      metrics: {
        threshold: "하루 3회 이상",
        escalation: "패턴 인식 시",
        alert: "주의 수준",
      },
      icon: Signal,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 border-yellow-200",
    },
    {
      category: "메시지 손실",
      description: "전송은 성공했으나 메시지가 누락되는 현상",
      causes: [
        "중간 경로 패킷 드롭",
        "서버 큐 오버플로우",
        "메시지 크기 제한 초과",
        "순서 보장 실패",
      ],
      monitoring: [
        "시퀀스 번호 검증",
        "ACK/NACK 추적",
        "메시지 무결성 검사",
        "중복 메시지 탐지",
      ],
      metrics: {
        threshold: "손실률 >1%",
        escalation: "연속 손실",
        alert: "높음 수준",
      },
      icon: AlertTriangle,
      color: "text-purple-600",
      bgColor: "bg-purple-50 border-purple-200",
    },
  ];

  // 통신오류 분석 시스템
  const communicationAnalysis = [
    {
      type: "실시간 모니터링",
      description: "연결 상태 및 통신 품질 실시간 추적",
      components: [
        "HeartBeat 모니터링 (30초 주기)",
        "응답시간 측정 및 SLA 추적",
        "패킷 손실률 실시간 계산",
        "네트워크 품질 지표 수집",
      ],
      tools: ["CloudWatch", "Kinesis Analytics", "Lambda"],
      icon: Activity,
      color: "text-green-600",
    },
    {
      type: "배치 분석",
      description: "시간별 통신 패턴 및 장애 분석",
      components: [
        "시간별 통신 성공률 집계",
        "디바이스별 연결 안정성 평가",
        "지역별 네트워크 품질 분석",
        "장애 패턴 및 근본 원인 분석",
      ],
      tools: ["EMR", "Glue", "Athena"],
      icon: BarChart3,
      color: "text-blue-600",
    },
    {
      type: "예측 분석",
      description: "통신 장애 예측 및 사전 대응",
      components: [
        "장애 발생 패턴 기계학습 모델",
        "네트워크 품질 저하 예측",
        "디바이스 배터리 기반 연결 예측",
        "계절성/시간대 패턴 분석",
      ],
      tools: ["SageMaker", "QuickSight", "Forecast"],
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ];

  // 통신오류 대응 전략
  const communicationResponse = [
    {
      level: "예방 차원",
      actions: [
        "다중 경로 네트워크 구성",
        "연결 풀(Connection Pool) 최적화",
        "디바이스 펌웨어 통신 로직 개선",
        "네트워크 QoS 설정",
      ],
      automation: "자동 설정 배포",
      icon: Router,
      color: "text-green-600",
    },
    {
      level: "감지 즉시",
      actions: [
        "자동 재연결 시도 (3회)",
        "대체 서버로 페일오버",
        "우선순위 큐로 메시지 재전송",
        "캐시된 데이터 동기화",
      ],
      automation: "즉시 자동 실행",
      icon: Zap,
      color: "text-orange-600",
    },
    {
      level: "패턴 인식 시",
      actions: [
        "영향 범위 분석 및 격리",
        "네트워크 경로 재라우팅",
        "서버 리소스 동적 할당",
        "운영팀 자동 알림",
      ],
      automation: "룰 기반 자동화",
      icon: GitBranch,
      color: "text-blue-600",
    },
    {
      level: "심각한 장애",
      actions: [
        "비상 연락망 활성화",
        "장애 격리 및 서비스 보호",
        "수동 대응팀 소집",
        "고객 커뮤니케이션",
      ],
      automation: "수동 개입",
      icon: AlertCircle,
      color: "text-red-600",
    },
  ];

  // 배치 통신 점검 시스템
  const batchCommCheck = {
    schedule: [
      {
        interval: "15분",
        purpose: "고빈도 문제 감지",
        description: "긴급 상황 대응용",
        cron: "rate(15 minutes)",
        use_case: "서비스 장애 구간",
      },
      {
        interval: "1시간",
        purpose: "표준 운영 모니터링",
        description: "일반적 운영 점검",
        cron: "cron(0 * * * ? *)",
        use_case: "권장 설정",
      },
      {
        interval: "6시간",
        purpose: "저부하 구간 점검",
        description: "야간/주말 모니터링",
        cron: "cron(0 */6 * * ? *)",
        use_case: "비즈니스 시간 외",
      },
      {
        interval: "일간",
        purpose: "일일 종합 리포트",
        description: "전체 현황 정리",
        cron: "cron(10 0 * * ? *)",
        use_case: "일일 리포트",
      },
    ],
    process: [
      {
        step: "데이터 수집",
        description: "최근 시간 윈도우 내 통신 로그 수집",
        details: [
          "디바이스별 마지막 통신 시간 확인",
          "실패/성공 이벤트 집계",
          "네트워크 품질 지표 수집",
          "에러 코드별 분류",
        ],
      },
      {
        step: "이상 감지",
        description: "임계값 기반 문제 탐지",
        details: [
          "연속 미수신 임계값 검사",
          "응답 시간 SLA 위반 확인",
          "에러율 증가 패턴 분석",
          "지역별 이상 현상 탐지",
        ],
      },
      {
        step: "근본 원인 분석",
        description: "문제 원인 자동 분석",
        details: [
          "네트워크 경로 추적",
          "서버 리소스 상태 확인",
          "디바이스 상태 진단",
          "외부 요인 분석",
        ],
      },
      {
        step: "자동 대응",
        description: "감지된 문제에 대한 자동 처리",
        details: [
          "재연결 명령 발송",
          "설정 자동 복구",
          "알림 발송",
          "티켓 자동 생성",
        ],
      },
    ],
  };

  const ruleTypes = [
    {
      name: "Threshold",
      description: "임계값 기반",
      example: "온도 ≥ 80°C 3분 연속",
      icon: "🌡️",
      color: "bg-red-100 text-red-700",
    },
    {
      name: "Pattern",
      description: "패턴 기반",
      example: "5분 내 오류 3회",
      icon: "🔍",
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: "Trend",
      description: "추세 기반",
      example: "10분 연속 상승",
      icon: "📈",
      color: "bg-green-100 text-green-700",
    },
    {
      name: "Correlation",
      description: "상관관계 기반",
      example: "진동↑ + 온도↑ + 특정 로그 발생",
      icon: "🔗",
      color: "bg-purple-100 text-purple-700",
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: "Hot/Curated 스트림",
      icon: Zap,
      description: "실시간 ���이터 스트림 처리",
    },
    {
      step: "2",
      title: "룰 엔진 적용",
      icon: BarChart3,
      description: "4가지 룰 타입 검증",
    },
    {
      step: "3",
      title: "Event 생성",
      icon: Bell,
      description: "DynamoDB + S3 기록",
    },
    {
      step: "4",
      title: "알림 발송",
      icon: Target,
      description: "Multi-channel 알림",
    },
  ];

  const streamingArchitecture = [
    {
      layer: "실시간 스트림",
      components: [
        "Kinesis Data Streams",
        "Kinesis Analytics",
        "Lambda 실시간 처리",
      ],
      purpose: "즉시 알림 및 긴급 대응",
      latency: "1초 미만",
      icon: Activity,
      color: "text-red-500 bg-red-50 border-red-200",
    },
    {
      layer: "배치 처리",
      components: ["EMR", "Glue ETL", "Step Functions"],
      purpose: "안정적 분석 및 리포트",
      latency: "5-15분",
      icon: Layers,
      color: "text-blue-500 bg-blue-50 border-blue-200",
    },
  ];

  const dataStorageStrategy = [
    {
      tier: "Hot Data",
      database: "DocumentDB",
      purpose: "실시간 이벤트 저장 (최근 7일)",
      structure: "JSON 기반 스키마리스",
      features: [
        "빠른 쓰기 성능",
        "복잡한 이벤트 구조",
        "실시간 쿼리",
        "즉시 알림 처리",
      ],
      retention: "7일",
      access: "즉시 접근",
      icon: Database,
      color: "text-red-600",
      bgColor: "bg-red-50 border-red-200",
    },
    {
      tier: "Warm Data",
      database: "RDS (PostgreSQL)",
      purpose: "기초 정보 데이터 (업체/고객/사용자/사이트/장비 정보) + 분석 집계 결과",
      structure: "정규화된 관계형",
      features: [
        "기초 정보(마스터 데이터) 관리",
        "복잡한 분석 쿼리",
        "집계 성능",
        "히스토리 트렌드",
        "대시보드 지원",
      ],
      retention: "상시 유지 (기초 정보) / 3년 (집계 결과)",
      access: "고속 쿼리",
      icon: BarChart3,
      color: "text-blue-600",
      bgColor: "bg-blue-50 border-blue-200",
    },
    {
      tier: "Cold Data",
      database: "S3 + Glue + Athena",
      purpose: "장기 보관 저장소 (3개월 이후)",
      structure: "Parquet 컬럼형 저장",
      features: [
        "비용 효율적 저장",
        "대용량 분석",
        "규정 준수",
        "아카이브",
      ],
      retention: "무제한",
      access: "분석 시 조회",
      icon: Archive,
      color: "text-gray-600",
      bgColor: "bg-gray-50 border-gray-200",
    },
  ];

  const coldDataArchitecture = [
    {
      component: "S3 + Apache Iceberg",
      description: "Iceberg 테이블 형식 저장",
      features: [
        "ACID 트랜잭션 보장",
        "스키마 진화 및 파티션 진화",
        "시간 여행 쿼리 지원",
        "파티션 프루닝 최적화",
      ],
      icon: Cloud,
      color: "text-blue-600",
    },
    {
      component: "AWS Glue",
      description: "ETL 및 Iceberg 카탈로그 관리",
      features: [
        "Hot/Warm → Iceberg 테이블 전환",
        "Iceberg 카탈로그 관리",
        "데이터 품질 검증",
        "Iceberg 최적화 작업 (Compaction)",
      ],
      icon: GitBranch,
      color: "text-green-600",
    },
    {
      component: "Amazon Athena",
      description: "서버리스 SQL 분석 엔진",
      features: [
        "Iceberg 테이블 SQL 쿼리",
        "대용량 히스토리 분석",
        "시간 여행 쿼리 (Time Travel)",
        "BI 도구 연동 (QuickSight 등)",
      ],
      icon: Search,
      color: "text-purple-600",
    },
  ];

  const dataLifecycle = [
    {
      stage: "실시간 수집",
      period: "0~7일",
      storage: "DocumentDB",
      purpose: "즉시 알림 및 대응",
      cost: "높음",
      performance: "최고",
      icon: Activity,
      color: "text-red-500",
    },
    {
      stage: "기초 정보 + 분석",
      period: "상시 유지",
      storage: "RDS",
      purpose: "기초 정보(마스터 데이터) 관리 + 대시보드 및 리포트 집계 결과",
      cost: "중간",
      performance: "높음",
      icon: BarChart3,
      color: "text-blue-500",
    },
    {
      stage: "장기 보관",
      period: "3개월 이후",
      storage: "S3 + Iceberg + Athena",
      purpose: "규정 준수 및 히스토리 분석 (Iceberg 테이블 형식)",
      cost: "낮음",
      performance: "분석 시",
      icon: Archive,
      color: "text-gray-500",
    },
  ];

  const alertProcessing = [
    {
      stage: "알림 수신 & 분류",
      description: "다중 채널 알림 통합 관리 및 처리 방식 결정",
      actions: [
        "채널별 라우팅",
        "중복 제거",
        "우선순위 설정",
        "처리 방식 분류",
      ],
      icon: Bell,
      color: "text-orange-500",
    },
    {
      stage: "자동 디바이스 처리",
      description: "디바이스 내장 로직으로 자체 해결",
      actions: [
        "로컬 재시작",
        "캐시 클리어",
        "설정 복구",
        "자가 진단",
      ],
      icon: Settings,
      color: "text-green-500",
    },
    {
      stage: "원격 제어 처리",
      description: "Shadow 기반 원격 명령으로 해결",
      actions: [
        "원격 재부팅",
        "설정 변경",
        "펌웨어 패치",
        "OTA 업데이트",
      ],
      icon: Activity,
      color: "text-blue-500",
    },
    {
      stage: "서비스 기사 출동",
      description: "물리적 개입이 필요한 경우 (최소화 목표)",
      actions: [
        "현장 진단",
        "부품 교체",
        "물리적 수리",
        "제품 회수",
      ],
      icon: Users,
      color: "text-red-500",
    },
  ];

  const otaSystem = [
    {
      category: "Shadow 그룹 관리",
      description: "안전한 OTA 배포를 위한 그룹 기반 관리",
      features: [
        "디바이스 그룹 분류 (모델, 펌웨어 버전, 지역)",
        "Canary 배포용 테스트 그룹",
        "단계별 배포 스케줄링",
        "그룹별 롤백 정책",
      ],
      icon: Layers,
      color: "text-blue-600",
    },
    {
      category: "Job 관리 시스템",
      description: "안정적인 OTA Job 생성 및 실행",
      features: [
        "Job 템플릿 관리",
        "배포 시나리오 설정",
        "실행 조건 검증",
        "진행률 추적",
      ],
      icon: GitBranch,
      color: "text-green-600",
    },
    {
      category: "제품 레벨 롤백",
      description: "디바이스에서 직접 이전 버전으로 복구",
      features: [
        "이전 펌웨어 버전 보관",
        "부팅시 버전 검증",
        "자동 롤백 트리거",
        "안전 모드 진입",
      ],
      icon: CheckCircle2,
      color: "text-purple-600",
    },
    {
      category: "서버 레벨 롤백",
      description:
        "런타임 오류 해결을 위한 서버 차원 대량 롤백",
      features: [
        "배포 히스토리 관리",
        "일괄 롤백 명령",
        "영향 범위 분석",
        "비상 중단 스위치",
      ],
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ];

  const analysisTypes = [
    {
      category: "제품별 분석",
      items: [
        "불량 패턴 분석",
        "펌웨어/모델별 성능 비교",
        "Cohort 분석 (버전별 수명)",
        "Top-N 결함 리스트",
      ],
      icon: "🔧",
      color: "border-blue-200 bg-blue-50",
    },
    {
      category: "고객별 분석",
      items: [
        "서비스 수준 협약 위반 현황",
        "알람 건수 및 유형",
        "평균 복구 시간 추적",
        "고객사별 리포트 자동 생성",
      ],
      icon: "👥",
      color: "border-green-200 bg-green-50",
    },
    {
      category: "문제점 확인",
      items: [
        "Top-N 리스트 자동 생성",
        "근본 원인 분석 리포트",
        "재발 패턴 분석",
        "예방 조치 추천",
      ],
      icon: "🔍",
      color: "border-purple-200 bg-purple-50",
    },
  ];

  const channels = [
    {
      name: "CloudWatch",
      icon: "☁️",
      description: "AWS 네이티브 모니터링",
    },
    { name: "SNS", icon: "📧", description: "SMS/Email 알림" },
    { name: "Slack", icon: "💬", description: "팀 채널 알림" },
    {
      name: "티켓 시스템",
      icon: "🎫",
      description: "자동 티켓 발행",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="mb-2 text-orange-600">
          🟠 Frame 4. 이벤트 모니터링 & 알림 처리
        </h2>
        <p className="text-muted-foreground">
          실시간 스트림과 배치 처리를 통한 종합적 이벤트
          모니터링 및 자동화된 알림 처리 시스템
        </p>
      </div>

      <Tabs defaultValue="architecture" className="w-full">
        {/* ▶ 카드형(타일) 탭 헤더 */}
        <TabsList className="w-full h-auto p-1 bg-muted/30 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1 sm:gap-2 mb-4 sm:mb-6">
          {[
            {
              key: "architecture",
              label: "아키텍처",
              Icon: GitBranch,
            },
            { key: "rules", label: "모니터링 룰", Icon: Target },
            {
              key: "communication",
              label: "통신오류",
              Icon: Signal,
            },
            {
              key: "storage",
              label: "데이터 저장",
              Icon: HardDrive,
            },
            {
              key: "processing",
              label: "알림 처리",
              Icon: Settings2,
            },
            { key: "analysis", label: "분석 영역", Icon: BarChart3 },
          ].map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className={[
                "w-full min-h-[44px] sm:min-h-[52px] h-auto",
                "inline-flex flex-col items-center justify-center",
                "rounded-lg px-1 py-2 sm:px-2 sm:py-3 text-xs md:text-sm",
                "transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200",
                // ✅ active 상태
                "data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700",
                "data-[state=active]:border data-[state=active]:border-blue-300",
                "data-[state=active]:ring-1 data-[state=active]:ring-blue-100",
                // ✅ inactive 상태
                "data-[state=inactive]:bg-white/40 data-[state=inactive]:text-slate-700",
                "data-[state=inactive]:border data-[state=inactive]:border-transparent",
                // ✅ hover 시 더 밝게 (확실히 하얗게)
                "hover:data-[state=inactive]:bg-white/80 hover:data-[state=inactive]:shadow-sm",
              ].join(" ")}
            >
              <tab.Icon className="h-6 w-6 sm:h-7 sm:w-7 mb-1 flex-shrink-0" strokeWidth={2.5} />
              <span className="leading-tight text-center text-xs sm:text-sm whitespace-nowrap">
                {tab.label}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="architecture" className="space-y-6">
          {/* Streaming vs Batch Architecture */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-blue-500" />
                실시간 스트림 + 배치 처리 아키텍처
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {streamingArchitecture.map((arch, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-lg border-2 ${arch.color}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <arch.icon
                        className={`h-8 w-8 ${arch.color.split(" ")[0]} flex-shrink-0`}
                        strokeWidth={2.5}
                      />
                      <div>
                        <h3 className="font-medium text-lg">
                          {arch.layer}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {arch.purpose}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <Badge variant="outline">
                          {arch.latency}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-2">
                      {arch.components.map(
                        (component, compIndex) => (
                          <div
                            key={compIndex}
                            className="bg-white/50 px-3 py-2 rounded text-sm"
                          >
                            {component}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Process Flow */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-500" />
                모니터링 프로세스 플로우
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                {processSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="relative mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <step.icon className="h-6 w-6 text-blue-600 flex-shrink-0" strokeWidth={2.5} />
                      </div>
                      <div className="absolute -top-1 -left-1 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {step.step}
                      </div>
                      {index < processSteps.length - 1 && (
                        <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-blue-200 -translate-y-0.5"></div>
                      )}
                    </div>
                    <h3 className="font-medium text-sm mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AWS 서비스별 경보 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-blue-500" />
                AWS 서비스별 경보 정보
              </CardTitle>
              <CardDescription>
                문제가 있는 서비스부터 정렬 (문제 많은 순 → 정상 모니터링 순)
                <br />
                <span className="text-xs text-muted-foreground">
                  서버에서 5분 간격으로 자동 갱신
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">서비스</TableHead>
                      <TableHead>설명</TableHead>
                      <TableHead className="text-center">경보 수</TableHead>
                      <TableHead className="text-center">상태</TableHead>
                      <TableHead className="text-center">모니터링</TableHead>
                      <TableHead>이슈</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedAwsServices.map((service, index) => {
                      const getStatusBadge = (status: string) => {
                        switch (status) {
                          case "문제":
                            return <Badge className="bg-red-100 text-red-700 border-red-300">문제</Badge>;
                          case "주의":
                            return <Badge className="bg-orange-100 text-orange-700 border-orange-300">주의</Badge>;
                          case "정상":
                            return <Badge className="bg-green-100 text-green-700 border-green-300">정상</Badge>;
                          default:
                            return <Badge variant="outline">{status}</Badge>;
                        }
                      };

                      const getMonitoringBadge = (monitoring: string) => {
                        if (monitoring === "부족") {
                          return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">부족</Badge>;
                        }
                        return <Badge className="bg-green-100 text-green-700 border-green-300">정상</Badge>;
                      };

                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {service.service}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {service.description}
                          </TableCell>
                          <TableCell className="text-center">
                            {service.alerts > 0 ? (
                              <span className="font-semibold text-red-600">{service.alerts}</span>
                            ) : (
                              <span className="text-muted-foreground">0</span>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {getStatusBadge(service.status)}
                          </TableCell>
                          <TableCell className="text-center">
                            {getMonitoringBadge(service.monitoring)}
                          </TableCell>
                          <TableCell>
                            {service.issues.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {service.issues.map((issue, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {issue}
                                  </Badge>
                                ))}
                              </div>
                            ) : (
                              <span className="text-sm text-muted-foreground">-</span>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>💡 "부족" 표시 기준:</strong> 경보 설정이 없거나, 모니터링 메트릭이 충분하지 않을 때 표시됩니다.
                  <br />
                  예: EventBridge, SNS 등 경보 알람이 설정되지 않은 서비스
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="communication"
          className="space-y-6"
        >
          {/* Communication Error Types */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <WifiOff className="h-5 w-5 text-red-500" />
                통신오류 유형별 모니터링
              </CardTitle>
              <CardDescription>
                실시간 누락 보완을 위한 체계적인 통신오류 감지
                및 분석
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {communicationErrors.map((error, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-lg border-2 ${error.bgColor}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <error.icon
                        className={`h-8 w-8 ${error.color} flex-shrink-0`}
                        strokeWidth={2.5}
                      />
                      <div>
                        <h3 className="font-medium text-lg">
                          {error.category}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {error.description}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <Badge variant="outline">
                          {error.metrics.alert}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <h4 className="font-medium text-sm mb-3 text-red-700">
                          🚨 주요 원인
                        </h4>
                        <div className="space-y-2">
                          {error.causes.map(
                            (cause, causeIndex) => (
                              <div
                                key={causeIndex}
                                className="flex items-start gap-2 text-sm"
                              >
                                <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                                {cause}
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-3 text-blue-700">
                          📊 모니터링 지표
                        </h4>
                        <div className="space-y-2">
                          {error.monitoring.map(
                            (monitor, monitorIndex) => (
                              <div
                                key={monitorIndex}
                                className="flex items-start gap-2 text-sm"
                              >
                                <BarChart3 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                {monitor}
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 p-4 bg-white/50 rounded-lg">
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">
                          임계값
                        </div>
                        <div className="font-medium text-sm">
                          {error.metrics.threshold}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">
                          확대 조건
                        </div>
                        <div className="font-medium text-sm">
                          {error.metrics.escalation}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">
                          알림 수준
                        </div>
                        <Badge variant="outline">
                          {error.metrics.alert}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Communication Analysis System */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                통신오류 분석 시스템
              </CardTitle>
              <CardDescription>
                실시간 모니터링과 배치 분석을 통한 종합적 통신
                품질 관리
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {communicationAnalysis.map(
                  (analysis, index) => (
                    <div
                      key={index}
                      className="p-6 border rounded-lg"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <analysis.icon
                          className={`h-8 w-8 ${analysis.color} flex-shrink-0`}
                          strokeWidth={2.5}
                        />
                        <div>
                          <h3 className="font-medium text-lg">
                            {analysis.type}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {analysis.description}
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium text-sm mb-3">
                          🔧 구성 요소
                        </h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {analysis.components.map(
                            (component, compIndex) => (
                              <div
                                key={compIndex}
                                className="flex items-start gap-2 text-sm bg-slate-50 px-3 py-2 rounded"
                              >
                                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                {component}
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm mb-2">
                          🛠️ 사용 도구
                        </h4>
                        <div className="flex gap-2">
                          {analysis.tools.map(
                            (tool, toolIndex) => (
                              <Badge
                                key={toolIndex}
                                variant="secondary"
                              >
                                {tool}
                              </Badge>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>

          {/* Communication Response Strategy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-500" />
                통신오류 대응 전략
              </CardTitle>
              <CardDescription>
                4단계 자동화된 대응 체계로 서비스 연속성 보장
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {communicationResponse.map(
                  (response, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start gap-4 p-4 border rounded-lg">
                        <response.icon
                          className={`h-8 w-8 ${response.color} flex-shrink-0 mt-1`}
                          strokeWidth={2.5}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium">
                              {response.level}
                            </h3>
                            <Badge variant="outline">
                              {response.automation}
                            </Badge>
                          </div>
                          <div className="grid md:grid-cols-2 gap-2">
                            {response.actions.map(
                              (action, actionIndex) => (
                                <div
                                  key={actionIndex}
                                  className="flex items-start gap-2 text-sm bg-slate-50 px-3 py-2 rounded"
                                >
                                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                  {action}
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                      {index <
                        communicationResponse.length - 1 && (
                        <div className="flex justify-center mt-2 mb-2">
                          <div className="w-0.5 h-8 bg-gray-200"></div>
                        </div>
                      )}
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>

          {/* Batch Communication Check */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-500" />
                배치 통신오류 점검 시스템
              </CardTitle>
              <CardDescription>
                시간별 배치 점검으로 실시간 누락 보완 및 패턴
                분석
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Schedule Options */}
                <div>
                  <h4 className="font-medium text-sm mb-3">
                    ⏰ 점검 주기 설정
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {batchCommCheck.schedule.map(
                      (schedule, index) => (
                        <div
                          key={index}
                          className="p-4 border rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium">
                              {schedule.interval}
                            </h5>
                            <Badge variant="outline">
                              {schedule.use_case}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {schedule.description}
                          </p>
                          <code className="text-xs bg-slate-100 px-2 py-1 rounded">
                            {schedule.cron}
                          </code>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Process Flow */}
                <div>
                  <h4 className="font-medium text-sm mb-3">
                    🔄 점검 프로세스
                  </h4>
                  <div className="space-y-4">
                    {batchCommCheck.process.map(
                      (process, index) => (
                        <div key={index} className="relative">
                          <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium text-sm flex-shrink-0">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium mb-2">
                                {process.step}
                              </h5>
                              <p className="text-sm text-muted-foreground mb-3">
                                {process.description}
                              </p>
                              <div className="grid md:grid-cols-2 gap-2">
                                {process.details.map(
                                  (detail, detailIndex) => (
                                    <div
                                      key={detailIndex}
                                      className="flex items-start gap-2 text-sm"
                                    >
                                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                      {detail}
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>
                          {index <
                            batchCommCheck.process.length -
                              1 && (
                            <div className="flex justify-center mt-2 mb-2">
                              <div className="w-0.5 h-6 bg-purple-200"></div>
                            </div>
                          )}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Communication Quality Metrics */}
          <Card className="border-2 border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Target className="h-5 w-5" />
                통신 품질 목표 지표
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Wifi className="h-6 w-6 text-green-500" />
                    <div className="text-2xl text-green-500">
                      99.5%
                    </div>
                  </div>
                  <div className="font-medium text-green-700">
                    연결 성공률
                  </div>
                  <div className="text-sm text-muted-foreground">
                    목표 지표
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="h-6 w-6 text-blue-500" />
                    <div className="text-2xl text-blue-500">
                      &lt;3초
                    </div>
                  </div>
                  <div className="font-medium text-blue-700">
                    평균 응답시간
                  </div>
                  <div className="text-sm text-muted-foreground">
                    SLA 기준
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <AlertTriangle className="h-6 w-6 text-orange-500" />
                    <div className="text-2xl text-orange-500">
                      &lt;0.1%
                    </div>
                  </div>
                  <div className="font-medium text-orange-700">
                    메시지 손실률
                  </div>
                  <div className="text-sm text-muted-foreground">
                    품질 기준
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Router className="h-6 w-6 text-purple-500" />
                    <div className="text-2xl text-purple-500">
                      &lt;30초
                    </div>
                  </div>
                  <div className="font-medium text-purple-700">
                    재연결 시간
                  </div>
                  <div className="text-sm text-muted-foreground">
                    복구 목표
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-6">
          {/* Rule Types */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-orange-500" />
                모니터링 룰 유형
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {ruleTypes.map((rule, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`p-2 rounded-full ${rule.color}`}
                      >
                        <span className="text-lg">
                          {rule.icon}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {rule.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {rule.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm bg-slate-50 p-3 rounded-md">
                      <strong>예시:</strong> {rule.example}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notification Channels */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-green-500" />
                알림 채널
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                {channels.map((channel, index) => (
                  <div
                    key={index}
                    className="text-center p-4 border rounded-lg"
                  >
                    <div className="text-2xl mb-2">
                      {channel.icon}
                    </div>
                    <h3 className="font-medium text-sm mb-1">
                      {channel.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {channel.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="space-y-6">
          {/* Hot/Warm/Cold Data Storage Strategy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-purple-500" />
                Hot/Warm/Cold 데이터 저장 전략
              </CardTitle>
              <CardDescription>
                데이터 생명주기에 따른 계층화된 저장 및 비용
                최적화
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {dataStorageStrategy.map((tier, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-lg border-2 ${tier.bgColor}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <tier.icon
                          className={`h-8 w-8 ${tier.color} flex-shrink-0`}
                          strokeWidth={2.5}
                        />
                        <div>
                          <h3 className="font-medium text-lg">
                            {tier.tier}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {tier.database}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant="outline"
                          className="mb-1"
                        >
                          {tier.retention}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          {tier.access}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm mb-3">
                      {tier.purpose}
                    </p>
                    <Badge variant="secondary" className="mb-3">
                      {tier.structure}
                    </Badge>
                    <div className="grid md:grid-cols-4 gap-2">
                      {tier.features.map(
                        (feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center gap-2 bg-white/70 px-3 py-2 rounded text-sm"
                          >
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cold Data Architecture */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="h-5 w-5 text-gray-500" />
                콜드 데이터 아키텍처 (S3 + Iceberg + Athena)
              </CardTitle>
              <CardDescription>
                장기 보관 데이터의 효율적 관리 및 분석 시스템
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {coldDataArchitecture.map((comp, index) => (
                  <div
                    key={index}
                    className="p-6 border rounded-lg"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <comp.icon
                        className={`h-8 w-8 ${comp.color} flex-shrink-0`}
                        strokeWidth={2.5}
                      />
                      <div>
                        <h3 className="font-medium text-lg">
                          {comp.component}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {comp.description}
                        </p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2">
                      {comp.features.map(
                        (feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded text-sm"
                          >
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data Lifecycle */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-blue-500" />
                데이터 생명주기 관리
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataLifecycle.map((stage, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg"
                  >
                    <stage.icon
                      className={`h-6 w-6 ${stage.color}`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="font-medium">
                          {stage.stage}
                        </div>
                        <Badge variant="outline">
                          {stage.period}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stage.storage} - {stage.purpose}
                      </div>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      <div>비용: {stage.cost}</div>
                      <div>성능: {stage.performance}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data Flow with Archiving */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-blue-500" />
                데이터 흐름 및 아카이빙
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg">
                  <Activity className="h-6 w-6 text-red-600" />
                  <div className="flex-1">
                    <div className="font-medium">
                      실시간 Hot 데이터
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Kinesis → Lambda → DocumentDB (즉시
                      알림용)
                    </div>
                  </div>
                  <Badge>1초 미만</Badge>
                </div>
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                  <div className="flex-1">
                    <div className="font-medium">
                      Warm 데이터 변환
                    </div>
                    <div className="text-sm text-muted-foreground">
                      DocumentDB 원데이터 → ETL → RDS 집계 결과 저장 (기초 정보는 RDS에 상시 유지)
                    </div>
                  </div>
                  <Badge>5-15분</Badge>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <Archive className="h-6 w-6 text-gray-600" />
                  <div className="flex-1">
                    <div className="font-medium">
                      Cold 데이터 아카이빙
                    </div>
                    <div className="text-sm text-muted-foreground">
                      S3 Raw 원데이터 → Glue ETL → S3 Iceberg (원데이터 장기 보관, 기초 정보는 RDS 유지)
                    </div>
                  </div>
                  <Badge>일일 배치</Badge>
                </div>
                <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                  <Search className="h-6 w-6 text-purple-600" />
                  <div className="flex-1">
                    <div className="font-medium">
                      히스토리 분석
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Athena → S3 Iceberg 테이블 대용량 분석 및 규정
                      준수
                    </div>
                  </div>
                  <Badge>필요 시</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost Optimization */}
          <Card className="border-2 border-green-200 bg-green-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Target className="h-5 w-5" />
                비용 최적화 효과
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Archive className="h-6 w-6 text-blue-500" />
                    <div className="text-2xl text-blue-500">
                      80%↓
                    </div>
                  </div>
                  <div className="font-medium text-blue-700">
                    스토리지 비용
                  </div>
                  <div className="text-sm text-muted-foreground">
                    S3 + Iceberg 최적화
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Search className="h-6 w-6 text-purple-500" />
                    <div className="text-2xl text-purple-500">
                      무제한
                    </div>
                  </div>
                  <div className="font-medium text-purple-700">
                    히스토리 분석
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Athena 서버리스
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                    <div className="text-2xl text-green-500">
                      자동화
                    </div>
                  </div>
                  <div className="font-medium text-green-700">
                    데이터 관리
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Lifecycle 정책
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processing" className="space-y-6">
          {/* Alert Processing Workflow */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                알림 처리 워크플로우 - 3단계 대응 체계
              </CardTitle>
              <CardDescription>
                서비스 기사 출동 및 제품 회수를 최소화하는
                자동화된 처리 시스템
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {alertProcessing.map((stage, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-start gap-4 p-4 border rounded-lg">
                      <div
                        className={`p-3 rounded-full bg-slate-100`}
                      >
                        <stage.icon
                          className={`h-6 w-6 ${stage.color}`}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-2">
                          {stage.stage}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {stage.description}
                        </p>
                        <div className="grid md:grid-cols-4 gap-2">
                          {stage.actions.map(
                            (action, actionIndex) => (
                              <div
                                key={actionIndex}
                                className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded text-sm"
                              >
                                <Play className="h-3 w-3 text-gray-400" />
                                {action}
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                    {index < alertProcessing.length - 1 && (
                      <div className="flex justify-center mt-2 mb-2">
                        <div className="w-0.5 h-8 bg-gray-200"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* OTA System Architecture */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-500" />
                안정적 OTA 시스템 & 롤백 관리
              </CardTitle>
              <CardDescription>
                Shadow 그룹 기반 안전한 배포와 2단계 롤백 시스템
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {otaSystem.map((system, index) => (
                  <div
                    key={index}
                    className="p-6 border rounded-lg"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <system.icon
                        className={`h-6 w-6 ${system.color}`}
                      />
                      <div>
                        <h3 className="font-medium text-lg">
                          {system.category}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {system.description}
                        </p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2">
                      {system.features.map(
                        (feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded text-sm"
                          >
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Success Metrics */}
          <Card className="border-2 border-green-200 bg-green-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Target className="h-5 w-5" />
                OTA 시스템 목표 성과
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Users className="h-6 w-6 text-red-500" />
                    <div className="text-2xl text-red-500">
                      70%↓
                    </div>
                  </div>
                  <div className="font-medium text-red-700">
                    서비스 기사 출동
                  </div>
                  <div className="text-sm text-muted-foreground">
                    원격 해결률 증가
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Settings className="h-6 w-6 text-blue-500" />
                    <div className="text-2xl text-blue-500">
                      98%
                    </div>
                  </div>
                  <div className="font-medium text-blue-700">
                    OTA 배포 성공률
                  </div>
                  <div className="text-sm text-muted-foreground">
                    그룹 기반 안전 배포
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="h-6 w-6 text-green-500" />
                    <div className="text-2xl text-green-500">
                      5분
                    </div>
                  </div>
                  <div className="font-medium text-green-700">
                    평균 롤백 시간
                  </div>
                  <div className="text-sm text-muted-foreground">
                    서버 차원 일괄 처리
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp className="h-6 w-6 text-purple-500" />
                    <div className="text-2xl text-purple-500">
                      85%↓
                    </div>
                  </div>
                  <div className="font-medium text-purple-700">
                    제품 회수율
                  </div>
                  <div className="text-sm text-muted-foreground">
                    원격 복구 성공
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {/* Analysis Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                분석 영역
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {analysisTypes.map((analysis, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-lg border-2 ${analysis.color}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">
                        {analysis.icon}
                      </span>
                      <h3 className="font-medium text-lg">
                        {analysis.category}
                      </h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2">
                      {analysis.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex items-center gap-2 text-sm bg-white/50 px-3 py-2 rounded"
                        >
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Expected Improvements */}
          <Card className="border-2 border-orange-200 bg-orange-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <Target className="h-5 w-5" />
                예상 개선 효과
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                    <div className="text-2xl text-red-500">
                      30%↓
                    </div>
                  </div>
                  <div className="font-medium text-red-700">
                    알람 오탐률
                  </div>
                  <div className="text-sm text-muted-foreground">
                    룰 정확도 향상
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="h-6 w-6 text-blue-500" />
                    <div className="text-2xl text-blue-500">
                      40%↓
                    </div>
                  </div>
                  <div className="font-medium text-blue-700">
                    Hot→Warm TTR
                  </div>
                  <div className="text-sm text-muted-foreground">
                    빠른 이벤트 감지
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                    <div className="text-2xl text-green-500">
                      30-40%↓
                    </div>
                  </div>
                  <div className="font-medium text-green-700">
                    평균 복구 시간
                  </div>
                  <div className="text-sm text-muted-foreground">
                    자동 근본 원인 분석
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}