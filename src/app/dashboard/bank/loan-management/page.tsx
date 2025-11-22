
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Calculator, FileText, Link as LinkIcon, BarChart, Banknote } from 'lucide-react';
import { LoanApplication } from "@/lib/types";
import loanData from "@/data/loans.json";

const loans: LoanApplication[] = loanData.applications;

const getStatusVariant = (status: LoanApplication['status']) => {
  switch (status) {
    case 'pending': return 'secondary';
    case 'approved': return 'default';
    case 'rejected': return 'destructive';
  }
};

export default function LoanManagementPage() {
    const [loanAmount, setLoanAmount] = useState(150000);
    const [creditScore, setCreditScore] = useState(720);
    const [eligible, setEligible] = useState<boolean | null>(null);

    const calculateEligibility = () => {
        if (loanAmount <= 200000 && creditScore >= 650) {
            setEligible(true);
        } else {
            setEligible(false);
        }
    };
    
    const riskScore = Math.min(10, Math.max(1, 10 - Math.floor(creditScore / 100)));

    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Loan Application Management</h1>
                <p className="text-muted-foreground">Tools for assessing and managing farmer loan applications.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><BarChart/> Loan Risk Score</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className={`text-5xl font-bold ${riskScore > 7 ? 'text-destructive' : riskScore > 4 ? 'text-amber-500' : 'text-green-600'}`}>{riskScore}<span className="text-xl text-muted-foreground">/10</span></p>
                        <p className="text-xs text-muted-foreground mt-2">Based on credit history & income stability.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Banknote/> Income Stability</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className="text-3xl font-bold">82%</span>
                        <Progress value={82} className="h-2 mt-2" />
                        <p className="text-xs text-muted-foreground mt-2">High stability based on past 3 years.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><FileText/> Collateral Check</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center">
                        <Button variant="outline" asChild>
                            <a href="#" target="_blank" rel="noopener noreferrer"><LinkIcon className="mr-2 h-4 w-4"/> View Land Docs</a>
                        </Button>
                         <p className="text-xs text-muted-foreground mt-2">Mock document link.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><BarChart/> Creditworthiness</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-3xl font-bold text-primary">Good</p>
                        <p className="text-xs text-muted-foreground">Consistent repayment history.</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Calculator/> Loan Eligibility Calculator</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-4 items-end">
                    <div>
                        <label className="text-sm font-medium">Loan Amount (₹)</label>
                        <Input type="number" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} />
                    </div>
                     <div>
                        <label className="text-sm font-medium">Credit Score</label>
                        <Input type="number" value={creditScore} onChange={e => setCreditScore(Number(e.target.value))} />
                    </div>
                    <Button onClick={calculateEligibility}>Check Eligibility</Button>
                    {eligible !== null && (
                        <div className={`md:col-span-3 mt-4 text-center font-bold p-2 rounded-md ${eligible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {eligible ? 'Farmer is ELIGIBLE for this loan.' : 'Farmer is NOT ELIGIBLE for this loan.'}
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Farmer Loan Applications</CardTitle>
                    <CardDescription>Review and process pending loan applications.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Farmer Name</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Credit Score</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loans.map((loan) => (
                                <TableRow key={loan.id}>
                                    <TableCell className="font-medium">{loan.farmerName}</TableCell>
                                    <TableCell>₹{loan.amount.toLocaleString('en-IN')}</TableCell>
                                    <TableCell>{loan.creditScore}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(loan.status)}>
                                            {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{loan.date}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm">Review</Button>
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
