import React, { useEffect, useState } from 'react';
import {
  Modal, View, Text, TextInput, TouchableOpacity,
  FlatList, StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import {
  getFolders, createFolder, addToFolder,
  removeFromFolder, getContentFolderIds,
} from '../db/bookmarks';

export default function BookmarkModal({ visible, onClose, item }) {
  const [folders, setFolders] = useState([]);
  const [savedFolderIds, setSavedFolderIds] = useState([]);
  const [newFolderName, setNewFolderName] = useState('');

  useEffect(() => {
    if (visible) loadFolders();
  }, [visible]);

  const loadFolders = async () => {
    const [f, ids] = await Promise.all([
      getFolders(),
      getContentFolderIds(item.id),
    ]);
    setFolders(f);
    setSavedFolderIds(ids);
  };

  const toggleFolder = async (folder_id) => {
    if (savedFolderIds.includes(folder_id)) {
      await removeFromFolder(folder_id, item.id);
      setSavedFolderIds(prev => prev.filter(id => id !== folder_id));
    } else {
      await addToFolder(folder_id, item.id, item.title);
      setSavedFolderIds(prev => [...prev, folder_id]);
    }
  };

  const handleAddRow = async () => {
    const name = newFolderName.trim();
    if (!name) return;
    await createFolder(name);
    setNewFolderName('');
    loadFolders();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.modal}>

            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.heading}>📚 বুকমার্ক</Text>
              <TouchableOpacity onPress={onClose}>
                <Text style={styles.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.subTitle} numberOfLines={2}>{item?.title}</Text>

            {/* New Folder Input */}
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="নতুন ফোল্ডার এর নাম লিখুন..."
                value={newFolderName}
                onChangeText={setNewFolderName}
                placeholderTextColor="#aaa"
              />
              <TouchableOpacity style={styles.addBtn} onPress={handleAddRow}>
                <Text style={styles.addBtnText}>+ যোগ করুন</Text>
              </TouchableOpacity>
            </View>

            {/* Folder List */}
            <FlatList
              data={folders}
              keyExtractor={f => String(f.id)}
              style={styles.list}
              ListEmptyComponent={
                <Text style={styles.empty}>কোনো ফোল্ডার নেই। উপরে নতুন বানান।</Text>
              }
              renderItem={({ item: folder }) => {
                const checked = savedFolderIds.includes(folder.id);
                return (
                  <TouchableOpacity
                    style={styles.folderRow}
                    onPress={() => toggleFolder(folder.id)}>
                    <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
                      {checked && <Text style={styles.checkMark}>✓</Text>}
                    </View>
                    <Text style={styles.folderIcon}>📁</Text>
                    <View style={styles.folderInfo}>
                      <Text style={styles.folderName}>{folder.name}</Text>
                      <Text style={styles.folderCount}>{folder.item_count} টি story</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />

            {/* Save Button */}
            <TouchableOpacity style={styles.saveBtn} onPress={onClose}>
              <Text style={styles.saveBtnText}>সংরক্ষণ করুন</Text>
            </TouchableOpacity>

          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // width:"100%"
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '350',
    maxHeight: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  heading: { fontSize: 17, fontWeight: 'bold', color: '#1a1a1a' },
  closeBtn: { fontSize: 18, color: '#aaa', padding: 4 },
  subTitle: {
    fontSize: 13, color: '#888',
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
  },
  inputRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#1a1a1a',
  },
  addBtn: {
    backgroundColor: '#4F46E5',
    borderRadius: 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  addBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  list: { maxHeight: 260 },
  empty: { color: '#aaa', textAlign: 'center', paddingVertical: 20, fontSize: 13 },
  folderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    gap: 10,
  },
  checkbox: {
    width: 22, height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: '#4F46E5', borderColor: '#4F46E5' },
  checkMark: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  folderIcon: { fontSize: 20 },
  folderInfo: { flex: 1 },
  folderName: { fontSize: 14, fontWeight: '600', color: '#1a1a1a' },
  folderCount: { fontSize: 12, color: '#aaa', marginTop: 2 },
  saveBtn: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 14,
  },
  saveBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
