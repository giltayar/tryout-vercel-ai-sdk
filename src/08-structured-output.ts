import { google } from '@ai-sdk/google'
import { generateObject } from 'ai'
import z from 'zod'

const model = google('gemini-1.5-flash')

const promptResult = await generateObject({
  model,
  schema: z.array(z.object({
    name: z.string(),
    birthYear: z.number().optional().describe('year of birth'),
    numberOfWives: z.number().optional().describe('number of wives'),
    deathYear: z.number().optional(),
  })),
  prompt: 'Give me a list of all the kings of england'
})

console.log(promptResult.object)
