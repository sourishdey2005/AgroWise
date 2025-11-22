
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Cloud, Droplets, ShieldCheck, Thermometer, TrendingUp, Wind, CalendarDays, Bug, Tractor } from "lucide-react";
import { BarChart, AreaChart, LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip, CartesianGrid, Bar } from "recharts";
import StatCard from "../shared/stat-card";
import weatherData from '@/data/weather.json';
import cropsData from '@/data/crops.json';
import soilData from '@/data/soil.json';
import mandiData from '@/data/mandi_prices.json';
import rainfallData from '@/data/rainfall.json';
import { Progress } from "@/components/ui/progress";
import type { Weather, MandiPrice } from "@/lib/types";
import WaterRequirementCalculator from "./farmer/water-requirement-calculator";
import EvapotranspirationCalculator from "./farmer/evapotranspiration-calculator";


const initialWeather = weatherData.weather[0];
const recommendedCrops = cropsData.crops.slice(0, 3);
const soilAdvice = soilData.soils[0];
const initialMarketPrices = mandiData.prices.slice(0, 5);
const initialRainfallPrediction = rainfallData.prediction;

// Function to generate a random number within a range
const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;
const getRandomInt = (min: number, max: number) => Math.floor(getRandom(min, max + 1));

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

const getPestForecast = (weather: Weather) => {
    const humidity = parseInt(weather.humidity, 10);
    if (humidity > 60) return { level: 'High', color: 'bg-red-500' };
    if (humidity > 40) return { level: 'Moderate', color: 'bg-amber-500' };
    return { level: 'Low', color: 'bg-green-500' };
}

export default function FarmerDashboard() {
  const [weather, setWeather] = useState<Weather>(initialWeather);
  const [marketPrices, setMarketPrices] = useState<MandiPrice[]>(initialMarketPrices);
  const [rainfallPrediction, setRainfallPrediction] = useState(initialRainfallPrediction);
  const [yieldPrediction, setYieldPrediction] = useState(85);
  const [harvestReadiness, setHarvestReadiness] = useState(75);
  const [soilMoisture, setSoilMoisture] = useState(45);
  const [growthStage, setGrowthStage] = useState({ current: 5, total: 10, label: "Vegetative Stage" });

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate weather changes
      setWeather(prevWeather => ({
        ...prevWeather,
        temperature: `${getRandomInt(30, 42)}°C`,
        humidity: `${getRandomInt(20, 80)}%`,
        rainfall_probability: `${getRandomInt(0, 100)}%`,
      }));

      // Simulate market price fluctuations
      setMarketPrices(prevPrices => prevPrices.map(price => ({
        ...price,
        min_price: Math.round(price.min_price * getRandom(0.98, 1.02)),
        max_price: Math.round(price.max_price * getRandom(0.98, 1.02)),
      })));

      // Simulate rainfall prediction changes
      setRainfallPrediction(prev => prev.map((p, i) => ({ ...p, rainfall: getRandomInt(0, i === 0 ? 5 : 20) })));

      // Simulate other metrics
      setYieldPrediction(p => Math.min(100, Math.max(0, p + getRandom(-0.5, 0.5))));
      setHarvestReadiness(p => Math.min(100, Math.max(0, p + 0.1)));
      setSoilMoisture(p => Math.min(100, Math.max(0, p + getRandom(-2, 2))));
      
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
  }, []);
  
  const { score: healthRiskScore, label: riskLabel, color: riskColor } = calculateHealthRisk(weather);
  const healthRiskStroke = healthRiskScore;
  const pestForecast = getPestForecast(weather);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Hyperlocal Weather - {weather.district}</CardTitle>
          <CardDescription>Current conditions and pest forecast.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Temperature"
            value={weather.temperature}
            icon={<Thermometer className="h-6 w-6 text-muted-foreground" />}
            description="Current avg temperature"
          />
          <StatCard
            title="Humidity"
            value={weather.humidity}
            icon={<Droplets className="h-6 w-6 text-muted-foreground" />}
            description="Relative humidity"
          />
          <StatCard
            title="Rainfall"
            value={weather.rainfall_probability}
            icon={<Cloud className="h-6 w-6 text-muted-foreground" />}
            description="Chance of rain today"
          />
          <StatCard
            title="Pest Forecast"
            value={pestForecast.level}
            icon={<Bug className="h-6 w-6 text-muted-foreground" />}
            description="Current pest activity risk"
            badgeColor={pestForecast.color}
          />
        </CardContent>
      </Card>


       {weather.alerts && weather.alerts.length > 0 && weather.alerts[0] && (
        <Card className="rounded-2xl shadow-sm bg-destructive/10 border-destructive/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle />
                <span>Weather Alert</span>
                </CardTitle>
                <CardDescription className="text-destructive/90">
                {weather.district}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-destructive-foreground/80">
                {weather.alerts[0]}
                </p>
            </CardContent>
            </Card>
        )}
      
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>5-Day Rainfall Prediction</CardTitle>
            <CardDescription>Estimated rainfall (in mm) for the coming days.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={rainfallPrediction}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} unit="mm" />
                <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
                <Line type="monotone" dataKey="rainfall" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Soil Moisture Estimation</CardTitle>
            <CardDescription>Mock estimation of water content in the soil.</CardDescription>
          </CardHeader>
          <CardContent>
              <div className="flex items-center justify-center h-full">
                  <div className="relative h-32 w-32">
                      <svg className="h-full w-full" viewBox="0 0 36 36">
                          <path
                              className="text-secondary"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              strokeWidth="3"
                          />
                          <path
                              className="text-blue-500"
                              strokeDasharray={`${soilMoisture}, 100`}
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              strokeWidth="3"
                              strokeLinecap="round"
                          />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-4xl font-bold text-blue-500">{Math.round(soilMoisture)}%</span>
                          <span className="text-xs text-muted-foreground">Optimal</span>
                      </div>
                  </div>
              </div>
          </CardContent>
        </Card>
      </div>

      <WaterRequirementCalculator />
      
      <EvapotranspirationCalculator />

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

    </div>
  );
}
