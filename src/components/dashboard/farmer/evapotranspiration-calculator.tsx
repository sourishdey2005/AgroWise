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
import { Wind, Sun, Info, Loader2, Calculator } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  cropName: z.string().min(1, "Please select a crop"),
  temperature: z.coerce.number().positive("Temperature must be a positive number"),
  humidity: z.coerce.number().min(0).max(100),
  windSpeed: z.coerce.number().min(0, "Wind speed must be a positive number"),
});

type CalculatorResult = {
  etValue: number;
  advice: string;
};

export default function EvapotranspirationCalculator(): JSX.Element {
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<CalculatorResult | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropName: "wheat",
      temperature: 35,
      humidity: 60,
      windSpeed: 5,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);

    // Mock calculation for Evapotranspiration (ET) - very simplified
    const tempFactor = values.temperature * 0.1;
    const humidityFactor = (100 - values.humidity) * 0.05;
    const windFactor = values.windSpeed * 0.2;
    
    // Different crops have different crop coefficients (Kc)
    let cropCoefficient = 0.8; 
    if (values.cropName === "rice" || values.cropName === "sugarcane") {
        cropCoefficient = 1.2;
    } else if (values.cropName === "maize") {
        cropCoefficient = 1.1;
    }

    const etValue = (tempFactor + humidityFactor + windFactor) * cropCoefficient;

    let advice = "Normal water loss. Standard irrigation schedules apply.";
    if (etValue > 8) {
      advice = "High evapotranspiration. Water loss is significant. Increase irrigation frequency.";
    } else if (etValue < 3) {
      advice = "Low evapotranspiration. Reduce irrigation to prevent waterlogging.";
    }

    setTimeout(() => {
      setResult({ etValue: parseFloat(etValue.toFixed(1)), advice });
      setIsLoading(false);
    }, 1000);
  }

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sun className="text-primary" />
          <span>Evapotranspiration (ET) Calculator</span>
        </CardTitle>
        <CardDescription>
          Estimate daily water loss from the soil surface and plants.
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
                    <FormLabel>Select Crop</FormLabel>
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

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="temperature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Temp (°C)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
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
                      <FormLabel>Humidity (%)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                 <FormField
                  control={form.control}
                  name="windSpeed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Wind (km/h)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
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
                    Calculate ET
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="bg-secondary/50 rounded-lg p-6 flex items-center justify-center">
            {!result && !isLoading && (
              <div className="text-center text-muted-foreground">
                <Sun className="mx-auto h-12 w-12" />
                <p className="mt-4">Your evapotranspiration estimate will appear here.</p>
              </div>
            )}

            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin mb-4" />
                <p>Estimating water loss...</p>
              </div>
            )}

            {result && (
              <div className="text-center animate-in fade-in duration-500">
                <p className="text-muted-foreground">Estimated ET Rate</p>
                <p className="text-7xl font-bold my-2 text-primary">
                  {result.etValue} <span className="text-2xl">mm/day</span>
                </p>
                <Alert className="text-left mt-4">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Water Management Advice</AlertTitle>
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
