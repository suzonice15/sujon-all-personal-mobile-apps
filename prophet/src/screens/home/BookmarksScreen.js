import React, { useState, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, Alert, SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getFolders, getFolderItems, deleteFolder } from '../../db/bookmarks';

export default function BookmarksScreen({ navigation }) {
  const [folders, setFolders] = useState([]);
  const [openFolderId, setOpenFolderId] = useState(null);
  const [folderItems, setFolderItems] = useState({});
  const { colors } = useTheme();
  const s = styles(colors);

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
      <View style={s.card}>
        <TouchableOpacity style={s.folderRow} onPress={() => toggleFolder(folder.id)}>
          <View style={s.indexCircle}>
            <MaterialIcons name="folder" size={22} color="#fff" />
          </View>
          <View style={s.folderInfo}>
            <Text style={s.folderName}>{folder.name}</Text>
            <Text style={s.folderCount}>{folder.item_count} টি গল্প</Text>
          </View>
          <MaterialIcons name={isOpen ? 'expand-less' : 'expand-more'} size={22} color={colors.onSurface} />
        </TouchableOpacity>

        {isOpen && items.map(story => (
          <TouchableOpacity
            key={story.id}
            style={s.storyRow}
            onPress={() => navigation.navigate('StoryDetail', { item: story, headerTitle: folder.name })}>
            <MaterialIcons name="chrome-reader-mode" size={16} color={colors.primary} />
            <Text style={s.storyTitle}>{story.title}</Text>
            <MaterialIcons name="chevron-right" size={20} color={colors.onSurface} style={{ opacity: 0.3 }} />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={s.container}>
      <FlatList
        data={folders}
        keyExtractor={f => String(f.id)}
        contentContainerStyle={s.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={s.emptyBox}>
            <Text style={s.emptyIcon}>🔖</Text>
            <Text style={s.emptyText}>কোনো ফোল্ডার নেই।{'\n'} গল্প পড়ার সময় 🔖 চাপুন।</Text>
          </View>
        }
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: 16 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  folderRow: {
    flexDirection: 'row', alignItems: 'center',
    padding: 16, gap: 12,
  },
  indexCircle: {
    width: 45, height: 45, borderRadius: 22.5,
    backgroundColor: colors.circleBackground,
    justifyContent: 'center', alignItems: 'center',
  },
  folderIcon: { fontSize: 20 },
  folderInfo: { flex: 1 },
  folderName: { fontSize: 16, fontWeight: '700', color: colors.onSurface },
  folderCount: { fontSize: 13, color: colors.text, marginTop: 2, fontWeight: '500' },
  storyRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 12, paddingHorizontal: 16,
    gap: 10,
  },
  storyTitle: { flex: 1, fontSize: 14, fontWeight: '500', color: colors.onSurface },
  emptyBox: { alignItems: 'center', marginTop: 80, gap: 12 },
  emptyIcon: { fontSize: 48 },
  emptyText: { fontSize: 15, color: colors.text, opacity: 0.4, textAlign: 'center', lineHeight: 24 },
});
