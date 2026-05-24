import React, { useState, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getFolders, getFolderItems, deleteFolder } from '../../db/bookmarks';

export default function BookmarksScreen({ navigation }) {
  const [folders, setFolders] = useState([]);
  const [openFolderId, setOpenFolderId] = useState(null);
  const [folderItems, setFolderItems] = useState({});

  useFocusEffect(
    useCallback(() => {
      loadFolders();
    }, []),
  );

  const loadFolders = async () => {
    const data = await getFolders();
    setFolders(data);
  };

  const toggleFolder = async (folder_id) => {
    if (openFolderId === folder_id) {
      setOpenFolderId(null);
      return;
    }
    if (!folderItems[folder_id]) {
      const items = await getFolderItems(folder_id);
      setFolderItems(prev => ({ ...prev, [folder_id]: items }));
    }
    setOpenFolderId(folder_id);
  };

  const handleDeleteFolder = (folder) => {
    Alert.alert(
      'Folder মুছবেন?',
      `"${folder.name}" folder টি মুছে ফেলবেন?`,
      [
        { text: 'না', style: 'cancel' },
        {
          text: 'হ্যাঁ, মুছুন',
          style: 'destructive',
          onPress: async () => {
            await deleteFolder(folder.id);
            setFolderItems(prev => { delete prev[folder.id]; return { ...prev }; });
            loadFolders();
          },
        },
      ],
    );
  };

  const renderItem = ({ item: folder }) => {
    const isOpen = openFolderId === folder.id;
    const items = folderItems[folder.id] || [];

    return (
      <View style={styles.folderCard}>
        <TouchableOpacity style={styles.folderRow} onPress={() => toggleFolder(folder.id)}>
          <Text style={styles.folderIcon}>📁</Text>
          <View style={styles.folderInfo}>
            <Text style={styles.folderName}>{folder.name}</Text>
            <Text style={styles.folderCount}>{folder.item_count} টি গল্প </Text>
          </View>
          {/* <TouchableOpacity onPress={() => handleDeleteFolder(folder)}>
            <Text style={styles.deleteBtn}>🗑</Text>
          </TouchableOpacity> */}
          <Text style={styles.arrow}>{isOpen ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {isOpen && items.map(story => (
          <TouchableOpacity
            key={story.id}
            style={styles.storyRow}   
            onPress={() => navigation.navigate('StoryDetail', { item: story, title: folder.name })}>
            <Text style={styles.storyDot}>•</Text>
            <Text style={styles.storyTitle}>{story.title}</Text>
            <Text style={styles.storyArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={folders}
        keyExtractor={f => String(f.id)}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>🔖</Text>
            <Text style={styles.emptyText}>কোনো ফোল্ডার নেই।{'\n'} গল্প পড়ার সময় 🔖 চাপুন।</Text>
          </View>
        }
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  list: { padding: 16, gap: 10 },
  folderCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 2,
  },
  folderRow: {
    flexDirection: 'row', alignItems: 'center',
    padding: 14, gap: 10,
  },
  folderIcon: { fontSize: 24 },
  folderInfo: { flex: 1 },
  folderName: { fontSize: 15, fontWeight: 'bold', color: '#1a1a1a' },
  folderCount: { fontSize: 12, color: '#888', marginTop: 2 },
  deleteBtn: { fontSize: 18, paddingHorizontal: 4 },
  arrow: { fontSize: 12, color: '#aaa' },
  storyRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10, paddingHorizontal: 16,
    borderTopWidth: 1, borderTopColor: '#f0f0f0',
    gap: 8,
  },
  storyDot: { fontSize: 18, color: '#4CAF50' },
  storyTitle: { flex: 1, fontSize: 14, color: '#333' },
  storyArrow: { fontSize: 18, color: '#aaa' },
  emptyBox: { alignItems: 'center', marginTop: 80, gap: 12 },
  emptyIcon: { fontSize: 48 },
  emptyText: { fontSize: 15, color: '#aaa', textAlign: 'center', lineHeight: 24 },
});
