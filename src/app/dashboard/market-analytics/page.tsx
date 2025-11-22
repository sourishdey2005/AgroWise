"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip, CartesianGrid, AreaChart, Area } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DollarSign, BarChart, AlertTriangle, CheckCircle, Calculator } from "lucide-react";
import StatCard from "@/components/shared/stat-card";
import mandiData from '@/data/mandi_prices.json';
import priceTrendData from '@/data/price-trends.json';
import type { MandiPrice } from "@/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const initialMarketPrices = mandiData.prices.slice(0, 5);
const trend7Day = priceTrendData.trends.wheat_7_day;
const trend30Day = priceTrendData.trends.wheat_30_day;

// Function to generate a random number within a range
const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

const profitabilitySchema = z.object({
  cost: z.coerce.number().positive("Must be positive"),
  yield: z.coerce.number().positive("Must be positive"),
  price: z.coerce.number().positive("Must be positive"),
});

export default function MarketAnalyticsPage() {
  const [marketPrices, setMarketPrices] = useState<MandiPrice[]>(initialMarketPrices);
  const [volatility, setVolatility] = useState(25);
  const [profit, setProfit] = useState<number | null>(null);

  const form = useForm<z.infer<typeof profitabilitySchema>>({
    resolver: zodResolver(profitabilitySchema),
    defaultValues: {
      cost: 5000,
      yield: 20,
      price: 2150,
    },
  });


  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate market price fluctuations
      setMarketPrices(prevPrices => prevPrices.map(price => ({
        ...price,
        min_price: Math.round(price.min_price * getRandom(0.98, 1.02)),
        max_price: Math.round(price.max_price * getRandom(0.98, 1.02)),
      })));
      setVolatility(v => Math.min(100, Math.max(0, v + getRandom(-3, 3))));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  function onProfitabilitySubmit(values: z.infer<typeof profitabilitySchema>) {
    const revenue = values.yield * values.price;
    const netProfit = revenue - values.cost;
    setProfit(netProfit);
  }


  return (
    <div className="grid gap-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Market Analytics</h1>
        <p className="text-muted-foreground">
          Analyze market prices, trends, and profitability for your crops.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Nearby Mandi Prices</CardTitle>
            <CardDescription>Live prices from your local market.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Crop</TableHead>
                  <TableHead>Min Price (₹/Quintal)</TableHead>
                  <TableHead>Max Price (₹/Quintal)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {marketPrices.map((price) => (
                  <TableRow key={price.id}>
                    <TableCell className="font-medium">{price.crop}</TableCell>
                    <TableCell>₹{price.min_price.toLocaleString('en-IN')}</TableCell>
                    <TableCell>₹{price.max_price.toLocaleString('en-IN')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Price Volatility</CardTitle>
              <CardDescription>Current market stability</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="relative h-32 w-32 mx-auto">
                      <svg className="h-full w-full" viewBox="0 0 36 36">
                          <path
                              className="text-secondary"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              strokeWidth="3"
                          />
                          <path
                              className={volatility > 70 ? "text-red-500" : volatility > 40 ? "text-amber-500" : "text-green-500"}
                              strokeDasharray={`${volatility}, 100`}
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              strokeWidth="3"
                              strokeLinecap="round"
                          />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-4xl font-bold">{Math.round(volatility)}%</span>
                          <span className="text-xs text-muted-foreground">
                            {volatility > 70 ? "High" : volatility > 40 ? "Medium" : "Low"}
                          </span>
                      </div>
                  </div>
            </CardContent>
          </Card>
          <Card className="bg-primary/10 border-primary/30">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="text-primary"/>
                    <span>Best Selling Time</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-center text-xl font-bold text-primary">HOLD</p>
                <p className="text-center text-xs text-muted-foreground mt-1">Prices are trending up. Consider waiting for a better price.</p>
            </CardContent>
          </Card>
        </div>
      </div>

       <Card>
        <CardHeader>
            <CardTitle>Price Trends (Wheat)</CardTitle>
            <CardDescription>Visualize price changes over different periods.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="7day">
                <TabsList>
                    <TabsTrigger value="7day">7 Days</TabsTrigger>
                    <TabsTrigger value="30day">30 Days</TabsTrigger>
                </TabsList>
                <TabsContent value="7day">
                    <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={trend7Day}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis fontSize={12} tickLine={false} axisLine={false} unit="₹" domain={['dataMin - 50', 'dataMax + 50']} />
                        <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
                        <Area type="monotone" dataKey="price" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.2)" strokeWidth={2} />
                    </AreaChart>
                    </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="30day">
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={trend30Day}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis fontSize={12} tickLine={false} axisLine={false} unit="₹" domain={['dataMin - 50', 'dataMax + 50']}/>
                            <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
                            <Line type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
      
       <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Calculator />
                <span>Crop Profitability Calculator</span>
            </CardTitle>
            <CardDescription>Estimate your potential profit per acre.</CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={form.handleSubmit(onProfitabilitySubmit)} className="grid md:grid-cols-4 gap-4 items-end">
                <div className="grid gap-2">
                    <label htmlFor="cost" className="text-sm font-medium">Total Cost (₹/acre)</label>
                    <Input id="cost" type="number" {...form.register("cost")} />
                     {form.formState.errors.cost && <p className="text-xs text-destructive">{form.formState.errors.cost.message}</p>}
                </div>
                <div className="grid gap-2">
                    <label htmlFor="yield" className="text-sm font-medium">Est. Yield (Quintal/acre)</label>
                    <Input id="yield" type="number" {...form.register("yield")} />
                     {form.formState.errors.yield && <p className="text-xs text-destructive">{form.formState.errors.yield.message}</p>}
                </div>
                <div className="grid gap-2">
                    <label htmlFor="price" className="text-sm font-medium">Market Price (₹/Quintal)</label>
                    <Input id="price" type="number" {...form.register("price")} />
                     {form.formState.errors.price && <p className="text-xs text-destructive">{form.formState.errors.price.message}</p>}
                </div>
                <Button type="submit">Calculate Profit</Button>
            </form>
            {profit !== null && (
                <div className="mt-6 text-center">
                    <p className="text-muted-foreground">Estimated Net Profit</p>
                    <p className={`text-4xl font-bold ${profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ₹{profit.toLocaleString('en-IN')} / acre
                    </p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
