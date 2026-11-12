// AI for Developers course. Code samples use JavaScript or Python and are
// read-only; prompts and diagrams use the text highlighter.

import gettingStarted from './getting-started';
import prompting from './prompting';
import llmApi from './llm-api';
import structuredOutput from './structured-output';
import embeddingsRag from './embeddings-rag';
import toolsAgents from './tools-agents';
import codingWithAi from './coding-with-ai';
import imagesAudio from './images-audio';
import privacySecurity from './privacy-security';
import costLatency from './cost-latency';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  prompting,
  llmApi,
  structuredOutput,
  embeddingsRag,
  toolsAgents,
  codingWithAi,
  imagesAudio,
  privacySecurity,
  costLatency,
  projectsInterview,
];

export default {
  id: 'ai',
  title: 'AI for Developers',
  short: 'AI',
  tagline: 'Use LLMs to build smarter apps, safely and cheaply',
  color: '#10A37F',
  icon: 'auto-awesome',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
