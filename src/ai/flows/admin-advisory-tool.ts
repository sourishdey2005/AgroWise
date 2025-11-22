'use server';

/**
 * @fileOverview AI-driven insights and suggestions for crafting advisories for farmers.
 *
 * - generateAdvisorySuggestions - A function that generates advisory suggestions.
 * - GenerateAdvisorySuggestionsInput - The input type for the generateAdvisorySuggestions function.
 * - GenerateAdvisorySuggestionsOutput - The return type for the generateAdvisorySuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAdvisorySuggestionsInputSchema = z.object({
  cropType: z.string().describe('The type of crop for the advisory.'),
  region: z.string().describe('The region for which the advisory is being created.'),
  soilType: z.string().describe('The type of soil in the region.'),
  weatherConditions: z
    .string()
    .describe('The current weather conditions in the region.'),
  currentChallenges: z
    .string()
    .describe(
      'Any current challenges or issues farmers are facing in the region, e.g., pest infestations, water scarcity.'
    ),
});
export type GenerateAdvisorySuggestionsInput = z.infer<
  typeof GenerateAdvisorySuggestionsInputSchema
>;

const GenerateAdvisorySuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('A list of AI-driven suggestions for the advisory.'),
  insights: z
    .string()
    .describe('Overall insights related to the input context.'),
});
export type GenerateAdvisorySuggestionsOutput = z.infer<
  typeof GenerateAdvisorySuggestionsOutputSchema
>;

export async function generateAdvisorySuggestions(
  input: GenerateAdvisorySuggestionsInput
): Promise<GenerateAdvisorySuggestionsOutput> {
  return generateAdvisorySuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAdvisorySuggestionsPrompt',
  input: {schema: GenerateAdvisorySuggestionsInputSchema},
  output: {schema: GenerateAdvisorySuggestionsOutputSchema},
  prompt: `You are an AI assistant helping government officials craft advisories for farmers in India.

  Based on the following information, generate a list of suggestions and overall insights for the advisory:

  Crop Type: {{{cropType}}}
  Region: {{{region}}}
  Soil Type: {{{soilType}}}
  Weather Conditions: {{{weatherConditions}}}
  Current Challenges: {{{currentChallenges}}}

  Provide specific, actionable advice that farmers can use to improve their yields and manage their crops effectively.

  Format the output as a JSON object with "suggestions" (an array of strings) and "insights" (a string).
`,
});

const generateAdvisorySuggestionsFlow = ai.defineFlow(
  {
    name: 'generateAdvisorySuggestionsFlow',
    inputSchema: GenerateAdvisorySuggestionsInputSchema,
    outputSchema: GenerateAdvisorySuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
