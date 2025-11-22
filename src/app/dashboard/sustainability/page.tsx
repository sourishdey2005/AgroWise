
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Recycle, Footprints, Droplets, Shield, AlertTriangle, Siren, Map, Bug, ShieldCheck, Bird } from 'lucide-react';
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
    const [diseaseSeverity, setDiseaseSeverity] = useState(22);
    const [pesticideStatus, setPesticideStatus] = useState({ level: 'Safe', variant: 'secondary' as 'secondary' | 'destructive' | 'outline' });
    const [biodiversityIndex, setBiodiversityIndex] = useState(68);
    const [beneficialInsects, setBeneficialInsects] = useState(150);


    useEffect(() => {
        const interval = setInterval(() => {
            setCarbonFootprint(f => Math.max(0.5, f + getRandom(-0.05, 0.05)));
            setFarmingScore(s => Math.min(100, Math.max(0, s + getRandom(-1, 1))));
            setWaterEfficiency(w => Math.min(100, Math.max(0, w + getRandom(-1.5, 1.5))));
            setDiseaseSeverity(d => Math.min(100, Math.max(0, d + getRandom(-2, 2))));
            setBiodiversityIndex(b => Math.min(100, Math.max(0, b + getRandom(-0.5, 0.5))));
            setBeneficialInsects(i => Math.max(50, i + getRandom(-5, 5)));

            
            const randomFertilizer = getRandom(0, 10);
            if (randomFertilizer > 9) {
                 setFertilizerStatus({ level: 'Overuse Detected', variant: 'destructive' });
            } else if (randomFertilizer > 8) {
                 setFertilizerStatus({ level: 'Slightly High', variant: 'outline' });
            }
            else {
                 setFertilizerStatus({ level: 'Optimal', variant: 'secondary' });
            }

            const randomPesticide = getRandom(0, 10);
            if (randomPesticide > 9.5) {
                setPesticideStatus({ level: 'High Risk', variant: 'destructive' });
            } else if (randomPesticide > 8) {
                setPesticideStatus({ level: 'Caution', variant: 'outline' });
            } else {
                setPesticideStatus({ level: 'Safe', variant: 'secondary' });
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
         <Card>
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-sm font-medium"><ShieldCheck className="w-5 h-5"/> Pesticide Usage</CardTitle>
            </CardHeader>
            <CardContent>
                 <Badge variant={pesticideStatus.variant as any}>{pesticideStatus.level}</Badge>
                 <p className="text-xs text-muted-foreground mt-2">Based on last application and weather.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-sm font-medium"><Bug className="w-5 h-5" /> Beneficial Insects</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">{Math.round(beneficialInsects)} <span className="text-sm text-muted-foreground">/ trap</span></p>
                <p className="text-xs text-muted-foreground mt-1">Population is stable.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-sm font-medium"><Bird className="w-5 h-5"/> Biodiversity Index</CardTitle>
            </CardHeader>
            <CardContent>
                 <p className="text-3xl font-bold">{Math.round(biodiversityIndex)} <span className="text-sm text-muted-foreground">/ 100</span></p>
                 <p className="text-xs text-muted-foreground mt-1">Healthy mix of flora and fauna.</p>
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
      
      <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Siren/> Crop Disease Severity</CardTitle>
                    <CardDescription>Overall disease pressure on your primary crop.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                    <div className="relative h-32 w-32">
                        <svg className="h-full w-full" viewBox="0 0 36 36">
                            <path className="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3"/>
                            <path className={diseaseSeverity > 70 ? "text-red-500" : diseaseSeverity > 40 ? "text-amber-500" : "text-green-500"} strokeDasharray={`${diseaseSeverity}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" strokeLinecap="round"/>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold">{Math.round(diseaseSeverity)}%</span>
                             <span className="text-xs text-muted-foreground">{diseaseSeverity > 70 ? "High" : diseaseSeverity > 40 ? "Medium" : "Low"}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Map/> Field Hotspot Identifier</CardTitle>
                    <CardDescription>Areas with consistently lower yield (mock).</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="grid grid-cols-8 grid-rows-4 gap-1 bg-secondary/50 p-2 rounded-md aspect-video">
                        {Array.from({ length: 32 }).map((_, i) => (
                             <div key={i} className={`rounded-sm ${
                                 (i === 10 || i === 11 || i === 18) ? 'bg-red-400/80' : 'bg-green-300/60'
                             }`}>
                                {i === 10 && <span className="text-xs p-1 text-white/90">Low Yield</span>}
                             </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>

    </div>
  );
}
