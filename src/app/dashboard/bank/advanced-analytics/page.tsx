
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, LineChart, PieChart, Pie, Cell, Tooltip, Legend, Bar, Line, XAxis, YAxis, CartesianGrid, ScatterChart, Scatter, FunnelChart, Funnel, LabelList } from 'recharts';
import { BrainCircuit, Landmark, Banknote, FileCheck, FileX, BarChart as BarChartIcon, TrendingUp, Filter, Map, Clock, Users, ArrowDown, ArrowRight, ArrowUp, Scale, Shield, Calculator, Percent } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const loanFunnelData = [
  { value: 100, name: 'Applications', fill: '#8884d8' },
  { value: 80, name: 'Verification', fill: '#83a6ed' },
  { value: 50, name: 'Sanctioned', fill: '#8dd1e1' },
  { value: 45, name: 'Disbursed', fill: '#82ca9d' },
  { value: 44, name: 'Repaying', fill: '#a4de6c' },
];

const npaTrendData = [
    { name: '2022', past: 4.5, current: 4.5 },
    { name: '2023', past: 3.8, current: 3.8 },
    { name: 'Q1 \'24', past: 3.2, current: 3.2 },
    { name: 'Q2 \'24', current: 2.9, projected: 2.7 },
    { name: 'Q3 \'24', projected: 2.5 },
    { name: 'Q4 \'24', projected: 2.4 },
];

const recoveryData = [
    { month: 0, remaining: 100 },
    { month: 6, remaining: 85 },
    { month: 12, remaining: 68 },
    { month: 18, remaining: 45 },
    { month: 24, remaining: 22 },
    { month: 30, remaining: 5 },
    { month: 36, remaining: 0 },
];

const cropRiskData = [
  { crop: 'Sugarcane', risk: 20, profitability: 80 },
  { crop: 'Cotton', risk: 60, profitability: 70 },
  { crop: 'Soybean', risk: 40, profitability: 60 },
  { crop: 'Wheat', risk: 15, profitability: 50 },
  { crop: 'Grapes', risk: 75, profitability: 90 },
];

const loanCycleData = [
    { month: 'Jan', demand: 10 }, { month: 'Feb', demand: 12 }, { month: 'Mar', demand: 15 },
    { month: 'Apr', demand: 25 }, { month: 'May', demand: 40 }, { month: 'Jun', demand: 80, season: 'Kharif Peak' },
    { month: 'Jul', demand: 70 }, { month: 'Aug', demand: 50 }, { month: 'Sep', demand: 30 },
    { month: 'Oct', demand: 60, season: 'Rabi Peak' }, { month: 'Nov', demand: 55 }, { month: 'Dec', demand: 20 },
];

const interBranchData = [
    ['State', 'Pune', 'Nashik', 'Nagpur', 'Mumbai'],
    ['NPA %', 3.8, 4.5, 4.1, 2.9],
    ['Disbursed (Cr)', 12, 9.5, 10.5, 15],
    ['TAT (days)', 5, 7, 6, 4],
];

const agentEfficiencyData = [
    { agent: 'A. Mehta', turnaround: 4, approvalRate: 85, sanctioned: 1.2 },
    { agent: 'R. Gupta', turnaround: 6, approvalRate: 78, sanctioned: 0.9 },
    { agent: 'S. Reddy', turnaround: 5, approvalRate: 81, sanctioned: 1.1 },
]

const regionalExposureData = [
    { name: 'Maharashtra', exposure: 40 },
    { name: 'Punjab', exposure: 25 },
    { name: 'U.P.', exposure: 20 },
    { name: 'Karnataka', exposure: 15 },
];


export default function AdvancedAnalyticsPage() {
    const [healthScore, setHealthScore] = useState(78);
    const [loanAmount, setLoanAmount] = useState(150000);
    const [yieldPrediction, setYieldPrediction] = useState(95);
    const [suggestedEmi, setSuggestedEmi] = useState(8500);

    const handleCalculateEmi = () => {
        // Mock calculation
        const baseEmi = loanAmount * 0.02; // Simple base EMI
        const yieldFactor = yieldPrediction / 100;
        const newEmi = baseEmi * yieldFactor * 0.5; // Arbitrary calculation
        setSuggestedEmi(newEmi);
    };

    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Advanced Analytics & Modeling</h1>
                <p className="text-muted-foreground">AI-driven insights, financial models, and portfolio visualizations.</p>
            </div>

            <h2 className="text-xl font-semibold tracking-tight text-primary mt-4">Portfolio Visualizations</h2>

            <Card>
                <CardHeader>
                    <CardTitle>Loan Application Funnel</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                        <FunnelChart>
                            <Tooltip />
                            <Funnel dataKey="value" data={loanFunnelData} isAnimationActive>
                                <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
                            </Funnel>
                        </FunnelChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Map/> Regional Loan Exposure</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={150}>
                            <BarChart data={regionalExposureData} layout="vertical" margin={{ left: 10, right: 10 }}>
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} formatter={(value) => `${value} Cr`} />
                                <Bar dataKey="exposure" fill="hsl(var(--primary))" radius={4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><TrendingUp/> NPA Trendline & Forecast</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ResponsiveContainer width="100%" height={150}>
                            <LineChart data={npaTrendData}>
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} formatter={(value) => `${value}%`} />
                                <Line type="monotone" dataKey="past" name="Past NPA" stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" />
                                <Line type="monotone" dataKey="current" name="Current NPA" stroke="hsl(var(--primary))" />
                                <Line type="monotone" dataKey="projected" name="Projected NPA" stroke="hsl(var(--primary))" strokeDasharray="3 3" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Clock/> Projected Loan Recovery</CardTitle>
                    </CardHeader>
                     <CardContent>
                         <ResponsiveContainer width="100%" height={150}>
                            <LineChart data={recoveryData}>
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} formatter={(value) => `${value}%`} />
                                <Line type="monotone" dataKey="remaining" name="% Remaining" stroke="hsl(var(--chart-2))" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Crop Type vs. Credit Risk</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                           <ScatterChart>
                                <CartesianGrid />
                                <XAxis type="number" dataKey="risk" name="Risk Score" unit="/100" />
                                <YAxis type="number" dataKey="profitability" name="Profitability" unit="/100"/>
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
                                <Legend />
                                <Scatter name="Crops" data={cropRiskData} fill="hsl(var(--primary))" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Crop-Season Loan Cycle Forecast</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                           <BarChart data={loanCycleData}>
                                <XAxis dataKey="month" fontSize={12} />
                                <YAxis />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
                                <Bar dataKey="demand" fill="hsl(var(--primary))" />
                           </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Agent Loan Handling Efficiency</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Agent</TableHead>
                                    <TableHead>Turnaround</TableHead>
                                    <TableHead>Approval %</TableHead>
                                    <TableHead>Sanctioned (Cr)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {agentEfficiencyData.map(d => (
                                    <TableRow key={d.agent}>
                                        <TableCell>{d.agent}</TableCell>
                                        <TableCell>{d.turnaround} days</TableCell>
                                        <TableCell>{d.approvalRate}%</TableCell>
                                        <TableCell>{d.sanctioned}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Average Financial Health Score</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                        <div className="relative h-32 w-32">
                            <svg className="h-full w-full" viewBox="0 0 36 36">
                                <path className="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3.5" />
                                <path className="text-green-500" strokeDasharray={`${healthScore}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3.5" strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-bold text-green-500">{healthScore}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Inter-branch Performance Heat Grid</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {interBranchData[0].map((header, i) => <TableHead key={i}>{header}</TableHead>)}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {interBranchData.slice(1).map((row, i) => (
                                <TableRow key={i}>
                                    {row.map((cell, j) => <TableCell key={j} className={j > 0 ? 'font-mono' : 'font-medium'}>{cell}</TableCell>)}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

             <h2 className="text-xl font-semibold tracking-tight text-primary mt-4">Credit Risk & Financial Modeling</h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader><CardTitle className="text-sm font-medium flex items-center gap-2"><Shield/> Creditworthiness</CardTitle></CardHeader>
                    <CardContent><p className="text-3xl font-bold text-green-600">High</p><p className="text-xs text-muted-foreground">AI Prediction for Farmer ID 123</p></CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className="text-sm font-medium flex items-center gap-2"><Percent/> Default Probability</CardTitle></CardHeader>
                    <CardContent><p className="text-3xl font-bold text-amber-500">8%</p><p className="text-xs text-muted-foreground">Confidence: 92%</p></CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle className="text-sm font-medium flex items-center gap-2"><TrendingUp/> Market Risk</CardTitle></CardHeader>
                    <CardContent><p className="text-3xl font-bold text-amber-500">Medium</p><p className="text-xs text-muted-foreground">Due to falling onion prices</p></CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle className="text-sm font-medium flex items-center gap-2"><Landmark/> Collateral Value</CardTitle></CardHeader>
                    <CardContent><p className="text-2xl font-bold text-primary">+3%</p><p className="text-xs text-muted-foreground">Projected 6-month increase</p></CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Calculator/> Dynamic EMI Affordability Calculator</CardTitle>
                    <CardDescription>Adjusts EMI based on real-time crop yield predictions.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-4 gap-4 items-end">
                    <div>
                        <label className="text-sm font-medium">Loan Amount (₹)</label>
                        <Input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
                    </div>
                     <div>
                        <label className="text-sm font-medium">Yield Prediction (%)</label>
                        <Input type="number" value={yieldPrediction} onChange={(e) => setYieldPrediction(Number(e.target.value))} />
                    </div>
                    <Button onClick={handleCalculateEmi}>Calculate</Button>
                     <div className="text-center bg-secondary p-4 rounded-md">
                        <p className="text-muted-foreground">Suggested Max EMI</p>
                        <p className="text-2xl font-bold text-primary">₹{suggestedEmi.toLocaleString('en-IN', { maximumFractionDigits: 0 })} / month</p>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}

    