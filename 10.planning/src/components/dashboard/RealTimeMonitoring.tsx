import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  AlertTriangle,
  Thermometer,
  Zap,
  Activity,
  TrendingUp,
  Clock,
  BarChart3,
  LineChart as LineChartIcon,
  Filter,
  RefreshCw,
  Gauge,
  Shield,
  Target,
  Lock,
  Layers,
} from "lucide-react";
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
} from "recharts";

export function RealTimeMonitoring() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeRange, setTimeRange] = useState("2h");
  const [deviceGroup, setDeviceGroup] = useState("all");

  useEffect(() => {
    const t = setInterval(
      () => setCurrentTime(new Date()),
      1000,
    );
    return () => clearInterval(t);
  }, []);

  const telemetryData = [
    {
      time: "09:00",
      temperature: 72,
      vibration: 0.8,
      pressure: 145,
      current: 23.5,
    },
    {
      time: "09:15",
      temperature: 74,
      vibration: 0.9,
      pressure: 148,
      current: 24.1,
    },
    {
      time: "09:30",
      temperature: 75,
      vibration: 1.2,
      pressure: 152,
      current: 24.8,
    },
    {
      time: "09:45",
      temperature: 78,
      vibration: 1.5,
      pressure: 155,
      current: 25.2,
    },
    {
      time: "10:00",
      temperature: 82,
      vibration: 1.8,
      pressure: 159,
      current: 26.1,
    },
    {
      time: "10:15",
      temperature: 85,
      vibration: 2.1,
      pressure: 162,
      current: 26.8,
    },
  ];
  const ruleStatus = [
    {
      name: "Temperature Threshold",
      status: "Active",
      triggered: 3,
      type: "Threshold",
    },
    {
      name: "Vibration Pattern",
      status: "Normal",
      triggered: 0,
      type: "Pattern",
    },
    {
      name: "Pressure Trend",
      status: "Warning",
      triggered: 1,
      type: "Trend",
    },
    {
      name: "Current Correlation",
      status: "Normal",
      triggered: 0,
      type: "Correlation",
    },
  ];
  const eventsByHour = [
    { hour: "06:00", critical: 0, high: 1, medium: 2, low: 3 },
    { hour: "07:00", critical: 1, high: 2, medium: 4, low: 5 },
    { hour: "08:00", critical: 0, high: 3, medium: 6, low: 4 },
    { hour: "09:00", critical: 2, high: 4, medium: 5, low: 3 },
    { hour: "10:00", critical: 1, high: 5, medium: 7, low: 6 },
    { hour: "11:00", critical: 0, high: 2, medium: 3, low: 2 },
  ];
  const getStatusColor = (s: string) =>
    s === "Active"
      ? "text-red-600 bg-red-100"
      : s === "Warning"
        ? "text-yellow-600 bg-yellow-100"
        : s === "Normal"
          ? "text-green-600 bg-green-100"
          : "text-gray-600 bg-gray-100";

  return (
    <div className="space-y-4">
      {/* 헤더 */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium">
            실시간 모니터링
          </h3>
          <Badge variant="outline" className="gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Live
          </Badge>
          <span className="text-sm text-muted-foreground">
            {currentTime.toLocaleTimeString("ko-KR")}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={timeRange}
            onValueChange={setTimeRange}
          >
            <SelectTrigger className="h-8 w-[110px]">
              <SelectValue placeholder="범위" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30m">최근 30분</SelectItem>
              <SelectItem value="1h">최근 1시간</SelectItem>
              <SelectItem value="2h">최근 2시간</SelectItem>
              <SelectItem value="24h">최근 24시간</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={deviceGroup}
            onValueChange={setDeviceGroup}
          >
            <SelectTrigger className="h-8 w-[140px]">
              <SelectValue placeholder="디바이스 그룹" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 디바이스</SelectItem>
              <SelectItem value="hub">허브</SelectItem>
              <SelectItem value="edge">에지</SelectItem>
              <SelectItem value="plc">PLC 라인</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="h-8">
            <Filter className="h-4 w-4 mr-2" />
            필터
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <RefreshCw className="h-4 w-4 mr-2" />
            새로고침
          </Button>
        </div>
      </div>

      {/* 상단 요약 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-3 text-center">
            <LineChartIcon className="h-7 w-7 mx-auto mb-1" />
            <div className="text-xl font-bold">6</div>
            <div className="text-xs text-muted-foreground">
              활성 지표
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <BarChart3 className="h-7 w-7 mx-auto mb-1" />
            <div className="text-xl font-bold text-green-600">
              98.5%
            </div>
            <div className="text-xs text-muted-foreground">
              핫 경로 처리율
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <AlertTriangle className="h-7 w-7 mx-auto mb-1 text-orange-500" />
            <div className="text-xl font-bold">4</div>
            <div className="text-xs text-muted-foreground">
              경고/이상
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <Clock className="h-7 w-7 mx-auto mb-1 text-purple-500" />
            <div className="text-xl font-bold">1.2s</div>
            <div className="text-xs text-muted-foreground">
              평균 응답
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 타일형 Tabs */}
      <Card>
        <CardHeader className="p-3 md:p-4">
          <CardTitle className="text-base">
            모니터링 보드
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 md:p-4">
          <Tabs defaultValue="overview" className="w-full">
            {/* ✅ 핵심: 기본 inline-flex를 강제로 무시하고 grid 타일로 */}
            <TabsList className="!bg-transparent !p-0 !h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                {
                  val: "overview",
                  icon: (
                    <Target className="h-5 w-5 text-blue-600" />
                  ),
                  t1: "통합 과제",
                  t2: "요약·핵심 지표",
                },
                {
                  val: "system",
                  icon: (
                    <Shield className="h-5 w-5 text-green-600" />
                  ),
                  t1: "품질 관리",
                  t2: "처리·품질·지연",
                },
                {
                  val: "telemetry",
                  icon: (
                    <Layers className="h-5 w-5 text-indigo-600" />
                  ),
                  t1: "아키텍처",
                  t2: "온도/진동·압력/전류",
                },
                {
                  val: "rules",
                  icon: (
                    <Activity className="h-5 w-5 text-purple-600" />
                  ),
                  t1: "보안 연결",
                  t2: "룰/이상 상태",
                },
                {
                  val: "events",
                  icon: (
                    <Lock className="h-5 w-5 text-amber-600" />
                  ),
                  t1: "생명주기",
                  t2: "시간별 이벤트",
                },
                {
                  val: "settings",
                  icon: (
                    <Gauge className="h-5 w-5 text-sky-600" />
                  ),
                  t1: "설정",
                  t2: "임계값·알림",
                },
              ].map(({ val, icon, t1, t2 }) => (
                <TabsTrigger
                  key={val}
                  value={val}
                  className="
        /* 기본 inline-flex를 무시하고 카드처럼 */
        !flex !flex-col !items-start !justify-start !w-full !h-auto !whitespace-normal
        p-3 md:p-4 text-left rounded-2xl border bg-white shadow-sm transition
        hover:shadow-md hover:bg-muted/30

        /* 활성(선택) 상태 카드 하이라이트 */
        data-[state=active]:bg-blue-50
        data-[state=active]:border-blue-400
        data-[state=active]:ring-2 data-[state=active]:ring-blue-400
        data-[state=active]:text-blue-900

        /* 포커스 접근성 */
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
      "
                >
                  <div className="flex items-start gap-3">
                    {icon}
                    <div>
                      <div className="text-sm font-medium">
                        {t1}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t2}
                      </div>
                    </div>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* ----- 콘텐츠들 (기존 섹션 유지) ----- */}
            <TabsContent value="overview" className="mt-4">
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-red-500" />
                      온도·진동 스냅샷
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="text-2xl font-bold">
                      85°C
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      최근 측정
                    </div>
                    <Progress value={85} className="h-2" />
                    <div className="mt-2 text-xs text-muted-foreground">
                      진동: 2.1 mm/s
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Zap className="h-4 w-4 text-blue-500" />
                      압력·전류 스냅샷
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="text-2xl font-bold">
                      162 PSI
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      최근 측정
                    </div>
                    <Progress value={76} className="h-2" />
                    <div className="mt-2 text-xs text-muted-foreground">
                      전류: 26.8 A
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Activity className="h-4 w-4 text-purple-500" />
                      이상 탐지 현황
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 space-y-2">
                    {ruleStatus.map((r, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="truncate">
                          {r.name}
                        </span>
                        <Badge
                          className={`text-xs ${getStatusColor(r.status)}`}
                        >
                          {r.status}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="telemetry" className="mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-red-500" />
                      온도 & 진동 추이
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <ResponsiveContainer
                      width="100%"
                      height={260}
                    >
                      <LineChart data={telemetryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="temperature"
                          stroke="#ef4444"
                          strokeWidth={2}
                          name="온도 (°C)"
                        />
                        <Line
                          type="monotone"
                          dataKey="vibration"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          name="진동 (mm/s)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Zap className="h-4 w-4 text-blue-500" />
                      압력 & 전류 추이
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <ResponsiveContainer
                      width="100%"
                      height={260}
                    >
                      <LineChart data={telemetryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="pressure"
                          stroke="#10b981"
                          strokeWidth={2}
                          name="압력 (PSI)"
                        />
                        <Line
                          type="monotone"
                          dataKey="current"
                          stroke="#f59e0b"
                          strokeWidth={2}
                          name="전류 (A)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="rules" className="mt-4">
              <Card>
                <CardHeader className="p-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Activity className="h-4 w-4 text-purple-500" />
                    룰 엔진 상태
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>룰</TableHead>
                        <TableHead>유형</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead className="text-right">
                          트리거 횟수
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ruleStatus.map((r, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">
                            {r.name}
                          </TableCell>
                          <TableCell>{r.type}</TableCell>
                          <TableCell>
                            <Badge
                              className={`text-xs ${getStatusColor(r.status)}`}
                            >
                              {r.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {r.triggered}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events" className="mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-indigo-500" />
                      시간별 이벤트 분포
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <ResponsiveContainer
                      width="100%"
                      height={260}
                    >
                      <BarChart data={eventsByHour}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                          dataKey="critical"
                          stackId="a"
                          fill="#dc2626"
                          name="Critical"
                        />
                        <Bar
                          dataKey="high"
                          stackId="a"
                          fill="#ea580c"
                          name="High"
                        />
                        <Bar
                          dataKey="medium"
                          stackId="a"
                          fill="#ca8a04"
                          name="Medium"
                        />
                        <Bar
                          dataKey="low"
                          stackId="a"
                          fill="#2563eb"
                          name="Low"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm">
                      요약
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>시간</TableHead>
                          <TableHead>Critical</TableHead>
                          <TableHead>High</TableHead>
                          <TableHead>Medium</TableHead>
                          <TableHead>Low</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {eventsByHour.map((e, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-medium">
                              {e.hour}
                            </TableCell>
                            <TableCell>{e.critical}</TableCell>
                            <TableCell>{e.high}</TableCell>
                            <TableCell>{e.medium}</TableCell>
                            <TableCell>{e.low}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="system" className="mt-4">
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm">
                      데이터 처리 상태
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Hot Path</span>
                        <span>98.5%</span>
                      </div>
                      <Progress value={98.5} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Warm Path</span>
                        <span>96.2%</span>
                      </div>
                      <Progress value={96.2} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Cold Path</span>
                        <span>99.8%</span>
                      </div>
                      <Progress value={99.8} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm">
                      데이터 품질
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>완전성</span>
                        <span>99.2%</span>
                      </div>
                      <Progress value={99.2} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>정확성</span>
                        <span>97.8%</span>
                      </div>
                      <Progress value={97.8} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>일관성</span>
                        <span>98.9%</span>
                      </div>
                      <Progress value={98.9} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm">
                      응답 시간
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">
                          평균 응답
                        </span>
                      </div>
                      <span className="font-medium">1.2s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-green-500" />
                        <span className="text-sm">P95</span>
                      </div>
                      <span className="font-medium">2.8s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span className="text-sm">P99</span>
                      </div>
                      <span className="font-medium">4.5s</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Gauge className="h-4 w-4" />
                      임계값
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>온도 경고</span>
                      <Badge variant="outline">≥ 80°C</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>진동 경고</span>
                      <Badge variant="outline">
                        ≥ 1.8 mm/s
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>압력 경고</span>
                      <Badge variant="outline">≥ 160 PSI</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>전류 경고</span>
                      <Badge variant="outline">≥ 27 A</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm">
                      알림/안전 설정
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>이상 자동 격리</span>
                      <Badge className="bg-green-100 text-green-700">
                        활성화
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>알림 쿨다운</span>
                      <Badge variant="outline">5분</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>재시도 횟수</span>
                      <Badge variant="outline">3회</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>로그 보존</span>
                      <Badge variant="outline">30일</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}