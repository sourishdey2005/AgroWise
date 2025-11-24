
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/shared/stat-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import { BookCopy, TrendingUp, Users, Target, CircleDollarSign, Coins, Map } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useData } from '@/hooks/use-data';

const schemeOutcomes = [
  { name: '2021', income: 8500 },
  { name: '2022', income: 9200 },
  { name: '2023', income: 9800 },
  { name: '2024', income: 10500 },
];

const participationData = [
  { year: '2021', participants: 8.5 },
  { year: '2022', participants: 9.8 },
  { year: '2023', participants: 11.2 },
  { year: '2024', participants: 11.8 },
];

const fundData = {
    allocated: 50000,
    utilized: 38000
};

const disbursementData = [
    { scheme: 'PM-KISAN', status: 95 },
    { scheme: 'PMFBY', status: 80 },
    { scheme: 'KCC', status: 88 },
];

const benefitUtilizationData = [
    { name: 'Maharashtra', value: 400 },
    { name: 'Punjab', value: 300 },
    { name: 'Uttar Pradesh', value: 250 },
    { name: 'Karnataka', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


export default function SchemeManagementPage() {
    const { data, loading } = useData();

    if (loading || !data) return null;
    
    const { schemes, farmers } = data;
    const eligibleFarmers = farmers.slice(0, 4);

    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Scheme Management & Analytics</h1>
                <p className="text-muted-foreground">Manage schemes, track outcomes, and monitor fund utilization.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Schemes" value={schemes.length.toString()} icon={<BookCopy className="h-6 w-6 text-muted-foreground" />} description="Active nationwide" />
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
                                {schemes.map(scheme => (
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
                        <CardDescription>Impact of PM-KISAN on farmer income & participation.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-semibold text-center mb-2">Avg. Monthly Income (₹)</p>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={schemeOutcomes}>
                                    <XAxis dataKey="name" fontSize={12} />
                                    <YAxis unit="₹" fontSize={10} domain={[8000, 11000]} />
                                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
                                    <Bar dataKey="income" name="Avg. Income" fill="hsl(var(--primary))" radius={4} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-center mb-2">Scheme Participants (Cr)</p>
                             <ResponsiveContainer width="100%" height={200}>
                                <LineChart data={participationData}>
                                    <XAxis dataKey="year" fontSize={12} />
                                    <YAxis unit=" Cr" fontSize={10} domain={[8, 12]}/>
                                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
                                    <Line type="monotone" dataKey="participants" name="Participants" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
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
                         <p className="text-4xl font-bold">₹{fundData.utilized.toLocaleString()} Cr</p>
                         <p className="text-muted-foreground">Utilized out of ₹{fundData.allocated.toLocaleString()} Cr Allocated</p>
                         <Progress value={(fundData.utilized/fundData.allocated) * 100} className="mt-4" />
                    </CardContent>
                </Card>
            </div>
            
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Map/> Benefit Utilization by State</CardTitle>
                    <CardDescription>Visualization showing where scheme benefits are being most utilized.</CardDescription>
                </CardHeader>
                <CardContent>
                     <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={benefitUtilizationData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {benefitUtilizationData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }}/>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
