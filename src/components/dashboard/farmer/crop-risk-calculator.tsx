
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bug, Calculator, Info, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  cropName: z.string().min(1, "Please select a crop"),
  soilMoisture: z.enum(["dry", "optimal", "wet"]),
  pestSpotted: z.enum(["none", "low", "high"]),
  diseaseSymptoms: z.string().optional(),
});

type RiskResult = {
  score: number;
  level: "Low" | "Medium" | "High";
  advice: string;
  color: string;
};

const CropRiskCalculator = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<RiskResult | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropName: "",
      soilMoisture: "optimal",
      pestSpotted: "none",
      diseaseSymptoms: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setResult(null);

    // Mock calculation logic
    let score = 0;
    if (values.soilMoisture === "dry") score += 20;
    if (values.soilMoisture === "wet") score += 30;
    if (values.pestSpotted === "low") score += 25;
    if (values.pestSpotted === "high") score += 50;
    if (values.diseaseSymptoms && values.diseaseSymptoms.length > 10) score += 40;
    
    score = Math.min(score, 100);

    let level: RiskResult["level"] = "Low";
    let advice = "Conditions seem optimal. Continue regular monitoring.";
    let color = "text-green-500";

    if (score > 70) {
      level = "High";
      advice = "Immediate action required. High pest/disease pressure detected. Consider consulting an agent and applying recommended treatments.";
      color = "text-red-500";
    } else if (score > 40) {
      level = "Medium";
      advice = "Potential issues detected. Increase monitoring for pests and diseases. Ensure proper irrigation based on soil moisture.";
      color = "text-amber-500";
    }

    setTimeout(() => {
      setResult({ score, level, advice, color });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="text-primary" />
          <span>Interactive Crop Risk Calculator</span>
        </CardTitle>
        <CardDescription>
          Enter your field observations to get a real-time risk assessment.
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a crop" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="rice">Basmati Rice</SelectItem>
                        <SelectItem value="wheat">Wheat</SelectItem>
                        <SelectItem value="sugarcane">Sugarcane</SelectItem>
                        <SelectItem value="cotton">Cotton</SelectItem>
                        <SelectItem value="maize">Maize</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="soilMoisture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Soil Moisture Level</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select moisture level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="dry">Dry</SelectItem>
                        <SelectItem value="optimal">Optimal</SelectItem>
                        <SelectItem value="wet">Wet / Waterlogged</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pestSpotted"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pest Activity</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pest activity level" />
                        </Trigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">None Seen</SelectItem>
                        <SelectItem value="low">Low (A few spots)</SelectItem>
                        <SelectItem value="high">High (Widespread)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="diseaseSymptoms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Disease Symptoms (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Yellow spots on leaves, wilting stems..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate Risk
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="bg-secondary/50 rounded-lg p-6 flex items-center justify-center">
            {!result && !isLoading && (
               <div className="text-center text-muted-foreground">
                <Bug className="mx-auto h-12 w-12" />
                <p className="mt-4">Your risk assessment will appear here.</p>
              </div>
            )}
             {isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin mb-4" />
                <p>Analyzing your inputs...</p>
              </div>
            )}
            {result && (
              <div className="text-center animate-in fade-in duration-500">
                  <p className="text-muted-foreground">Calculated Risk Score</p>
                  <p className={`text-7xl font-bold my-2 ${result.color}`}>{result.score}</p>
                  <p className={`text-2xl font-semibold mb-4 ${result.color}`}>{result.level} Risk</p>
                  <Alert className="text-left">
                    <Info className="h-4 w-4"/>
                    <AlertTitle>Recommendation</AlertTitle>
                    <AlertDescription>
                     {result.advice}
                    </AlertDescription>
                  </Alert>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CropRiskCalculator;
