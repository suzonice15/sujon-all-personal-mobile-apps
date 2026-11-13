import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const MONO_FONT = Platform.select({ ios: 'Menlo', default: 'monospace' });

const COLORS = {
  background: '#1E1E2E',
  bar: '#181825',
  text: '#CDD6F4',
  tag: '#F38BA8',
  attr: '#FAB387',
  string: '#A6E3A1',
  comment: '#7F849C',
  fn: '#89B4FA',
  muted: '#A6ADC8',
};

// Small HTML highlighter: comments, tags, attribute names and quoted values.
const TOKEN_RE = /(<!--[\s\S]*?-->)|(<\/?[a-zA-Z!][\w-]*)|("[^"]*"|'[^']*')|(\s[a-zA-Z-]+(?==))|(\/?>)/g;

const highlightHtml = (code) => {
  const parts = [];
  let last = 0;
  let m;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(code))) {
    if (m.index > last) parts.push({ text: code.slice(last, m.index), color: COLORS.text });
    const color = m[1] ? COLORS.comment : m[2] || m[5] ? COLORS.tag : m[3] ? COLORS.string : COLORS.attr;
    parts.push({ text: m[0], color });
    last = m.index + m[0].length;
  }
  if (last < code.length) parts.push({ text: code.slice(last), color: COLORS.text });
  return parts;
};

// CSS: comments, at-rules, quoted strings and property names.
const CSS_TOKEN_RE = /(\/\*[\s\S]*?\*\/)|(@[\w-]+)|("[^"]*"|'[^']*')|([\w-]+(?=\s*:\s*[^;{}]*;))/g;

const highlightCss = (code) => {
  const parts = [];
  let last = 0;
  let m;
  CSS_TOKEN_RE.lastIndex = 0;
  while ((m = CSS_TOKEN_RE.exec(code))) {
    if (m.index > last) parts.push({ text: code.slice(last, m.index), color: COLORS.text });
    const color = m[1] ? COLORS.comment : m[2] ? COLORS.tag : m[3] ? COLORS.string : COLORS.attr;
    parts.push({ text: m[0], color });
    last = m.index + m[0].length;
  }
  if (last < code.length) parts.push({ text: code.slice(last), color: COLORS.text });
  return parts;
};

// JavaScript: comments, strings (incl. template literals), keywords, numbers, function calls.
const JS_KEYWORDS = 'const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|super|this|import|export|from|default|async|await|try|catch|finally|throw|typeof|instanceof|in|of|null|undefined|true|false|static|get|set|delete|void|yield';
const JS_TOKEN_RE = new RegExp(
  '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)' +          // 1 comment
  '|("(?:\\\\.|[^"\\\\\\n])*"|\'(?:\\\\.|[^\'\\\\\\n])*\'|`(?:\\\\.|[^`\\\\])*`)' + // 2 string
  '|\\b(' + JS_KEYWORDS + ')\\b' +                     // 3 keyword
  '|\\b(\\d+(?:\\.\\d+)?)\\b' +                          // 4 number
  '|\\b([A-Za-z_$][\\w$]*)(?=\\s*\\()',                 // 5 function call
  'g'
);

const highlightJs = (code) => {
  const parts = [];
  let last = 0;
  let m;
  JS_TOKEN_RE.lastIndex = 0;
  while ((m = JS_TOKEN_RE.exec(code))) {
    if (m.index > last) parts.push({ text: code.slice(last, m.index), color: COLORS.text });
    const color = m[1] ? COLORS.comment : m[2] ? COLORS.string : m[3] ? COLORS.tag : m[4] ? COLORS.attr : COLORS.fn;
    parts.push({ text: m[0], color });
    last = m.index + m[0].length;
  }
  if (last < code.length) parts.push({ text: code.slice(last), color: COLORS.text });
  return parts;
};

// JSX: JS tokens plus JSX tags (<Component ...>, </div>, />).
const JSX_TOKEN_RE = new RegExp(JS_TOKEN_RE.source + '|(<\\/?[A-Za-z][\\w.]*|\\/?>)', 'g');

const highlightJsx = (code) => {
  const parts = [];
  let last = 0;
  let m;
  JSX_TOKEN_RE.lastIndex = 0;
  while ((m = JSX_TOKEN_RE.exec(code))) {
    if (m.index > last) parts.push({ text: code.slice(last, m.index), color: COLORS.text });
    const color = m[1] ? COLORS.comment : m[2] ? COLORS.string : m[3] ? COLORS.tag : m[4] ? COLORS.attr : m[5] ? COLORS.fn : COLORS.tag;
    parts.push({ text: m[0], color });
    last = m.index + m[0].length;
  }
  if (last < code.length) parts.push({ text: code.slice(last), color: COLORS.text });
  return parts;
};

// PHP: comments, strings, <?php ?> tags, $variables, keywords, numbers, function calls.
const PHP_KEYWORDS = 'abstract|and|array|as|break|case|catch|class|clone|const|continue|declare|default|do|echo|else|elseif|empty|enum|extends|final|finally|fn|for|foreach|function|global|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|match|namespace|new|or|print|private|protected|public|readonly|require|require_once|return|static|switch|throw|trait|try|unset|use|while|yield|true|false|null|self|parent|int|float|string|bool|void|never|mixed|iterable|callable|object';
const PHP_TOKEN_RE = new RegExp(
  '(\\/\\/[^\\n]*|#(?!\\[)[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)' +                  // 1 comment
  '|("(?:\\\\.|[^"\\\\])*"|\'(?:\\\\.|[^\'\\\\])*\')' +                       // 2 string
  '|(<\\?php|<\\?=|\\?>)' +                                                   // 3 open/close tag
  '|(\\$[A-Za-z_][\\w]*)' +                                                   // 4 variable
  '|\\b(' + PHP_KEYWORDS + ')\\b' +                                          // 5 keyword
  '|\\b(\\d+(?:\\.\\d+)?)\\b' +                                               // 6 number
  '|\\b([A-Za-z_][\\w]*)(?=\\s*\\()',                                         // 7 function call
  'gi'
);

const highlightPhp = (code) => {
  const parts = [];
  let last = 0;
  let m;
  PHP_TOKEN_RE.lastIndex = 0;
  while ((m = PHP_TOKEN_RE.exec(code))) {
    if (m.index > last) parts.push({ text: code.slice(last, m.index), color: COLORS.text });
    const color = m[1] ? COLORS.comment : m[2] ? COLORS.string : m[3] || m[5] ? COLORS.tag : m[4] ? COLORS.attr : m[6] ? COLORS.attr : COLORS.fn;
    parts.push({ text: m[0], color });
    last = m.index + m[0].length;
  }
  if (last < code.length) parts.push({ text: code.slice(last), color: COLORS.text });
  return parts;
};

// Python: comments, strings (triple-quoted, f/r/b prefixes), decorators, keywords, numbers, calls.
const PY_KEYWORDS = 'False|None|True|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|raise|return|try|type|while|with|yield|self|cls|print|len|range|int|str|float|bool|list|dict|set|tuple';
const PY_TOKEN_RE = new RegExp(
  '(#[^\\n]*)' +                                                                            // 1 comment
  '|((?:[rRbBuUfF]{1,2})?(?:"""[\\s\\S]*?"""|\'\'\'[\\s\\S]*?\'\'\'|"(?:\\\\.|[^"\\\\\\n])*"|\'(?:\\\\.|[^\'\\\\\\n])*\'))' + // 2 string
  '|(@[A-Za-z_][\\w.]*)' +                                                                  // 3 decorator
  '|\\b(' + PY_KEYWORDS + ')\\b' +                                                         // 4 keyword
  '|\\b(\\d[\\d_]*(?:\\.\\d+)?)\\b' +                                                        // 5 number
  '|\\b([A-Za-z_]\\w*)(?=\\s*\\()',                                                         // 6 function call
  'g'
);

const highlightPython = (code) => {
  const parts = [];
  let last = 0;
  let m;
  PY_TOKEN_RE.lastIndex = 0;
  while ((m = PY_TOKEN_RE.exec(code))) {
    if (m.index > last) parts.push({ text: code.slice(last, m.index), color: COLORS.text });
    const color = m[1] ? COLORS.comment : m[2] ? COLORS.string : m[3] ? COLORS.attr : m[4] ? COLORS.tag : m[5] ? COLORS.attr : COLORS.fn;
    parts.push({ text: m[0], color });
    last = m.index + m[0].length;
  }
  if (last < code.length) parts.push({ text: code.slice(last), color: COLORS.text });
  return parts;
};

// SQL: comments, quoted strings, keywords, numbers and function calls.
const SQL_KEYWORDS = 'SELECT|FROM|WHERE|AND|OR|NOT|NULL|IS|IN|BETWEEN|LIKE|AS|DISTINCT|ORDER|BY|ASC|DESC|LIMIT|OFFSET|GROUP|HAVING|JOIN|INNER|LEFT|RIGHT|FULL|OUTER|CROSS|ON|USING|UNION|ALL|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|ALTER|ADD|COLUMN|DROP|INDEX|VIEW|PRIMARY|KEY|FOREIGN|REFERENCES|UNIQUE|CHECK|DEFAULT|CONSTRAINT|BEGIN|COMMIT|ROLLBACK|TRANSACTION|IF|EXISTS|CASE|WHEN|THEN|ELSE|END|WITH|EXPLAIN|QUERY|PLAN|PRAGMA|INTEGER|TEXT|REAL|BLOB|NUMERIC|BOOLEAN|COUNT|SUM|AVG|MIN|MAX|COALESCE|CAST|AUTOINCREMENT|CONFLICT|DO|EXCLUDED|UPSERT';
const SQL_TOKEN_RE = new RegExp(
  '(--[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)' +      // 1 comment
  '|(\'(?:\'\'|[^\'])*\')' +                  // 2 string
  '|\\b(' + SQL_KEYWORDS + ')\\b' +           // 3 keyword
  '|\\b(\\d+(?:\\.\\d+)?)\\b' +               // 4 number
  '|\\b([A-Za-z_][\\w]*)(?=\\s*\\()',         // 5 function call
  'gi'
);

const highlightSql = (code) => {
  const parts = [];
  let last = 0;
  let m;
  SQL_TOKEN_RE.lastIndex = 0;
  while ((m = SQL_TOKEN_RE.exec(code))) {
    if (m.index > last) parts.push({ text: code.slice(last, m.index), color: COLORS.text });
    const color = m[1] ? COLORS.comment : m[2] ? COLORS.string : m[3] ? COLORS.tag : m[4] ? COLORS.attr : COLORS.fn;
    parts.push({ text: m[0], color });
    last = m.index + m[0].length;
  }
  if (last < code.length) parts.push({ text: code.slice(last), color: COLORS.text });
  return parts;
};

// TypeScript: JavaScript tokens plus type keywords, types and generics.
const TS_EXTRA = 'interface|type|enum|implements|namespace|declare|readonly|abstract|public|private|protected|keyof|as|satisfies|infer|never|unknown|any|number|bigint|symbol|object|void|undefined|string|boolean';
const TS_KEYWORDS = JS_KEYWORDS + '|' + TS_EXTRA;
const TS_TOKEN_RE = new RegExp(
  '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)' +          // 1 comment
  '|("(?:\\\\.|[^"\\\\\\n])*"|\'(?:\\\\.|[^\'\\\\\\n])*\'|`(?:\\\\.|[^`\\\\])*`)' + // 2 string
  '|\\b(' + TS_KEYWORDS + ')\\b' +                   // 3 keyword
  '|\\b(\\d+(?:\\.\\d+)?)\\b' +                        // 4 number
  '|\\b([A-Za-z_$][\\w$]*)(?=\\s*[<(])',              // 5 function or generic
  'g'
);

const highlightTs = (code) => {
  const parts = [];
  let last = 0;
  let m;
  TS_TOKEN_RE.lastIndex = 0;
  while ((m = TS_TOKEN_RE.exec(code))) {
    if (m.index > last) parts.push({ text: code.slice(last, m.index), color: COLORS.text });
    const color = m[1] ? COLORS.comment : m[2] ? COLORS.string : m[3] ? COLORS.tag : m[4] ? COLORS.attr : COLORS.fn;
    parts.push({ text: m[0], color });
    last = m.index + m[0].length;
  }
  if (last < code.length) parts.push({ text: code.slice(last), color: COLORS.text });
  return parts;
};

// TSX: TypeScript tokens plus JSX tags.
const TSX_TOKEN_RE = new RegExp(TS_TOKEN_RE.source + '|(<\\/?[A-Za-z][\\w.]*|\\/?>)', 'g');

const highlightTsx = (code) => {
  const parts = [];
  let last = 0;
  let m;
  TSX_TOKEN_RE.lastIndex = 0;
  while ((m = TSX_TOKEN_RE.exec(code))) {
    if (m.index > last) parts.push({ text: code.slice(last, m.index), color: COLORS.text });
    const color = m[1] ? COLORS.comment : m[2] ? COLORS.string : m[3] ? COLORS.tag : m[4] ? COLORS.attr : m[5] ? COLORS.fn : COLORS.tag;
    parts.push({ text: m[0], color });
    last = m.index + m[0].length;
  }
  if (last < code.length) parts.push({ text: code.slice(last), color: COLORS.text });
  return parts;
};

// Java: comments, strings/chars, annotations, keywords, numbers, calls.
const JAVA_KEYWORDS = 'abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|void|volatile|while|true|false|null|var|record|sealed|permits|yield';
const JAVA_TOKEN_RE = new RegExp(
  '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)' +          // 1 comment
  '|("(?:\\\\.|[^"\\\\\\n])*"|\'(?:\\\\.|[^\'\\\\\\n])*\')' + // 2 string or char
  '|(@[A-Za-z_][\\w.]*)' +                            // 3 annotation
  '|\\b(' + JAVA_KEYWORDS + ')\\b' +                  // 4 keyword
  '|\\b(\\d[\\d_]*(?:\\.\\d+)?[fFdDlL]?)\\b' +         // 5 number
  '|\\b([A-Za-z_$][\\w$]*)(?=\\s*\\()',                // 6 method call
  'g'
);

const highlightJava = (code) => {
  const parts = [];
  let last = 0;
  let m;
  JAVA_TOKEN_RE.lastIndex = 0;
  while ((m = JAVA_TOKEN_RE.exec(code))) {
    if (m.index > last) parts.push({ text: code.slice(last, m.index), color: COLORS.text });
    const color = m[1] ? COLORS.comment : m[2] ? COLORS.string : m[3] ? COLORS.attr : m[4] ? COLORS.tag : m[5] ? COLORS.attr : COLORS.fn;
    parts.push({ text: m[0], color });
    last = m.index + m[0].length;
  }
  if (last < code.length) parts.push({ text: code.slice(last), color: COLORS.text });
  return parts;
};

// C: comments, strings/chars, preprocessor directives, keywords, numbers, calls.
const C_KEYWORDS = 'auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|restrict|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|_Bool|bool|true|false|NULL|size_t|FILE';
const C_TOKEN_RE = new RegExp(
  '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)' +          // 1 comment
  '|("(?:\\\\.|[^"\\\\\\n])*"|\'(?:\\\\.|[^\'\\\\\\n])*\')' + // 2 string or char
  '|(^[ \\t]*#[a-zA-Z]+)' +                          // 3 preprocessor
  '|\\b(' + C_KEYWORDS + ')\\b' +                    // 4 keyword
  '|\\b(\\d[\\d_]*(?:\\.\\d+)?[fFuUlL]*)\\b' +        // 5 number
  '|\\b([A-Za-z_][\\w]*)(?=\\s*\\()',                 // 6 function call
  'gm'
);

const highlightC = (code) => {
  const parts = [];
  let last = 0;
  let m;
  C_TOKEN_RE.lastIndex = 0;
  while ((m = C_TOKEN_RE.exec(code))) {
    if (m.index > last) parts.push({ text: code.slice(last, m.index), color: COLORS.text });
    const color = m[1] ? COLORS.comment : m[2] ? COLORS.string : m[3] ? COLORS.tag : m[4] ? COLORS.tag : m[5] ? COLORS.attr : COLORS.fn;
    parts.push({ text: m[0], color });
    last = m.index + m[0].length;
  }
  if (last < code.length) parts.push({ text: code.slice(last), color: COLORS.text });
  return parts;
};

// C++: C tokens plus classes, templates, STL and modern keywords.
const CPP_EXTRA = 'class|public|private|protected|virtual|override|final|template|typename|namespace|using|new|delete|nullptr|this|try|catch|throw|noexcept|constexpr|explicit|friend|operator|static_cast|dynamic_cast|const_cast|reinterpret_cast|mutable|decltype|std|string|vector|map|set|unique_ptr|shared_ptr|make_unique|make_shared|cout|cin|endl|lambda|auto';
const CPP_KEYWORDS = C_KEYWORDS + '|' + CPP_EXTRA;
const CPP_TOKEN_RE = new RegExp(
  '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)' +          // 1 comment
  '|("(?:\\\\.|[^"\\\\\\n])*"|\'(?:\\\\.|[^\'\\\\\\n])*\')' + // 2 string or char
  '|(^[ \\t]*#[a-zA-Z]+)' +                          // 3 preprocessor
  '|\\b(' + CPP_KEYWORDS + ')\\b' +                  // 4 keyword
  '|\\b(\\d[\\d_]*(?:\\.\\d+)?[fFuUlL]*)\\b' +        // 5 number
  '|\\b([A-Za-z_][\\w]*)(?=\\s*[<(])',                // 6 call or template
  'gm'
);

const highlightCpp = (code) => {
  const parts = [];
  let last = 0;
  let m;
  CPP_TOKEN_RE.lastIndex = 0;
  while ((m = CPP_TOKEN_RE.exec(code))) {
    if (m.index > last) parts.push({ text: code.slice(last, m.index), color: COLORS.text });
    const color = m[1] ? COLORS.comment : m[2] ? COLORS.string : m[3] ? COLORS.tag : m[4] ? COLORS.tag : m[5] ? COLORS.attr : COLORS.fn;
    parts.push({ text: m[0], color });
    last = m.index + m[0].length;
  }
  if (last < code.length) parts.push({ text: code.slice(last), color: COLORS.text });
  return parts;
};

// Bash: comments, strings, variables, keywords, commands and operators.
const BASH_KEYWORDS = 'if|then|else|elif|fi|for|while|until|do|done|case|esac|function|in|select|time|return|exit|break|continue|local|export|readonly|declare|unset|shift|source|alias|set';
const BASH_COMMANDS = 'ls|cd|pwd|mkdir|rmdir|touch|cp|mv|rm|ln|cat|less|more|head|tail|wc|grep|egrep|awk|sed|sort|uniq|cut|tr|find|xargs|chmod|chown|chgrp|sudo|su|ps|top|htop|kill|killall|jobs|bg|fg|nohup|curl|wget|ssh|scp|rsync|ping|ip|ifconfig|ss|netstat|apt|apt-get|dnf|yum|pacman|brew|systemctl|service|journalctl|crontab|tar|zip|unzip|gzip|docker|docker-compose|kubectl|git|echo|printf|read|test|which|whereis|man|date|whoami|uname|df|du|free|history|watch|screen|tmux|chmod|chown';
const BASH_TOKEN_RE = new RegExp(
  '(#[^\\n]*)' +                                     // 1 comment
  '|("(?:\\\\.|[^"\\\\])*"|\'(?:[^\'])*\')' +          // 2 string
  '|(\\$\\{?[A-Za-z_][\\w]*\\}?|\\$[0-9@*#?!$])' +     // 3 variable
  '|\\b(' + BASH_KEYWORDS + ')\\b' +                  // 4 keyword
  '|\\b(' + BASH_COMMANDS + ')\\b' +                  // 5 command
  '|(\\|\\||&&|\\||>>|>|<|;|&)' +                     // 6 operator
  'g'
);

const highlightBash = (code) => {
  const parts = [];
  let last = 0;
  let m;
  BASH_TOKEN_RE.lastIndex = 0;
  while ((m = BASH_TOKEN_RE.exec(code))) {
    if (m.index > last) parts.push({ text: code.slice(last, m.index), color: COLORS.text });
    const color = m[1] ? COLORS.comment : m[2] ? COLORS.string : m[3] ? COLORS.attr : m[4] ? COLORS.tag : m[5] ? COLORS.fn : COLORS.tag;
    parts.push({ text: m[0], color });
    last = m.index + m[0].length;
  }
  if (last < code.length) parts.push({ text: code.slice(last), color: COLORS.text });
  return parts;
};

// Dockerfile: instructions, comments, variables and strings.
const DOCKER_INSTRUCTIONS = 'FROM|RUN|CMD|LABEL|MAINTAINER|EXPOSE|ENV|ADD|COPY|ENTRYPOINT|VOLUME|USER|WORKDIR|ARG|ONBUILD|STOPSIGNAL|HEALTHCHECK|SHELL';
const DOCKER_TOKEN_RE = new RegExp(
  '(#[^\\n]*)' +                                     // 1 comment
  '|("(?:\\\\.|[^"\\\\\\n])*"|\'(?:[^\'\\\\\\n])*\')' + // 2 string
  '|(\\$\\{?[A-Za-z_][\\w]*\\}?)' +                    // 3 variable
  '|\\b(' + DOCKER_INSTRUCTIONS + ')\\b' +            // 4 instruction
  '|\\b(\\d+)\\b',                                    // 5 number
  'g'
);

const highlightDockerfile = (code) => {
  const parts = [];
  let last = 0;
  let m;
  DOCKER_TOKEN_RE.lastIndex = 0;
  while ((m = DOCKER_TOKEN_RE.exec(code))) {
    if (m.index > last) parts.push({ text: code.slice(last, m.index), color: COLORS.text });
    const color = m[1] ? COLORS.comment : m[2] ? COLORS.string : m[3] ? COLORS.attr : m[4] ? COLORS.tag : COLORS.attr;
    parts.push({ text: m[0], color });
    last = m.index + m[0].length;
  }
  if (last < code.length) parts.push({ text: code.slice(last), color: COLORS.text });
  return parts;
};

// YAML: comments, keys, strings, booleans and numbers.
const YAML_TOKEN_RE = new RegExp(
  '(#[^\\n]*)' +                                     // 1 comment
  '|("(?:\\\\.|[^"\\\\\\n])*"|\'(?:[^\'\\n])*\')' +    // 2 string
  '|(^[ \\t-]*[A-Za-z_][\\w.-]*)(?=\\s*:)' +          // 3 key
  '|\\b(true|false|null|yes|no)\\b' +                 // 4 boolean
  '|\\b(\\d+(?:\\.\\d+)?)\\b',                        // 5 number
  'gm'
);

const highlightYaml = (code) => {
  const parts = [];
  let last = 0;
  let m;
  YAML_TOKEN_RE.lastIndex = 0;
  while ((m = YAML_TOKEN_RE.exec(code))) {
    if (m.index > last) parts.push({ text: code.slice(last, m.index), color: COLORS.text });
    const color = m[1] ? COLORS.comment : m[2] ? COLORS.string : m[3] ? COLORS.fn : m[4] ? COLORS.tag : COLORS.attr;
    parts.push({ text: m[0], color });
    last = m.index + m[0].length;
  }
  if (last < code.length) parts.push({ text: code.slice(last), color: COLORS.text });
  return parts;
};

// C#: comments, strings, attributes, keywords, numbers, calls.
const CSHARP_KEYWORDS = 'abstract|as|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|do|double|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|goto|if|implicit|in|int|interface|internal|is|lock|long|namespace|new|null|object|operator|out|override|params|private|protected|public|readonly|record|ref|required|return|sbyte|sealed|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|var|virtual|void|volatile|while|async|await|yield|nameof|when|get|set|init|value|partial|global|with';
const CSHARP_TOKEN_RE = new RegExp(
  '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)' +                     // 1 comment
  '|(@?"(?:""|[^"])*"|\\$?"(?:\\\\.|[^"\\\\\\n])*")' +          // 2 string
  '|(@[A-Za-z_][\\w.]*)' +                                      // 3 attribute
  '|\\b(' + CSHARP_KEYWORDS + ')\\b' +                          // 4 keyword
  '|\\b(\\d[\\d_]*(?:\\.\\d+)?[fFdDmMlLuU]*)\\b' +               // 5 number
  '|\\b([A-Za-z_][\\w]*)(?=\\s*[<(])',                          // 6 call or generic
  'g'
);

const highlightCsharp = (code) => {
  const parts = [];
  let last = 0;
  let m;
  CSHARP_TOKEN_RE.lastIndex = 0;
  while ((m = CSHARP_TOKEN_RE.exec(code))) {
    if (m.index > last) parts.push({ text: code.slice(last, m.index), color: COLORS.text });
    const color = m[1] ? COLORS.comment : m[2] ? COLORS.string : m[3] ? COLORS.attr : m[4] ? COLORS.tag : m[5] ? COLORS.attr : COLORS.fn;
    parts.push({ text: m[0], color });
    last = m.index + m[0].length;
  }
  if (last < code.length) parts.push({ text: code.slice(last), color: COLORS.text });
  return parts;
};

// Dart: comments, strings, annotations, keywords, numbers, calls.
const DART_KEYWORDS = 'abstract|as|assert|async|await|base|break|case|catch|class|const|continue|covariant|default|deferred|do|dynamic|else|enum|export|extends|extension|external|factory|false|final|finally|for|Function|get|hide|if|implements|import|in|interface|is|late|library|mixin|new|null|on|operator|part|required|rethrow|return|sealed|set|show|static|super|switch|sync|this|throw|true|try|typedef|var|void|when|while|with|yield|int|double|String|bool|List|Map|Set|Future|Stream';
const DART_TOKEN_RE = new RegExp(
  '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)' +          // 1 comment
  '|("(?:\\\\.|[^"\\\\\\n])*"|\'(?:\\\\.|[^\'\\\\\\n])*\')' + // 2 string
  '|(@[A-Za-z_][\\w.]*)' +                          // 3 annotation
  '|\\b(' + DART_KEYWORDS + ')\\b' +                // 4 keyword
  '|\\b(\\d[\\d_]*(?:\\.\\d+)?)\\b' +                 // 5 number
  '|\\b([A-Za-z_][\\w]*)(?=\\s*[<(])',               // 6 call or generic
  'g'
);

const highlightDart = (code) => {
  const parts = [];
  let last = 0;
  let m;
  DART_TOKEN_RE.lastIndex = 0;
  while ((m = DART_TOKEN_RE.exec(code))) {
    if (m.index > last) parts.push({ text: code.slice(last, m.index), color: COLORS.text });
    const color = m[1] ? COLORS.comment : m[2] ? COLORS.string : m[3] ? COLORS.attr : m[4] ? COLORS.tag : m[5] ? COLORS.attr : COLORS.fn;
    parts.push({ text: m[0], color });
    last = m.index + m[0].length;
  }
  if (last < code.length) parts.push({ text: code.slice(last), color: COLORS.text });
  return parts;
};

// Go: comments, strings, keywords, numbers, calls.
const GO_KEYWORDS = 'break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go|goto|if|import|interface|map|package|range|return|select|struct|switch|type|var|true|false|nil|string|int|int8|int16|int32|int64|uint|uint8|uint16|uint32|uint64|float32|float64|complex64|complex128|bool|byte|rune|error|any|make|new|len|cap|append|copy|delete|close|panic|recover';
const GO_TOKEN_RE = new RegExp(
  '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)' +          // 1 comment
  '|("(?:\\\\.|[^"\\\\\\n])*"|`[^`]*`)' +              // 2 string
  '|\\b(' + GO_KEYWORDS + ')\\b' +                    // 3 keyword
  '|\\b(\\d[\\d_]*(?:\\.\\d+)?)\\b' +                  // 4 number
  '|\\b([A-Za-z_][\\w]*)(?=\\s*\\()',                  // 5 call
  'g'
);

const highlightGo = (code) => {
  const parts = [];
  let last = 0;
  let m;
  GO_TOKEN_RE.lastIndex = 0;
  while ((m = GO_TOKEN_RE.exec(code))) {
    if (m.index > last) parts.push({ text: code.slice(last, m.index), color: COLORS.text });
    const color = m[1] ? COLORS.comment : m[2] ? COLORS.string : m[3] ? COLORS.tag : m[4] ? COLORS.attr : COLORS.fn;
    parts.push({ text: m[0], color });
    last = m.index + m[0].length;
  }
  if (last < code.length) parts.push({ text: code.slice(last), color: COLORS.text });
  return parts;
};

// Kotlin: comments, strings, annotations, keywords, numbers, calls.
const KOTLIN_KEYWORDS = 'as|break|class|continue|do|else|false|for|fun|if|in|interface|is|null|object|package|return|super|this|throw|true|try|typealias|val|var|when|while|by|catch|constructor|delegate|field|file|finally|get|import|init|param|property|receiver|set|where|actual|abstract|annotation|companion|const|crossinline|data|enum|expect|external|final|infix|inline|inner|internal|lateinit|noinline|open|operator|out|override|private|protected|public|reified|sealed|suspend|tailrec|vararg|it|Unit|Any|Nothing|String|Int|Long|Double|Float|Boolean|List|Map|Set|Pair|Triple';
const KOTLIN_TOKEN_RE = new RegExp(
  '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)' +                     // 1 comment
  '|("(?:\\\\.|[^"\\\\\\n])*"|\'(?:\\\\.|[^\'\\\\\\n])*\')' +      // 2 string
  '|(@[A-Za-z_][\\w.]*)' +                                      // 3 annotation
  '|\\b(' + KOTLIN_KEYWORDS + ')\\b' +                          // 4 keyword
  '|\\b(\\d[\\d_]*(?:\\.\\d+)?[fFdDlL]?)\\b' +                   // 5 number
  '|\\b([A-Za-z_][\\w]*)(?=\\s*[<(])',                          // 6 call or generic
  'g'
);

const highlightKotlin = (code) => {
  const parts = [];
  let last = 0;
  let m;
  KOTLIN_TOKEN_RE.lastIndex = 0;
  while ((m = KOTLIN_TOKEN_RE.exec(code))) {
    if (m.index > last) parts.push({ text: code.slice(last, m.index), color: COLORS.text });
    const color = m[1] ? COLORS.comment : m[2] ? COLORS.string : m[3] ? COLORS.attr : m[4] ? COLORS.tag : m[5] ? COLORS.attr : COLORS.fn;
    parts.push({ text: m[0], color });
    last = m.index + m[0].length;
  }
  if (last < code.length) parts.push({ text: code.slice(last), color: COLORS.text });
  return parts;
};

const HIGHLIGHTERS = { html: highlightHtml, vue: highlightHtml, css: highlightCss, js: highlightJs, jsx: highlightJsx, ts: highlightTs, tsx: highlightTsx, php: highlightPhp, python: highlightPython, sql: highlightSql, java: highlightJava, c: highlightC, cpp: highlightCpp, bash: highlightBash, dockerfile: highlightDockerfile, yaml: highlightYaml, json: highlightYaml, rn: highlightJsx, mongosh: highlightJs, csharp: highlightCsharp, dart: highlightDart, go: highlightGo, kotlin: highlightKotlin, rust: highlightC, swift: highlightC, lua: highlightJs };
const LANG_LABELS = { js: 'JAVASCRIPT', jsx: 'REACT (JSX)', ts: 'TYPESCRIPT', tsx: 'REACT + TS', vue: 'VUE', php: 'PHP', python: 'PYTHON', sql: 'SQL', java: 'JAVA', c: 'C', cpp: 'C++', bash: 'SHELL', dockerfile: 'DOCKERFILE', yaml: 'YAML', json: 'JSON', rn: 'REACT NATIVE', mongosh: 'MONGODB', csharp: 'C#', dart: 'DART', go: 'GO', kotlin: 'KOTLIN', rust: 'RUST', swift: 'SWIFT', lua: 'LUA', git: 'TERMINAL', text: 'TEXT' };

export default function CodeBlock({ code, lang = 'html', onTryIt }) {
  const [copied, setCopied] = useState(false);
  const highlight = HIGHLIGHTERS[lang];
  const parts = highlight ? highlight(code) : [{ text: code, color: COLORS.text }];

  const copy = () => {
    Clipboard.setString(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <View style={s.wrap}>
      <View style={s.bar}>
        <Text style={s.lang}>{LANG_LABELS[lang] || lang.toUpperCase()}</Text>
        <TouchableOpacity onPress={copy} style={s.barBtn} hitSlop={8}>
          <MaterialIcons name={copied ? 'check' : 'content-copy'} size={15} color={COLORS.muted} />
          <Text style={s.barBtnText}>{copied ? 'Copied' : 'Copy'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.codeArea}>
        <Text style={s.code} selectable>
          {parts.map((p, i) => (
            <Text key={i} style={{ color: p.color }}>{p.text}</Text>
          ))}
        </Text>
      </ScrollView>
      {onTryIt && (
        <TouchableOpacity style={s.tryBtn} onPress={onTryIt} activeOpacity={0.8}>
          <MaterialIcons name="play-arrow" size={18} color="#fff" />
          <Text style={s.tryText}>Try it yourself</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.bar,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  lang: { color: COLORS.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  barBtn: { flexDirection: 'row', alignItems: 'center' },
  barBtnText: { color: COLORS.muted, fontSize: 12, marginLeft: 4 },
  codeArea: { padding: 12 },
  code: { fontFamily: MONO_FONT, fontSize: 13, lineHeight: 20 },
  tryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F766E',
    paddingVertical: 9,
  },
  tryText: { color: '#fff', fontWeight: '700', marginLeft: 4 },
});
