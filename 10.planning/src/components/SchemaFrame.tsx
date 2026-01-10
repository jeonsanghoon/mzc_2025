import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Database, Clock, MapPin, Zap, Shield, RefreshCw, Upload } from 'lucide-react';

export function SchemaFrame() {
  const domains = [
    { name: 'telemetry', description: '시계열 데이터', icon: '📊', color: 'bg-blue-100 text-blue-700' },
    { name: 'event', description: '알람/경고', icon: '🚨', color: 'bg-red-100 text-red-700' },
    { name: 'device', description: '상태/설정/펌웨어', icon: '🔧', color: 'bg-green-100 text-green-700' },
    { name: 'site', description: '사이트 정보', icon: '🏢', color: 'bg-purple-100 text-purple-700' },
    { name: 'customer', description: '고객 정보', icon: '👥', color: 'bg-yellow-100 text-yellow-700' },
    { name: 'control', description: '제어 명령', icon: '⚡', color: 'bg-orange-100 text-orange-700' },
    { name: 'ota', description: '업데이트', icon: '🔄', color: 'bg-indigo-100 text-indigo-700' }
  ];

  const coreFields = [
    { category: 'ID 필드', icon: MapPin, fields: ['tenant', 'device_id', 'product_type', 'site'] },
    { category: '값 필드', icon: Zap, fields: ['metric', 'value', 'unit(SI)'] },
    { category: '시간 필드', icon: Clock, fields: ['event_ts_sec(UTC)', 'ingest_ts_sec(UTC)'] },
    { category: '품질 필드', icon: Shield, fields: ['quality_flag', 'src_system', 'seq'] }
  ];

  const extensions = [
    {
      name: 'Event 확장',
      fields: ['rule_id', 'rule_type', 'severity', 'triggered_ts', 'ack_status'],
      icon: '🚨'
    },
    {
      name: 'Control Shadow 확장',
      fields: ['cmd_id', 'device_id', 'desired_state', 'reported_state', 'ack_status'],
      icon: '⚡'
    },
    {
      name: 'OTA Job 확장',
      fields: ['job_id', 'target_fw_ver', 'rollout(canary/batch)', 'until_ts', 'status'],
      icon: '🔄'
    },
    {
      name: 'OTA Result 확장',
      fields: ['device_id', 'result(success/fail/rollback)', 'fail_reason', 'timestamps'],
      icon: '📋'
    }
  ];

  const rules = [
    '유일키: (tenant, device_id, event_ts_sec, metric, seq)',
    'UTC 저장, KST 표기 / 단위 SI 통일',
    'DQ Rule: 누락/범위/스파이크/참조 무결성'
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-4 sm:mb-8">
        <h2 className="mb-2 text-blue-600 text-sm sm:text-base flex items-center justify-center gap-2">
          <Database className="h-5 w-5 inline-block" />
          🔵 Frame 2. 통합 스키마 구성 (Data Contract)
        </h2>
        <p className="text-muted-foreground text-sm">
          7개 도메인을 아우르는 통합 데이터 스키마 및 표준화 규칙
        </p>
      </div>

      {/* Domains */}
      <Card>
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Database className="h-5 w-5 text-blue-500 flex-shrink-0" strokeWidth={2.5} />
            도메인 구성
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-4">
            {domains.map((domain, index) => (
              <div key={index} className="text-center">
                <div className={`p-3 sm:p-4 rounded-lg ${domain.color} mb-1 sm:mb-2 min-h-[80px] sm:min-h-[100px] flex flex-col items-center justify-center`}>
                  <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{domain.icon}</div>
                  <div className="font-medium text-xs sm:text-sm">{domain.name}</div>
                </div>
                <div className="text-xs text-muted-foreground">{domain.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Core Fields */}
      <Card>
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-base sm:text-lg">핵심 필드 구조</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {coreFields.map((category, index) => (
              <div key={index} className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2">
                  <category.icon className="h-5 w-5 text-blue-500 flex-shrink-0" strokeWidth={2.5} />
                  <h4 className="font-medium text-sm sm:text-base">{category.category}</h4>
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {category.fields.map((field, fieldIndex) => (
                    <Badge key={fieldIndex} variant="outline" className="text-xs">
                      {field}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Extensions */}
      <Card>
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-base sm:text-lg">도메인별 확장 필드</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {extensions.map((extension, index) => (
              <div key={index} className="p-3 sm:p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <span className="text-xl sm:text-2xl flex-shrink-0">{extension.icon}</span>
                  <h4 className="font-medium text-sm sm:text-base">{extension.name}</h4>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  {extension.fields.map((field, fieldIndex) => (
                    <div key={fieldIndex} className="text-xs sm:text-sm bg-slate-50 px-2 py-1 rounded">
                      {field}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Rules */}
      <Card className="border-2 border-blue-200 bg-blue-50/50">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-blue-700 text-base sm:text-lg">
            <Shield className="h-5 w-5 flex-shrink-0" strokeWidth={2.5} />
            데이터 품질 규칙
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className="space-y-2 sm:space-y-3">
            {rules.map((rule, index) => (
              <div key={index} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-xs sm:text-sm flex-1 min-w-0">{rule}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Schema Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>통합 스키마 장점</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Database className="h-10 w-10 text-green-500 mx-auto mb-3 flex-shrink-0" strokeWidth={2.5} />
              <div className="font-medium text-green-700">데이터 일관성</div>
              <div className="text-sm text-muted-foreground">표준화된 스키마</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <RefreshCw className="h-10 w-10 text-blue-500 mx-auto mb-3 flex-shrink-0" strokeWidth={2.5} />
              <div className="font-medium text-blue-700">상호 운용성</div>
              <div className="text-sm text-muted-foreground">시스템 간 호환</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Upload className="h-10 w-10 text-purple-500 mx-auto mb-3 flex-shrink-0" strokeWidth={2.5} />
              <div className="font-medium text-purple-700">확장성</div>
              <div className="text-sm text-muted-foreground">도메인별 확장</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}