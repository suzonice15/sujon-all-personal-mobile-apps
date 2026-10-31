import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MONO_FONT } from '../../components/course/CodeBlock';
import { toDocument } from '../../components/course/preview';

export default function TryItScreen({ route }) {
  const original = route.params?.code || '';
  const lang = route.params?.lang || 'html';
  const [code, setCode] = useState(original);
  const [rendered, setRendered] = useState(original);
  const [runId, setRunId] = useState(0);

  const run = () => {
    setRendered(code);
    setRunId(id => id + 1);
  };

  return (
    <SafeAreaView style={s.container} edges={['left', 'right', 'bottom']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={s.toolbar}>
          <Text style={s.label}>Edit the code</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={s.resetBtn} onPress={() => { setCode(original); setRendered(original); setRunId(id => id + 1); }}>
              <MaterialIcons name="restart-alt" size={18} color="#CDD6F4" />
            </TouchableOpacity>
            <TouchableOpacity style={s.runBtn} onPress={run}>
              <MaterialIcons name="play-arrow" size={18} color="#fff" />
              <Text style={s.runText}>Run</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TextInput
          style={s.editor}
          value={code}
          onChangeText={setCode}
          multiline
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          textAlignVertical="top"
        />
        <View style={s.resultBar}>
          <MaterialIcons name="visibility" size={16} color="#374151" />
          <Text style={s.resultLabel}>
            {lang === 'js' ? 'Output' : lang === 'jsx' ? 'Result (needs internet for React)' : lang === 'vue' ? 'Result (needs internet for Vue)' : lang === 'php' ? 'Output (needs internet for PHP)' : lang === 'python' ? 'Output (needs internet for Python)' : lang === 'git' ? 'Terminal (needs internet for Git)' : 'Result'}
          </Text>
        </View>
        <WebView
          key={runId}
          style={s.preview}
          originWhitelist={['*']}
          // A real-looking origin so localStorage and relative URLs work in examples.
          source={{ html: toDocument(rendered, lang), baseUrl: 'https://try.codenest.app/' }}
          domStorageEnabled
          javaScriptEnabled
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1E2E' },
  toolbar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#181825',
  },
  label: { color: '#A6ADC8', fontWeight: '700', fontSize: 13 },
  resetBtn: { padding: 6, marginRight: 8 },
  runBtn: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#0F766E',
    borderRadius: 8, paddingHorizontal: 14, paddingVertical: 6,
  },
  runText: { color: '#fff', fontWeight: '700', marginLeft: 4 },
  editor: {
    flex: 1, color: '#CDD6F4', fontFamily: MONO_FONT, fontSize: 13, lineHeight: 20,
    padding: 12, backgroundColor: '#1E1E2E',
  },
  resultBar: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#E5E7EB',
    paddingHorizontal: 12, paddingVertical: 6,
  },
  resultLabel: { marginLeft: 6, color: '#374151', fontWeight: '700', fontSize: 13 },
  preview: { flex: 1, backgroundColor: '#fff' },
});
