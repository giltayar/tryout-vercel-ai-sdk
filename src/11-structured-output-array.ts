import { google } from '@ai-sdk/google'
import { streamObject } from 'ai'
import z from 'zod'

const model = google('gemini-1.5-flash')

const promptResult = await streamObject({
  model,
  schema: z.object({
    name: z.string(),
    birthYear: z.number().optional().describe('year of birth'),
    numberOfWives: z.number().optional().describe('number of wives'),
    deathYear: z.number().optional(),
  }),
  output: 'array',
  prompt: 'kings of france',
})

for await (const objectChunk of promptResult.partialObjectStream) {
  console.clear()
  console.dir(objectChunk, { depth: null })
}

console.log(await promptResult.object)
