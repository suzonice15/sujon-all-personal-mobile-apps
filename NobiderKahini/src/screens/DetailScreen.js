import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../theme';
import Sidebar from '../components/Sidebar';
import BookmarksModal from '../components/BookmarksModal';
import useBookmarks from '../hooks/useBookmarks';

export default function DetailScreen({ route, navigation }) {
  const { story, prophetName } = route.params;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [bookmarked, setBookmarked] = useState(false);
  const { toggle, checkBookmarked, bookmarks, addTag, removeTag, reload } = useBookmarks();

  useEffect(() => {
    checkBookmarked(story.id, prophetName).then(setBookmarked);
  }, [story.id, prophetName, bookmarks]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: story.title,
      headerRight: () => (
        <TouchableOpacity style={styles.menuBtn} onPress={() => setSidebarOpen(true)}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, story.title]);

  const handleToggle = async () => {
    await toggle(story, prophetName);
    const val = await checkBookmarked(story.id, prophetName);
    setBookmarked(val);
  };

  return (
    <View style={styles.container}>
      <Sidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        navigation={navigation}
        onBookmarks={() => { setSidebarOpen(false); setBookmarksOpen(true); }}
      />
      <BookmarksModal
        visible={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
        bookmarks={bookmarks}
        addTag={addTag}
        removeTag={removeTag}
        onNavigate={item => navigation.navigate('StoryDetail', { story: item, prophetName: item.prophetName })}
      />

      {/* Toolbar */}
      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.toolBtn} onPress={() => setFontSize(s => Math.max(12, s - 2))}>
          <Text style={styles.toolText}>A-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolBtn} onPress={() => setFontSize(s => Math.min(26, s + 2))}>
          <Text style={styles.toolText}>A+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toolBtn, bookmarked && styles.toolBtnActive]}
          onPress={handleToggle}>
          <Text style={styles.toolText}>{bookmarked ? '🔖' : '📄'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.storyTitle}>{story.title}</Text>
          <View style={styles.divider} />
          <Text style={[styles.details, { fontSize, lineHeight: fontSize * 1.8 }]}>{story.details}</Text>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  menuBtn: { paddingHorizontal: 8 },
  menuIcon: { color: Colors.white, fontSize: 22 },
  toolbar: {
    flexDirection: 'row', justifyContent: 'flex-end',
    paddingHorizontal: 16, paddingVertical: 8,
    backgroundColor: Colors.white,
    borderBottomWidth: 1, borderBottomColor: Colors.border, gap: 8,
  },
  toolBtn: {
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8,
    backgroundColor: Colors.offWhite, borderWidth: 1, borderColor: Colors.border,
  },
  toolBtnActive: { backgroundColor: Colors.primary + '22', borderColor: Colors.primary },
  toolText: { fontSize: 14, fontWeight: '700', color: Colors.text },
  body: { flex: 1 },
  card: {
    backgroundColor: Colors.white, margin: 16, borderRadius: 16, padding: 20,
    elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 6,
  },
  storyTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.primary, marginBottom: 12 },
  divider: { height: 1, backgroundColor: Colors.border, marginBottom: 16 },
  details: { color: Colors.text, textAlign: 'justify' },
});
