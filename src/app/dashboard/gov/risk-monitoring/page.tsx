"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Siren, Bug, Shield, TrendingUp } from 'lucide-react';
import StatCard from '@/components/shared/stat-card';

const diseaseProbabilityData = [
  { name: 'May', rust: 15, blast: 10 },
  { name: 'Jun', rust: 20, blast: 12 },
  { name: 'Jul', rust: 35, blast: 18 },
  { name: 'Aug', rust: 25, blast: 22 },
];

const vulnerabilityData = [
  { region: 'Vidarbha, MH', index: 8.2, factors: 'Drought, Heatwave' },
  { region: 'Coastal Odisha', index: 7.5, factors: 'Cyclone, Flood' },
  { region: 'North Bihar', index: 7.1, factors: 'Flood' },
  { region: 'Marathwada, MH', index: 6.8, factors: 'Drought' },
];

export default function RiskMonitoringPage() {
    const [droughtRisk, setDroughtRisk] = useState(65);

    useEffect(() => {
        const interval = setInterval(() => {
            setDroughtRisk(r => Math.min(100, Math.max(0, r + Math.random() * 4 - 2)));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const getRiskInfo = (score: number) => {
        if (score > 75) return { label: "Very High", color: "text-red-600" };
        if (score > 60) return { label: "High", color: "text-amber-600" };
        if (score > 40) return { label: "Medium", color: "text-yellow-500" };
        return { label: "Low", color: "text-green-600" };
    }

    const riskInfo = getRiskInfo(droughtRisk);


    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Disaster & Risk Monitoring</h1>
                <p className="text-muted-foreground">Predictive analytics for agricultural risk management.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Siren/> Flood/Drought Risk Score</CardTitle>
                        <CardDescription>Current risk for Vidarbha region.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                        <div className="relative h-32 w-32">
                            <svg className="h-full w-full" viewBox="0 0 36 36">
                                <path className="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3.5" />
                                <path className={riskInfo.color} strokeDasharray={`${droughtRisk}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3.5" strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className={`text-4xl font-bold ${riskInfo.color}`}>{Math.round(droughtRisk)}</span>
                                <span className={`text-sm font-semibold ${riskInfo.color}`}>{riskInfo.label}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Bug/> Disease Outbreak Probability</CardTitle>
                        <CardDescription>Probability of major crop diseases in the next few months.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={diseaseProbabilityData}>
                                <XAxis dataKey="name" fontSize={12} />
                                <YAxis unit="%" fontSize={12} />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
                                <Legend />
                                <Line type="monotone" dataKey="rust" name="Wheat Rust" stroke="hsl(var(--chart-1))" />
                                <Line type="monotone" dataKey="blast" name="Rice Blast" stroke="hsl(var(--chart-2))" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Shield/> Region-wise Vulnerability Index</CardTitle>
                    <CardDescription>Composite index based on historical data, weather, and crop types.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Region</TableHead>
                                <TableHead>Vulnerability Index</TableHead>
                                <TableHead>Primary Factors</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vulnerabilityData.map(item => (
                                <TableRow key={item.region}>
                                    <TableCell className="font-medium">{item.region}</TableCell>
                                    <TableCell>
                                        <Badge variant={item.index > 7 ? 'destructive' : item.index > 6 ? 'outline' : 'secondary'}>{item.index}</Badge>
                                    </TableCell>
                                    <TableCell>{item.factors}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    );
}