import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Pie, PieChart, Cell, Legend } from "recharts";
import StatCard from "../shared/stat-card";
import { AreaChart, Bell, Droplets, Globe, Siren, Map, Bug, Leaf, Award } from "lucide-react";
import { GovernmentScheme } from "@/lib/types";
import schemeData from "@/data/schemes.json";
import AdminAdvisoryTool from "./gov/admin-advisory-tool";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { Badge } from "../ui/badge";

const schemes: GovernmentScheme[] = schemeData.schemes;

const productionData = [
  { name: 'Wheat', total: 107.6 },
  { name: 'Rice', total: 122.3 },
  { name: 'Maize', total: 31.5 },
  { name: 'Sugarcane', total: 370.5 },
  { name: 'Cotton', total: 35.4 },
];

const yieldData = [
    { state: 'Punjab', crop: 'Wheat', yield: 5.2, change: '+2%' },
    { state: 'Uttar Pradesh', crop: 'Sugarcane', yield: 81.5, change: '-1%' },
    { state: 'Maharashtra', crop: 'Cotton', yield: 0.8, change: '+5%' },
    { state: 'West Bengal', crop: 'Rice', yield: 2.9, change: '+3%' },
];

const diseaseOutbreaks = [
    { id: 1, disease: "Yellow Rust", crop: "Wheat", region: "North Punjab", severity: "High" },
    { id: 2, disease: "Rice Blast", crop: "Rice", region: "Coastal AP", severity: "Medium" },
    { id: 3, disease: "Fall Armyworm", crop: "Maize", region: "Karnataka", severity: "Low" },
];

const cropDiversityData = [
    { name: 'High Diversity', value: 8 },
    { name: 'Medium Diversity', value: 12 },
    { name: 'Low (Monoculture)', value: 5 },
];
const DIVERSITY_COLORS = ['#22c55e', '#f59e0b', '#ef4444'];

const soilHealthData = [
    { name: 'Good', value: 450 },
    { name: 'Moderate', value: 300 },
    { name: 'Poor', value: 150 },
];
const SOIL_COLORS = ['#22c55e', '#f59e0b', '#ef4444'];


export default function GovernmentDashboard() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Crop Production"
          value="667.3 M Tonnes"
          icon={<AreaChart className="h-6 w-6 text-muted-foreground" />}
          description="Annual Estimate"
        />
        <StatCard
          title="Subsidies Disbursed"
          value="₹1.2 Lakh Cr"
          icon={<Globe className="h-6 w-6 text-muted-foreground" />}
          description="This fiscal year"
        />
        <StatCard
          title="Active Schemes"
          value={schemes.length.toString()}
          icon={<Bell className="h-6 w-6 text-muted-foreground" />}
          description="Nationwide farmer schemes"
        />
        <StatCard
          title="Monsoon Forecast"
          value="98% of LPA"
          icon={<Droplets className="h-6 w-6 text-muted-foreground" />}
          description="IMD Long Period Average"
        />
      </div>

       <Card>
        <CardHeader>
            <CardTitle>Agriculture Intelligence Overview</CardTitle>
            <CardDescription>High-level view of the national agricultural landscape.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2"><Siren/> Extreme Weather Monitor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                     <Alert variant="destructive">
                        <AlertTitle>Heatwave Alert</AlertTitle>
                        <AlertDescription>Punjab, Haryana, Rajasthan. Temps {' > '} 42°C.</AlertDescription>
                    </Alert>
                    <Alert>
                        <AlertTitle>Flood Warning</AlertTitle>
                        <AlertDescription>Low-lying areas of Assam. Brahmaputra is high.</AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2"><Bug/> Crop Disease Outbreak Tracker</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow><TableHead>Disease</TableHead><TableHead>Region</TableHead><TableHead>Severity</TableHead></TableRow>
                        </TableHeader>
                        <TableBody>
                            {diseaseOutbreaks.map((d) => (
                                <TableRow key={d.id}>
                                    <TableCell>{d.disease}</TableCell>
                                    <TableCell>{d.region}</TableCell>
                                    <TableCell><Badge variant={d.severity === 'High' ? 'destructive' : 'outline'}>{d.severity}</Badge></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2"><Award/> State/District Crop Yields</CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow><TableHead>State</TableHead><TableHead>Crop</TableHead><TableHead>Yield (T/Ha)</TableHead></TableRow>
                        </TableHeader>
                        <TableBody>
                            {yieldData.map((d) => (
                                <TableRow key={d.state}>
                                    <TableCell>{d.state}</TableCell>
                                    <TableCell>{d.crop}</TableCell>
                                    <TableCell>{d.yield}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </CardContent>
      </Card>


      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Crop Production Statistics</CardTitle>
            <CardDescription>Major crop production in million tonnes (annual).</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productionData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }}/>
                <Bar dataKey="total" name="Production (M Tonnes)" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Government Notifications</CardTitle>
            <CardDescription>Key schemes and policies.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Scheme Title</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schemes.map((scheme) => (
                  <TableRow key={scheme.id}>
                    <TableCell className="font-medium">{scheme.title}</TableCell>
                    <TableCell className="text-right text-green-600">Active</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

       <div className="grid gap-6 md:grid-cols-3">
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Map/> Agricultural Productivity Heatmap</CardTitle>
                    <CardDescription>Mock visualization of high vs. low productivity zones.</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="grid grid-cols-4 grid-rows-3 gap-1 bg-secondary/50 p-2 rounded-md aspect-video">
                        {['bg-green-500', 'bg-green-400', 'bg-green-500', 'bg-red-400', 'bg-green-300', 'bg-yellow-300', 'bg-red-400', 'bg-green-500', 'bg-green-400', 'bg-yellow-300', 'bg-green-500', 'bg-green-400'].map((color, i) => (
                             <div key={i} className={`rounded-sm ${color}/80`}></div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Leaf/> Soil Health Index</CardTitle>
                    <CardDescription>Distribution of soil quality categories.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie data={soilHealthData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5}>
                                {soilHealthData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={SOIL_COLORS[index % SOIL_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} formatter={(value) => `${value} farms`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Droplets/> Crop Diversity Index</CardTitle>
                    <CardDescription>Regional diversity in crop cultivation.</CardDescription>
                </CardHeader>
                 <CardContent className="flex justify-center items-center">
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie data={cropDiversityData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5}>
                                {cropDiversityData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={DIVERSITY_COLORS[index % DIVERSITY_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} formatter={(value) => `${value} Regions`} />
                            <Legend layout="vertical" align="right" verticalAlign="middle" iconSize={10} wrapperStyle={{fontSize: "12px", paddingLeft: "20px"}}/>
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

      <AdminAdvisoryTool />
    </div>
  );
}
