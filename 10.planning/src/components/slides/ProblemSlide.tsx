import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { AlertTriangle, TrendingDown, XCircle, Clock, DollarSign, Users } from 'lucide-react';
import { motion } from 'motion/react';

export function ProblemSlide() {
  const problems = [
    {
      icon: XCircle,
      title: '데이터 사일로 문제',
      description: '7개 분산된 시스템으로 인한 통합 관리 불가',
      impact: '알람 오탐률 30%',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    },
    {
      icon: Clock,
      title: '느린 장애 대응',
      description: '수동적 모니터링으로 인한 지연된 문제 발견',
      impact: '평균 복구 시간 4시간',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    },
    {
      icon: DollarSign,
      title: '높은 운영 비용',
      description: '현장 출동 과다 및 비효율적 유지보수',
      impact: '운영비 40% 초과',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      icon: Users,
      title: '제한적 확장성',
      description: '수동 관리로 인한 스케일링 한계',
      impact: '신규 고객 대응 어려움',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
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
      className="space-y-8 h-full flex flex-col"
    >
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h2 className="text-4xl mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
          현재 직면한 주요 문제점
        </h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          분산된 시스템과 수동적 관리 방식으로 인한 비효율성과 높은 운영 비용
        </p>
      </motion.div>

      <div className="flex-1 grid lg:grid-cols-2 gap-8">
        {/* Problems Grid */}
        <div className="space-y-6">
          <h3 className="text-2xl text-white mb-6 flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            핵심 문제점
          </h3>
          
          <div className="grid gap-4">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="bg-white/5 border-white/20 hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${problem.bgColor}`}>
                        <problem.icon className={`h-6 w-6 ${problem.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg text-white mb-2">{problem.title}</h4>
                        <p className="text-slate-300 text-sm mb-3 leading-relaxed">
                          {problem.description}
                        </p>
                        <Badge variant="destructive" className="bg-red-500/20 text-red-300 border-red-500/30">
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
        <div className="space-y-6">
          <h3 className="text-2xl text-white mb-6 flex items-center gap-3">
            <TrendingDown className="h-6 w-6 text-orange-500" />
            현재 상황 지표
          </h3>
          
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 border border-white/20 rounded-lg p-6"
          >
            <div className="space-y-4">
              {currentSituation.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                >
                  <span className="text-slate-300">{item.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-white text-lg">{item.value}</span>
                    <div className={`w-3 h-3 rounded-full ${
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
            className="bg-red-500/10 border border-red-500/30 rounded-lg p-6"
          >
            <h4 className="text-white text-lg mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              비즈니스 임팩트
            </h4>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl text-red-400 mb-1">연간 2억원</div>
                <div className="text-sm text-slate-300">운영비 초과</div>
              </div>
              <div>
                <div className="text-2xl text-orange-400 mb-1">고객 만족도</div>
                <div className="text-sm text-slate-300">지속 하락</div>
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
        className="text-center bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-6"
      >
        <h4 className="text-xl text-white mb-2">
          이러한 문제들을 해결하기 위한 통합 솔루션이 필요합니다
        </h4>
        <p className="text-slate-300">
          데이터 통합 플랫폼을 통한 지능형 자동화가 해답입니다
        </p>
      </motion.div>
    </motion.div>
  );
}