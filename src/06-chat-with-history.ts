import { google } from '@ai-sdk/google'
import { streamText, type CoreMessage } from 'ai'
import { createInterface } from 'node:readline/promises'

const model = google('gemini-1.5-flash')
const rl = createInterface({ input: process.stdin, output: process.stdout })

const chatHistory = [] as CoreMessage[]

for (;;) {
  const question = await rl.question('You: ')
  if (question === 'exit') {
    break
  }

  chatHistory.push({ role: 'user', content: question })

  const promptResult = await streamText({
    model,
    messages: chatHistory,
    system:
      'you are funny and the response should be a funny one. Return a maximum of 2 paragraphs',
  })

  for await (const textChunk of promptResult.textStream) {
    process.stdout.write(textChunk)
  }

  chatHistory.push({ role: 'assistant', content: await promptResult.text })
}
