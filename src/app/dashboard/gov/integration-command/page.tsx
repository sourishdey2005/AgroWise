
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, Server, Database, MessageSquare, ListTree, Users } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const apiStatusData = [
  { name: 'IMD Weather API', status: 'Connected' },
  { name: 'ISRO Satellite Imagery', status: 'Connected' },
  { name: 'PM-KISAN Database', status: 'Connected' },
  { name: 'AgriStack', status: 'Connected' },
  { name: 'Mandi Prices API', status: 'Intermittent' },
  { name: 'Banking Core API', status: 'Connected' },
  { name: 'Insurance API', status: 'Disconnected' },
];

const grievanceData = [
    { id: 'G-101', category: 'Subsidy', priority: 'High', status: 'Pending' },
    { id: 'G-102', category: 'Insurance Claim', priority: 'High', status: 'In Progress' },
    { id: 'G-103', category: 'Agent Misconduct', priority: 'Medium', status: 'Pending' },
    { id: 'G-104', category: 'Website Issue', priority: 'Low', status: 'Resolved' },
];

export default function IntegrationCommandPage() {

    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Integration & Unified Data Command Center</h1>
                <p className="text-muted-foreground">Monitor data integrations, grievances, and the unified data lake.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Server /> Integrated API Panel</CardTitle>
                    <CardDescription>Status of all integrated data sources.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>API / Data Source</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {apiStatusData.map(api => (
                                <TableRow key={api.name}>
                                    <TableCell className="font-medium">{api.name}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant={
                                            api.status === 'Connected' ? 'secondary' : 
                                            api.status === 'Intermittent' ? 'outline' : 'destructive'
                                        }>
                                            {api.status === 'Connected' && <CheckCircle className="mr-2 h-4 w-4 text-green-500"/>}
                                            {api.status === 'Intermittent' && <Clock className="mr-2 h-4 w-4 text-amber-500"/>}
                                            {api.status === 'Disconnected' && <XCircle className="mr-2 h-4 w-4 text-red-500"/>}
                                            {api.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><MessageSquare /> 360° Citizen Grievance Monitoring</CardTitle>
                    <CardDescription>AI-categorized and prioritized agricultural complaints.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>AI Category</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {grievanceData.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell>
                                        <Badge variant={item.priority === 'High' ? 'destructive' : item.priority === 'Medium' ? 'outline' : 'secondary'}>{item.priority}</Badge>
                                    </TableCell>
                                    <TableCell>{item.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Database /> Unified Agriculture Data Lake Visualizer</CardTitle>
                    <CardDescription>A conceptual model of the integrated data ecosystem.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center p-8 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-8">
                        <div className="flex flex-col gap-2 text-center">
                            <div className="p-3 rounded-lg border bg-card"><Users className="mx-auto"/> <span className="text-xs">Farmer Data</span></div>
                            <div className="p-3 rounded-lg border bg-card"><ListTree className="mx-auto"/> <span className="text-xs">Market Data</span></div>
                            <div className="p-3 rounded-lg border bg-card"><Server className="mx-auto"/> <span className="text-xs">Govt APIs</span></div>
                        </div>
                        <div className="text-4xl font-bold text-primary">&rarr;</div>
                        <div className="p-8 rounded-full border-4 border-dashed border-primary bg-card">
                            <Database className="w-16 h-16 text-primary" />
                        </div>
                         <div className="text-4xl font-bold text-primary">&rarr;</div>
                        <div className="p-6 rounded-lg border bg-card text-center">
                             <span className="font-semibold">Deep Analytics</span>
                             <p className="text-xs text-muted-foreground">AI Models</p>
                        </div>
                    </div>
                    <Alert className="mt-8 max-w-2xl">
                        <AlertTitle>Data Lake Status</AlertTitle>
                        <AlertDescription>All data streams are nominal. Last sync: 2 minutes ago. 1.2 PB processed today.</AlertDescription>
                    </Alert>
                </CardContent>
            </Card>

        </div>
    );
}

