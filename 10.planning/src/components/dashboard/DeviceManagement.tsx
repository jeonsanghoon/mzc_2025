import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Cpu, 
  Wifi, 
  WifiOff, 
  Settings, 
  Power, 
  RefreshCw, 
  Search,
  Filter,
  MapPin,
  Calendar,
  Activity
} from 'lucide-react';

export function DeviceManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);

  // Mock device data
  const devices = [
    {
      id: 'PLC-001',
      name: 'Production Line Controller 1',
      type: 'PLC',
      status: 'online',
      location: 'Factory A - Line 1',
      firmware: 'v2.3.1',
      lastSeen: '1분 전',
      temperature: 72,
      uptime: '15일 3시간',
      commands: 1247,
      customer: 'Samsung Electronics'
    },
    {
      id: 'SENSOR-045',
      name: 'Vibration Sensor 45',
      type: 'Sensor',
      status: 'warning',
      location: 'Factory B - Line 3',
      firmware: 'v1.8.2',
      lastSeen: '3분 전',
      temperature: 85,
      uptime: '8일 12시간',
      commands: 523,
      customer: 'LG Display'
    },
    {
      id: 'PUMP-012',
      name: 'Hydraulic Pump 12',
      type: 'Actuator',
      status: 'offline',
      location: 'Factory A - Basement',
      firmware: 'v2.1.0',
      lastSeen: '25분 전',
      temperature: 68,
      uptime: '0일 0시간',
      commands: 89,
      customer: 'Samsung Electronics'
    },
    {
      id: 'MOTOR-089',
      name: 'Conveyor Motor 89',
      type: 'Motor',
      status: 'online',
      location: 'Factory C - Line 2',
      firmware: 'v3.0.1',
      lastSeen: '30초 전',
      temperature: 76,
      uptime: '22일 8시간',
      commands: 2156,
      customer: 'SK Hynix'
    },
    {
      id: 'HMI-203',
      name: 'Human Machine Interface 203',
      type: 'HMI',
      status: 'maintenance',
      location: 'Factory B - Control Room',
      firmware: 'v2.5.3',
      lastSeen: '1시간 전',
      temperature: 45,
      uptime: '0일 0시간',
      commands: 67,
      customer: 'LG Display'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'offline': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'maintenance': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <Wifi className="h-4 w-4 text-green-500" />;
      case 'offline': return <WifiOff className="h-4 w-4 text-red-500" />;
      case 'warning': return <Activity className="h-4 w-4 text-yellow-500" />;
      case 'maintenance': return <Settings className="h-4 w-4 text-blue-500" />;
      default: return <Cpu className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || device.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const deviceTypeCounts = {
    PLC: devices.filter(d => d.type === 'PLC').length,
    Sensor: devices.filter(d => d.type === 'Sensor').length,
    Actuator: devices.filter(d => d.type === 'Actuator').length,
    Motor: devices.filter(d => d.type === 'Motor').length,
    HMI: devices.filter(d => d.type === 'HMI').length
  };

  const statusCounts = {
    online: devices.filter(d => d.status === 'online').length,
    offline: devices.filter(d => d.status === 'offline').length,
    warning: devices.filter(d => d.status === 'warning').length,
    maintenance: devices.filter(d => d.status === 'maintenance').length
  };

  const handleCommand = (deviceId: string, command: string) => {
    console.log(`Sending ${command} to device ${deviceId}`);
    // Shadow command implementation would go here
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">디바이스 관리</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            새로고침
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            대량 제어
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Cpu className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{devices.length}</div>
            <div className="text-sm text-muted-foreground">총 디바이스</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Wifi className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{statusCounts.online}</div>
            <div className="text-sm text-muted-foreground">온라인</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <WifiOff className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-600">{statusCounts.offline}</div>
            <div className="text-sm text-muted-foreground">오프라인</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Activity className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.warning}</div>
            <div className="text-sm text-muted-foreground">경고</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Settings className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{statusCounts.maintenance}</div>
            <div className="text-sm text-muted-foreground">정비중</div>
          </CardContent>
        </Card>
      </div>

      {/* Device Type Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>디바이스 유형별 분포</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {Object.entries(deviceTypeCounts).map(([type, count]) => (
              <div key={type} className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">{count}</div>
                <div className="text-sm text-muted-foreground">{type}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>디바이스 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="디바이스 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="상태 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="online">온라인</SelectItem>
                <SelectItem value="offline">오프라인</SelectItem>
                <SelectItem value="warning">경고</SelectItem>
                <SelectItem value="maintenance">정비중</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>디바이스</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>위치</TableHead>
                  <TableHead>펌웨어</TableHead>
                  <TableHead>마지막 통신</TableHead>
                  <TableHead>고객사</TableHead>
                  <TableHead>제어</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDevices.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{device.id}</div>
                        <div className="text-sm text-muted-foreground">{device.name}</div>
                        <Badge variant="outline" className="text-xs mt-1">{device.type}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(device.status)}
                        <Badge className={`text-xs ${getStatusColor(device.status)}`}>
                          {device.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3" />
                        {device.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{device.firmware}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3" />
                        {device.lastSeen}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{device.customer}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCommand(device.id, 'reboot')}
                          disabled={device.status === 'offline'}
                        >
                          <Power className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCommand(device.id, 'reset')}
                          disabled={device.status === 'offline'}
                        >
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Device Detail Tabs */}
      <Tabs defaultValue="commands" className="w-full">
        <TabsList>
          <TabsTrigger value="commands">Shadow 명령 이력</TabsTrigger>
          <TabsTrigger value="telemetry">텔레메트리</TabsTrigger>
          <TabsTrigger value="events">이벤트 로그</TabsTrigger>
        </TabsList>

        <TabsContent value="commands">
          <Card>
            <CardHeader>
              <CardTitle>최근 Shadow 명령</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { device: 'PLC-001', command: 'reboot', status: 'completed', time: '2분 전', result: 'success' },
                  { device: 'SENSOR-045', command: 'reset', status: 'pending', time: '5분 전', result: 'pending' },
                  { device: 'MOTOR-089', command: 'calibrate', status: 'failed', time: '10분 전', result: 'timeout' },
                  { device: 'PUMP-012', command: 'stop', status: 'completed', time: '15분 전', result: 'success' }
                ].map((cmd, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <div className="font-medium">{cmd.device}</div>
                        <div className="text-sm text-muted-foreground">{cmd.command} 명령</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={cmd.status === 'completed' ? 'bg-green-100 text-green-700' : 
                                       cmd.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                                       'bg-red-100 text-red-700'}>
                        {cmd.result}
                      </Badge>
                      <div className="text-sm text-muted-foreground">{cmd.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="telemetry">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                선택된 디바이스의 실시간 텔레메트리 데이터가 여기에 표시됩니다.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                선택된 디바이스의 이벤트 로그가 여기에 표시됩니다.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}