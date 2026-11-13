// Interview Preparation interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What are the usual interview stages?',
      a: 'Resume screen, recruiter call, technical rounds, design or take-home, and a final team round.',
      level: 'basic',
    },
    {
      q: 'How long should you prepare?',
      a: 'Four to eight weeks of focused practice, while applying in parallel.',
      level: 'basic',
    },
    {
      q: 'What do companies test?',
      a: 'Correct readable code, clear reasoning, debugging, collaboration and role understanding.',
      level: 'basic',
    },
    {
      q: 'Why do most candidates fail?',
      a: 'Communication: they cannot explain a solution or a trade-off clearly.',
      level: 'intermediate',
    },
  ],
  resume: [
    {
      q: 'How long should a resume be?',
      a: 'One page for early career. Clear sections and scannable results.',
      level: 'basic',
    },
    {
      q: 'What makes a bullet strong?',
      a: 'A measurable result, such as latency reduced from 800ms to 220ms.',
      level: 'basic',
    },
    {
      q: 'How many portfolio projects?',
      a: 'Two or three finished, deployed projects you can explain end to end.',
      level: 'basic',
    },
    {
      q: 'Why keep the LinkedIn headline consistent?',
      a: 'Recruiters search by role; a consistent headline helps discovery.',
      level: 'basic',
    },
  ],
  'job-search': [
    {
      q: 'Which source has the best response rate?',
      a: 'Referrals from people you worked with.',
      level: 'basic',
    },
    {
      q: 'What match level is worth applying?',
      a: 'Around 60 percent or more. A 20 percent match rarely converts.',
      level: 'intermediate',
    },
    {
      q: 'What should an outreach message contain?',
      a: 'Who you are, the role, why you fit and a link to the resume.',
      level: 'basic',
    },
    {
      q: 'Why track applications?',
      a: 'To avoid duplicates and missed follow-ups, and to review what works.',
      level: 'basic',
    },
  ],
  behavioral: [
    {
      q: 'What does STAR stand for?',
      a: 'Situation, Task, Action, Result.',
      level: 'basic',
    },
    {
      q: 'What should you use for your actions?',
      a: '“I”, so the interviewer knows your contribution.',
      level: 'basic',
    },
    {
      q: 'How many stories to prepare?',
      a: 'About six themes covering bugs, conflict, failure, leadership, learning and pushback.',
      level: 'intermediate',
    },
    {
      q: 'How do you answer a weakness question?',
      a: 'Name a real one and the concrete change you made because of it.',
      level: 'intermediate',
    },
  ],
  technical: [
    {
      q: 'What should you do before coding?',
      a: 'Restate the problem, ask about edge cases and limits, then describe the approach.',
      level: 'basic',
    },
    {
      q: 'What do interviewers score?',
      a: 'The process: clarification, reasoning, communication and correctness.',
      level: 'basic',
    },
    {
      q: 'How do you handle “what would you change”?',
      a: 'Give one concrete improvement with a reason and a trade-off.',
      level: 'intermediate',
    },
    {
      q: 'How do you debug in an interview?',
      a: 'Reproduce, read the error, form one hypothesis, test it, fix the cause and add a test.',
      level: 'intermediate',
    },
  ],
  'system-design': [
    {
      q: 'What comes first in a design interview?',
      a: 'Clarify requirements and scale before drawing components.',
      level: 'basic',
    },
    {
      q: 'Why estimate peak traffic?',
      a: 'Peak drives capacity, while the average can hide the real load.',
      level: 'intermediate',
    },
    {
      q: 'What is the cache trade-off?',
      a: 'Speed versus staleness. Choose a TTL and an invalidation rule.',
      level: 'intermediate',
    },
    {
      q: 'How do you show senior judgement?',
      a: 'Name the failure modes, how you would detect them and what you would change.',
      level: 'advanced',
    },
  ],
  negotiation: [
    {
      q: 'When do you negotiate?',
      a: 'After an offer, politely and with research.',
      level: 'basic',
    },
    {
      q: 'What is a walk-away number?',
      a: 'The lowest total compensation you will accept.',
      level: 'basic',
    },
    {
      q: 'What should you compare?',
      a: 'Total compensation, growth, manager and stability.',
      level: 'intermediate',
    },
    {
      q: 'Why get the offer in writing?',
      a: 'To confirm the terms before you resign or decline other offers.',
      level: 'basic',
    },
  ],
  'projects-interview': [
    {
      q: 'Why record a mock interview?',
      a: 'It reveals filler words, unclear structure and missing results.',
      level: 'basic',
    },
    {
      q: 'What should you ask the interviewer?',
      a: 'Questions about the work, success in 90 days, deployment and challenges.',
      level: 'basic',
    },
    {
      q: 'How should you run the search?',
      a: 'Like a project: tracker, weekly review, targeted applications and follow-ups.',
      level: 'intermediate',
    },
    {
      q: 'What is the best first step?',
      a: 'Rewrite the resume with measurable results and one deep project.',
      level: 'basic',
    },
  ],
};
