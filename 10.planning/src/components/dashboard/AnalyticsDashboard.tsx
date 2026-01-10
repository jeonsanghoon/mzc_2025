import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";

export function AnalyticsDashboard() {
  // Mock analytics data
  const performanceMetrics = [
    {
      date: "2024-01-10",
      mttr: 2.8,
      sla: 94.2,
      alerts: 45,
      resolved: 42,
    },
    {
      date: "2024-01-11",
      mttr: 2.3,
      sla: 96.1,
      alerts: 38,
      resolved: 36,
    },
    {
      date: "2024-01-12",
      mttr: 1.9,
      sla: 97.8,
      alerts: 32,
      resolved: 31,
    },
    {
      date: "2024-01-13",
      mttr: 2.1,
      sla: 96.5,
      alerts: 29,
      resolved: 28,
    },
    {
      date: "2024-01-14",
      mttr: 1.7,
      sla: 98.2,
      alerts: 25,
      resolved: 25,
    },
    {
      date: "2024-01-15",
      mttr: 1.5,
      sla: 98.9,
      alerts: 22,
      resolved: 22,
    },
    {
      date: "2024-01-16",
      mttr: 1.8,
      sla: 97.6,
      alerts: 28,
      resolved: 27,
    },
  ];

  const deviceHealthData = [
    { name: "PLC", healthy: 245, warning: 12, critical: 3 },
    { name: "Sensor", healthy: 1850, warning: 45, critical: 8 },
    {
      name: "Actuator",
      healthy: 320,
      warning: 18,
      critical: 5,
    },
    { name: "Motor", healthy: 180, warning: 8, critical: 2 },
    { name: "HMI", healthy: 95, warning: 3, critical: 1 },
  ];

  const firmwareDistribution = [
    { name: "v3.1.2", value: 35, color: "#22c55e" },
    { name: "v3.1.1", value: 28, color: "#3b82f6" },
    { name: "v3.0.9", value: 20, color: "#f59e0b" },
    { name: "v2.9.8", value: 12, color: "#ef4444" },
    { name: "기타", value: 5, color: "#6b7280" },
  ];

  const customerMetrics = [
    {
      customer: "Samsung Electronics",
      devices: 3240,
      sla: 98.5,
      mttr: 1.2,
      alerts: 12,
    },
    {
      customer: "LG Display",
      devices: 2150,
      sla: 97.8,
      mttr: 1.8,
      alerts: 18,
    },
    {
      customer: "SK Hynix",
      devices: 1890,
      sla: 99.1,
      mttr: 0.9,
      alerts: 8,
    },
    {
      customer: "Hyundai Motor",
      devices: 1620,
      sla: 96.2,
      mttr: 2.1,
      alerts: 22,
    },
    {
      customer: "POSCO",
      devices: 1340,
      sla: 97.5,
      mttr: 1.5,
      alerts: 15,
    },
  ];

  const predictiveInsights = [
    {
      type: "maintenance",
      severity: "high",
      device: "PUMP-089",
      prediction: "72시간 내 진동 임계값 초과 예상",
      confidence: 89,
      action: "예방정비 스케줄링 권장",
    },
    {
      type: "failure",
      severity: "medium",
      device: "MOTOR-156",
      prediction: "5일 내 전류 이상 패턴 감지 가능성",
      confidence: 76,
      action: "센서 교정 필요",
    },
    {
      type: "optimization",
      severity: "low",
      device: "PLC-023",
      prediction: "펌웨어 업데이트로 15% 성능 향상 가능",
      confidence: 92,
      action: "OTA 업데이트 권장",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#6b7280",
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">분석 대시보드</h3>
        <div className="flex items-center gap-2">
          <Select defaultValue="7d">
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24시간</SelectItem>
              <SelectItem value="7d">7일</SelectItem>
              <SelectItem value="30d">30일</SelectItem>
              <SelectItem value="90d">90일</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            리포트 생성
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  98.2%
                </div>
                <div className="text-sm text-muted-foreground">
                  평균 서비스 준수율
                </div>
              </div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+2.1%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  1.8h
                </div>
                <div className="text-sm text-muted-foreground">
                  평균 복구 시간
                </div>
              </div>
              <div className="flex items-center text-green-600">
                <TrendingDown className="h-4 w-4 mr-1" />
                <span className="text-sm">-0.5h</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  28
                </div>
                <div className="text-sm text-muted-foreground">
                  일일 평균 알람
                </div>
              </div>
              <div className="flex items-center text-green-600">
                <TrendingDown className="h-4 w-4 mr-1" />
                <span className="text-sm">-12</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  96.4%
                </div>
                <div className="text-sm text-muted-foreground">
                  자동 해결률
                </div>
              </div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+4.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trends */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              MTTR & SLA 추이
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString(
                      "ko-KR",
                      { month: "short", day: "numeric" },
                    )
                  }
                />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="mttr"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="MTTR (시간)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="sla"
                  stroke="#22c55e"
                  strokeWidth={2}
                  name="SLA (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              알람 생성 & 해결
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString(
                      "ko-KR",
                      { month: "short", day: "numeric" },
                    )
                  }
                />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="alerts"
                  fill="#f59e0b"
                  name="생성된 알람"
                />
                <Bar
                  dataKey="resolved"
                  fill="#22c55e"
                  name="해결된 알람"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Device Health Analysis */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-500" />
              디바이스 유형별 상태
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deviceHealthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="healthy"
                  stackId="a"
                  fill="#22c55e"
                  name="정상"
                />
                <Bar
                  dataKey="warning"
                  stackId="a"
                  fill="#f59e0b"
                  name="경고"
                />
                <Bar
                  dataKey="critical"
                  stackId="a"
                  fill="#ef4444"
                  name="심각"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-indigo-500" />
              펌웨어 버전 분포
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={firmwareDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {firmwareDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Customer Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>고객사별 성과 지표</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">고객사</th>
                  <th className="text-right p-2">
                    디바이스 수
                  </th>
                  <th className="text-right p-2">SLA 준수율</th>
                  <th className="text-right p-2">평균 MTTR</th>
                  <th className="text-right p-2">활성 알람</th>
                  <th className="text-center p-2">상태</th>
                </tr>
              </thead>
              <tbody>
                {customerMetrics.map((customer, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="p-2 font-medium">
                      {customer.customer}
                    </td>
                    <td className="p-2 text-right">
                      {customer.devices.toLocaleString()}
                    </td>
                    <td className="p-2 text-right">
                      <span
                        className={
                          customer.sla >= 98
                            ? "text-green-600"
                            : customer.sla >= 95
                              ? "text-yellow-600"
                              : "text-red-600"
                        }
                      >
                        {customer.sla}%
                      </span>
                    </td>
                    <td className="p-2 text-right">
                      {customer.mttr}h
                    </td>
                    <td className="p-2 text-right">
                      {customer.alerts}
                    </td>
                    <td className="p-2 text-center">
                      {customer.sla >= 98 ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                      ) : customer.sla >= 95 ? (
                        <Clock className="h-5 w-5 text-yellow-500 mx-auto" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* AI Predictive Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-indigo-500" />
            AI 예측 인사이트
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictiveInsights.map((insight, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      className={getSeverityColor(
                        insight.severity,
                      )}
                    >
                      {insight.severity.toUpperCase()}
                    </Badge>
                    <span className="font-medium">
                      {insight.device}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    신뢰도: {insight.confidence}%
                  </div>
                </div>
                <p className="text-sm mb-2">
                  {insight.prediction}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-600">
                    {insight.action}
                  </span>
                  <Button variant="outline" size="sm">
                    액션 실행
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Root Cause Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Top 이슈 & 근본 원인</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                issue: "온도 센서 오차",
                frequency: 23,
                rootCause: "센서 교정 필요",
                impact: "Medium",
              },
              {
                issue: "통신 지연",
                frequency: 18,
                rootCause: "네트워크 대역폭 부족",
                impact: "High",
              },
              {
                issue: "펌웨어 호환성",
                frequency: 12,
                rootCause: "레거시 버전 사용",
                impact: "Low",
              },
              {
                issue: "전원 불안정",
                frequency: 8,
                rootCause: "UPS 용량 부족",
                impact: "Critical",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="font-medium">
                    {item.issue}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.rootCause}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold">
                      {item.frequency}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      발생 횟수
                    </div>
                  </div>
                  <Badge
                    className={
                      item.impact === "Critical"
                        ? "bg-red-100 text-red-700"
                        : item.impact === "High"
                          ? "bg-orange-100 text-orange-700"
                          : item.impact === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                    }
                  >
                    {item.impact}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}