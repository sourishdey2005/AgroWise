"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, AreaChart, Area } from 'recharts';
import { Atom, Wind, Sun, Leaf, Thermometer, Droplets, Bug } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const pestMovementData = [
  { time: '10:00', zoneA: 5, zoneB: 8, zoneC: 2 },
  { time: '11:00', zoneA: 6, zoneB: 7, zoneC: 3 },
  { time: '12:00', zoneA: 4, zoneB: 9, zoneC: 4 },
  { time: '13:00', zoneA: 7, zoneB: 6, zoneC: 5 },
  { time: '14:00', zoneA: 8, zoneB: 5, zoneC: 6 },
];

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

export default function SmartFarmingPage() {
  const [temp, setTemp] = useState(34.5);
  const [humidity, setHumidity] = useState(55);
  const [aqi, setAqi] = useState(45);
  const [solarPerformance, setSolarPerformance] = useState(85);
  const [windSpeed, setWindSpeed] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setTemp(t => parseFloat((t + getRandom(-0.2, 0.2)).toFixed(1)));
      setHumidity(h => Math.min(100, Math.max(0, h + getRandom(-1, 1))));
      setAqi(a => Math.min(200, Math.max(10, a + getRandom(-2, 2))));
      setSolarPerformance(p => Math.min(100, Math.max(20, p + getRandom(-1, 1))));
      setWindSpeed(w => Math.max(0, w + getRandom(-0.5, 0.5)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getAqiInfo = (value: number) => {
    if (value <= 50) return { label: 'Good', color: 'text-green-500', advice: 'Ideal conditions for crop growth.' };
    if (value <= 100) return { label: 'Moderate', color: 'text-yellow-500', advice: 'Minor impact on sensitive crops.' };
    if (value <= 150) return { label: 'Unhealthy', color: 'text-orange-500', advice: 'May affect crop respiration. Monitor closely.' };
    return { label: 'Hazardous', color: 'text-red-500', advice: 'High risk of damage to crops.' };
  };

  const getWindImpact = (speed: number) => {
      if (speed < 5) return "Light breeze, no impact.";
      if (speed < 15) return "Moderate breeze, aids in pollination.";
      if (speed < 25) return "Strong breeze, may cause some physical stress.";
      return "High winds, risk of lodging and damage.";
  }

  const aqiInfo = getAqiInfo(aqi);
  const windImpact = getWindImpact(windSpeed);

  return (
    <div className="grid gap-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Smart Farming Analytics</h1>
        <p className="text-muted-foreground">
          Advanced sensor data and analytics for your farm.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bug /> Real-Time Pest Movement</CardTitle>
          <CardDescription>Mock visualization of pest activity across farm zones.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={pestMovementData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
              <Legend />
              <Line type="monotone" dataKey="zoneA" name="Zone A (Wheat)" stroke="hsl(var(--chart-1))" />
              <Line type="monotone" dataKey="zoneB" name="Zone B (Cotton)" stroke="hsl(var(--chart-2))" />
              <Line type="monotone" dataKey="zoneC" name="Zone C (Veg)" stroke="hsl(var(--chart-3))" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Thermometer/> Farm Sensor Data</CardTitle>
                  <CardDescription>Live from field sensor #FS-001</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="flex justify-around text-center">
                      <div>
                          <p className="text-4xl font-bold">{temp.toFixed(1)}°C</p>
                          <p className="text-sm text-muted-foreground">Temperature</p>
                      </div>
                       <div>
                          <p className="text-4xl font-bold">{Math.round(humidity)}%</p>
                          <p className="text-sm text-muted-foreground">Humidity</p>
                      </div>
                  </div>
              </CardContent>
          </Card>
          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Leaf/> Air Quality (AQI)</CardTitle>
                  <CardDescription>Impact on crop health.</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                  <p className={`text-5xl font-bold ${aqiInfo.color}`}>{Math.round(aqi)}</p>
                  <p className={`font-semibold ${aqiInfo.color}`}>{aqiInfo.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{aqiInfo.advice}</p>
              </CardContent>
          </Card>
           <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Wind/> Wind Speed Impact</CardTitle>
                  <CardDescription>Current wind conditions.</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                  <p className="text-5xl font-bold">{windSpeed.toFixed(1)} <span className="text-2xl text-muted-foreground">km/h</span></p>
                  <p className="text-sm text-muted-foreground mt-2">{windImpact}</p>
              </CardContent>
          </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Sun/> Solar Irrigation Performance</CardTitle>
          <CardDescription>Efficiency of your solar-powered water pumps.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span className="font-medium">Current Performance</span>
                    <span className="font-bold text-primary">{Math.round(solarPerformance)}%</span>
                </div>
                <Progress value={solarPerformance} />
                <p className="text-xs text-muted-foreground">System is operating at optimal capacity.</p>
            </div>
        </CardContent>
      </Card>
      
    </div>
  );
}
