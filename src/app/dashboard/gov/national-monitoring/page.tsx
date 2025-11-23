
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Map, Brain, Activity, CloudRain, Droplets, Siren, Bug, FlaskConical, Globe, Sprout } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const yieldPredictionData = [
  { month: 'Jul', yield: 102 },
  { month: 'Aug', yield: 103 },
  { month: 'Sep', yield: 105 },
  { month: 'Oct', yield: 104 },
  { month: 'Nov', yield: 106 },
  { month: 'Dec', yield: 108 },
];

const rainfallDeviationData = [
  { month: 'Jan', actual: 15, normal: 20 },
  { month: 'Feb', actual: 25, normal: 22 },
  { month: 'Mar', actual: 30, normal: 28 },
  { month: 'Apr', actual: 45, normal: 40 },
  { month: 'May', actual: 80, normal: 75 },
  { month: 'Jun', actual: 150, normal: 160 },
];

const reservoirData = [
    { level: 78, label: "Current Level", color: "hsl(var(--primary))" },
    { level: 65, label: "10-Year Avg", color: "hsl(var(--secondary))" },
]

const diversificationData = [
    { name: 'Diversified', value: 40, color: '#22c55e' },
    { name: 'Semi-Diversified', value: 35, color: '#f59e0b' },
    { name: 'Monoculture', value: 25, color: '#ef4444' },
];

export default function NationalMonitoringPage() {

    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">National Monitoring & Intelligence</h1>
                <p className="text-muted-foreground">High-level visualizations for national agricultural insights.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Map/> National Crop Production Heatmap</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="aspect-video w-full bg-secondary/50 rounded-md p-2 grid grid-cols-10 grid-rows-6 gap-1">
                            {Array.from({ length: 60 }).map((_, i) => (
                                <div key={i} className={`rounded-sm opacity-80 ${Math.random() > 0.7 ? 'bg-green-600' : Math.random() > 0.4 ? 'bg-green-500' : 'bg-green-400'}`} />
                            ))}
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Brain/> AI-Powered Yield Prediction</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={180}>
                            <LineChart data={yieldPredictionData}>
                                <XAxis dataKey="month" fontSize={12} />
                                <YAxis domain={[100, 110]} unit="%" fontSize={12} />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }}/>
                                <Line type="monotone" dataKey="yield" name="Yield Index" stroke="hsl(var(--primary))" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Activity/> Satellite Crop Health (NDVI)</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="aspect-video w-full bg-secondary/50 rounded-md p-2 grid grid-cols-10 grid-rows-6 gap-1">
                             {Array.from({ length: 60 }).map((_, i) => (
                                <div key={i} className={`rounded-sm opacity-80 ${Math.random() > 0.8 ? 'bg-red-500' : Math.random() > 0.5 ? 'bg-yellow-400' : 'bg-green-500'}`} />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
            
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><CloudRain/> Rainfall Deviation Tracker</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ResponsiveContainer width="100%" height={180}>
                            <AreaChart data={rainfallDeviationData}>
                                <XAxis dataKey="month" fontSize={12} />
                                <YAxis unit="mm" fontSize={12} />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }}/>
                                <Legend />
                                <Area type="monotone" dataKey="actual" name="Actual" stroke="hsl(var(--primary))" fill="hsl(var(--primary)/0.3)" />
                                <Area type="monotone" dataKey="normal" name="Normal" stroke="hsl(var(--secondary-foreground))" fill="hsl(var(--secondary)/0.3)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Droplets/> Water Reservoir Capacity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {reservoirData.map(item => (
                                <div key={item.label}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-semibold">{item.label}</span>
                                        <span className="text-muted-foreground">{item.level}% Full</span>
                                    </div>
                                    <Progress value={item.level} className="[&>*]:bg-[var(--color)]" style={{ '--color': item.color } as React.CSSProperties} />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Siren/> Integrated Disaster Risk Map</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="aspect-video w-full bg-secondary/50 rounded-md p-2 grid grid-cols-10 grid-rows-6 gap-1">
                            {/* Mocking different risk layers */}
                            {Array.from({ length: 60 }).map((_, i) => (
                                <div key={i} className={`rounded-sm opacity-50 ${i % 3 === 0 && Math.random() > 0.6 ? 'bg-red-600' : i % 3 === 1 && Math.random() > 0.7 ? 'bg-blue-500' : 'bg-transparent'}`} />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Bug/> Pest Outbreak Forecast</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="font-semibold">High risk: <span className="text-destructive">Locust Swarms</span></p>
                        <p className="text-xs text-muted-foreground">Rajasthan & Gujarat border.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><FlaskConical/> Soil Nutrient Degradation</CardTitle>
                    </CardHeader>
                     <CardContent>
                        <p className="font-semibold">Hotspot: <span className="text-amber-600">Western UP</span></p>
                        <p className="text-xs text-muted-foreground">Significant Nitrogen loss detected.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Globe/> Land Use Change</CardTitle>
                    </CardHeader>
                     <CardContent>
                        <p className="font-semibold">Trend: <span className="text-primary">Urban Expansion</span></p>
                        <p className="text-xs text-muted-foreground">~5% agricultural land loss near major cities.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Sprout/> Crop Diversification Index</CardTitle>
                    </CardHeader>
                     <CardContent>
                        <ResponsiveContainer width="100%" height={100}>
                            <PieChart>
                                <Pie data={diversificationData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={30} outerRadius={40} paddingAngle={5}>
                                    {diversificationData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
