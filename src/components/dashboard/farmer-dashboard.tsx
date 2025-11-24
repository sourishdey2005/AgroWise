
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShieldCheck, TrendingUp, CalendarDays, Tractor, Sprout, Recycle, Calculator, BarChartHorizontal, FlaskConical, Power, AlertTriangle, Droplets, Wind, Sun, Bug } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { Weather, MandiPrice } from "@/lib/types";
import CropRiskCalculator from "./farmer/crop-risk-calculator";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from "recharts";
import { Switch } from "../ui/switch";
import { useData } from "@/hooks/use-data";


// Function to generate a random number within a range
const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;


// Mock function to calculate risk score
const calculateHealthRisk = (weather: Weather): { score: number; label: string, color: string } => {
  let score = 10;
  const temp = parseInt(weather.temperature, 10);
  const humidity = parseInt(weather.humidity, 10);
  const rain = parseInt(weather.rainfall_probability, 10);

  if (temp > 35 && humidity > 50) score += 25;
  if (humidity > 70 && rain > 50) score += 30;
  if (humidity > 60) score += 15;
  if (temp > 40) score += 20;

  score = Math.min(score, 100);

  if (score > 75) return { score, label: "High Risk", color: "text-red-500" };
  if (score > 40) return { score, label: "Medium Risk", color: "text-amber-500" };
  return { score, label: "Low Risk", color: "text-green-500" };
};

const profitProjectionData = [
    { name: 'Profit', expected: 75000, potential: 95000 }
];

const soilNutrientData = [
    { name: 'Nitrogen (N)', level: 75, goal: 80 },
    { name: 'Phosphorus (P)', level: 60, goal: 70 },
    { name: 'Potassium (K)', level: 85, goal: 80 },
];

const pestRiskData = [
    { name: 'Fungal', probability: 65 },
    { name: 'Insects', probability: 40 },
    { name: 'Mites', probability: 25 },
];

const waterUsageData = [
    { day: 'Mon', usage: 350 }, { day: 'Tue', usage: 400 }, { day: 'Wed', usage: 320 },
    { day: 'Thu', usage: 410 }, { day: 'Fri', usage: 380 }, { day: 'Sat', usage: 420 },
    { day: 'Sun', usage: 390 },
]


export default function FarmerDashboard() {
  const { data: appData, loading } = useData();
  const [marketPrices, setMarketPrices] = useState<MandiPrice[]>([]);
  const [yieldPrediction, setYieldPrediction] = useState(85);
  const [harvestReadiness, setHarvestReadiness] = useState(75);
  const [growthStage, setGrowthStage] = useState({ current: 5, total: 10, label: "Vegetative Stage" });
  const [weather, setWeather] = useState<Weather | null>(null);
  const [soilPh, setSoilPh] = useState(6.8);
  const [waterPumpOn, setWaterPumpOn] = useState(false);
  const [waterTankLevel, setWaterTankLevel] = useState(70);

  useEffect(() => {
    if (appData && !loading) {
      setMarketPrices(appData.mandi_prices.slice(0, 5));
      setWeather(appData.weather[0]);
    }
  }, [appData, loading]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate market price fluctuations
      setMarketPrices(prevPrices => prevPrices.map(price => ({
        ...price,
        min_price: Math.round(price.min_price * getRandom(0.98, 1.02)),
        max_price: Math.round(price.max_price * getRandom(0.98, 1.02)),
      })));

      // Simulate other metrics
      setYieldPrediction(p => Math.min(100, Math.max(0, p + getRandom(-0.5, 0.5))));
      setHarvestReadiness(p => Math.min(100, Math.max(0, p + 0.1)));
      setSoilPh(p => Math.min(8, Math.max(5, p + getRandom(-0.05, 0.05))));
      
      // Simulate water tank level change based on pump status
      setWaterTankLevel(p => {
          const change = waterPumpOn ? 1/6 : - (1 / (30 * 60 / 3)); // 1% over 30 mins
          return Math.min(100, Math.max(0, p + change));
      });
      
      // Simulate growth stage progress
      setGrowthStage(prev => {
          const newCurrent = prev.current + 0.01;
          if (newCurrent >= prev.total) return { ...prev, current: prev.total, label: "Maturity" };
          if (newCurrent > 8) return { ...prev, current: newCurrent, label: "Late Season" };
          if (newCurrent > 5) return { ...prev, current: newCurrent, label: "Mid Season" };
          return { ...prev, current: newCurrent };
      });

    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [waterPumpOn]);
  
  if (loading || !weather) return null;
  
  const { score: healthRiskScore, label: riskLabel, color: riskColor } = calculateHealthRisk(weather);
  const healthRiskStroke = healthRiskScore;

  const getPhLabel = (ph: number) => {
    if (ph < 6.5) return 'Slightly Acidic';
    if (ph > 7.5) return 'Slightly Alkaline';
    return 'Neutral';
  };

  return (
    <div className="grid gap-6">
      <CropRiskCalculator />
      
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Market Prices (Local Mandi)</CardTitle>
            <CardDescription>Live prices for key crops in your region.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Crop</TableHead>
                  <TableHead className="text-right">Min Price (₹/Quintal)</TableHead>
                  <TableHead className="text-right">Max Price (₹/Quintal)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {marketPrices.map((price) => (
                  <TableRow key={price.id}>
                    <TableCell className="font-medium">{price.crop}</TableCell>
                    <TableCell className="text-right">{price.min_price.toLocaleString('en-IN')}</TableCell>
                    <TableCell className="text-right">{price.max_price.toLocaleString('en-IN')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="text-primary" />
                <span>Yield Prediction</span>
              </CardTitle>
              <CardDescription>Estimated yield for current season</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-primary">{Math.round(yieldPrediction)}%</span>
                <Progress value={yieldPrediction} className="h-3 w-full" />
              </div>
               <p className="text-xs text-muted-foreground mt-2">Based on current weather and soil conditions.</p>
            </CardContent>
          </Card>
           <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="text-primary" />
                <span>Weather Health Risk</span>
              </CardTitle>
               <CardDescription>Risk score for crop disease</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center">
                    <div className="relative h-32 w-32">
                        <svg className="h-full w-full" viewBox="0 0 36 36">
                            <path
                                className="text-secondary"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                strokeWidth="3"
                            />
                            <path
                                className={riskColor}
                                strokeDasharray={`${healthRiskStroke}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-3xl font-bold ${riskColor}`}>{healthRiskScore}</span>
                            <span className="text-xs text-muted-foreground">{riskLabel}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>

       <Card>
        <CardHeader>
            <CardTitle>Farm Analytics Overview</CardTitle>
            <CardDescription>A quick glance at key farm metrics.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-3">
            <div>
                <h3 className="font-semibold text-center mb-2">Soil Nutrient Levels</h3>
                 <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={soilNutrientData} layout="vertical" margin={{ left: 10 }}>
                        <XAxis type="number" domain={[0, 100]} hide />
                        <YAxis type="category" dataKey="name" width={80} fontSize={12} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} cursor={{ fill: 'hsl(var(--muted))' }} />
                        <Legend />
                        <Bar dataKey="level" name="Current" fill="hsl(var(--primary))" radius={4} />
                        <Bar dataKey="goal" name="Goal" fill="hsl(var(--secondary))" radius={4} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
             <div>
                <h3 className="font-semibold text-center mb-2">Pest & Disease Probability</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={pestRiskData}>
                        <XAxis dataKey="name" fontSize={12} axisLine={false} tickLine={false}/>
                        <YAxis domain={[0, 100]} unit="%" hide />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} cursor={{ fill: 'hsl(var(--muted))' }} />
                        <Bar dataKey="probability" name="Risk" fill="hsl(var(--destructive) / 0.6)" radius={4} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
             <div>
                <h3 className="font-semibold text-center mb-2">Weekly Water Usage</h3>
                 <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={waterUsageData}>
                        <XAxis dataKey="day" fontSize={12} axisLine={false} tickLine={false}/>
                        <YAxis domain={[300, 500]} unit="L" hide/>
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
                        <Line type="monotone" dataKey="usage" name="Liters" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><FlaskConical className="text-primary" /> Soil pH Monitor</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-5xl font-bold">{soilPh.toFixed(1)}</p>
                    <p className="text-sm text-muted-foreground">{getPhLabel(soilPh)}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Power className="text-primary" /> Water Pump</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                    <Switch checked={waterPumpOn} onCheckedChange={setWaterPumpOn} aria-label="Toggle Water Pump"/>
                    <p className="text-sm mt-2 text-muted-foreground">{waterPumpOn ? "Pump is ON" : "Pump is OFF"}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><AlertTriangle className="text-destructive" /> Livestock Feed</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center font-semibold text-destructive">Feed level is low for Cow Shed #2.</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Droplets className="text-primary" /> Tank Water Level</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center">
                        <p className="text-5xl font-bold text-blue-500">{Math.round(waterTankLevel)}%</p>
                        <p className="text-sm text-muted-foreground">Est. {Math.round(waterTankLevel/10)} days until empty</p>
                    </div>
                </CardContent>
            </Card>
        </div>


      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="text-primary" />
              <span>Crop Growth Timeline (Basmati Rice)</span>
            </CardTitle>
            <CardDescription>
              Tracking progress from sowing to harvest.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={(growthStage.current / growthStage.total) * 100} className="h-3"/>
              <div className="flex justify-between text-sm font-medium text-muted-foreground">
                <span>Sowing</span>
                <span>{growthStage.label}</span>
                <span>Harvest</span>
              </div>
              <p className="text-center text-sm">Estimated {Math.max(0, Math.ceil(growthStage.total - growthStage.current))} weeks until next stage.</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-sm">
           <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Tractor className="text-primary" />
                <span>Harvest Readiness Meter</span>
            </CardTitle>
            <CardDescription>
                Estimated readiness for your primary crop.
            </CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="flex items-center justify-center">
                    <div className="relative h-32 w-32">
                        <svg className="h-full w-full" viewBox="0 0 36 36">
                            <path
                                className="text-secondary"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                strokeWidth="3"
                            />
                            <path
                                className="text-primary"
                                strokeDasharray={`${harvestReadiness}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold text-primary">{Math.round(harvestReadiness)}%</span>
                            <span className="text-xs text-muted-foreground">Ready</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
      
       <div className="grid gap-6 md:grid-cols-3">
            <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Sprout className="text-primary" /> Multi-Season Planner</CardTitle>
                    <CardDescription>Crop suggestions for upcoming seasons.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Season</TableHead>
                                <TableHead>Suggested Crop</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>Kharif (Jun-Oct)</TableCell>
                                <TableCell>Basmati Rice, Maize</TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell>Rabi (Oct-Mar)</TableCell>
                                <TableCell>Wheat, Mustard</TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell>Zaid (Mar-Jun)</TableCell>
                                <TableCell>Moong Dal, Cucumber</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Recycle className="text-primary" /> Crop Rotation Optimizer</CardTitle>
                    <CardDescription>Improve soil health with smart rotation.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-around text-center">
                        <div>
                            <p className="font-bold">Year 1</p>
                            <p className="text-sm text-muted-foreground">Rice (Deep root)</p>
                        </div>
                        <p className="font-bold text-primary">&rarr;</p>
                         <div>
                            <p className="font-bold">Year 2</p>
                            <p className="text-sm text-muted-foreground">Legume (N-fixing)</p>
                        </div>
                        <p className="font-bold text-primary">&rarr;</p>
                        <div>
                            <p className="font-bold">Year 3</p>
                            <p className="text-sm text-muted-foreground">Wheat (Shallow root)</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
             <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Calculator className="text-primary" /> Input Cost Estimator</CardTitle>
                    <CardDescription>Calculate costs per acre for Wheat.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-sm">
                        <li className="flex justify-between"><span>Seeds:</span> <span>₹2,000</span></li>
                        <li className="flex justify-between"><span>Fertilizers:</span> <span>₹3,500</span></li>
                        <li className="flex justify-between"><span>Labor:</span> <span>₹4,000</span></li>
                        <li className="flex justify-between"><span>Irrigation:</span> <span>₹1,500</span></li>
                        <li className="flex justify-between font-bold border-t pt-2 mt-2"><span>Total:</span> <span>₹11,000</span></li>
                    </ul>
                </CardContent>
            </Card>
        </div>

        <Card className="rounded-2xl shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BarChartHorizontal className="text-primary" /> Expected Profit Projection</CardTitle>
                <CardDescription>Expected vs. potential profit per acre for current season.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={150}>
                    <BarChart data={profitProjectionData} layout="vertical" margin={{ left: 10, right: 30}}>
                        <XAxis type="number" unit="₹" tickFormatter={(value) => `${value/1000}k`} />
                        <YAxis type="category" dataKey="name" hide />
                        <Tooltip
                            cursor={{ fill: 'hsl(var(--muted))' }}
                            contentStyle={{ backgroundColor: 'hsl(var(--background))' }}
                            formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                        />
                        <Bar dataKey="expected" name="Expected Profit" fill="hsl(var(--primary) / 0.5)" radius={4} />
                        <Bar dataKey="potential" name="Potential Profit" fill="hsl(var(--primary))" radius={4} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

    </div>
  );
}
