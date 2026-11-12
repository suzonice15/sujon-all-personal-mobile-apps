// Security chapter: Incident Response.

export default {
  id: 'incident-response',
  title: 'Incident Response',
  description: 'Detect, contain, recover and learn',
  icon: 'report',
  lessons: [
    {
      id: 'sec-ir-prepare',
      title: 'Prepare and detect',
      blocks: [
        { type: 'text', value: 'An incident is a security event that affects confidentiality, integrity or availability. Preparation means logs, alerts, an owner and a written playbook before anything happens.' },
        { type: 'list', items: [
          'Central logs with retention',
          'Alerts for auth failures, admin changes and data exports',
          'An on-call owner and contact list',
          'A playbook for common incidents',
          'Backups with a tested restore',
          'A way to revoke credentials quickly',
        ] },
        { type: 'note', value: 'Detection is usually a user report or a billing spike, not a dramatic alarm. Make reporting easy.' },
      ],
    },
    {
      id: 'sec-ir-contain',
      title: 'Contain and eradicate',
      blocks: [
        { type: 'text', value: 'First stop the bleeding: revoke tokens, disable the account, isolate the host, block the IP. Preserve evidence before deleting anything.' },
        { type: 'list', items: [
          'Preserve logs and disk images',
          'Rotate exposed credentials',
          'Patch the entry point',
          'Remove persistence and backdoors',
          'Verify the fix with a scan or test',
          'Communicate status to stakeholders',
        ] },
        { type: 'note', value: 'Do not reboot or wipe a compromised host before capturing evidence. That destroys the timeline you need.' },
      ],
    },
    {
      id: 'sec-ir-recover',
      title: 'Recover',
      blocks: [
        { type: 'text', value: 'Restore from a known-good backup, rebuild rather than trust a cleaned host, and monitor closely for recurrence.' },
        { type: 'list', items: [
          'Restore data and verify integrity',
          'Rebuild compromised systems',
          'Rotate all credentials, not only the one found',
          'Watch for the attacker returning',
          'Confirm normal service for users',
        ] },
        { type: 'note', value: 'If you do not know how the attacker got in, recovery is a guess. Keep investigating until the entry point is understood.' },
      ],
    },
    {
      id: 'sec-ir-postmortem',
      title: 'Postmortem',
      blocks: [
        { type: 'text', value: 'A blameless postmortem explains impact, timeline, root cause and follow-up actions with owners and dates. The goal is a system that fails less, not a person to blame.' },
        { type: 'code', lang: 'text', tryIt: false, value: `Summary: 2 hours of exposed order data
Timeline: 10:02 deploy, 10:15 alert, 10:40 contained
Root cause: missing ownership check on /orders/:id
Actions: fix + regression test (owner, date)
         add authz test to CI (owner, date)
         rotate DB credentials (done)` },
        { type: 'note', value: 'Follow-up actions without owners and dates do not happen. Track them like any other work.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'incident-response',
      q: 'What is an incident?',
      options: ['Any bug', 'A security event affecting confidentiality, integrity or availability', 'A slow page', 'A design change'],
      answer: 1,
      explain: 'It is a security event with real impact.',
    },
    {
      chapterId: 'incident-response',
      q: 'What comes first during containment?',
      options: ['Delete logs', 'Stop the bleeding and preserve evidence', 'Rewrite the app', 'Post on social media'],
      answer: 1,
      explain: 'Contain, preserve, then investigate.',
    },
    {
      chapterId: 'incident-response',
      q: 'Why rebuild rather than clean a host?',
      options: ['It is faster', 'A cleaned host may still hide persistence', 'It is cheaper', 'It looks better'],
      answer: 1,
      explain: 'Rebuilding from a known-good state is safer.',
    },
    {
      chapterId: 'incident-response',
      q: 'What makes a postmortem useful?',
      options: ['Blaming someone', 'A clear timeline, cause and owned actions', 'A long story', 'A tool list'],
      answer: 1,
      explain: 'Actions with owners and dates prevent recurrence.',
    },
  ],
};
