import { google } from '@ai-sdk/google'
import { generateObject } from 'ai'
import { createInterface } from 'node:readline/promises'

const model = google('gemini-1.5-flash')
const rl = createInterface({ input: process.stdin, output: process.stdout })

for (;;) {
  const prompt = await rl.question('You: ')
  if (prompt === 'exit') {
    break
  }

  const promptResult = await generateObject({
    model,
    output: 'enum',
    enum: ['happy', 'sad', 'angry', 'hopeful', 'confused'],
    prompt,
  })

  console.log(promptResult.object)
}
