
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResponsiveContainer, BarChart, LineChart, Tooltip, Legend, Bar, Line, XAxis, YAxis, CartesianGrid, ScatterChart, Scatter, PieChart, Pie, Cell } from 'recharts';
import { ClipboardList, TrendingUp, BarChart2, Shield, Leaf, AlertTriangle, User, GitCompareArrows } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const incomeTrendData = [
  { year: 2020, income: 350000, loan: 50000 },
  { year: 2021, income: 380000, loan: 75000 },
  { year: 2022, income: 320000, loan: 60000 },
  { year: 2023, income: 410000, loan: 100000 },
  { year: 2024, income: 450000, loan: 120000 },
];

const profitabilityData = [
  { crop: 'Sugarcane', profitability: 8.5, loanDemand: 7.8 },
  { crop: 'Cotton', profitability: 7.2, loanDemand: 6.5 },
  { crop: 'Soybean', profitability: 6.8, loanDemand: 8.2 },
  { crop: 'Wheat', profitability: 6.5, loanDemand: 5.5 },
];

const farmSizeData = [
    { size: '<2 Ha', score: 680, farmers: 120 },
    { size: '2-5 Ha', score: 720, farmers: 250 },
    { size: '5-10 Ha', score: 760, farmers: 80 },
    { size: '>10 Ha', score: 810, farmers: 30 },
];

const incomeStreamData = [
    { name: 'Crop Sales', value: 70, fill: 'hsl(var(--primary))' },
    { name: 'Dairy', value: 20, fill: 'hsl(var(--chart-2))' },
    { name: 'Livestock', value: 10, fill: 'hsl(var(--chart-3))' },
];

const yieldLoanData = [
    { loan: 50000, yield: 18 },
    { loan: 100000, yield: 35 },
    { loan: 150000, yield: 50 },
    { loan: 80000, yield: 30 },
    { loan: 200000, yield: 25 }, // Potential anomaly
];

export default function FarmerFinancialInsightsPage() {
  const [resilienceScore, setResilienceScore] = useState(82);
  const [diversificationScore, setDiversificationScore] = useState(65);

  return (
    <div className="grid gap-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Farmer Financial Insights</h1>
        <p className="text-muted-foreground">Analyze farmer financial health, demographics, and resilience.</p>
      </div>

       <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2"><TrendingUp/> Historical Repayment & Income</CardTitle>
              <CardDescription>Income and loan history for a selected farmer over 5 years.</CardDescription>
            </div>
            <Select>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Select Farmer..."/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Ramesh Kumar (ID: 1)</SelectItem>
                <SelectItem value="2">Sita Devi (ID: 2)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={incomeTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis yAxisId="left" tickFormatter={(value) => `₹${value / 100000}L`} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `₹${value / 1000}k`} />
              <Tooltip formatter={(value: number, name: string) => [`₹${value.toLocaleString('en-IN')}`, name]} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="income" name="Annual Income" stroke="hsl(var(--primary))" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="loan" name="Loan Amount" stroke="hsl(var(--chart-2))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BarChart2/> Crop Profitability vs Loan Demand</CardTitle>
            <CardDescription>Comparing regional profitability with loan demand.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={profitabilityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="crop" />
                <YAxis />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }}/>
                <Legend />
                <Bar dataKey="profitability" name="Profitability Index" fill="hsl(var(--primary) / 0.7)" />
                <Bar dataKey="loanDemand" name="Loan Demand Index" fill="hsl(var(--chart-2))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><User/> Demographics: Farm Size vs Credit Score</CardTitle>
            <CardDescription>Average credit score and farmer count by farm size.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={farmSizeData}>
                 <CartesianGrid strokeDasharray="3 3" />
                 <XAxis dataKey="size" />
                 <YAxis yAxisId="left" orientation="left" domain={[600, 850]}/>
                 <YAxis yAxisId="right" orientation="right" />
                 <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }}/>
                 <Legend />
                 <Bar yAxisId="left" dataKey="score" name="Avg. Credit Score" fill="hsl(var(--primary))" />
                 <Bar yAxisId="right" dataKey="farmers" name="# of Farmers" fill="hsl(var(--secondary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Shield/> Farmer Resilience Score</CardTitle>
                  <CardDescription>Ability to withstand financial shocks.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                  <div className="relative h-32 w-32">
                      <svg className="h-full w-full" viewBox="0 0 36 36">
                          <path className="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3.5" />
                          <path className="text-green-500" strokeDasharray={`${resilienceScore}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3.5" strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-4xl font-bold text-green-500">{resilienceScore}</span>
                      </div>
                  </div>
                  <p className="text-center mt-4 text-xs text-muted-foreground">Based on income diversity, yield stability, and credit history.</p>
              </CardContent>
          </Card>
           <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Leaf/> Farm Diversification Score</CardTitle>
                  <CardDescription>Measures variety in crops and income streams.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                   <div className="relative h-32 w-32">
                      <svg className="h-full w-full" viewBox="0 0 36 36">
                          <path className="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3.5" />
                          <path className="text-amber-500" strokeDasharray={`${diversificationScore}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3.5" strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-4xl font-bold text-amber-500">{diversificationScore}</span>
                      </div>
                  </div>
                   <p className="text-center mt-4 text-xs text-muted-foreground">Low score indicates dependency on a single crop.</p>
              </CardContent>
          </Card>
          <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">Income Stream Breakdown</CardTitle>
                <CardDescription>Source of income for Ramesh Kumar.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie data={incomeStreamData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>
                             {incomeStreamData.map((entry, index) => (
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

       <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><GitCompareArrows /> Yield vs. Loan Size Correlation</CardTitle>
                    <CardDescription>Identifies potential mismatches or fraud.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <ScatterChart>
                            <CartesianGrid />
                            <XAxis type="number" dataKey="loan" name="Loan Amount" unit="k" tickFormatter={(v) => `${v/1000}`} />
                            <YAxis type="number" dataKey="yield" name="Yield" unit=" Qtl" />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
                            <Scatter name="Loan vs. Yield" data={yieldLoanData} fill="hsl(var(--primary))" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><AlertTriangle /> AI-Based Fraud Detection Alerts</CardTitle>
                    <CardDescription>Highlights unusual account behavior.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Multiple Applications Detected</AlertTitle>
                        <AlertDescription>
                            Farmer ID 14 (Manoj Tiwari) has submitted 3 loan applications in the last 60 days. Manual review required.
                        </AlertDescription>
                    </Alert>
                     <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Unusual Pattern</AlertTitle>
                        <AlertDescription>
                           Loan request for 2x the regional average for a small landholding (Farmer ID 4).
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
