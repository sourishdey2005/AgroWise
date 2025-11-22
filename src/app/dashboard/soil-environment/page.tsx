
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import StatCard from '@/components/shared/stat-card';
import { Leaf, TestTube, Lightbulb, BarChart as BarChartIcon, Check } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useFarmers } from '@/hooks/use-farmers';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const soilData = [
    { name: 'Alluvial', count: 12 },
    { name: 'Loamy', count: 8 },
    { name: 'Black', count: 5 },
    { name: 'Sandy', count: 3 },
];

const initialSuggestions = {
    "alluvial-low": ["Add lime to raise pH.", "Incorporate organic matter like compost.", "Consider growing acid-tolerant crops like potatoes or tea."],
    "alluvial-neutral": ["Excellent soil. Continue with good crop rotation.", "Maintain organic matter levels.", "Monitor for nutrient deficiencies over time."],
    "alluvial-high": ["Add elemental sulfur or aluminum sulfate to lower pH.", "Use acid-forming fertilizers like ammonium sulfate.", "Grow alkali-tolerant crops like spinach or beets."],
    "loamy-low": ["Apply agricultural limestone.", "Use wood ash sparingly.", "Incorporate well-rotted manure."],
    "loamy-neutral": ["Ideal for most crops. Focus on maintaining fertility.", "Practice cover cropping to prevent erosion.", "Regularly add compost."],
    "loamy-high": ["Use sphagnum peat moss to acidify.", "Fertilize with ammonium nitrate.", "Avoid over-liming in the future."],
    "black-low": ["This is uncommon. Double-check test results.", "If accurate, add lime and organic matter.", "Focus on improving drainage."],
    "black-neutral": ["Excellent moisture and nutrient retention.", "Ensure good tillage to prevent compaction.", "Rotate with deep-rooted crops."],
    "black-high": ["Apply gypsum (calcium sulfate) to improve structure and lower pH.", "Incorporate large amounts of compost or peat moss.", "Grow tolerant crops like cotton or sugarcane."],
    "sandy-low": ["Add lime and significant amounts of organic matter to improve water/nutrient retention.", "Use slow-release fertilizers.", "Mulch heavily to conserve moisture."],
    "sandy-neutral": ["Focus on building organic matter.", "Frequent, light irrigation is better than deep soaking.", "Use cover crops to prevent wind erosion."],
    "sandy-high": ["Use sulfur to lower pH.", "Incorporate acidic organic matter like pine needles or peat moss.", "Choose crops adapted to well-drained, alkaline conditions."]
};

export default function SoilEnvironmentPage() {
    const { farmers, setFarmers } = useFarmers();
    const { toast } = useToast();
    
    const [soilType, setSoilType] = useState('');
    const [phValue, setPhValue] = useState<number>(7.0);
    const [generatedSuggestions, setGeneratedSuggestions] = useState<string[]>([]);

    const soilTestRequests = farmers.filter(f => 
        f.issues.some(issue => issue.toLowerCase().includes('soil test'))
    );

    const handleResolveRequest = (farmerId: number) => {
        setFarmers(prevFarmers =>
            prevFarmers.map(farmer =>
                farmer.id === farmerId
                    ? { ...farmer, issues: farmer.issues.filter(issue => !issue.toLowerCase().includes('soil test')) }
                    : farmer
            )
        );
        toast({
            title: 'Request Resolved',
            description: 'The soil test request has been marked as complete.',
        });
    };
    
    const handleGenerateSuggestions = () => {
        if (!soilType) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please select a soil type.' });
            return;
        }

        let phCategory = 'neutral';
        if (phValue < 6.5) phCategory = 'low';
        if (phValue > 7.5) phCategory = 'high';

        const key = `${soilType}-${phCategory}` as keyof typeof initialSuggestions;
        setGeneratedSuggestions(initialSuggestions[key] || ["No specific suggestions for this combination. General best practices apply."]);
        
        toast({ title: 'Suggestions Generated', description: 'Soil improvement suggestions are ready.' });
    };

    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Soil & Environment Intelligence</h1>
                <p className="text-muted-foreground">
                    Analyze soil health, manage testing, and get improvement suggestions.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BarChartIcon /> Village Soil Health Overview</CardTitle>
                    <CardDescription>Distribution of soil types in your region.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={soilData}>
                            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} cursor={{fill: 'hsl(var(--muted))'}} />
                            <Bar dataKey="count" name="Farms" fill="hsl(var(--primary))" radius={4} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><TestTube /> Soil Testing Requests</CardTitle>
                    <CardDescription>Farmers who have requested a soil analysis.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Farmer</TableHead>
                                <TableHead>Region</TableHead>
                                <TableHead>Request</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {soilTestRequests.length > 0 ? soilTestRequests.map(farmer => (
                                <TableRow key={farmer.id}>
                                    <TableCell className="font-medium">{farmer.name}</TableCell>
                                    <TableCell>{farmer.region}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">
                                            {farmer.issues.find(issue => issue.toLowerCase().includes('soil test'))}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm" onClick={() => handleResolveRequest(farmer.id)}>
                                            <Check className="mr-2 h-4 w-4" /> Mark as Done
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                                        No pending soil test requests.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Lightbulb /> Soil Improvement Suggestion Generator</CardTitle>
                    <CardDescription>Generate recommendations based on soil parameters.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                         <div>
                            <label className="text-sm font-medium">Soil Type</label>
                            <Select onValueChange={setSoilType} value={soilType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select soil type..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="alluvial">Alluvial</SelectItem>
                                    <SelectItem value="loamy">Loamy</SelectItem>
                                    <SelectItem value="black">Black</SelectItem>
                                    <SelectItem value="sandy">Sandy</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Current pH Value</label>
                            <Input 
                                type="number" 
                                value={phValue} 
                                onChange={(e) => setPhValue(parseFloat(e.target.value))}
                                step="0.1"
                            />
                        </div>
                        <Button onClick={handleGenerateSuggestions}>Generate Suggestions</Button>
                    </div>
                     <div className="bg-secondary/50 rounded-lg p-6 space-y-4">
                        <h4 className="font-semibold text-foreground">Generated Suggestions</h4>
                        {generatedSuggestions.length > 0 ? (
                             <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                                {generatedSuggestions.map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                        ) : (
                            <p className="text-sm text-muted-foreground text-center pt-8">Suggestions will appear here...</p>
                        )}
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
