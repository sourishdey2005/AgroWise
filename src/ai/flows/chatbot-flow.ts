'use server';
/**
 * @fileOverview A general-purpose agricultural chatbot.
 *
 * - askChatbot - A function that takes a user's question and returns an answer.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotInputSchema = z.object({
  question: z.string().describe('The user\'s question about agriculture.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the user\'s question.'),
  suggestedQuestions: z
    .array(z.string())
    .optional()
    .describe(
      'A list of 3 relevant follow-up questions a user might ask based on the original question and the answer provided.'
    ),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;


export async function askChatbot(
  input: ChatbotInput
): Promise<ChatbotOutput> {
  return agriculturalChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'agriculturalChatbotPrompt',
  input: {schema: ChatbotInputSchema},
  output: {schema: ChatbotOutputSchema},
  prompt: `You are "AgroWise Bot", an expert AI assistant for an Indian agricultural app called AgroWise. Your role is to provide clear, concise, and helpful answers to farmers' questions.

Answer the following question based on your knowledge of Indian farming practices, crops, weather, soil, pests, fertilizers, and government schemes.

After providing the answer, you MUST suggest 3 relevant follow-up questions that the user might have. These questions should be natural and logically follow from the conversation.

Keep your answers practical and easy to understand for a farmer. If the question is outside the scope of agriculture, politely decline to answer.

User's Question: {{{question}}}
`,
});

const agriculturalChatbotFlow = ai.defineFlow(
  {
    name: 'agriculturalChatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
