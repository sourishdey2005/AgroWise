
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FileText, Percent, BarChart2, Bell, AlertTriangle, ShieldCheck, Scale, FileWarning, Landmark, Banknote } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const commissionData = [
    { region: 'Pune', crop: 'Onion', amount: 12500 },
    { region: 'Nashik', crop: 'Grapes', amount: 28000 },
    { region: 'Satara', crop: 'Sugarcane', amount: 18200 },
];

const creditScores = [
    { entity: 'Farmer A', score: 750, type: 'Farmer' },
    { entity: 'Buyer X', score: 680, type: 'Buyer' },
    { entity: 'Farmer B', score: 810, type: 'Farmer' },
];

export default function FinancePage() {
    const { toast } = useToast();

    const handleGenerateInvoices = () => {
        toast({
            title: "Invoices Generated",
            description: "25 invoices have been created and sent (mock).",
        });
    };

    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Finance, Ops & Compliance</h1>
                <p className="text-muted-foreground">Tools for managing the business side of your operations.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><FileText /> GST & Tax Score</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center">
                        <div className="relative h-24 w-24">
                            <svg className="h-full w-full" viewBox="0 0 36 36">
                                <path className="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3.5" />
                                <path className="text-primary" strokeDasharray="92, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3.5" strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-3xl font-bold">92%</span>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">All filings are up to date.</p>
                    </CardContent>
                </Card>
                <Card>
                     <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><BarChart2 /> Cashflow Forecast</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-2xl font-bold text-green-600">+₹85,000</p>
                        <p className="text-xs text-muted-foreground">Predicted net inflow next 7 days.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Banknote/> Settlement Delay</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-3xl font-bold">12%</p>
                        <p className="text-xs text-muted-foreground">Likelihood for Buyer Y.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Scale /> Profit-Risk Ratio</CardTitle>
                    </CardHeader>
                     <CardContent className="text-center">
                        <p className="text-3xl font-bold">3.2 : 1</p>
                        <p className="text-xs text-muted-foreground">For Onion trade to Karnataka.</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Percent /> Commission Analyzer Pro</CardTitle>
                    <CardDescription>Breakdown of commissions earned per region and crop.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow><TableHead>Region</TableHead><TableHead>Crop</TableHead><TableHead className="text-right">Commission (₹)</TableHead></TableRow>
                        </TableHeader>
                        <TableBody>
                            {commissionData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.region}</TableCell>
                                    <TableCell>{item.crop}</TableCell>
                                    <TableCell className="text-right font-medium">{item.amount.toLocaleString('en-IN')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><ShieldCheck /> Trade Credit Scoreboard</CardTitle></CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow><TableHead>Entity</TableHead><TableHead>Type</TableHead><TableHead className="text-right">Score</TableHead></TableRow>
                            </TableHeader>
                            <TableBody>
                                {creditScores.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.entity}</TableCell>
                                        <TableCell>{item.type}</TableCell>
                                        <TableCell className="text-right"><Badge variant={item.score > 700 ? 'secondary' : 'outline'}>{item.score}</Badge></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><Landmark /> Bulk Invoice Generator</CardTitle></CardHeader>
                    <CardContent className="flex flex-col items-center justify-center text-center">
                        <p className="text-muted-foreground">Generate invoices for all trades with Buyer Z for the past week.</p>
                        <Button className="mt-4" onClick={handleGenerateInvoices}>Generate 25 Invoices</Button>
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
                 <Card>
                    <CardHeader><CardTitle className="text-sm font-medium flex items-center gap-2"><FileWarning/> Trade Documents</CardTitle></CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <p className="flex justify-between"><span>E-Way Bills:</span> <Badge variant="secondary">All Cleared</Badge></p>
                        <p className="flex justify-between"><span>Mandi Slips:</span> <Badge variant="secondary">All Cleared</Badge></p>
                        <p className="flex justify-between"><span>GST Invoices:</span> <Badge variant="destructive">2 Pending</Badge></p>
                    </CardContent>
                </Card>
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>High-Risk Buyer Alert</AlertTitle>
                    <AlertDescription>
                        Buyer Corp has been flagged for consistent payment delays. Proceed with caution.
                    </AlertDescription>
                </Alert>
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Expense Leakage Detected</AlertTitle>
                    <AlertDescription>
                       Unusually high transport costs on the Pune-Mumbai route. Review logs.
                    </AlertDescription>
                </Alert>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Pending Payments Heatbox</CardTitle>
                    <CardDescription>Color-coded representation of outstanding dues from different regions.</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-4 justify-around p-8 bg-secondary/30 rounded-lg">
                    <div className="text-center p-4 rounded-lg bg-red-200/50">
                        <p className="font-bold">North Region</p>
                        <p className="text-xl font-bold text-red-700">₹2,50,000</p>
                        <p className="text-xs text-red-600">{'>'}60 days</p>
                    </div>
                     <div className="text-center p-4 rounded-lg bg-amber-200/50">
                        <p className="font-bold">West Region</p>
                        <p className="text-xl font-bold text-amber-700">₹1,20,000</p>
                        <p className="text-xs text-amber-600">30-60 days</p>
                    </div>
                     <div className="text-center p-4 rounded-lg bg-green-200/50">
                        <p className="font-bold">South Region</p>
                        <p className="text-xl font-bold text-green-700">₹45,000</p>
                        <p className="text-xs text-green-600">{'<'}30 days</p>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
