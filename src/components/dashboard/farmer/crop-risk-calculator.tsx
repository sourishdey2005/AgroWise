
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Loader2, Calculator, AlertTriangle, ShieldCheck, Leaf } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { assessCropRisk } from "@/ai/flows/crop-risk-flow";
import { CropRiskInputSchema, type CropRiskOutput } from "@/ai/schemas/crop-risk-schemas";
import type { z } from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useData } from "@/hooks/use-data";

export default function CropRiskCalculator() {
  const { data, loading: dataLoading } = useData();
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<CropRiskOutput | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof CropRiskInputSchema>>({
    resolver: zodResolver(CropRiskInputSchema),
    defaultValues: {
      cropName: "",
      growthStage: "vegetative",
      temperature: 35,
      humidity: 60,
      windSpeed: 5,
    },
  });

  const { watch, handleSubmit, formState } = form;
  const watchedValues = watch();

  async function onSubmit(values: z.infer<typeof CropRiskInputSchema>) {
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
        const response = await assessCropRisk(values);
        setResult(response);
    } catch(e) {
        console.error(e);
        setError("Failed to generate risk analysis. Please try again.");
    } finally {
        setIsLoading(false);
    }
  }

  React.useEffect(() => {
    const subscription = watch(async (value, { name, type }) => {
      if (name === 'cropName' && value.cropName) {
        const isValid = await form.trigger();
        if (isValid) {
          handleSubmit(onSubmit)();
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, handleSubmit, form.trigger]);


  const getRiskColor = (score: number) => {
    if (score > 70) return 'text-destructive';
    if (score > 40) return 'text-amber-500';
    return 'text-green-600';
  }

  if (dataLoading) {
    return <Card className="rounded-2xl shadow-sm"><CardHeader><CardTitle>Loading Crop Data...</CardTitle></CardHeader></Card>;
  }

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="text-primary" />
          AI Crop Risk Calculator
        </CardTitle>
        <CardDescription>
          Get an AI-powered risk assessment for your crop based on environmental factors.
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
                          <SelectValue placeholder="Select crop to analyze risk..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <ScrollArea className="h-72">
                          {data?.crops.map(crop => (
                            <SelectItem key={crop.id} value={crop.name.toLowerCase()}>{crop.name}</SelectItem>
                          ))}
                        </ScrollArea>
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

              <Button type="submit" disabled={isLoading} className="hidden">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Calculator className="h-4 w-4 mr-2" />
                    Analyze Risk
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="bg-secondary/50 p-6 rounded-lg flex flex-col justify-center min-h-[300px]">
            {isLoading && (
              <div className="text-center text-muted-foreground animate-in fade-in duration-500">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p>AI is analyzing conditions...</p>
              </div>
            )}
            
            {error && <p className="text-destructive text-center">{error}</p>}

            {!result && !isLoading && !error && (
              <div className="text-center text-muted-foreground">
                <Leaf className="mx-auto h-12 w-12" />
                <p className="mt-4">Select a crop to see its risk analysis.</p>
              </div>
            )}

            {result && (
              <div className="text-center animate-in fade-in duration-500 space-y-4">
                <div>
                  <p className="text-muted-foreground">AI Estimated Risk Score</p>
                  <p className={`text-6xl font-bold my-2 ${getRiskColor(result.riskScore)}`}>
                    {result.riskScore}
                    <span className="text-xl"> / 100</span>
                  </p>
                </div>

                <Alert className="text-left" variant={result.riskScore > 70 ? "destructive" : "default"}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Overall Assessment</AlertTitle>
                  <AlertDescription>{result.overallAdvice}</AlertDescription>
                </Alert>

                 <div>
                    <h4 className="font-semibold text-left mb-2">Key Risk Factors</h4>
                    <div className="space-y-2 text-left">
                        {result.riskFactors.map((factor, index) => (
                             <div key={index} className="p-3 rounded-md border bg-background/50">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-sm">{factor.factor}</span>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${factor.level === 'High' || factor.level === 'Extreme' ? 'bg-destructive/20 text-destructive' : factor.level === 'Medium' ? 'bg-amber-500/20 text-amber-600' : 'bg-green-500/20 text-green-600'}`}>
                                        {factor.level}
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">{factor.advice}</p>
                            </div>
                        ))}
                    </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
