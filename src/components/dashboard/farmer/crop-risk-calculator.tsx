
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Droplets, Info, Loader2, Calculator, Wind } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  cropName: z.string().min(1, "Please select a crop"),
  growthStage: z.enum([
    "germination",
    "seedling",
    "vegetative",
    "flowering",
    "fruiting",
    "maturity",
    "initial", 
    "development", 
    "mid-season", 
    "late-season"
  ]),
  temperature: z.coerce.number().positive(),
  humidity: z.coerce.number().min(0).max(100),
  windSpeed: z.coerce.number().min(0, "Wind speed must be a positive number"),
});

type CalculatorResult = {
  riskScore: number;
  advice: string;
};

export default function CropRiskCalculator() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<CalculatorResult | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropName: "",
      growthStage: "vegetative",
      temperature: 35,
      humidity: 60,
      windSpeed: 5,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);

    // Mock calculation for risk
    let riskScore = 0;
    if (values.cropName === "rice" || values.cropName === "sugarcane") riskScore += 10;
    
    if (values.temperature > 38) riskScore += 25;
    else if(values.temperature > 32) riskScore += 15;

    if(values.humidity > 75) riskScore += 20;
    else if(values.humidity < 40) riskScore += 10;
    
    if(values.windSpeed > 15) riskScore += 15;

    if (values.growthStage === "flowering" || values.growthStage === "fruiting" || values.growthStage === "development" || values.growthStage === "mid-season") riskScore += 15;
    else if (values.growthStage === "seedling" || values.growthStage === "vegetative") riskScore += 10;
    else if (values.growthStage === "germination" || values.growthStage === "initial") riskScore += 5;
    
    riskScore = Math.min(100, riskScore);

    let advice = "Low risk. Standard monitoring advised.";
    if (riskScore > 70) advice = "High risk. Potential for significant pest/disease issues. Increase monitoring and consider protective measures.";
    else if (riskScore > 40) advice = "Medium risk. Conditions are favorable for some pests or diseases. Monitor crops closely.";
    

    setTimeout(() => {
      setResult({ riskScore, advice });
      setIsLoading(false);
    }, 1000);
  }

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="text-primary" />
          Crop Risk Calculator
        </CardTitle>
        <CardDescription>
          Estimate crop risk based on environmental factors.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-8 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="cropName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Crop</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select crop" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="rice">Basmati Rice</SelectItem>
                        <SelectItem value="wheat">Wheat</SelectItem>
                        <SelectItem value="sugarcane">Sugarcane</SelectItem>
                        <SelectItem value="cotton">Cotton</SelectItem>
                        <SelectItem value="maize">Maize</SelectItem>
                        <SelectItem value="soybean">Soybean</SelectItem>
                        <SelectItem value="potato">Potato</SelectItem>
                        <SelectItem value="tomato">Tomato</SelectItem>
                        <SelectItem value="mustard">Mustard</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="growthStage"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Growth Stage</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="germination">Germination</SelectItem>
                        <SelectItem value="seedling">Seedling</SelectItem>
                        <SelectItem value="vegetative">Vegetative</SelectItem>
                        <SelectItem value="flowering">Flowering</SelectItem>
                        <SelectItem value="fruiting">Fruiting</SelectItem>
                        <SelectItem value="maturity">Maturity</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  name="temperature"
                  control={form.control}
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
                  name="humidity"
                  control={form.control}
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
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Risk
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="bg-secondary/50 p-6 rounded-lg flex items-center justify-center">
            {!result && !isLoading && (
              <div className="text-center text-muted-foreground">
                <Calculator className="mx-auto h-12 w-12" />
                <p className="mt-4">Risk analysis will appear here.</p>
              </div>
            )}

            {isLoading && (
              <div className="text-center text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                Processing...
              </div>
            )}

            {result && (
              <div className="text-center">
                <p className="text-muted-foreground">Estimated Risk Score</p>
                <p className={`text-6xl font-bold my-2 ${result.riskScore > 70 ? 'text-destructive' : result.riskScore > 40 ? 'text-amber-500' : 'text-green-600'}`}>
                  {result.riskScore}
                  <span className="text-xl"> / 100</span>
                </p>

                <Alert className="text-left mt-4" variant={result.riskScore > 70 ? "destructive" : "default"}>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Risk Analysis</AlertTitle>
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
