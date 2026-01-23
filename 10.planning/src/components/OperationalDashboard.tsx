import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Settings, 
  TrendingUp,
  Users,
  Zap,
  Shield,
  Download,
  Upload,
  Database,
  Cpu
} from 'lucide-react';

import { RealTimeMonitoring } from './dashboard/RealTimeMonitoring';
import { DeviceManagement } from './dashboard/DeviceManagement';
import { OTAManagement } from './dashboard/OTAManagement';
import { AnalyticsDashboard } from './dashboard/AnalyticsDashboard';
import { CustomerSLA } from './dashboard/CustomerSLA';

export function OperationalDashboard() {
  const [activeTab, setActiveTab] = useState('monitoring');

  // Mock real-time data (서버에서 5분마다 갱신된 데이터를 표시)
  const systemStats = {
    totalDevices: 12847,
    onlineDevices: 12234,
    activeAlerts: 23,
    pendingOTA: 156,
    avgMTTR: 2.3,
    slaCompliance: 97.8
  };

  const recentAlerts = [
    { id: 1, device: 'PLC-001', type: 'Temperature', severity: 'High', time: '2분 전', status: 'Active' },
    { id: 2, device: 'SENSOR-045', type: 'Vibration', severity: 'Medium', time: '5분 전', status: 'Acknowledged' },
    { id: 3, device: 'PUMP-012', type: 'Pressure', severity: 'Critical', time: '8분 전', status: 'Resolved' },
    { id: 4, device: 'MOTOR-089', type: 'Current', severity: 'Low', time: '12분 전', status: 'Active' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-red-500 bg-red-100';
      case 'High': return 'text-orange-500 bg-orange-100';
      case 'Medium': return 'text-yellow-500 bg-yellow-100';
      case 'Low': return 'text-blue-500 bg-blue-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-red-600 bg-red-100';
      case 'Acknowledged': return 'text-yellow-600 bg-yellow-100';
      case 'Resolved': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="mb-2 text-cyan-600">📊 실시간 운영 모니터링 대시보드</h2>
        <p className="text-muted-foreground">
          Shadow 기반 IoT 시스템의 실시간 모니터링, 제어 및 분석
        </p>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <Card className="text-center">
          <CardContent className="p-4">
            <Database className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{systemStats.totalDevices.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">총 디바이스</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{systemStats.onlineDevices.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">온라인</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-600">{systemStats.activeAlerts}</div>
            <div className="text-sm text-muted-foreground">활성 알람</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <Upload className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{systemStats.pendingOTA}</div>
            <div className="text-sm text-muted-foreground">대기 중 무선 업데이트</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">{systemStats.avgMTTR}h</div>
            <div className="text-sm text-muted-foreground">평균 복구 시간</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <TrendingUp className="h-8 w-8 text-indigo-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-indigo-600">{systemStats.slaCompliance}%</div>
            <div className="text-sm text-muted-foreground">서비스 수준 협약 준수율</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              최근 경보 히스토리
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              서버에서 5분 간격으로 자동 갱신
            </p>
          </div>
          <Button variant="outline" size="sm">
            전체 보기
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <div>
                    <div className="font-medium">{alert.device}</div>
                    <div className="text-sm text-muted-foreground">{alert.type} 알람</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </Badge>
                  <Badge className={`text-xs ${getStatusColor(alert.status)}`}>
                    {alert.status}
                  </Badge>
                  <div className="text-sm text-muted-foreground">{alert.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="monitoring" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            실시간 모니터링
          </TabsTrigger>
          <TabsTrigger value="devices" className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            디바이스 관리
          </TabsTrigger>
          <TabsTrigger value="ota" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            무선 업데이트 관리
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            분석 대시보드
          </TabsTrigger>
          <TabsTrigger value="sla" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            고객 서비스 협약
          </TabsTrigger>
        </TabsList>

        <TabsContent value="monitoring">
          <RealTimeMonitoring />
        </TabsContent>
        <TabsContent value="devices">
          <DeviceManagement />
        </TabsContent>
        <TabsContent value="ota">
          <OTAManagement />
        </TabsContent>
        <TabsContent value="analytics">
          <AnalyticsDashboard />
        </TabsContent>
        <TabsContent value="sla">
          <CustomerSLA />
        </TabsContent>
      </Tabs>
    </div>
  );
}