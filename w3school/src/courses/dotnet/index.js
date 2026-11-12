// .NET platform course. Covers the SDK, ASP.NET Core, dependency injection,
// EF Core, validation, auth, testing and deployment. The C# language itself
// is taught in ../csharp.
//
// Samples are read-only because the Try-it preview cannot run .NET.

import gettingStarted from './getting-started';
import dotnetCli from './dotnet-cli';
import aspnetCore from './aspnet-core';
import dependencyInjection from './dependency-injection';
import entityFramework from './entity-framework';
import validationErrors from './validation-errors';
import authSecurity from './auth-security';
import testingLogging from './testing-logging';
import deployment from './deployment';
import projectsInterview from './projects-interview';
import interviewQuestions from './interview-qa';

const chapters = [
  gettingStarted,
  dotnetCli,
  aspnetCore,
  dependencyInjection,
  entityFramework,
  validationErrors,
  authSecurity,
  testingLogging,
  deployment,
  projectsInterview,
];

export default {
  id: 'dotnet',
  title: '.NET',
  short: '.NET',
  tagline: 'Build web APIs, services and cloud apps with ASP.NET Core',
  color: '#512BD4',
  icon: 'dns',
  chapters,
  quiz: chapters.flatMap(ch => ch.quiz),
  interviewQuestions,
};
