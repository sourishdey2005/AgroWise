"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/shared/stat-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Target, TrendingUp, Tractor, Sprout, ClipboardList, BookOpen, Scaling, Users, Percent, FilePieChart, FileText } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const mspComplianceData = [
  { mandi: 'Ludhiana', crop: 'Wheat', compliance: 98 },
  { mandi: 'Indore', crop: 'Soybean', compliance: 95 },
  { mandi: 'Guntur', crop: 'Chilli', compliance: 88 },
  { mandi: 'Nashik', crop: 'Onion', compliance: 92 },
];

const fertilizerGapData = [
    { name: 'Urea', supply: 85, demand: 90 },
    { name: 'DAP', supply: 95, demand: 80 },
    { name: 'Potash', supply: 70, demand: 75 },
];

const mechanizationData = [
    { name: 'Tractors', adoption: 65 },
    { name: 'Harvesters', adoption: 40 },
    { name: 'Drones', adoption: 15 },
];

const budgetData = {
    allocated: 150000, // in Cr
    utilized: 135000 // in Cr
};

export default function PolicyImpactPage() {
    const [sowingProgress, setSowingProgress] = useState({ kharif: 92, rabi: 65 });

    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Policy Impact & Agriculture Metrics</h1>
                <p className="text-muted-foreground">Monitor policy effectiveness and key agricultural metrics.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Policy Impact Score" value="82/100" icon={<TrendingUp className="h-6 w-6 text-muted-foreground" />} description="AI-Generated composite score" />
                <StatCard title="PDS Quality Index" value="Good" icon={<ClipboardList className="h-6 w-6 text-muted-foreground" />} description="Efficiency of food grain distribution" />
                <StatCard title="Subsidy Utilization" value="88%" icon={<Percent className="h-6 w-6 text-muted-foreground" />} description="Fertilizer & Seed Subsidies" />
                <StatCard title="MSP Compliance" value="94%" icon={<BookOpen className="h-6 w-6 text-muted-foreground" />} description="Across major mandis" />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Minimum Support Price (MSP) Compliance</CardTitle>
                        <CardDescription>Percentage of trades happening at or above MSP.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader><TableRow><TableHead>Mandi</TableHead><TableHead>Crop</TableHead><TableHead>Compliance</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {mspComplianceData.map(item => (
                                    <TableRow key={item.mandi}>
                                        <TableCell>{item.mandi}</TableCell>
                                        <TableCell>{item.crop}</TableCell>
                                        <TableCell><Badge variant={item.compliance > 90 ? 'secondary' : 'outline'}>{item.compliance}%</Badge></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>State-wise Fertilizer Demand-Supply Gap</CardTitle>
                        <CardDescription>Predicted gap for the next quarter.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={fertilizerGapData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} cursor={{fill: 'hsl(var(--muted))'}} />
                                <Legend />
                                <Bar dataKey="supply" name="Supply" stackId="a" fill="hsl(var(--secondary))" />
                                <Bar dataKey="demand" name="Demand" stackId="b" fill="hsl(var(--primary))" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Seasonal Crop Sowing Monitor</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1 font-semibold"><span>Kharif</span><span>{sowingProgress.kharif}%</span></div>
                            <Progress value={sowingProgress.kharif} />
                        </div>
                         <div>
                            <div className="flex justify-between text-sm mb-1 font-semibold"><span>Rabi</span><span>{sowingProgress.rabi}%</span></div>
                            <Progress value={sowingProgress.rabi} />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Farm Mechanization Adoption</CardTitle>
                    </CardHeader>
                     <CardContent>
                        <ResponsiveContainer width="100%" height={150}>
                            <BarChart data={mechanizationData} layout="vertical">
                                <XAxis type="number" hide />
                                <YAxis type="category" width={80} dataKey="name" fontSize={12} />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} formatter={(value) => `${value}%`} />
                                <Bar dataKey="adoption" fill="hsl(var(--primary))" radius={4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Organic Farming Adoption</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                        <div className="relative h-24 w-24">
                             <svg className="h-full w-full" viewBox="0 0 36 36">
                                <path className="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3.5" />
                                <path className="text-green-500" strokeDasharray="18, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3.5" strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-3xl font-bold">18%</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            
             <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><FilePieChart /> Agri Budget: Allocation vs Utilisation</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-4xl font-bold">₹{budgetData.utilized.toLocaleString()} Cr</p>
                        <p className="text-muted-foreground">Utilized out of ₹{budgetData.allocated.toLocaleString()} Cr Allocated</p>
                        <Progress value={(budgetData.utilized / budgetData.allocated) * 100} className="mt-4" />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Users/> Women Farmers Empowerment</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <p className="text-3xl font-bold">1.2 Cr</p>
                            <p className="text-sm text-muted-foreground">Women-led Farms</p>
                        </div>
                         <div>
                            <p className="text-3xl font-bold">8 Lakh</p>
                            <p className="text-sm text-muted-foreground">Self-Help Groups (SHGs)</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
