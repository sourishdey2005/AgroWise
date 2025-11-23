"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/shared/stat-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';
import { Users, Map, Briefcase, LandPlot, TrendingUp, BarChart2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const shgFpoData = [
  { year: '2021', shg: 80, fpo: 25 },
  { year: '2022', shg: 95, fpo: 35 },
  { year: '2023', shg: 110, fpo: 50 },
  { year: '2024', shg: 130, fpo: 70 },
];

const fragmentationData = [
  { range: '< 1 Ha', percentage: 68 },
  { range: '1-2 Ha', percentage: 17 },
  { range: '2-4 Ha', percentage: 10 },
  { range: '> 4 Ha', percentage: 5 },
];

const migrationData = [
    { month: 'Apr', rate: 12 },
    { month: 'May', rate: 18 },
    { month: 'Jun', rate: 15 },
    { month: 'Jul', rate: 8 },
];

export default function RuralEconomyPage() {

    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Farmer Database & Rural Economy Analysis</h1>
                <p className="text-muted-foreground">Analyze farmer demographics, rural employment, and economic trends.</p>
            </div>

            <h2 className="text-xl font-semibold tracking-tight text-primary">National Farmer Registry Insights</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Registered Farmers" value="12.5 Cr" icon={<Users className="h-6 w-6 text-muted-foreground" />} description="Across all states" />
                <StatCard title="Avg. Land Holding" value="1.08 Ha" icon={<LandPlot className="h-6 w-6 text-muted-foreground" />} description="National average" />
                <StatCard title="Irrigated Land" value="52%" icon={<TrendingUp className="h-6 w-6 text-muted-foreground" />} description="Percentage of farms with irrigation" />
                <StatCard title="Avg. Farmer Age" value="48 Yrs" icon={<Users className="h-6 w-6 text-muted-foreground" />} description="Average age of land-holding farmer" />
            </div>

             <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Map /> Rural Employment Heatmap (MGNREGA)</CardTitle>
                        <CardDescription>Mock visualization of job demand and completion rates.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="aspect-video w-full bg-secondary/50 rounded-md p-2 grid grid-cols-10 grid-rows-6 gap-1">
                            {Array.from({ length: 60 }).map((_, i) => (
                                <div key={i} className={`rounded-sm opacity-80 ${Math.random() > 0.8 ? 'bg-red-500' : Math.random() > 0.5 ? 'bg-amber-400' : 'bg-green-500'}`} />
                            ))}
                        </div>
                         <div className="flex justify-around text-xs mt-2">
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-red-500"/>High Demand</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-amber-400"/>Medium Demand</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-green-500"/>Low Demand</span>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BarChart2 /> SHG & FPO Growth Dashboard</CardTitle>
                        <CardDescription>Growth of Farmer Producer Organisations and Self Help Groups (in thousands).</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={shgFpoData}>
                                <XAxis dataKey="year" fontSize={12} />
                                <YAxis unit="k" fontSize={12} />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} cursor={{fill: 'hsl(var(--muted))'}} />
                                <Legend />
                                <Bar dataKey="shg" name="Self-Help Groups" fill="hsl(var(--primary))" radius={4} />
                                <Bar dataKey="fpo" name="FPOs" fill="hsl(var(--chart-2))" radius={4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
            
             <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><LandPlot /> Land Ownership Fragmentation</CardTitle>
                        <CardDescription>Percentage of farmers by land holding size.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {fragmentationData.map(item => (
                                <div key={item.range}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>{item.range}</span>
                                        <span>{item.percentage}%</span>
                                    </div>
                                    <Progress value={item.percentage} />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Briefcase /> Post-Harvest Migration Trend</CardTitle>
                        <CardDescription>Mock visualization of rural-to-urban workforce movement.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={migrationData}>
                                <XAxis dataKey="month" fontSize={12} />
                                <YAxis unit="%" fontSize={12} />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
                                <Legend />
                                <Line type="monotone" dataKey="rate" name="Migration Rate" stroke="hsl(var(--primary))" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}
