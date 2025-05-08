import { anthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'

const model = anthropic('claude-3-5-haiku-latest')

const promptResult = await generateText({ model, prompt: 'Write a haiku about the ocean' })

console.log(promptResult.text)
