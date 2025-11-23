
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Siren, Shield, Package, Home, UserCheck } from 'lucide-react';

const reliefData = [
  { item: "Food Kits", distributed: 8500, total: 10000, region: "Coastal Odisha" },
  { item: "Seed Packets", distributed: 4500, total: 5000, region: "North Bihar" },
  { item: "Cattle Feed", distributed: 1200, total: 2000, region: "Vidarbha" },
];

const distressReports = [
  { id: "DR-01", farmer: "A. Panda", location: "18.5, 84.8", issue: "Crop submerged", verified: true },
  { id: "DR-02", farmer: "S. Kumar", location: "26.1, 85.3", issue: "House damaged", verified: false },
  { id: "DR-03", farmer: "G. Patel", location: "21.1, 79.0", issue: "Cattle lost", verified: true },
];

export default function DisasterManagementPage() {

    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Disaster Management & Relief</h1>
                <p className="text-muted-foreground">Monitor disaster impact, manage relief operations, and verify distress reports.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Siren/> AI Calamity Loss Estimator</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="text-center">
                            <p className="text-xs text-muted-foreground">Odisha Cyclone "Yaas"</p>
                            <p className="text-3xl font-bold text-destructive">~35% Crop Loss</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-muted-foreground">Bihar Floods</p>
                            <p className="text-2xl font-bold text-destructive">~20% Crop Loss</p>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Home/> Shelter & Evacuation Map</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="aspect-square w-full bg-secondary/50 rounded-md p-2 grid grid-cols-5 grid-rows-5 gap-1">
                             {/* Mocking different resource points */}
                            {Array.from({ length: 25 }).map((_, i) => (
                                <div key={i} className={`rounded-full aspect-square ${
                                    [6, 18, 22].includes(i) ? 'bg-blue-500' : ''
                                } ${
                                    [2, 11, 15, 24].includes(i) ? 'bg-green-500' : ''
                                }`} />
                            ))}
                        </div>
                        <div className="flex justify-around text-xs mt-2">
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"/>Shelter</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"/>Medical Aid</span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Shield/> Crop Insurance Claim Heatmap</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="aspect-square w-full bg-secondary/50 rounded-md p-2 grid grid-cols-5 grid-rows-5 gap-1">
                             {Array.from({ length: 25 }).map((_, i) => (
                                <div key={i} className={`rounded-sm opacity-80 ${
                                    [6, 7, 11, 12, 16].includes(i) ? 'bg-red-600' : 
                                    [0, 1, 5, 10, 15, 20].includes(i) ? 'bg-amber-400' : 'bg-green-400'
                                }`} />
                            ))}
                        </div>
                         <div className="flex justify-around text-xs mt-2">
                            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-red-600"/>High</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-amber-400"/>Medium</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-green-400"/>Low</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Package/> Disaster Relief Distribution Tracker</CardTitle>
                    <CardDescription>Real-time progress of relief distribution in affected areas.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {reliefData.map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-semibold">{item.item} ({item.region})</span>
                                    <span className="text-muted-foreground">{item.distributed.toLocaleString()}/{item.total.toLocaleString()} units</span>
                                </div>
                                <Progress value={(item.distributed / item.total) * 100} />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><UserCheck/> Farmer Distress Reporting & Verification</CardTitle>
                    <CardDescription>Geo-linked distress reports from affected farmers.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Report ID</TableHead>
                                <TableHead>Farmer</TableHead>
                                <TableHead>Location (Lat, Lng)</TableHead>
                                <TableHead>Issue</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {distressReports.map(report => (
                                <TableRow key={report.id}>
                                    <TableCell className="font-mono">{report.id}</TableCell>
                                    <TableCell>{report.farmer}</TableCell>
                                    <TableCell>{report.location}</TableCell>
                                    <TableCell>{report.issue}</TableCell>
                                    <TableCell>
                                        <Badge variant={report.verified ? "secondary" : "outline"}>
                                            {report.verified ? "Verified" : "Pending"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm" disabled={report.verified}>
                                            Verify
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    );
}

