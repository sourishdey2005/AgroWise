
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { ArrowDown, ArrowUp, Zap, AlertTriangle, Scale, BarChart2, GitBranch, Droplets, List, TrendingUp } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const arbitrageData = [
    { crop: 'Onion', buyState: 'Maharashtra', buyPrice: 2200, sellState: 'Karnataka', sellPrice: 2800, profit: 600 },
    { crop: 'Potato', buyState: 'Uttar Pradesh', buyPrice: 1800, sellState: 'Bihar', sellPrice: 2100, profit: 300 },
    { crop: 'Tomato', buyState: 'Andhra Pradesh', buyPrice: 2500, sellState: 'Tamil Nadu', sellPrice: 3100, profit: 600 },
];

const priceSpreadData = [
    { crop: 'Wheat', mandiPrice: 2150, retailPrice: 2500 },
    { crop: 'Onion', mandiPrice: 2200, retailPrice: 3000 },
    { crop: 'Potato', mandiPrice: 1800, retailPrice: 2400 },
];

const highOpportunityCrops = ['Onion', 'Garlic', 'Ginger', 'Tomato'];

const momentumData = {
    'wheat': { speed: 65, direction: 'up' },
    'onion': { speed: 85, direction: 'up' },
    'potato': { speed: 40, direction: 'down' },
};

const liquidityData = {
    'Ludhiana': { index: 88, status: 'High' },
    'Pune': { index: 92, status: 'High' },
    'Kanpur': { index: 75, status: 'Medium' },
    'Nagpur': { index: 60, status: 'Medium' },
};

export default function TradeIntelligencePage() {
    const [volatility, setVolatility] = useState(45);
    const [selectedCrop, setSelectedCrop] = useState('wheat');
    const [selectedMandi, setSelectedMandi] = useState('Pune');
    const { toast } = useToast();

    const handleCalculateRisk = () => {
        toast({
            title: "Calculation Complete",
            description: "Profit to Risk Ratio for the selected trade is 2.5:1 (mock).",
        });
    };
    
    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Advanced Trade Intelligence</h1>
                <p className="text-muted-foreground">Sophisticated tools for market analysis and trade opportunities.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><GitBranch /> Real-Time Arbitrage Opportunities</CardTitle>
                    <CardDescription>Opportunities to buy low and sell high across different states.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Crop</TableHead>
                                <TableHead>Buy From / Price</TableHead>
                                <TableHead>Sell To / Price</TableHead>
                                <TableHead className="text-right">Potential Profit (₹/Quintal)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {arbitrageData.map((item) => (
                                <TableRow key={item.crop}>
                                    <TableCell className="font-medium">{item.crop}</TableCell>
                                    <TableCell>{item.buyState} / ₹{item.buyPrice}</TableCell>
                                    <TableCell>{item.sellState} / ₹{item.sellPrice}</TableCell>
                                    <TableCell className="text-right text-green-600 font-bold">+₹{item.profit}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><TrendingUp/> Seasonal Price Volatility</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center">
                        <div className="relative h-24 w-24">
                             <svg className="h-full w-full" viewBox="0 0 36 36">
                                <path className="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3"/>
                                <path className="text-amber-500" strokeDasharray={`${volatility}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" strokeLinecap="round"/>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold">{volatility}%</span>
                            </div>
                        </div>
                         <p className="text-xs text-muted-foreground mt-2">Medium Volatility</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Droplets/> Mandi Liquidity Index</CardTitle>
                    </CardHeader>
                     <CardContent className="flex flex-col items-center justify-center">
                        <Select value={selectedMandi} onValueChange={setSelectedMandi}>
                            <SelectTrigger className="w-[180px] mb-4">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(liquidityData).map(mandi => <SelectItem key={mandi} value={mandi}>{mandi}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <p className="text-3xl font-bold">{liquidityData[selectedMandi as keyof typeof liquidityData].index}</p>
                        <p className="text-sm text-muted-foreground">Status: <span className="font-semibold">{liquidityData[selectedMandi as keyof typeof liquidityData].status}</span></p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><BarChart2/> Trading Momentum</CardTitle>
                    </CardHeader>
                     <CardContent className="flex flex-col items-center justify-center">
                         <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                            <SelectTrigger className="w-[180px] mb-4">
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(momentumData).map(crop => <SelectItem key={crop} value={crop}>{crop.charAt(0).toUpperCase() + crop.slice(1)}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <div className="flex items-baseline gap-2">
                             <p className="text-3xl font-bold">{momentumData[selectedCrop as keyof typeof momentumData].speed}</p>
                             {momentumData[selectedCrop as keyof typeof momentumData].direction === 'up' 
                                ? <ArrowUp className="w-6 h-6 text-green-500" />
                                : <ArrowDown className="w-6 h-6 text-red-500" />}
                        </div>
                        <p className="text-sm text-muted-foreground">Strong Upward Trend</p>
                    </CardContent>
                </Card>
                 <Card className="bg-primary/10 border-primary/30">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2 text-primary"><Zap/> Demand Shock Predictor</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="font-semibold">Sudden demand surge for Onions detected in Maharashtra due to unseasonal rains impacting local supply.</p>
                    </CardContent>
                </Card>
            </div>
            
             <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BarChart2 /> Wholesaler vs. Retailer Spread</CardTitle>
                        <CardDescription>Price difference between Mandi and local retail.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={priceSpreadData}>
                                <XAxis dataKey="crop" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis unit="₹" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} cursor={{fill: 'hsl(var(--muted))'}} />
                                <Bar dataKey="mandiPrice" name="Mandi Price" fill="hsl(var(--secondary))" radius={4} />
                                <Bar dataKey="retailPrice" name="Retail Price" fill="hsl(var(--primary))" radius={4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><List/> High Opportunity Crops</CardTitle>
                        <CardDescription>Daily list based on margin and demand signals.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {highOpportunityCrops.map(crop => (
                                <Badge key={crop} variant="secondary" className="text-lg py-1 px-3">{crop}</Badge>
                            ))}
                        </div>
                         <Alert className="mt-4">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Price Manipulation Detected</AlertTitle>
                            <AlertDescription>Unusual price drop for Mustard in Jaipur mandi. Potential manipulation. Advise caution.</AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Scale/> Profit to Risk Ratio Calculator</CardTitle>
                    <CardDescription>Quantify the risk vs. reward for a selected trade.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row gap-4 items-center">
                    <Input type="number" placeholder="Entry Price" />
                    <Input type="number" placeholder="Target Price" />
                    <Input type="number" placeholder="Stop-Loss Price" />
                    <Button onClick={handleCalculateRisk} className="w-full sm:w-auto">Calculate</Button>
                </CardContent>
                 <CardFooter>
                     <p className="text-sm text-muted-foreground">Long-Term Price Stability Score for Wheat: <span className="font-bold text-primary">82 (Stable)</span></p>
                 </CardFooter>
            </Card>

        </div>
    );
}
