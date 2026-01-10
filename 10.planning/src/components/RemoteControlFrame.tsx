import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Settings, Shield, RefreshCw, Upload, CheckCircle2, XCircle, Clock, Target, Users, AlertTriangle, Layers, GitBranch, Play, Zap, RotateCcw, FolderTree } from 'lucide-react';

export function RemoteControlFrame() {
  const shadowControlSteps = [
    {
      step: '1',
      actor: '서버',
      action: '$aws/things/{thingName}/shadow/update',
      detail: 'desired: {cmd: reboot, param: ...}',
      icon: '📤'
    },
    {
      step: '2', 
      actor: '디바이스',
      action: 'reported/ack 업데이트',
      detail: '명령 실행 후 상태 보고',
      icon: '🔧'
    },
    {
      step: '3',
      actor: '서버',
      action: 'shadow delta/accepted 응답 확인',
      detail: '실행 결과 검증',
      icon: '✅'
    },
    {
      step: '4',
      actor: '시스템',
      action: 'control_cmd DB 기록 + Event DB 반영',
      detail: '이력 저장 및 이벤트 처리',
      icon: '💾'
    }
  ];

  const otaSteps = [
    {
      step: '1',
      actor: '서버',
      action: '$aws/things/{thingName}/shadow/name/ota/update',
      detail: 'desired: {version: 2.0.1, url: presignedURL, until: ts}',
      icon: '📦'
    },
    {
      step: '2',
      actor: '디바이스', 
      action: '다운로드/검증/설치/재부팅',
      detail: 'OTA 패키지 처리',
      icon: '🔄'
    },
    {
      step: '3',
      actor: '디바이스',
      action: 'reported 업데이트',
      detail: '설치 결과 보고',
      icon: '📊'
    },
    {
      step: '4',
      actor: '서버',
      action: 'ota_result 기록',
      detail: '성공/실패/롤백 기록',
      icon: '📝'
    }
  ];

  const otaOperations = [
    {
      phase: 'Canary',
      percentage: '1~5%',
      description: '소규모 테스트 배포',
      icon: '🧪',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      phase: 'Batch', 
      percentage: '10~20%',
      description: '단계적 확산 배포',
      icon: '📈',
      color: 'bg-green-100 text-green-700'
    },
    {
      phase: 'Full',
      percentage: '100%',
      description: '전체 배포',
      icon: '🌐',
      color: 'bg-purple-100 text-purple-700'
    }
  ];

  const closedLoop = [
    { step: 'Event 발생', icon: '🚨', description: '이상 상황 감지' },
    { step: 'RCA 수행', icon: '🔍', description: '근본 원인 분석' },
    { step: 'Shadow 제어/OTA', icon: '⚡', description: '자동 대응 실행' },
    { step: 'Verify', icon: '✅', description: '결과 검증' },
    { step: 'Event 해소/종료', icon: '🎯', description: '문제 해결 완료' }
  ];

  const benefits = [
    {
      metric: '98%',
      label: 'OTA 성공률',
      description: 'AB 파티션 및 롤백',
      icon: CheckCircle2,
      color: 'text-green-500'
    },
    {
      metric: '≤1%',
      label: '롤백률',
      description: '실패 시 자동 롤백',
      icon: RefreshCw,
      color: 'text-blue-500'
    },
    {
      metric: '70%↓', 
      label: '서비스 기사 출동',
      description: '원격 제어로 대체',
      icon: Users,
      color: 'text-purple-500'
    },
    {
      metric: '85%↓', 
      label: '제품 회수율',
      description: 'OTA로 원격 복구',
      icon: Target,
      color: 'text-orange-500'
    }
  ];

  const shadowGroups = [
    {
      category: '모델별 그룹',
      description: '디바이스 모델에 따른 그룹 분류',
      groups: ['ModelA_v1', 'ModelB_v2', 'ModelC_v3'],
      strategy: 'Hardware 호환성 기준',
      icon: '🔧'
    },
    {
      category: '펌웨어 버전별',
      description: '현재 펌웨어 버전에 따른 분류',
      groups: ['FW_1.x', 'FW_2.x', 'FW_3.x'],
      strategy: '업그레이드 경로 최적화',
      icon: '⚡'
    },
    {
      category: '지역별 그룹',
      description: '배포 지역과 시간대 고려',
      groups: ['Asia-Pacific', 'Europe', 'Americas'],
      strategy: '배포 시간 최적화',
      icon: '🌍'
    },
    {
      category: 'Canary 테스트',
      description: '초기 검증용 소규모 그룹',
      groups: ['TestGroup_1%', 'EarlyAdopter_5%', 'BetaTester'],
      strategy: '위험도 최소화',
      icon: '🧪'
    }
  ];

  const rollbackScenarios = [
    {
      type: '제품 레벨 자동 롤백',
      trigger: '디바이스 자체 감지',
      conditions: ['부팅 실패 3회', '핵심 기능 오류', '성능 저하 50% 이상'],
      actions: ['이전 버전 복원', '안전 모드 진입', '재부팅', '서버 상태 리포트'],
      timeframe: '1-3분',
      icon: CheckCircle2,
      color: 'text-green-600'
    },
    {
      type: '서버 레벨 일괄 롤백',
      trigger: '중앙 집중 모니터링',
      conditions: ['그룹 실패율 >5%', '심각한 보안 이슈', '런타임 오류 패턴'],
      actions: ['배포 중단', '영향 그룹 식별', '일괄 롤백 명령', '근본 원인 분석'],
      timeframe: '5-10분',
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      type: '비상 중단 스위치',
      trigger: '관리자 수동 개입',
      conditions: ['치명적 보안 취약점', '대량 디바이스 오류', '비즈니스 크리티컬 이슈'],
      actions: ['즉시 배포 중단', '전체 롤백', '이슈 격리', '고객 커뮤니케이션'],
      timeframe: '< 5분',
      icon: XCircle,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-4 sm:mb-8">
        <h2 className="mb-2 text-green-600 text-sm sm:text-base">🟢 Frame 5. Shadow 기반 원격 제어 & 안정적 OTA</h2>
        <p className="text-muted-foreground text-sm">
          그룹 기반 안전 배포와 2단계 롤백 시스템으로 서비스 기사 출동 및 제품 회수 최소화
        </p>
      </div>

      <Tabs defaultValue="control" className="w-full">
        <TabsList className="w-full h-auto p-1 bg-muted/30 grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 mb-4 sm:mb-6">
          {[
            { key: "control", label: "원격 제어", Icon: Zap },
            { key: "ota", label: "OTA 시스템", Icon: RefreshCw },
            { key: "groups", label: "Shadow 그룹", Icon: FolderTree },
            { key: "rollback", label: "롤백 시나리오", Icon: RotateCcw },
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

        <TabsContent value="control" className="space-y-4 sm:space-y-6">
          {/* Shadow Control Process */}
          <Card>
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                Shadow 기반 원격 제어 프로세스
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {shadowControlSteps.map((step, index) => (
                  <div key={index} className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg">
                    <div className="flex flex-row sm:flex-col items-center sm:items-center gap-2 sm:gap-0">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium sm:mb-2">
                        {step.step}
                      </div>
                      <span className="text-lg sm:text-2xl">{step.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                        <Badge variant="outline" className="text-xs w-fit">{step.actor}</Badge>
                        <h4 className="font-medium text-sm sm:text-base break-words">{step.action}</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground bg-slate-50 p-2 rounded break-words">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Closed Loop */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-indigo-500" />
                폐쇄 루프 (Closed Loop) 운영
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                {closedLoop.map((item, index) => (
                  <div key={index} className="text-center flex-1">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-xl">{item.icon}</span>
                    </div>
                    <div className="font-medium text-sm mb-1">{item.step}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                    {index < closedLoop.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 left-full w-8 h-0.5 bg-indigo-300 -translate-y-0.5"></div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                <div className="text-sm text-muted-foreground">
                  <strong>실패 시 대응:</strong> 룰/모델 튜닝 → OTA 수정 배포 → 재발 방지
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ota" className="space-y-6">
          {/* OTA Process */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-blue-500" />
                Shadow 기반 OTA 프로세스
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {otaSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mb-2">
                        {step.step}
                      </div>
                      <span className="text-2xl">{step.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">{step.actor}</Badge>
                        <h4 className="font-medium">{step.action}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground bg-slate-50 p-2 rounded">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* OTA Operations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-purple-500" />
                단계별 배포 전략
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {otaOperations.map((operation, index) => (
                  <div key={index} className="text-center">
                    <div className={`p-4 rounded-lg ${operation.color} mb-4`}>
                      <span className="text-3xl block mb-2">{operation.icon}</span>
                      <h3 className="font-medium">{operation.phase}</h3>
                      <div className="text-2xl font-bold mt-1">{operation.percentage}</div>
                    </div>
                    <p className="text-sm text-muted-foreground">{operation.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-yellow-600" />
                  <span className="font-medium text-yellow-800">안전 장치</span>
                </div>
                <div className="text-sm text-yellow-700 space-y-1">
                  <div>• 실패 시 자동 롤백 (AB 파티션)</div>
                  <div>• 실패율 임계값 초과 시 자동 중단</div>
                  <div>• 재시도 로직 및 백오프 전략</div>
                  <div>• 서비스 기사 출동/제품 회수 최소화</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="groups" className="space-y-6">
          {/* Shadow Groups */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-blue-500" />
                Shadow 그룹 관리 전략
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {shadowGroups.map((group, index) => (
                  <div key={index} className="p-6 border rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{group.icon}</span>
                      <div>
                        <h3 className="font-medium text-lg">{group.category}</h3>
                        <p className="text-sm text-muted-foreground">{group.description}</p>
                        <Badge variant="outline" className="mt-1">{group.strategy}</Badge>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-2">
                      {group.groups.map((groupName, groupIndex) => (
                        <div key={groupIndex} className="bg-slate-50 px-3 py-2 rounded text-sm">
                          {groupName}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Job Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-green-500" />
                Job 관리 시스템
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                  <Play className="h-6 w-6 text-blue-600" />
                  <div className="flex-1">
                    <div className="font-medium">Job 템플릿 생성</div>
                    <div className="text-sm text-muted-foreground">그룹별 배포 시나리오 및 조건 설정</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <div className="flex-1">
                    <div className="font-medium">실행 조건 검증</div>
                    <div className="text-sm text-muted-foreground">디바이스 상태, 네트워크, 리소스 확인</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600" />
                  <div className="flex-1">
                    <div className="font-medium">단계별 스케줄링</div>
                    <div className="text-sm text-muted-foreground">시간대별, 지역별 배포 일정 관리</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rollback" className="space-y-6">
          {/* Rollback Scenarios */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-red-500" />
                2단계 롤백 시나리오
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {rollbackScenarios.map((scenario, index) => (
                  <div key={index} className="p-6 border rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <scenario.icon className={`h-8 w-8 ${scenario.color} flex-shrink-0`} strokeWidth={2.5} />
                      <div>
                        <h3 className="font-medium text-lg">{scenario.type}</h3>
                        <p className="text-sm text-muted-foreground">{scenario.trigger}</p>
                        <Badge variant="outline" className="mt-1">{scenario.timeframe}</Badge>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">트리거 조건</h4>
                        <div className="space-y-1">
                          {scenario.conditions.map((condition, condIndex) => (
                            <div key={condIndex} className="text-sm bg-red-50 px-3 py-2 rounded">
                              • {condition}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">실행 액션</h4>
                        <div className="space-y-1">
                          {scenario.actions.map((action, actionIndex) => (
                            <div key={actionIndex} className="text-sm bg-green-50 px-3 py-2 rounded">
                              • {action}
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

          {/* Rollback Flow */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-blue-500" />
                롤백 실행 흐름
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                  <div className="flex-1">
                    <div className="font-medium">1단계: 디바이스 레벨 자동 롤백</div>
                    <div className="text-sm text-muted-foreground">로컬 감지 → 이전 버전 복원 → 재부팅 → 상태 리포트</div>
                  </div>
                  <Badge>1-3분</Badge>
                </div>
                <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg">
                  <Settings className="h-6 w-6 text-orange-600" />
                  <div className="flex-1">
                    <div className="font-medium">2단계: 서버 레벨 일괄 롤백</div>
                    <div className="text-sm text-muted-foreground">패턴 감지 → 영향 그룹 식별 → 일괄 롤백 명령 → 배포 중단</div>
                  </div>
                  <Badge>5-10분</Badge>
                </div>
                <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                  <XCircle className="h-6 w-6 text-purple-600" />
                  <div className="flex-1">
                    <div className="font-medium">비상 스위치: 전체 배포 중단</div>
                    <div className="text-sm text-muted-foreground">치명적 이슈 → 즉시 중단 → 전체 롤백 → 고객 커뮤니케이션</div>
                  </div>
                  <Badge>5분 미만</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Expected Results */}
      <Card className="border-2 border-green-200 bg-green-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <CheckCircle2 className="h-5 w-5" />
            최종 목표 성과
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-4 bg-white rounded-lg">
                <benefit.icon className={`h-10 w-10 ${benefit.color} mx-auto mb-3 flex-shrink-0`} strokeWidth={2.5} />
                <div className={`text-2xl font-bold mb-1 ${benefit.color}`}>{benefit.metric}</div>
                <div className="font-medium mb-1">{benefit.label}</div>
                <div className="text-sm text-muted-foreground">{benefit.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}