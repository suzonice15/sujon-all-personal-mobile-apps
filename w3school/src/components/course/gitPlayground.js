// Git playground used by Try it for lang: 'git'. It runs a script of shell and git
// commands against a real Git implementation (isomorphic-git) on an in-memory file
// system, and prints output in the style of the git command line.
//
// The engine is kept as source text because it runs inside the Try it WebView page
// (and in the course checker under Node). It must not use template literals: it is
// embedded into a template string. Signature: async (script, git, fs, print) => void.
// Commit times are fixed (starting 10 Mar 2026 10:00 +06:00, one minute per commit),
// so hashes and output are the same on every run.

export const GIT_PLAYGROUND_JS = String.raw`async function runGitScript(script, git, fs, print) {
  var pfs = fs.promises;
  var dir = '/repo';
  var state = { inited: false, name: null, email: null, clock: 1773115200, mergeHead: null, mergeMsg: null, conflicts: [], lastIndexSecond: 0, reflog: [] };
  var NOT_REPO = 'fatal: not a git repository (or any of the parent directories): .git';

  function out(text) { print(String(text)); }
  function short(oid) { return oid.slice(0, 7); }
  function pad(s, n) { s = String(s); while (s.length < n) s += ' '; return s; }

  function tokenize(line) {
    var tokens = [], cur = '', quote = null, had = false;
    for (var i = 0; i < line.length; i++) {
      var c = line[i];
      if (quote) {
        if (c === quote) { quote = null; }
        else if (c === '\\' && quote === '"' && i + 1 < line.length) { cur += line[++i]; }
        else { cur += c; }
      } else if (c === '"' || c === "'") { quote = c; had = true; }
      else if (c === ' ' || c === '\t') { if (cur || had) { tokens.push(cur); cur = ''; had = false; } }
      else if (c === '>') {
        if (cur || had) { tokens.push(cur); cur = ''; had = false; }
        if (line[i + 1] === '>') { tokens.push('>>'); i++; } else { tokens.push('>'); }
      } else { cur += c; }
    }
    if (cur || had) tokens.push(cur);
    return tokens;
  }

  function p(path) { return path.replace(/^\.\//, '').replace(/\/+$/, ''); }
  async function exists(path) { try { await pfs.stat(dir + '/' + path); return true; } catch (e) { return false; } }
  async function mkdirp(path) {
    var parts = path.split('/'), acc = dir;
    for (var i = 0; i < parts.length; i++) {
      if (!parts[i]) continue;
      acc += '/' + parts[i];
      try { await pfs.mkdir(acc); } catch (e) { if (e.code !== 'EEXIST') throw e; }
    }
  }
  async function readText(path) { return new TextDecoder().decode(await pfs.readFile(dir + '/' + path)); }
  async function writeText(path, text) {
    var slash = path.lastIndexOf('/');
    if (slash > 0) await mkdirp(path.slice(0, slash));
    var bytes = new TextEncoder().encode(text);
    // "Racy git": Git trusts size + modification time (whole seconds). If the new content
    // has the same size as the STAGED version but different bytes, and the index was
    // updated in the same second, git would think the file is unchanged. Wait for the next
    // second in that case so the timestamp differs.
    if (state.inited) {
      try {
        var staged = await readStage(path);
        if (staged !== null && staged !== text && new TextEncoder().encode(staged).length === bytes.length) {
          while (Math.floor(Date.now() / 1000) <= state.lastIndexSecond) await new Promise(function (r) { setTimeout(r, 50); });
        }
      } catch (e) {}
    }
    await pfs.writeFile(dir + '/' + path, bytes);
  }
  async function listFiles(base) {
    var result = [];
    async function walkDir(rel) {
      var names = await pfs.readdir(dir + (rel ? '/' + rel : ''));
      names.sort();
      for (var i = 0; i < names.length; i++) {
        if (!rel && names[i] === '.git') continue;
        var r = rel ? rel + '/' + names[i] : names[i];
        var st = await pfs.stat(dir + '/' + r);
        if (st.isDirectory()) await walkDir(r); else result.push(r);
      }
    }
    await walkDir(base || '');
    return result;
  }

  function author() {
    state.clock += 60;
    return { name: state.name || 'Student', email: state.email || 'student@codenest.app', timestamp: state.clock, timezoneOffset: -360 };
  }
  function formatDate(ts) {
    var d = new Date((ts + 6 * 3600) * 1000);
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var two = function (n) { return n < 10 ? '0' + n : '' + n; };
    return days[d.getUTCDay()] + ' ' + months[d.getUTCMonth()] + ' ' + d.getUTCDate() + ' ' +
      two(d.getUTCHours()) + ':' + two(d.getUTCMinutes()) + ':' + two(d.getUTCSeconds()) + ' ' + d.getUTCFullYear() + ' +0600';
  }

  async function currentBranch() { return await git.currentBranch({ fs: fs, dir: dir, fullname: false }); }
  async function headOid() { try { return await git.resolveRef({ fs: fs, dir: dir, ref: 'HEAD' }); } catch (e) { return null; } }

  async function resolveRev(spec) {
    var rl = /^HEAD@\{(\d+)\}$/.exec(spec);
    if (rl) {
      var entry = state.reflog[parseInt(rl[1], 10)];
      if (!entry) throw new Error("fatal: log for 'HEAD' only has " + state.reflog.length + ' entries');
      return entry.oid;
    }
    var m = /^(.*?)((?:[~^]\d*)*)$/.exec(spec);
    var base = m[1] || 'HEAD', suffix = m[2] || '';
    var oid;
    try { oid = await git.resolveRef({ fs: fs, dir: dir, ref: base }); }
    catch (e) {
      try { oid = await git.expandOid({ fs: fs, dir: dir, oid: base }); }
      catch (e2) { throw new Error("fatal: ambiguous argument '" + spec + "': unknown revision"); }
    }
    try { var tagObj = await git.readTag({ fs: fs, dir: dir, oid: oid }); oid = tagObj.tag.object; } catch (e3) {}   // peel annotated tags
    var steps = suffix.match(/[~^]\d*/g) || [];
    for (var i = 0; i < steps.length; i++) {
      var n = steps[i].length > 1 ? parseInt(steps[i].slice(1), 10) : 1;
      if (steps[i][0] === '^') {
        var c0 = await git.readCommit({ fs: fs, dir: dir, oid: oid });
        if (!c0.commit.parent[n - 1]) throw new Error("fatal: ambiguous argument '" + spec + "': unknown revision");
        oid = c0.commit.parent[n - 1];
      } else {
        for (var k = 0; k < n; k++) {
          var c = await git.readCommit({ fs: fs, dir: dir, oid: oid });
          if (!c.commit.parent.length) throw new Error("fatal: ambiguous argument '" + spec + "': unknown revision");
          oid = c.commit.parent[0];
        }
      }
    }
    return oid;
  }

  async function decorations() {
    var map = {}, head = await headOid(), branch = await currentBranch();
    var branches = await git.listBranches({ fs: fs, dir: dir });
    var tags = await git.listTags({ fs: fs, dir: dir });
    function addTo(oid, label) { (map[oid] = map[oid] || []).push(label); }
    for (var i = 0; i < branches.length; i++) {
      var o = await git.resolveRef({ fs: fs, dir: dir, ref: branches[i] });
      if (branches[i] === branch) addTo(o, 'HEAD -> ' + branches[i]); else addTo(o, branches[i]);
    }
    if (head && !branch) addTo(head, 'HEAD');
    for (var j = 0; j < tags.length; j++) {
      var t = await git.resolveRef({ fs: fs, dir: dir, ref: tags[j] });
      try { var tagObj = await git.readTag({ fs: fs, dir: dir, oid: t }); t = tagObj.tag.object; } catch (e) {}
      addTo(t, 'tag: ' + tags[j]);
    }
    for (var key in map) map[key].sort(function (a, b) { return (b.indexOf('HEAD') === 0) - (a.indexOf('HEAD') === 0) || (a.indexOf('tag:') === 0) - (b.indexOf('tag:') === 0) || (a < b ? -1 : 1); });
    return map;
  }

  async function readAt(oid, filepath) {
    try { var r = await git.readBlob({ fs: fs, dir: dir, oid: oid, filepath: filepath }); return new TextDecoder().decode(r.blob); }
    catch (e) { return null; }
  }
  async function readStage(filepath) {
    var found = await git.walk({ fs: fs, dir: dir, trees: [git.STAGE()], map: async function (fp, entries) {
      if (fp === filepath && entries[0]) return await entries[0].oid();
      return undefined;
    } });
    var oid = found.filter(Boolean)[0];
    if (!oid) return null;
    var b = await git.readBlob({ fs: fs, dir: dir, oid: oid });
    return new TextDecoder().decode(b.blob);
  }

  function lineDiff(a, b) {
    var x = a === '' ? [] : a.replace(/\n$/, '').split('\n'), y = b === '' ? [] : b.replace(/\n$/, '').split('\n');
    var n = x.length, m = y.length, i, j, L = [];
    for (i = 0; i <= n; i++) { L.push(new Array(m + 1).fill(0)); }
    for (i = n - 1; i >= 0; i--) for (j = m - 1; j >= 0; j--) L[i][j] = x[i] === y[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    var res = []; i = 0; j = 0;
    while (i < n && j < m) {
      if (x[i] === y[j]) { res.push(' ' + x[i]); i++; j++; }
      else if (L[i + 1][j] >= L[i][j + 1]) { res.push('-' + x[i]); i++; }
      else { res.push('+' + y[j]); j++; }
    }
    while (i < n) res.push('-' + x[i++]);
    while (j < m) res.push('+' + y[j++]);
    return res;
  }
  function printDiff(path, before, after) {
    if (before === after) return;
    out('diff --git a/' + path + ' b/' + path);
    if (before === null) out('new file mode 100644');
    if (after === null) out('deleted file mode 100644');
    out('--- ' + (before === null ? '/dev/null' : 'a/' + path));
    out('+++ ' + (after === null ? '/dev/null' : 'b/' + path));
    var lines = lineDiff(before || '', after || '');
    for (var i = 0; i < lines.length; i++) out(lines[i]);
  }

  async function changedFiles(oldOid, newOid) {
    var trees = [git.TREE({ ref: newOid })];
    if (oldOid) trees.unshift(git.TREE({ ref: oldOid }));
    var res = await git.walk({ fs: fs, dir: dir, trees: trees, map: async function (fp, e) {
      if (fp === '.') return undefined;
      var a = oldOid ? e[0] : null, b = oldOid ? e[1] : e[0];
      var ta = a ? await a.type() : null, tb = b ? await b.type() : null;
      if (ta === 'tree' || tb === 'tree') return undefined;
      var oa = a ? await a.oid() : null, ob = b ? await b.oid() : null;
      return oa === ob ? undefined : fp;
    } });
    return res.filter(Boolean).sort();
  }

  async function status(shortFormat) {
    var branch = await currentBranch();
    var rows = await git.statusMatrix({ fs: fs, dir: dir });
    var staged = [], unstaged = [], untracked = [];
    for (var i = 0; i < rows.length; i++) {
      var f = rows[i][0], h = rows[i][1], w = rows[i][2], s = rows[i][3];
      if (state.conflicts.indexOf(f) >= 0) continue;
      if (h === 0 && s > 0) staged.push(['new file', f]);
      else if (h === 1 && s === 0) staged.push(['deleted', f]);
      else if (h === 1 && (s === 2 || s === 3)) staged.push(['modified', f]);
      if (s > 0 && w === 0) unstaged.push(['deleted', f]);
      else if (s > 0 && w > 0 && !(w === 2 && s === 2) && !(w === 1 && s === 1)) unstaged.push(['modified', f]);
      if (s === 0 && w > 0) untracked.push(f);
    }
    // Rename detection: a staged deletion and a staged new file with identical content
    var head0 = await headOid();
    var deletedIdx = staged.map(function (x, i) { return x[0] === 'deleted' ? i : -1; }).filter(function (i) { return i >= 0; });
    for (var di = 0; di < deletedIdx.length && head0; di++) {
      var del = staged[deletedIdx[di]], oldText = await readAt(head0, del[1]);
      for (var ni = 0; ni < staged.length; ni++) {
        if (staged[ni][0] === 'new file' && oldText !== null && (await readStage(staged[ni][1])) === oldText) {
          staged[ni] = ['renamed', del[1] + ' -> ' + staged[ni][1]];
          del[0] = 'gone';
          break;
        }
      }
    }
    staged = staged.filter(function (x) { return x[0] !== 'gone'; });
    if (shortFormat) {
      var codes = {};
      staged.forEach(function (x) { codes[x[1]] = (x[0] === 'new file' ? 'A' : x[0] === 'deleted' ? 'D' : x[0] === 'renamed' ? 'R' : 'M') + ' '; });
      unstaged.forEach(function (x) { codes[x[1]] = (codes[x[1]] ? codes[x[1]][0] : ' ') + (x[0] === 'deleted' ? 'D' : 'M'); });
      state.conflicts.forEach(function (f) { codes[f] = 'UU'; });
      Object.keys(codes).sort().forEach(function (f) { out(codes[f] + ' ' + f); });
      untracked.forEach(function (f) { out('?? ' + f); });
      return;
    }
    out(branch ? 'On branch ' + branch : 'HEAD detached at ' + short(await headOid()));
    if (!(await headOid())) out('\nNo commits yet');
    if (state.mergeHead && state.conflicts.length) out('You have unmerged paths.\n  (fix conflicts and run "git commit")\n  (use "git merge --abort" to abort the merge)');
    else if (state.mergeHead) out('All conflicts fixed but you are still merging.\n  (use "git commit" to conclude merge)');
    if (staged.length) {
      out('\nChanges to be committed:\n  (use "git restore --staged <file>..." to unstage)');
      staged.forEach(function (x) { out('\t' + pad(x[0] + ':', 12) + x[1]); });
    }
    if (unstaged.length) {
      out('\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n  (use "git restore <file>..." to discard changes in working directory)');
      unstaged.forEach(function (x) { out('\t' + pad(x[0] + ':', 12) + x[1]); });
    }
    if (state.conflicts.length) {
      out('\nUnmerged paths:\n  (use "git add <file>..." to mark resolution)');
      state.conflicts.forEach(function (f) { out('\t' + pad('both modified:', 17) + f); });
    }
    if (untracked.length) {
      out('\nUntracked files:\n  (use "git add <file>..." to include in what will be committed)');
      untracked.forEach(function (f) { out('\t' + f); });
    }
    if (state.conflicts.length) out('\nno changes added to commit (use "git add" and/or "git commit -a")');
    else if (!staged.length && !unstaged.length && !untracked.length) out((await headOid()) ? 'nothing to commit, working tree clean' : 'nothing to commit (create/copy files and use "git add" to track)');
    else if (!staged.length && !unstaged.length) out('\nnothing added to commit but untracked files present (use "git add" to track)');
    else if (!staged.length) out('\nno changes added to commit (use "git add" and/or "git commit -a")');
  }

  async function addPaths(paths) {
    var rows = await git.statusMatrix({ fs: fs, dir: dir });
    var all = paths.indexOf('.') >= 0 || paths.indexOf('-A') >= 0 || paths.indexOf('--all') >= 0;
    var matched = 0;
    for (var i = 0; i < rows.length; i++) {
      var f = rows[i][0];
      var hit = all || paths.some(function (q) { q = p(q); return f === q || f.indexOf(q + '/') === 0 || (q.indexOf('*') >= 0 && new RegExp('^' + q.replace(/[.+^$()|{}]/g, '\\$&').replace(/\*/g, '[^/]*') + '$').test(f)); });
      if (!hit) continue;
      matched++;
      state.conflicts = state.conflicts.filter(function (c) { return c !== f; });
      if (rows[i][2] === 0) await git.remove({ fs: fs, dir: dir, filepath: f });
      else await git.add({ fs: fs, dir: dir, filepath: f });
    }
    if (!matched && !all) throw new Error("fatal: pathspec '" + paths[0] + "' did not match any files");
  }

  // Reflog: every move of HEAD, newest first (real git keeps this in .git/logs)
  function logRef(oid, action) { state.reflog.unshift({ oid: oid, action: action }); }

  async function amendCommit(args, message) {
    var head = await headOid();
    if (!head) throw new Error('fatal: You have nothing to amend.');
    var old = await git.readCommit({ fs: fs, dir: dir, oid: head });
    if (message === null) {
      if (args.indexOf('--no-edit') < 0) throw new Error('error: Try it needs -m "message" or --no-edit with --amend');
      message = old.commit.message.replace(/\n$/, '');
    }
    var a = author();
    var oid = await git.commit({ fs: fs, dir: dir, message: message, parent: old.commit.parent,
      author: { name: old.commit.author.name, email: old.commit.author.email, timestamp: old.commit.author.timestamp, timezoneOffset: old.commit.author.timezoneOffset },
      committer: a });
    logRef(oid, 'commit (amend): ' + message.split('\n')[0]);
    var files = await changedFiles(old.commit.parent[0] || null, oid);
    out('[' + (await currentBranch()) + ' ' + short(oid) + '] ' + message.split('\n')[0]);
    out(' Date: ' + formatDate(old.commit.author.timestamp));
    out(' ' + files.length + ' file' + (files.length === 1 ? '' : 's') + ' changed');
  }

  async function commit(args) {
    var msgIndex = args.indexOf('-m'), message = null;
    if (args.indexOf('-am') >= 0) { msgIndex = args.indexOf('-am'); await addTracked(); }
    else if (args.indexOf('-a') >= 0) await addTracked();
    if (msgIndex >= 0) message = args[msgIndex + 1];
    if (args.indexOf('--amend') >= 0) return amendCommit(args, message);
    if (state.mergeHead && message === null) message = state.mergeMsg;
    if (state.conflicts.length) throw new Error("error: Committing is not possible because you have unmerged files.\nhint: Fix them up in the work tree, and then use 'git add <file>'\nfatal: Exiting because of an unresolved conflict.");
    if (!message) throw new Error('error: Try it needs the message on the command line: git commit -m "your message"');
    var rows = await git.statusMatrix({ fs: fs, dir: dir });
    var stagedCount = rows.filter(function (r) { return r[1] !== r[3]; }).length;
    if (!stagedCount && !state.mergeHead && args.indexOf('--allow-empty') < 0) {
      var b = await currentBranch();
      out('On branch ' + b);
      var dirty = rows.some(function (r) { return r[1] !== r[2]; });
      if (!(await headOid())) out('\nNo commits yet\n\n' + (dirty ? 'nothing added to commit but untracked files present (use "git add" to track)' : 'nothing to commit (create/copy files and use "git add" to track)'));
      else out(dirty ? 'no changes added to commit (use "git add" and/or "git commit -a")' : 'nothing to commit, working tree clean');
      return;
    }
    var parent = undefined;
    if (state.mergeHead) parent = [await headOid(), state.mergeHead];
    var oid = await git.commit({ fs: fs, dir: dir, message: message, author: author(), parent: parent });
    var first = !(await git.readCommit({ fs: fs, dir: dir, oid: oid })).commit.parent.length;
    logRef(oid, 'commit' + (first ? ' (initial)' : state.mergeHead ? ' (merge)' : '') + ': ' + message.split('\n')[0]);
    state.mergeHead = null; state.mergeMsg = null; state.conflicts = [];
    var changed = (first ? rows.filter(function (r) { return r[3] > 0; }) : rows.filter(function (r) { return r[1] !== r[3]; })).length;
    out('[' + (await currentBranch()) + (first ? ' (root-commit)' : '') + ' ' + short(oid) + '] ' + message.split('\n')[0]);
    out(' ' + changed + ' file' + (changed === 1 ? '' : 's') + ' changed');
  }
  async function addTracked() {
    var rows = await git.statusMatrix({ fs: fs, dir: dir });
    for (var i = 0; i < rows.length; i++) {
      if (rows[i][1] === 0 && rows[i][3] === 0) continue;
      if (rows[i][2] === 0) await git.remove({ fs: fs, dir: dir, filepath: rows[i][0] });
      else if (rows[i][2] !== rows[i][3] || rows[i][3] === 3) await git.add({ fs: fs, dir: dir, filepath: rows[i][0] });
    }
  }

  async function logCmd(args) {
    var oneline = args.indexOf('--oneline') >= 0, all = args.indexOf('--all') >= 0;
    var nIdx = args.findIndex(function (a) { return /^-\d+$/.test(a) || a === '-n'; });
    var limit = nIdx < 0 ? Infinity : (args[nIdx] === '-n' ? parseInt(args[nIdx + 1], 10) : parseInt(args[nIdx].slice(1), 10));
    var refs = all ? await git.listBranches({ fs: fs, dir: dir }) : ['HEAD'];
    var revArg = args.filter(function (a, i) { return a[0] !== '-' && !(i > 0 && args[i - 1] === '-n'); })[0];
    var seen = {}, commits = [];
    if (revArg && revArg.indexOf('..') > 0) {
      // A..B: commits reachable from B but not from A ("what is on B that A does not have")
      var parts = revArg.split('..');
      var exclude = await git.log({ fs: fs, dir: dir, ref: await resolveRev(parts[0] || 'HEAD') });
      exclude.forEach(function (c) { seen[c.oid] = 1; });
      refs = [parts[1] || 'HEAD'];
    } else if (revArg) refs = [revArg];
    for (var i = 0; i < refs.length; i++) {
      var start;
      try { start = await resolveRev(refs[i]); } catch (e) {
        if (await headOid()) throw new Error("fatal: ambiguous argument '" + refs[i] + "': unknown revision or path not in the working tree.");
        throw new Error("fatal: your current branch '" + (await currentBranch()) + "' does not have any commits yet");
      }
      var list = await git.log({ fs: fs, dir: dir, ref: start });
      list.forEach(function (c) { if (!seen[c.oid]) { seen[c.oid] = 1; commits.push(c); } });
    }
    // One branch: keep the parent-walk order from git.log. Several: newest commit date first.
    if (refs.length > 1) commits.sort(function (a, b) { return b.commit.committer.timestamp - a.commit.committer.timestamp; });
    var deco = await decorations();
    commits.slice(0, limit).forEach(function (c, idx) {
      var d = deco[c.oid] ? ' (' + deco[c.oid].join(', ') + ')' : '';
      if (oneline) { out(short(c.oid) + d + ' ' + c.commit.message.split('\n')[0]); return; }
      if (idx) out('');
      out('commit ' + c.oid + d);
      if (c.commit.parent.length > 1) out('Merge: ' + c.commit.parent.map(short).join(' '));
      out('Author: ' + c.commit.author.name + ' <' + c.commit.author.email + '>');
      out('Date:   ' + formatDate(c.commit.author.timestamp));
      out('');
      c.commit.message.replace(/\n$/, '').split('\n').forEach(function (l) { out('    ' + l); });
    });
  }

  async function branchCmd(args) {
    var current = await currentBranch();
    if (!args.length || args[0] === '--list' || args[0] === '-a' || args[0] === '-v') {
      var names = await git.listBranches({ fs: fs, dir: dir });
      if (!names.length && current) names = [current];
      for (var i = 0; i < names.length; i++) {
        var line = (names[i] === current ? '* ' : '  ') + names[i];
        if (args[0] === '-v') { var o = await git.resolveRef({ fs: fs, dir: dir, ref: names[i] }); var c = await git.readCommit({ fs: fs, dir: dir, oid: o }); line = pad(line, 14) + ' ' + short(o) + ' ' + c.commit.message.split('\n')[0]; }
        out(line);
      }
      return;
    }
    if (args[0] === '-d' || args[0] === '-D') {
      if (args[1] === current) throw new Error("error: Cannot delete branch '" + args[1] + "' checked out at '/repo'");
      var target = await git.resolveRef({ fs: fs, dir: dir, ref: args[1] });
      if (args[0] === '-d') {
        var head = await headOid();
        var merged = (await git.log({ fs: fs, dir: dir, ref: head })).some(function (c) { return c.oid === target; });
        if (!merged) throw new Error("error: the branch '" + args[1] + "' is not fully merged.\nhint: If you are sure you want to delete it, run 'git branch -D " + args[1] + "'");
      }
      await git.deleteBranch({ fs: fs, dir: dir, ref: args[1] });
      out('Deleted branch ' + args[1] + ' (was ' + short(target) + ').');
      return;
    }
    if (args[0] === '-m') {
      var from = args.length > 2 ? args[1] : current, to = args.length > 2 ? args[2] : args[1];
      await git.renameBranch({ fs: fs, dir: dir, oldref: from, ref: to, checkout: from === current });
      return;
    }
    var startOid = args[1] ? await resolveRev(args[1]) : await headOid();
    if (!startOid) throw new Error("fatal: not a valid object name: '" + current + "'");
    await git.branch({ fs: fs, dir: dir, ref: args[0], object: startOid });
  }

  async function switchTo(ref, create) {
    var current = await currentBranch();
    if (create) {
      var oid = await headOid();
      if (oid) await git.branch({ fs: fs, dir: dir, ref: ref, object: oid });
      else { await pfs.writeFile(dir + '/.git/HEAD', new TextEncoder().encode('ref: refs/heads/' + ref + '\n')); out("Switched to a new branch '" + ref + "'"); return; }
    }
    try { await git.checkout({ fs: fs, dir: dir, ref: ref }); }
    catch (e) {
      if (e.code === 'CheckoutConflictError') throw new Error('error: Your local changes to the following files would be overwritten by checkout:\n\t' + (e.data && e.data.filepaths ? e.data.filepaths.join('\n\t') : '') + '\nPlease commit your changes or stash them before you switch branches.\nAborting');
      if (e.code === 'NotFoundError') throw new Error("fatal: invalid reference: " + ref);
      throw e;
    }
    if (ref !== current) logRef(await headOid(), 'checkout: moving from ' + current + ' to ' + ref);
    out(create ? "Switched to a new branch '" + ref + "'" : (ref === current ? "Already on '" + ref + "'" : "Switched to branch '" + ref + "'"));
  }

  async function mergeCmd(args) {
    if (args[0] === '--abort') {
      await git.abortMerge({ fs: fs, dir: dir });
      state.mergeHead = null; state.mergeMsg = null; state.conflicts = [];
      out('Merge aborted.');
      return;
    }
    var noFF = args.indexOf('--no-ff') >= 0;
    var theirs = args.filter(function (a) { return a[0] !== '-'; })[0];
    var ours = await currentBranch();
    var theirsOid = await resolveRev(theirs);
    var before = await headOid();
    try {
      var r = await git.merge({ fs: fs, dir: dir, ours: ours, theirs: theirs, author: author(), fastForward: !noFF, abortOnConflict: false,
        message: "Merge branch '" + theirs + "'" });
      if (r.alreadyMerged) { out('Already up to date.'); return; }
      // Update the working tree, but only the files the merge changed (keeps other local work)
      var files = await changedFiles(before, r.oid);
      if (files.length) await git.checkout({ fs: fs, dir: dir, ref: ours, filepaths: files, force: true });
      if (r.fastForward) {
        logRef(r.oid, 'merge ' + theirs + ': Fast-forward');
        out('Updating ' + short(before) + '..' + short(r.oid));
        out('Fast-forward');
      } else {
        logRef(r.oid, 'merge ' + theirs + ": Merge made by the 'ort' strategy.");
        out("Merge made by the 'ort' strategy.");
      }
      files.forEach(function (f) { out(' ' + f); });
      out(' ' + files.length + ' file' + (files.length === 1 ? '' : 's') + ' changed');
    } catch (e) {
      if (e.code !== 'MergeConflictError') throw e;
      state.mergeHead = theirsOid;
      state.mergeMsg = "Merge branch '" + theirs + "'";
      var conflicted = (e.data && e.data.filepaths) || [];
      state.conflicts = conflicted.slice();
      conflicted.forEach(function (f) { out('Auto-merging ' + f); out('CONFLICT (content): Merge conflict in ' + f); });
      out('Automatic merge failed; fix conflicts and then commit the result.');
    }
  }

  async function resetCmd(args) {
    var mode = args.indexOf('--hard') >= 0 ? 'hard' : args.indexOf('--soft') >= 0 ? 'soft' : 'mixed';
    var rest = args.filter(function (a) { return a[0] !== '-'; });
    var looksLikeRev = rest.length && (/^(HEAD|[0-9a-f]{4,40})([~^]\d*)*$/.test(rest[0]) || /^HEAD@\{\d+\}$/.test(rest[0]) || (await git.listBranches({ fs: fs, dir: dir })).indexOf(rest[0]) >= 0);
    if (rest.length && !looksLikeRev) {
      for (var i = 0; i < rest.length; i++) await git.resetIndex({ fs: fs, dir: dir, filepath: p(rest[i]) });
      out('Unstaged changes after reset:');
      return;
    }
    var target = await resolveRev(rest[0] || 'HEAD');
    var branch = await currentBranch();
    var rows = await git.statusMatrix({ fs: fs, dir: dir });
    await git.writeRef({ fs: fs, dir: dir, ref: 'refs/heads/' + branch, value: target, force: true });
    logRef(target, 'reset: moving to ' + (rest[0] || 'HEAD'));
    if (mode === 'hard') {
      await git.checkout({ fs: fs, dir: dir, ref: branch, force: true });
      var keep = await git.statusMatrix({ fs: fs, dir: dir });
      for (var k = 0; k < keep.length; k++) {
        if (keep[k][1] === 0 && keep[k][3] > 0) { await git.remove({ fs: fs, dir: dir, filepath: keep[k][0] }); await pfs.unlink(dir + '/' + keep[k][0]); }
      }
      var c = await git.readCommit({ fs: fs, dir: dir, oid: target });
      out('HEAD is now at ' + short(target) + ' ' + c.commit.message.split('\n')[0]);
    } else if (mode === 'mixed') {
      for (var j = 0; j < rows.length; j++) await git.resetIndex({ fs: fs, dir: dir, filepath: rows[j][0], ref: target });
      var after = await git.statusMatrix({ fs: fs, dir: dir });
      var dirty = after.filter(function (r) { return r[1] !== r[2] && r[1] > 0; });
      if (dirty.length) { out('Unstaged changes after reset:'); dirty.forEach(function (r) { out((r[2] === 0 ? 'D\t' : 'M\t') + r[0]); }); }
    }
  }

  async function restoreCmd(args) {
    var staged = args.indexOf('--staged') >= 0;
    var files = args.filter(function (a) { return a[0] !== '-'; }).map(p);
    if (files[0] === '.') files = (await git.statusMatrix({ fs: fs, dir: dir })).map(function (r) { return r[0]; });
    var head = await headOid();
    for (var i = 0; i < files.length; i++) {
      if (staged) { await git.resetIndex({ fs: fs, dir: dir, filepath: files[i] }); continue; }
      var fromIndex = await readStage(files[i]);
      var content = fromIndex !== null ? fromIndex : (head ? await readAt(head, files[i]) : null);
      if (content === null) throw new Error("error: pathspec '" + files[i] + "' did not match any file(s) known to git");
      await writeText(files[i], content);
    }
  }

  async function diffCmd(args) {
    var staged = args.indexOf('--staged') >= 0 || args.indexOf('--cached') >= 0;
    var revs = args.filter(function (a) { return a[0] !== '-'; });
    var head = await headOid();
    var rows = await git.statusMatrix({ fs: fs, dir: dir });
    if (revs.length === 2) {
      var a = await resolveRev(revs[0]), b = await resolveRev(revs[1]);
      var files = await changedFiles(a, b);
      for (var k = 0; k < files.length; k++) printDiff(files[k], await readAt(a, files[k]), await readAt(b, files[k]));
      return;
    }
    for (var i = 0; i < rows.length; i++) {
      var f = rows[i][0];
      if (staged) {
        var before = head ? await readAt(head, f) : null, after = rows[i][3] === 0 ? null : await readStage(f);
        if (rows[i][1] !== rows[i][3] || rows[i][3] === 3) printDiff(f, before, after);
      } else {
        if (rows[i][3] === 0) continue;
        var idx = await readStage(f), work = rows[i][2] === 0 ? null : await readText(f);
        printDiff(f, idx, work);
      }
    }
  }

  async function showCmd(args) {
    try {
      var tagRef = await git.resolveRef({ fs: fs, dir: dir, ref: 'refs/tags/' + args[0] });
      var t = await git.readTag({ fs: fs, dir: dir, oid: tagRef });
      out('tag ' + t.tag.tag);
      out('Tagger: ' + t.tag.tagger.name + ' <' + t.tag.tagger.email + '>');
      out('Date:   ' + formatDate(t.tag.tagger.timestamp));
      out('');
      out(t.tag.message.replace(/\n$/, ''));
      out('');
    } catch (e) {}
    var oid = await resolveRev(args[0] || 'HEAD');
    var c = await git.readCommit({ fs: fs, dir: dir, oid: oid });
    var deco = await decorations();
    out('commit ' + oid + (deco[oid] ? ' (' + deco[oid].join(', ') + ')' : ''));
    out('Author: ' + c.commit.author.name + ' <' + c.commit.author.email + '>');
    out('Date:   ' + formatDate(c.commit.author.timestamp));
    out('');
    c.commit.message.replace(/\n$/, '').split('\n').forEach(function (l) { out('    ' + l); });
    out('');
    var parent = c.commit.parent[0] || null;
    var files = await changedFiles(parent, oid);
    for (var i = 0; i < files.length; i++) printDiff(files[i], parent ? await readAt(parent, files[i]) : null, await readAt(oid, files[i]));
  }

  // Undo only the lines a commit changed, keeping later edits (like git's 3-way revert).
  function revertText(before, after, current) {
    var ops = lineDiff(before || '', after || '');
    var cur = current === '' ? [] : current.replace(/\n$/, '').split('\n');
    var anchor = -1;                                  // index in cur of the last matched context line
    for (var i = 0; i < ops.length; i++) {
      var kind = ops[i][0], line = ops[i].slice(1);
      if (kind === ' ') { var at = cur.indexOf(line, anchor + 1); if (at >= 0) anchor = at; }
      else if (kind === '+') { var del = cur.indexOf(line, anchor + 1); if (del >= 0) cur.splice(del, 1); }
      else { cur.splice(anchor + 1, 0, line); anchor++; }
    }
    return cur.length ? cur.join('\n') + '\n' : '';
  }

  async function revertCmd(args) {
    var oid = await resolveRev(args[0]);
    var c = await git.readCommit({ fs: fs, dir: dir, oid: oid });
    var parent = c.commit.parent[0];
    var files = await changedFiles(parent, oid);
    for (var i = 0; i < files.length; i++) {
      var old = parent ? await readAt(parent, files[i]) : null;
      var mine = await readAt(oid, files[i]);
      var now = (await exists(files[i])) ? await readText(files[i]) : null;
      if (old === null) { if (now !== null) await pfs.unlink(dir + '/' + files[i]); await git.remove({ fs: fs, dir: dir, filepath: files[i] }); }
      else { await writeText(files[i], now === null ? old : revertText(old, mine, now)); await git.add({ fs: fs, dir: dir, filepath: files[i] }); }
    }
    var subject = c.commit.message.split('\n')[0];
    await commit(['-m', 'Revert "' + subject + '"\n\nThis reverts commit ' + oid + '.']);
  }

  // Apply the change before -> after onto current. Returns null on a conflict, i.e. when
  // the lines the change touches are not found in current (they were changed in the meantime).
  function applyPatch(before, after, current) {
    if (current === before) return after;
    if (current === after) return current;
    var ops = lineDiff(before || '', after || '');
    var cur = current === '' ? [] : current.replace(/\n$/, '').split('\n');
    var anchor = -1;
    for (var i = 0; i < ops.length; i++) {
      var kind = ops[i][0], line = ops[i].slice(1);
      if (kind === ' ') { var at = cur.indexOf(line, anchor + 1); if (at < 0) return null; anchor = at; }
      else if (kind === '-') { if (cur[anchor + 1] !== line) return null; cur.splice(anchor + 1, 1); }
      else { cur.splice(anchor + 1, 0, line); anchor++; }
    }
    return cur.length ? cur.join('\n') + '\n' : '';
  }

  // Replay one commit's changes onto the working tree. Returns the conflicting files.
  async function applyCommit(oid) {
    var c = await git.readCommit({ fs: fs, dir: dir, oid: oid });
    var parent = c.commit.parent[0] || null;
    var files = await changedFiles(parent, oid), conflicts = [];
    for (var i = 0; i < files.length; i++) {
      var before = parent ? await readAt(parent, files[i]) : null, after = await readAt(oid, files[i]);
      var now = (await exists(files[i])) ? await readText(files[i]) : null;
      if (after === null) { if (now !== null) { await pfs.unlink(dir + '/' + files[i]); await git.remove({ fs: fs, dir: dir, filepath: files[i] }); } continue; }
      var result = before === null ? (now === null || now === after ? after : null) : (now === null ? null : applyPatch(before, after, now));
      if (result === null) { conflicts.push(files[i]); continue; }
      await writeText(files[i], result);
      await git.add({ fs: fs, dir: dir, filepath: files[i] });
    }
    return { commit: c.commit, files: files, conflicts: conflicts };
  }

  async function commitLike(original, message) {
    var a = author();
    return git.commit({ fs: fs, dir: dir, message: message,
      author: { name: original.author.name, email: original.author.email, timestamp: original.author.timestamp, timezoneOffset: original.author.timezoneOffset },
      committer: a });
  }

  async function cherryPickCmd(args) {
    var addX = args.indexOf('-x') >= 0;
    var specs = args.filter(function (a) { return a[0] !== '-'; });
    for (var s = 0; s < specs.length; s++) {
      var oid = await resolveRev(specs[s]);
      var r = await applyCommit(oid);
      var subject = r.commit.message.split('\n')[0];
      if (r.conflicts.length) {
        r.conflicts.forEach(function (f) { out('CONFLICT (content): Merge conflict in ' + f); });
        throw new Error('error: could not apply ' + short(oid) + '... ' + subject + '\nplayground: resolve cherry-pick conflicts on a real computer (git cherry-pick --continue).');
      }
      var message = r.commit.message.replace(/\n$/, '') + (addX ? '\n\n(cherry picked from commit ' + oid + ')' : '');
      var newOid = await commitLike(r.commit, message);
      logRef(newOid, 'cherry-pick: ' + subject);
      out('[' + (await currentBranch()) + ' ' + short(newOid) + '] ' + subject);
      out(' Date: ' + formatDate(r.commit.author.timestamp));
      out(' ' + r.files.length + ' file' + (r.files.length === 1 ? '' : 's') + ' changed');
    }
  }

  async function rebaseCmd(args) {
    if (args.indexOf('-i') >= 0 || args.indexOf('--interactive') >= 0) throw new Error("playground: interactive rebase opens an editor, so it needs a real git installation; this lesson shows its output instead.");
    if (args[0] === '--continue' || args[0] === '--abort' || args[0] === '--skip') throw new Error('playground: there is no rebase in progress (the playground stops instead of pausing on conflicts).');
    var upstreamName = args.filter(function (a) { return a[0] !== '-'; })[0];
    var branch = await currentBranch(), head = await headOid(), upstream = await resolveRev(upstreamName);
    var dirty = (await git.statusMatrix({ fs: fs, dir: dir })).some(function (r) { return r[1] !== r[2] || r[1] !== r[3]; });
    if (dirty) throw new Error('error: cannot rebase: You have unstaged changes.\nerror: Please commit or stash them.');
    var headLog = await git.log({ fs: fs, dir: dir, ref: head });
    if (headLog.some(function (c) { return c.oid === upstream; })) { out('Current branch ' + branch + ' is up to date.'); return; }
    var base = {};
    (await git.log({ fs: fs, dir: dir, ref: upstream })).forEach(function (c) { base[c.oid] = 1; });
    var todo = headLog.filter(function (c) { return !base[c.oid] && c.commit.parent.length < 2; }).reverse();
    await git.writeRef({ fs: fs, dir: dir, ref: 'refs/heads/' + branch, value: upstream, force: true });
    await git.checkout({ fs: fs, dir: dir, ref: branch, force: true });
    logRef(upstream, 'rebase (start): checkout ' + upstreamName);
    for (var i = 0; i < todo.length; i++) {
      var r = await applyCommit(todo[i].oid);
      if (r.conflicts.length) {
        await git.writeRef({ fs: fs, dir: dir, ref: 'refs/heads/' + branch, value: head, force: true });
        await git.checkout({ fs: fs, dir: dir, ref: branch, force: true });
        r.conflicts.forEach(function (f) { out('CONFLICT (content): Merge conflict in ' + f); });
        throw new Error('error: could not apply ' + short(todo[i].oid) + '... ' + r.commit.message.split('\n')[0] +
          '\nplayground: on a real computer you would fix the files, git add them and run git rebase --continue.\nplayground: your branch was left unchanged here.');
      }
      var newOid = await commitLike(r.commit, r.commit.message.replace(/\n$/, ''));
      logRef(newOid, 'rebase (pick): ' + r.commit.message.split('\n')[0]);
    }
    logRef(await headOid(), 'rebase (finish): returning to refs/heads/' + branch);
    out('Successfully rebased and updated refs/heads/' + branch + '.');
  }

  function reflogCmd() {
    state.reflog.forEach(function (e, i) { out(short(e.oid) + ' HEAD@{' + i + '}: ' + e.action); });
  }

  async function shortlogCmd() {
    var counts = {}, order = [];
    (await git.log({ fs: fs, dir: dir, ref: 'HEAD' })).forEach(function (c) {
      var who = c.commit.author.name;
      if (!counts[who]) { counts[who] = 0; order.push(who); }
      counts[who]++;
    });
    order.sort(function (a, b) { return counts[b] - counts[a] || (a < b ? -1 : 1); });
    order.forEach(function (who) { out(pad(String(counts[who]), 6).replace(/^(\d+)(\s*)$/, function (m, n, sp) { return sp + n; }) + '\t' + who); });
  }

  async function grepCmd(args) {
    var ignoreCase = args.indexOf('-i') >= 0, numbers = args.indexOf('-n') >= 0;
    var pattern = args.filter(function (a) { return a[0] !== '-'; })[0];
    var re = new RegExp(pattern, ignoreCase ? 'i' : '');
    var files = (await git.listFiles({ fs: fs, dir: dir })).sort(), found = 0;
    for (var i = 0; i < files.length; i++) {
      if (!(await exists(files[i]))) continue;
      var lines = (await readText(files[i])).replace(/\n$/, '').split('\n');
      for (var j = 0; j < lines.length; j++) if (re.test(lines[j])) { found++; out(files[i] + ':' + (numbers ? (j + 1) + ':' : '') + lines[j]); }
    }
    if (!found) state.silentFail = true;
  }

  async function tagCmd(args) {
    if (!args.length) { (await git.listTags({ fs: fs, dir: dir })).sort().forEach(out); return; }
    if (args[0] === '-d') { await git.deleteTag({ fs: fs, dir: dir, ref: args[1] }); out("Deleted tag '" + args[1] + "'"); return; }
    if (args[0] === '-a') {
      var mi = args.indexOf('-m');
      var target = args[mi + 2] ? await resolveRev(args[mi + 2]) : await headOid();
      await git.annotatedTag({ fs: fs, dir: dir, ref: args[1], message: args[mi + 1] || args[1], object: target, tagger: author() });
      return;
    }
    await git.tag({ fs: fs, dir: dir, ref: args[0], object: args[1] ? await resolveRev(args[1]) : await headOid() });
  }

  async function stashCmd(args) {
    var op = args[0] || 'push';
    if (op === 'list') {
      var list = await git.stash({ fs: fs, dir: dir, op: 'list' });
      (list || []).forEach(function (s, i) {
        var text = typeof s === 'string' ? s : (s.message || 'WIP');
        out(/^stash@\{/.test(text) ? text : 'stash@{' + i + '}: ' + text);
      });
      return;
    }
    var branch = await currentBranch();
    if (op === 'push' || op === 'save') {
      var head = await headOid();
      var c = await git.readCommit({ fs: fs, dir: dir, oid: head });
      await git.stash({ fs: fs, dir: dir, op: 'push', message: args[args.indexOf('-m') + 1] && args.indexOf('-m') >= 0 ? args[args.indexOf('-m') + 1] : undefined });
      out('Saved working directory and index state WIP on ' + branch + ': ' + short(head) + ' ' + c.commit.message.split('\n')[0]);
      return;
    }
    if (op === 'pop' || op === 'apply') {
      await git.stash({ fs: fs, dir: dir, op: op });
      await status(false);
      if (op === 'pop') out('Dropped refs/stash@{0}');
      return;
    }
    if (op === 'drop' || op === 'clear') { await git.stash({ fs: fs, dir: dir, op: op }); return; }
    throw new Error('error: unknown stash subcommand: ' + op);
  }

  var UNSUPPORTED = { push: 1, pull: 1, fetch: 1, clone: 1, remote: 1, bisect: 1, blame: 1, worktree: 1, submodule: 1, 'filter-repo': 1, rerere: 1 };

  async function runGit(args) {
    var cmd = args[0], rest = args.slice(1);
    if (cmd === 'init') {
      var bIdx = rest.indexOf('-b') >= 0 ? rest.indexOf('-b') : rest.indexOf('--initial-branch');
      await git.init({ fs: fs, dir: dir, defaultBranch: bIdx >= 0 ? rest[bIdx + 1] : 'main' });
      state.inited = true;
      // stash and annotated tags read the author from .git/config
      await git.setConfig({ fs: fs, dir: dir, path: 'user.name', value: state.name || 'Student' });
      await git.setConfig({ fs: fs, dir: dir, path: 'user.email', value: state.email || 'student@codenest.app' });
      out('Initialized empty Git repository in /repo/.git/');
      return;
    }
    if (cmd === 'config') {
      var keys = rest.filter(function (a) { return a[0] !== '-'; });
      if (keys[0] === 'user.name') state.name = keys[1];
      else if (keys[0] === 'user.email') state.email = keys[1];
      if (keys.length === 1) out(keys[0] === 'user.name' ? (state.name || '') : keys[0] === 'user.email' ? (state.email || '') : '');
      if (state.inited && keys.length > 1) await git.setConfig({ fs: fs, dir: dir, path: keys[0], value: keys[1] });
      return;
    }
    if (cmd === '--version' || cmd === 'version') { out('git version 2.51.0 (CodeNest playground)'); return; }
    if (!state.inited) throw new Error(NOT_REPO);
    if (UNSUPPORTED[cmd]) throw new Error("playground: 'git " + cmd + "' needs a real git installation; this lesson shows its output instead.");
    switch (cmd) {
      case 'status': return status(rest.indexOf('-s') >= 0 || rest.indexOf('--short') >= 0);
      case 'add': return addPaths(rest);
      case 'commit': return commit(rest);
      case 'log': return logCmd(rest);
      case 'branch': return branchCmd(rest);
      case 'switch': return rest[0] === '-c' || rest[0] === '-C' ? switchTo(rest[1], true) : switchTo(rest[0], false);
      case 'checkout':
        if (rest[0] === '-b') return switchTo(rest[1], true);
        if (rest[0] === '--') return restoreCmd(rest.slice(1));
        return switchTo(rest[0], false);
      case 'merge': return mergeCmd(rest);
      case 'reset': return resetCmd(rest);
      case 'restore': return restoreCmd(rest);
      case 'rm': {
        var cached = rest.indexOf('--cached') >= 0;
        var files = rest.filter(function (a) { return a[0] !== '-'; }).map(p);
        for (var i = 0; i < files.length; i++) {
          await git.remove({ fs: fs, dir: dir, filepath: files[i] });
          if (!cached) await pfs.unlink(dir + '/' + files[i]);
          out("rm '" + files[i] + "'");
        }
        return;
      }
      case 'mv': {
        await pfs.rename(dir + '/' + p(rest[0]), dir + '/' + p(rest[1]));
        await git.remove({ fs: fs, dir: dir, filepath: p(rest[0]) });
        await git.add({ fs: fs, dir: dir, filepath: p(rest[1]) });
        return;
      }
      case 'ls-files': (await git.listFiles({ fs: fs, dir: dir })).sort().forEach(out); return;
      case 'cherry-pick': return cherryPickCmd(rest);
      case 'rebase': return rebaseCmd(rest);
      case 'reflog': return reflogCmd();
      case 'shortlog': return shortlogCmd();
      case 'grep': return grepCmd(rest);
      case 'diff': return diffCmd(rest);
      case 'show': return showCmd(rest);
      case 'revert': return revertCmd(rest);
      case 'tag': return tagCmd(rest);
      case 'stash': return stashCmd(rest);
      default: throw new Error("git: '" + cmd + "' is not a git command. See 'git --help'.");
    }
  }

  async function runShell(tokens) {
    var cmd = tokens[0];
    var redirect = tokens.indexOf('>') >= 0 ? '>' : tokens.indexOf('>>') >= 0 ? '>>' : null;
    if (cmd === 'echo') {
      var parts = redirect ? tokens.slice(1, tokens.indexOf(redirect)) : tokens.slice(1);
      var text = parts.join(' ') + '\n';
      if (!redirect) { out(text.replace(/\n$/, '')); return; }
      var file = p(tokens[tokens.indexOf(redirect) + 1]);
      var prev = redirect === '>>' && (await exists(file)) ? await readText(file) : '';
      await writeText(file, prev + text);
      return;
    }
    if (cmd === 'cat') {
      for (var i = 1; i < tokens.length; i++) {
        if (!(await exists(p(tokens[i])))) throw new Error('cat: ' + tokens[i] + ': No such file or directory');
        out((await readText(p(tokens[i]))).replace(/\n$/, ''));
      }
      return;
    }
    if (cmd === 'ls') {
      var all = tokens.indexOf('-a') >= 0 || tokens.indexOf('-la') >= 0;
      var target = tokens.filter(function (t, i) { return i > 0 && t[0] !== '-'; })[0];
      var names = await pfs.readdir(dir + (target ? '/' + p(target) : ''));
      names = names.filter(function (n) { return all || n[0] !== '.'; }).sort();
      if (all) names = ['.', '..'].concat(names);
      out(names.join('  '));
      return;
    }
    if (cmd === 'mkdir') { tokens.slice(1).filter(function (t) { return t[0] !== '-'; }).forEach(function () {}); for (var k = 1; k < tokens.length; k++) if (tokens[k][0] !== '-') await mkdirp(p(tokens[k])); return; }
    if (cmd === 'touch') { for (var t = 1; t < tokens.length; t++) if (!(await exists(p(tokens[t])))) await writeText(p(tokens[t]), ''); return; }
    if (cmd === 'rm') { for (var r = 1; r < tokens.length; r++) if (tokens[r][0] !== '-') await pfs.unlink(dir + '/' + p(tokens[r])); return; }
    if (cmd === 'mv') { await pfs.rename(dir + '/' + p(tokens[1]), dir + '/' + p(tokens[2])); return; }
    if (cmd === 'pwd') { out('/repo'); return; }
    if (cmd === 'clear') return;
    throw new Error(cmd + ': command not found (Try it supports git, echo, cat, ls, mkdir, touch, rm, mv)');
  }

  try { await pfs.mkdir(dir); } catch (e) {}
  var lines = script.split('\n');
  for (var n = 0; n < lines.length; n++) {
    var line = lines[n].trim();
    if (!line || line[0] === '#') continue;
    var tokens = tokenize(line);
    if (tokens[0] === '$') tokens.shift();
    if (!tokens.length) continue;
    out('$ ' + line.replace(/^\$\s*/, ''));
    try {
      if (tokens[0] === 'git') { await runGit(tokens.slice(1)); state.lastIndexSecond = Math.floor(Date.now() / 1000); }
      else await runShell(tokens);
    } catch (e) {
      if (tokens[0] === 'git') state.lastIndexSecond = Math.floor(Date.now() / 1000);
      out((e && e.message ? e.message : String(e)).replace(/^(?!fatal:|error:|playground:|git:|cat:|hint:)/, 'error: '));
    }
  }
}`;
