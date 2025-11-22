
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Percent, BarChart, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const repaymentHistoryData = [
  { month: 'Jan', onTime: 4, delayed: 1 },
  { month: 'Feb', onTime: 5, delayed: 0 },
  { month: 'Mar', onTime: 4, delayed: 1 },
  { month: 'Apr', onTime: 5, delayed: 0 },
  { month: 'May', onTime: 3, delayed: 2 },
];

export default function RepaymentFinancePage() {
    const { toast } = useToast();
    const [loanAmount, setLoanAmount] = useState(100000);
    const [interestRate, setInterestRate] = useState(8.5);
    const [tenure, setTenure] = useState(5);
    const [emi, setEmi] = useState<number | null>(null);
    const [delayRisk, setDelayRisk] = useState(25);
    const [defaultScore, setDefaultScore] = useState(15);

    const calculateEmi = () => {
        if (loanAmount > 0 && interestRate > 0 && tenure > 0) {
            const principal = loanAmount;
            const rate = interestRate / 12 / 100;
            const time = tenure * 12;
            const calculatedEmi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
            setEmi(calculatedEmi);
        } else {
            toast({ variant: 'destructive', title: 'Invalid inputs for EMI calculation.' });
        }
    };
    
    useEffect(() => {
        // Recalculate EMI whenever inputs change
        calculateEmi();
    }, [loanAmount, interestRate, tenure]);
    
     useEffect(() => {
        const interval = setInterval(() => {
            setDelayRisk(r => Math.min(100, Math.max(0, r + Math.random() * 4 - 2)));
            setDefaultScore(s => Math.min(100, Math.max(0, s + Math.random() * 2 - 1)));
        }, 5000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Repayment & Finance Tools</h1>
                <p className="text-muted-foreground">Analyze repayment history and calculate financial metrics.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Calculator /> EMI Calculator</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <div>
                            <label className="text-sm font-medium">Loan Amount (₹{loanAmount.toLocaleString('en-IN')})</label>
                            <Slider value={[loanAmount]} onValueChange={(v) => setLoanAmount(v[0])} max={500000} step={10000} />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Interest Rate ({interestRate.toFixed(1)}%)</label>
                            <Slider value={[interestRate]} onValueChange={(v) => setInterestRate(v[0])} max={15} step={0.1} />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Tenure ({tenure} years)</label>
                            <Slider value={[tenure]} onValueChange={(v) => setTenure(v[0])} max={10} step={1} />
                        </div>
                    </div>
                     <div className="text-center bg-secondary p-8 rounded-lg">
                        <p className="text-muted-foreground">Calculated Monthly EMI</p>
                        {emi !== null ? (
                             <p className="text-5xl font-bold text-primary">₹{emi.toFixed(0).toLocaleString('en-IN')}</p>
                        ) : (
                             <p className="text-2xl font-bold text-muted-foreground">Enter details to calculate</p>
                        )}
                    </div>
                </CardContent>
            </Card>
            
             <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><AlertTriangle/> EMI Delay Risk</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                        <div className="relative h-24 w-24">
                            <svg className="h-full w-full" viewBox="0 0 36 36">
                                <path className="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3.5" />
                                <path className={delayRisk > 50 ? 'text-destructive' : delayRisk > 20 ? 'text-amber-500' : 'text-primary' } strokeDasharray={`${delayRisk}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3.5" strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-3xl font-bold">{Math.round(delayRisk)}%</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Percent/> Default Probability Score</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                         <p className={`text-5xl font-bold ${defaultScore > 30 ? 'text-destructive' : defaultScore > 10 ? 'text-amber-500' : 'text-primary'}`}>{Math.round(defaultScore)}%</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><BarChart/> Farmer Repayment History</CardTitle>
                        <CardDescription>Select a farmer to view history.</CardDescription>
                    </CardHeader>
                     <CardContent>
                         <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Farmer..."/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Ramesh Kumar</SelectItem>
                                <SelectItem value="2">Sita Devi</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>
            </div>


            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">Repayment History Analyzer (Ramesh Kumar)</CardTitle>
                    <CardDescription>On-time vs. delayed payments over the last 5 months.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <RechartsBarChart data={repaymentHistoryData}>
                            <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} cursor={{fill: 'hsl(var(--muted))'}} />
                            <Legend />
                            <Bar dataKey="onTime" name="On-Time" stackId="a" fill="hsl(var(--primary))" radius={[0, 0, 4, 4]} />
                            <Bar dataKey="delayed" name="Delayed" stackId="a" fill="hsl(var(--destructive) / 0.5)" radius={[4, 4, 0, 0]} />
                        </RechartsBarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
