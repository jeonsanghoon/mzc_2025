import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  BarChart3,
  TrendingUp,
  Users,
  Zap,
  Brain,
  Clock,
  Target,
  CheckCircle2,
  AlertTriangle,
  Settings,
  Database,
  Activity,
  Shield,
  Search,
  GitBranch,
  Layers
} from "lucide-react";

export function AnalysisFrame() {
  // 구체적인 문제별 분석 솔루션
  const specificProblems = [
    {
      category: "데이터 품질 문제",
      problem: "관계형데이터베이스/NoSQL/파일/사물인터넷 분산으로 통합 불가",
      analysis: [
        "데이터 소스별 스키마 불일치 자동 감지",
        "실시간 데이터 품질 스코어링 (0-100점)",
        "누락/중복/이상치 패턴 분석"
      ],
      solution: [
        "Data Contract 기반 스키마 검증",
        "Glue Catalog 자동 스키마 발견",
        "실시간 데이터 품질 대시보드"
      ],
      metrics: {
        current: "데이터 신뢰도 15%",
        target: "85% 향상",
        timeline: "2개월"
      },
      icon: Database,
      color: "text-blue-600"
    },
    {
      category: "알람 오탐/미탐 문제", 
      problem: "운영 혼란, 대응 지연으로 평균복구시간 증가",
      analysis: [
        "과거 1년간 알람 패턴 기계학습 분석",
        "오탐/미탐 근본 원인 분석",
        "운영자 피드백 기반 알람 품질 개선"
      ],
      solution: [
        "인공지능 기반 알람 필터링 엔진",
        "적응형 임계값 자동 조정",
        "컨텍스트 인식 알람 그룹핑"
      ],
      metrics: {
        current: "오탐률 45%",
        target: "30% 감소",
        timeline: "3개월"
      },
      icon: AlertTriangle,
      color: "text-red-600"
    },
    {
      category: "근본 원인 분석 지연",
      problem: "서비스 수준 협약 위반으로 고객 만족도 하락",
      analysis: [
        "장애 발생-해결 시간 상관관계 분석",
        "복합 장애 패턴 자동 클러스터링",
        "전문가 지식 베이스 구축"
      ],
      solution: [
        "Amazon Bedrock 근본원인분석 엔진",
        "실시간 증상-원인 매핑",
        "자동 해결책 제안 시스템"
      ],
      metrics: {
        current: "평균복구시간 2.5시간",
        target: "40% 단축",
        timeline: "4개월"
      },
      icon: Search,
      color: "text-purple-600"
    },
    {
      category: "현장 출동 과다",
      problem: "원격 제어/무선업데이트 미흡으로 운영비 증가",
      analysis: [
        "출동 사유별 분류 및 원격 해결 가능성 분석",
        "디바이스별 원격 제어 성공률 추적",
        "무선업데이트 실패 패턴 분석"
      ],
      solution: [
        "Shadow 기반 원격 진단/제어",
        "단계별 안전 무선업데이트 시스템",
        "예측 유지보수 스케줄링"
      ],
      metrics: {
        current: "현장 출동 월 120건",
        target: "70% 감소",
        timeline: "5개월"
      },
      icon: Settings,
      color: "text-green-600"
    },
    {
      category: "통신오류 누적 문제",
      problem: "실시간 누락으로 인한 모니터링 공백 발생",
      analysis: [
        "시간별 통신 실패율 패턴 분석",
        "네트워크 경로별 장애 빈도 측정",
        "디바이스 그룹별 통신 안정성 평가",
        "배치 점검을 통한 누락 데이터 보완"
      ],
      solution: [
        "배치 통신오류 점검 시스템 구축",
        "다중 경로 네트워크 구성",
        "자동 재연결 및 페일오버 메커니즘",
        "통신 품질 실시간 모니터링"
      ],
      metrics: {
        current: "통신 실패율 2.3%",
        target: "99.5% 연결 성공률",
        timeline: "3개월"
      },
      icon: AlertTriangle,
      color: "text-red-600"
    }
  ];

  const aiAnalysisTools = [
    {
      tool: "Amazon Bedrock",
      capability: "자연어 기반 근본 원인 분석",
      useCases: [
        "장애 로그 자동 분석 및 원인 추론",
        "전문가 지식 기반 해결책 제안", 
        "고객 질의 자동 응답 시스템"
      ],
      examples: [
        "질문: '냉각 시스템 효율이 떨어지는 이유는?'",
        "분석: 전력 소비↑ + 냉각기 가동률↓ 패턴 감지",
        "제안: 냉각기 필터 교체 및 압축기 점검 권고"
      ],
      icon: Brain,
      color: "text-indigo-600"
    },
    {
      tool: "Amazon SageMaker",
      capability: "예측 분석 및 이상 탐지",
      useCases: [
        "장비 고장 확률 예측 (14일 이내)",
        "성능 저하 패턴 조기 감지",
        "최적 유지보수 시점 추천"
      ],
      examples: [
        "컴프레서 진동+전류 패턴 → 고장확률 80%",
        "배터리 충방전 패턴 → 30일 내 수명 종료",
        "서버 리소스 패턴 → 48시간 내 다운타임 70%"
      ],
      icon: Activity,
      color: "text-green-600"
    },
    {
      tool: "Amazon QuickSight",
      capability: "통신오류 시각화 및 패턴 분석",
      useCases: [
        "실시간 통신 품질 대시보드",
        "지역별/시간대별 장애 패턴 시각화",
        "네트워크 성능 트렌드 분석"
      ],
      examples: [
        "지도 기반 실시간 연결 상태 시각화",
        "시간대별 통신 실패율 히트맵",
        "디바이스 그룹별 네트워크 성능 비교"
      ],
      icon: BarChart3,
      color: "text-blue-600"
    }
  ];

  const operationalAnalysis = [
    {
      type: "긴급 경고",
      description: "심각 문제 발생",
      action: "즉시 대응 및 집중 모니터링",
      icon: "🔥",
      color: "text-red-500",
    },
    {
      type: "주의 경고",
      description: "주의가 필요한 상태",
      action: "자동 대응 요청 발행",
      icon: "⚠️",
      color: "text-orange-500",
    },
    {
      type: "발생 사건 처리",
      description: "서비스 품질 목표 추적",
      action: "평균 복구 시간 측정",
      icon: "📊",
      color: "text-blue-500",
    },
  ];

  const productAnalysis = [
    {
      name: "버전별 성능 분석",
      description: "펌웨어 버전별 수명/성능 비교",
      metrics: ["평균 수명", "성능 지표", "실패율"],
      icon: "📈",
    },
    {
      name: "부품별 결함 분석",
      description: "부품별 결함 패턴 파악",
      metrics: ["결함 유형", "발생 빈도", "교체 주기"],
      icon: "🔧",
    },
    {
      name: "제품 품질 개선",
      description: "데이터 기반 개선 제안",
      metrics: ["품질 점수", "개선 제안", "효과 측정"],
      icon: "✨",
    },
  ];

  const customerAnalysis = [
    {
      metric: "서비스 품질 목표 위반율",
      target: "30%↓",
      current: "15%",
      description: "품질 목표 준수율 개선",
      icon: Target,
      color: "text-red-500",
    },
    {
      metric: "평균 복구 시간",
      target: "30-40%↓",
      current: "2.5시간",
      description: "복구 소요시간 단축",
      icon: Clock,
      color: "text-blue-500",
    },
    {
      metric: "경고 알림 건수",
      target: "50%↓",
      current: "일 120건",
      description: "불필요 경고(오탐) 감소",
      icon: Zap,
      color: "text-green-500",
    },
  ];

  const aiAnalysis = [
    {
      service: "Bedrock 지식 저장소·도우미",
      capability: "원인 분석 질의응답",
      features: [
        "자연어 질문 처리",
        "근본 원인 분석",
        "해결책 제안",
        "이력(히스토리) 추적",
      ],
      icon: "🤖",
    },
    {
      service: "SageMaker",
      capability: "이상 탐지 및 예측 분석",
      features: [
        "예방 보수 추천",
        "이상 패턴 감지",
        "룰 자동 튜닝",
        "모델 재학습",
      ],
      icon: "🧠",
    },
  ];

  const improvements = [
    {
      category: "운영 개선",
      items: [
        {
          metric: "경고 오탐률",
          improvement: "30%↓",
          icon: "🚨",
        },
        {
          metric: "긴급→주의 처리 시간",
          improvement: "40%↓",
          icon: "⚡",
        },
        {
          metric: "평균 복구 시간",
          improvement: "30-40%↓",
          icon: "🔧",
        },
      ],
    },
    {
      category: "품질 개선",
      items: [
        {
          metric: "원격 업데이트(OTA) 성공률",
          improvement: "≥98%",
          icon: "📦",
        },
        {
          metric: "되돌리기 비율",
          improvement: "≤1%",
          icon: "🔄",
        },
        {
          metric: "서비스 품질 목표 위반율",
          improvement: "30%↓",
          icon: "📋",
        },
      ],
    },
    {
      category: "비용 개선",
      items: [
        {
          metric: "데이터 품질 실패율",
          improvement: "50%↓",
          icon: "📊",
        },
        {
          metric: "저장/스캔 비용",
          improvement: "20-40%↓",
          icon: "💰",
        },
      ],
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-4 sm:mb-8">
        <h2 className="mb-2 text-purple-600 text-sm sm:text-base">
          🟣 Frame 6. 분석 & 구체적 문제 해결
        </h2>
        <p className="text-muted-foreground text-sm">
          각 문제별 구체적 분석 방법론과 인공지능 기반 자동화 솔루션
        </p>
      </div>

      <Tabs defaultValue="problems" className="w-full">
        <TabsList className="w-full h-auto p-1 bg-muted/30 grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 mb-4 sm:mb-6">
          {[
            { key: "problems", label: "문제 분석", Icon: Target },
            { key: "ai-tools", label: "AI 도구", Icon: Brain },
            { key: "operational", label: "운영 분석", Icon: BarChart3 },
            { key: "improvements", label: "개선 효과", Icon: TrendingUp },
          ].map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className={[
                "w-full min-h-[48px] sm:min-h-[56px] h-auto",
                "inline-flex flex-col items-center justify-center",
                "rounded-lg px-1 py-2 sm:px-2 sm:py-3 text-xs md:text-sm",
                "border-0 bg-white/50 shadow-none transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200",
                "data-[state=active]:bg-blue-50 data-[state=active]:text-blue-800 data-[state=active]:border-blue-300 data-[state=active]:ring-2 data-[state=active]:ring-blue-200 data-[state=active]:shadow-sm",
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

        <TabsContent value="problems" className="space-y-6">
          {/* Specific Problem Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-500" />
                각 문제별 구체적 분석 및 해결 방안
              </CardTitle>
              <CardDescription>
                고객사 핵심 문제들을 분석 방법론과 함께 구체적 솔루션 제시
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {specificProblems.map((problem, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <div className="flex items-start gap-4 mb-6">
                      <problem.icon className={`h-10 w-10 ${problem.color} flex-shrink-0 mt-1`} strokeWidth={2.5} />
                      <div className="flex-1">
                        <h3 className="font-medium text-lg mb-2">{problem.category}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{problem.problem}</p>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-sm mb-3 text-blue-700">🔍 분석 방법론</h4>
                            <div className="space-y-2">
                              {problem.analysis.map((item, analysisIndex) => (
                                <div key={analysisIndex} className="flex items-start gap-2 text-sm">
                                  <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-3 text-green-700">⚡ 해결 솔루션</h4>
                            <div className="space-y-2">
                              {problem.solution.map((item, solutionIndex) => (
                                <div key={solutionIndex} className="flex items-start gap-2 text-sm">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                          <div className="flex items-center justify-between text-sm">
                            <div>
                              <span className="text-muted-foreground">현재: </span>
                              <span className="font-medium">{problem.metrics.current}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">목표: </span>
                              <span className="font-medium text-green-600">{problem.metrics.target}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">기간: </span>
                              <Badge variant="outline">{problem.metrics.timeline}</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-tools" className="space-y-6">
          {/* AI Analysis Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-indigo-500" />
                인공지능 기반 분석 도구 및 적용 사례
              </CardTitle>
              <CardDescription>
                Amazon Bedrock과 SageMaker를 활용한 지능형 분석 시스템
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {aiAnalysisTools.map((tool, index) => (
                  <div key={index} className="border-2 border-indigo-200 bg-indigo-50 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <tool.icon className={`h-10 w-10 ${tool.color} flex-shrink-0`} strokeWidth={2.5} />
                      <div>
                        <h3 className="font-medium text-lg">{tool.tool}</h3>
                        <p className="text-sm text-muted-foreground">{tool.capability}</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-sm mb-3">🎯 주요 활용 사례</h4>
                        <div className="space-y-2">
                          {tool.useCases.map((useCase, useCaseIndex) => (
                            <div key={useCaseIndex} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                              {useCase}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-3">💡 구체적 예시</h4>
                        <div className="space-y-2">
                          {tool.examples.map((example, exampleIndex) => (
                            <div key={exampleIndex} className="text-sm bg-white/70 p-3 rounded text-slate-700">
                              {example}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Continuous Improvement Cycle */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-blue-500" />
                지속적 개선 사이클
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                  <Database className="h-6 w-6 text-blue-600" />
                  <div className="flex-1">
                    <div className="font-medium">1. 데이터 수집 & 전처리</div>
                    <div className="text-sm text-muted-foreground">센서 데이터, 이벤트 로그, 운영자 피드백 통합</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                  <Brain className="h-6 w-6 text-green-600" />
                  <div className="flex-1">
                    <div className="font-medium">2. AI 모델 학습 & 추론</div>
                    <div className="text-sm text-muted-foreground">패턴 인식, 이상 탐지, 원인 분석, 해결책 추천</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                  <Settings className="h-6 w-6 text-purple-600" />
                  <div className="flex-1">
                    <div className="font-medium">3. 자동 대응 & 검증</div>
                    <div className="text-sm text-muted-foreground">원격 제어, OTA 배포, 효과 측정</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                  <div className="flex-1">
                    <div className="font-medium">4. 피드백 & 모델 개선</div>
                    <div className="text-sm text-muted-foreground">결과 평가, 모델 재학습, 룰 자동 튜닝</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operational" className="space-y-6">
          {/* Operational Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                운영 분석
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {operationalAnalysis.map((analysis, index) => (
                  <div
                    key={index}
                    className="text-center p-4 border rounded-lg"
                  >
                    <div className="text-3xl mb-3">
                      {analysis.icon}
                    </div>
                    <h3
                      className={`font-medium mb-2 ${analysis.color}`}
                    >
                      {analysis.type}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {analysis.description}
                    </p>
                    <Badge variant="outline">
                      {analysis.action}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="font-medium text-blue-800 mb-2">
                  자동화된 운영 흐름
                </div>
                <div className="text-sm text-blue-700">
                  사건 발생 → 자동 대응 요청 발행 → 서비스 품질 목표
                  추적 → 평균 복구 시간 측정 → 개선 사항 피드백
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                제품 분석
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {productAnalysis.map((analysis, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">
                        {analysis.icon}
                      </span>
                      <div>
                        <h3 className="font-medium">
                          {analysis.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {analysis.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {analysis.metrics.map(
                        (metric, metricIndex) => (
                          <Badge
                            key={metricIndex}
                            variant="secondary"
                            className="text-xs"
                          >
                            {metric}
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Customer Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                고객 분석
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {customerAnalysis.map((analysis, index) => (
                  <div
                    key={index}
                    className="text-center p-4 border rounded-lg"
                  >
                    <analysis.icon
                      className={`h-8 w-8 ${analysis.color} mx-auto mb-3`}
                    />
                    <h3 className="font-medium mb-2">
                      {analysis.metric}
                    </h3>
                    <div
                      className={`text-2xl font-bold mb-1 ${analysis.color}`}
                    >
                      {analysis.target}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      현재: {analysis.current}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {analysis.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="font-medium text-purple-800 mb-2">
                  고객사별 리포트 자동 생성
                </div>
                <div className="text-sm text-purple-700">
                  각 고객사의 서비스 품질 목표 현황, 경고 알림 분석,
                  평균 복구 시간 추이 등을 포함한 맞춤 리포트
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="improvements" className="space-y-6">
          {/* Improvement Summary */}
          <Card className="border-2 border-purple-200 bg-purple-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Target className="h-5 w-5" />
                종합 개선 효과
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {improvements.map((category, index) => (
                  <div key={index}>
                    <h3 className="font-medium mb-4 text-center">
                      {category.category}
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {category.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="text-center p-4 bg-white rounded-lg"
                        >
                          <div className="text-2xl mb-2">
                            {item.icon}
                          </div>
                          <div className="font-medium text-sm mb-1">
                            {item.metric}
                          </div>
                          <div className="text-lg font-bold text-purple-600">
                            {item.improvement}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}