import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Cloud, Sun, Thermometer, Wind, DollarSign, Book, Droplets } from "lucide-react";
import StatCard from "../shared/stat-card";
import weatherData from '@/data/weather.json';
import cropsData from '@/data/crops.json';
import soilData from '@/data/soil.json';
import mandiData from '@/data/mandi_prices.json';

// Mock data fetching
const weather = weatherData.weather[0];
const recommendedCrops = cropsData.crops.slice(0, 3);
const soilAdvice = soilData.soils[0];
const marketPrices = mandiData.prices.slice(0, 5);

export default function FarmerDashboard() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
          title="Soil Type"
          value={soilAdvice.name}
          icon={<Book className="h-6 w-6 text-muted-foreground" />}
          description="Your primary soil type"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Market Prices (Local Mandi)</CardTitle>
            <CardDescription>Live prices for key crops in your region.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Crop</TableHead>
                  <TableHead className="text-right">Min Price (₹/Quintal)</TableHead>
                  <TableHead className="text-right">Max Price (₹/Quintal)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {marketPrices.map((price) => (
                  <TableRow key={price.id}>
                    <TableCell className="font-medium">{price.crop}</TableCell>
                    <TableCell className="text-right">{price.min_price.toLocaleString('en-IN')}</TableCell>
                    <TableCell className="text-right">{price.max_price.toLocaleString('en-IN')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Crop Disease Alerts</CardTitle>
            <CardDescription>Based on weather and local reports.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center gap-4 p-4 bg-destructive/10 rounded-lg">
                <div className="bg-destructive/20 p-2 rounded-full"><Leaf className="w-5 h-5 text-destructive"/></div>
                <div>
                  <p className="font-semibold">Rice Blast Alert</p>
                  <p className="text-sm text-muted-foreground">High humidity increases risk. Monitor your fields.</p>
                </div>
            </div>
             <div className="flex items-center gap-4 p-4 bg-yellow-500/10 rounded-lg">
                <div className="bg-yellow-500/20 p-2 rounded-full"><Leaf className="w-5 h-5 text-yellow-600"/></div>
                <div>
                  <p className="font-semibold">Wheat Rust Watch</p>
                  <p className="text-sm text-muted-foreground">Cool, damp conditions are favorable. Inspect leaves.</p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Recommended Crops</CardTitle>
          <CardDescription>Based on current season, soil type, and water availability.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recommendedCrops.map((crop) => (
            <Card key={crop.id} className="overflow-hidden">
              <img src={crop.image} alt={crop.name} data-ai-hint="crop" width="400" height="200" className="h-40 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{crop.name}</h3>
                <p className="text-sm text-muted-foreground">Soil: {crop.soil_type}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {crop.fertilizers.slice(0, 2).map(f => <Badge key={f} variant="secondary">{f}</Badge>)}
                </div>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
