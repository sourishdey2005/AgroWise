
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

const cropOptions = cropsData.crops.map(c => ({ value: c.name, label: c.name }));

const heatmapData = [
    { id: 1, risk: 'high', size: 'large' }, { id: 2, risk: 'low', size: 'small' }, { id: 3, risk: 'medium', size: 'medium' }, { id: 4, risk: 'low', size: 'small' },
    { id: 5, risk: 'medium', size: 'medium' }, { id: 6, risk: 'high', size: 'large' }, { id: 7, risk: 'low', size: 'small' }, { id: 8, risk: 'low', size: 'small' },
    { id: 9, risk: 'low', size: 'small' }, { id: 10, risk: 'medium', size: 'medium' }, { id: 11, risk: 'low', size: 'small' }, { id: 12, risk: 'high', size: 'large' },
];

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

    const getRiskClass = (risk: string) => {
        switch (risk) {
            case 'high': return 'bg-red-500';
            case 'medium': return 'bg-amber-400';
            case 'low': return 'bg-green-500';
            default: return 'bg-gray-400';
        }
    };

    const getSizeClass = (size: string) => {
        switch (size) {
            case 'large': return 'w-8 h-8';
            case 'medium': return 'w-6 h-6';
            case 'small': return 'w-4 h-4';
            default: return 'w-3 h-3';
        }
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
                        <CardTitle className="flex items-center gap-2"><Map /> High-Risk Villages Heatmap</CardTitle>
                        <CardDescription>Mock visualization of at-risk areas.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative w-full aspect-video bg-secondary/30 rounded-lg p-4 flex items-center justify-center">
                            <div className="grid grid-cols-4 gap-8">
                                {heatmapData.map(point => (
                                    <div key={point.id} className="flex items-center justify-center">
                                        <div className={`${getSizeClass(point.size)} ${getRiskClass(point.risk)} rounded-full opacity-70`}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end gap-4 mt-4 text-xs items-center">
                            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-green-500"></div> Low Risk</div>
                            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-amber-400"></div> Med Risk</div>
                            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500"></div> High Risk</div>
                        </div>
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
