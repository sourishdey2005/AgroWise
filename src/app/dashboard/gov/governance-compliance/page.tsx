
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Shield, Lightbulb, UserCheck, AlertTriangle, BookOpen } from 'lucide-react';
import StatCard from '@/components/shared/stat-card';
import { Progress } from '@/components/ui/progress';

const auditData = [
  { id: 'AU-01', entity: 'Ludhiana Mandi', status: 'Completed', finding: 'Minor discrepancy' },
  { id: 'AU-02', entity: 'Patna DAO Office', status: 'Pending', finding: 'N/A' },
  { id: 'AU-03', entity: 'Guntur Warehouse', status: 'Failed', finding: 'Stock mismatch' },
  { id: 'AU-04', entity: 'Indore Office', status: 'Completed', finding: 'All clear' },
];

const officerPerformance = [
  { name: 'Nitin Joshi', efficiency: 92, reports_filed: 12, compliance_rate: 98 },
  { name: 'Sunita Singh', efficiency: 88, reports_filed: 9, compliance_rate: 96 },
  { name: 'Anil Kumar', efficiency: 95, reports_filed: 15, compliance_rate: 99 },
];

export default function GovernanceCompliancePage() {

    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Governance, Compliance & Transparency</h1>
                <p className="text-muted-foreground">Tools for monitoring integrity and performance in agricultural governance.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Shield/> Corruption Risk</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-green-600">Low</p>
                        <p className="text-xs text-muted-foreground">AI model indicates low probability of corruption in current fund flows.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><BookOpen /> Audit Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">78%</p>
                         <p className="text-xs text-muted-foreground">of scheduled audits completed for this quarter.</p>
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><UserCheck /> Officer Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">91.7%</p>
                         <p className="text-xs text-muted-foreground">Average efficiency score across all officers.</p>
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Corruption Risk Heatmap</CardTitle>
                        <CardDescription>Mock visualization of AI-detected suspicious activity.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="aspect-video w-full bg-secondary/50 rounded-md p-2 grid grid-cols-10 grid-rows-6 gap-1">
                            {Array.from({ length: 60 }).map((_, i) => (
                                <div key={i} className={`rounded-sm opacity-80 ${
                                    [23, 48].includes(i) ? 'bg-red-600' :
                                    [1, 15, 33, 55].includes(i) ? 'bg-amber-400' : 'bg-green-400/30'
                                }`} />
                            ))}
                        </div>
                        <div className="flex justify-around text-xs mt-2">
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-red-600"/>High Risk</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-amber-400"/>Medium Risk</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-green-400/30"/>Low Risk</span>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Lightbulb/> AI Policy Recommendation Engine</CardTitle>
                        <CardDescription>Generated based on current agricultural data.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Alert>
                            <AlertTitle className="font-semibold">Increase Subsidy on Drought-Resistant Seeds</AlertTitle>
                            <AlertDescription>
                                Due to low rainfall forecast in Marathwada, a 15% increase in subsidy for drought-resistant seeds is recommended to mitigate risk.
                            </AlertDescription>
                        </Alert>
                         <Alert>
                            <AlertTitle className="font-semibold">Revise MSP for Pulses</AlertTitle>
                            <AlertDescription>
                                Market analysis shows a 10% drop in pulse prices. A minor upward revision of MSP is suggested to ensure farmer income stability.
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            </div>


            <Card>
                <CardHeader>
                    <CardTitle>Real-time Alerts for Non-Compliance</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                     <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>MSP Violation Detected</AlertTitle>
                        <AlertDescription>Multiple trades for wheat reported below MSP at Kanpur Mandi.</AlertDescription>
                    </Alert>
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Ghost Beneficiary Alert</AlertTitle>
                        <AlertDescription>AI has flagged 2 accounts in PM-KISAN with suspect credentials in Bihar.</AlertDescription>
                    </Alert>
                    <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Potential Hoarding</AlertTitle>
                        <AlertDescription>Unusual onion stock levels detected at a warehouse in Nashik.</AlertDescription>
                    </Alert>
                    <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Pesticide Overuse</AlertTitle>
                        <AlertDescription>High concentration of non-approved pesticides detected in samples from Malwa region.</AlertDescription>
                    </Alert>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Inspection & Audit Tracker</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Entity</TableHead><TableHead>Status</TableHead><TableHead>Finding</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {auditData.map(audit => (
                                    <TableRow key={audit.id}>
                                        <TableCell>{audit.id}</TableCell>
                                        <TableCell>{audit.entity}</TableCell>
                                        <TableCell>
                                            <Badge variant={audit.status === 'Completed' ? 'secondary' : audit.status === 'Failed' ? 'destructive' : 'outline'}>{audit.status}</Badge>
                                        </TableCell>
                                        <TableCell>{audit.finding}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Government Officer Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Officer</TableHead>
                                    <TableHead>Efficiency</TableHead>
                                    <TableHead>Reports Filed</TableHead>
                                    <TableHead>Compliance %</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {officerPerformance.map(officer => (
                                    <TableRow key={officer.name}>
                                        <TableCell>{officer.name}</TableCell>
                                        <TableCell><Badge variant="secondary">{officer.efficiency}%</Badge></TableCell>
                                        <TableCell>{officer.reports_filed}</TableCell>
                                        <TableCell>{officer.compliance_rate}%</TableCell>
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
