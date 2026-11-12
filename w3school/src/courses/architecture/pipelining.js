// Architecture chapter: Pipelining.

export default {
  id: 'pipelining',
  title: 'Pipelining',
  description: 'Stages, hazards and forwarding',
  icon: 'linear-scale',
  lessons: [
    {
      id: 'arch-pipeline-stages',
      title: 'Pipeline stages',
      blocks: [
        { type: 'text', value: 'A pipeline overlaps instructions: while one is executing, the next is decoding and another is being fetched. Ideally one instruction finishes per cycle.' },
        { type: 'code', lang: 'text', tryIt: false, value: `cycle:   1    2    3    4    5
instr1:  IF   ID   EX   MEM  WB
instr2:       IF   ID   EX   MEM  WB
instr3:            IF   ID   EX   MEM  WB` },
        { type: 'note', value: 'The clock is limited by the slowest stage. Splitting a stage makes each step shorter but adds pipeline register overhead.' },
      ],
    },
    {
      id: 'arch-hazards',
      title: 'Hazards',
      blocks: [
        { type: 'list', items: [
          'Data hazard - an instruction needs a value not written yet',
          'Control hazard - a branch changes which instruction is next',
          'Structural hazard - two instructions need the same unit',
          'Forwarding - pass a result directly to the next instruction',
          'Stall - wait a cycle when forwarding is not enough',
        ] },
        { type: 'code', lang: 'text', tryIt: false, value: `add r1, r2, r3
sub r4, r1, r5   // needs r1 immediately -> data hazard
forwarding can supply r1 without a stall` },
        { type: 'note', value: 'Branch prediction guesses the next instruction. A misprediction flushes the pipeline and costs many cycles.' },
      ],
    },
    {
      id: 'arch-superscalar',
      title: 'Superscalar and out-of-order',
      blocks: [
        { type: 'text', value: 'Modern CPUs issue several instructions per cycle and execute them out of order when dependencies allow. The hardware extracts instruction-level parallelism.' },
        { type: 'list', items: [
          'Multiple issue - several instructions per cycle',
          'Out-of-order execution - run ready instructions first',
          'Register renaming - remove false dependencies',
          'Speculation - predict and verify',
          'Reorder buffer - retire in program order',
        ] },
        { type: 'note', value: 'Out-of-order execution is invisible but real: adjacent independent work can be much faster than a long dependency chain.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'pipelining',
      q: 'What does a pipeline overlap?',
      options: ['Disk writes', 'Instruction stages', 'Network packets', 'Databases'],
      answer: 1,
      explain: 'Different instructions are in different stages.',
    },
    {
      chapterId: 'pipelining',
      q: 'What is a data hazard?',
      options: ['An instruction needs a value not ready yet', 'A branch', 'A cache miss', 'A disk error'],
      answer: 0,
      explain: 'Forwarding or a stall resolves it.',
    },
    {
      chapterId: 'pipelining',
      q: 'What does a branch misprediction cost?',
      options: ['Nothing', 'A pipeline flush and lost cycles', 'A disk write', 'A network retry'],
      answer: 1,
      explain: 'The wrong path is discarded.',
    },
  ],
};
