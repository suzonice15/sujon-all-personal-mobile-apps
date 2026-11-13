// Learning paths: guided routes through the courses, in the order to study them.
// Each step is a course id from src/courses. Progress is calculated from the
// lessons the user has completed, so a course counts toward every path it is in.
//
// Lesson progress comes from src/db/courseProgress (getAllCourseProgress).

import { getCourse, countLessons } from './index';

export const LEARNING_PATHS = [
  {
    id: 'frontend',
    title: 'Frontend Developer',
    tagline: 'Build websites and modern web apps',
    color: '#E44D26',
    icon: 'web',
    steps: ['html', 'css', 'javascript', 'typescript', 'react', 'nextjs', 'pwa'],
  },
  {
    id: 'backend-node',
    title: 'Backend with Node.js',
    tagline: 'APIs, databases and deployment in JavaScript',
    color: '#339933',
    icon: 'storage',
    steps: ['javascript', 'nodejs', 'express', 'realtime', 'sql', 'git', 'docker', 'payments'],
  },
  {
    id: 'backend-python',
    title: 'Backend with Python',
    tagline: 'Web APIs with Django and Flask',
    color: '#3776AB',
    icon: 'terminal',
    steps: ['python', 'sql', 'django', 'flask', 'docker'],
  },
  {
    id: 'career-starter',
    title: 'Career Starter',
    tagline: 'English, interviews, freelancing and team process',
    color: '#7C3AED',
    icon: 'work',
    steps: ['git', 'english-dev', 'interview-prep', 'freelancing', 'agile'],
  },
  {
    id: 'backend-java',
    title: 'Backend with Java',
    tagline: 'Enterprise APIs with Java and Spring Boot',
    color: '#E76F00',
    icon: 'coffee',
    steps: ['java', 'sql', 'spring-boot', 'docker'],
  },
  {
    id: 'backend-dotnet',
    title: 'Backend with .NET',
    tagline: 'Build web APIs with C# and ASP.NET Core',
    color: '#512BD4',
    icon: 'dns',
    steps: ['csharp', 'dotnet', 'sql', 'docker'],
  },
  {
    id: 'mobile',
    title: 'Mobile Developer',
    tagline: 'Build apps for Android and iOS',
    color: '#0EA5E9',
    icon: 'phone-android',
    steps: ['javascript', 'react-native', 'kotlin', 'flutter'],
  },
  {
    id: 'data-ai',
    title: 'Data & AI',
    tagline: 'From data analysis to machine learning models',
    color: '#7C3AED',
    icon: 'psychology',
    steps: ['python', 'sql', 'math-ml', 'ml', 'ai'],
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud',
    tagline: 'Run and ship software reliably',
    color: '#0F766E',
    icon: 'cloud',
    steps: ['linux', 'git', 'docker', 'devops', 'cloud', 'kubernetes'],
  },
  {
    id: 'computer-science',
    title: 'Computer Science',
    tagline: 'The ideas behind every program',
    color: '#475569',
    icon: 'computer',
    steps: ['dsa', 'networks', 'os', 'compiler', 'architecture', 'design-patterns', 'microservices'],
  },
  {
    id: 'security',
    title: 'Cyber Security',
    tagline: 'Defend systems and understand attacks',
    color: '#DC2626',
    icon: 'security',
    steps: ['linux', 'networks', 'cybersecurity', 'auth'],
  },
];

export const getLearningPath = (pathId) => LEARNING_PATHS.find(p => p.id === pathId) || null;

// Status of one course inside a path, from its lesson progress.
export const stepStatus = (done, total, opened) => {
  if (total > 0 && done >= total) return 'completed';
  if (done > 0 || opened) return 'started';
  return 'todo';
};

// Progress for one path. progress is the map from getAllCourseProgress().
export const pathProgress = (path, progress = {}) => {
  const steps = path.steps.map((courseId, index) => {
    const course = getCourse(courseId);
    const total = course ? countLessons(course) : 0;
    const entry = progress[courseId];
    const done = entry?.completedIds?.size || 0;
    const opened = !!entry?.lastOpenedAt;
    return {
      index: index + 1,
      courseId,
      course,
      done,
      total,
      status: stepStatus(done, total, opened),
    };
  });

  const totalLessons = steps.reduce((n, s) => n + s.total, 0);
  const doneLessons = steps.reduce((n, s) => n + Math.min(s.done, s.total), 0);
  const completedSteps = steps.filter(s => s.status === 'completed').length;

  return {
    steps,
    totalSteps: steps.length,
    completedSteps,
    doneLessons,
    totalLessons,
    pct: totalLessons ? doneLessons / totalLessons : 0,
  };
};
