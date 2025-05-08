import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
import { streamText } from 'ai'
import { createInterface } from 'node:readline/promises'

/**
 * @import {CoreMessage} from 'ai'
 */

const lmstudio = createOpenAICompatible({
  baseURL: `http://10.4.144.31:1234/v1`,
  name: 'lmstudio',
})
const model = lmstudio('gemma-3-12b-it')

const rl = createInterface({ input: process.stdin, output: process.stdout })

/**
 * @type {CoreMessage[]}
 */
const chatHistory = []

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
