
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/shared/stat-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Package, AlertTriangle, Building, BookText, Droplets, FlaskConical, CircleDot } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const fertilizerData = [
  { region: 'Punjab', allocated: 120, distributed: 110 },
  { region: 'Haryana', allocated: 90, distributed: 85 },
  { region: 'Uttar Pradesh', allocated: 200, distributed: 180 },
  { region: 'Maharashtra', allocated: 150, distributed: 145 },
];

const mandiStatusData = [
    { mandi: 'Azadpur, Delhi', status: 'Operational', volume: 'High' },
    { mandi: 'Vashi, Mumbai', status: 'Operational', volume: 'High' },
    { mandi: 'Koyambedu, Chennai', status: 'Operational', volume: 'Medium' },
    { mandi: 'Shyambazar, Kolkata', status: 'Partially Operational', volume: 'Low' },
];

const auditLogData = [
    { id: 1, timestamp: "2024-07-21 10:05:12", user: "Sunita Singh", action: "Generated report for Punjab", details: "Crop Yield Report" },
    { id: 2, timestamp: "2024-07-21 09:45:30", user: "System", action: "Flagged high pesticide use", details: "Region: Malwa" },
    { id: 3, timestamp: "2024-07-20 18:22:01", user: "Nitin Joshi", action: "Broadcasted advisory", details: "Topic: Heatwave precautions" },
]

export default function RegulatoryMonitoringPage() {
    const [complianceScore, setComplianceScore] = useState(92);

    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Regulatory Monitoring</h1>
                <p className="text-muted-foreground">Monitor compliance, distribution, and operational integrity.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Pesticide Compliance</CardTitle>
                        <Droplets className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{complianceScore}%</p>
                        <p className="text-xs text-muted-foreground">Adherence to residue limits.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Fertilizer Compliance</CardTitle>
                        <FlaskConical className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">98%</p>
                        <p className="text-xs text-muted-foreground">Quality checks passed.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Procurement Fraud</CardTitle>
                        <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-green-600">Low</p>
                        <p className="text-xs text-muted-foreground">No major anomalies detected.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Mandi Ops Status</CardTitle>
                        <Building className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">98%</p>
                        <p className="text-xs text-muted-foreground">Mandis fully operational.</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Package /> Fertilizer Distribution Monitoring</CardTitle>
                        <CardDescription>Allocated vs. Distributed (in '000 Tonnes).</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={fertilizerData}>
                                <XAxis dataKey="region" />
                                <YAxis />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} cursor={{fill: 'hsl(var(--muted))'}} />
                                <Legend />
                                <Bar dataKey="allocated" name="Allocated" fill="hsl(var(--secondary))" radius={4} />
                                <Bar dataKey="distributed" name="Distributed" fill="hsl(var(--primary))" radius={4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Building /> Mandis Operational Status</CardTitle>
                        <CardDescription>Live status of major agricultural markets.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader><TableRow><TableHead>Mandi</TableHead><TableHead>Status</TableHead><TableHead>Trading Volume</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {mandiStatusData.map(mandi => (
                                    <TableRow key={mandi.mandi}>
                                        <TableCell>{mandi.mandi}</TableCell>
                                        <TableCell>
                                            <Badge variant={mandi.status === 'Operational' ? 'secondary' : 'destructive'}>
                                                <CircleDot className={`mr-2 h-3 w-3 ${mandi.status === 'Operational' ? 'text-green-500' : 'text-amber-500'}`} />
                                                {mandi.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{mandi.volume}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BookText /> Audit Logs (Mock)</CardTitle>
                    <CardDescription>Track of important regulatory actions and system events.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Timestamp</TableHead><TableHead>User/System</TableHead><TableHead>Action</TableHead><TableHead>Details</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {auditLogData.map(log => (
                                <TableRow key={log.id}>
                                    <TableCell className="text-xs text-muted-foreground">{log.timestamp}</TableCell>
                                    <TableCell>{log.user}</TableCell>
                                    <TableCell className="font-medium">{log.action}</TableCell>
                                    <TableCell>{log.details}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    );
}
