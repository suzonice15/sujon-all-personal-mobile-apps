// AI chapter: Images and Audio.

export default {
  id: 'images-audio',
  title: 'Images & Audio',
  description: 'Generate images, transcribe speech and add voice',
  icon: 'image',
  lessons: [
    {
      id: 'ai-image-generation',
      title: 'Image generation',
      blocks: [
        { type: 'text', value: 'Image models turn a text prompt into an image. They are useful for illustrations, mockups and icons, but they are not a source of truth for real people or products.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Prompt:
"A flat illustration of a student learning to code on a phone,
teal and white palette, simple shapes, no text, 1:1"

Style: flat vector
Negative: photorealism, text, logos, extra fingers` },
        { type: 'list', items: [
          'Describe subject, style, colors, composition and aspect ratio',
          'Say what you do not want',
          'Generate several variations and choose',
          'Check rights and disclosure requirements',
          'Do not generate real people or brands without permission',
        ] },
        { type: 'note', value: 'Image models still struggle with text inside images, exact counts and hands. Expect to iterate.' },
      ],
    },
    {
      id: 'ai-transcription',
      title: 'Speech to text',
      blocks: [
        { type: 'text', value: 'Transcription turns audio into text. It powers subtitles, meeting notes, voice search and accessibility. Quality depends on noise, accent and audio length.' },
        { type: 'code', lang: 'js', tryIt: false, value: `const form = new FormData();
form.append('file', audioFile);
form.append('model', 'whisper-1');

const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
  method: 'POST',
  headers: { Authorization: 'Bearer ' + process.env.OPENAI_API_KEY },
  body: form,
});

const { text } = await response.json();` },
        { type: 'note', value: 'Transcription is not free of mistakes. Names, numbers and technical terms need review. Always show the transcript to the user.' },
      ],
    },
    {
      id: 'ai-tts',
      title: 'Text to speech',
      blocks: [
        { type: 'text', value: 'Text-to-speech reads text aloud. It is useful for accessibility, learning apps and audio versions of articles. Choose a voice that fits the audience and test on a phone speaker.' },
        { type: 'list', items: [
          'Short chunks sound more natural',
          'Punctuation controls pauses',
          'Provide captions as well as audio',
          'Cache generated audio for repeated playback',
          'Check voice licensing for commercial use',
        ] },
        { type: 'note', value: 'Audio files are large. Stream them or cache them; do not generate the same lesson audio on every open.' },
      ],
    },
    {
      id: 'ai-media-cost',
      title: 'Cost and quality',
      blocks: [
        { type: 'list', items: [
          'Image and audio models are usually priced per unit, not per token',
          'Generate at the smallest size that meets the need',
          'Cache results and reuse assets',
          'Use a cheaper model for drafts, a better one for final',
          'Measure quality with real users, not only your taste',
        ] },
        { type: 'note', value: 'A beautiful demo can hide a cost problem. Estimate per-user cost before you launch a feature that generates media.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'images-audio',
      q: 'What should an image prompt include?',
      options: ['Only a subject', 'Subject, style, colors and aspect ratio', 'A password', 'The API key'],
      answer: 1,
      explain: 'Specific visual details improve the result.',
    },
    {
      chapterId: 'images-audio',
      q: 'What is transcription?',
      options: ['Text to speech', 'Speech to text', 'Image to text', 'Text to image'],
      answer: 1,
      explain: 'It converts audio into a transcript.',
    },
    {
      chapterId: 'images-audio',
      q: 'Why cache generated audio?',
      options: ['To save cost and time', 'To improve the voice', 'To encrypt it', 'To reduce quality'],
      answer: 0,
      explain: 'Reusing the file avoids regenerating it.',
    },
    {
      chapterId: 'images-audio',
      q: 'What is a risk of generated images?',
      options: ['They are always accurate', 'They can misuse real people or brands', 'They cannot be saved', 'They are free'],
      answer: 1,
      explain: 'Rights and consent matter.',
    },
  ],
};
