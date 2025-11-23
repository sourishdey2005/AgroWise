
import { z } from 'zod';

export const CropRiskInputSchema = z.object({
  cropName: z.string().describe('The name of the crop (e.g., Wheat, Rice).'),
  growthStage: z
    .string()
    .describe(
      'The current growth stage of the crop (e.g., germination, vegetative, flowering).'
    ),
  temperature: z.coerce.number().describe('The current average temperature in Celsius.'),
  humidity: z.coerce.number().describe('The current average relative humidity in percent.'),
  windSpeed: z.coerce.number().describe('The current average wind speed in km/h.'),
});
export type CropRiskInput = z.infer<typeof CropRiskInputSchema>;

export const CropRiskOutputSchema = z.object({
  riskScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'A numerical risk score from 0 (no risk) to 100 (extreme risk).'
    ),
  overallAdvice: z
    .string()
    .describe(
      'A summary of the risk level and the most critical advice for the farmer.'
    ),
  riskFactors: z
    .array(
      z.object({
        factor: z
          .string()
          .describe('The specific risk factor, e.g., "Heat Stress", "Fungal Disease", "Pest Activity".'),
        level: z
          .enum(['Low', 'Medium', 'High', 'Extreme'])
          .describe('The assessed level of risk for this specific factor.'),
        advice: z
          .string()
          .describe('Specific advice to mitigate this particular risk factor.'),
      })
    )
    .describe('A detailed breakdown of individual risk factors.'),
});
export type CropRiskOutput = z.infer<typeof CropRiskOutputSchema>;
