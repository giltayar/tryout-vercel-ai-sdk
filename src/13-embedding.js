import { google } from '@ai-sdk/google'
import { cosineSimilarity, embed, embedMany } from 'ai'

const model = google.textEmbeddingModel('text-embedding-004')

const values = [
  'Dishwasher',
  'knife',
  'tv',
  'carpet',
]

const { embeddings } = await embedMany({
  model,
  values: values,
})

const vectorDatabase = embeddings.map((vector, i) => ({
  value: values[i],
  vector,
}))

const searchTermEmbedding = await embed({ model, value: 'living room' })

const matched = findClosestMatches(vectorDatabase, searchTermEmbedding)

console.log('Closest matches:', matched)

/**
 * @param {typeof vectorDatabase} vectorDatabase
 * @param {import("ai").EmbedResult<string>} searchTermEmbedding
 */
function findClosestMatches(vectorDatabase, searchTermEmbedding) {
  return vectorDatabase
    .map((embedding) => ({
      similarity: cosineSimilarity(searchTermEmbedding.embedding, embedding.vector),
      value: embedding.value,
    }))
    .sort((a, b) => b.similarity - a.similarity)
}
