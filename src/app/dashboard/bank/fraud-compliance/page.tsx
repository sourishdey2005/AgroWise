
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShieldAlert, Users, ListTodo, Workflow, MessageSquare, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import loanData from "@/data/loans.json";

const initialTasks = [
  { id: 1, text: 'Review new loan applications (3)', completed: false },
  { id: 2, text: 'Follow up with Ramesh Kumar on missing docs', completed: false },
  { id: 3, text: 'Process approved loan disbursement for Sita Devi', completed: true },
];

const duplicateApplications = [
  { id: 1, name: 'Ramesh Kumar', phone: '9876543210', reason: 'Multiple applications within 30 days' },
];

const loanPipeline = {
  review: loanData.applications.filter(l => l.status === 'pending').slice(0, 2),
  verification: loanData.applications.filter(l => l.status === 'pending').slice(2, 3),
  approval: loanData.applications.filter(l => l.status === 'approved').slice(0, 2),
};


export default function FraudCompliancePage() {
    const { toast } = useToast();
    const [tasks, setTasks] = useState(initialTasks);

    const handleTaskToggle = (taskId: number) => {
        setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
    };
    
    const handleEscalate = (loanId: number) => {
        toast({
            variant: "destructive",
            title: "Case Escalated",
            description: `Loan application ID ${loanId} has been flagged and escalated to the government dashboard.`,
        });
    };

    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Fraud & Compliance Workflow</h1>
                <p className="text-muted-foreground">Monitor for fraud, manage tasks, and streamline loan processing.</p>
            </div>

            <h2 className="text-xl font-semibold tracking-tight text-primary">Fraud & Compliance</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><ShieldAlert/> Document Fraud Score</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-5xl font-bold text-green-600">Low</p>
                        <p className="text-xs text-muted-foreground mt-2">No anomalies detected in recent uploads.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Users/> Duplicate Application</CardTitle>
                    </CardHeader>
                     <CardContent>
                        {duplicateApplications.length > 0 ? (
                            <Alert variant="destructive">
                                <ShieldAlert className="h-4 w-4" />
                                <AlertTitle>{duplicateApplications[0].name}</AlertTitle>
                                <AlertDescription>{duplicateApplications[0].reason}</AlertDescription>
                            </Alert>
                        ) : (
                             <p className="text-center text-sm text-muted-foreground py-4">No duplicates found.</p>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><ShieldAlert/> High-Risk Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-center text-sm text-muted-foreground py-4">No high-risk applicants flagged today.</p>
                    </CardContent>
                </Card>
            </div>
            
            <h2 className="text-xl font-semibold tracking-tight text-primary">Workflow Tools</h2>
             <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><ListTodo/> Officer Task Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {tasks.map(task => (
                                <div key={task.id} className="flex items-center gap-3">
                                    <Checkbox 
                                        id={`task-${task.id}`} 
                                        checked={task.completed} 
                                        onCheckedChange={() => handleTaskToggle(task.id)}
                                    />
                                    <label 
                                        htmlFor={`task-${task.id}`}
                                        className={`text-sm ${task.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}
                                    >
                                        {task.text}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><MessageSquare/> Application Comment System</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select an application to comment on..." />
                            </SelectTrigger>
                            <SelectContent>
                                {loanData.applications.map(l => (
                                     <SelectItem key={l.id} value={String(l.id)}>
                                        {l.farmerName} - ID: {l.id}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Textarea placeholder="Add a comment... (e.g., 'Awaiting land verification report from agent.')" />
                        <Button className="w-full">Save Comment</Button>
                    </CardContent>
                </Card>
            </div>


            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Workflow/> Loan Review Pipeline</CardTitle>
                    <CardDescription>Track applications through the approval stages.</CardDescription>
                </CardHeader>
                <CardContent className="grid lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <h3 className="font-semibold text-center">Review ({loanPipeline.review.length})</h3>
                        <div className="space-y-3">
                            {loanPipeline.review.map(loan => (
                                <Card key={loan.id} className="p-3">
                                    <p className="font-semibold text-sm">{loan.farmerName}</p>
                                    <p className="text-xs text-muted-foreground">Amount: ₹{loan.amount.toLocaleString()}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                     <div className="space-y-4">
                        <h3 className="font-semibold text-center">Verification ({loanPipeline.verification.length})</h3>
                        <div className="space-y-3">
                            {loanPipeline.verification.map(loan => (
                                <Card key={loan.id} className="p-3 bg-secondary/70">
                                    <p className="font-semibold text-sm">{loan.farmerName}</p>
                                    <p className="text-xs text-muted-foreground">Amount: ₹{loan.amount.toLocaleString()}</p>
                                    <Button size="sm" variant="outline" className="mt-2 w-full" onClick={() => handleEscalate(loan.id)}>
                                        Escalate to Govt <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Card>
                            ))}
                        </div>
                    </div>
                     <div className="space-y-4">
                        <h3 className="font-semibold text-center">Approval ({loanPipeline.approval.length})</h3>
                         <div className="space-y-3">
                            {loanPipeline.approval.map(loan => (
                                <Card key={loan.id} className="p-3 bg-primary/10 border-primary/20">
                                    <p className="font-semibold text-sm text-primary">{loan.farmerName}</p>
                                    <p className="text-xs text-muted-foreground">Amount: ₹{loan.amount.toLocaleString()}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
