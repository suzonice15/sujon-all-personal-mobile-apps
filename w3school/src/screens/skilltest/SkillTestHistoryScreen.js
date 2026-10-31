import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AdBanner from '../../components/ads/AdBanner';
import { getSkillTests, deleteSkillTest } from '../../db/skillTests';
import { useUI, SPACE } from '../../components/course/ui';
import { ResultRow } from './SkillTestHomeScreen';

// Every saved skill test, newest first. Tap to review, long-press to delete.
export default function SkillTestHistoryScreen({ navigation }) {
  const [tests, setTests] = useState([]);
  const ui = useUI();
  const s = styles(ui);

  const load = useCallback(() => {
    getSkillTests().then(setTests).catch(e => console.log(e));
  }, []);

  useFocusEffect(load);

  const confirmDelete = (test) => Alert.alert('Delete this result?', 'It will be removed from your history.', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Delete', style: 'destructive', onPress: async () => { await deleteSkillTest(test.id); load(); } },
  ]);

  return (
    <SafeAreaView style={s.container} edges={['left', 'right']}>
      <FlatList
        data={tests}
        keyExtractor={t => String(t.id)}
        contentContainerStyle={s.content}
        ListHeaderComponent={tests.length > 0 && <Text style={s.hint}>{tests.length} tests · long-press a result to delete it</Text>}
        ListEmptyComponent={
          <View style={s.empty}>
            <MaterialIcons name="assignment" size={48} color={ui.sub} />
            <Text style={s.emptyText}>No skill tests yet.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <ResultRow
            test={item}
            ui={ui}
            onPress={() => navigation.navigate('SkillTestResult', { testId: item.id })}
            onLongPress={() => confirmDelete(item)}
          />
        )}
      />
      <AdBanner />
    </SafeAreaView>
  );
}

const styles = (ui) => StyleSheet.create({
  container: { flex: 1, backgroundColor: ui.bg },
  content: { padding: SPACE.lg },
  hint: { color: ui.sub, fontSize: 12, marginBottom: 10 },
  empty: { alignItems: 'center', marginTop: 60, gap: 10 },
  emptyText: { color: ui.sub },
});
