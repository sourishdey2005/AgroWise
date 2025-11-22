
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/shared/stat-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, BarChart, LineChart, PieChart, Pie, Cell, Tooltip, Legend, Bar, Line, XAxis, YAxis, CartesianGrid, Area, AreaChart } from 'recharts';
import { Landmark, Banknote, FileCheck, FileX, BarChart as BarChartIcon, TrendingUp, Users, Award, Clock, ArrowRightLeft, Computer, UserCheck, Megaphone, Repeat, Star, AreaChart as AreaChartIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';


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
    { branch: 'Pune Main', disbursed: 12000000, npa: 3.8, tat: 4 },
    { branch: 'Nashik Agri-Branch', disbursed: 9500000, npa: 4.5, tat: 6 },
    { branch: 'Nagpur Central', disbursed: 10500000, npa: 4.1, tat: 5 },
    { branch: 'Mumbai Hub', disbursed: 15000000, npa: 2.9, tat: 3 },
];

const topRevenueCrops = [
    { name: 'Sugarcane', revenue: 12.5 },
    { name: 'Cotton', revenue: 9.8 },
    { name: 'Grapes', revenue: 8.2 },
    { name: 'Wheat', revenue: 7.5 },
    { name: 'Soybean', revenue: 6.9 },
];

const topFarmers = [
    { rank: 1, name: 'Sita Devi', score: 95 },
    { rank: 2, name: 'Amit Patel', score: 92 },
    { rank: 3, name: 'Kavita Reddy', score: 88 },
];

const applicationSourceData = [
    { name: 'Digital', value: 65, fill: 'hsl(var(--primary))' },
    { name: 'Agent', value: 35, fill: 'hsl(var(--secondary))' },
];

const productProfitabilityData = [
    { name: 'KCC', profit: 4.2 },
    { name: 'Crop Loan', profit: 5.8 },
    { name: 'Machinery', profit: 3.1 },
    { name: 'Livestock', profit: 2.5 },
];

const campaignImpactData = [
    { week: 'W-4', apps: 45 }, { week: 'W-3', apps: 48 }, { week: 'W-2', apps: 50 },
    { week: 'Campaign', apps: 85 },
    { week: 'W+1', apps: 75 }, { week: 'W+2', apps: 68 }, { week: 'W+3', apps: 65 },
];

const pipelineForecastData = [
    { month: 'Jul', actual: 480, forecast: 490 },
    { month: 'Aug', forecast: 520 },
    { month: 'Sep', forecast: 550 },
];


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function PortfolioPerformancePage() {

    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Portfolio & Performance</h1>
                <p className="text-muted-foreground">Analyze loan portfolio metrics, growth strategies, and branch performance.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Portfolio" value={`₹${(portfolioOverview.totalValue / 10000000).toFixed(2)} Cr`} icon={<Landmark className="h-6 w-6 text-muted-foreground" />} description="Total value of all active loans" />
                <StatCard title="Active Loans" value={portfolioOverview.activeLoans.toString()} icon={<FileCheck className="h-6 w-6 text-muted-foreground" />} description="Total number of loan accounts" />
                <StatCard title="Avg. Loan Size" value={`₹${(portfolioOverview.avgLoanSize / 100000).toFixed(2)} Lakh`} icon={<Banknote className="h-6 w-6 text-muted-foreground" />} description="Average disbursed loan amount" />
                <StatCard title="NPA Percentage" value={`${portfolioOverview.npaPercentage}%`} icon={<TrendingUp className="h-6 w-6 text-muted-foreground" />} description="Non-Performing Assets ratio" />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Real-time Loan Risk Segmentation</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-6 text-center">
                    <div className="p-4 bg-green-100/60 dark:bg-green-900/30 rounded-lg">
                        <p className="text-sm font-medium text-green-800 dark:text-green-300">Low Risk</p>
                        <p className="text-3xl font-bold text-green-600 dark:text-green-400">280 <span className="text-lg">Loans</span></p>
                    </div>
                     <div className="p-4 bg-amber-100/60 dark:bg-amber-900/30 rounded-lg">
                        <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Medium Risk</p>
                        <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">55 <span className="text-lg">Loans</span></p>
                    </div>
                     <div className="p-4 bg-red-100/60 dark:bg-red-900/30 rounded-lg">
                        <p className="text-sm font-medium text-red-800 dark:text-red-300">High Risk</p>
                        <p className="text-3xl font-bold text-red-600 dark:text-red-400">15 <span className="text-lg">Loans</span></p>
                    </div>
                </CardContent>
            </Card>

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

            <div className="grid gap-6 md:grid-cols-3">
                 <Card>
                    <CardHeader>
                        <CardTitle>Top Revenue Crops</CardTitle>
                        <CardDescription>Crops contributing most to portfolio revenue.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={topRevenueCrops} layout="vertical" margin={{left:10, right: 10}}>
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} width={80}/>
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} formatter={(value) => `${value} Cr`} />
                                <Bar dataKey="revenue" name="Revenue" fill="hsl(var(--primary))" radius={4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Top Performing Farmers</CardTitle>
                        <CardDescription>Based on repayment and profitability.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader><TableRow><TableHead>Rank</TableHead><TableHead>Farmer</TableHead><TableHead className="text-right">Score</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {topFarmers.map(f => (
                                    <TableRow key={f.rank}>
                                        <TableCell>{f.rank}</TableCell>
                                        <TableCell>{f.name}</TableCell>
                                        <TableCell className="text-right"><Badge>{f.score}</Badge></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
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
            
            <div className="grid gap-6 md:grid-cols-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Aging Report for Outstanding Loans</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1"><span>0-30 days</span><span>₹ 1.2 Cr</span></div>
                                <Progress value={60} />
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1"><span>31-60 days</span><span>₹ 0.5 Cr</span></div>
                                <Progress value={25} />
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1"><span>61-90 days</span><span>₹ 0.2 Cr</span></div>
                                <Progress value={10} />
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1 text-destructive"><span>90+ days (NPA)</span><span>₹ 0.1 Cr</span></div>
                                <Progress value={5} className="[&>*]:bg-destructive" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Repayment Behavior Clustering</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-2 rounded-lg bg-green-100/60 dark:bg-green-900/30">
                            <UserCheck className="w-8 h-8 mx-auto text-green-600"/>
                            <p className="font-semibold mt-2">Early Payers</p>
                            <p className="text-2xl font-bold">25%</p>
                        </div>
                         <div className="p-2 rounded-lg bg-blue-100/60 dark:bg-blue-900/30">
                            <UserCheck className="w-8 h-8 mx-auto text-blue-600"/>
                            <p className="font-semibold mt-2">On-Time Payers</p>
                            <p className="text-2xl font-bold">60%</p>
                        </div>
                         <div className="p-2 rounded-lg bg-red-100/60 dark:bg-red-900/30">
                            <UserCheck className="w-8 h-8 mx-auto text-red-600"/>
                            <p className="font-semibold mt-2">Defaulters</p>
                            <p className="text-2xl font-bold">15%</p>
                        </div>
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
                                <TableHead>Approval TAT (days)</TableHead>
                                <TableHead className="text-right">NPA (%)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {branchPerformance.map(branch => (
                                <TableRow key={branch.branch}>
                                    <TableCell className="font-medium">{branch.branch}</TableCell>
                                    <TableCell>₹{branch.disbursed.toLocaleString('en-IN')}</TableCell>
                                    <TableCell>{branch.tat}</TableCell>
                                    <TableCell className="text-right">{branch.npa.toFixed(1)}%</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
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
                        <CardTitle>Digital vs. Agent Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie data={applicationSourceData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={80} paddingAngle={5}>
                                     {applicationSourceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} formatter={(value) => `${value}%`} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><AreaChartIcon />Loan Pipeline Predictor</CardTitle>
                        <CardDescription>Forecasted loan application volume.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <AreaChart data={pipelineForecastData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
                                <Legend />
                                <Area type="monotone" dataKey="actual" name="Actual" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.2)" />
                                <Area type="monotone" dataKey="forecast" name="Forecast" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2) / 0.2)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Megaphone />Campaign Impact</CardTitle>
                        <CardDescription>Loan applications before and after the KCC campaign.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={campaignImpactData}>
                                <XAxis dataKey="week" />
                                <YAxis />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
                                <Bar dataKey="apps" name="Applications" fill="hsl(var(--primary))" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><TrendingUp />Product-wise Profitability</CardTitle>
                        <CardDescription>Profit margin (in %) by loan type.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                             <BarChart data={productProfitabilityData}>
                                <XAxis dataKey="name" />
                                <YAxis unit="%" />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} formatter={(value) => `${value}%`} />
                                <Bar dataKey="profit" name="Profit Margin" fill="hsl(var(--primary))" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <Alert>
                    <Repeat className="h-4 w-4" />
                    <AlertTitle>Restructuring Alert</AlertTitle>
                    <AlertDescription>
                        Drought in Vidarbha may require restructuring for 25 crop loans.
                    </AlertDescription>
                </Alert>
                <StatCard title="Farmer Interaction Score" value="4.7/5" icon={<Star className="h-6 w-6 text-muted-foreground" />} description="Overall customer satisfaction" />
                <StatCard title="Auto-Underwriting Speed" value="+35%" icon={<Computer className="h-6 w-6 text-muted-foreground" />} description="Faster than manual process" />
                <StatCard title="Approval TAT" value="4.2 Days" icon={<Clock className="h-6 w-6 text-muted-foreground" />} description="Average loan approval time" />
            </div>

        </div>
    );
}
