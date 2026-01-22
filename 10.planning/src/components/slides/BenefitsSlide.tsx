import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { CheckCircle2, TrendingUp, Zap, Shield, Users, DollarSign, Clock, Target, Sparkles, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';

export function BenefitsSlide() {
  const keyBenefits = [
    {
      icon: Zap,
      title: '자동화된 운영',
      description: '수동 개입 없는 완전 자동화 운영',
      metrics: [
        { label: '자동 해결률', value: 85, unit: '%', improvement: '+65%' },
        { label: '운영 효율성', value: 92, unit: '%', improvement: '+42%' }
      ],
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30'
    },
    {
      icon: BarChart3,
      title: '통합 분석',
      description: 'AI 기반 예측 분석 및 패턴 인식',
      metrics: [
        { label: '알람 정확도', value: 98, unit: '%', improvement: '+68%' },
        { label: '예측 정확도', value: 94, unit: '%', improvement: '+74%' }
      ],
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30'
    },
    {
      icon: Clock,
      title: '빠른 대응 시간',
      description: '문제 감지부터 해결까지 최소 시간',
      metrics: [
        { label: '평균 복구 시간', value: 75, unit: '% 단축', improvement: '4시간→15분' },
        { label: '알람 응답', value: 90, unit: '% 개선', improvement: '<30초' }
      ],
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30'
    },
    {
      icon: DollarSign,
      title: '비용 최적화',
      description: '운영비 절감 및 ROI 극대화',
      metrics: [
        { label: '운영비 절감', value: 40, unit: '%', improvement: '연간 2억원 절약' },
        { label: '현장 출동', value: 70, unit: '% 감소', improvement: '월 120→36건' }
      ],
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30'
    }
  ];

  const businessImpact = [
    {
      category: '운영 효율성',
      improvements: [
        { metric: '알람 오탐률', before: '30%', after: '2%', improvement: '93% 감소' },
        { metric: '자동화 수준', before: '20%', after: '85%', improvement: '325% 증가' },
        { metric: '데이터 활용도', before: '30%', after: '95%', improvement: '217% 증가' }
      ],
      icon: TrendingUp,
      color: 'text-green-400'
    },
    {
      category: '고객 만족도',
      improvements: [
        { metric: '서비스 가용성', before: '95%', after: '99.5%', improvement: '4.5%p 증가' },
        { metric: '평균 복구 시간', before: '4시간', after: '15분', improvement: '94% 단축' },
        { metric: '고객 응답 시간', before: '2시간', after: '5분', improvement: '96% 단축' }
      ],
      icon: Users,
      color: 'text-blue-400'
    }
  ];

  const competitiveAdvantages = [
    {
      title: '통합 플랫폼',
      description: '7개 분산 시스템을 단일 플랫폼으로 통합',
      advantage: '관리 복잡성 80% 감소',
      icon: Target
    },
    {
      title: '예측적 유지보수',
      description: 'AI 기반 장애 예측 및 사전 대응',
      advantage: '예방 가능한 장애 90% 사전 차단',
      icon: Sparkles
    },
    {
      title: '완전 자동화',
      description: '감지부터 해결까지 무인 자동화',
      advantage: '24/7 무인 운영 가능',
      icon: Shield
    }
  ];

  const roi = [
    { period: '3개월', value: '40%', description: '초기 개선 효과 확인' },
    { period: '6개월', value: '180%', description: '운영 최적화 달성' },
    { period: '12개월', value: '320%', description: '완전한 ROI 실현' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 h-full flex flex-col"
    >
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h2 className="text-4xl mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          핵심 기능 및 이점
        </h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          데이터 통합 플랫폼이 제공하는 혁신적인 가치와 비즈니스 임팩트
        </p>
      </motion.div>

      <div className="flex-1 space-y-8">
        {/* Key Benefits Grid */}
        <div>
          <h3 className="text-2xl text-white mb-6 flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-green-400" />
            핵심 이점
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {keyBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className={`bg-white/5 border-2 ${benefit.borderColor} hover:bg-white/10 transition-all duration-300 h-full`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-lg ${benefit.bgColor}`}>
                        <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                      </div>
                      <div>
                        <h4 className="text-lg text-white mb-1">{benefit.title}</h4>
                        <p className="text-slate-300 text-sm">{benefit.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {benefit.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-300 text-sm">{metric.label}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-white">{metric.value}{metric.unit}</span>
                              <Badge variant="secondary" className="bg-green-500/20 text-green-300 text-xs">
                                {metric.improvement}
                              </Badge>
                            </div>
                          </div>
                          <Progress value={metric.value} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Business Impact */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl text-white mb-6 flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-purple-400" />
              비즈니스 임팩트
            </h3>
            
            <div className="space-y-6">
              {businessImpact.map((impact, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.2 }}
                  className="bg-white/5 border border-white/20 rounded-lg p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <impact.icon className={`h-6 w-6 ${impact.color}`} />
                    <h4 className="text-lg text-white">{impact.category}</h4>
                  </div>
                  
                  <div className="space-y-3">
                    {impact.improvements.map((improvement, impIndex) => (
                      <div key={impIndex} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <div>
                          <div className="text-white text-sm">{improvement.metric}</div>
                          <div className="text-slate-400 text-xs">
                            {improvement.before} → {improvement.after}
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                          {improvement.improvement}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Competitive Advantages */}
            <div>
              <h3 className="text-2xl text-white mb-6 flex items-center gap-3">
                <Target className="h-6 w-6 text-orange-400" />
                경쟁 우위
              </h3>
              
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="space-y-4"
              >
                {competitiveAdvantages.map((advantage, index) => (
                  <div key={index} className="bg-white/5 border border-white/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <advantage.icon className="h-5 w-5 text-orange-400 mt-1" />
                      <div className="flex-1">
                        <h5 className="text-white mb-1">{advantage.title}</h5>
                        <p className="text-slate-300 text-sm mb-2">{advantage.description}</p>
                        <Badge variant="outline" className="border-orange-500/30 text-orange-300">
                          {advantage.advantage}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ROI Timeline */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-6"
            >
              <h4 className="text-white text-lg mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-400" />
                ROI 타임라인
              </h4>
              
              <div className="space-y-4">
                {roi.map((period, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="text-white">{period.period}</div>
                      <div className="text-slate-300 text-sm">{period.description}</div>
                    </div>
                    <div className="text-2xl text-green-400">{period.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Summary */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-center bg-gradient-to-r from-green-500/10 to-purple-500/10 border border-green-500/20 rounded-lg p-6"
      >
        <h4 className="text-xl text-white mb-2">
          🎯 연간 운영비 40% 절감 및 서비스 품질 90% 향상
        </h4>
        <p className="text-slate-300">
          데이터 통합 기반 자동화 시스템으로 혁신적인 운영 효율성 달성
        </p>
      </motion.div>
    </motion.div>
  );
}