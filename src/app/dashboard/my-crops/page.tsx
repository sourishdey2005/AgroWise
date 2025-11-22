"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Wheat, Droplets, Thermometer } from "lucide-react";
import cropsData from "@/data/crops.json";
import type { Crop } from "@/lib/types";

export default function MyCropsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [soilFilter, setSoilFilter] = useState("all");
  
  const allCrops: Crop[] = cropsData.crops;

  const filteredCrops = allCrops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSoil = soilFilter === 'all' || crop.soil_type.toLowerCase().includes(soilFilter.toLowerCase());
    return matchesSearch && matchesSoil;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Crop Information Hub</h1>
        <p className="text-muted-foreground">
          Search for crops to get detailed information about their ideal growing conditions.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-1/2 lg:w-1/3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for crops..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 items-center">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={soilFilter} onValueChange={setSoilFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by soil type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Soil Types</SelectItem>
                        <SelectItem value="alluvial">Alluvial</SelectItem>
                        <SelectItem value="black">Black Soil</SelectItem>
                        <SelectItem value="loamy">Loamy</SelectItem>
                        <SelectItem value="sandy">Sandy</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredCrops.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCrops.map((crop) => (
                <Card key={crop.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{crop.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-4">
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-primary" />
                        <span><strong>Temperature:</strong> {crop.ideal_temperature}</span>
                      </div>
                       <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-primary" />
                        <span><strong>Rainfall:</strong> {crop.rainfall}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wheat className="h-4 w-4 text-primary" />
                        <span><strong>Soil Type:</strong> {crop.soil_type}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
                <p>No crops found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
