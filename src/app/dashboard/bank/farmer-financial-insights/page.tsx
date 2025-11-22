
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResponsiveContainer, BarChart, LineChart, Tooltip, Legend, Bar, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ClipboardList, TrendingUp, BarChart2, Shield } from 'lucide-react';

const incomeTrendData = [
  { year: 2020, income: 350000 },
  { year: 2021, income: 380000 },
  { year: 2022, income: 320000 },
  { year: 2023, income: 410000 },
  { year: 2024, income: 450000 },
];

const profitabilityData = [
  { crop: 'Sugarcane', profitability: 8.5, loanDemand: 7.8 },
  { crop: 'Cotton', profitability: 7.2, loanDemand: 6.5 },
  { crop: 'Soybean', profitability: 6.8, loanDemand: 8.2 },
  { crop: 'Wheat', profitability: 6.5, loanDemand: 5.5 },
];

const farmSizeData = [
    { size: '<2 Ha', score: 680 },
    { size: '2-5 Ha', score: 720 },
    { size: '5-10 Ha', score: 760 },
    { size: '>10 Ha', score: 810 },
];

export default function FarmerFinancialInsightsPage() {
  const [resilienceScore, setResilienceScore] = useState(82);

  return (
    <div className="grid gap-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Farmer Financial Insights</h1>
        <p className="text-muted-foreground">Analyze farmer financial health and resilience.</p>
      </div>

       <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2"><TrendingUp/> Farmer Income Trend</CardTitle>
              <CardDescription>Income for selected farmer over the last 5 years.</CardDescription>
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
              <YAxis tickFormatter={(value) => `₹${value / 100000}L`} />
              <Tooltip formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`} />
              <Legend />
              <Line type="monotone" dataKey="income" name="Annual Income" stroke="hsl(var(--primary))" strokeWidth={2} />
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
            <CardTitle className="flex items-center gap-2"><ClipboardList/> Farm Size vs Credit Score</CardTitle>
            <CardDescription>Average credit score by farm size.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={farmSizeData}>
                 <CartesianGrid strokeDasharray="3 3" />
                 <XAxis dataKey="size" />
                 <YAxis domain={[600, 850]}/>
                 <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }}/>
                 <Bar dataKey="score" name="Avg. Credit Score" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

       <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Shield/> Farmer Resilience Score</CardTitle>
                <CardDescription>A measure of a farmer's ability to withstand financial shocks.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
                 <div className="relative h-32 w-32">
                    <svg className="h-full w-full" viewBox="0 0 36 36">
                        <path
                            className="text-secondary"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            strokeWidth="3.5"
                        />
                        <path
                            className="text-green-500"
                            strokeDasharray={`${resilienceScore}, 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-green-500">{resilienceScore}</span>
                    </div>
                </div>
                 <p className="text-center mt-4 text-muted-foreground">
                    Calculated based on income diversity, historical yield stability, and credit history.
                </p>
            </CardContent>
        </Card>

    </div>
  );
}
