import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Switch, Linking, Modal,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';

const SettingItem = ({ icon, label, onPress, right, isDark }) => (
  <TouchableOpacity style={styles(isDark).item} onPress={onPress} activeOpacity={0.7}>
    <View style={styles(isDark).itemLeft}>
      <View style={styles(isDark).iconBox}>
        <MaterialIcons name={icon} size={20} color="#4F46E5" />
      </View>
      <Text style={styles(isDark).itemLabel}>{label}</Text>
    </View>
    {right || <MaterialIcons name="chevron-right" size={22} color="#ccc" />}
  </TouchableOpacity>
);

const SectionTitle = ({ title, isDark }) => (
  <Text style={styles(isDark).sectionTitle}>{title}</Text>
);

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [serverSettings, setServerSettings] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState(null);
  const { isDark, toggleTheme } = useTheme();

  const loadServerSettings = async () => {
    try {
      const data = await getAllAppSettings();
      console.log('Server Settings:', data);
      setServerSettings(data);
      setShowModal(true);
    } catch (e) {
      console.log('loadServerSettings error:', e.message);
    }
  };
 

 
  return (
    <ScrollView style={styles(isDark).container} contentContainerStyle={styles(isDark).content}>

      <SectionTitle title="সাধারণ" isDark={isDark} />
      <View style={styles(isDark).card}>
        <SettingItem
          icon="notifications"
          label="নোটিফিকেশন"
          isDark={isDark}
          right={
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#ddd', true: '#4F46E5' }}
              thumbColor="#fff"
            />
          }
        />
  
      </View>

      <SectionTitle title="অ্যাপ তথ্য" isDark={isDark} />
      <View style={styles(isDark).card}>
        <SettingItem icon="info" label="অ্যাপ ভার্সন" isDark={isDark} right={<Text style={styles(isDark).valueText}>1.0.0</Text>} />
        <View style={styles(isDark).divider} />
        <SettingItem
          icon="star-rate"
          label="অ্যাপ রেটিং দিন"
          isDark={isDark}
          onPress={() => Linking.openURL('market://details?id=com.prophet')}
        />
        <View style={styles(isDark).divider} />
        <SettingItem icon="share" label="বন্ধুদের সাথে শেয়ার করুন" isDark={isDark} onPress={() => {}} />
      </View>
 

      
       

      <SectionTitle title="সাপোর্ট" isDark={isDark} />
      <View style={styles(isDark).card}>
        <SettingItem
          icon="info"
          label="About"
          isDark={isDark}
          onPress={() => navigation.navigate('CmsPage', { link: 'about-us', title: 'About' })}
        />
        <View style={styles(isDark).divider} />
        <SettingItem
          icon="description"
          label="Terms & Conditions"
          isDark={isDark}
          onPress={() => navigation.navigate('CmsPage', { link: 'terms-and-conditions', title: 'Terms & Conditions' })}
        />
        <View style={styles(isDark).divider} />
        <SettingItem
          icon="credit-card"
          label="EMI Information"
          isDark={isDark}
          onPress={() => navigation.navigate('EmiInfo')}
        />
        <View style={styles(isDark).divider} />
        <SettingItem
          icon="assignment-return"
          label="Return Policy"
          isDark={isDark}
          onPress={() => navigation.navigate('CmsPage', { link: 'refund-and-returns-policy', title: 'Return Policy' })}
        />
        <View style={styles(isDark).divider} />
        <SettingItem
          icon="privacy-tip"
          label="Privacy Policy"
          isDark={isDark}
          onPress={() => navigation.navigate('CmsPage', { link: 'privacy-policy', title: 'Privacy Policy' })}
        />
        <View style={styles(isDark).divider} />
        <SettingItem
          icon="local-shipping"
          label="Delivery"
          isDark={isDark}
          onPress={() => navigation.navigate('CmsPage', { link: 'delivery', title: 'Delivery' })}
        />
        <View style={styles(isDark).divider} />
        <SettingItem
          icon="mail"
          label="Contact Us"
          isDark={isDark}
          onPress={() => Linking.openURL('mailto:jncomputerbd1@gmail.com')}
        />
      </View>

     

    </ScrollView>
  );
}

const styles = (isDark) => StyleSheet.create({
  container: { flex: 1, backgroundColor: isDark ? '#0f172a' : '#f5f5f5' },
  content: { padding: 16, paddingBottom: 40 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: isDark ? '#94a3b8' : '#888',
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: isDark ? '#1e293b' : '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 2,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBox: {
    width: 36, height: 36,
    borderRadius: 10,
    backgroundColor: isDark ? '#312e81' : '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLabel: { fontSize: 15, color: isDark ? '#f1f5f9' : '#1a1a1a' },
  valueText: { fontSize: 14, color: isDark ? '#94a3b8' : '#888' },
  divider: { height: 1, backgroundColor: isDark ? '#334155' : '#f5f5f5', marginLeft: 64 },
  footer: { textAlign: 'center', color: '#bbb', fontSize: 12, marginTop: 30 },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center', padding: 20,
  },
  modalContent: {
    backgroundColor: isDark ? '#1e293b' : '#fff',
    borderRadius: 16, padding: 20, maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18, fontWeight: '700',
    color: isDark ? '#f1f5f9' : '#1a1a1a',
    marginBottom: 16, textAlign: 'center',
  },
  modalRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 8, borderBottomWidth: 1,
    borderBottomColor: isDark ? '#334155' : '#eee',
  },
  modalKey: { fontSize: 14, color: isDark ? '#94a3b8' : '#666', flex: 1 },
  modalValue: { fontSize: 14, color: isDark ? '#f1f5f9' : '#1a1a1a', flex: 1, textAlign: 'right' },
  modalClose: {
    marginTop: 16, backgroundColor: '#4F46E5',
    padding: 12, borderRadius: 10, alignItems: 'center',
  },
  modalCloseText: { color: '#fff', fontWeight: '600', fontSize: 15 },
});
