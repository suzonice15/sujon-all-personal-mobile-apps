import React, { useState } from 'react';
import {
  View, Text, Modal, TouchableOpacity, FlatList,
  TextInput, StyleSheet, Dimensions, ScrollView,
} from 'react-native';
import { Colors } from '../theme';

const { height } = Dimensions.get('window');

export default function BookmarksModal({ visible, onClose, bookmarks, addTag, removeTag, onNavigate }) {
  const [selected, setSelected] = useState(null);
  const [tagInput, setTagInput] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);

  const openStory = item => setSelected(item);

  const handleAddTag = () => {
    if (!tagInput.trim() || !selected) return;
    addTag(selected.id, selected.prophetName, tagInput.trim());
    setTagInput('');
    setShowTagInput(false);
  };

  const handleRemoveTag = tag => {
    if (!selected) return;
    removeTag(selected.id, selected.prophetName, tag);
    // update local selected tags
    setSelected(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  // sync selected with updated bookmarks
  React.useEffect(() => {
    if (selected) {
      const updated = bookmarks.find(b => b.id === selected.id && b.prophetName === selected.prophetName);
      if (updated) setSelected(updated);
    }
  }, [bookmarks]);

  const handleClose = () => {
    setSelected(null);
    setTagInput('');
    setShowTagInput(false);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={handleClose} activeOpacity={1} />

        <View style={styles.sheet}>
          <View style={styles.handle} />

          {/* Header */}
          <View style={styles.header}>
            {selected ? (
              <TouchableOpacity onPress={() => setSelected(null)}>
                <Text style={styles.backBtn}>‹ ফিরে যান</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.heading}>🔖 বুকমার্ক</Text>
            )}
            <TouchableOpacity onPress={handleClose}>
              <Text style={styles.closeBtn}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* List view */}
          {!selected ? (
            bookmarks.length === 0 ? (
              <Text style={styles.empty}>কোনো বুকমার্ক নেই</Text>
            ) : (
              <FlatList
                data={bookmarks}
                keyExtractor={(item, i) => item.id + i}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16, gap: 10 }}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.item} onPress={() => openStory(item)}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.prophet}>{item.prophetName}</Text>
                      <Text style={styles.title}>{item.title}</Text>
                      {item.tags.length > 0 && (
                        <View style={styles.tagRow}>
                          {item.tags.map(tag => (
                            <View key={tag} style={styles.tag}>
                              <Text style={styles.tagText}>{tag}</Text>
                            </View>
                          ))}
                        </View>
                      )}
                    </View>
                    <Text style={styles.arrow}>›</Text>
                  </TouchableOpacity>
                )}
              />
            )
          ) : (
            /* Reading view */
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
              <View style={styles.readingCard}>
                <Text style={styles.readingProphet}>{selected.prophetName}</Text>
                <Text style={styles.readingTitle}>{selected.title}</Text>
                <View style={styles.divider} />
                <Text style={styles.readingDetails}>{selected.details}</Text>

                {/* Tags section */}
                <View style={styles.divider} />
                <Text style={styles.tagHeading}>ট্যাগসমূহ</Text>
                <View style={styles.tagRow}>
                  {selected.tags.map(tag => (
                    <TouchableOpacity
                      key={tag}
                      style={styles.tagRemovable}
                      onPress={() => handleRemoveTag(tag)}>
                      <Text style={styles.tagText}>{tag} ✕</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {showTagInput ? (
                  <View style={styles.tagInputRow}>
                    <TextInput
                      style={styles.tagInput}
                      placeholder="ট্যাগ লিখুন..."
                      value={tagInput}
                      onChangeText={setTagInput}
                      placeholderTextColor={Colors.textMuted}
                      onSubmitEditing={handleAddTag}
                    />
                    <TouchableOpacity style={styles.tagAddBtn} onPress={handleAddTag}>
                      <Text style={styles.tagAddText}>যোগ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowTagInput(false)}>
                      <Text style={styles.tagCancel}>বাতিল</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity onPress={() => setShowTagInput(true)}>
                    <Text style={styles.addTagLink}>+ নতুন ট্যাগ যোগ করুন</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={styles.goBtn}
                  onPress={() => { handleClose(); onNavigate(selected); }}>
                  <Text style={styles.goBtnText}>সম্পূর্ণ পড়ুন →</Text>
                </TouchableOpacity>
              </View>
              <View style={{ height: 40 }} />
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: '#00000066' },
  sheet: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: height * 0.85,
    minHeight: height * 0.5,
  },
  handle: {
    width: 40, height: 4, backgroundColor: Colors.border,
    borderRadius: 2, alignSelf: 'center', marginTop: 12,
  },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  heading: { fontSize: 17, fontWeight: 'bold', color: Colors.text },
  backBtn: { fontSize: 15, color: Colors.primary, fontWeight: '600' },
  closeBtn: { fontSize: 18, color: Colors.textMuted },
  empty: { textAlign: 'center', color: Colors.textMuted, marginTop: 60, fontSize: 15 },
  item: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.white, borderRadius: 14, padding: 14, elevation: 2,
  },
  prophet: { fontSize: 11, color: Colors.primary, fontWeight: '700' },
  title: { fontSize: 14, fontWeight: '600', color: Colors.text, marginTop: 2 },
  arrow: { fontSize: 22, color: Colors.primary },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 },
  tag: { backgroundColor: Colors.primary + '18', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  tagRemovable: { backgroundColor: Colors.primary + '22', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: Colors.primary + '44' },
  tagText: { fontSize: 12, color: Colors.primary, fontWeight: '600' },

  // Reading view
  readingCard: { margin: 16, backgroundColor: Colors.white, borderRadius: 16, padding: 20, elevation: 2 },
  readingProphet: { fontSize: 12, color: Colors.primary, fontWeight: '700', marginBottom: 4 },
  readingTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text, marginBottom: 12 },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: 14 },
  readingDetails: { fontSize: 15, color: Colors.text, lineHeight: 26, textAlign: 'justify' },
  tagHeading: { fontSize: 13, fontWeight: '700', color: Colors.textSecondary, marginBottom: 8 },
  tagInputRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 8 },
  tagInput: {
    flex: 1, borderWidth: 1, borderColor: Colors.border,
    borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6,
    fontSize: 13, color: Colors.text,
  },
  tagAddBtn: { backgroundColor: Colors.primary, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  tagAddText: { color: Colors.white, fontSize: 13, fontWeight: '600' },
  tagCancel: { fontSize: 13, color: Colors.textMuted },
  addTagLink: { fontSize: 13, color: Colors.primary, marginTop: 10, fontWeight: '600' },
  goBtn: {
    marginTop: 16, backgroundColor: Colors.primary,
    borderRadius: 12, padding: 14, alignItems: 'center',
  },
  goBtnText: { color: Colors.white, fontWeight: 'bold', fontSize: 15 },
});
