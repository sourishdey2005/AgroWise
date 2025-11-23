'use server';
/**
 * @fileOverview An AI-powered crop risk assessment tool.
 *
 * - assessCropRisk - A function that analyzes environmental factors to determine crop risk.
 */

import { ai } from '@/ai/genkit';
import {
  CropRiskInput,
  CropRiskInputSchema,
  CropRiskOutput,
  CropRiskOutputSchema,
} from '@/ai/schemas/crop-risk-schemas';

export async function assessCropRisk(
  input: CropRiskInput
): Promise<CropRiskOutput> {
  return cropRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cropRiskPrompt',
  input: { schema: CropRiskInputSchema },
  output: { schema: CropRiskOutputSchema },
  prompt: `You are an expert agronomist AI for Indian agriculture. Your task is to assess the risk to a crop based on environmental conditions.

Analyze the following data:
- Crop: {{{cropName}}}
- Growth Stage: {{{growthStage}}}
- Temperature: {{{temperature}}}°C
- Humidity: {{{humidity}}}%
- Wind Speed: {{{windSpeed}}} km/h

Based on this data, provide a comprehensive risk analysis.

1.  **Calculate a riskScore from 0 to 100.** A higher score means higher risk. Consider the ideal conditions for the crop and the vulnerability of its current growth stage.
    - High temperature and high humidity increase disease risk.
    - Extreme temperatures (high or low) cause crop stress.
    - High wind speed can cause physical damage (lodging).
    - Flowering and fruiting stages are more vulnerable.

2.  **Provide a list of riskFactors.** Identify at least 2-3 specific potential issues (e.g., "Fungal Disease Risk", "Heat Stress", "Pest Proliferation", "Physical Damage"). For each factor, assign a risk level (Low, Medium, High, Extreme) and provide a short, actionable piece of advice.

3.  **Write a concise overallAdvice.** This should summarize the situation and give the most important recommendation.

Example for high risk:
- riskScore: 85
- overallAdvice: "Extreme heat and humidity pose a severe threat. Immediate action is required to prevent fungal outbreaks and heat stress."
- riskFactors:
    - { factor: "Fungal Disease", level: "High", advice: "Ensure proper aeration and consider applying a preventive fungicide." }
    - { factor: "Heat Stress", level: "High", advice: "If possible, apply light irrigation during the cooler parts of the day to reduce soil temperature." }
`,
});

const cropRiskFlow = ai.defineFlow(
  {
    name: 'cropRiskFlow',
    inputSchema: CropRiskInputSchema,
    outputSchema: CropRiskOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
