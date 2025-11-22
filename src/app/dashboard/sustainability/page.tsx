"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Recycle, Footprints, Droplets, Shield, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip, CartesianGrid, AreaChart, Area } from "recharts";

const soilCarbonData = [
  { year: '2020', level: 2.1 },
  { year: '2021', level: 2.2 },
  { year: '2022', level: 2.25 },
  { year: '2023', level: 2.35 },
  { year: '2024', level: 2.4 },
];

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

export default function SustainabilityPage() {
    const [carbonFootprint, setCarbonFootprint] = useState(1.2);
    const [farmingScore, setFarmingScore] = useState(78);
    const [waterEfficiency, setWaterEfficiency] = useState(85);
    const [fertilizerStatus, setFertilizerStatus] = useState({ level: 'Optimal', variant: 'secondary' });

    useEffect(() => {
        const interval = setInterval(() => {
            setCarbonFootprint(f => Math.max(0.5, f + getRandom(-0.05, 0.05)));
            setFarmingScore(s => Math.min(100, Math.max(0, s + getRandom(-1, 1))));
            setWaterEfficiency(w => Math.min(100, Math.max(0, w + getRandom(-1.5, 1.5))));
            
            const randomStatus = getRandom(0, 10);
            if (randomStatus > 9) {
                 setFertilizerStatus({ level: 'Overuse Detected', variant: 'destructive' });
            } else if (randomStatus > 8) {
                 setFertilizerStatus({ level: 'Slightly High', variant: 'outline' });
            }
            else {
                 setFertilizerStatus({ level: 'Optimal', variant: 'secondary' });
            }

        }, 4000);

        return () => clearInterval(interval);
    }, []);


  return (
    <div className="grid gap-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Sustainability Hub</h1>
        <p className="text-muted-foreground">
          Track and improve your farm's environmental impact.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Carbon Footprint</CardTitle>
                <Footprints className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">{carbonFootprint.toFixed(2)} <span className="text-sm text-muted-foreground">tCO₂e/acre</span></p>
                <p className="text-xs text-muted-foreground">Annual estimate</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Water Use Efficiency</CardTitle>
                <Droplets className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold text-blue-600">{Math.round(waterEfficiency)}%</span>
                </div>
                <Progress value={waterEfficiency} className="h-2 mt-2" />
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Fertilizer Use</CardTitle>
                <AlertTriangle className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <Badge variant={fertilizerStatus.variant as any}>{fertilizerStatus.level}</Badge>
                <p className="text-xs text-muted-foreground mt-2">
                    {fertilizerStatus.level === 'Optimal' ? 'Nitrogen levels are balanced.' : 'Consider adjusting application rates.'}
                </p>
            </CardContent>
        </Card>
        <Card className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Sustainable Farming Score</CardTitle>
                <Shield className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
                 <div className="relative h-24 w-24">
                    <svg className="h-full w-full" viewBox="0 0 36 36">
                        <path
                            className="text-secondary"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            strokeWidth="3.5"
                        />
                        <path
                            className="text-green-500"
                            strokeDasharray={`${farmingScore}, 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-green-500">{Math.round(farmingScore)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Recycle /> Soil Organic Carbon Tracker</CardTitle>
          <CardDescription>Estimated organic carbon percentage in topsoil over time.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={soilCarbonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} unit="%" domain={['dataMin - 0.2', 'dataMax + 0.2']} />
                <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
                <Area type="monotone" dataKey="level" name="Carbon Level" stroke="hsl(var(--accent))" fill="hsl(var(--accent) / 0.2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </div>
  );
}
