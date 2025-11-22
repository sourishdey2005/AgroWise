
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bug, Send, Check, Eye, Map, Siren } from 'lucide-react';
import StatCard from '@/components/shared/stat-card';
import cropsData from "@/data/crops.json";
import { useToast } from '@/hooks/use-toast';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const cropOptions = cropsData.crops.map(c => ({ value: c.name, label: c.name }));

const heatmapData = [
    { id: 1, risk: 'high', size: 'large' }, { id: 2, risk: 'low', size: 'small' }, { id: 3, risk: 'medium', size: 'medium' }, { id: 4, risk: 'low', size: 'small' },
    { id: 5, risk: 'medium', size: 'medium' }, { id: 6, risk: 'high', size: 'large' }, { id: 7, risk: 'low', size: 'small' }, { id: 8, risk: 'low', size: 'small' },
    { id: 9, risk: 'low', size: 'small' }, { id: 10, risk: 'medium', size: 'medium' }, { id: 11, risk: 'low', size: 'small' }, { id: 12, risk: 'high', size: 'large' },
];

const riskDistribution = [
    { name: 'Low Risk', value: heatmapData.filter(p => p.risk === 'low').length },
    { name: 'Medium Risk', value: heatmapData.filter(p => p.risk === 'medium').length },
    { name: 'High Risk', value: heatmapData.filter(p => p.risk === 'high').length },
];

const COLORS = ['#22c55e', '#f59e0b', '#ef4444'];

export default function AdvisoriesPage() {
    const [selectedCrop, setSelectedCrop] = useState<string>('');
    const [advisoryMessage, setAdvisoryMessage] = useState('');
    const [advisoryTarget, setAdvisoryTarget] = useState('all');
    const { toast } = useToast();

    const cropDetails = cropsData.crops.find(c => c.name === selectedCrop);

    const handleSendAdvisory = () => {
        if (!advisoryMessage.trim()) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Advisory message cannot be empty.',
            });
            return;
        }
        toast({
            title: 'Advisory Sent',
            description: `Your advisory has been broadcast to the selected group: ${advisoryTarget}.`,
        });
        setAdvisoryMessage('');
    };

    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Crop Advisory Tools</h1>
                <p className="text-muted-foreground">
                    Detect issues, create advisories, and analyze delivery.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <StatCard
                    title="Advisories Sent"
                    value="152"
                    icon={<Send className="h-6 w-6 text-muted-foreground" />}
                    description="Total advisories broadcast this month"
                />
                <StatCard
                    title="Read Rate"
                    value="78%"
                    icon={<Eye className="h-6 w-6 text-muted-foreground" />}
                    description="Percentage of farmers who viewed"
                />
                <StatCard
                    title="Acknowledged"
                    value="45%"
                    icon={<Check className="h-6 w-6 text-muted-foreground" />}
                    description="Farmers who confirmed receipt"
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Siren /> Crop Issue Detection</CardTitle>
                        <CardDescription>Select a crop to view its common diseases and pests.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Select onValueChange={setSelectedCrop} value={selectedCrop}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a crop..." />
                            </SelectTrigger>
                            <SelectContent>
                                {cropOptions.map(crop => (
                                    <SelectItem key={crop.value} value={crop.value}>{crop.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {cropDetails && (
                            <div className="mt-6 space-y-4 animate-in fade-in duration-300">
                                <Alert>
                                    <Bug className="h-4 w-4" />
                                    <AlertTitle>Common Diseases</AlertTitle>
                                    <AlertDescription>
                                        <ul className="list-disc list-inside">
                                            {cropDetails.diseases.map(d => <li key={d}>{d}</li>)}
                                        </ul>
                                    </AlertDescription>
                                </Alert>
                                <Alert>
                                    <Bug className="h-4 w-4" />
                                    <AlertTitle>Common Pests</AlertTitle>
                                    <AlertDescription>
                                        <ul className="list-disc list-inside">
                                            {cropDetails.pest_control.map(p => <li key={p}>{p}</li>)}
                                        </ul>
                                    </AlertDescription>
                                </Alert>
                            </div>
                        )}
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Map /> High-Risk Villages</CardTitle>
                        <CardDescription>Distribution of at-risk areas.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={riskDistribution}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                >
                                    {riskDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: 'var(--radius)' }} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
           
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Send /> Custom Advisory Creator</CardTitle>
                    <CardDescription>Create and broadcast a custom advisory message to farmers.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea
                        placeholder="Write your advisory message here. E.g., 'Heatwave expected. Ensure crops are irrigated properly.'"
                        className="min-h-[120px]"
                        value={advisoryMessage}
                        onChange={(e) => setAdvisoryMessage(e.target.value)}
                    />
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                        <div className="flex items-center gap-2">
                             <label className="text-sm font-medium">Target:</label>
                            <Select onValueChange={setAdvisoryTarget} defaultValue="all">
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Farmers</SelectItem>
                                    <SelectItem value="punjab">Punjab</SelectItem>
                                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                                    <SelectItem value="high_risk">High-Risk Villages</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button className="w-full sm:w-auto" onClick={handleSendAdvisory}>
                            <Send className="mr-2 h-4 w-4" />
                            Broadcast Advisory
                        </Button>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
