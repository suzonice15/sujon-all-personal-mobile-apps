// Builds the HTML page shown in the Try it preview for each code language.
// Kept free of React Native imports so the same functions can be used by
// tooling that checks every lesson sample.

import { GIT_PLAYGROUND_JS } from './gitPlayground';

// Injected first into every preview: mirrors console.log/warn/error and
// uncaught errors into a "Console" panel on the page, so students can see
// what their JavaScript printed. For JS-only snippets an empty run says so.
const CONSOLE_SHIM = `<script>
(function () {
  var panel = null;
  function getPanel() {
    if (panel) return panel;
    panel = document.createElement('div');
    panel.style.cssText = 'font:13px/1.5 monospace;background:#0f172a;color:#e2e8f0;padding:8px 10px;margin-top:12px;border-radius:8px;white-space:pre-wrap;word-break:break-word';
    var title = document.createElement('div');
    title.textContent = 'Console';
    title.style.cssText = 'color:#94a3b8;font-weight:bold;margin-bottom:4px';
    panel.appendChild(title);
    (document.body || document.documentElement).appendChild(panel);
    return panel;
  }
  function format(v) {
    if (v === undefined) return 'undefined';
    if (typeof v === 'string') return v;
    if (typeof v === 'function') return v.toString();
    if (v instanceof Error) return v.name + ': ' + v.message;
    if (v instanceof Map) return 'Map(' + v.size + ') ' + JSON.stringify(Array.from(v.entries()));
    if (v instanceof Set) return 'Set(' + v.size + ') ' + JSON.stringify(Array.from(v));
    try { return JSON.stringify(v, null, 2); } catch (e) { return String(v); }
  }
  // Notices printed by the CDN builds themselves; not useful for students.
  var NOISE = /development build of Vue|Download the React DevTools|in-browser Babel transformer|production build/i;
  function write(color, args) {
    if (args.length && typeof args[0] === 'string' && NOISE.test(args[0])) return;
    var line = document.createElement('div');
    line.style.cssText = 'color:' + color + ';border-top:1px solid #1e293b;padding:3px 0';
    line.textContent = Array.prototype.map.call(args, format).join(' ');
    getPanel().appendChild(line);
  }
  ['log', 'info', 'table'].forEach(function (k) {
    var orig = console[k];
    console[k] = function () { write('#e2e8f0', arguments); if (orig) orig.apply(console, arguments); };
  });
  var warn = console.warn;
  console.warn = function () { write('#fbbf24', arguments); warn.apply(console, arguments); };
  var error = console.error;
  console.error = function () { write('#f87171', arguments); error.apply(console, arguments); };
  window.addEventListener('error', function (e) { write('#f87171', ['Uncaught ' + e.message]); });
  window.addEventListener('unhandledrejection', function (e) {
    var r = e.reason; write('#f87171', ['Uncaught (in promise) ' + (r && r.message ? r.message : r)]);
  });
  if (window.__JS_ONLY__) {
    window.addEventListener('load', function () {
      setTimeout(function () { if (!panel) write('#94a3b8', ['No output yet. Use console.log() to print values.']); }, 1500);
    });
  }
})();
</script>`;

const HEAD = `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>body{font-family:sans-serif;padding:8px;}</style>`;

// React previews load React and Babel from a CDN (needs internet). Lessons are
// written like real project files, so import/export lines are stripped, hooks
// are made available as globals, and an App component renders automatically.
const REACT_SCRIPTS = `<script src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@babel/standalone@7.24.7/babel.min.js"></script>`;

export const REACT_PRELUDE = 'const { useState, useEffect, useRef, useMemo, useCallback, useReducer, useContext, createContext, '
  + 'useId, useTransition, useDeferredValue, useLayoutEffect, useImperativeHandle, useSyncExternalStore, '
  + 'memo, forwardRef, lazy, Suspense, Fragment, StrictMode, Component } = React;\n'
  + 'const { createPortal } = ReactDOM;\n';

// Returns the lesson code with import/export lines removed (no prelude, no mount).
export const stripReactModule = (code) => code
  .replace(/^\s*import\s[^;]*;?\s*$/gm, '')
  .replace(/export\s+default\s+function/g, 'function')
  .replace(/^\s*export\s+default\s+[\w.]+;?\s*$/gm, '')
  .replace(/^(\s*)export\s+(function|const|class)/gm, '$1$2');

const toReactSource = (code) => {
  let src = stripReactModule(code);
  if (!/createRoot/.test(src) && /\b(function|const)\s+App\b/.test(src)) {
    src += '\nReactDOM.createRoot(document.getElementById("root")).render(<App />);';
  }
  return REACT_PRELUDE + src;
};

// Vue previews load the full Vue 3 build (with the template compiler) from a CDN.
// A Single File Component (<template> + <script setup> + <style>) is turned into
// createApp({ setup, template }): top-level bindings of <script setup> are
// returned to the template. Anything else is treated as HTML with Vue available.
const VUE_SCRIPT = '<script src="https://unpkg.com/vue@3.5.13/dist/vue.global.js"></script>';
export const VUE_PRELUDE = 'const { createApp, ref, reactive, computed, watch, watchEffect, onMounted, onUnmounted, onBeforeUnmount, '
  + 'onUpdated, onErrorCaptured, onWatcherCleanup, effectScope, nextTick, toRef, toRefs, toValue, unref, isRef, '
  + 'provide, inject, defineComponent, defineAsyncComponent, h, '
  + 'shallowRef, readonly, useTemplateRef, useId, Transition, TransitionGroup, KeepAlive, Teleport } = Vue;\n';

const setupBindings = (setup) => {
  const names = new Set();
  for (const m of setup.matchAll(/^(?:const|let|var)\s+([A-Za-z_$][\w$]*)/gm)) names.add(m[1]);
  for (const m of setup.matchAll(/^(?:async\s+)?function\s*\*?\s*([A-Za-z_$][\w$]*)/gm)) names.add(m[1]);
  for (const m of setup.matchAll(/^(?:const|let)\s*\{([^}]*)\}\s*=/gm)) {
    m[1].split(',').map(p => p.split(':').pop().split('=')[0].trim()).filter(Boolean).forEach(n => names.add(n));
  }
  return [...names];
};

// Splits a Single File Component into the pieces the preview needs, or returns
// null when the code is not an SFC. `options` is JavaScript source for an
// object literal of component options ({ setup, template }).
export const parseVueSfc = (code) => {
  const styles = [...code.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]).join('\n');
  const setupMatch = code.match(/<script[^>]*setup[^>]*>([\s\S]*?)<\/script>/i);
  const rest = code.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<script[\s\S]*?<\/script>/gi, '').trim();
  const templateMatch = rest.match(/^<template>([\s\S]*)<\/template>$/);
  if (!templateMatch) return null;

  const setup = (setupMatch ? setupMatch[1] : '').replace(/^\s*import\s[^;]*;?\s*$/gm, '');
  const bindings = setupBindings(setup);
  // Capitalized bindings (const TodoItem = defineComponent(...)) are registered as components.
  // Setup code must run inside setup() so lifecycle hooks and provide() work;
  // components are registered on the app from there, before the first render.
  // Likewise vSomething bindings become directives (vClickOutside → v-click-outside), as in real <script setup>.
  const kebab = s => s.replace(/[A-Z]/g, c => '-' + c.toLowerCase());
  const register = [
    ...bindings.filter(n => /^[A-Z]/.test(n)).map(n => `__app.component('${n}', ${n});`),
    ...bindings.filter(n => /^v[A-Z]/.test(n)).map(n => `__app.directive('${kebab(n[1].toLowerCase() + n.slice(2))}', ${n});`),
  ].join(' ');
  const options = `{
  setup() {
${setup}
    const __app = Vue.getCurrentInstance().appContext.app; ${register}
    return { ${bindings.join(', ')} };
  },
  template: ${JSON.stringify(templateMatch[1])},
}`;
  return { styles, options };
};

const toVueDocument = (code) => {
  const sfc = parseVueSfc(code);
  if (!sfc) {
    return `<!DOCTYPE html><html><head>${HEAD}${CONSOLE_SHIM}${VUE_SCRIPT}</head><body>${code}</body></html>`;
  }
  const script = `${VUE_PRELUDE}createApp(${sfc.options}).mount('#app');`.replace(/<\//g, '<\\/');
  return `<!DOCTYPE html><html><head>${HEAD}${CONSOLE_SHIM}${VUE_SCRIPT}<style>${sfc.styles}</style></head>
<body><div id="app"></div>
<script>if (!window.Vue) document.body.innerHTML = '<p style="color:#b91c1c">Vue could not load. Connect to the internet and run again.</p>';</script>
<script>${script}</script></body></html>`;
};

// PHP previews run real PHP 8.3 compiled to WebAssembly (php-wasm, from a CDN, so
// they need internet; the WebView caches it after the first run). SQLite (PDO) and
// mbstring are always loaded; XML (DOM, SimpleXML) and GD images are loaded only
// when the code uses them, to keep the usual download small. Output is shown as
// text, like a terminal; when the script printed HTML, the rendered page is shown too.
const PHP_CDN = 'https://cdn.jsdelivr.net/npm/';
export const PHP_VERSION = '8.3';

// Extension packages needed by a piece of code, in load order (dependencies first).
export const phpExtensionsFor = (code) => [
  'php-wasm-sqlite',
  'php-wasm-mbstring',
  ...(/\b(image[a-z]+|gd_info|gz(compress|uncompress|encode|decode|deflate|inflate))\s*\(/i.test(code) ? ['php-wasm-zlib'] : []),
  ...(/DOMDocument|DOMXPath|Dom\\|simplexml|SimpleXML|XMLReader|XMLWriter|xml_parse/i.test(code)
    ? ['php-wasm-libxml', 'php-wasm-dom', 'php-wasm-simplexml', 'php-wasm-xml'] : []),
  ...(/\b(image[a-z]+|gd_info)\s*\(/i.test(code) ? ['php-wasm-gd'] : []),
];

const toPhpDocument = (code) => `<!DOCTYPE html><html><head>${HEAD}
<style>
body{margin:0;padding:10px;background:#0f172a;color:#e2e8f0;font-family:sans-serif}
#status{color:#94a3b8;font-size:13px;margin-bottom:6px}
#out{font:13px/1.5 monospace;white-space:pre-wrap;word-break:break-word;margin:0}
#err{font:13px/1.5 monospace;white-space:pre-wrap;color:#f87171;margin:6px 0 0}
#page{display:none;margin-top:12px}
#page div{color:#94a3b8;font-weight:bold;font-size:13px;margin-bottom:4px}
#page iframe{width:100%;height:320px;border:0;border-radius:8px;background:#fff}
</style></head>
<body><div id="status">Loading PHP ${PHP_VERSION}... (the first run downloads about 5 MB)</div>
<pre id="out"></pre><pre id="err"></pre>
<div id="page"><div>Rendered HTML</div><iframe sandbox="allow-scripts"></iframe></div>
<script type="module">
const code = ${JSON.stringify(code).replace(/<\//g, '<\\/')};
const $ = (id) => document.getElementById(id);
try {
  const extensions = ${JSON.stringify(phpExtensionsFor(code))};
  const [{ PhpWeb }, ...libs] = await Promise.all([
    import('${PHP_CDN}php-wasm@0.1.0/PhpWeb.mjs'),
    ...extensions.map((name) => import('${PHP_CDN}' + name + '@0.1.0/index.mjs')),
  ]);
  const php = new PhpWeb({ version: '${PHP_VERSION}', sharedLibs: libs.map((m) => m.default) });
  let out = '', err = '';
  php.addEventListener('output', (e) => { out += e.detail.join(''); });
  php.addEventListener('error', (e) => { err += e.detail.join(''); });
  await php.binary;
  $('status').textContent = 'Running...';
  // Run the code as a real file (not eval'd text) so declare(strict_types=1),
  // __FILE__ and line numbers behave exactly as in a normal PHP script.
  await php.mkdir('/app');
  await php.writeFile('/app/index.php', new TextEncoder().encode(code));
  await php.run("<?php chdir('/app'); require '/app/index.php';");
  $('status').textContent = 'Output (PHP ${PHP_VERSION})';
  $('out').textContent = out || (err ? '' : 'No output. Use echo or print to show something.');
  $('err').textContent = err;
  if (/<(html|body|div|p|h[1-6]|ul|ol|table|form|a|strong|em|span|br)[\\s>/]/i.test(out)) {
    $('page').style.display = 'block';
    $('page').querySelector('iframe').srcdoc = out;
  }
} catch (e) {
  $('status').textContent = '';
  $('err').textContent = 'PHP could not load. Connect to the internet and run again.\\n' + (e && e.message ? e.message : e);
}
</script></body></html>`;

// Python previews run CPython 3.14 compiled to WebAssembly (Pyodide, from a CDN, so they
// need internet; the WebView caches it). Packages the code imports (numpy, pandas,
// matplotlib, scikit-learn, bs4...) are downloaded automatically. matplotlib figures are
// rendered to PNG and shown under the output. input() has no keyboard here: samples set
// their values in code, so stdin reports end-of-file.
export const PYODIDE_URL = 'https://cdn.jsdelivr.net/pyodide/v314.0.7/full/';

// Python run after the user's code: turns open matplotlib figures into base64 PNGs.
export const PY_FIGURES = `
import sys
_figs = []
if 'matplotlib.pyplot' in sys.modules:
    import io, base64, warnings
    _plt = sys.modules['matplotlib.pyplot']
    with warnings.catch_warnings():
        warnings.simplefilter('ignore')
        for _n in _plt.get_fignums():
            _buf = io.BytesIO()
            _plt.figure(_n).savefig(_buf, format='png', dpi=110, bbox_inches='tight')
            _figs.append(base64.b64encode(_buf.getvalue()).decode())
    _plt.close('all')
_figs
`;

// Removes Pyodide's own frames from a traceback so students only see their code.
// Kept as source text (not a function) because it runs inside the WebView page, and
// Hermes release builds do not keep function source for Function.prototype.toString().
export const CLEAN_TRACEBACK_JS = `(text) => {
  const out = [];
  let skipping = false;
  for (const line of String(text).split('\\n')) {
    if (line.startsWith('  File "')) skipping = line.includes('/_pyodide/');
    else if (!line.startsWith(' ')) skipping = false;
    if (!skipping) out.push(line);
  }
  return out.join('\\n').trim();
}`;

const toPythonDocument = (code) => `<!DOCTYPE html><html><head>${HEAD}
<style>
body{margin:0;padding:10px;background:#0f172a;color:#e2e8f0;font-family:sans-serif}
#status{color:#94a3b8;font-size:13px;margin-bottom:6px}
#out{font:13px/1.5 monospace;white-space:pre-wrap;word-break:break-word;margin:0}
#err{font:13px/1.5 monospace;white-space:pre-wrap;color:#f87171;margin:6px 0 0}
#figs img{display:block;max-width:100%;margin-top:10px;border-radius:8px;background:#fff}
</style></head>
<body><div id="status">Loading Python... (the first run downloads about 12 MB)</div>
<pre id="out"></pre><pre id="err"></pre><div id="figs"></div>
<script type="module">
const code = ${JSON.stringify(code).replace(/<\//g, '<\\/')};
const $ = (id) => document.getElementById(id);
const cleanTraceback = ${CLEAN_TRACEBACK_JS};
let out = '', err = '';
const flush = () => { $('out').textContent = out; $('err').textContent = err; };
try {
  const { loadPyodide } = await import('${PYODIDE_URL}pyodide.mjs');
  const py = await loadPyodide({ indexURL: '${PYODIDE_URL}' });
  // Raw writes keep output exactly as printed (print(..., end="") and progress dots).
  const dec = new TextDecoder();
  py.setStdout({ write: (b) => { out += dec.decode(b, { stream: true }); flush(); return b.length; } });
  py.setStderr({ write: (b) => { err += dec.decode(b, { stream: true }); flush(); return b.length; } });
  py.setStdin({ stdin: () => undefined });
  $('status').textContent = 'Loading packages...';
  await py.loadPackagesFromImports(code, { messageCallback: () => {} });
  if (/\\bzoneinfo\\b/.test(code)) await py.loadPackage('tzdata', { messageCallback: () => {} });   // time zone database
  py.runPython("import os, warnings; os.environ['MPLBACKEND'] = 'AGG'; warnings.filterwarnings('ignore', message='.*non-interactive.*'); warnings.filterwarnings('ignore', message='.*as_object_map.*')");
  $('status').textContent = 'Running...';
  try {
    await py.runPythonAsync(code, { filename: 'main.py' });
  } catch (e) {
    err += cleanTraceback(e.message) + '\\n';
    if (/EOFError/.test(e.message)) err += '\\n(input() cannot read the keyboard in Try it: set the value in the code instead.)\\n';
  }
  const figs = py.runPython(${JSON.stringify(PY_FIGURES)}).toJs();
  for (const b64 of figs) {
    const img = document.createElement('img');
    img.src = 'data:image/png;base64,' + b64;
    $('figs').appendChild(img);
  }
  $('status').textContent = 'Output (Python ' + py.runPython('import sys; sys.version.split()[0]') + ')';
  if (!out && !err && !figs.length) out = 'No output. Use print() to show something.';
  flush();
} catch (e) {
  $('status').textContent = '';
  $('err').textContent = 'Python could not load. Connect to the internet and run again.\\n' + (e && e.message ? e.message : e);
}
</script></body></html>`;

// Git previews run the commands of a sample against a real Git implementation
// (isomorphic-git) on a throw-away in-browser file system, printing terminal-style
// output. The command engine lives in gitPlayground.js and is shared with the checker.
const ISOGIT_URL = 'https://cdn.jsdelivr.net/npm/isomorphic-git@1.42.7/index.umd.min.js';
const LIGHTNINGFS_URL = 'https://cdn.jsdelivr.net/npm/@isomorphic-git/lightning-fs@4.10.2/dist/lightning-fs.min.js';
const BUFFER_URL = 'https://cdn.jsdelivr.net/npm/buffer@6.0.3/+esm';   // isomorphic-git needs Node's Buffer

const toGitDocument = (code) => `<!DOCTYPE html><html><head>${HEAD}
<style>
body{margin:0;padding:10px;background:#0f172a;color:#e2e8f0;font-family:sans-serif}
#status{color:#94a3b8;font-size:13px;margin-bottom:6px}
#out{font:13px/1.5 monospace;white-space:pre-wrap;word-break:break-word;margin:0}
.cmd{color:#67e8f9}.err{color:#f87171}.add{color:#4ade80}.del{color:#f87171}
</style>
<script src="${ISOGIT_URL}"></script>
<script src="${LIGHTNINGFS_URL}"></script></head>
<body><div id="status">Running Git...</div><pre id="out"></pre>
<script>
${GIT_PLAYGROUND_JS.replace(/<\//g, '<\\/')}
</script>
<script type="module">
(async function () {
  var out = document.getElementById('out'), status = document.getElementById('status');
  try { window.Buffer = window.Buffer || (await import('${BUFFER_URL}')).Buffer; } catch (e) {}
  if (!window.git || !window.LightningFS || !window.Buffer) {
    status.textContent = '';
    out.innerHTML = '<span class="err">Git could not load. Connect to the internet and run again.</span>';
    return;
  }
  function print(text) {
    String(text).split('\\n').forEach(function (line) {
      var span = document.createElement('span');
      if (/^\\$ /.test(line)) span.className = 'cmd';
      else if (/^(error|fatal|playground|git:|hint|CONFLICT)/.test(line)) span.className = 'err';
      else if (/^\\+(?!\\+\\+)/.test(line)) span.className = 'add';
      else if (/^-(?!--)/.test(line)) span.className = 'del';
      span.textContent = line + '\\n';
      out.appendChild(span);
    });
  }
  var fs = new LightningFS('codenest-try-' + Date.now(), { wipe: true });
  try {
    await runGitScript(${JSON.stringify(code).replace(/<\//g, '<\\/')}, window.git, fs, print);
    status.textContent = 'Terminal (Git playground)';
  } catch (e) {
    status.textContent = '';
    print('playground error: ' + (e && e.message ? e.message : e));
  }
})();
</script></body></html>`;

// Builds the preview page. JS snippets run inside a <script> on an empty page;
// HTML snippets that are not full documents get a sensible base page.
export const toDocument = (code, lang) => {
  if (lang === 'vue') return toVueDocument(code);
  if (lang === 'php') return toPhpDocument(code);
  if (lang === 'python') return toPythonDocument(code);
  if (lang === 'git') return toGitDocument(code);
  if (lang === 'jsx') {
    return `<!DOCTYPE html><html><head>${HEAD}${CONSOLE_SHIM}${REACT_SCRIPTS}</head>
<body><div id="root"></div>
<script>if (!window.React) document.body.innerHTML = '<p style="color:#b91c1c">React could not load. Connect to the internet and run again.</p>';</script>
<script type="text/babel" data-presets="react">${toReactSource(code).replace(/<\/script>/gi, '<\\/script>')}</script></body></html>`;
  }
  if (lang === 'js') {
    return `<!DOCTYPE html><html><head>${HEAD}<script>window.__JS_ONLY__=true;</script>${CONSOLE_SHIM}</head>
<body><script>${code.replace(/<\/script>/gi, '<\\/script>')}</script></body></html>`;
  }
  if (/<html[\s>]/i.test(code)) {
    return /<head[^>]*>/i.test(code)
      ? code.replace(/<head[^>]*>/i, m => m + CONSOLE_SHIM)
      : CONSOLE_SHIM + code;
  }
  return `<!DOCTYPE html><html><head>${HEAD}${CONSOLE_SHIM}</head><body>${code}</body></html>`;
};
