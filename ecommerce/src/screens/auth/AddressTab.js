import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView,
  ActivityIndicator, Alert, Modal, FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import {
  getDivisions, getDistricts, getUpazilas, getAllAddress,
  editAddress, updateAddress, addNewAddress,
} from '../../api/addressApi';

const emptyForm = {
  address_id: null,
  address: '',
  division_id: '',
  district_id: '',
  upazila_id: '',
};

function SelectField({ label, value, options, valueKey, labelKey, onSelect, placeholder, colors }) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => String(o[valueKey]) === String(value));

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

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <TouchableOpacity style={s.modalOverlay} activeOpacity={1} onPress={() => setOpen(false)}>
          <View style={[s.modalSheet, { backgroundColor: colors.surface }]}>
            <Text style={[s.modalTitle, { color: colors.text }]}>{label}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => String(item[valueKey])}
              style={{ maxHeight: 360 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={s.modalItem}
                  onPress={() => { onSelect(item[valueKey]); setOpen(false); }}
                >
                  <Text style={{ color: colors.text, fontSize: 14 }}>{item[labelKey]}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={<Text style={{ color: colors.onSurface + '50', padding: 14 }}>No options</Text>}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

export default function AddressTab() {
  const { colors } = useTheme();
  const { user, token } = useAuth();
  const userId = user?.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

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
    getDivisions().then((res) => setDivisions(Array.isArray(res) ? res : [])).catch(() => {});
    fetchAddresses();
  }, [fetchAddresses]);

  const openAddForm = () => {
    setForm(emptyForm);
    setDistricts([]);
    setUpazilas([]);
    setFormOpen(true);
  };

  const openEditForm = async (addressId) => {
    if (!userId) return;
    setSaving(true);
    try {
      const res = await editAddress(userId, addressId, token);
      const a = res?.address || {};
      setForm({
        address_id: a.address_id,
        address: a.address || '',
        division_id: a.division_id || '',
        district_id: a.district_id || '',
        upazila_id: a.upazila_id || '',
      });
      setDistricts(Array.isArray(res?.districts) ? res.districts : []);
      setUpazilas(Array.isArray(res?.upazilas) ? res.upazilas : []);
      setFormOpen(true);
    } catch {
      Alert.alert('Error', 'Failed to load address');
    } finally {
      setSaving(false);
    }
  };

  const handleDivisionChange = async (divisionId) => {
    setForm((f) => ({ ...f, division_id: divisionId, district_id: '', upazila_id: '' }));
    setUpazilas([]);
    try {
      const res = await getDistricts(divisionId);
      setDistricts(Array.isArray(res) ? res : []);
    } catch {
      setDistricts([]);
    }
  };

  const handleDistrictChange = async (districtId) => {
    setForm((f) => ({ ...f, district_id: districtId, upazila_id: '' }));
    try {
      const res = await getUpazilas(districtId);
      setUpazilas(Array.isArray(res) ? res : []);
    } catch {
      setUpazilas([]);
    }
  };

  const validate = () => {
    if (!form.district_id) {
      Alert.alert('Validation Error', 'Please select your district');
      return false;
    }
    if (!form.upazila_id) {
      Alert.alert('Validation Error', 'Please select your thana');
      return false;
    }
    if (!form.address?.trim()) {
      Alert.alert('Validation Error', 'Please enter your address');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      if (form.address_id) {
        await updateAddress(form.address_id, {
          api_token: token,
          name: user?.name || '',
          phone: user?.phone || '',
          division_id: form.division_id,
          district_id: form.district_id,
          upazila_id: form.upazila_id,
          address: form.address,
        });
      } else {
        await addNewAddress({
          api_token: token,
          name: user?.name || '',
          phone: user?.phone || '',
          division_id: form.division_id,
          district_id: form.district_id,
          upazila_id: form.upazila_id,
          address: form.address,
          user_id: userId,
        });
      }
      setFormOpen(false);
      await fetchAddresses();
      Alert.alert('Success', form.address_id ? 'Updated successfully' : 'Address added successfully');
    } catch {
      Alert.alert('Error', 'Failed to save address');
    } finally {
      setSaving(false);
    }
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

      <Modal visible={formOpen} transparent animationType="slide" onRequestClose={() => setFormOpen(false)}>
        <View style={s.formOverlay}>
          <View style={[s.formSheet, { backgroundColor: colors.surface }]}>
            <View style={s.formHeader}>
              <Text style={[s.sectionTitle, { color: colors.text }]}>
                {form.address_id ? 'Edit Address' : 'Add New Address'}
              </Text>
              <TouchableOpacity onPress={() => setFormOpen(false)}>
                <MaterialIcons name="close" size={22} color={colors.onSurface + '70'} />
              </TouchableOpacity>
            </View>
            <ScrollView keyboardShouldPersistTaps="handled">
              <SelectField
                label="Division"
                value={form.division_id}
                options={divisions}
                valueKey="id"
                labelKey="division_name"
                placeholder="Select Division"
                onSelect={handleDivisionChange}
                colors={colors}
              />
              <SelectField
                label="District"
                value={form.district_id}
                options={districts}
                valueKey="id"
                labelKey="district_name"
                placeholder="Select District"
                onSelect={handleDistrictChange}
                colors={colors}
              />
              <SelectField
                label="Thana"
                value={form.upazila_id}
                options={upazilas}
                valueKey="id"
                labelKey="upazilas_name"
                placeholder="Select Thana"
                onSelect={(v) => setForm((f) => ({ ...f, upazila_id: v }))}
                colors={colors}
              />
              <View style={s.field}>
                <Text style={[s.label, { color: colors.onSurface + '70' }]}>Address</Text>
                <TextInput
                  style={[s.input, { color: colors.text, borderColor: colors.onSurface + '20', backgroundColor: colors.background, height: 70 }]}
                  value={form.address}
                  onChangeText={(t) => setForm((f) => ({ ...f, address: t }))}
                  multiline
                />
              </View>
            </ScrollView>
            <TouchableOpacity style={[s.saveBtn, { backgroundColor: colors.primary }]} onPress={handleSave} disabled={saving}>
              {saving ? <ActivityIndicator color="#fff" /> : <Text style={s.saveBtnText}>Save Address</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  field: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, height: 46, fontSize: 14 },
  selectBtn: {
    borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, height: 46,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 24 },
  modalSheet: { borderRadius: 14, padding: 14, maxHeight: '70%' },
  modalTitle: { fontSize: 15, fontWeight: '700', marginBottom: 8, paddingHorizontal: 6 },
  modalItem: { paddingVertical: 12, paddingHorizontal: 10 },
  formOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  formSheet: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '88%' },
  formHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  saveBtn: { height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  saveBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
