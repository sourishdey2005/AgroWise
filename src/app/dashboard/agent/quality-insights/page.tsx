"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip } from 'recharts';
import { ShieldCheck, CircleUser, GitCommitHorizontal, Smile, Frown, Meh, Search, FileWarning, Package, FlaskConical } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const supplierData = [
  { subject: 'Consistency', A: 85, fullMark: 100 },
  { subject: 'Quality', A: 90, fullMark: 100 },
  { subject: 'Timeliness', A: 75, fullMark: 100 },
  { subject: 'Accuracy', A: 95, fullMark: 100 },
];

const qualityHistory = [
    { date: 'Jan', quality: 92 },
    { date: 'Feb', quality: 88 },
    { date: 'Mar', quality: 95 },
    { date: 'Apr', quality: 93 },
];

const disputeData = [
    { id: 'D-001', supplier: 'Farmer A', issue: 'Weight Mismatch', status: 'In Review' },
    { id: 'D-002', supplier: 'Buyer X', issue: 'Late Payment', status: 'Resolved' },
];

export default function QualityInsightsPage() {
    const [sentimentScore, setSentimentScore] = useState(72);
    
    const getSentimentIcon = (score: number) => {
        if (score > 75) return <Smile className="text-green-500 w-12 h-12" />;
        if (score < 50) return <Frown className="text-red-500 w-12 h-12" />;
        return <Meh className="text-amber-500 w-12 h-12" />;
    };

    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Quality, NLP & ML Insights</h1>
                <p className="text-muted-foreground">Tools for advanced quality control and supplier management.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader><CardTitle className="text-sm font-medium flex items-center gap-2"><ShieldCheck/> AI Quality Scoring</CardTitle></CardHeader>
                    <CardContent className="flex justify-around items-baseline text-center">
                        <div><p className="text-3xl font-bold text-green-600">A</p><p className="text-xs text-muted-foreground">Grade</p></div>
                        <div><p className="text-xl font-bold">B</p><p className="text-xs text-muted-foreground">Grade</p></div>
                        <div><p className="text-xl font-bold">C</p><p className="text-xs text-muted-foreground">Grade</p></div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className="text-sm font-medium flex items-center gap-2"><FlaskConical/> Defect Ratio</CardTitle></CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-bold text-red-500">3.5%</span>
                            <Progress value={3.5} className="h-2" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Spoiled/Low-grade items.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className="text-sm font-medium flex items-center gap-2"><Package/> Packaging</CardTitle></CardHeader>
                    <CardContent>
                        <p className="font-semibold text-primary">Jute Bags Recommended</p>
                        <p className="text-xs text-muted-foreground">For current temperature & humidity.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className="text-sm font-medium flex items-center gap-2"><Search/> Authenticity</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-green-600">Low Risk</p>
                        <p className="text-xs text-muted-foreground">Of adulteration detected.</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><CircleUser/> Supplier Reliability Radar</CardTitle>
                        <CardDescription>Performance of current supplier.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={supplierData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="subject" />
                                <PolarRadiusAxis />
                                <Radar name="Supplier" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                                <Legend />
                            </RadarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><GitCommitHorizontal/> Historical Quality Consistency</CardTitle>
                        <CardDescription>Crop quality over the last few months.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                             <LineChart data={qualityHistory}>
                                <XAxis dataKey="date" />
                                <YAxis domain={[80, 100]} unit="%"/>
                                <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }}/>
                                <Line type="monotone" dataKey="quality" stroke="hsl(var(--primary))" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
            
             <div className="grid gap-6 md:grid-cols-3">
                 <Card>
                    <CardHeader><CardTitle className="text-sm font-medium flex items-center gap-2">Freshness Indicators</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-xs text-muted-foreground">Smell</label>
                            <div className="flex items-center gap-2">
                                <div className="w-full bg-secondary rounded-full h-2.5">
                                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                                </div>
                                <span className="text-sm font-bold">9/10</span>
                            </div>
                        </div>
                         <div>
                            <label className="text-xs text-muted-foreground">Color</label>
                            <div className="flex items-center gap-2">
                                <div className="w-full bg-secondary rounded-full h-2.5">
                                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '95%' }}></div>
                                </div>
                                <span className="text-sm font-bold">9.5/10</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className="text-sm font-medium flex items-center gap-2">Buyer Feedback Sentiment</CardTitle></CardHeader>
                    <CardContent className="flex flex-col items-center justify-center">
                        {getSentimentIcon(sentimentScore)}
                        <p className="text-xl font-bold mt-2">{sentimentScore}/100 (Positive)</p>
                    </CardContent>
                </Card>
                <Alert variant="destructive">
                    <FileWarning className="h-4 w-4" />
                    <AlertTitle>Contract Violation Detected</AlertTitle>
                    <AlertDescription>
                       NLP model suggests a potential breach in payment terms by Buyer Corp (Clause 4.2). Review needed.
                    </AlertDescription>
                </Alert>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Supplier Dispute Resolution Tracker</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Entity</TableHead><TableHead>Issue</TableHead><TableHead>Status</TableHead><TableHead>Action</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {disputeData.map((d) => (
                                <TableRow key={d.id}>
                                    <TableCell>{d.id}</TableCell>
                                    <TableCell>{d.supplier}</TableCell>
                                    <TableCell>{d.issue}</TableCell>
                                    <TableCell><Badge variant={d.status === 'Resolved' ? 'secondary' : 'outline'}>{d.status}</Badge></TableCell>
                                    <TableCell><Button variant="outline" size="sm">View Details</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    );
}
