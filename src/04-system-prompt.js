import { anthropic } from '@ai-sdk/anthropic'
import { google } from '@ai-sdk/google'
import { generateText } from 'ai'

const promptResult = await generateText({
  model: anthropic('claude-3-opus-latest'),
  prompt: 'Tell me about kent c dodds the software developer',
  system: 'you are funny and the response should be a funny one. Return a maximum of 2 paragraphs',
})

console.log(promptResult.text)
