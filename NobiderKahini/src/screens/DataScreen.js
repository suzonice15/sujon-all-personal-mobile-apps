import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../theme';
import Sidebar from '../components/Sidebar';
import BookmarksModal from '../components/BookmarksModal';
import useBookmarks from '../hooks/useBookmarks';

export default function DataScreen({ route, navigation }) {
  const { prophet } = route.params;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const { bookmarks, addTag, removeTag } = useBookmarks();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: prophet.name,
      headerRight: () => (
        <TouchableOpacity style={styles.menuBtn} onPress={() => setSidebarOpen(true)}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, prophet.name]);

  return (
    <View style={styles.container}>
      <Sidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        navigation={navigation}
        onBookmarks={() => setBookmarksOpen(true)}
      />
      <BookmarksModal
        visible={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
        bookmarks={bookmarks}
        addTag={addTag}
        removeTag={removeTag}
        onOpen={item => {
          setBookmarksOpen(false);
          navigation.navigate('StoryDetail', { story: item, prophetName: item.prophetName });
        }}
      />
      <FlatList
        data={prophet.stories}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('StoryDetail', { story: item, prophetName: prophet.name })}>
            <View style={styles.indexBox}>
              <Text style={styles.indexText}>{index + 1}</Text>
            </View>
            <Text style={styles.storyTitle}>{item.title}</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  menuBtn: { paddingHorizontal: 8 },
  menuIcon: { color: Colors.white, fontSize: 22 },
  list: { padding: 16, gap: 10 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    gap: 12,
  },
  indexBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: Colors.primary + '18',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexText: { fontSize: 12, fontWeight: 'bold', color: Colors.primary },
  storyTitle: { flex: 1, fontSize: 15, fontWeight: '600', color: Colors.text },
  arrow: { fontSize: 22, color: Colors.primary, fontWeight: 'bold' },
});
