"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  generateAdvisorySuggestions,
  type GenerateAdvisorySuggestionsOutput,
} from "@/ai/flows/admin-advisory-tool";
import { Wand2, Loader2, Lightbulb, ListChecks } from "lucide-react";

const formSchema = z.object({
  cropType: z.string().min(2, { message: "Crop type is required." }),
  region: z.string().min(2, { message: "Region is required." }),
  soilType: z.string().min(2, { message: "Soil type is required." }),
  weatherConditions: z.string().min(10, { message: "Describe weather conditions." }),
  currentChallenges: z.string().min(10, { message: "Describe current challenges." }),
});

export default function AdminAdvisoryTool() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<GenerateAdvisorySuggestionsOutput | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropType: "",
      region: "",
      soilType: "",
      weatherConditions: "",
      currentChallenges: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await generateAdvisorySuggestions(values);
      setResult(response);
    } catch (e) {
      setError("Failed to generate suggestions. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="text-primary" />
          <span>AI-Powered Advisory Tool</span>
        </CardTitle>
        <CardDescription>
          Generate suggestions and insights for farmer advisories using AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="cropType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Crop Type</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Basmati Rice" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Region</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Punjab" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="soilType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Soil Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Alluvial Soil" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weatherConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weather Conditions</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., High humidity, temp above 35°C" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentChallenges"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Challenges</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Rice blast infestation, water scarcity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Suggestions
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="bg-secondary/50 rounded-lg p-6 space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Generated Output</h3>
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin mb-4" />
                <p>AI is thinking...</p>
              </div>
            )}
            {error && <p className="text-destructive">{error}</p>}
            {result && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div>
                  <h4 className="font-semibold flex items-center gap-2 mb-2">
                    <ListChecks className="text-primary" />
                    Suggestions
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                    {result.suggestions.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold flex items-center gap-2 mb-2">
                    <Lightbulb className="text-primary" />
                    Insights
                  </h4>
                  <p className="text-sm text-muted-foreground">{result.insights}</p>
                </div>
              </div>
            )}
            {!isLoading && !result && !error && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <p>Suggestions will appear here once generated.</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
