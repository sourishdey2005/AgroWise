
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { MapPin, Truck, Percent, Box, CalendarCheck, Lightbulb } from 'lucide-react';
import { useData } from '@/hooks/use-data';

const coldStorages = [
  { id: 1, name: "FreshKeep Cold Storage", distance: "12 km", capacity: "500 MT", contact: "9876543210" },
  { id: 2, name: "Himalaya Cold Chain", distance: "18 km", capacity: "1000 MT", contact: "9876543211" },
  { id: 3, name: "AgriCool Solutions", distance: "25 km", capacity: "750 MT", contact: "9876543212" },
];

const POST_HARVEST_STORAGE_KEY = 'postHarvestData';

type PostHarvestState = {
  transportCost: { distance: number; costPerKm: number; total: number };
  commission: { price: number; rate: number; total: number };
  postHarvestLoss: { quantity: number; lossRate: number; total: number };
};

export default function PostHarvestPage() {
  const { data, loading } = useData();

  const [calculators, setCalculators] = useState<PostHarvestState>({
    transportCost: { distance: 50, costPerKm: 15, total: 750 },
    commission: { price: 2150, rate: 8, total: 172 },
    postHarvestLoss: { quantity: 100, lossRate: 5, total: 5 },
  });
  
  const [bestDay, setBestDay] = useState({ day: "Wednesday", reason: "Highest average sale price based on last month's data." });

  useEffect(() => {
    try {
        const savedData = localStorage.getItem(POST_HARVEST_STORAGE_KEY);
        if (savedData) {
            const parsed = JSON.parse(savedData);
            setCalculators(c => ({...c, ...parsed}));
        }
    } catch (e) {
        console.error("Failed to load post-harvest data from localStorage", e);
    }
  }, []);

  const saveToLocalStorage = (data: Partial<PostHarvestState>) => {
    try {
        const currentData = JSON.parse(localStorage.getItem(POST_HARVEST_STORAGE_KEY) || '{}');
        const newData = { ...currentData, ...data };
        localStorage.setItem(POST_HARVEST_STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
        console.error("Failed to save post-harvest data to localStorage", e);
    }
  }


  const handleTransportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCalculators(prev => {
        const newValues = { ...prev.transportCost, [name]: Number(value) };
        newValues.total = newValues.distance * newValues.costPerKm;
        const newState = { ...prev, transportCost: newValues };
        saveToLocalStorage({ transportCost: newValues });
        return newState;
    });
  };
  
  const handleCommissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
     setCalculators(prev => {
        const newValues = { ...prev.commission, [name]: Number(value) };
        newValues.total = (newValues.price * newValues.rate) / 100;
        const newState = { ...prev, commission: newValues };
        saveToLocalStorage({ commission: newValues });
        return newState;
    });
  };

  const handleLossChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCalculators(prev => {
        const newValues = { ...prev.postHarvestLoss, [name]: Number(value) };
        newValues.total = (newValues.quantity * newValues.lossRate) / 100;
        const newState = { ...prev, postHarvestLoss: newValues };
        saveToLocalStorage({ postHarvestLoss: newValues });
        return newState;
    });
  };

  if (loading || !data) return null;
  
  const priceTrends = data.historicalPriceTrends.wheat_5_year;

  return (
    <div className="grid gap-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Post-Harvest Logistics</h1>
        <p className="text-muted-foreground">Manage storage, transport, and sale of your produce.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><MapPin /> Nearest Cold Storage Locator</CardTitle>
          <CardDescription>Find cold storage facilities in your vicinity.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coldStorages.map((storage) => (
                <TableRow key={storage.id}>
                  <TableCell className="font-medium">{storage.name}</TableCell>
                  <TableCell>{storage.distance}</TableCell>
                  <TableCell>{storage.capacity}</TableCell>
                  <TableCell>{storage.contact}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Truck /> Transport Cost Estimator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
              <div>
                  <label className="text-sm font-medium">Distance to Mandi (km)</label>
                  <Input name="distance" type="number" value={calculators.transportCost.distance} onChange={handleTransportChange} />
              </div>
              <div>
                  <label className="text-sm font-medium">Cost per km (₹)</label>
                  <Input name="costPerKm" type="number" value={calculators.transportCost.costPerKm} onChange={handleTransportChange} />
              </div>
              <div className="text-center bg-secondary p-4 rounded-md">
                <p className="text-muted-foreground">Estimated Transport Cost</p>
                <p className="text-2xl font-bold text-primary">₹{calculators.transportCost.total.toLocaleString('en-IN')}</p>
              </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Percent /> Middlemen Commission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
              <div>
                  <label className="text-sm font-medium">Sale Price/Quintal (₹)</label>
                  <Input name="price" type="number" value={calculators.commission.price} onChange={handleCommissionChange} />
              </div>
              <div>
                  <label className="text-sm font-medium">Commission Rate (%)</label>
                  <Input name="rate" type="number" value={calculators.commission.rate} onChange={handleCommissionChange} />
              </div>
              <div className="text-center bg-secondary p-4 rounded-md">
                <p className="text-muted-foreground">Predicted Commission</p>
                <p className="text-2xl font-bold text-primary">₹{calculators.commission.total.toLocaleString('en-IN')} / Quintal</p>
              </div>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Box /> Post-Harvest Loss Estimator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
              <div>
                  <label className="text-sm font-medium">Total Quantity (Quintal)</label>
                  <Input name="quantity" type="number" value={calculators.postHarvestLoss.quantity} onChange={handleLossChange} />
              </div>
              <div>
                  <label className="text-sm font-medium">Est. Loss Rate (%)</label>
                  <Input name="lossRate" type="number" value={calculators.postHarvestLoss.lossRate} onChange={handleLossChange} />
              </div>
              <div className="text-center bg-secondary p-4 rounded-md">
                <p className="text-muted-foreground">Estimated Loss</p>
                <p className="text-2xl font-bold text-destructive">{calculators.postHarvestLoss.total.toLocaleString('en-IN')} Quintal</p>
              </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>5-Year Price Trend (Wheat)</CardTitle>
          <CardDescription>Historical Mandi prices per quintal.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={priceTrends}>
              <XAxis dataKey="year" />
              <YAxis unit="₹" domain={['dataMin - 200', 'dataMax + 200']} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
              <Legend />
              <Line type="monotone" dataKey="min_price" name="Minimum Price" stroke="hsl(var(--chart-2))" />
              <Line type="monotone" dataKey="max_price" name="Maximum Price" stroke="hsl(var(--chart-1))" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="bg-primary/10 border-primary/30">
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
                <Lightbulb /> Best Mandi Day Predictor
            </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
            <p className="text-3xl font-bold text-primary">{bestDay.day}</p>
            <p className="text-sm text-muted-foreground mt-1">{bestDay.reason}</p>
        </CardContent>
      </Card>
    </div>
  );
}
