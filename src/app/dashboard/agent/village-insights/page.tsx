
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Book, CalendarDays, FileUp, ListChecks, ArrowRight, BarChart2, Map } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const villageMetrics = [
    { village: 'Village A', avgYield: 28, issues: 5, satisfaction: 4.2 },
    { village: 'Village B', avgYield: 25, issues: 8, satisfaction: 3.8 },
    { village: 'Village C', avgYield: 32, issues: 2, satisfaction: 4.7 },
];

const attendanceData = [
    { name: 'Jan', attendance: 78 },
    { name: 'Feb', attendance: 85 },
    { name: 'Mar', attendance: 92 },
    { name: 'Apr', attendance: 88 },
];

const AGENT_DIARY_STORAGE_KEY = 'agentDiaryNotes';

export default function VillageInsightsPage() {
    const { toast } = useToast();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [diaryNotes, setDiaryNotes] = useState('');

    useEffect(() => {
        const savedNotes = localStorage.getItem(AGENT_DIARY_STORAGE_KEY);
        if (savedNotes) {
            setDiaryNotes(savedNotes);
        }
    }, []);

    const handleSaveNotes = () => {
        localStorage.setItem(AGENT_DIARY_STORAGE_KEY, diaryNotes);
        toast({
            title: 'Notes Saved',
            description: 'Your diary has been updated.',
        });
    };
    
    const handleGenerateReport = () => {
        toast({
            title: 'Report Generated',
            description: 'Weekly performance report has been created and is ready for download (mock).',
        });
    };

    const handleEscalate = () => {
        toast({
            variant: 'destructive',
            title: 'Issue Escalated',
            description: 'Critical issue has been flagged to the government dashboard for review.',
        });
    };

    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Village Insights & Tools</h1>
                <p className="text-muted-foreground">
                    Advanced tools for regional management and reporting.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><ListChecks /> Reporting & Escalation</CardTitle>
                        <CardDescription>Generate reports and escalate critical issues.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button className="w-full" onClick={handleGenerateReport}>
                            <FileUp className="mr-2 h-4 w-4" /> Generate Weekly Report
                        </Button>
                        <div className="flex items-center gap-4 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                            <div className="flex-grow">
                                <h4 className="font-semibold text-destructive">Critical Issue</h4>
                                <p className="text-sm text-destructive/80">Widespread pest attack in Village B. Requires immediate attention.</p>
                            </div>
                            <Button variant="destructive" onClick={handleEscalate}>
                                Escalate <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Book /> Agent Diary</CardTitle>
                        <CardDescription>Keep private notes and logs from your field visits.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Textarea
                            placeholder="Log your observations, reminders, and follow-up actions..."
                            className="min-h-[120px]"
                            value={diaryNotes}
                            onChange={(e) => setDiaryNotes(e.target.value)}
                        />
                        <Button onClick={handleSaveNotes} className="w-full">Save Notes</Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Map /> Village Comparison Metrics</CardTitle>
                        <CardDescription>Compare key performance indicators across villages.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Village</TableHead>
                                    <TableHead>Avg. Yield (Q/Acre)</TableHead>
                                    <TableHead>Open Issues</TableHead>
                                    <TableHead>Satisfaction</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {villageMetrics.map((metric) => (
                                    <TableRow key={metric.village}>
                                        <TableCell className="font-medium">{metric.village}</TableCell>
                                        <TableCell>{metric.avgYield}</TableCell>
                                        <TableCell>{metric.issues}</TableCell>
                                        <TableCell>{metric.satisfaction} / 5</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BarChart2 /> Training Attendance</CardTitle>
                        <CardDescription>Monthly attendance for training sessions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={attendanceData}>
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis unit="%" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} cursor={{fill: 'hsl(var(--muted))'}} />
                                <Bar dataKey="attendance" name="Attendance" fill="hsl(var(--primary))" radius={4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><CalendarDays /> Farmer Training Scheduler</CardTitle>
                    <CardDescription>Plan and schedule upcoming farmer training sessions.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-8">
                     <div className="flex justify-center">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            className="rounded-md border"
                        />
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Schedule for {selectedDate?.toLocaleDateString()}</h4>
                        <div className="space-y-2">
                             <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a topic..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ipm">Integrated Pest Management (IPM)</SelectItem>
                                    <SelectItem value="soil-health">Soil Health Management</SelectItem>
                                    <SelectItem value="water-conservation">Water Conservation Techniques</SelectItem>
                                </SelectContent>
                            </Select>
                             <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a village..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="village-a">Village A</SelectItem>
                                    <SelectItem value="village-b">Village B</SelectItem>
                                    <SelectItem value="village-c">Village C</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button className="w-full">Schedule Training</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}

