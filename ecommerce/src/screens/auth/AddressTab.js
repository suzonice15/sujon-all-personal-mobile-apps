import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { getAllAddress } from '../../api/addressApi';
import AddressFormModal from '../../components/AddressFormModal';

export default function AddressTab() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const userId = user?.id;

  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchAddresses = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await getAllAddress(userId);
      setAddresses(Array.isArray(res) ? res : []);
    } catch {
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const openAddForm = () => {
    setEditingId(null);
    setFormOpen(true);
  };

  const openEditForm = (addressId) => {
    setEditingId(addressId);
    setFormOpen(true);
  };

  return (
    <View style={[s.section, { backgroundColor: colors.surface }]}>
      <View style={s.headerRow}>
        <Text style={[s.sectionTitle, { color: colors.text }]}>Saved Addresses</Text>
        <TouchableOpacity style={[s.addBtn, { backgroundColor: colors.primary }]} onPress={openAddForm}>
          <MaterialIcons name="add" size={18} color="#fff" />
          <Text style={s.addBtnText}>Add New</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={s.emptyState}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : addresses.length > 0 ? (
        addresses.map((row) => (
          <View key={row.address_id} style={[s.addressCard, { borderColor: colors.onSurface + '15' }]}>
            <View style={s.addressCardTop}>
              <Text style={[s.addressText, { color: colors.text, fontWeight: '700', fontSize: 13, flex: 1 }]}>{row.address}</Text>
              {Number(row.status) === 1 && (
                <Text style={s.primaryBadge}>Primary</Text>
              )}
            </View>
            <Text style={[s.addressText, { color: colors.onSurface + '60' }]}>
              {[row.upazilas_name, row.district_name, row.division_name].filter(Boolean).join(', ')}
            </Text>
            <TouchableOpacity style={s.editBtn} onPress={() => openEditForm(row.address_id)}>
              <MaterialIcons name="edit" size={16} color="#27C34B" />
              <Text style={s.editBtnText}>Edit</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <View style={s.emptyState}>
          <MaterialIcons name="location-off" size={48} color={colors.onSurface + '20'} />
          <Text style={[s.emptyText, { color: colors.onSurface + '50' }]}>No addresses saved yet</Text>
        </View>
      )}

      <AddressFormModal
        visible={formOpen}
        onClose={() => setFormOpen(false)}
        addressId={editingId}
        colors={colors}
        onSaved={fetchAddresses}
      />
    </View>
  );
}

const s = StyleSheet.create({
  section: { borderRadius: 14, padding: 18, marginBottom: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  addBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  addBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  emptyState: { alignItems: 'center', paddingVertical: 30, gap: 8 },
  emptyText: { fontSize: 14 },
  addressCard: { borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 10 },
  addressCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4, gap: 8 },
  primaryBadge: {
    backgroundColor: '#22C55E', color: '#fff', fontSize: 10, fontWeight: '700',
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, overflow: 'hidden',
  },
  addressText: { fontSize: 12, marginTop: 2 },
  editBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 10, alignSelf: 'flex-start' },
  editBtnText: { fontSize: 12, fontWeight: '600', color: '#27C34B' },
});
