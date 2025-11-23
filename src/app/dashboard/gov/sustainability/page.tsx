
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/shared/stat-card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { Leaf, Droplets, Footprints, Sprout, TrendingUp, BarChart2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const greenCoverData = [
  { year: 2020, cover: 21.67 },
  { year: 2021, cover: 21.71 },
  { year: 2022, cover: 21.75 },
  { year: 2023, cover: 21.78 },
  { year: 2024, cover: 21.82 },
];

const groundwaterData = [
  { year: 2020, level: -5.2 },
  { year: 2021, level: -5.5 },
  { year: 2022, level: -5.8 },
  { year: 2023, level: -6.1 },
  { year: 2024, level: -6.3 },
];

const agroforestryData = [
  { state: 'Punjab', adoption: 12 },
  { state: 'Haryana', adoption: 15 },
  { state: 'U.P.', adoption: 18 },
  { state: 'Bihar', adoption: 22 },
  { state: 'M.P.', adoption: 14 },
];

export default function SustainabilityPage() {
    const [readinessIndex, setReadinessIndex] = useState(68);

    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Sustainability & Environmental Monitoring</h1>
                <p className="text-muted-foreground">Track key environmental metrics for sustainable agriculture.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Carbon Emissions" value="1.2 Mt CO₂e" icon={<Footprints className="h-6 w-6 text-muted-foreground" />} description="From Agri Sector (Annual)" />
                <StatCard title="Agroforestry Adoption" value="16.5%" icon={<Sprout className="h-6 w-6 text-muted-foreground" />} description="National Average" />
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Climate-Smart Agriculture Readiness Index</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <span className="text-4xl font-bold text-primary">{readinessIndex}/100</span>
                            <Progress value={readinessIndex} className="h-3 w-full" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Composite score based on policy, adoption, and infrastructure.</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Leaf /> Green Cover Regeneration Tracker</CardTitle>
                        <CardDescription>Percentage of forest and tree cover over the years.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={greenCoverData}>
                                <XAxis dataKey="year" />
                                <YAxis domain={[21, 22]} unit="%" />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} formatter={(value) => `${value}%`} />
                                <Legend />
                                <Line type="monotone" dataKey="cover" name="Green Cover" stroke="hsl(var(--primary))" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Droplets /> Groundwater Depletion Rate</CardTitle>
                        <CardDescription>Average decline in water table (meters below ground level).</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={groundwaterData}>
                                <XAxis dataKey="year" />
                                <YAxis unit="m" />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} formatter={(value) => `${value}m`} />
                                <Legend />
                                <Line type="monotone" dataKey="level" name="Water Level" stroke="hsl(var(--destructive))" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
                 <Card>
                    <CardHeader>
                        <CardTitle>Agroforestry Growth Tracker</CardTitle>
                        <CardDescription>Adoption percentage across key states.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={agroforestryData} layout="vertical">
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="state" width={60} fontSize={12} />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} formatter={(value) => `${value}%`} />
                                <Bar dataKey="adoption" name="Adoption Rate" fill="hsl(var(--primary))" radius={4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Agricultural Carbon Emission Calculator</CardTitle>
                        <CardDescription>Estimated sources of carbon emissions from the agricultural sector.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1 font-semibold"><span>Fertilizer Use</span><span>45%</span></div>
                            <Progress value={45} />
                        </div>
                         <div>
                            <div className="flex justify-between text-sm mb-1 font-semibold"><span>Livestock</span><span>30%</span></div>
                            <Progress value={30} />
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1 font-semibold"><span>Stubble Burning</span><span>15%</span></div>
                            <Progress value={15} className="[&>*]:bg-destructive" />
                        </div>
                         <div>
                            <div className="flex justify-between text-sm mb-1 font-semibold"><span>Diesel Pumps</span><span>10%</span></div>
                            <Progress value={10} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
