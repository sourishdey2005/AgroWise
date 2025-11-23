
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Shield, ChevronsRight, GitCompareArrows, SlidersHorizontal, CalendarClock, Timer, LayoutGrid, BarChart, PercentCircle } from "lucide-react";

const varietyComparisonData = {
    hyv: { name: "HYV Wheat", yield: "25-30 Quintal/Acre", resistance: "High (Rust, Smut)", cost: "High" },
    local: { name: "Local Wheat", yield: "15-20 Quintal/Acre", resistance: "Moderate", cost: "Low" },
};

const sowingWindow = {
    start: "October 25th",
    end: "November 15th",
    reason: "Optimal soil temperature and moisture.",
};

const SEED_RATE_STORAGE_KEY = 'seedRateCalculatorData';

export default function SowingHarvestPage() {
    const [landSize, setLandSize] = useState(5);
    const [seedRate, setSeedRate] = useState(40);
    const [requiredSeed, setRequiredSeed] = useState(200);
    const [harvestTimeInDays, setHarvestTimeInDays] = useState(12);
    const [germination, setGermination] = useState(92);

    // Load from localStorage
    useEffect(() => {
        try {
            const savedData = localStorage.getItem(SEED_RATE_STORAGE_KEY);
            if (savedData) {
                const { landSize: savedLandSize, seedRate: savedSeedRate } = JSON.parse(savedData);
                if (savedLandSize) setLandSize(savedLandSize);
                if (savedSeedRate) setSeedRate(savedSeedRate);
            }
        } catch (error) {
            console.error("Failed to load seed rate data from localStorage", error);
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        try {
            const data = JSON.stringify({ landSize, seedRate });
            localStorage.setItem(SEED_RATE_STORAGE_KEY, data);
        } catch (error) {
            console.error("Failed to save seed rate data to localStorage", error);
        }
    }, [landSize, seedRate]);


    useEffect(() => {
        setRequiredSeed(landSize * seedRate);
    }, [landSize, seedRate]);


    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Sowing & Harvest Tools</h1>
                <p className="text-muted-foreground">
                    Optimize your planting and harvesting decisions with these tools.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><GitCompareArrows /> Crop Variety Comparison</CardTitle>
                    <CardDescription>Compare High-Yielding vs. Local wheat varieties.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Feature</TableHead>
                                <TableHead>HYV Wheat</TableHead>
                                <TableHead>Local Wheat</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Yield/Acre</TableCell>
                                <TableCell>{varietyComparisonData.hyv.yield}</TableCell>
                                <TableCell>{varietyComparisonData.local.yield}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Disease Resistance</TableCell>
                                <TableCell>{varietyComparisonData.hyv.resistance}</TableCell>
                                <TableCell>{varietyComparisonData.local.resistance}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Seed Cost</TableCell>
                                <TableCell>{varietyComparisonData.hyv.cost}</TableCell>
                                <TableCell>{varietyComparisonData.local.cost}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><SlidersHorizontal /> Seed Rate Calculator</CardTitle>
                        <CardDescription>Calculate required seed quantity for your land.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="land-size" className="text-sm font-medium">Land Size (Acres)</label>
                                <Input id="land-size" type="number" value={landSize} onChange={e => setLandSize(Number(e.target.value))} />
                            </div>
                            <div>
                                <label htmlFor="seed-rate" className="text-sm font-medium">Seed Rate (kg/Acre)</label>
                                <Input id="seed-rate" type="number" value={seedRate} onChange={e => setSeedRate(Number(e.target.value))} />
                            </div>
                        </div>
                        <div className="text-center bg-secondary p-4 rounded-md">
                            <p className="text-muted-foreground">Total Seed Required</p>
                            <p className="text-3xl font-bold text-primary">{requiredSeed.toLocaleString()} kg</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><CalendarClock /> Sowing Window Predictor</CardTitle>
                        <CardDescription>Best timeframe for sowing Wheat in your region.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center text-center h-full">
                        <div className="text-4xl font-bold text-primary">
                            <span>{sowingWindow.start}</span>
                            <span className="mx-2 text-muted-foreground">-</span>
                            <span>{sowingWindow.end}</span>
                        </div>
                        <p className="mt-2 text-muted-foreground">{sowingWindow.reason}</p>
                    </CardContent>
                </Card>
            </div>
            
             <div className="grid gap-6 md:grid-cols-2">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Timer /> Harvest Optimization Timer</CardTitle>
                        <CardDescription>Optimal harvest time remaining based on maturity.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <p className="text-6xl font-bold font-mono text-primary tabular-nums">
                                {harvestTimeInDays}
                            </p>
                             <p className="text-xl text-muted-foreground">Days</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><PercentCircle /> Seed Germination Success</CardTitle>
                        <CardDescription>Expected germination rate based on seed quality and conditions.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center h-full">
                         <div className="relative h-32 w-32">
                            <svg className="h-full w-full" viewBox="0 0 36 36">
                                <path
                                    className="text-secondary"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    strokeWidth="3"
                                />
                                <path
                                    className="text-green-500"
                                    strokeDasharray={`${germination}, 100`}
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-bold text-green-500">{germination}%</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
             </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><LayoutGrid /> Multi-Crop Farm Layout Designer</CardTitle>
                    <CardDescription>Mock-up of a visual farm planning tool.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-8 grid-rows-4 gap-1 bg-secondary/50 p-2 rounded-md aspect-video">
                        {Array.from({ length: 32 }).map((_, i) => (
                             <div key={i} className={`rounded-sm ${
                                 i < 8 ? 'bg-green-300' : 
                                 (i >= 8 && i < 16) ? 'bg-yellow-200' :
                                 (i >= 16 && i < 24) ? 'bg-blue-200' : 'bg-orange-200'
                             }`}>
                                <span className="text-xs p-1 text-black/50">
                                    { i === 0 && "Wheat" }
                                    { i === 8 && "Mustard" }
                                    { i === 16 && "Veg" }
                                    { i === 24 && "Fodder" }
                                </span>
                             </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
