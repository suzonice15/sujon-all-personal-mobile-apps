// Spring Boot chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What Spring Boot is, Spring Initializr and your first app',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'sb-what-is',
      title: 'What is Spring Boot?',
      blocks: [
        { type: 'text', value: 'Spring is a large Java framework for building applications. Spring Boot removes the setup work: it picks sensible defaults, starts an embedded web server and lets you run the app with one command. You focus on your code, not on XML files.' },
        { type: 'list', items: [
          'Spring Framework - dependency injection, web, data and security modules',
          'Spring Boot - auto-configuration and an embedded Tomcat server',
          'Starters - one dependency brings in a whole feature, such as spring-boot-starter-web',
          'Runs as a single executable jar',
        ] },
        { type: 'note', value: 'Spring Boot is used by many large companies for backend services. Learning it gives you a skill that transfers across most Java jobs.' },
      ],
    },
    {
      id: 'sb-initializr',
      title: 'Create a project',
      blocks: [
        { type: 'text', value: 'Spring Initializr at start.spring.io generates a ready project. Choose Maven or Gradle, Java 21 or later, and add the starters you need. Then open the project in your IDE and run it.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `# Download a starter project with a web and data starter
curl https://start.spring.io/starter.zip \\
  -d dependencies=web,data-jpa,h2 \\
  -d javaVersion=21 \\
  -o courses-api.zip
unzip courses-api.zip -d courses-api
cd courses-api
./mvnw spring-boot:run` },
        { type: 'note', value: 'Use the Maven or Gradle wrapper (mvnw or gradlew) so every developer and the CI server use the same build tool version.' },
      ],
    },
    {
      id: 'sb-first-app',
      title: 'Your first application',
      blocks: [
        { type: 'text', value: 'The entry point has @SpringBootApplication. It turns on auto-configuration, component scanning and configuration in one annotation. A @RestController class returns data from its methods.' },
        { type: 'code', lang: 'java', tryIt: false, value: `package com.codenest.courses;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class CoursesApplication {

    public static void main(String[] args) {
        SpringApplication.run(CoursesApplication.class, args);
    }
}

@RestController
class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring Boot";
    }
}` },
        { type: 'note', value: 'Open http://localhost:8080/hello after the app starts. Put the main class in the root package so component scanning finds the other classes.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What does Spring Boot add on top of Spring?',
      options: ['A new language', 'Auto-configuration and an embedded server', 'A database engine', 'A CSS framework'],
      answer: 1,
      explain: 'Boot removes most manual setup with sensible defaults.',
    },
    {
      chapterId: 'getting-started',
      q: 'What is a Spring Boot starter?',
      options: ['A test runner', 'A dependency that brings in a whole feature', 'A database', 'A build server'],
      answer: 1,
      explain: 'For example, spring-boot-starter-web includes the web stack.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which annotation marks the application entry point?',
      options: ['@RestController', '@SpringBootApplication', '@Entity', '@Service'],
      answer: 1,
      explain: 'It enables auto-configuration and component scanning.',
    },
    {
      chapterId: 'getting-started',
      q: 'Why use the Maven or Gradle wrapper?',
      options: ['It is faster', 'Every developer and CI uses the same build tool version', 'It removes dependencies', 'It is required for Java'],
      answer: 1,
      explain: 'The wrapper pins the build tool version for the project.',
    },
  ],
};
