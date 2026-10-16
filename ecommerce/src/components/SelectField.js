import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function SelectField({ label, value, options, valueKey, labelKey, onSelect, placeholder, colors }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const selected = options.find((o) => String(o[valueKey]) === String(value));

  const filteredOptions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => String(o[labelKey] || '').toLowerCase().includes(q));
  }, [options, query, labelKey]);

  const close = () => {
    setOpen(false);
    setQuery('');
  };

  return (
    <View style={s.field}>
      <Text style={[s.label, { color: colors.onSurface + '70' }]}>{label}</Text>
      <TouchableOpacity
        style={[s.selectBtn, { borderColor: colors.onSurface + '20', backgroundColor: colors.background }]}
        onPress={() => setOpen(true)}
      >
        <Text style={{ color: selected ? colors.text : colors.onSurface + '50', fontSize: 14 }}>
          {selected ? selected[labelKey] : placeholder}
        </Text>
        <MaterialIcons name="arrow-drop-down" size={20} color={colors.onSurface + '60'} />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade" onRequestClose={close}>
        <TouchableOpacity style={s.modalOverlay} activeOpacity={1} onPress={close}>
          <TouchableOpacity activeOpacity={1} style={[s.modalSheet, { backgroundColor: colors.surface }]}>
            <Text style={[s.modalTitle, { color: colors.text }]}>{label}</Text>
            <View style={[s.searchWrap, { borderColor: colors.onSurface + '20', backgroundColor: colors.background }]}>
              <MaterialIcons name="search" size={18} color={colors.onSurface + '50'} />
              <TextInput
                style={[s.searchInput, { color: colors.text }]}
                placeholder="Search..."
                placeholderTextColor={colors.onSurface + '50'}
                value={query}
                onChangeText={setQuery}
                autoFocus
              />
              {query.length > 0 && (
                <TouchableOpacity onPress={() => setQuery('')}>
                  <MaterialIcons name="close" size={18} color={colors.onSurface + '50'} />
                </TouchableOpacity>
              )}
            </View>
            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => String(item[valueKey])}
              style={{ maxHeight: 360 }}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={s.modalItem}
                  onPress={() => { onSelect(item[valueKey]); close(); }}
                >
                  <Text style={{ color: colors.text, fontSize: 14 }}>{item[labelKey]}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={<Text style={{ color: colors.onSurface + '50', padding: 14 }}>No options found</Text>}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  field: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  selectBtn: {
    borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, height: 46,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 24 },
  modalSheet: { borderRadius: 14, padding: 14, maxHeight: '70%' },
  modalTitle: { fontSize: 15, fontWeight: '700', marginBottom: 8, paddingHorizontal: 6 },
  searchWrap: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, height: 42,
    marginBottom: 8,
  },
  searchInput: { flex: 1, fontSize: 14, padding: 0 },
  modalItem: { paddingVertical: 12, paddingHorizontal: 10 },
});
