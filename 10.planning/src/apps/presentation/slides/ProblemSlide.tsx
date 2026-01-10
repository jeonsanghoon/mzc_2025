import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { AlertTriangle, TrendingDown, XCircle, Clock, DollarSign, Users } from 'lucide-react';
import { motion } from 'motion/react';

export function ProblemSlide() {
  const problems = [
    {
      icon: XCircle,
      title: '데이터 사일로 문제',
      description: '7개 분산된 시스템으로 인한 통합 관리 불가',
      impact: '알람 오탐률 30%',
      color: 'text-red-400',
      bgColor: 'bg-red-500/20'
    },
    {
      icon: Clock,
      title: '느린 장애 대응',
      description: '수동적 모니터링으로 인한 지연된 문제 발견',
      impact: '평균 복구 시간 4시간',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20'
    },
    {
      icon: DollarSign,
      title: '높은 운영 비용',
      description: '현장 출동 과다 및 비효율적 유지보수',
      impact: '운영비 40% 초과',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20'
    },
    {
      icon: Users,
      title: '제한적 확장성',
      description: '수동 관리로 인한 스케일링 한계',
      impact: '신규 고객 대응 어려움',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    }
  ];

  const currentSituation = [
    { label: '관리 시스템', value: '7개 분산', status: 'critical' },
    { label: '알람 오탐률', value: '30%', status: 'warning' },
    { label: '현장 출동', value: '월 120건', status: 'critical' },
    { label: '평균 복구시간', value: '4시간', status: 'warning' },
    { label: '데이터 활용도', value: '30%', status: 'critical' },
    { label: '자동화 수준', value: '20%', status: 'critical' }
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
        <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent px-2 font-bold break-words">
          현재 직면한 주요 문제점
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-slate-100 max-w-3xl mx-auto px-4 leading-relaxed font-medium break-words">
          분산된 시스템과 수동적 관리 방식으로 인한 비효율성과 높은 운영 비용
        </p>
      </motion.div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {/* Problems Grid */}
        <div className="space-y-4 sm:space-y-6">
          <h3 className="text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3 px-2 font-semibold">
            <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-400 flex-shrink-0" />
            <span className="break-words">핵심 문제점</span>
          </h3>
          
          <div className="grid gap-3 sm:gap-4">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="bg-white/5 border-white/20 hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-2 sm:p-4 md:p-6">
                    <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                      <div className={`p-1.5 sm:p-2 md:p-3 rounded-lg ${problem.bgColor} flex-shrink-0 mt-0.5`}>
                        <problem.icon className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ${problem.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm sm:text-base md:text-lg text-white mb-1 sm:mb-2 font-semibold break-words">
                          {problem.title}
                        </h4>
                        <p className="text-slate-200 text-xs sm:text-sm mb-2 sm:mb-3 leading-relaxed break-words">
                          {problem.description}
                        </p>
                        <Badge variant="destructive" className="bg-red-500/40 text-red-100 border-red-400/60 text-xs px-2 py-1 font-medium break-words">
                          {problem.impact}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Current Situation Dashboard */}
        <div className="space-y-4 sm:space-y-6">
          <h3 className="text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3 px-2 font-semibold">
            <TrendingDown className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 flex-shrink-0" />
            <span className="break-words">현재 상황 지표</span>
          </h3>
          
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 border border-white/20 rounded-lg p-2 sm:p-4 md:p-6"
          >
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {currentSituation.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-2 sm:p-3 md:p-4 bg-white/5 rounded-lg"
                >
                  <span className="text-slate-300 text-xs sm:text-sm md:text-base flex-1 min-w-0 pr-2 break-words">
                    {item.label}
                  </span>
                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <span className="text-white text-sm sm:text-base md:text-lg font-semibold whitespace-nowrap">
                      {item.value}
                    </span>
                    <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${
                      item.status === 'critical' ? 'bg-red-500' :
                      item.status === 'warning' ? 'bg-orange-500' : 'bg-green-500'
                    }`}></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key Impact */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 sm:p-4 md:p-6"
          >
            <h4 className="text-white text-sm sm:text-base md:text-lg mb-3 sm:mb-4 flex items-center gap-2 font-semibold">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400 flex-shrink-0" />
              <span className="break-words">비즈니스 임팩트</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-center">
              <div>
                <div className="text-lg sm:text-xl md:text-2xl text-red-400 mb-1 font-bold break-words">
                  연간 2억원
                </div>
                <div className="text-xs sm:text-sm text-slate-300 break-words">운영비 초과</div>
              </div>
              <div>
                <div className="text-lg sm:text-xl md:text-2xl text-orange-400 mb-1 font-bold break-words">
                  고객 만족도
                </div>
                <div className="text-xs sm:text-sm text-slate-300 break-words">지속 하락</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-center bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/40 rounded-lg p-3 sm:p-4 md:p-6"
      >
        <h4 className="text-base sm:text-lg md:text-xl text-white mb-2 px-2 font-bold break-words">
          ⚠️ 연간 50억원 이상의 운영 손실 · 고객 만족도 지속 하락
        </h4>
        <p className="text-sm sm:text-base text-slate-100 px-2 font-medium break-words">
          혁신적인 데이터 통합 솔루션으로 근본적 문제 해결 필요
        </p>
      </motion.div>
    </motion.div>
  );
}