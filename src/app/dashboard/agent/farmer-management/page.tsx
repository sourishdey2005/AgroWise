"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Search, UserCheck, CalendarDays, ClipboardList, MessageSquare, BarChart2 } from 'lucide-react';
import farmerData from '@/data/farmers.json';
import { FarmerProfile } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const initialFarmers: FarmerProfile[] = farmerData.farmers;

const visitCompletionData = [
    { name: 'Week 1', completed: 4, scheduled: 5 },
    { name: 'Week 2', completed: 3, scheduled: 4 },
    { name: 'Week 3', completed: 5, scheduled: 5 },
    { name: 'This Week', completed: 1, scheduled: 3 },
];

export default function FarmerManagementPage() {
    const [farmers, setFarmers] = useState<FarmerProfile[]>(initialFarmers);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    
    const filteredFarmers = farmers.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="grid gap-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Farmer Management</h1>
                <p className="text-muted-foreground">
                    Manage farmers, track issues, and plan field visits.
                </p>
            </div>

            {/* Farmer Registry */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><UserCheck /> Farmer Registry</CardTitle>
                    <CardDescription>A list of all farmers in your assigned region.</CardDescription>
                    <div className="relative w-full max-w-sm pt-4">
                        <Search className="absolute left-2.5 top-6 h-4 w-4 text-muted-foreground" />
                        <Input 
                            placeholder="Search by farmer name..." 
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Region</TableHead>
                                <TableHead>Profile Score</TableHead>
                                <TableHead>Open Issues</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredFarmers.map(farmer => (
                                <TableRow key={farmer.id}>
                                    <TableCell className="font-medium">{farmer.name}</TableCell>
                                    <TableCell>{farmer.region}</TableCell>
                                    <TableCell>
                                        <Badge variant={farmer.profile_score && farmer.profile_score > 75 ? "default" : "outline"}>
                                            {farmer.profile_score || 'N/A'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{farmer.issues.length}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                 {/* Farmer Issue Tickets */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><ClipboardList /> Farmer Issue Tickets</CardTitle>
                        <CardDescription>Active issues reported by farmers.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Farmer</TableHead>
                                    <TableHead>Issue</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {farmers.filter(f => f.issues.length > 0).map(farmer => (
                                    <TableRow key={farmer.id}>
                                        <TableCell>{farmer.name}</TableCell>
                                        <TableCell>{farmer.issues[0]}</TableCell>
                                        <TableCell>
                                            <Button variant="outline" size="sm">Resolve</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                {/* Field Visit Completion */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BarChart2 /> Field Visit Metrics</CardTitle>
                        <CardDescription>Weekly visit completion rate.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={visitCompletionData}>
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
                                <Bar dataKey="completed" name="Completed" fill="hsl(var(--primary))" radius={4} />
                                <Bar dataKey="scheduled" name="Scheduled" fill="hsl(var(--secondary))" radius={4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
                 {/* Field Visit Planner */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><CalendarDays /> Field Visit Planner</CardTitle>
                        <CardDescription>Schedule and view upcoming visits.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            className="rounded-md border"
                        />
                    </CardContent>
                </Card>

                {/* Farmer Communication Log */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><MessageSquare /> Farmer Communication Log</CardTitle>
                        <CardDescription>Log your interactions with farmers.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a farmer..." />
                            </SelectTrigger>
                            <SelectContent>
                                {farmers.map(f => <SelectItem key={f.id} value={String(f.id)}>{f.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Textarea placeholder="Log details of your conversation or visit..." />
                        <Button className="w-full">Save Log</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
