"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Cloud, Droplets, Thermometer, Bug } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip, CartesianGrid } from "recharts";
import StatCard from "@/components/shared/stat-card";
import weatherData from '@/data/weather.json';
import rainfallData from '@/data/rainfall.json';
import type { Weather } from "@/lib/types";
import WaterRequirementCalculator from "@/components/dashboard/farmer/water-requirement-calculator";
import EvapotranspirationCalculator from "@/components/dashboard/farmer/evapotranspiration-calculator";

const initialWeather = weatherData.weather[0];
const initialRainfallPrediction = rainfallData.prediction;

// Function to generate a random number within a range
const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;
const getRandomInt = (min: number, max: number) => Math.floor(getRandom(min, max + 1));

const getPestForecast = (weather: Weather) => {
    const humidity = parseInt(weather.humidity, 10);
    if (humidity > 60) return { level: 'High', color: 'bg-red-500' };
    if (humidity > 40) return { level: 'Moderate', color: 'bg-amber-500' };
    return { level: 'Low', color: 'bg-green-500' };
}

export default function WeatherPage() {
  const [weather, setWeather] = useState<Weather>(initialWeather);
  const [rainfallPrediction, setRainfallPrediction] = useState(initialRainfallPrediction);
  const [soilMoisture, setSoilMoisture] = useState(45);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate weather changes
      setWeather(prevWeather => ({
        ...prevWeather,
        temperature: `${getRandomInt(30, 42)}°C`,
        humidity: `${getRandomInt(20, 80)}%`,
        rainfall_probability: `${getRandomInt(0, 100)}%`,
      }));

      // Simulate rainfall prediction changes
      setRainfallPrediction(prev => prev.map((p, i) => ({ ...p, rainfall: getRandomInt(0, i === 0 ? 5 : 20) })));

      // Simulate other metrics
      setSoilMoisture(p => Math.min(100, Math.max(0, p + getRandom(-2, 2))));
      
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);
  
  const pestForecast = getPestForecast(weather);

  return (
    <div className="grid gap-6 animate-in fade-in duration-500">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Weather & Environment</h1>
            <p className="text-muted-foreground">
            Monitor hyperlocal weather, soil conditions, and environmental factors.
            </p>
        </div>
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
    </div>
  );
}
