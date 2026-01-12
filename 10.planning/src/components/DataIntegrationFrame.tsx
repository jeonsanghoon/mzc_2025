import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import {
  Cloud,
  Database,
  Zap,
  Archive,
  Shield,
  RefreshCw,
  HardDrive,
  Snowflake,
  TrendingDown,
  Layers,
  BarChart3,
  Link as LinkIcon,
  CheckCircle2,
  Target,
  Clock,
  GitBranch,
  Lock,
  Settings2,
} from "lucide-react";

export function DataIntegrationFrame() {
  // 1) 통합 과제
  const integrationChallenges = [
    {
      problem:
        "관계형데이터베이스/NoSQL/파일/사물인터넷 분산으로 통합 불가",
      currentState: "각 시스템별 개별 관리",
      solution: "통합 데이터레이크 + 표준 스키마 적용",
      implementation: [
        "7개 도메인 통합 스키마 설계",
        "데이터 계약서 기반 스키마 검증",
        "S3 3계층(Raw/Standardized/Curated) 구축",
        "실시간 스키마 변화 감지 및 알림",
      ],
      benefits: [
        "데이터 신뢰도 85% 향상",
        "분석 시간 60% 단축",
        "데이터 품질 자동 검증",
        "단일 진실원천 확보",
      ],
      icon: Database,
      color: "text-blue-600",
    },
    {
      problem: "실시간은 일부만 필요하지만 무분별 수집",
      currentState: "모든 데이터를 실시간으로 처리",
      solution: "우선순위 기반 선택적 실시간 처리",
      implementation: [
        "Hot/Warm/Cold 계층 기반 라이프사이클",
        "알림/제어용 데이터만 실시간 처리",
        "분석용 데이터는 배치로 비용 최적화",
        "자동 티어링 정책 적용",
      ],
      benefits: [
        "처리 비용 60% 절감",
        "시스템 안정성 향상",
        "필요한 곳에만 실시간 제공",
        "인프라 복잡도 감소",
      ],
      icon: Zap,
      color: "text-orange-600",
    },
    {
      problem: "표준 스키마, 시간대, 단위, ID 불일치",
      currentState: "시스템별 다른 형식과 단위",
      solution: "Data Contract + 자동 변환 파이프라인",
      implementation: [
        "표준 시간대(UTC) 통일",
        "측정 단위 자동 변환",
        "글로벌 ID 체계 구축",
        "스키마 진화 관리",
      ],
      benefits: [
        "데이터 일관성 100% 확보",
        "크로스 시스템 분석 가능",
        "데이터 품질 실시간 모니터링",
        "분석 신뢰도 대폭 향상",
      ],
      icon: RefreshCw,
      color: "text-green-600",
    },
  ];

  // 2) 품질 프레임워크
  const dataQualityFramework = [
    {
      category: "스키마 검증",
      rules: [
        "필수 필드 존재 검증",
        "데이터 타입 일치 확인",
        "포맷 규칙 준수 검사",
        "스키마 버전 호환성 검증",
      ],
      automation: "실시간 검증 + 자동 알림",
      icon: CheckCircle2,
      color: "text-blue-600",
    },
    {
      category: "데이터 무결성",
      rules: [
        "참조 무결성 검사",
        "중복 데이터 탐지",
        "NULL 값 패턴 분석",
        "이상치 자동 감지",
      ],
      automation: "배치 검증 + 리포트 생성",
      icon: Shield,
      color: "text-green-600",
    },
    {
      category: "비즈니스 룰",
      rules: [
        "업종별 유효성 검사",
        "시간 순서 논리 검증",
        "측정값 범위 확인",
        "상관관계 규칙 검사",
      ],
      automation: "ML 기반 이상 탐지",
      icon: Target,
      color: "text-purple-600",
    },
  ];

  // 3) 수집 경로
  const collectionPaths = [
    {
      name: "CDC",
      frequency: "분/시간",
      description: "운영 DB 변경분",
      icon: RefreshCw,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      name: "배치",
      frequency: "일/주",
      description: "파일/로그/CSV 대량 적재",
      icon: Archive,
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      name: "실시간",
      frequency: "일부",
      description: "IoT Core → Kinesis → Lambda",
      icon: Zap,
      color: "text-orange-500",
      bgColor: "bg-orange-100",
    },
  ];

  // 4) S3 레이어
  const s3Layers = [
    {
      name: "Raw",
      description: "원본 착륙",
      icon: "📥",
      details: [
        "원본 데이터 보관",
        "CDC, 배치, 실시간 데이터",
        "압축 저장",
      ],
      color: "border-blue-200 bg-blue-50",
    },
    {
      name: "Standardized",
      description: "표준화/정합 (Iceberg)",
      icon: "🔄",
      details: [
        "통합 스키마 적용",
        "DQ Rule 검증",
        "Iceberg Table",
      ],
      color: "border-green-200 bg-green-50",
    },
    {
      name: "Curated",
      description: "집계/데이터 제품 (Iceberg)",
      icon: "📊",
      details: [
        "1m/10m/1h 집계",
        "BI/Analytics 최적화",
        "Partitioning",
      ],
      color: "border-purple-200 bg-purple-50",
    },
  ];

  // 5) 소비 레이어
  const consumptionLayers = [
    {
      name: "Hot",
      storage: "DynamoDB / OpenSearch",
      useCase: "실시간 알람, Shadow 큐, 최근 측정 데이터",
      icon: Zap,
      color: "text-red-500",
    },
    {
      name: "Warm",
      storage: "RDS PostgreSQL",
      useCase: "기초 정보 데이터 (업체/고객/사용자/사이트/장비 정보) + 분석 집계 결과",
      icon: Database,
      color: "text-orange-500",
    },
    {
      name: "Cold",
      storage: "S3 + Apache Iceberg + Athena",
      useCase: "원데이터 장기 보관, 규제 대응, 히스토리 분석",
      icon: Archive,
      color: "text-blue-500",
    },
  ];

  const governance = [
    "Lake Formation LF-Tag 기반 권한 관리",
    "KMS 암호화 및 데이터 보안",
    "CloudTrail 감사 로그",
    "DQ Rule Engine 자동 검증",
    "S3 Lifecycle 정책 자동 관리",
    "Iceberg Optimize/Compaction 스케줄링",
  ];

  const methodology = [
    "원데이터 수집: IoT/센서/측정 데이터는 S3 Raw Layer로 직접 수집 (RDBMS/NoSQL/File/IoT)",
    "기초 정보 관리: 업체/고객/사용자/사이트/장비 정보는 RDS에 저장 (마스터 데이터)",
    "데이터 통합: 원데이터 처리 시 RDS의 기초 정보를 참조하여 데이터 보강 및 해석",
    "S3 Raw에 원데이터 전량 보존(append-only)으로 단일 진실원장 확보",
    "Standardized에서 스키마 표준화/기초 정보 조인/마스킹/DQ 검증, Curated에서 집계·서빙 최적화",
    "분석 결과(집계·지표)는 RDS에 최소 3년 보관, 원데이터는 S3 Raw에서 Cold(Iceberg)로 순차 이관",
    "멱등키(source, table, tx_id, seq)로 중복 제거, Raw 재생(replay)로 재처리 가능",
    "비용/성능: 파티션·파일 크기 정책, Iceberg Optimize, Lifecycle로 티어링",
  ];

  const ingestOptions = [
    {
      title: "네이티브 CDC",
      pros: [
        "애플리케이션 영향 최소",
        "삭제/갱신 이력 추적 용이",
        "대용량 안정",
      ],
      cons: ["에디션/라이선스 제약", "보안/네트워크 세팅 복잡"],
      fit: ["엔터프라이즈 DB", "지속 동기화·변경량 多"],
    },
    {
      title: "DB 로그 기반 (binlog/redo/archivelog)",
      pros: ["트리거 無(성능영향↓)", "로그 재생으로 복구 용이"],
      cons: [
        "로그 접근권/보관주기 관리 필요",
        "엔진별 파서 의존",
      ],
      fit: ["CDC 미지원 환경", "로그 노출 가능·보관 관리됨"],
    },
    {
      title: "트리거 로깅",
      pros: ["DB 표준기능만으로 구현", "세밀한 캡처 가능"],
      cons: [
        "트랜잭션 오버헤드",
        "운영·관리 복잡",
        "락/데드락 리스크",
      ],
      fit: ["CDC/로그 모두 불가", "대상 테이블 제한적"],
    },
    {
      title: "배치(스냅샷/증분)",
      pros: ["단순·저비용", "초기 적재 용이"],
      cons: ["근실시간 불가", "삭제/갱신 추적 어려움"],
      fit: ["초기 적재·과거 데이터 보강(Backfill)"],
    },
  ];

  const securityOptions = [
    {
      name: "Site-to-Site VPN + AWS PrivateLink (권장)",
      icon: LinkIcon,
      desc: "고객망↔AWS VPC는 VPN(IPSec) 사설 경로, 서비스 접근은 PrivateLink(NLB 엔드포인트)로 퍼블릭 노출 없이 연결",
      pros: [
        "퍼블릭 노출 無",
        "보안·격리 우수",
        "구성 유연(다계정/다VPC)",
      ],
      cons: [
        "초기 구성 검증 필요(NLB/보안그룹)",
        "Throughput 설계 필요",
      ],
      use: "상용/민감 데이터, 장기 운영",
    },
    {
      name: "AWS PrivateLink (동일 리전/파트너 연동)",
      icon: LinkIcon,
      desc: "프로듀서 VPC의 NLB를 소비자 VPC에서 엔드포인트로 사설 접근",
      pros: ["라우팅 단순", "계정/조직 간 안전한 서비스 공유"],
      cons: ["NLB 앞단 구성 필요", "대상 서비스 의존"],
      use: "파트너/3rd-party VPC 연동, 내부 서비스 공개",
    },
    {
      name: "Public + TLS + AllowList (대안)",
      icon: Shield,
      desc: "공인망 경유 + TLS 1.2+, 소스 IP 허용목록으로 최소 노출",
      pros: ["구성이 가장 간단", "즉시 시작 가능"],
      cons: ["퍼블릭 노출 리스크", "IP 변동 관리 필요"],
      use: "고객 환경 제약/임시 또는 저위험 데이터",
    },
  ];

  const dataTiers = [
    {
      tier: "Hot",
      period: "최근 7일",
      storage: "DocumentDB",
      purpose: "실시간 알림 / 즉시 조회",
      color: "text-red-500",
    },
    {
      tier: "Warm",
      period: "상시 유지",
      storage: "RDS PostgreSQL",
      purpose:
        "기초 정보 데이터 (업체/고객/사용자/사이트/장비 설정 정보) + 분석 집계 결과 (⩾3년 보관)",
      color: "text-orange-500",
    },
    {
      tier: "Cold",
      period: "3년 경과분",
      storage: "S3 + Apache Iceberg + Athena",
      purpose: "장기 보관/규정 준수, 대용량 히스토리 분석 (Iceberg 테이블 형식)",
      color: "text-blue-500",
    },
  ];

  const coldArchitecture = [
    {
      name: "Amazon S3 + Apache Iceberg",
      desc: "원데이터를 Iceberg 테이블 형식으로 저장, ACID 트랜잭션, 스키마 진화, 파티션 진화 지원",
      icon: Cloud,
    },
    {
      name: "AWS Glue",
      desc: "ETL 처리, Iceberg 카탈로그 관리, S3 Raw 원데이터를 Cold(Iceberg)로 이관 작업 자동화, Iceberg 최적화",
      icon: Layers,
    },
    {
      name: "Amazon Athena",
      desc: "서버리스 SQL 분석, Iceberg 테이블 쿼리, 대용량 원데이터 히스토리 조회, 시간 여행 쿼리, RDS 기초 정보와 조인 가능",
      icon: BarChart3,
    },
  ];

  const lifecycle = [
    "자동화된 데이터 이동: 원데이터는 S3 Raw에서 Cold(Iceberg)로 순차 이관, 기초 정보는 RDS에 상시 유지, 집계·지표는 RDS에 최소 3년 보관",
    "비용과 성능의 균형: 기초 정보 조회는 RDS, 빈도 높은 집계는 RDS, 히스토리 원데이터 드릴다운은 Athena로 Iceberg 테이블 쿼리 (RDS 기초 정보와 조인)",
    "규정 준수: 장기 보관·보존연한·삭제(파기) 정책을 워크플로우로 자동화, Iceberg 파티션 단위 관리",
  ];

  const costEffects = [
    "스토리지 비용 최대 80% 절감 (S3 Standard/IA 티어링 + Iceberg 최적화)",
    "서버리스 분석으로 무제한 히스토리 조회 (Athena + Iceberg)",
    "Iceberg의 파티션 프루닝 및 파일 레벨 최적화로 쿼리 비용 절감",
    "자동화된 데이터 수명주기 관리로 운영비 절감",
  ];

  return (
    <div className="space-y-4 sm:space-y-6 max-w-full overflow-x-hidden break-words">
      {/* 헤더 */}
      <div className="text-center mb-4 sm:mb-8">
        <h2 className="mb-2 text-yellow-600 text-sm sm:text-base">
          🟡 Frame 3. 구체적 데이터 통합 & 품질 관리
        </h2>
        <p className="text-muted-foreground text-sm">
          분산된 데이터 소스의 체계적 통합과 실시간 품질 관리를
          통한 신뢰성 있는 Data Lake 구축
        </p>
      </div>

      <Tabs defaultValue="challenges" className="w-full">
        <TabsList className="w-full h-auto p-1 bg-muted/30 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1 sm:gap-2 mb-4 sm:mb-6">
          {[
            {
              key: "challenges",
              label: "통합 과제",
              Icon: Target,
            },
            { key: "quality", label: "품질 관리", Icon: Shield },
            {
              key: "architecture",
              label: "아키텍처",
              Icon: Settings2,
            },
            { key: "security", label: "보안 연결", Icon: Lock },
            { key: "lifecycle", label: "생명주기", Icon: RefreshCw },
          ].map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className={[
                "w-full min-h-[48px] sm:min-h-[56px] h-auto",
                "inline-flex flex-col items-center justify-center",
                "rounded-lg px-1 py-2 sm:px-2 sm:py-3 text-xs md:text-sm",
                // 항상 얇은 외곽선 표시
                "bg-white/50 shadow-none transition-all duration-200 ring-1 ring-slate-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200",
                "data-[state=active]:bg-blue-50 data-[state=active]:text-blue-800 data-[state=active]:ring-2 data-[state=active]:ring-blue-300 data-[state=active]:shadow-sm",
                "data-[state=inactive]:text-slate-700 data-[state=inactive]:hover:bg-white/80",
              ].join(" ")}
            >
              <tab.Icon className="h-6 w-6 sm:h-7 sm:w-7 mb-1 flex-shrink-0" strokeWidth={2.5} />
              <span className="leading-tight text-center text-xs sm:text-sm whitespace-nowrap">
                {tab.label}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* 통합 과제 */}
        <TabsContent
          value="challenges"
          className="space-y-4 sm:space-y-6"
        >
          <Card>
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Database className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                데이터 통합 핵심 과제 및 해결 방안
              </CardTitle>
              <CardDescription className="text-sm">
                현재 직면한 통합 문제들을 구체적 솔루션으로 해결
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <div className="space-y-4 sm:space-y-8">
                {integrationChallenges.map(
                  (challenge, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-3 sm:p-6"
                    >
                      <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <challenge.icon
                          className={`h-8 w-8 sm:h-10 sm:w-10 ${challenge.color} flex-shrink-0 mt-0.5 sm:mt-1`}
                          strokeWidth={2.5}
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-base sm:text-lg mb-2">
                            {challenge.problem}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                            <div>
                              <h4 className="font-medium text-sm mb-2 text-red-700">
                                🚨 현재 상태
                              </h4>
                              <p className="text-sm text-muted-foreground mb-4">
                                {challenge.currentState}
                              </p>
                              <h4 className="font-medium text-sm mb-2 text-green-700">
                                ✅ 해결 방향
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {challenge.solution}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm mb-3 text-blue-700">
                                ⚡ 구현 방법
                              </h4>
                              <div className="space-y-2">
                                {challenge.implementation.map(
                                  (item, implIndex) => (
                                    <div
                                      key={implIndex}
                                      className="flex items-start gap-2 text-sm"
                                    >
                                      <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                      {item}
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>
                          <h4 className="font-medium text-sm mb-3 text-purple-700">
                            🎯 기대 효과
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                            {challenge.benefits.map(
                              (benefit, benefitIndex) => (
                                <div
                                  key={benefitIndex}
                                  className="text-sm bg-purple-50 px-3 py-2 rounded text-purple-700"
                                >
                                  {benefit}
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 품질 관리 */}
        <TabsContent value="quality" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                데이터 품질 관리 프레임워크
              </CardTitle>
              <CardDescription>
                실시간 품질 검증과 자동화된 이상 탐지 시스템
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {dataQualityFramework.map(
                  (framework, index) => (
                    <div
                      key={index}
                      className="border-2 border-slate-200 rounded-lg p-6"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <framework.icon
                          className={`h-8 w-8 ${framework.color} flex-shrink-0`}
                          strokeWidth={2.5}
                        />
                        <div>
                          <h3 className="font-medium text-lg">
                            {framework.category}
                          </h3>
                          <Badge variant="outline">
                            {framework.automation}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {framework.rules.map(
                          (rule, ruleIndex) => (
                            <div
                              key={ruleIndex}
                              className="flex items-start gap-2 text-sm bg-slate-50 px-3 py-2 rounded"
                            >
                              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                              {rule}
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                실시간 품질 지표
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    99.2%
                  </div>
                  <div className="text-sm font-medium">
                    스키마 준수율
                  </div>
                  <div className="text-xs text-muted-foreground">
                    실시간 검증
                  </div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    0.03%
                  </div>
                  <div className="text-sm font-medium">
                    중복 데이터율
                  </div>
                  <div className="text-xs text-muted-foreground">
                    자동 제거
                  </div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    98.7%
                  </div>
                  <div className="text-sm font-medium">
                    완전성 지수
                  </div>
                  <div className="text-xs text-muted-foreground">
                    필수 필드 충족
                  </div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    15초
                  </div>
                  <div className="text-sm font-medium">
                    평균 검증 시간
                  </div>
                  <div className="text-xs text-muted-foreground">
                    실시간 처리
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 아키텍처 */}
        <TabsContent value="architecture" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-500" />
                데이터 수집 경로
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {collectionPaths.map((path, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={`p-4 rounded-lg ${path.bgColor} mb-4`}
                    >
                      <path.icon
                        className={`h-10 w-10 ${path.color} mx-auto mb-2 flex-shrink-0`}
                        strokeWidth={2.5}
                      />
                      <h3 className="font-medium mb-1">
                        {path.name}
                      </h3>
                      <Badge variant="outline" className="mb-2">
                        {path.frequency}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {path.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-purple-500" />
                S3 데이터 레이어
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {s3Layers.map((layer, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-lg border-2 ${layer.color}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">
                        {layer.icon}
                      </span>
                      <div>
                        <h3 className="font-medium text-lg">
                          {layer.name}
                        </h3>
                        <p className="text-muted-foreground">
                          {layer.description}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {layer.details.map(
                        (detail, detailIndex) => (
                          <div
                            key={detailIndex}
                            className="text-sm bg-white/50 px-3 py-2 rounded"
                          >
                            {detail}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>데이터 플로우</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="text-center">
                  <Database className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="font-medium">소스 시스템</div>
                  <div className="text-sm text-muted-foreground">
                    RDBMS/NoSQL/File/IoT
                  </div>
                </div>
                <div className="text-2xl text-muted-foreground">
                  →
                </div>
                <div className="text-center">
                  <Cloud className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="font-medium">S3 Raw</div>
                  <div className="text-sm text-muted-foreground">
                    원본 데이터
                  </div>
                </div>
                <div className="text-2xl text-muted-foreground">
                  →
                </div>
                <div className="text-center">
                  <RefreshCw className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="font-medium">
                    Standardized
                  </div>
                  <div className="text-sm text-muted-foreground">
                    표준화/정합
                  </div>
                </div>
                <div className="text-2xl text-muted-foreground">
                  →
                </div>
                <div className="text-center">
                  <Zap className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <div className="font-medium">Curated</div>
                  <div className="text-sm text-muted-foreground">
                    집계/제품화
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="h-5 w-5 text-green-500" />
                소비 레이어
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {consumptionLayers.map((layer, index) => (
                  <div
                    key={index}
                    className="text-center p-4 border rounded-lg"
                  >
                    <layer.icon
                      className={`h-10 w-10 ${layer.color} mx-auto mb-3 flex-shrink-0`}
                      strokeWidth={2.5}
                    />
                    <h3 className="font-medium mb-2">
                      {layer.name}
                    </h3>
                    <div className="text-sm text-muted-foreground mb-2">
                      {layer.storage}
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs"
                    >
                      {layer.useCase}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>수집 방식 옵션 비교</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ingestOptions.map((opt, i) => (
                  <div
                    key={i}
                    className="p-4 border rounded-lg"
                  >
                    <div className="font-medium mb-2">
                      {opt.title}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">
                          장점
                        </div>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {opt.pros.map((p, idx) => (
                            <li key={idx}>{p}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">
                          단점
                        </div>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {opt.cons.map((c, idx) => (
                            <li key={idx}>{c}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">
                          권장 조건
                        </div>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {opt.fit.map((f, idx) => (
                            <li key={idx}>{f}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 보안 */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                보안 · 네트워크 경로 옵션
              </CardTitle>
              <CardDescription>
                고객 환경과 AWS 간 안전한 데이터 전송을 위한
                다양한 연결 방식
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {securityOptions.map((s, i) => (
                  <div
                    key={i}
                    className="border-2 border-slate-200 rounded-lg p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <s.icon className="h-8 w-8 text-yellow-600 flex-shrink-0" strokeWidth={2.5} />
                      <div>
                        <h3 className="font-medium text-lg">
                          {s.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2 text-green-700">
                          ✅ 장점
                        </h4>
                        <div className="space-y-1">
                          {s.pros.map((p, idx) => (
                            <div
                              key={idx}
                              className="text-sm bg-green-50 px-3 py-2 rounded"
                            >
                              • {p}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2 text-red-700">
                          ⚠️ 단점
                        </h4>
                        <div className="space-y-1">
                          {s.cons.map((c, idx) => (
                            <div
                              key={idx}
                              className="text-sm bg-red-50 px-3 py-2 rounded"
                            >
                              • {c}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2 text-blue-700">
                          🎯 적합 환경
                        </h4>
                        <div className="text-sm bg-blue-50 px-3 py-2 rounded">
                          {s.use}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                보안 베스트 프랙티스
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-sm mb-3 text-blue-700">
                    🔐 암호화 & 인증
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      전송 중 암호화 (TLS 1.2+)
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      저장 시 암호화 (KMS)
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      IAM 역할 기반 접근 제어
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      MFA 강제 인증
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-3 text-purple-700">
                    📊 모니터링 & 감사
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      CloudTrail 모든 API 로깅
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      VPC Flow Logs 네트워크 추적
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      GuardDuty 위협 탐지
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      실시간 보안 알림
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 생명주기 */}
        <TabsContent value="lifecycle" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-blue-500" />
                Hot / Warm / Cold 데이터 저장 전략
              </CardTitle>
              <CardDescription>
                데이터 접근 패턴에 따른 최적화된 저장 및 비용
                관리
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {dataTiers.map((t, idx) => (
                  <div
                    key={idx}
                    className="text-center p-6 border-2 rounded-lg"
                  >
                    <div
                      className={`text-3xl font-bold mb-3 ${t.color}`}
                    >
                      {t.tier}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {t.period}
                    </div>
                    <div className="font-medium mb-2">
                      {t.storage}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.purpose}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Snowflake className="h-5 w-5 text-blue-500" />
                Cold 데이터 아키텍처
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {coldArchitecture.map((c, i) => (
                  <div
                    key={i}
                    className="p-4 border rounded-lg"
                  >
                    <c.icon className="h-10 w-10 text-blue-500 mb-3 flex-shrink-0" strokeWidth={2.5} />
                    <div className="font-medium">{c.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {c.desc}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-green-500" />
                자동화된 데이터 생명주기 관리
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <div className="flex-1">
                    <div className="font-medium">
                      실시간 → Hot (7일)
                    </div>
                    <div className="text-sm text-muted-foreground">
                      즉시 알림 및 대응이 필요한 데이터
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg">
                  <Database className="h-6 w-6 text-orange-600" />
                  <div className="flex-1">
                    <div className="font-medium">
                      Hot → Warm (3년간 보관)
                    </div>
                    <div className="text-sm text-muted-foreground">
                      대시보드, 분석, 리포트용 데이터
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <Archive className="h-6 w-6 text-gray-600" />
                  <div className="flex-1">
                    <div className="font-medium">
                      Warm → Iceberg (장기 보관)
                    </div>
                    <div className="text-sm text-muted-foreground">
                      규정 준수 및 히스토리 분석용 (Iceberg 테이블)
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-500" />
                데이터 거버넌스 및 컴플라이언스
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-sm mb-3">
                    🔒 접근 제어
                  </h4>
                  <div className="space-y-2">
                    {governance
                      .slice(0, 3)
                      .map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 text-sm"
                        >
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                          {item}
                        </div>
                      ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-3">
                    ⚙️ 자동화
                  </h4>
                  <div className="space-y-2">
                    {governance.slice(3).map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                데이터 통합 방법론 요약
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {methodology.map((m, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-sm"
                  >
                    <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5" />
                    {m}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 bg-green-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <TrendingDown className="h-5 w-5" />
                비용 최적화 효과
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    80%↓
                  </div>
                  <div className="text-sm font-medium">
                    스토리지 비용
                  </div>
                  <div className="text-xs text-muted-foreground">
                    자동 티어링
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    60%↓
                  </div>
                  <div className="text-sm font-medium">
                    처리 비용
                  </div>
                  <div className="text-xs text-muted-foreground">
                    선택적 실시간
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    무제한
                  </div>
                  <div className="text-sm font-medium">
                    히스토리 분석
                  </div>
                  <div className="text-xs text-muted-foreground">
                    서버리스 Athena
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