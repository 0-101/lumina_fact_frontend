'use server';
/**
 * @fileOverview A Genkit flow for verifying a claim using an AI model.
 *
 * This file defines a flow that takes a claim (as a string), uses an AI model to
 * analyze it, and returns a structured verification result.
 *
 * - verifyClaim - A function that orchestrates the claim verification process.
 * - VerifyClaimInput - The input type for the verifyClaim function.
 * - VerifyClaimOutput - The return type for the verifyClaim function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Define the input schema for the verification flow
const VerifyClaimInputSchema = z.object({
  claim: z.string().describe('The claim to be verified.'),
  urlContent: z.string().optional().describe('Text content scraped from a provided URL.'),
  mediaDataUri: z.string().optional().describe("A media file (image/video) as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type VerifyClaimInput = z.infer<typeof VerifyClaimInputSchema>;

// Define the output schema for the verification flow, matching the VerificationResult type structure
const VerifyClaimOutputSchema = z.object({
  status: z
    .enum(['verified', 'debunked', 'partially-verified', 'inconclusive'])
    .describe('The verification status of the claim.'),
  claim_type: z
    .enum(['static', 'dynamic'])
    .describe(
      'The type of claim (static for unchanging facts, dynamic for evolving situations).'
    ),
  summary: z
    .string()
    .describe('A concise, AI-generated summary of the verification.'),
  analysis: z
    .string()
    .describe(
      'A detailed analysis of the claim, including the reasoning for the status.'
    ),
  source_context: z
    .array(
      z.object({
        source: z.string().url().describe('The URL of the source.'),
        snippet: z
          .string()
          .describe(
            'A relevant snippet from the source that supports the analysis.'
          ),
      })
    )
    .describe(
      'An array of up to 3 credible sources found online that support the verification.'
    ),
    disclaimer: z.string().describe('A disclaimer message regarding the verification result.'),
});
export type VerifyClaimOutput = z.infer<typeof VerifyClaimOutputSchema>;

// The main exported function that clients will call
export async function verifyClaim(input: VerifyClaimInput): Promise<VerifyClaimOutput> {
  const result = await verifyClaimFlow(input);
  
  // Generate disclaimer based on result
  let disclaimer = `Our systems show the claim to be '${result.status}'.`;
  if (result.claim_type === 'dynamic') {
    disclaimer += ' This status may change over time.';
  }
  
  return { ...result, disclaimer };
}

// Define the Genkit prompt
const verifyPrompt = ai.definePrompt({
  name: 'verifyClaimPrompt',
  input: { schema: VerifyClaimInputSchema },
  output: { schema: VerifyClaimOutputSchema.omit({ disclaimer: true }) }, // We'll add disclaimer separately
  prompt: `You are an expert fact-checker. Your task is to verify the provided information and provide a detailed, evidence-backed analysis.

  The user has provided the following information for verification:
  Claim: {{{claim}}}
  {{#if urlContent}}
  URL Content:
  ---
  {{{urlContent}}}
  ---
  {{/if}}
  {{#if mediaDataUri}}
  Attached Media:
  {{media url=mediaDataUri}}
  {{/if}}

  Instructions:
  1.  **Analyze all provided information**: The text claim, any URL content, and any attached media. Synthesize them to understand the core assertion.
  2.  **Search for evidence**: Imagine you are searching the web for credible sources (news articles, scientific papers, official reports) to verify or debunk the assertion.
  3.  **Determine Status**: Based on the evidence, determine if the claim is 'verified', 'debunked', 'partially-verified', or 'inconclusive'.
  4.  **Determine Claim Type**: Decide if the claim is 'static' (a factual statement that doesn't change, e.g., "The capital of France is Paris") or 'dynamic' (a statement about an evolving situation, e.g., "The stock market is currently crashing").
  5.  **Write Analysis**: Provide a detailed analysis explaining your reasoning and how the evidence supports your conclusion.
  6.  **Provide Sources**: List up to 3 credible, real-world sources with URLs and a snippet from each that is relevant to the claim. The sources should be real and accessible. If you cannot find good sources, provide an empty array.
  7.  **Write Summary**: Write a concise, one-paragraph summary of your findings, suitable for a general audience.

  You must structure your response strictly according to the output schema. If the provided URL content or media is inaccessible or irrelevant, note that in your analysis but still attempt to verify the text claim.`,
});

// Define the Genkit flow
const verifyClaimFlow = ai.defineFlow(
  {
    name: 'verifyClaimFlow',
    inputSchema: VerifyClaimInputSchema,
    outputSchema: VerifyClaimOutputSchema.omit({ disclaimer: true }),
  },
  async (input) => {
    // Execute the prompt and get the structured output
    const { output } = await verifyPrompt(input);
    if (!output) {
      throw new Error('Failed to get a valid response from the AI model.');
    }
    return output;
  }
);
