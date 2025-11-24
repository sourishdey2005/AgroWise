
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Calculator, FileText, Link as LinkIcon, BarChart, Banknote, CheckCircle, XCircle } from 'lucide-react';
import { LoanApplication } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useData } from '@/hooks/use-data';


const getStatusVariant = (status: LoanApplication['status']) => {
  switch (status) {
    case 'pending': return 'secondary';
    case 'approved': return 'default';
    case 'rejected': return 'destructive';
  }
};

export default function LoanManagementPage() {
    const { data, setData, loading } = useData();
    const [loanAmount, setLoanAmount] = useState(150000);
    const [creditScore, setCreditScore] = useState(720);
    const [eligible, setEligible] = useState<boolean | null>(null);
    const [selectedLoan, setSelectedLoan] = useState<LoanApplication | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { toast } = useToast();
    
    if (loading || !data) return null;

    const loans = data.loans;

    const calculateEligibility = () => {
        if (loanAmount <= 200000 && creditScore >= 650) {
            setEligible(true);
        } else {
            setEligible(false);
        }
    };
    
    const riskScore = Math.min(10, Math.max(1, 10 - Math.floor(creditScore / 100)));

    const handleReviewClick = (loan: LoanApplication) => {
        setSelectedLoan(loan);
        setIsDialogOpen(true);
    };

    const handleLoanStatusChange = (loanId: number, status: 'approved' | 'rejected') => {
        const updatedLoans = loans.map(l => l.id === loanId ? { ...l, status: status } : l);
        setData('loans', updatedLoans);
        setIsDialogOpen(false);
        toast({
            title: `Loan ${status.charAt(0).toUpperCase() + status.slice(1)}`,
            description: `The loan for ${selectedLoan?.farmerName} has been ${status}.`,
        });
    };


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
                                        <Button variant="outline" size="sm" onClick={() => handleReviewClick(loan)}>Review</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

             {selectedLoan && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Review Loan for {selectedLoan.farmerName}</DialogTitle>
                            <DialogDescription>
                                Application ID: {selectedLoan.id} | Date: {selectedLoan.date}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="text-right col-span-1 text-sm font-medium">Amount:</span>
                                <span className="col-span-3 font-bold text-lg">₹{selectedLoan.amount.toLocaleString('en-IN')}</span>
                            </div>
                             <div className="grid grid-cols-4 items-center gap-4">
                                <span className="text-right col-span-1 text-sm font-medium">Credit Score:</span>
                                <span className="col-span-3 font-bold">{selectedLoan.creditScore}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="text-right col-span-1 text-sm font-medium">Status:</span>
                                <div className="col-span-3">
                                    <Badge variant={getStatusVariant(selectedLoan.status)}>{selectedLoan.status}</Badge>
                                </div>
                            </div>
                            {selectedLoan.comments && (
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <span className="text-right col-span-1 text-sm font-medium">Comments:</span>
                                    <p className="col-span-3 text-sm text-muted-foreground">{selectedLoan.comments}</p>
                                </div>
                            )}
                        </div>
                        <DialogFooter>
                            <Button variant="destructive" onClick={() => handleLoanStatusChange(selectedLoan.id, 'rejected')} disabled={selectedLoan.status !== 'pending'}>
                               <XCircle className="mr-2 h-4 w-4" /> Reject
                            </Button>
                             <Button onClick={() => handleLoanStatusChange(selectedLoan.id, 'approved')} disabled={selectedLoan.status !== 'pending'}>
                               <CheckCircle className="mr-2 h-4 w-4" /> Approve
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
