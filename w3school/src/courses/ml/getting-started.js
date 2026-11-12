// ML chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What machine learning is, the workflow and your tools',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'ml-what-is',
      title: 'What is machine learning?',
      blocks: [
        { type: 'text', value: 'Traditional programming: you write the rules and the computer produces answers. Machine learning flips it: you give examples with answers, and the computer finds the rules. The result is a model, a function that maps inputs to predictions.' },
        { type: 'list', items: [
          'Features (X) are the inputs: size, rooms, age of a flat',
          'Labels (y) are the known answers: the price that was paid',
          'Training fits the model to examples; prediction uses it on new inputs',
          'A model is only as good as its data and its evaluation',
        ] },
        { type: 'note', value: 'Machine learning is not magic. It is statistics plus optimization, run on a lot of examples. Knowing the math makes you far more effective than memorizing library calls.' },
      ],
    },
    {
      id: 'ml-types',
      title: 'Types of learning',
      blocks: [
        { type: 'list', items: [
          'Supervised regression - predict a number (price, delivery time)',
          'Supervised classification - predict a category (spam or not, fraud or not)',
          'Unsupervised - find structure without labels (customer segments)',
          'Reinforcement learning - learn by trial and reward (game playing, robotics)',
        ] },
        { type: 'text', value: 'Most business problems are supervised, because labeled history usually exists. Start with supervised learning and move to the others only when the problem needs it.' },
      ],
    },
    {
      id: 'ml-workflow-tools',
      title: 'The workflow and your tools',
      blocks: [
        { type: 'list', items: [
          'Define the question and the metric before any code',
          'Collect and understand the data',
          'Split into train and test sets before any learning',
          'Prepare features, train, evaluate, improve, deploy, monitor',
          'Tools: Python, NumPy, pandas, matplotlib, scikit-learn, Jupyter',
        ] },
        { type: 'code', lang: 'bash', tryIt: false, value: `python -m venv .venv
source .venv/bin/activate        # Windows: .venv\\Scripts\\activate
pip install numpy pandas matplotlib scikit-learn jupyter
jupyter lab` },
        { type: 'note', value: 'Use a separate virtual environment per project. Different versions of scikit-learn can give different numbers, so pin versions in requirements.txt.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'In supervised learning, what are labels?',
      options: ['The model weights', 'The known correct answers for each example', 'The feature names', 'The test set'],
      answer: 1,
      explain: 'Labels are the answers the model learns to predict.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which type of problem predicts a category?',
      options: ['Regression', 'Classification', 'Clustering only', 'Reinforcement'],
      answer: 1,
      explain: 'Classification outputs a class such as spam or not spam.',
    },
    {
      chapterId: 'getting-started',
      q: 'When should you split data into train and test sets?',
      options: ['After training', 'Before any learning or preparation that uses the data', 'Only in production', 'Never'],
      answer: 1,
      explain: 'The test set must stay unseen to give an honest score.',
    },
    {
      chapterId: 'getting-started',
      q: 'Why use a virtual environment for an ML project?',
      options: ['It makes models faster', 'It keeps library versions isolated and reproducible', 'It removes the need for data', 'It enables GPUs'],
      answer: 1,
      explain: 'Isolated environments keep results reproducible.',
    },
  ],
};
