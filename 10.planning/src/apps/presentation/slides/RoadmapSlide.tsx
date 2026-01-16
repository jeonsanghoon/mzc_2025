import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Progress } from '../../../components/ui/progress';
import { CheckCircle2, Clock, Calendar, Target, Zap, Users, Settings, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function RoadmapSlide() {
  const phases = [
    {
      phase: 'Phase 1',
      title: '기반 구축',
      duration: '1-3개월',
      description: '데이터 통합 플랫폼 구축 및 기본 모니터링 시스템',
      objectives: [
        '7개 도메인 데이터 통합 스키마 설계',
        'Hot/Warm/Cold 데이터 저장소 구축',
        '실시간 데이터 수집 파이프라인 구축',
        '기본 알람 및 모니터링 시스템 구현'
      ],
      deliverables: [
        '통합 데이터 플랫폼',
        '실시간 모니터링 대시보드',
        '기본 알람 시스템',
        '데이터 품질 관리 도구'
      ],
      milestones: [
        { week: 2, task: '요구사항 분석 완료' },
        { week: 4, task: '데이터 스키마 설계' },
        { week: 8, task: '기본 플랫폼 구축' },
        { week: 12, task: 'Phase 1 완료 및 검증' }
      ],
      icon: Settings,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      progress: 100
    },
    {
      phase: 'Phase 2',
      title: 'AI 분석 도입',
      duration: '4-6개월',
      description: '기계학습 기반 지능형 분석 시스템 구축',
      objectives: [
        'AI/ML 기반 이상 탐지 시스템 구축',
        '패턴 분석 및 예측 모델 개발',
        '자동 근본 원인 분석 시스템',
        '지능형 알람 필터링 구현'
      ],
      deliverables: [
        'AI 이상 탐지 엔진',
        '예측 분석 모델',
        '자동 RCA 시스템',
        '지능형 알람 관리'
      ],
      milestones: [
        { week: 14, task: 'ML 모델 설계' },
        { week: 18, task: '이상 탐지 시스템 구축' },
        { week: 22, task: '예측 모델 개발' },
        { week: 26, task: 'Phase 2 완료 및 검증' }
      ],
      icon: Sparkles,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      progress: 75
    },
    {
      phase: 'Phase 3',
      title: '자동화 확장',
      duration: '7-9개월',
      description: 'Shadow 기반 원격 제어 및 자동화 시스템',
      objectives: [
        'AWS IoT Device Shadow 기반 원격 제어',
        '안전한 OTA 업데이트 시스템',
        '자동 문제 해결 워크플로우',
        '롤백 및 복구 시스템 구축'
      ],
      deliverables: [
        'Shadow 기반 원격 제어',
        'OTA 업데이트 시스템',
        '자동 복구 시스템',
        '안전 롤백 메커니즘'
      ],
      milestones: [
        { week: 28, task: 'Shadow 시스템 설계' },
        { week: 32, task: '원격 제어 구현' },
        { week: 36, task: 'OTA 시스템 구축' },
        { week: 40, task: 'Phase 3 완료 및 검증' }
      ],
      icon: Zap,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      progress: 40
    },
    {
      phase: 'Phase 4',
      title: '최적화 및 확장',
      duration: '10-12개월',
      description: '성능 최적화 및 고급 기능 확장',
      objectives: [
        '시스템 성능 최적화',
        '고급 분석 기능 추가',
        '다중 고객사 지원 확장',
        '비즈니스 인텔리전스 강화'
      ],
      deliverables: [
        '최적화된 플랫폼',
        '고급 BI 대시보드',
        '멀티 테넌트 지원',
        '완전 자동화 시스템'
      ],
      milestones: [
        { week: 42, task: '성능 최적화' },
        { week: 46, task: '고급 분석 기능' },
        { week: 50, task: '멀티 테넌트 구현' },
        { week: 52, task: '전체 시스템 완료' }
      ],
      icon: Target,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      progress: 10
    }
  ];

  const riskMitigation = [
    {
      risk: '데이터 마이그레이션 복잡성',
      mitigation: '단계적 마이그레이션 및 병렬 운영',
      probability: 'Medium',
      impact: 'High'
    },
    {
      risk: 'AI 모델 정확도 이슈',
      mitigation: '충분한 학습 데이터 확보 및 점진적 개선',
      probability: 'Low',
      impact: 'Medium'
    },
    {
      risk: '시스템 통합 지연',
      mitigation: 'API 우선 설계 및 모듈식 개발',
      probability: 'Medium',
      impact: 'Medium'
    }
  ];

  const resources = [
    {
      role: 'PM/아키텍트',
      count: 2,
      responsibility: '전체 프로젝트 관리 및 아키텍처 설계'
    },
    {
      role: '백엔드 개발자',
      count: 4,
      responsibility: '데이터 플랫폼 및 API 개발'
    },
    {
      role: 'ML 엔지니어',
      count: 2,
      responsibility: 'AI/ML 모델 개발 및 최적화'
    },
    {
      role: 'DevOps 엔지니어',
      count: 2,
      responsibility: '인프라 구축 및 운영 자동화'
    },
    {
      role: 'QA 엔지니어',
      count: 2,
      responsibility: '품질 보증 및 테스트'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 sm:space-y-6 md:space-y-8 h-full flex flex-col"
    >
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-4 sm:mb-6 md:mb-8"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent px-2 font-bold break-words">
          5. 구현 로드맵
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-slate-100 max-w-3xl mx-auto px-4 leading-relaxed font-medium break-words">
          12개월간의 단계적 구현 계획 및 마일스톤
        </p>
      </motion.div>

      <div className="flex-1 space-y-6 sm:space-y-8">
        {/* Phase Timeline */}
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3 px-2 font-semibold">
            <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400 flex-shrink-0" />
            <span className="break-words">4단계 구현 계획</span>
          </h3>
          
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            {phases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.2 }}
              >
                <Card className={`bg-white/5 border-2 ${phase.borderColor} hover:bg-white/10 transition-all duration-300`}>
                  <CardContent className="p-2 sm:p-4 md:p-6">
                    <div className="flex flex-col gap-3 sm:gap-4 md:gap-6">
                      {/* Phase Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
                          <div className={`p-1.5 sm:p-2 md:p-3 rounded-lg ${phase.bgColor} flex-shrink-0 mt-0.5`}>
                            <phase.icon className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ${phase.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                              <h4 className="text-base sm:text-lg text-white font-semibold break-words">
                                {phase.phase}: {phase.title}
                              </h4>
                              <Badge variant="outline" className="border-white/40 text-slate-100 bg-white/5 self-start text-xs px-2 py-1 font-medium whitespace-nowrap">
                                {phase.duration}
                              </Badge>
                            </div>
                            <p className="text-slate-200 text-xs sm:text-sm font-medium break-words">
                              {phase.description}
                            </p>
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="mb-3 sm:mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-200 text-xs sm:text-sm font-medium">진행률</span>
                            <span className="text-white text-xs sm:text-sm font-semibold">{phase.progress}%</span>
                          </div>
                          <Progress value={phase.progress} className="h-2" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                          {/* Objectives */}
                          <div>
                            <h5 className="text-white text-xs sm:text-sm mb-2 sm:mb-3 font-semibold">주요 목표</h5>
                            <div className="space-y-1 sm:space-y-2">
                              {phase.objectives.map((objective, objIndex) => (
                                <div key={objIndex} className="flex items-start gap-1 sm:gap-2 text-xs sm:text-sm">
                                  <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-slate-200 font-medium break-words">{objective}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Deliverables */}
                          <div>
                            <h5 className="text-white text-xs sm:text-sm mb-2 sm:mb-3 font-semibold">주요 산출물</h5>
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                              {phase.deliverables.map((deliverable, delIndex) => (
                                <Badge 
                                  key={delIndex} 
                                  variant="outline" 
                                  className="border-white/40 text-slate-100 bg-white/5 text-xs px-2 py-1 font-medium break-words"
                                >
                                  {deliverable}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Milestones */}
                        <div className="mt-3 sm:mt-4 col-span-1 sm:col-span-2">
                          <h5 className="text-white text-xs sm:text-sm mb-2 sm:mb-3 font-semibold">주요 마일스톤</h5>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
                            {phase.milestones.map((milestone, msIndex) => (
                              <div key={msIndex} className="bg-white/10 p-1.5 sm:p-2 rounded text-xs text-center">
                                <div className="text-white mb-0.5 sm:mb-1 font-semibold">{milestone.week}주차</div>
                                <div className="text-slate-200 text-xs leading-tight break-words">{milestone.task}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Resources & Risk Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Team Resources */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <h3 className="text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3 px-2 font-semibold">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 flex-shrink-0" />
              <span className="break-words">팀 구성</span>
            </h3>
            
            <div className="bg-white/5 border border-white/20 rounded-lg p-2 sm:p-4 md:p-6">
              <div className="space-y-3 sm:space-y-4">
                {resources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-white/5 rounded-lg">
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="text-white mb-0.5 sm:mb-1 text-sm sm:text-base font-semibold break-words">
                        {resource.role}
                      </div>
                      <div className="text-slate-200 text-xs sm:text-sm font-medium break-words">
                        {resource.responsibility}
                      </div>
                    </div>
                    <div className="text-center flex-shrink-0">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500/30 rounded-full flex items-center justify-center text-blue-200 text-xs sm:text-sm font-semibold">
                        {resource.count}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl text-blue-400 mb-1 font-bold">총 12명</div>
                  <div className="text-slate-200 text-xs sm:text-sm font-medium">전담 개발팀</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Risk Management */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <h3 className="text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3 px-2 font-semibold">
              <Target className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400 flex-shrink-0" />
              <span className="break-words">리스크 관리</span>
            </h3>
            
            <div className="space-y-3 sm:space-y-4">
              {riskMitigation.map((risk, index) => (
                <div key={index} className="bg-white/5 border border-white/20 rounded-lg p-2 sm:p-3 md:p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                    <h5 className="text-white text-sm sm:text-base font-semibold flex-1 min-w-0 break-words">
                      {risk.risk}
                    </h5>
                    <div className="flex gap-1 sm:gap-2 self-start flex-shrink-0">
                      <Badge 
                        variant="outline" 
                        className={`text-xs px-1.5 py-0.5 font-medium whitespace-nowrap ${
                          risk.probability === 'High' ? 'border-red-500/60 text-red-200 bg-red-500/20' :
                          risk.probability === 'Medium' ? 'border-orange-500/60 text-orange-200 bg-orange-500/20' :
                          'border-green-500/60 text-green-200 bg-green-500/20'
                        }`}
                      >
                        {risk.probability}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={`text-xs px-1.5 py-0.5 font-medium whitespace-nowrap ${
                          risk.impact === 'High' ? 'border-red-500/60 text-red-200 bg-red-500/20' :
                          risk.impact === 'Medium' ? 'border-orange-500/60 text-orange-200 bg-orange-500/20' :
                          'border-green-500/60 text-green-200 bg-green-500/20'
                        }`}
                      >
                        {risk.impact}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-slate-200 text-xs sm:text-sm font-medium break-words">
                    {risk.mitigation}
                  </p>
                </div>
              ))}
            </div>

            {/* Success Factors */}
            <div className="mt-4 sm:mt-6 bg-green-500/10 border border-green-500/20 rounded-lg p-3 sm:p-4">
              <h5 className="text-white mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base font-semibold">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 flex-shrink-0" />
                <span className="break-words">성공 요인</span>
              </h5>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-slate-200 font-medium">
                <div className="break-words">• 단계적 구현으로 리스크 최소화</div>
                <div className="break-words">• 검증된 AWS 서비스 활용</div>
                <div className="break-words">• 전문 개발팀 구성</div>
                <div className="break-words">• 지속적인 모니터링 및 개선</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Timeline Summary */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="text-center bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/40 rounded-lg p-3 sm:p-4 md:p-6"
      >
        <h4 className="text-base sm:text-lg md:text-xl text-white mb-2 font-bold break-words">
          📅 12개월 완성 · 단계적 구현 · 점진적 가치 실현
        </h4>
        <p className="text-slate-100 text-sm sm:text-base font-medium break-words">
          각 단계별로 즉시 비즈니스 가치를 확인하며 안정적인 구현
        </p>
      </motion.div>
    </motion.div>
  );
}