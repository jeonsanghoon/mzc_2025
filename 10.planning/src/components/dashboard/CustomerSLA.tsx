import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Target,
  FileText,
  Download,
  Calendar
} from 'lucide-react';

export function CustomerSLA() {
  const [selectedCustomer, setSelectedCustomer] = useState('Samsung Electronics');

  // Mock customer SLA data
  const customers = [
    {
      name: 'Samsung Electronics',
      contract: '프리미엄 서비스 협약',
      devices: 3240,
      uptime: 99.2,
      slaTarget: 99.0,
      mttr: 1.2,
      mttrTarget: 2.0,
      incidents: 8,
      resolved: 8,
      penalty: 0,
      credit: 15000
    },
    {
      name: 'LG Display',
      contract: '스탠다드 서비스 협약',
      devices: 2150,
      uptime: 97.8,
      slaTarget: 98.0,
      mttr: 1.8,
      mttrTarget: 3.0,
      incidents: 12,
      resolved: 11,
      penalty: 2500,
      credit: 8000
    },
    {
      name: 'SK Hynix',
      contract: '프리미엄 서비스 협약',
      devices: 1890,
      uptime: 99.5,
      slaTarget: 99.0,
      mttr: 0.9,
      mttrTarget: 2.0,
      incidents: 4,
      resolved: 4,
      penalty: 0,
      credit: 12000
    }
  ];

  const slaHistory = [
    { month: '2023-10', uptime: 98.2, mttr: 2.1, incidents: 12 },
    { month: '2023-11', uptime: 98.8, mttr: 1.9, incidents: 9 },
    { month: '2023-12', uptime: 99.1, mttr: 1.6, incidents: 7 },
    { month: '2024-01', uptime: 99.2, mttr: 1.2, incidents: 8 }
  ];

  const incidentsByType = [
    { type: '하드웨어 장애', count: 45, avgResolution: 2.3 },
    { type: '네트워크 이슈', count: 32, avgResolution: 1.8 },
    { type: '소프트웨어 오류', count: 28, avgResolution: 1.2 },
    { type: '전원 문제', count: 15, avgResolution: 3.1 },
    { type: '환경 이슈', count: 12, avgResolution: 4.2 }
  ];

  const selectedCustomerData = customers.find(c => c.name === selectedCustomer);

  const getSLAStatus = (current: number, target: number) => {
    if (current >= target) return { status: 'success', icon: CheckCircle2, color: 'text-green-600' };
    if (current >= target - 0.5) return { status: 'warning', icon: AlertTriangle, color: 'text-yellow-600' };
    return { status: 'danger', icon: AlertTriangle, color: 'text-red-600' };
  };

  const getMTTRStatus = (current: number, target: number) => {
    if (current <= target) return { status: 'success', icon: CheckCircle2, color: 'text-green-600' };
    if (current <= target + 0.5) return { status: 'warning', icon: AlertTriangle, color: 'text-yellow-600' };
    return { status: 'danger', icon: AlertTriangle, color: 'text-red-600' };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">고객 서비스 수준 협약 관리</h3>
        <div className="flex items-center gap-2">
          <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {customers.map((customer) => (
                <SelectItem key={customer.name} value={customer.name}>
                  {customer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            리포트 생성
          </Button>
        </div>
      </div>

      {/* Customer Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            {selectedCustomer} - 서비스 협약 현황
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedCustomerData && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Uptime */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  {(() => {
                    const status = getSLAStatus(selectedCustomerData.uptime, selectedCustomerData.slaTarget);
                    return <status.icon className={`h-6 w-6 ${status.color}`} />;
                  })()}
                </div>
                <div className="text-2xl font-bold text-blue-600">{selectedCustomerData.uptime}%</div>
                <div className="text-sm text-muted-foreground">가동률</div>
                <div className="text-xs text-muted-foreground">목표: {selectedCustomerData.slaTarget}%</div>
              </div>

              {/* MTTR */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  {(() => {
                    const status = getMTTRStatus(selectedCustomerData.mttr, selectedCustomerData.mttrTarget);
                    return <status.icon className={`h-6 w-6 ${status.color}`} />;
                  })()}
                </div>
                <div className="text-2xl font-bold text-orange-600">{selectedCustomerData.mttr}h</div>
                <div className="text-sm text-muted-foreground">평균 MTTR</div>
                <div className="text-xs text-muted-foreground">목표: ≤{selectedCustomerData.mttrTarget}h</div>
              </div>

              {/* Incidents */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-6 w-6 text-purple-500" />
                </div>
                <div className="text-2xl font-bold text-purple-600">{selectedCustomerData.incidents}</div>
                <div className="text-sm text-muted-foreground">월간 인시던트</div>
                <div className="text-xs text-muted-foreground">해결: {selectedCustomerData.resolved}</div>
              </div>

              {/* Financial Impact */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Target className="h-6 w-6 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-green-600">${selectedCustomerData.credit.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">서비스 크레딧</div>
                <div className="text-xs text-red-600">페널티: ${selectedCustomerData.penalty.toLocaleString()}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* SLA Performance Trends */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              가동률 & MTTR 추이
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={slaHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="uptime" stroke="#3b82f6" strokeWidth={2} name="가동률 (%)" />
                <Line yAxisId="right" type="monotone" dataKey="mttr" stroke="#f59e0b" strokeWidth={2} name="MTTR (시간)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              월간 인시던트 수
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={slaHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="incidents" fill="#ef4444" name="인시던트 수" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* All Customers Summary */}
      <Card>
        <CardHeader>
          <CardTitle>전체 고객 SLA 요약</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">고객사</th>
                  <th className="text-center p-3">계약 유형</th>
                  <th className="text-center p-3">디바이스</th>
                  <th className="text-center p-3">가동률</th>
                  <th className="text-center p-3">MTTR</th>
                  <th className="text-center p-3">인시던트</th>
                  <th className="text-center p-3">SLA 상태</th>
                  <th className="text-right p-3">페널티</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => {
                  const uptimeStatus = getSLAStatus(customer.uptime, customer.slaTarget);
                  const mttrStatus = getMTTRStatus(customer.mttr, customer.mttrTarget);
                  
                  return (
                    <tr key={index} className="border-b hover:bg-slate-50">
                      <td className="p-3 font-medium">{customer.name}</td>
                      <td className="p-3 text-center">
                        <Badge variant={customer.contract.includes('프리미엄') ? 'default' : 'secondary'}>
                          {customer.contract}
                        </Badge>
                      </td>
                      <td className="p-3 text-center">{customer.devices.toLocaleString()}</td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <uptimeStatus.icon className={`h-4 w-4 ${uptimeStatus.color}`} />
                          <span className={uptimeStatus.color}>{customer.uptime}%</span>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <mttrStatus.icon className={`h-4 w-4 ${mttrStatus.color}`} />
                          <span className={mttrStatus.color}>{customer.mttr}h</span>
                        </div>
                      </td>
                      <td className="p-3 text-center">{customer.incidents}</td>
                      <td className="p-3 text-center">
                        {uptimeStatus.status === 'success' && mttrStatus.status === 'success' ? (
                          <Badge className="bg-green-100 text-green-700">준수</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-700">위반</Badge>
                        )}
                      </td>
                      <td className="p-3 text-right text-red-600">
                        ${customer.penalty.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Incident Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>인시던트 유형별 분석</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {incidentsByType.map((incident, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{incident.type}</div>
                  <div className="text-sm text-muted-foreground">
                    평균 해결 시간: {incident.avgResolution}시간
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{incident.count}</div>
                    <div className="text-xs text-muted-foreground">발생 횟수</div>
                  </div>
                  <div className="w-24">
                    <Progress value={(incident.count / 45) * 100} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SLA Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-500" />
            SLA 리포트 생성
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="monthly" className="w-full">
            <TabsList>
              <TabsTrigger value="monthly">월간 리포트</TabsTrigger>
              <TabsTrigger value="quarterly">분기 리포트</TabsTrigger>
              <TabsTrigger value="custom">맞춤 리포트</TabsTrigger>
            </TabsList>

            <TabsContent value="monthly">
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">보고 기간</label>
                    <Select defaultValue="2024-01">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024-01">2024년 1월</SelectItem>
                        <SelectItem value="2023-12">2023년 12월</SelectItem>
                        <SelectItem value="2023-11">2023년 11월</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">고객사</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">전체 고객사</SelectItem>
                        {customers.map((customer) => (
                          <SelectItem key={customer.name} value={customer.name}>
                            {customer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    PDF 다운로드
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    자동 발송 설정
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="quarterly">
              <div className="text-center text-muted-foreground py-8">
                분기별 리포트 설정이 여기에 표시됩니다.
              </div>
            </TabsContent>

            <TabsContent value="custom">
              <div className="text-center text-muted-foreground py-8">
                맞춤 리포트 설정이 여기에 표시됩니다.
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}