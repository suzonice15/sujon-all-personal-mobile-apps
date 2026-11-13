// Freelancing & Client Work course. Build a freelance career: profiles,
// proposals, pricing, contracts, communication and scaling.
//
// Samples are read-only text and bash scripts.

import gettingStarted from './getting-started';
import profilePortfolio from './profile-portfolio';
import findingClients from './finding-clients';
import pricingContracts from './pricing-contracts';
import communication from './communication';
import projectManagement from './project-management';
import wordpressNocode from './wordpress-nocode';
import paymentsTaxes from './payments-taxes';
import scaling from './scaling';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  profilePortfolio,
  findingClients,
  pricingContracts,
  communication,
  projectManagement,
  wordpressNocode,
  paymentsTaxes,
  scaling,
  projectsInterview,
];

export default {
  id: 'freelancing',
  title: 'Freelancing & Client Work',
  short: 'Freelance',
  tagline: 'Build a freelance career and work with real clients',
  color: '#2563EB',
  icon: 'work',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
