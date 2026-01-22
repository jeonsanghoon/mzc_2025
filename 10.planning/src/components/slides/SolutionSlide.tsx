import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Database, Zap, BarChart3, Settings, Shield, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function SolutionSlide() {
  const coreFeatures = [
    {
      icon: Database,
      title: '통합 데이터 플랫폼',
      description: '7개 분산 시스템의 데이터를 단일 플랫폼으로 통합',
      benefits: ['실시간 데이터 동기화', '표준화된 스키마', '데이터 품질 보장'],
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: BarChart3,
      title: '통합 분석',
      description: '기계학습을 활용한 예측 분석 및 이상 탐지',
      benefits: ['패턴 기반 예측', '근본 원인 분석', '자동 알람 필터링'],
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    {
      icon: Zap,
      title: '실시간 자동화',
      description: '문제 감지부터 해결까지 완전 자동화된 워크플로우',
      benefits: ['즉시 대응', '자동 복구', '무인 운영'],
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      icon: Shield,
      title: '안전한 원격 제어',
      description: 'Shadow 기반의 안전하고 신뢰할 수 있는 원격 관리',
      benefits: ['보안 강화', '롤백 지원', '단계별 배포'],
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10'
    }
  ];

  const solutionFlow = [
    {
      step: '01',
      title: '데이터 수집',
      description: '7개 시스템으로부터 실시간 데이터 수집',
      icon: Database
    },
    {
      step: '02',
      title: '통합 분석',
      description: '패턴 분석 및 이상 탐지',
      icon: BarChart3
    },
    {
      step: '03',
      title: '자동 대응',
      description: '예측 기반 자동 문제 해결',
      icon: Zap
    },
    {
      step: '04',
      title: '검증 및 학습',
      description: '결과 검증 및 모델 개선',
      icon: CheckCircle2
    }
  ];

  const keyMetrics = [
    { label: '알람 정확도', value: '98%', improvement: '+68%' },
    { label: '자동 해결률', value: '85%', improvement: '+65%' },
    { label: '운영비 절감', value: '40%', improvement: '-40%' },
    { label: '복구 시간', value: '15분', improvement: '-75%' }
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
        <h2 className="text-4xl mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          데이터 통합 솔루션
        </h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          데이터 통합 기반 차세대 IoT 관리 솔루션
        </p>
      </motion.div>

      <div className="flex-1 grid lg:grid-cols-3 gap-8">
        {/* Core Features */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-2xl text-white mb-6 flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-blue-400" />
            핵심 기능
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.15 }}
              >
                <Card className="bg-white/5 border-white/20 hover:bg-white/10 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-3 rounded-lg ${feature.bgColor}`}>
                        <feature.icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg text-white mb-2">{feature.title}</h4>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-400" />
                          <span className="text-slate-300">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Solution Flow & Metrics */}
        <div className="space-y-6">
          {/* Solution Flow */}
          <div>
            <h3 className="text-2xl text-white mb-6 flex items-center gap-3">
              <Settings className="h-6 w-6 text-purple-400" />
              솔루션 플로우
            </h3>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="space-y-4"
            >
              {solutionFlow.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="relative"
                >
                  <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/20 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="text-white mb-1">{step.title}</div>
                      <div className="text-slate-300 text-sm">{step.description}</div>
                    </div>
                    <step.icon className="h-5 w-5 text-blue-400" />
                  </div>
                  {index < solutionFlow.length - 1 && (
                    <div className="flex justify-center mt-2 mb-2">
                      <ArrowRight className="h-4 w-4 text-slate-500" />
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Key Metrics */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-6"
          >
            <h4 className="text-white text-lg mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              예상 개선 효과
            </h4>
            <div className="space-y-3">
              {keyMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-slate-300 text-sm">{metric.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white">{metric.value}</span>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        metric.improvement.startsWith('+') 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-blue-500/20 text-blue-300'
                      }`}
                    >
                      {metric.improvement}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Value Proposition */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-6"
      >
        <h4 className="text-xl text-white mb-2">
          🚀 데이터 통합 솔루션
        </h4>
        <p className="text-slate-300">
          데이터 → 분석 → 예측 → 자동 해결의 완전한 자동화 사이클
        </p>
      </motion.div>
    </motion.div>
  );
}