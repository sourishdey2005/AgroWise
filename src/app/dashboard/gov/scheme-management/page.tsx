
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/shared/stat-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { BookCopy, TrendingUp, Users, Target, CircleDollarSign, Coins, Map } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import schemeData from '@/data/schemes.json';
import farmerData from '@/data/farmers.json';

const schemeOutcomes = [
  { name: 'Before PM-KISAN', income: 8500 },
  { name: 'After PM-KISAN', income: 9200 },
];

const eligibleFarmers = farmerData.farmers.slice(0, 4);

const fundData = {
    allocated: 50000,
    utilized: 38000
};

const disbursementData = [
    { scheme: 'PM-KISAN', status: 95 },
    { scheme: 'PMFBY', status: 80 },
    { scheme: 'KCC', status: 88 },
];

export default function SchemeManagementPage() {

    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Scheme Management & Analytics</h1>
                <p className="text-muted-foreground">Manage schemes, track outcomes, and monitor fund utilization.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Schemes" value={schemeData.schemes.length.toString()} icon={<BookCopy className="h-6 w-6 text-muted-foreground" />} description="Active nationwide" />
                <StatCard title="Total Beneficiaries" value="11.8 Cr" icon={<Users className="h-6 w-6 text-muted-foreground" />} description="Farmers enrolled" />
                <StatCard title="Total Funds Allocated" value="₹5.5 Lakh Cr" icon={<CircleDollarSign className="h-6 w-6 text-muted-foreground" />} description="Current fiscal year" />
                <StatCard title="Overall Utilization" value="82%" icon={<Target className="h-6 w-6 text-muted-foreground" />} description="Funds utilized vs. allocated" />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Scheme Management Panel</CardTitle>
                        <CardDescription>View and manage active government schemes.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Scheme</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {schemeData.schemes.map(scheme => (
                                    <TableRow key={scheme.id}>
                                        <TableCell className="font-medium">{scheme.title}</TableCell>
                                        <TableCell><Badge variant="secondary">Active</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">Manage</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><TrendingUp/> Scheme Outcome Tracker</CardTitle>
                        <CardDescription>Impact of PM-KISAN on average monthly farmer income.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={schemeOutcomes}>
                                <XAxis dataKey="name" />
                                <YAxis unit="₹" />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
                                <Bar dataKey="income" name="Avg. Income" fill="hsl(var(--primary))" radius={4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Eligible Farmers List (for PMFBY)</CardTitle>
                    <CardDescription>A sample list of farmers eligible based on their profile.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Farmer Name</TableHead>
                                <TableHead>Region</TableHead>
                                <TableHead>Profile Score</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {eligibleFarmers.map(farmer => (
                                <TableRow key={farmer.id}>
                                    <TableCell>{farmer.name}</TableCell>
                                    <TableCell>{farmer.region}</TableCell>
                                    <TableCell>{farmer.profile_score}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Coins/> Subsidy Disbursement Tracker</CardTitle>
                        <CardDescription>Real-time status of direct benefit transfers.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {disbursementData.map(item => (
                             <div key={item.scheme}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-semibold">{item.scheme}</span>
                                    <span className="text-muted-foreground">{item.status}% Complete</span>
                                </div>
                                <Progress value={item.status} />
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Fund Allocation Dashboard</CardTitle>
                        <CardDescription>Budget allocated vs. utilized for a specific scheme.</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                         <p className="text-4xl font-bold">₹{fundData.utilized.toLocaleString()}</p>
                         <p className="text-muted-foreground">Utilized out of ₹{fundData.allocated.toLocaleString()} Allocated</p>
                         <Progress value={(fundData.utilized/fundData.allocated) * 100} className="mt-4" />
                    </CardContent>
                </Card>
            </div>
            
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Map/> Benefit Utilization Map</CardTitle>
                    <CardDescription>Mock visualization showing where scheme benefits are being most utilized.</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="grid grid-cols-4 grid-rows-3 gap-1 bg-secondary/50 p-2 rounded-md aspect-video">
                        {['bg-green-700', 'bg-green-600', 'bg-green-700', 'bg-red-400', 'bg-green-500', 'bg-amber-400', 'bg-red-500', 'bg-green-800', 'bg-green-600', 'bg-amber-500', 'bg-green-700', 'bg-green-600'].map((color, i) => (
                             <div key={i} className={`rounded-sm ${color}/80`}></div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
