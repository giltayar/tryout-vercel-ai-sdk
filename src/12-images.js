import { google } from '@ai-sdk/google'
import { generateText } from 'ai'
import fs from 'fs/promises'

const model = google('gemini-1.5-flash')

const image = await fs.readFile(
  new URL('../resources/Gil-Tayar-Profile-photo-web.jpg', import.meta.url)
)

const promptResult = await generateText({
  model,
  messages: [
    { role: 'user', content: [{ type: 'image', image }] },
    {
      role: 'user',
      content: 'explain what is in the image. Maximum 2 paragraphs',
    },
  ],
})

console.log(promptResult.text)
