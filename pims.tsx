import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import {
  AlertCircle,
  Bell,
  ChevronDown,
  Clipboard,
  DollarSign,
  HardDrive,
  Shield,
  Users,
  Activity,
  Zap,
  TrendingUp,
} from "lucide-react";

export default function EnhancedDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [activePieIndex, setActivePieIndex] = useState(0);

  const pieData = [
    { name: "In Use", value: 400, color: "#0088FE" },
    { name: "In Stock", value: 300, color: "#00C49F" },
    { name: "Maintenance", value: 100, color: "#FFBB28" },
    { name: "Retired", value: 200, color: "#FF8042" },
  ];

  const barData = [
    { name: "Jan", value: 400, cost: 2400 },
    { name: "Feb", value: 300, cost: 1398 },
    { name: "Mar", value: 200, cost: 9800 },
    { name: "Apr", value: 278, cost: 3908 },
    { name: "May", value: 189, cost: 4800 },
  ];

  const lineData = [
    { name: "Week 1", inUse: 400, maintenance: 240 },
    { name: "Week 2", inUse: 300, maintenance: 139 },
    { name: "Week 3", inUse: 200, maintenance: 980 },
    { name: "Week 4", inUse: 278, maintenance: 390 },
    { name: "Week 5", inUse: 189, maintenance: 480 },
  ];

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text
          x={cx}
          y={cy}
          dy={8}
          textAnchor="middle"
          fill={fill}
        >
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle
          cx={ex}
          cy={ey}
          r={2}
          fill={fill}
          stroke="none"
        />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`Value ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>Download</Button>
          <Button>
            <Bell className="mr-2 h-4 w-4" /> Notifications
          </Button>
        </div>
      </div>
      <Tabs
        defaultValue="overview"
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger
            value="overview"
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            onClick={() => setActiveTab("analytics")}
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            onClick={() => setActiveTab("reports")}
          >
            Reports
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="overview"
          className="space-y-4"
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Assets
                </CardTitle>
                <HardDrive className="h-4 w-4 text-blue-100" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,000</div>
                <p className="text-xs text-blue-100">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Maintenance Alerts
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-yellow-100" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-yellow-100">+2 new alerts today</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Compliance
                </CardTitle>
                <Shield className="h-4 w-4 text-green-100" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98.5%</div>
                <p className="text-xs text-green-100">+0.5% from last week</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Cost
                </CardTitle>
                <DollarSign className="h-4 w-4 text-purple-100" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$24,500</div>
                <p className="text-xs text-purple-100">
                  +15% from last quarter
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Asset Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer
                  width="100%"
                  height={300}
                >
                  <PieChart>
                    <Pie
                      activeIndex={activePieIndex}
                      activeShape={renderActiveShape}
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      onMouseEnter={(_, index) => setActivePieIndex(index)}
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center">
                    <span className="relative flex h-2 w-2 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                    </span>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        New asset added: Police Radio
                      </p>
                      <p className="text-sm text-muted-foreground">
                        2 minutes ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Maintenance alert: Vehicle #1234
                      </p>
                      <p className="text-sm text-muted-foreground">
                        1 hour ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-green-500" />
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Asset assigned: Body Camera to Officer Smith
                      </p>
                      <p className="text-sm text-muted-foreground">
                        3 hours ago
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent
          value="analytics"
          className="space-y-4"
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Monthly Asset Acquisition vs Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer
                  width="100%"
                  height={300}
                >
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                    />
                    <Tooltip />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="value"
                      fill="#8884d8"
                      name="Assets Acquired"
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="cost"
                      fill="#82ca9d"
                      name="Cost ($)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Asset Usage Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer
                  width="100%"
                  height={300}
                >
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="inUse"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      name="In Use"
                    />
                    <Line
                      type="monotone"
                      dataKey="maintenance"
                      stroke="#82ca9d"
                      name="In Maintenance"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Asset Utilization
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87.4%</div>
                <p className="text-xs text-muted-foreground">
                  +2.4% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Maintenance Efficiency
                </CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92.1%</div>
                <p className="text-xs text-muted-foreground">
                  +1.2% from last quarter
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Cost per Asset
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$245</div>
                <p className="text-xs text-muted-foreground">
                  -5.1% from last year
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Asset Lifespan
                </CardTitle>
                <Clipboard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.7 years</div>
                <p className="text-xs text-muted-foreground">
                  +0.3 years from last assessment
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
