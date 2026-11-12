// C# language course. Written for beginners: every concept is explained in
// plain language first, then shown in a small complete program.
// The .NET platform (ASP.NET Core, EF Core, testing, deployment) lives in its own course: ../dotnet.
//
// Samples are read-only because the Try-it preview cannot run C#.

import gettingStarted from './getting-started';
import variablesTypes from './variables-types';
import operatorsControl from './operators-control';
import methods from './methods';
import classesObjects from './classes-objects';
import inheritancePolymorphism from './inheritance-polymorphism';
import collectionsLinq from './collections-linq';
import exceptionsFiles from './exceptions-files';
import asyncAwait from './async-await';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  variablesTypes,
  operatorsControl,
  methods,
  classesObjects,
  inheritancePolymorphism,
  collectionsLinq,
  exceptionsFiles,
  asyncAwait,
  projectsInterview,
];

export default {
  id: 'csharp',
  title: 'C#',
  short: 'C#',
  tagline: 'Modern, type-safe language for apps, games and services',
  color: '#68217A',
  icon: 'code',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
