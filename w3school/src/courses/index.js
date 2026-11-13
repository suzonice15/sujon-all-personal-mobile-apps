// Course content lives in one folder per course: src/courses/<course>/
//   index.js          course info (id, title, short, tagline, color, icon) and chapter order
//   <chapter-id>.js   one chapter: { id, title, description, icon, lessons, quiz }
//
// Lesson blocks:
//   { type: 'text', value }                 paragraph
//   { type: 'heading', value }              small sub-heading inside a lesson
//   { type: 'list', items: [] }             bullet list
//   { type: 'code', lang, value, tryIt }    code sample (lang: html | css | js | jsx | ts | tsx | vue | php | python | sql | java | c | cpp | bash | dockerfile | yaml | rn | mongosh | git | text); tryIt opens the live editor
//                                           (js runs as a script with a console panel; jsx renders with React;
//                                           vue mounts a Single File Component; php runs on PHP 8.3 and python on
//                                           CPython 3.14, both compiled to WebAssembly; git runs
//                                           commands in a Git playground, see gitPlayground.js)
//   { type: 'note', value }                 highlighted tip
//
// Quiz questions: { chapterId, q, options: [4 strings], answer: <index>, explain }.
// Options are shuffled when a quiz starts, so the answer position does not matter.
// Lesson ids are stored with the user's progress: never rename an existing one.

import html from './html';
import css from './css';
import javascript from './javascript';
import react from './react';
import vue from './vue';
import php from './php';
import python from './python';
import laravel from './laravel';
import git from './git';
import sql from './sql';
import typescript from './typescript';
import dsa from './dsa';
import nodejs from './nodejs';
import java from './java';
import cLang from './c';
import cpp from './cpp';
import linux from './linux';
import docker from './docker';
import reactNative from './react-native';
import networks from './networks';
import mongodb from './mongodb';
import postgresql from './postgresql';
import redis from './redis';
import mysql from './mysql';
import graphql from './graphql';
import systemDesign from './system-design';
import csharp from './csharp';
import ai from './ai';
import flutter from './flutter';
import go from './go';
import cybersecurity from './cybersecurity';
import freelancing from './freelancing';
import designPatterns from './design-patterns';
import wordpress from './wordpress';
import microservices from './microservices';
import angular from './angular';
import uiUx from './ui-ux';
import express from './express';
import devops from './devops';
import django from './django';
import flask from './flask';
import payments from './payments';
import auth from './auth';
import englishDev from './english-dev';
import interviewPrep from './interview-prep';
import agile from './agile';
import pwa from './pwa';
import realtime from './realtime';
import kotlin from './kotlin';
import swift from './swift';
import cloud from './cloud';
import kubernetes from './kubernetes';
import os from './os';
import compiler from './compiler';
import architecture from './architecture';
import dotnet from './dotnet';
import nextjs from './nextjs';
import ml from './ml';
import mathMl from './math-ml';
import springBoot from './spring-boot';
import rust from './rust';

// Every course shown on the Home grid. Only add a course here once its
// content is written: Play rejects apps with empty "coming soon" sections.
// To add one: create its folder (copy the shape of ./html) and list it here.
export const COURSE_GROUPS = [
  { title: 'Web Development', courses: [html, css, javascript, typescript, wordpress, pwa] },
  { title: 'Frontend Frameworks', courses: [react, vue, nextjs, angular] },
  { title: 'Mobile Development', courses: [reactNative, flutter, kotlin, swift] },
  { title: 'Backend & Data', courses: [php, python, sql, nodejs, mongodb, postgresql, redis, mysql, payments, realtime] },
  { title: 'AI & Future Skills', courses: [ai, mathMl, ml] },
  { title: 'Security', courses: [cybersecurity, auth] },
  { title: 'Career & Business', courses: [freelancing, designPatterns, englishDev, interviewPrep, agile] },
  { title: 'Design', courses: [uiUx] },
  { title: 'Backend Frameworks', courses: [laravel, dotnet, springBoot, graphql, express, django, flask] },
  { title: 'OS & DevOps', courses: [linux, docker, devops, cloud, kubernetes] },
  { title: 'Computer Science', courses: [dsa, networks, systemDesign, os, compiler, architecture, microservices] },
  { title: 'Languages', courses: [java, cLang, cpp, csharp, go, rust] },
  { title: 'Developer Tools', courses: [git] },
];

export const COURSES = COURSE_GROUPS.flatMap(g => g.courses);

export const getCourse = (courseId) => COURSES.find(c => c.id === courseId) || null;

export const getAllLessons = (course) =>
  course.chapters.flatMap(ch => ch.lessons.map(l => ({ ...l, chapterId: ch.id })));

export const findLesson = (course, lessonId) => {
  const all = getAllLessons(course);
  const index = all.findIndex(l => l.id === lessonId);
  if (index < 0) return null;
  return { lesson: all[index], prev: all[index - 1] || null, next: all[index + 1] || null };
};

export const getChapter = (course, chapterId) => course.chapters.find(ch => ch.id === chapterId);

export const getQuizQuestions = (course, chapterId = null) =>
  chapterId ? course.quiz.filter(q => q.chapterId === chapterId) : course.quiz;

export const countLessons = (course) => course.chapters.reduce((n, ch) => n + ch.lessons.length, 0);

// Interview questions live in src/courses/<course>/interview-qa.js, grouped by chapter id:
//   { [chapterId]: [{ q, a, level: 'basic' | 'intermediate' | 'advanced', code?, lang? }] }
export const getInterviewQuestions = (course, chapterId) => course.interviewQuestions?.[chapterId] || [];

export const countInterviewQuestions = (course) =>
  course.chapters.reduce((n, ch) => n + getInterviewQuestions(course, ch.id).length, 0);

// Stable key used to store "practiced" state for one question.
export const interviewKey = (course, chapterId, index) => `${course.id}:${chapterId}:${index}`;
