
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/shared/stat-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { GitCompareArrows, Users, Clock, Map, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const disbursalTimeData = [
  { stage: 'Application', time: 2 },
  { stage: 'Verification', time: 5 },
  { stage: 'Approval', time: 3 },
  { stage: 'Release', time: 4 },
];

const agentActivityData = [
    { agent: 'A. Mehta', region: 'Punjab', handled: 25, delay: 1.2 },
    { agent: 'R. Gupta', region: 'U.P.', handled: 32, delay: 2.5 },
    { agent: 'V. Verma', region: 'Maharashtra', handled: 28, delay: 1.8 },
]

export default function TriLinkAnalyticsPage() {
    const [creditCoverage, setCreditCoverage] = useState(65);

    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Government–Bank–Agent Tri-Link Analytics</h1>
                <p className="text-muted-foreground">Monitor the synergy and performance of the tri-party ecosystem.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Users/> Credit Coverage</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-2">
                             <p className="text-4xl font-bold">{creditCoverage}%</p>
                             <p className="text-xs text-muted-foreground">of farmers covered</p>
                        </div>
                        <Progress value={creditCoverage} className="mt-2" />
                    </CardContent>
                </Card>
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Loan Distress Alert</AlertTitle>
                    <AlertDescription>
                        High default probability detected in Marathwada region due to drought conditions.
                    </AlertDescription>
                </Alert>
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Clock /> Subsidy Disbursal Time</CardTitle>
                        <CardDescription>Average time (in days) taken at each stage.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={150}>
                            <BarChart data={disbursalTimeData}>
                                <XAxis dataKey="stage" fontSize={12} />
                                <YAxis unit="d" fontSize={12} />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} cursor={{fill: 'hsl(var(--muted))'}} />
                                <Bar dataKey="time" name="Avg Days" fill="hsl(var(--primary))" radius={4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Map /> Schemes Benefit Distribution</CardTitle>
                        <CardDescription>Mock visualization of scheme benefit concentration.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="aspect-video w-full bg-secondary/50 rounded-md p-2 grid grid-cols-10 grid-rows-6 gap-1">
                            {Array.from({ length: 60 }).map((_, i) => (
                                <div key={i} className={`rounded-sm opacity-80 ${
                                    [12, 23, 34].includes(i) ? 'bg-blue-600' :
                                    [5, 15, 25, 35, 45].includes(i) ? 'bg-green-600' :
                                    [41, 42, 51, 52].includes(i) ? 'bg-amber-500' : 'bg-secondary'
                                }`} />
                            ))}
                        </div>
                        <div className="flex justify-around text-xs mt-2">
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-600"/>PM-KISAN</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-600"/>PMFBY</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"/>Irrigation Subsidy</span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><GitCompareArrows /> Agent Activity Transparency</CardTitle>
                        <CardDescription>Performance metrics of field agents.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Agent</TableHead>
                                    <TableHead>Region</TableHead>
                                    <TableHead>Apps Handled</TableHead>
                                    <TableHead>Avg Delay (days)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {agentActivityData.map(agent => (
                                    <TableRow key={agent.agent}>
                                        <TableCell>{agent.agent}</TableCell>
                                        <TableCell>{agent.region}</TableCell>
                                        <TableCell>{agent.handled}</TableCell>
                                        <TableCell>
                                            <Badge variant={agent.delay > 2 ? 'destructive' : 'secondary'}>{agent.delay}</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
