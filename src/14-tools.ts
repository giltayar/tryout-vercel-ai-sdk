import { anthropic } from '@ai-sdk/anthropic'
import { generateText, tool } from 'ai'
import z from 'zod'

const model = anthropic('claude-3-5-haiku-latest')

const googleSearchTool = tool({
  parameters: z.object({ searchTerm: z.string().describe('the term to search for') }),

  description: 'this tool allows you to search google and return the HTML of',
  execute: async ({ searchTerm }) => {
    const url = new URL('https://www.google.com/search')
    url.searchParams.set('q', searchTerm)

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${await response.text()}`)
    }

    return response.text()
  },
})

const promptResult = await generateText({
  model,
  prompt: 'do a google search for gil tayar and find the first three links in the results',
  tools: { googleSearchTool },
  maxSteps: 10,
})

// console.dir(promptResult.steps, { depth: null })
console.log(promptResult.text)
