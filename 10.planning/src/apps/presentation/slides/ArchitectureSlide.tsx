import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Database, Cloud, Zap, BarChart3, Settings, ArrowRight, Layers, Cpu, Shield } from 'lucide-react';
import { motion } from 'motion/react';

export function ArchitectureSlide() {
  const layers = [
    {
      name: '데이터 수집 계층',
      description: '7개 도메인 통합 수집',
      components: ['IoT Sensors', 'Legacy Systems', 'External APIs', 'Real-time Streams'],
      icon: Database,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30'
    },
    {
      name: '데이터 플랫폼 계층',
      description: 'Hot/Warm/Cold 저장 전략',
      components: ['DocumentDB (Hot)', 'RDS (Warm)', 'S3 + Athena (Cold)', 'Data Lake'],
      icon: Cloud,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30'
    },
    {
      name: '분석 엔진 계층',
      description: 'AI 기반 실시간 분석',
      components: ['Stream Analytics', 'ML Models', 'Pattern Detection', 'Anomaly Detection'],
      icon: BarChart3,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30'
    },
    {
      name: '자동화 제어 계층',
      description: 'Shadow 기반 원격 제어',
      components: ['Device Shadow', 'OTA Updates', 'Remote Control', 'Rollback System'],
      icon: Settings,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30'
    }
  ];

  const dataFlow = [
    {
      stage: '수집',
      description: '실시간 데이터 스트림',
      latency: '< 1초',
      volume: '10M+ events/hour'
    },
    {
      stage: '처리',
      description: '실시간 분석 및 변환',
      latency: '< 5초',
      volume: '100% 데이터 처리'
    },
    {
      stage: '분석',
      description: 'AI 기반 패턴 분석',
      latency: '< 30초',
      volume: '99% 정확도'
    },
    {
      stage: '대응',
      description: '자동 액션 실행',
      latency: '< 2분',
      volume: '85% 자동 해결'
    }
  ];

  const techStack = [
    {
      category: '데이터 인프라',
      technologies: ['Amazon Kinesis', 'AWS Lambda', 'Amazon S3', 'Amazon RDS'],
      icon: Database
    },
    {
      category: 'AI/ML 플랫폼',
      technologies: ['Amazon SageMaker', 'Amazon Bedrock', 'Amazon Forecast', 'QuickSight'],
      icon: Cpu
    },
    {
      category: 'IoT 관리',
      technologies: ['AWS IoT Core', 'Device Shadow', 'IoT Device Management', 'OTA Service'],
      icon: Shield
    },
    {
      category: '모니터링',
      technologies: ['CloudWatch', 'X-Ray', 'SNS', 'EventBridge'],
      icon: BarChart3
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
        <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent px-2 font-bold break-words">
          시스템 아키텍처
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-slate-100 max-w-3xl mx-auto px-4 leading-relaxed font-medium break-words">
          확장 가능하고 안정적인 클라우드 네이티브 아키텍처
        </p>
      </motion.div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {/* Architecture Layers */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <h3 className="text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3 px-2 font-semibold">
            <Layers className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400 flex-shrink-0" />
            <span className="break-words">아키텍처 계층</span>
          </h3>
          
          <div className="space-y-3 sm:space-y-4">
            {layers.map((layer, index) => (
              <motion.div
                key={index}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.15 }}
              >
                <Card className={`bg-white/5 border-2 ${layer.borderColor} hover:bg-white/10 transition-all duration-300`}>
                  <CardContent className="p-2 sm:p-4 md:p-6">
                    <div className="flex items-start gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
                      <div className={`p-1.5 sm:p-2 md:p-3 rounded-lg ${layer.bgColor} flex-shrink-0 mt-0.5`}>
                        <layer.icon className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ${layer.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm sm:text-base md:text-lg text-white mb-1 font-semibold break-words">
                          {layer.name}
                        </h4>
                        <p className="text-slate-200 text-xs sm:text-sm break-words">
                          {layer.description}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-1 sm:gap-2">
                      {layer.components.map((component, compIndex) => (
                        <Badge 
                          key={compIndex} 
                          variant="outline" 
                          className="border-white/40 text-slate-100 justify-center py-0.5 sm:py-1 px-1 sm:px-2 text-xs font-medium break-words"
                        >
                          {component}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {index < layers.length - 1 && (
                  <div className="flex justify-center mt-2 sm:mt-3 mb-1">
                    <div className="w-0.5 h-6 sm:h-8 bg-gradient-to-b from-white/50 to-white/20"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Data Flow & Tech Stack */}
        <div className="space-y-4 sm:space-y-6">
          {/* Data Flow Performance */}
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3 px-2 font-semibold">
              <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 flex-shrink-0" />
              <span className="break-words">데이터 플로우</span>
            </h3>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="space-y-2 sm:space-y-3 md:space-y-4"
            >
              {dataFlow.map((flow, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="bg-white/5 border border-white/20 rounded-lg p-2 sm:p-3 md:p-4"
                >
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <h5 className="text-white text-sm sm:text-base font-semibold break-words">
                      {flow.stage}
                    </h5>
                    <Badge variant="secondary" className="bg-green-500/30 text-green-200 border-green-400/50 text-xs px-2 py-0.5 font-medium whitespace-nowrap">
                      {flow.latency}
                    </Badge>
                  </div>
                  <p className="text-slate-200 text-xs sm:text-sm mb-1 sm:mb-2 break-words">
                    {flow.description}
                  </p>
                  <div className="text-xs text-slate-300 font-medium break-words">
                    {flow.volume}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Tech Stack */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <h3 className="text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3 px-2 font-semibold">
              <Cpu className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400 flex-shrink-0" />
              <span className="break-words">기술 스택</span>
            </h3>
            
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {techStack.map((stack, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  className="bg-white/5 border border-white/20 rounded-lg p-2 sm:p-3 md:p-4"
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <stack.icon className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 flex-shrink-0" />
                    <h5 className="text-white text-xs sm:text-sm font-semibold break-words">
                      {stack.category}
                    </h5>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                    {stack.technologies.map((tech, techIndex) => (
                      <div 
                        key={techIndex} 
                        className="text-xs text-slate-200 bg-white/10 px-2 py-1 rounded font-medium break-words"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Architecture Benefits */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
      >
        <div className="text-center bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-3 sm:p-4">
          <h4 className="text-white mb-2 font-semibold text-sm sm:text-base break-words">확장성</h4>
          <p className="text-slate-200 text-xs sm:text-sm font-medium break-words">
            클라우드 네이티브로 무제한 확장
          </p>
        </div>
        <div className="text-center bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg p-3 sm:p-4">
          <h4 className="text-white mb-2 font-semibold text-sm sm:text-base break-words">안정성</h4>
          <p className="text-slate-200 text-xs sm:text-sm font-medium break-words">
            99.9% 가용성 보장
          </p>
        </div>
        <div className="text-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-3 sm:p-4">
          <h4 className="text-white mb-2 font-semibold text-sm sm:text-base break-words">성능</h4>
          <p className="text-slate-200 text-xs sm:text-sm font-medium break-words">
            실시간 처리 및 분석
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}