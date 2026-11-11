// Linux chapter: Cron and systemd.

export default {
  id: 'cron-systemd',
  title: 'Cron & systemd',
  description: 'Schedule jobs and run services reliably',
  icon: 'schedule',
  lessons: [
    {
      id: 'linux-cron',
      title: 'Cron',
      blocks: [
        { type: 'text', value: 'Cron runs commands on a schedule. Five fields set minute, hour, day of month, month and day of week. Use crontab -e to edit your jobs.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `crontab -e
crontab -l

# every day at 02:30
30 2 * * * /home/app/backup.sh >> /var/log/backup.log 2>&1

# every 5 minutes
*/5 * * * * /home/app/healthcheck.sh` },
        { type: 'note', value: 'Cron has a minimal environment. Use absolute paths and redirect output to a log, or failures disappear silently.' },
      ],
    },
    {
      id: 'linux-systemd-service',
      title: 'systemd services',
      blocks: [
        { type: 'text', value: 'systemd starts and supervises services. A unit file describes the command, the user, restart policy and dependencies.' },
        { type: 'code', lang: 'text', tryIt: false, value: `[Unit]
Description=CodeNest API
After=network.target

[Service]
User=app
WorkingDirectory=/srv/app
ExecStart=/usr/bin/node /srv/app/server.js
Restart=always
RestartSec=3
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target` },
        { type: 'code', lang: 'bash', tryIt: false, value: `sudo systemctl daemon-reload
sudo systemctl enable --now codenest
sudo systemctl status codenest
sudo systemctl restart codenest` },
        { type: 'note', value: 'Restart=always is the difference between a service that recovers from a crash and one that stays down until someone notices.' },
      ],
    },
    {
      id: 'linux-journalctl',
      title: 'Logs with journalctl',
      blocks: [
        { type: 'text', value: 'journalctl reads the systemd journal. Filter by unit, follow live logs, or show only errors.' },
        { type: 'code', lang: 'bash', tryIt: false, value: `journalctl -u codenest -f
journalctl -u codenest --since "1 hour ago"
journalctl -p err -b
journalctl --disk-usage
sudo journalctl --vacuum-time=7d` },
        { type: 'list', items: [
          '-u filters by service',
          '-f follows like tail -f',
          '-p err shows errors and above',
          '-b limits to the current boot',
        ] },
      ],
    },
    {
      id: 'linux-log-rotation',
      title: 'Log rotation',
      blocks: [
        { type: 'text', value: 'Logs grow forever without rotation. logrotate renames, compresses and deletes old logs on a schedule.' },
        { type: 'code', lang: 'text', tryIt: false, value: `/var/log/codenest/*.log {
    daily
    rotate 14
    compress
    missingok
    notifempty
    copytruncate
}` },
        { type: 'note', value: 'A full disk from logs takes down the whole server. Set rotation and monitor disk usage with df -h.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'cron-systemd',
      q: 'How many fields does a cron schedule have?',
      options: ['3', '4', '5', '6'],
      answer: 2,
      explain: 'Minute, hour, day of month, month and day of week.',
    },
    {
      chapterId: 'cron-systemd',
      q: 'Why use absolute paths in cron?',
      options: ['They are faster', 'Cron has a minimal environment and PATH', 'Cron cannot read files', 'They are required by bash'],
      answer: 1,
      explain: 'The cron environment may not include your shell PATH.',
    },
    {
      chapterId: 'cron-systemd',
      q: 'Which command follows a service log live?',
      options: ['journalctl -u app -f', 'cat app.log', 'systemctl start app', 'ls app.log'],
      answer: 0,
      explain: 'journalctl -u filters by unit and -f follows.',
    },
    {
      chapterId: 'cron-systemd',
      q: 'What does Restart=always do?',
      options: ['Restarts the server', 'Restarts the service after it exits', 'Reboots the machine', 'Reloads nginx'],
      answer: 1,
      explain: 'systemd restarts the process automatically.',
    },
  ],
};
