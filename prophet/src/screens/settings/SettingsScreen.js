import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Switch, Linking,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SettingItem = ({ icon, label, value, onPress, right }) => (
  <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.itemLeft}>
      <View style={styles.iconBox}>
        <MaterialIcons name={icon} size={20} color="#4F46E5" />
      </View>
      <Text style={styles.itemLabel}>{label}</Text>
    </View>
    {right || <MaterialIcons name="chevron-right" size={22} color="#ccc" />}
  </TouchableOpacity>
);

const SectionTitle = ({ title }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <SectionTitle title="সাধারণ" />
      <View style={styles.card}>
        <SettingItem
          icon="notifications"
          label="নোটিফিকেশন"
          right={
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#ddd', true: '#4F46E5' }}
              thumbColor="#fff"
            />
          }
        />
        <View style={styles.divider} />
        <SettingItem
          icon="dark-mode"
          label="ডার্ক মোড"
          right={
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#ddd', true: '#4F46E5' }}
              thumbColor="#fff"
            />
          }
        />
        <View style={styles.divider} />
        <SettingItem icon="language" label="ভাষা" value="বাংলা" />
      </View>

      <SectionTitle title="অ্যাপ তথ্য" />
      <View style={styles.card}>
        <SettingItem icon="info" label="অ্যাপ ভার্সন" right={<Text style={styles.valueText}>1.0.0</Text>} />
        <View style={styles.divider} />
        <SettingItem
          icon="star-rate"
          label="অ্যাপ রেটিং দিন"
          onPress={() => Linking.openURL('market://details?id=com.prophet')}
        />
        <View style={styles.divider} />
        <SettingItem
          icon="share"
          label="বন্ধুদের সাথে শেয়ার করুন"
          onPress={() => {}}
        />
      </View>

      <SectionTitle title="সাপোর্ট" />
      <View style={styles.card}>
        <SettingItem
          icon="privacy-tip"
          label="প্রাইভেসি পলিসি"
          onPress={() => navigation.navigate('Privacy')}
        />
        <View style={styles.divider} />
        <SettingItem
          icon="description"
          label="ব্যবহারের শর্তাবলী"
          onPress={() => navigation.navigate('Terms')}
        />
        <View style={styles.divider} />
        <SettingItem
          icon="mail"
          label="যোগাযোগ করুন"
          onPress={() => Linking.openURL('mailto:support@example.com')}
        />
      </View>

      <Text style={styles.footer}>নবীদের গল্প © ২০২৪</Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 16, paddingBottom: 40 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#888',
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#fff',
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
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLabel: { fontSize: 15, color: '#1a1a1a' },
  valueText: { fontSize: 14, color: '#888' },
  divider: { height: 1, backgroundColor: '#f5f5f5', marginLeft: 64 },
  footer: { textAlign: 'center', color: '#bbb', fontSize: 12, marginTop: 30 },
});
