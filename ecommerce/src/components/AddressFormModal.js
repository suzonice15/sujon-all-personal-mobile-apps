import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  ActivityIndicator, Alert, Modal, StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../context/AuthContext';
import {
  getDivisions, getDistricts, getUpazilas,
  editAddress, updateAddress, addNewAddress,
} from '../api/addressApi';
import SelectField from './SelectField';

const emptyForm = {
  address_id: null,
  address: '',
  division_id: '',
  district_id: '',
  upazila_id: '',
};

export default function AddressFormModal({ visible, onClose, addressId, colors, onSaved }) {
  const { user, token } = useAuth();
  const userId = user?.id;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!visible) return;
    getDivisions().then((res) => setDivisions(Array.isArray(res) ? res : [])).catch(() => {});
    if (addressId) {
      loadForEdit(addressId);
    } else {
      setForm(emptyForm);
      setDistricts([]);
      setUpazilas([]);
    }
  }, [visible, addressId]);

  const loadForEdit = async (id) => {
    setLoading(true);
    try {
      const res = await editAddress(userId, id, token);
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
    } catch {
      Alert.alert('Error', 'Failed to load address');
    } finally {
      setLoading(false);
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
      Alert.alert('Success', form.address_id ? 'Updated successfully' : 'Address added successfully');
      onSaved?.();
      onClose();
    } catch {
      Alert.alert('Error', 'Failed to save address');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={s.overlay}>
        <View style={[s.sheet, { backgroundColor: colors.surface }]}>
          <View style={s.header}>
            <Text style={[s.title, { color: colors.text }]}>
              {form.address_id ? 'Edit Address' : 'Add New Address'}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={22} color={colors.onSurface + '70'} />
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator color={colors.primary} style={{ marginVertical: 30 }} />
          ) : (
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
          )}
          <TouchableOpacity style={[s.saveBtn, { backgroundColor: colors.primary }]} onPress={handleSave} disabled={saving}>
            {saving ? <ActivityIndicator color="#fff" /> : <Text style={s.saveBtnText}>Save Address</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '88%' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  title: { fontSize: 18, fontWeight: '700' },
  field: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, height: 46, fontSize: 14 },
  saveBtn: { height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  saveBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
