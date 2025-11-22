
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield, CloudRain, CloudSun, DollarSign, Bug, Droplets, Fuel, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const weatherImpactData = [
  { region: 'Vidarbha', recoveryRate: 85, risk: 'Drought' },
  { region: 'Coastal AP', recoveryRate: 92, risk: 'Cyclone' },
  { region: 'Punjab', recoveryRate: 98, risk: 'Normal' },
  { region: 'Assam', recoveryRate: 88, risk: 'Flood' },
  { region: 'Kerala', recoveryRate: 90, risk: 'Heavy Rain' },
  { region: 'Rajasthan', recoveryRate: 82, risk: 'Drought' },
  { region: 'West Bengal', recoveryRate: 94, risk: 'Cyclone' },
];

export default function ExternalRiskPage() {
    const [priceImpact, setPriceImpact] = useState(6.5);
    const [waterLevel, setWaterLevel] = useState(75);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setPriceImpact(p => Math.max(1, Math.min(10, p + Math.random() - 0.5)));
            setWaterLevel(w => Math.max(20, Math.min(100, w + Math.random() * 2 - 1)));
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const getPriceImpactVariant = () => {
        if (priceImpact > 7) return "destructive";
        if (priceImpact > 4) return "outline";
        return "secondary";
    };

    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">External Risk Monitoring</h1>
                <p className="text-muted-foreground">Monitor external factors affecting loan portfolio performance.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><DollarSign/> Commodity Price Impact</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-5xl font-bold">{priceImpact.toFixed(1)}</p>
                        <Badge variant={getPriceImpactVariant()} className="mt-2">
                           {priceImpact > 7 ? 'High Impact' : priceImpact > 4 ? 'Medium Impact' : 'Low Impact'}
                        </Badge>
                         <p className="text-xs text-muted-foreground mt-2">Index of MSP/Mandi price effects on risk.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Droplets/> Water Table Level</CardTitle>
                    </CardHeader>
                     <CardContent className="text-center">
                        <p className={`text-5xl font-bold ${waterLevel < 50 ? 'text-destructive' : 'text-primary'}`}>{Math.round(waterLevel)}%</p>
                         <p className="text-xs text-muted-foreground mt-2">Regional average water table status.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Fuel/> Input Cost Inflation</CardTitle>
                    </CardHeader>
                     <CardContent className="text-center">
                        <p className="text-3xl font-bold text-amber-600">+4.5%</p>
                        <p className="text-xs text-muted-foreground mt-2">Projected 3-month fertilizer cost increase.</p>
                    </CardContent>
                </Card>
                <Alert variant="destructive">
                    <Bug className="h-4 w-4"/>
                    <AlertTitle>Crop Disease Alert!</AlertTitle>
                    <AlertDescription>
                        AI model predicts high probability of Yellow Rust outbreak in North Punjab. Potential impact on wheat crop loans.
                    </AlertDescription>
                </Alert>
            </div>

             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><CloudRain /> Weather-Risk Impact on Loan Recovery</CardTitle>
                    <CardDescription>Estimated impact of regional weather events on loan recovery rates.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={weatherImpactData}>
                            <XAxis dataKey="region" />
                            <YAxis domain={[80, 100]} unit="%"/>
                            <Tooltip
                                contentStyle={{ backgroundColor: 'hsl(var(--background))' }}
                                formatter={(value, name, props) => {
                                    const { payload } = props;
                                    const risk = payload.risk || 'N/A';
                                    return [`${value}% (Risk: ${risk})`, "Recovery Rate"];
                                }}
                                labelFormatter={(label) => `Region: ${label}`}
                             />
                            <Legend />
                            <Bar dataKey="recoveryRate" name="Recovery Rate" fill="hsl(var(--primary))" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

        </div>
    );
}
