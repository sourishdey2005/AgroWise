import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StatCard from "../shared/stat-card";
import { Users, AlertCircle, CheckCircle, Mail } from "lucide-react";
import farmerData from "@/data/farmers.json";
import { FarmerProfile } from "@/lib/types";

const farmers: FarmerProfile[] = farmerData.farmers;
const totalFarmers = farmers.length;
const issuesCount = farmers.reduce((acc, farmer) => acc + farmer.issues.length, 0);

export default function AgentDashboard() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Farmers"
          value={totalFarmers.toString()}
          icon={<Users className="h-6 w-6 text-muted-foreground" />}
          description="Farmers in your assigned region"
        />
        <StatCard
          title="Open Issues"
          value={issuesCount.toString()}
          icon={<AlertCircle className="h-6 w-6 text-muted-foreground" />}
          description="Active requests from farmers"
        />
        <StatCard
          title="Visits Completed"
          value="3"
          icon={<CheckCircle className="h-6 w-6 text-muted-foreground" />}
          description="This month"
        />
         <StatCard
          title="Advisories Sent"
          value="12"
          icon={<Mail className="h-6 w-6 text-muted-foreground" />}
          description="This month"
        />
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Farmer Requests & Issues</CardTitle>
          <CardDescription>Active issues and requests from farmers in your region.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Farmer</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Issues</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {farmers.map((farmer) => (
                <TableRow key={farmer.id}>
                  <TableCell>
                    <div className="font-medium">{farmer.name}</div>
                    <div className="text-sm text-muted-foreground">{farmer.phone}</div>
                  </TableCell>
                  <TableCell>{farmer.region}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {farmer.issues.map((issue, index) => (
                        <Badge key={index} variant="outline" className="text-amber-700 border-amber-300">{issue}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{farmer.last_visit ? farmer.last_visit : <Badge variant="destructive">Pending</Badge>}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">Update Status</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
       <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Crop Advisory Panel</CardTitle>
            <CardDescription>Send advisories to farmers.</CardDescription>
          </CardHeader>
          <CardContent>
             {/* Placeholder for a form to send advisories */}
             <div className="flex flex-col gap-4">
                <textarea placeholder="Write your advisory message here..." className="p-2 border rounded-md min-h-24 bg-background"></textarea>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">Target: All Farmers in Maharashtra</p>
                    <Button>Send Advisory</Button>
                </div>
             </div>
          </CardContent>
        </Card>
    </div>
  );
}
