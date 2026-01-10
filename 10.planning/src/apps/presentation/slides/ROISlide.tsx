import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Progress } from '../../../components/ui/progress';
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
      className="space-y-4 sm:space-y-6 md:space-y-8 h-full flex flex-col"
    >
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-4 sm:mb-6 md:mb-8"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent px-2 font-bold break-words">
          ROI & 비즈니스 임팩트
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-3xl mx-auto px-4 leading-relaxed font-medium break-words">
          투자 대비 수익률 분석 및 장기적 비즈니스 가치
        </p>
      </motion.div>

      <div className="flex-1 space-y-6 sm:space-y-8">
        {/* ROI Summary */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
        >
          <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/40">
            <CardContent className="p-3 sm:p-4 md:p-6 text-center">
              <DollarSign className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-400 mx-auto mb-2 sm:mb-3 md:mb-4" />
              <div className="text-2xl sm:text-3xl text-green-400 mb-1 sm:mb-2 font-bold break-words">332%</div>
              <div className="text-white mb-1 text-sm sm:text-base font-semibold break-words">24개월 ROI</div>
              <div className="text-slate-200 text-xs sm:text-sm font-medium break-words">투자 회수</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/40">
            <CardContent className="p-3 sm:p-4 md:p-6 text-center">
              <Calculator className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-blue-400 mx-auto mb-2 sm:mb-3 md:mb-4" />
              <div className="text-2xl sm:text-3xl text-blue-400 mb-1 sm:mb-2 font-bold break-words">9개월</div>
              <div className="text-white mb-1 text-sm sm:text-base font-semibold break-words">손익분기점</div>
              <div className="text-slate-200 text-xs sm:text-sm font-medium break-words">투자 회수 기간</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500/40">
            <CardContent className="p-3 sm:p-4 md:p-6 text-center">
              <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-purple-400 mx-auto mb-2 sm:mb-3 md:mb-4" />
              <div className="text-2xl sm:text-3xl text-purple-400 mb-1 sm:mb-2 font-bold break-words">43.2억</div>
              <div className="text-white mb-1 text-sm sm:text-base font-semibold break-words">연간 절감액</div>
              <div className="text-slate-200 text-xs sm:text-sm font-medium break-words">운영비 절감</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border-2 border-orange-500/40">
            <CardContent className="p-3 sm:p-4 md:p-6 text-center">
              <Target className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-orange-400 mx-auto mb-2 sm:mb-3 md:mb-4" />
              <div className="text-2xl sm:text-3xl text-orange-400 mb-1 sm:mb-2 font-bold break-words">216%</div>
              <div className="text-white mb-1 text-sm sm:text-base font-semibold break-words">순이익률</div>
              <div className="text-slate-200 text-xs sm:text-sm font-medium break-words">2년차 기준</div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Investment Breakdown */}
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3 px-2 font-semibold">
              <PieChart className="h-5 w-5 sm:h-6 sm:w-6 text-red-400 flex-shrink-0" />
              <span className="break-words">투자 구성 (총 20억원)</span>
            </h3>
            
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-3 sm:space-y-4"
            >
              {investmentBreakdown.map((item, index) => (
                <div key={index} className="bg-white/5 border border-white/20 rounded-lg p-2 sm:p-3 md:p-4">
                  <div className="flex justify-between items-center mb-2 sm:mb-3">
                    <h5 className="text-white text-sm sm:text-base font-semibold break-words">
                      {item.category}
                    </h5>
                    <div className="text-right flex-shrink-0">
                      <div className="text-white text-sm sm:text-base font-semibold">{item.amount}억원</div>
                      <div className="text-slate-300 text-xs sm:text-sm font-medium">{item.percentage}%</div>
                    </div>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2 sm:h-3 mb-2 sm:mb-3">
                    <div 
                      className="h-2 sm:h-3 rounded-full transition-all duration-700 bg-gradient-to-r from-red-400 to-orange-400"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <p className="text-slate-200 text-xs sm:text-sm mb-1 sm:mb-2 font-medium break-words">
                    {item.description}
                  </p>
                  <div className="space-y-0.5 sm:space-y-1">
                    {item.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="text-slate-300 text-xs flex items-center gap-1.5 sm:gap-2 font-medium">
                        <div className="w-1 h-1 bg-slate-300 rounded-full flex-shrink-0"></div>
                        <span className="break-words">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Savings Breakdown */}
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3 px-2 font-semibold">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 flex-shrink-0" />
              <span className="break-words">절감 효과 (연간 43.2억원)</span>
            </h3>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="space-y-3 sm:space-y-4"
            >
              {savingsBreakdown.map((item, index) => (
                <div key={index} className="bg-white/5 border border-white/20 rounded-lg p-2 sm:p-3 md:p-4">
                  <div className="flex justify-between items-center mb-1 sm:mb-2">
                    <h5 className="text-white text-sm sm:text-base font-semibold break-words">
                      {item.category}
                    </h5>
                    <div className="text-right flex-shrink-0">
                      <div className="text-green-400 text-sm sm:text-base font-semibold">{item.annual}억원/년</div>
                      <div className="text-slate-300 text-xs sm:text-sm font-medium">{item.monthly}억원/월</div>
                    </div>
                  </div>
                  <p className="text-slate-200 text-xs sm:text-sm mb-1 sm:mb-2 font-medium break-words">
                    {item.description}
                  </p>
                  <div className="text-slate-200 text-xs bg-white/10 p-1.5 sm:p-2 rounded font-medium break-words">
                    💡 {item.calculation}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ROI Timeline */}
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3 px-2 font-semibold">
            <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 flex-shrink-0" />
            <span className="break-words">ROI 타임라인</span>
          </h3>
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="bg-white/5 border border-white/20 rounded-lg p-2 sm:p-4 md:p-6"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/30">
                    <th className="text-left text-white p-2 sm:p-3 text-xs sm:text-sm font-semibold whitespace-nowrap">기간</th>
                    <th className="text-right text-white p-2 sm:p-3 text-xs sm:text-sm font-semibold whitespace-nowrap">누적 투자</th>
                    <th className="text-right text-white p-2 sm:p-3 text-xs sm:text-sm font-semibold whitespace-nowrap">누적 절감</th>
                    <th className="text-right text-white p-2 sm:p-3 text-xs sm:text-sm font-semibold whitespace-nowrap">ROI (%)</th>
                    <th className="text-right text-white p-2 sm:p-3 text-xs sm:text-sm font-semibold whitespace-nowrap">순수익</th>
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
                      <td className="p-2 sm:p-3 text-white text-xs sm:text-sm font-medium whitespace-nowrap">
                        {period.period}
                      </td>
                      <td className="p-2 sm:p-3 text-right text-slate-200 text-xs sm:text-sm font-medium whitespace-nowrap">
                        {period.investment}억원
                      </td>
                      <td className="p-2 sm:p-3 text-right text-green-400 text-xs sm:text-sm font-semibold whitespace-nowrap">
                        {period.savings}억원
                      </td>
                      <td className="p-2 sm:p-3 text-right">
                        <Badge 
                          variant={period.roi > 0 ? "default" : "destructive"}
                          className={`text-xs px-1.5 py-0.5 font-medium whitespace-nowrap ${period.roi > 0 ? "bg-green-500/30 text-green-200 border-green-400/60" : "bg-red-500/30 text-red-200 border-red-400/60"}`}
                        >
                          {period.roi > 0 ? '+' : ''}{period.roi}%
                        </Badge>
                      </td>
                      <td className="p-2 sm:p-3 text-right">
                        <span className={`text-xs sm:text-sm font-semibold whitespace-nowrap ${period.cumulative > 0 ? 'text-green-400' : 'text-red-400'}`}>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Business Impact */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <h3 className="text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3 px-2 font-semibold">
              <Target className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400 flex-shrink-0" />
              <span className="break-words">비즈니스 임팩트</span>
            </h3>
            
            <div className="space-y-3 sm:space-y-4">
              {businessImpacts.map((impact, index) => (
                <div key={index} className="bg-white/5 border border-white/20 rounded-lg p-2 sm:p-3 md:p-4">
                  <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                    <impact.icon className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ${impact.color} flex-shrink-0 mt-0.5`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
                        <h5 className="text-white text-sm sm:text-base font-semibold break-words">
                          {impact.metric}
                        </h5>
                        <Badge variant="outline" className="border-green-500/60 text-green-200 bg-green-500/20 text-xs px-2 py-0.5 font-medium self-start sm:self-center whitespace-nowrap">
                          +{impact.improvement}
                        </Badge>
                      </div>
                      <p className="text-slate-200 text-xs sm:text-sm mt-1 font-medium break-words">
                        {impact.value}
                      </p>
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
            <h3 className="text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3 px-2 font-semibold">
              <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400 flex-shrink-0" />
              <span className="break-words">경쟁사 대비 우위</span>
            </h3>
            
            <div className="space-y-3 sm:space-y-4">
              {competitorComparison.map((comp, index) => (
                <div key={index} className="bg-white/5 border border-white/20 rounded-lg p-2 sm:p-3 md:p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2 sm:mb-3">
                    <h5 className="text-white text-sm sm:text-base font-semibold break-words">
                      {comp.aspect}
                    </h5>
                    <Badge variant="outline" className="border-green-500/60 text-green-200 bg-green-500/20 text-xs px-2 py-0.5 font-medium self-start sm:self-center whitespace-nowrap">
                      {comp.advantage}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                    <div className="text-center p-2 bg-blue-500/20 border border-blue-500/40 rounded">
                      <div className="text-slate-200 mb-1 font-medium break-words">우리 솔루션</div>
                      <div className="text-blue-300 font-semibold break-words">{comp.us}</div>
                    </div>
                    <div className="text-center p-2 bg-gray-500/20 border border-gray-500/40 rounded">
                      <div className="text-slate-200 mb-1 font-medium break-words">일반 솔루션</div>
                      <div className="text-gray-300 font-semibold break-words">{comp.competitor}</div>
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
        className="text-center bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 rounded-lg p-3 sm:p-4 md:p-6"
      >
        <h4 className="text-base sm:text-lg md:text-xl text-white mb-2 font-bold break-words">
          💰 2년간 332% ROI · 연간 43억원 절감 · 9개월 투자회수
        </h4>
        <p className="text-slate-100 text-sm sm:text-base font-medium break-words">
          지속 가능한 비즈니스 성장과 운영 효율성 극대화
        </p>
      </motion.div>
    </motion.div>
  );
}