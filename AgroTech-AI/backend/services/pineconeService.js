const { Pinecone } = require('@pinecone-database/pinecone');
const OpenAI = require('openai');

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY
});
const index = pc.index(process.env.PINECONE_INDEX_NAME || 'agrotech-index');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function getEmbeddings(text) {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return response.data[0].embedding;
}

module.exports = {
  upsertVectors: async (vectors) => {
    // vectors is an array of { id, text, metadata }
    const upsertData = await Promise.all(vectors.map(async (v) => ({
      id: v.id,
      values: await getEmbeddings(v.text),
      metadata: { ...v.metadata, text: v.text }
    })));

    await index.upsert(upsertData);
  },

  queryVectors: async (queryText, filter = {}, topK = 5) => {
    const queryEmbedding = await getEmbeddings(queryText);

    const queryResponse = await index.query({
      vector: queryEmbedding,
      topK,
      includeMetadata: true,
      filter
    });

    return queryResponse.matches;
  }
};