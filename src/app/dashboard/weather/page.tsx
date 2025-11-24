
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Cloud, Droplets, Thermometer, Bug, Wind, Sun } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip, CartesianGrid, AreaChart, Area } from "recharts";
import StatCard from "@/components/shared/stat-card";
import type { Weather } from "@/lib/types";
import WaterRequirementCalculator from "@/components/dashboard/farmer/water-requirement-calculator";
import EvapotranspirationCalculator from "@/components/dashboard/farmer/evapotranspiration-calculator";
import { useAuth } from "@/hooks/use-auth";
import { useData } from "@/hooks/use-data";

// Function to generate a random number within a range
const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;
const getRandomInt = (min: number, max: number) => Math.floor(getRandom(min, max + 1));

const getPestForecast = (weather: Weather) => {
    const humidity = parseInt(weather.humidity, 10);
    if (humidity > 60) return { level: 'High', color: 'bg-red-500' };
    if (humidity > 40) return { level: 'Moderate', color: 'bg-amber-500' };
    return { level: 'Low', color: 'bg-green-500' };
}

const getInitialWeather = (weatherData: Weather[], region?: string) => {
    if (region === "Punjab") {
        return weatherData.find(w => w.district === "Ludhiana") || weatherData[0];
    }
    if (region === "Maharashtra") {
        return weatherData.find(w => w.district === "Pune") || weatherData[0];
    }
    // Fallback for other regions or if user has no region
    return weatherData[0];
};


export default function WeatherPage() {
  const { user } = useAuth();
  const { data, loading } = useData();
  
  const [weather, setWeather] = useState<Weather | null>(null);
  const [rainfallPrediction, setRainfallPrediction] = useState<any[]>([]);
  const [tempForecast, setTempForecast] = useState<any[]>([]);
  const [humidityForecast, setHumidityForecast] = useState<any[]>([]);
  const [soilMoisture, setSoilMoisture] = useState(45);
  const [windSpeed, setWindSpeed] = useState(15);
  const [uvIndex, setUvIndex] = useState(9);
  
  useEffect(() => {
    if (data && !loading) {
      const initialWeather = getInitialWeather(data.weather, user?.region);
      setWeather(initialWeather);
      setRainfallPrediction(data.rainfall.prediction);
      setTempForecast(data.weatherForecast.forecasts.temperature);
      setHumidityForecast(data.weatherForecast.forecasts.humidity);
    }
  }, [data, loading, user]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate weather changes
      setWeather(prevWeather => {
        if (!prevWeather) return null;
        return {
          ...prevWeather,
          temperature: `${getRandomInt(30, 42)}°C`,
          humidity: `${getRandomInt(20, 80)}%`,
          rainfall_probability: `${getRandomInt(0, 100)}%`,
        }
      });

      // Simulate rainfall prediction changes
      setRainfallPrediction(prev => prev.map((p, i) => ({ ...p, rainfall: getRandomInt(0, i === 0 ? 5 : 20) })));

      // Simulate forecast changes
      setTempForecast(prev => prev.map(f => ({ ...f, temp: f.temp + getRandom(-0.5, 0.5) })));
      setHumidityForecast(prev => prev.map(f => ({ ...f, humidity: f.humidity + getRandom(-1, 1) })));

      // Simulate other metrics
      setSoilMoisture(p => Math.min(100, Math.max(0, p + getRandom(-2, 2))));
      setWindSpeed(ws => Math.max(0, ws + getRandom(-1, 1)));
      setUvIndex(uv => Math.max(0, Math.min(11, uv + getRandom(-0.5, 0.5))));
      
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);
  
  if (loading || !data || !weather) {
    return null; // Or a loading spinner
  }
  
  const pestForecast = getPestForecast(weather);

  return (
    <div className="grid gap-6 animate-in fade-in duration-500">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Weather & Disaster Insights</h1>
            <p className="text-muted-foreground">
            Monitor hyperlocal weather, soil conditions, and potential disaster risks.
            </p>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Local Weather</CardTitle>
          <CardDescription>Current conditions for {weather.district} and short-term forecast.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">
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
          <StatCard
            title="Wind Speed"
            value={`${windSpeed.toFixed(1)} km/h`}
            icon={<Wind className="h-6 w-6 text-muted-foreground" />}
            description="Current wind speed"
          />
          <StatCard
            title="UV Index"
            value={uvIndex.toFixed(1)}
            icon={<Sun className="h-6 w-6 text-muted-foreground" />}
            description="Sun intensity"
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
              <AreaChart data={rainfallPrediction}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} unit="mm" />
                <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
                <Area type="monotone" dataKey="rainfall" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.2)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Village-wise Weather Risk Meter</CardTitle>
            <CardDescription>Mock estimation of weather risk for your village.</CardDescription>
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
                              className="text-amber-500"
                              strokeDasharray={`${soilMoisture}, 100`}
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              strokeWidth="3"
                              strokeLinecap="round"
                          />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-4xl font-bold text-amber-500">{Math.round(soilMoisture)}%</span>
                          <span className="text-xs text-muted-foreground">Moderate</span>
                      </div>
                  </div>
              </div>
          </CardContent>
        </Card>
      </div>

       <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>7-Day Temperature Forecast</CardTitle>
            <CardDescription>Maximum temperature forecast for the week.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={tempForecast}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} unit="°C" domain={['dataMin - 2', 'dataMax + 2']}/>
                <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
                <Line type="monotone" dataKey="temp" stroke="hsl(var(--destructive))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>7-Day Humidity Forecast</CardTitle>
            <CardDescription>Relative humidity forecast for the week.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={humidityForecast}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} unit="%" domain={[0, 100]}/>
                <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
                <Area type="monotone" dataKey="humidity" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2) / 0.2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <WaterRequirementCalculator />
      
      <EvapotranspirationCalculator />
    </div>
  );
}
