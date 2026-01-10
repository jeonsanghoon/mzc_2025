import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { DollarSign, TrendingUp, Target, Calculator, PieChart, BarChart3, CheckCircle2, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export function ROISlide() {
  const investmentBreakdown = [
    {
      category: '개발 비용',
      amount: 8.5,
      percentage: 42.5,
      description: '12개월 개발팀 비용',
      details: ['전담 개발팀 12명', '12개월 개발 기간', 'AWS 인프라 구축']
    },
    {
      category: '인프라 비용',
      amount: 4.2,
      percentage: 21,
      description: 'AWS 클라우드 인프라',
      details: ['초기 구축 비용', '1년간 운영 비용', '확장 대비 리소스']
    },
    {
      category: '라이선스 비용',
      amount: 2.8,
      percentage: 14,
      description: '소프트웨어 라이선스',
      details: ['AI/ML 서비스', '모니터링 도구', '보안 솔루션']
    },
    {
      category: '운영 및 교육',
      amount: 4.5,
      percentage: 22.5,
      description: '운영 준비 및 교육',
      details: ['팀 교육 비용', '시스템 전환 비용', '초기 운영 지원']
    }
  ];

  const savingsBreakdown = [
    {
      category: '현장 출동 절감',
      monthly: 3.5,
      annual: 42,
      description: '원격 해결로 출동 70% 감소',
      calculation: '월 120건 → 36건 (84건 × 41만원)'
    },
    {
      category: '운영 인력 최적화',
      monthly: 2.8,
      annual: 33.6,
      description: '자동화로 운영 인력 40% 절감',
      calculation: '24시간 모니터링 인력 재배치'
    },
    {
      category: '장애 대응 시간 단축',
      monthly: 1.5,
      annual: 18,
      description: '복구 시간 단축으로 손실 최소화',
      calculation: '평균 복구시간 4시간 → 15분'
    },
    {
      category: '예방 유지보수',
      monthly: 1.2,
      annual: 14.4,
      description: '예측 기반 사전 대응',
      calculation: '긴급 수리 60% 감소'
    }
  ];

  const roiTimeline = [
    { period: '3개월', investment: 5.0, savings: 2.0, roi: -60, cumulative: -3.0 },
    { period: '6개월', investment: 12.0, savings: 10.8, roi: -10, cumulative: -1.2 },
    { period: '9개월', investment: 16.0, savings: 24.3, roi: 52, cumulative: 8.3 },
    { period: '12개월', investment: 20.0, savings: 43.2, roi: 116, cumulative: 23.2 },
    { period: '18개월', investment: 20.0, savings: 64.8, roi: 224, cumulative: 44.8 },
    { period: '24개월', investment: 20.0, savings: 86.4, roi: 332, cumulative: 66.4 }
  ];

  const businessImpacts = [
    {
      metric: '고객 만족도',
      improvement: '25%',
      value: '고객 유지율 향상',
      icon: Target,
      color: 'text-green-400'
    },
    {
      metric: '서비스 품질',
      improvement: '90%',
      value: '알람 정확도 향상',
      icon: CheckCircle2,
      color: 'text-blue-400'
    },
    {
      metric: '운영 효율성',
      improvement: '65%',
      value: '자동화 수준 향상',
      icon: Zap,
      color: 'text-purple-400'
    },
    {
      metric: '확장 가능성',
      improvement: '300%',
      value: '신규 고객 대응 능력',
      icon: TrendingUp,
      color: 'text-orange-400'
    }
  ];

  const competitorComparison = [
    {
      aspect: '구현 비용',
      us: '20억원',
      competitor: '35억원',
      advantage: '43% 절감'
    },
    {
      aspect: '구현 기간',
      us: '12개월',
      competitor: '18개월',
      advantage: '6개월 단축'
    },
    {
      aspect: '자동화 수준',
      us: '85%',
      competitor: '45%',
      advantage: '40%p 우위'
    },
    {
      aspect: '연간 절감액',
      us: '43.2억원',
      competitor: '18.5억원',
      advantage: '134% 우위'
    }
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
        <h2 className="text-4xl mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          ROI & 비즈니스 임팩트
        </h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          투자 대비 수익률 분석 및 장기적 비즈니스 가치
        </p>
      </motion.div>

      <div className="flex-1 space-y-8">
        {/* ROI Summary */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-4 gap-6"
        >
          <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/30">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-4" />
              <div className="text-3xl text-green-400 mb-2">332%</div>
              <div className="text-white mb-1">24개월 ROI</div>
              <div className="text-slate-300 text-sm">투자 회수</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30">
            <CardContent className="p-6 text-center">
              <Calculator className="h-8 w-8 text-blue-400 mx-auto mb-4" />
              <div className="text-3xl text-blue-400 mb-2">9개월</div>
              <div className="text-white mb-1">손익분기점</div>
              <div className="text-slate-300 text-sm">투자 회수 기간</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-purple-400 mx-auto mb-4" />
              <div className="text-3xl text-purple-400 mb-2">43.2억</div>
              <div className="text-white mb-1">연간 절감액</div>
              <div className="text-slate-300 text-sm">운영비 절감</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border-2 border-orange-500/30">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-orange-400 mx-auto mb-4" />
              <div className="text-3xl text-orange-400 mb-2">216%</div>
              <div className="text-white mb-1">순이익률</div>
              <div className="text-slate-300 text-sm">2년차 기준</div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Investment Breakdown */}
          <div>
            <h3 className="text-2xl text-white mb-6 flex items-center gap-3">
              <PieChart className="h-6 w-6 text-red-400" />
              투자 구성 (총 20억원)
            </h3>
            
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              {investmentBreakdown.map((item, index) => (
                <div key={index} className="bg-white/5 border border-white/20 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="text-white">{item.category}</h5>
                    <div className="text-right">
                      <div className="text-white">{item.amount}억원</div>
                      <div className="text-slate-400 text-sm">{item.percentage}%</div>
                    </div>
                  </div>
                  <Progress value={item.percentage} className="h-2 mb-3" />
                  <p className="text-slate-300 text-sm mb-2">{item.description}</p>
                  <div className="space-y-1">
                    {item.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="text-slate-400 text-xs flex items-center gap-2">
                        <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Savings Breakdown */}
          <div>
            <h3 className="text-2xl text-white mb-6 flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-green-400" />
              절감 효과 (연간 43.2억원)
            </h3>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              {savingsBreakdown.map((item, index) => (
                <div key={index} className="bg-white/5 border border-white/20 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="text-white">{item.category}</h5>
                    <div className="text-right">
                      <div className="text-green-400">{item.annual}억원/년</div>
                      <div className="text-slate-400 text-sm">{item.monthly}억원/월</div>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm mb-2">{item.description}</p>
                  <div className="text-slate-400 text-xs bg-white/5 p-2 rounded">
                    💡 {item.calculation}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ROI Timeline */}
        <div>
          <h3 className="text-2xl text-white mb-6 flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-blue-400" />
            ROI 타임라인
          </h3>
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="bg-white/5 border border-white/20 rounded-lg p-6"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left text-white p-3">기간</th>
                    <th className="text-right text-white p-3">누적 투자</th>
                    <th className="text-right text-white p-3">누적 절감</th>
                    <th className="text-right text-white p-3">ROI (%)</th>
                    <th className="text-right text-white p-3">순수익</th>
                  </tr>
                </thead>
                <tbody>
                  {roiTimeline.map((period, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.0 + index * 0.1 }}
                      className={`border-b border-white/10 ${period.roi > 0 ? 'bg-green-500/5' : 'bg-red-500/5'}`}
                    >
                      <td className="p-3 text-white">{period.period}</td>
                      <td className="p-3 text-right text-slate-300">{period.investment}억원</td>
                      <td className="p-3 text-right text-green-400">{period.savings}억원</td>
                      <td className="p-3 text-right">
                        <Badge 
                          variant={period.roi > 0 ? "default" : "destructive"}
                          className={period.roi > 0 ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}
                        >
                          {period.roi > 0 ? '+' : ''}{period.roi}%
                        </Badge>
                      </td>
                      <td className="p-3 text-right">
                        <span className={period.cumulative > 0 ? 'text-green-400' : 'text-red-400'}>
                          {period.cumulative > 0 ? '+' : ''}{period.cumulative}억원
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Business Impact & Competitive Advantage */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Business Impact */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <h3 className="text-2xl text-white mb-6 flex items-center gap-3">
              <Target className="h-6 w-6 text-purple-400" />
              비즈니스 임팩트
            </h3>
            
            <div className="space-y-4">
              {businessImpacts.map((impact, index) => (
                <div key={index} className="bg-white/5 border border-white/20 rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <impact.icon className={`h-6 w-6 ${impact.color}`} />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h5 className="text-white">{impact.metric}</h5>
                        <Badge variant="outline" className="border-green-500/30 text-green-300">
                          +{impact.improvement}
                        </Badge>
                      </div>
                      <p className="text-slate-300 text-sm mt-1">{impact.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Competitive Comparison */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <h3 className="text-2xl text-white mb-6 flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-orange-400" />
              경쟁사 대비 우위
            </h3>
            
            <div className="space-y-4">
              {competitorComparison.map((comp, index) => (
                <div key={index} className="bg-white/5 border border-white/20 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="text-white text-sm">{comp.aspect}</h5>
                    <Badge variant="outline" className="border-green-500/30 text-green-300">
                      {comp.advantage}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-2 bg-blue-500/10 rounded">
                      <div className="text-slate-400 mb-1">우리 솔루션</div>
                      <div className="text-blue-400">{comp.us}</div>
                    </div>
                    <div className="text-center p-2 bg-gray-500/10 rounded">
                      <div className="text-slate-400 mb-1">일반 솔루션</div>
                      <div className="text-gray-400">{comp.competitor}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom ROI Summary */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.7 }}
        className="text-center bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-6"
      >
        <h4 className="text-xl text-white mb-2">
          💰 2년간 332% ROI · 연간 43억원 절감 · 9개월 투자회수
        </h4>
        <p className="text-slate-300">
          지속 가능한 비즈니스 성장과 운영 효율성 극대화
        </p>
      </motion.div>
    </motion.div>
  );
}