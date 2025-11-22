
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/shared/stat-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, BarChart, LineChart, PieChart, Pie, Cell, Tooltip, Legend, Bar, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Landmark, Banknote, FileCheck, FileX, BarChart as BarChartIcon, TrendingUp } from 'lucide-react';

const portfolioOverview = {
    totalValue: 55000000,
    activeLoans: 350,
    avgLoanSize: 157142,
    npaPercentage: 4.2
};

const sectorDistribution = [
    { name: 'Crop Loans', value: 45 },
    { name: 'Tractor Loans', value: 25 },
    { name: 'Equipment Loans', value: 15 },
    { name: 'Livestock Loans', value: 10 },
    { name: 'Other', value: 5 },
];

const highRiskLoans = [
    { id: 1, farmerName: 'Arjun Singh', amount: 120000, riskScore: 8 },
    { id: 2, farmerName: 'Ravi Verma', amount: 250000, riskScore: 9 },
    { id: 3, farmerName: 'Sunita Patil', amount: 90000, riskScore: 8 },
];

const approvedRejectedData = [
    { name: 'Jan', approved: 20, rejected: 5 },
    { name: 'Feb', approved: 25, rejected: 3 },
    { name: 'Mar', approved: 30, rejected: 7 },
    { name: 'Apr', approved: 28, rejected: 4 },
];

const disbursementData = [
    { month: 'Jan', amount: 3000000 },
    { month: 'Feb', amount: 3800000 },
    { month: 'Mar', amount: 4500000 },
    { month: 'Apr', amount: 4200000 },
    { month: 'May', amount: 5100000 },
    { month: 'Jun', amount: 4800000 },
];

const branchPerformance = [
    { branch: 'Pune Main', disbursed: 12000000, npa: 3.8 },
    { branch: 'Nashik Agri-Branch', disbursed: 9500000, npa: 4.5 },
    { branch: 'Nagpur Central', disbursed: 10500000, npa: 4.1 },
    { branch: 'Mumbai Hub', disbursed: 15000000, npa: 2.9 },
];


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function PortfolioPerformancePage() {

    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Portfolio & Performance</h1>
                <p className="text-muted-foreground">Analyze loan portfolio metrics and branch performance.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Portfolio" value={`₹${(portfolioOverview.totalValue / 10000000).toFixed(2)} Cr`} icon={<Landmark className="h-6 w-6 text-muted-foreground" />} description="Total value of all active loans" />
                <StatCard title="Active Loans" value={portfolioOverview.activeLoans.toString()} icon={<FileCheck className="h-6 w-6 text-muted-foreground" />} description="Total number of loan accounts" />
                <StatCard title="Avg. Loan Size" value={`₹${(portfolioOverview.avgLoanSize / 100000).toFixed(2)} Lakh`} icon={<Banknote className="h-6 w-6 text-muted-foreground" />} description="Average disbursed loan amount" />
                <StatCard title="NPA Percentage" value={`${portfolioOverview.npaPercentage}%`} icon={<TrendingUp className="h-6 w-6 text-muted-foreground" />} description="Non-Performing Assets ratio" />
            </div>

            <div className="grid gap-6 lg:grid-cols-5">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Sector-wise Loan Distribution</CardTitle>
                        <CardDescription>Breakdown of loan portfolio by sector.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={sectorDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                    {sectorDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Monthly Loan Disbursements</CardTitle>
                        <CardDescription>Loan amounts disbursed over the last 6 months.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                             <LineChart data={disbursementData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis tickFormatter={(value) => `₹${value / 100000}L`} />
                                <Tooltip formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`} />
                                <Legend />
                                <Line type="monotone" dataKey="amount" name="Disbursed Amount" stroke="hsl(var(--primary))" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Approved vs. Rejected Loans</CardTitle>
                        <CardDescription>Monthly comparison of application outcomes.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ResponsiveContainer width="100%" height={250}>
                             <BarChart data={approvedRejectedData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="approved" name="Approved" fill="hsl(var(--primary))" />
                                <Bar dataKey="rejected" name="Rejected" fill="hsl(var(--destructive) / 0.5)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>High-Risk Loan Cases</CardTitle>
                        <CardDescription>Loans with a risk score of 8 or higher.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Farmer</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead className="text-right">Risk Score</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {highRiskLoans.map(loan => (
                                    <TableRow key={loan.id}>
                                        <TableCell>{loan.farmerName}</TableCell>
                                        <TableCell>₹{loan.amount.toLocaleString('en-IN')}</TableCell>
                                        <TableCell className="text-right">
                                            <Badge variant="destructive">{loan.riskScore}/10</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Bank Branch Performance</CardTitle>
                    <CardDescription>Comparison of key performance indicators across branches.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Branch</TableHead>
                                <TableHead>Total Disbursed</TableHead>
                                <TableHead className="text-right">NPA (%)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {branchPerformance.map(branch => (
                                <TableRow key={branch.branch}>
                                    <TableCell className="font-medium">{branch.branch}</TableCell>
                                    <TableCell>₹{branch.disbursed.toLocaleString('en-IN')}</TableCell>
                                    <TableCell className="text-right">{branch.npa.toFixed(1)}%</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    );
}
