import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import StatCard from "../shared/stat-card";
import { AreaChart, Bell, Droplets, Globe } from "lucide-react";
import { GovernmentScheme } from "@/lib/types";
import schemeData from "@/data/schemes.json";
import AdminAdvisoryTool from "./gov/admin-advisory-tool";

const schemes: GovernmentScheme[] = schemeData.schemes;

const productionData = [
  { name: 'Wheat', total: 107.6 },
  { name: 'Rice', total: 122.3 },
  { name: 'Maize', total: 31.5 },
  { name: 'Sugarcane', total: 370.5 },
  { name: 'Cotton', total: 35.4 },
];

export default function GovernmentDashboard() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Crop Production"
          value="667.3 M Tonnes"
          icon={<AreaChart className="h-6 w-6 text-muted-foreground" />}
          description="Annual Estimate"
        />
        <StatCard
          title="Subsidies Disbursed"
          value="₹1.2 Lakh Cr"
          icon={<Globe className="h-6 w-6 text-muted-foreground" />}
          description="This fiscal year"
        />
        <StatCard
          title="Active Schemes"
          value={schemes.length.toString()}
          icon={<Bell className="h-6 w-6 text-muted-foreground" />}
          description="Nationwide farmer schemes"
        />
        <StatCard
          title="Monsoon Forecast"
          value="98% of LPA"
          icon={<Droplets className="h-6 w-6 text-muted-foreground" />}
          description="IMD Long Period Average"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Crop Production Statistics</CardTitle>
            <CardDescription>Major crop production in million tonnes (annual).</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productionData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Government Notifications</CardTitle>
            <CardDescription>Key schemes and policies.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Scheme Title</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schemes.map((scheme) => (
                  <TableRow key={scheme.id}>
                    <TableCell className="font-medium">{scheme.title}</TableCell>
                    <TableCell className="text-right text-green-600">Active</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <AdminAdvisoryTool />
    </div>
  );
}
