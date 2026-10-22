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

const HIGHLIGHTERS = { html: highlightHtml, vue: highlightHtml, css: highlightCss, js: highlightJs, jsx: highlightJsx, php: highlightPhp };
const LANG_LABELS = { js: 'JAVASCRIPT', jsx: 'REACT (JSX)', vue: 'VUE', php: 'PHP', text: 'TEXT' };

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
