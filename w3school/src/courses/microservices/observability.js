// Microservices chapter: Observability.

export default {
  id: 'observability',
  title: 'Observability',
  description: 'Logs, metrics and distributed tracing',
  icon: 'monitor',
  lessons: [
    {
      id: 'ms-logs-metrics',
      title: 'Logs and metrics',
      blocks: [
        { type: 'text', value: 'Logs record events; metrics record numbers over time. In a distributed system, logs must carry a request id so you can follow one request across services. Metrics power alerts and dashboards.' },
        { type: 'list', items: [
          'Structured JSON logs with a service name and request id',
          'Metrics: counter, gauge and histogram',
          'Alert on symptoms: error rate, latency and saturation',
          'Do not log secrets or personal data',
          'Ship logs to a central store, not one server',
        ] },
        { type: 'note', value: 'A log line without a request id is nearly useless in a distributed system. Add it at the edge and pass it through.' },
      ],
    },
    {
      id: 'ms-tracing',
      title: 'Distributed tracing',
      blocks: [
        { type: 'text', value: 'A trace follows one request through every service. Each span records a step with its timing and parent. Tools such as Jaeger, Tempo and OpenTelemetry visualise the path and show where the time went.' },
        { type: 'code', lang: 'text', tryIt: false, value: `trace 8f2a...
  gateway       12 ms
    courses     38 ms
      database  30 ms
    reviews     95 ms   <- slowest
      cache      2 ms` },
        { type: 'note', value: 'Pass the trace context in headers between services. Without propagation, each service creates a separate trace.' },
      ],
    },
    {
      id: 'ms-alerting',
      title: 'Alerting that works',
      blocks: [
        { type: 'text', value: 'Alert on what users feel: errors, latency and availability. A noisy alert that fires every night is ignored when it matters. Every alert needs a runbook and an owner.' },
        { type: 'list', items: [
          'Page only for urgent, user-facing problems',
          'Use error budgets and SLOs to decide when to alert',
          'Include a runbook link in every alert',
          'Review alerts after incidents and remove noise',
          'Dashboards are for investigation, alerts are for action',
        ] },
        { type: 'note', value: 'An alert without an owner becomes noise. Assign a team and a response.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'observability',
      q: 'Why add a request id to logs?',
      options: ['To make them longer', 'To follow one request across services', 'To compress them', 'To encrypt them'],
      answer: 1,
      explain: 'A request id ties the log lines together.',
    },
    {
      chapterId: 'observability',
      q: 'What is a trace?',
      options: ['A stack trace', 'The path of one request through every service', 'A log file', 'A metric'],
      answer: 1,
      explain: 'A trace follows a request across services.',
    },
    {
      chapterId: 'observability',
      q: 'What should alerts focus on?',
      options: ['Every CPU spike', 'Symptoms users feel: errors, latency and availability', 'Disk colour', 'Deploy logs'],
      answer: 1,
      explain: 'Alert on user-facing symptoms.',
    },
    {
      chapterId: 'observability',
      q: 'Why propagate trace context between services?',
      options: ['To cache data', 'So one request produces one trace', 'To encrypt traffic', 'To reduce logs'],
      answer: 1,
      explain: 'Without propagation, traces fragment.',
    },
  ],
};
