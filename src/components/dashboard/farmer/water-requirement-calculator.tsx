
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Info, Loader2, Calculator } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  cropName: z.string().min(1, "Please select a crop"),
  growthStage: z.enum(["initial", "development", "mid-season", "late-season"]),
  temperature: z.coerce.number().positive("Temperature must be a positive number"),
  humidity: z.coerce.number().min(0, "Humidity must be >= 0").max(100, "Humidity must be between 0 and 100"),
});

type CalculatorResult = {
  waterNeeded: number;
  advice: string;
};

export default function WaterRequirementCalculator(): JSX.Element {
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<CalculatorResult | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropName: "",
      growthStage: "development",
      temperature: 35,
      humidity: 60,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);

    // Mock calculation logic (very simplified)
    let baseWater = 25; // Base water in mm
    if (values.cropName === "rice" || values.cropName === "sugarcane") {
      baseWater = 40;
    }

    let stageMultiplier = 1.0;
    if (values.growthStage === "development") stageMultiplier = 1.2;
    if (values.growthStage === "mid-season") stageMultiplier = 1.5;
    if (values.growthStage === "late-season") stageMultiplier = 0.8;

    const tempFactor = values.temperature > 30 ? (values.temperature - 30) / 5 : 0;
    const humidityFactor = values.humidity < 50 ? (50 - values.humidity) / 10 : 0;

    const waterNeeded = Math.round(baseWater * stageMultiplier + tempFactor + humidityFactor);

    let advice = "Standard irrigation recommended. Monitor soil moisture levels.";
    if (waterNeeded > 45) {
      advice = "High water requirement. Ensure frequent irrigation to avoid crop stress.";
    } else if (waterNeeded < 20) {
      advice = "Low water requirement. Be cautious of over-watering.";
    }

    setTimeout(() => {
      setResult({ waterNeeded, advice });
      setIsLoading(false);
    }, 1000);
  }

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Droplets className="text-primary" />
          <span>Water Requirement Calculator</span>
        </CardTitle>
        <CardDescription>
          Estimate the weekly water requirement for your crop based on current conditions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="cropName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Your Crop</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a crop" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rice">Basmati Rice</SelectItem>
                          <SelectItem value="wheat">Wheat</SelectItem>
                          <SelectItem value="sugarcane">Sugarcane</SelectItem>
                          <SelectItem value="cotton">Cotton</SelectItem>
                          <SelectItem value="maize">Maize</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="growthStage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crop Growth Stage</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select growth stage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="initial">Initial Stage</SelectItem>
                          <SelectItem value="development">Development Stage</SelectItem>
                          <SelectItem value="mid-season">Mid-Season</SelectItem>
                          <SelectItem value="late-season">Late Season</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="temperature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Avg. Temp (°C)</FormLabel>
                      <FormControl>
                        {/* react-hook-form field already manages value/onChange; keep input type=number */}
                        <Input type="number" placeholder="e.g., 35" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="humidity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Avg. Humidity (%)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 60" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate Water Needs
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="bg-secondary/50 rounded-lg p-6 flex items-center justify-center">
            {!result && !isLoading && (
              <div className="text-center text-muted-foreground">
                <Droplets className="mx-auto h-12 w-12" />
                <p className="mt-4">Your water requirement will appear here.</p>
              </div>
            )}

            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin mb-4" />
                <p>Analyzing conditions...</p>
              </div>
            )}

            {result && (
              <div className="text-center animate-in fade-in duration-500">
                <p className="text-muted-foreground">Estimated Water Needed</p>
                <p className="text-7xl font-bold my-2 text-blue-500">
                  {result.waterNeeded} <span className="text-2xl">mm/week</span>
                </p>
                <Alert className="text-left mt-4">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Irrigation Advice</AlertTitle>
                  <AlertDescription>{result.advice}</AlertDescription>
                </Alert>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
