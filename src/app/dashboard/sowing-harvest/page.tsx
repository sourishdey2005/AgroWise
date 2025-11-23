
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Shield, ChevronsRight, GitCompareArrows, SlidersHorizontal, CalendarClock, Timer, LayoutGrid, BarChart, PercentCircle } from "lucide-react";
import cropsData from '@/data/crops.json';

const varietyComparisonData: Record<string, { hyv: { name: string; yield: string; resistance: string; cost: string; duration: string; water: string; }; local: { name: string; yield: string; resistance: string; cost: string; duration: string; water: string; }; }> = {
    wheat: { 
        hyv: { name: "HYV Wheat", yield: "25-30 Quintal/Acre", resistance: "High (Rust, Smut)", cost: "High", duration: "120-130 days", water: "Medium" }, 
        local: { name: "Local Wheat", yield: "15-20 Quintal/Acre", resistance: "Moderate", cost: "Low", duration: "140-150 days", water: "Low" } 
    },
    rice: { 
        hyv: { name: "HYV Basmati", yield: "22-25 Quintal/Acre", resistance: "High (Blast)", cost: "High", duration: "130-140 days", water: "High" }, 
        local: { name: "Local Basmati", yield: "14-18 Quintal/Acre", resistance: "Low", cost: "Low", duration: "150-160 days", water: "Medium-High" } 
    },
    maize: { 
        hyv: { name: "Hybrid Maize", yield: "30-35 Quintal/Acre", resistance: "High (Stalk Rot)", cost: "High", duration: "110-120 days", water: "Medium" }, 
        local: { name: "Desi Maize", yield: "18-22 Quintal/Acre", resistance: "High (Local Pests)", cost: "Low", duration: "120-130 days", water: "Low-Medium" } 
    },
    soybean: {
        hyv: { name: "HYV Soybean", yield: "12-15 Quintal/Acre", resistance: "High (Mosaic Virus)", cost: "High", duration: "90-100 days", water: "Low-Medium" },
        local: { name: "Local Soybean", yield: "8-10 Quintal/Acre", resistance: "Medium", cost: "Low", duration: "105-115 days", water: "Low" }
    },
    cotton: {
        hyv: { name: "Bt Cotton", yield: "10-12 Quintal/Acre", resistance: "High (Bollworm)", cost: "High", duration: "160-180 days", water: "Medium" },
        local: { name: "Desi Cotton", yield: "6-8 Quintal/Acre", resistance: "High (Drought)", cost: "Low", duration: "180-200 days", water: "Low" }
    },
    sugarcane: {
        hyv: { name: "HYV Sugarcane", yield: "40-50 Tonnes/Acre", resistance: "High (Red Rot)", cost: "High", duration: "10-12 months", water: "Very High" },
        local: { name: "Local Sugarcane", yield: "25-30 Tonnes/Acre", resistance: "Medium", cost: "Low", duration: "12-14 months", water: "High" }
    },
    potato: {
        hyv: { name: "Kufri Chipsona", yield: "120-150 Quintal/Acre", resistance: "High (Late Blight)", cost: "High", duration: "90-100 days", water: "Medium" },
        local: { name: "Local Potato", yield: "80-100 Quintal/Acre", resistance: "Low", cost: "Low", duration: "110-120 days", water: "Medium" }
    },
    tomato: {
        hyv: { name: "Hybrid Tomato", yield: "250-300 Quintal/Acre", resistance: "High (Wilt, Virus)", cost: "High", duration: "130-140 days", water: "Medium" },
        local: { name: "Desi Tomato", yield: "150-200 Quintal/Acre", resistance: "Medium", cost: "Low", duration: "140-150 days", water: "Medium-High" }
    }
};

const sowingWindow = {
    start: "October 25th",
    end: "November 15th",
    reason: "Optimal soil temperature and moisture for Wheat in this region.",
};

const initialHarvestSchedule = [
    { crop: 'Wheat', days: 12 },
    { crop: 'Basmati Rice', days: 25 },
    { crop: 'Mustard', days: 5 },
    { crop: 'Maize', days: 35 },
];


const SEED_RATE_STORAGE_KEY = 'seedRateCalculatorData';

export default function SowingHarvestPage() {
    const [landSize, setLandSize] = useState(5);
    const [seedRate, setSeedRate] = useState(40);
    const [requiredSeed, setRequiredSeed] = useState(200);
    const [harvestSchedule, setHarvestSchedule] = useState(initialHarvestSchedule);
    const [germination, setGermination] = useState(92);
    const [selectedVariety, setSelectedVariety] = useState('wheat');

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
                    <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center gap-2"><GitCompareArrows /> Crop Variety Comparison</CardTitle>
                        <Select value={selectedVariety} onValueChange={setSelectedVariety}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="wheat">Wheat</SelectItem>
                                <SelectItem value="rice">Rice</SelectItem>
                                <SelectItem value="maize">Maize</SelectItem>
                                <SelectItem value="soybean">Soybean</SelectItem>
                                <SelectItem value="cotton">Cotton</SelectItem>
                                <SelectItem value="sugarcane">Sugarcane</SelectItem>
                                <SelectItem value="potato">Potato</SelectItem>
                                <SelectItem value="tomato">Tomato</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <CardDescription>Compare High-Yielding vs. Local crop varieties.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Feature</TableHead>
                                <TableHead>{varietyComparisonData[selectedVariety].hyv.name}</TableHead>
                                <TableHead>{varietyComparisonData[selectedVariety].local.name}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Yield/Acre</TableCell>
                                <TableCell>{varietyComparisonData[selectedVariety].hyv.yield}</TableCell>
                                <TableCell>{varietyComparisonData[selectedVariety].local.yield}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Growth Duration</TableCell>
                                <TableCell>{varietyComparisonData[selectedVariety].hyv.duration}</TableCell>
                                <TableCell>{varietyComparisonData[selectedVariety].local.duration}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Disease Resistance</TableCell>
                                <TableCell>{varietyComparisonData[selectedVariety].hyv.resistance}</TableCell>
                                <TableCell>{varietyComparisonData[selectedVariety].local.resistance}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Water Requirement</TableCell>
                                <TableCell>{varietyComparisonData[selectedVariety].hyv.water}</TableCell>
                                <TableCell>{varietyComparisonData[selectedVariety].local.water}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Seed Cost</TableCell>
                                <TableCell>{varietyComparisonData[selectedVariety].hyv.cost}</TableCell>
                                <TableCell>{varietyComparisonData[selectedVariety].local.cost}</TableCell>
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
                        <CardTitle className="flex items-center gap-2"><Timer /> Harvest Schedule</CardTitle>
                        <CardDescription>Estimated days remaining for harvest.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Crop</TableHead>
                                    <TableHead className="text-right">Est. Days Remaining</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {harvestSchedule.map(item => (
                                    <TableRow key={item.crop}>
                                        <TableCell className="font-medium">{item.crop}</TableCell>
                                        <TableCell className="text-right font-mono text-primary font-bold">{item.days}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
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
