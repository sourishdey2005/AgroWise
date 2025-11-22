
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';
import { Truck, Warehouse, Route, Clock, Fuel, Map, FileCheck, CircleDot, Archive, Thermometer, Shield } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

const storageData = [
    { name: "Pune Central", capacity: 5000, load: 85 },
    { name: "Nashik Hub", capacity: 8000, load: 60 },
    { name: "Nagpur South", capacity: 4000, load: 95 },
];

const fleetData = [
    { id: 'TR-101', driver: 'S. Jadhav', capacity: '10 MT', status: 'Available' },
    { id: 'TR-102', driver: 'A. Patel', capacity: '15 MT', status: 'On-route' },
    { id: 'TR-103', driver: 'R. Singh', capacity: '10 MT', status: 'Available' },
];

const mandiTimeData = { 'Pune': 45, 'Nashik': 60, 'Nagpur': 35 };

const spoilageData = [
    { day: 0, spoilage: 0 }, { day: 1, spoilage: 0.5 }, { day: 2, spoilage: 1 },
    { day: 3, spoilage: 2 }, { day: 4, spoilage: 3.5 },
];

const inventoryAgeData = [
    { lot: 'WH-05-24', age: 2, status: 'Fresh' },
    { lot: 'ON-05-24', age: 5, status: 'Fresh' },
    { lot: 'PT-04-24', age: 12, status: 'Aging' },
];

export default function SupplyChainPage() {
    const [fuelCost, setFuelCost] = useState(95.50);
    const [distance, setDistance] = useState(150);

    useEffect(() => {
        const interval = setInterval(() => {
            setFuelCost(cost => parseFloat((cost + Math.random() * 0.5 - 0.25).toFixed(2)));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const totalFuelCost = (distance * fuelCost / 8).toFixed(2); // Assuming 8 km/l mileage

    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Supply Chain Optimization</h1>
                <p className="text-muted-foreground">Tools for managing transport, storage, and logistics.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Warehouse/> Cold-Storage Load Balancer</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {storageData.map(storage => (
                                <div key={storage.name}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="font-semibold">{storage.name}</span>
                                        <span className="text-muted-foreground">{storage.load}% Full</span>
                                    </div>
                                    <Progress value={storage.load} />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Clock /> Loading/Unloading Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Select defaultValue='Pune'>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(mandiTimeData).map(mandi => <SelectItem key={mandi} value={mandi}>{mandi} Mandi</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <p className="text-3xl font-bold text-center mt-4">~{mandiTimeData['Pune']} min</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Fuel /> Dynamic Fuel Cost Estimator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-baseline">
                           <p>Distance: <Input type="number" value={distance} onChange={e => setDistance(Number(e.target.value))} className="w-24 inline-block ml-2" /> km</p>
                           <p className="text-lg font-bold">₹{fuelCost.toFixed(2)}/L</p>
                        </div>
                        <p className="text-2xl font-bold text-primary text-center mt-4">Total: ₹{totalFuelCost}</p>
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Truck/> Driver & Fleet Allocator</CardTitle>
                    <CardDescription>Assign available vehicles to farm pickups.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Truck ID</TableHead><TableHead>Driver</TableHead><TableHead>Capacity</TableHead><TableHead>Status</TableHead><TableHead>Action</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {fleetData.map(truck => (
                                <TableRow key={truck.id}>
                                    <TableCell>{truck.id}</TableCell>
                                    <TableCell>{truck.driver}</TableCell>
                                    <TableCell>{truck.capacity}</TableCell>
                                    <TableCell><Badge variant={truck.status === 'Available' ? 'secondary' : 'outline'}>{truck.status}</Badge></TableCell>
                                    <TableCell><Button size="sm" variant="outline" disabled={truck.status !== 'Available'}>Assign</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader><CardTitle className="text-sm font-medium flex items-center gap-2"><Route/> Multi-Route Profit Calculator</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex justify-between p-2 rounded bg-primary/10 border-primary/20 border"><span>Route 1 (Pune)</span><span className="font-bold text-primary">+₹12,500</span></div>
                        <div className="flex justify-between p-2 rounded bg-secondary"><span>Route 2 (Nashik)</span><span className="font-bold">+₹10,800</span></div>
                        <div className="flex justify-between p-2 rounded bg-secondary"><span>Route 3 (Solapur)</span><span className="font-bold">+₹9,200</span></div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle className="text-sm font-medium flex items-center gap-2"><FileCheck/> Inter-State Permit Checker</CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <p>Pune &rarr; Hubli: <Badge variant="secondary">Not Required</Badge></p>
                            <p>Nagpur &rarr; Hyderabad: <Badge variant="destructive">Required</Badge></p>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className="text-sm font-medium flex items-center gap-2"><Archive /> Inventory Age Analyzer</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                           <TableHeader><TableRow><TableHead>Lot</TableHead><TableHead>Age</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {inventoryAgeData.map(item => (
                                    <TableRow key={item.lot}>
                                        <TableCell>{item.lot}</TableCell>
                                        <TableCell>{item.age} days</TableCell>
                                        <TableCell><Badge variant={item.status === 'Aging' ? 'destructive' : 'secondary'}>{item.status}</Badge></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><Thermometer/> Storage Duration Impact (Tomato)</CardTitle></CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                             <LineChart data={spoilageData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <XAxis dataKey="day" unit="d" />
                                <YAxis dataKey="spoilage" unit="%" />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }}/>
                                <Line type="monotone" dataKey="spoilage" name="Spoilage" stroke="hsl(var(--destructive))" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><Shield /> Spoilage Risk Predictor</CardTitle></CardHeader>
                    <CardContent className="flex flex-col items-center justify-center">
                        <p>Route: Pune &rarr; Bangalore (24hr)</p>
                        <p className="text-4xl font-bold text-amber-600 my-2">12% Risk</p>
                        <p className="text-xs text-muted-foreground">High humidity forecast. Recommend reefer van.</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Map/> Farm Cluster Mapping</CardTitle></CardHeader>
                <CardContent className="flex justify-center items-center bg-secondary/30 rounded-lg aspect-video p-4">
                     <div className="w-full h-full flex justify-around items-center">
                        <div className="text-center">
                            <p className="font-bold">Cluster A</p>
                            <CircleDot className="text-blue-500 my-2"/>
                            <p className="text-xs">3 Farms</p>
                        </div>
                        <div className="text-center">
                            <p className="font-bold">Cluster B</p>
                            <CircleDot className="text-green-500 my-2"/>
                            <p className="text-xs">5 Farms</p>
                        </div>
                        <div className="text-center">
                            <p className="font-bold">Cluster C</p>
                            <CircleDot className="text-red-500 my-2"/>
                            <p className="text-xs">2 Farms</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
