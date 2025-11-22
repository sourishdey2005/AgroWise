
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Cloud, Droplets, ShieldCheck, Sun, Thermometer, TrendingUp, Wind, CalendarDays, Bug, Tractor } from "lucide-react";
import StatCard from "../shared/stat-card";
import weatherData from '@/data/weather.json';
import cropsData from '@/data/crops.json';
import soilData from '@/data/soil.json';
import mandiData from '@/data/mandi_prices.json';
import { Progress } from "@/components/ui/progress";
import type { Weather } from "@/lib/types";
import CropRiskCalculator from "./farmer/crop-risk-calculator";

// Mock data fetching
const weather = weatherData.weather[0];
const recommendedCrops = cropsData.crops.slice(0, 3);
const soilAdvice = soilData.soils[0];
const marketPrices = mandiData.prices.slice(0, 5);

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
  const yieldPrediction = 85; 
  const { score: healthRiskScore, label: riskLabel, color: riskColor } = calculateHealthRisk(weather);
  const healthRiskStroke = healthRiskScore;
  const pestForecast = getPestForecast(weather);
  const growthStage = { current: 5, total: 10, label: "Vegetative Stage" };
  const harvestReadiness = 75;

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
      </div>

       <Card className="rounded-2xl shadow-sm bg-destructive/10 border-destructive/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle />
              <span>Disease Alert: Rice Blast</span>
            </CardTitle>
            <CardDescription className="text-destructive/90">
              High humidity (over 25%) in your district (Ludhiana) increases the risk for Basmati Rice.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-destructive-foreground/80">
              Please monitor your fields for gray or white spots on leaves. Consider preventive spraying with recommended fungicides if symptoms appear.
            </p>
          </CardContent>
        </Card>

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
                <span className="text-4xl font-bold text-primary">{yieldPrediction}%</span>
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
               <CardDescription>Risk score based on weather forecast</CardDescription>
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
              <p className="text-center text-sm">Estimated {growthStage.total - growthStage.current} weeks until next stage.</p>
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
                            <span className="text-4xl font-bold text-primary">{harvestReadiness}%</span>
                        </div>
                    </div>
                </div>
                 <p className="text-center text-sm text-muted-foreground mt-2">Ready in approx. 2 weeks</p>
            </CardContent>
        </Card>
      </div>

      <CropRiskCalculator />

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Smart Crop Recommendations</CardTitle>
          <CardDescription>Based on your district (Ludhiana), soil (Alluvial), and current season.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recommendedCrops.map((crop) => (
            <Card key={crop.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle>{crop.name}</CardTitle>
                <CardDescription>Soil: {crop.soil_type}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-semibold">Fertilizers:</span>
                  {crop.fertilizers.slice(0, 2).map(f => <Badge key={f} variant="secondary">{f}</Badge>)}
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

    