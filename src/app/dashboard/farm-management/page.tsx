"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tractor, DollarSign, Package, Wrench, Droplets, Calendar as CalendarIcon } from "lucide-react";
import React from "react";

const tasks = {
  daily: [
    { id: 1, name: "Check irrigation system", completed: true },
    { id: 2, name: "Scout for pests in Block A", completed: false },
    { id: 3, name: "Monitor soil moisture", completed: true },
  ],
  weekly: [
    { id: 1, name: "Apply fertilizer to wheat crop", completed: false },
    { id: 2, name: "Review market prices for corn", completed: true },
    { id: 3, name: "Plan next week's tasks", completed: false },
  ],
};

const ledger = [
  { id: 1, date: "2024-05-20", description: "Sold 10 quintals of wheat", type: "income", amount: 21500 },
  { id: 2, date: "2024-05-18", description: "Purchased DAP fertilizer", type: "expense", amount: -2500 },
  { id: 3, date: "2024-05-15", description: "Tractor diesel", type: "expense", amount: -1200 },
  { id: 4, date: "2024-05-12", description: "Sold vegetables at local market", type: "income", amount: 3500 },
];

const inventory = [
    { id: 1, item: "Basmati Rice Seeds", quantity: "20 kg", status: "In Stock" },
    { id: 2, item: "Urea Fertilizer", quantity: "5 bags", status: "In Stock" },
    { id: 3, item: "Spade", quantity: "2 units", status: "In Stock" },
    { id: 4, item: "Pesticide (Chlorpyrifos)", quantity: "1 Liter", status: "Low Stock" },
];

const maintenanceSchedule = [new Date(2024, 6, 5), new Date(2024, 6, 18)]; // July 5th and 18th

const irrigationSchedule = [
    { id: 1, crop: "Basmati Rice", plot: "Plot A", nextIrrigation: "2024-07-02", frequency: "Every 3 days" },
    { id: 2, crop: "Maize", plot: "Plot B", nextIrrigation: "2024-07-04", frequency: "Every 5 days" },
];

export default function FarmManagementPage() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    
  return (
    <div className="grid gap-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Farm Management</h1>
        <p className="text-muted-foreground">
          Organize your tasks, track finances, and manage your farm resources.
        </p>
      </div>

      {/* Task Tracker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Tractor /> Farm Task Tracker</CardTitle>
          <CardDescription>Stay on top of your daily and weekly farm activities.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="daily">
            <TabsList>
              <TabsTrigger value="daily">Daily Tasks</TabsTrigger>
              <TabsTrigger value="weekly">Weekly Tasks</TabsTrigger>
            </TabsList>
            <TabsContent value="daily">
                <Table>
                    <TableBody>
                        {tasks.daily.map(task => (
                            <TableRow key={task.id}>
                                <TableCell className="flex items-center gap-4">
                                    <Checkbox checked={task.completed} />
                                    <span className={task.completed ? "text-muted-foreground line-through" : ""}>{task.name}</span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TabsContent>
            <TabsContent value="weekly">
                 <Table>
                    <TableBody>
                        {tasks.weekly.map(task => (
                            <TableRow key={task.id}>
                                <TableCell className="flex items-center gap-4">
                                    <Checkbox checked={task.completed} />
                                    <span className={task.completed ? "text-muted-foreground line-through" : ""}>{task.name}</span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Expenses & Income Ledger */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><DollarSign /> Expenses & Income Ledger</CardTitle>
            <CardDescription>Track your farm's financial health.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount (₹)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ledger.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>
                        <div>{item.description}</div>
                        <div className="text-xs text-muted-foreground">{item.date}</div>
                    </TableCell>
                    <TableCell className={`text-right font-medium ${item.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {item.type === 'income' ? '+' : ''}{item.amount.toLocaleString('en-IN')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Farm Inventory Tracker */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Package /> Farm Inventory Tracker</CardTitle>
            <CardDescription>Keep track of your seeds, fertilizers, and tools.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventory.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.item}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === "Low Stock" ? "destructive" : "secondary"}>{item.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
         {/* Machinery Maintenance Calendar */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Wrench /> Machinery Maintenance</CardTitle>
                <CardDescription>Upcoming service dates for your equipment.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
                 <Calendar
                    mode="multiple"
                    selected={maintenanceSchedule}
                    className="rounded-md border"
                    components={{ Day: ({ ...props }) => {
                        const isMaintenance = maintenanceSchedule.some(d => d.getTime() === props.date.getTime());
                        return (
                            <div className={isMaintenance ? "relative" : ""}>
                                <div {...props.buttonProps} className={`p-2 ${isMaintenance ? 'bg-amber-200 rounded-md' : ''}`}>{props.date.getDate()}</div>
                            </div>
                        );
                    }}}
                />
            </CardContent>
        </Card>
        {/* Irrigation Planner */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Droplets /> Irrigation Planner</CardTitle>
                <CardDescription>Schedule and monitor your crop watering.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Crop</TableHead>
                            <TableHead>Next Irrigation</TableHead>
                            <TableHead>Frequency</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {irrigationSchedule.map(item => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.crop}</TableCell>
                                <TableCell>{item.nextIrrigation}</TableCell>
                                <TableCell>{item.frequency}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
