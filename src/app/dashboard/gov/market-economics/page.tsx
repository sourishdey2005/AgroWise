
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/shared/stat-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Banknote, FileCheck, DollarSign, AlertTriangle, TrendingUp, HandCoins, Landmark } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const priceComparisonData = [
  { crop: 'Wheat', msp: 2275, mandi: 2350 },
  { crop: 'Paddy', msp: 2183, mandi: 2250 },
  { crop: 'Mustard', msp: 5650, mandi: 5500 },
  { crop: 'Soybean', msp: 4600, mandi: 4750 },
];

const subsidyData = [
    { name: 'Fertilizer Subsidy', utilization: 85 },
    { name: 'Seed Subsidy', utilization: 70 },
    { name: 'Credit Subsidy (Interest)', utilization: 90 },
];

const incomeDistribution = [
    { range: '< 1 Lakh', farmers: 35, fill: '#ef4444' },
    { range: '1-3 Lakhs', farmers: 45, fill: '#f59e0b' },
    { range: '3-5 Lakhs', farmers: 15, fill: '#22c55e' },
    { range: '> 5 Lakhs', farmers: 5, fill: '#3b82f6' },
];

const loanDisbursalData = [
    { bank: 'State Bank of India', target: 500, disbursed: 450 },
    { bank: 'Punjab National Bank', target: 400, disbursed: 380 },
    { bank: 'Bank of Baroda', target: 350, disbursed: 320 },
    { bank: 'HDFC Bank', target: 200, disbursed: 210 },
];


export default function MarketEconomicsPage() {

    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Market &amp; Economic Analytics</h1>
                <p className="text-muted-foreground">Monitor market prices, subsidies, and economic indicators.</p>
            </div>

             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Subsidy Disbursed" value="₹1.2 Lakh Cr" icon={<HandCoins className="h-6 w-6 text-muted-foreground" />} description="Current fiscal year" />
                <StatCard title="Avg. Farmer Income" value="₹10,218" icon={<DollarSign className="h-6 w-6 text-muted-foreground" />} description="Monthly (NSSO)" />
                <StatCard title="Agri-Loan Disbursal" value="₹18 Lakh Cr" icon={<Landmark className="h-6 w-6 text-muted-foreground" />} description="Annual Target" />
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Black-Market Risk</AlertTitle>
                    <AlertDescription>
                        High risk for Urea in border districts of Punjab.
                    </AlertDescription>
                </Alert>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>MSP vs. Mandi Price Comparison</CardTitle>
                    <CardDescription>Comparing Minimum Support Price with current average Mandi price (₹/Quintal).</CardDescription>
                </CardHeader>
                <CardContent>
                     <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={priceComparisonData}>
                            <XAxis dataKey="crop" />
                            <YAxis unit="₹" />
                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} cursor={{fill: 'hsl(var(--muted))'}} />
                            <Legend />
                            <Bar dataKey="msp" name="MSP" fill="hsl(var(--secondary))" radius={4} />
                            <Bar dataKey="mandi" name="Mandi Price" fill="hsl(var(--primary))" radius={4} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Subsidy Utilization Analytics</CardTitle>
                        <CardDescription>Percentage of allocated budget utilized.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         {subsidyData.map(item => (
                            <div key={item.name}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-semibold">{item.name}</span>
                                    <span className="text-muted-foreground">{item.utilization}% Utilized</span>
                                </div>
                                <Progress value={item.utilization} />
                            </div>
                         ))}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Market Price Volatility Heatmap</CardTitle>
                        <CardDescription>Mock visualization of price volatility.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-4 grid-rows-3 gap-2 p-2 rounded-md bg-secondary/50">
                            {['Onion', 'High', 'Tomato', 'Medium', 'Potato', 'Low', 'Wheat', 'Low'].map((text, i) => (
                                <div key={i} className={`p-2 rounded-md text-center text-sm ${
                                    i % 2 === 1 ? (text==='High' ? 'bg-red-200/80 text-red-900' : text==='Medium' ? 'bg-amber-200/80 text-amber-900' : 'bg-green-200/80 text-green-900') : 'font-medium'
                                }`}>
                                    {text}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Farmer Annual Income Distribution</CardTitle>
                        <CardDescription>Based on sample data.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={incomeDistribution} layout="vertical">
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="range" width={80} fontSize={12} />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} formatter={(value) => `${value}k Farmers`} />
                                <Bar dataKey="farmers" name="Number of Farmers" background={{ fill: 'hsl(var(--secondary))' }} radius={4}>
                                    {incomeDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Loan Disbursal Coordination View</CardTitle>
                        <CardDescription>Target vs. Disbursed (in Crores) by major banks.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Bank</TableHead>
                                    <TableHead>Target</TableHead>
                                    <TableHead>Disbursed</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loanDisbursalData.map(item => (
                                    <TableRow key={item.bank}>
                                        <TableCell>{item.bank}</TableCell>
                                        <TableCell>₹{item.target} Cr</TableCell>
                                        <TableCell>₹{item.disbursed} Cr</TableCell>
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
