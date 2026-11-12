// AI chapter: Embeddings and RAG.

export default {
  id: 'embeddings-rag',
  title: 'Embeddings & RAG',
  description: 'Give the model your own documents',
  icon: 'search',
  lessons: [
    {
      id: 'ai-embeddings',
      title: 'Embeddings',
      blocks: [
        { type: 'text', value: 'An embedding turns text into a list of numbers. Similar meanings land close together. That is how semantic search works: compare the question and the documents as vectors.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const response = await fetch('https://api.openai.com/v1/embeddings', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + process.env.OPENAI_API_KEY,
  },
  body: JSON.stringify({
    model: 'text-embedding-3-small',
    input: 'How do I make a for loop in C#?',
  }),
});

const data = await response.json();
const vector = data.data[0].embedding; // array of numbers` },
        { type: 'note', value: 'Embeddings capture meaning, not exact wording. "car" and "automobile" can be close even though the strings differ.' },
      ],
    },
    {
      id: 'ai-chunking',
      title: 'Chunking and vector search',
      blocks: [
        { type: 'text', value: 'Documents are split into chunks, each chunk is embedded, and the vectors are stored in a vector database. A query is embedded and compared with the chunks.' },
        { type: 'code', lang: 'text', tryIt: false, value: `lesson.md
  -> chunk 1: "A token is a small piece of text..."
  -> chunk 2: "The context window is..."
  -> embed each chunk -> store {id, text, vector}

query: "What is a token?"
  -> embed query
  -> cosine similarity against chunks
  -> top 3 chunks -> send to the model with the question` },
        { type: 'list', items: [
          'Chunk by headings or paragraphs, not by random characters',
          'Keep a small overlap so a sentence is not cut in half',
          'Store the source id and title with every chunk',
          'Use metadata filters for course, language or version',
        ] },
        { type: 'note', value: 'A bad chunk is a bad answer. If a chunk lacks its heading, the model may not know what the passage is about.' },
      ],
    },
    {
      id: 'ai-rag-pipeline',
      title: 'The RAG pipeline',
      blocks: [
        { type: 'text', value: 'RAG means Retrieval-Augmented Generation. You retrieve relevant text, put it in the prompt, and ask the model to answer using only that text. It makes answers grounded and citable.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const question = userQuestion;
const chunks = await search(question, 3);

const prompt = [
  { role: 'system', content: 'Answer only from the notes. If the answer is missing, say you do not know. Cite the note id.' },
  { role: 'user', content: 'Notes:\\n' + chunks.map(c => '[' + c.id + '] ' + c.text).join('\\n\\n') + '\\n\\nQuestion: ' + question },
];` },
        { type: 'list', items: [
          'Retrieve before generating',
          'Limit the context to the best few chunks',
          'Ask for citations and verify they exist',
          'Return "I do not know" when nothing matches',
          'Log the retrieved ids for debugging',
        ] },
        { type: 'note', value: 'RAG reduces hallucination but does not eliminate it. The model can still misread a chunk. Citations let a human check.' },
      ],
    },
    {
      id: 'ai-vector-db',
      title: 'Vector stores',
      blocks: [
        { type: 'list', items: [
          'pgvector - Postgres extension, good default',
          'Pinecone / Weaviate / Qdrant - managed vector databases',
          'Redis / MongoDB Atlas - vector search in existing stores',
          'FAISS - local library for experiments',
          'A plain table with cosine similarity for small data',
        ] },
        { type: 'text', value: 'For a small app, start with pgvector or an in-memory list. Move to a dedicated vector store when the dataset or query volume demands it.' },
        { type: 'note', value: 'Re-embedding is expensive. Version your embedding model and store it with each vector so you can migrate safely.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'embeddings-rag',
      q: 'What is an embedding?',
      options: ['A compressed image', 'A vector that represents meaning', 'A database index', 'A prompt'],
      answer: 1,
      explain: 'Similar text gets similar vectors.',
    },
    {
      chapterId: 'embeddings-rag',
      q: 'What does RAG add to a prompt?',
      options: ['A bigger model', 'Retrieved source text', 'A password', 'An image'],
      answer: 1,
      explain: 'Retrieval grounds the answer in documents.',
    },
    {
      chapterId: 'embeddings-rag',
      q: 'Why store the source id with a chunk?',
      options: ['To cite and debug the answer', 'To save tokens', 'To encrypt it', 'To sort it'],
      answer: 0,
      explain: 'Citations and logs need the source.',
    },
    {
      chapterId: 'embeddings-rag',
      q: 'Does RAG guarantee correct answers?',
      options: ['Yes', 'No, the model can still misread sources', 'Only with images', 'Only in Python'],
      answer: 1,
      explain: 'It reduces hallucination but does not remove it.',
    },
  ],
};
