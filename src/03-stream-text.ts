import { anthropic } from '@ai-sdk/anthropic'
import { streamText } from 'ai'

const model = anthropic('claude-3-5-haiku-latest')

const promptResult = await streamText({
  model,
  prompt: 'Tell me about gil tayar the software developer. two paragraphs is enough',
})

for await (const textChunk of promptResult.textStream) {
  process.stdout.write(textChunk)
}
