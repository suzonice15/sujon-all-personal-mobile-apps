import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Switch, Linking, Modal, Share, ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';
import AdBanner from '../../components/ads/AdBanner';
import useAdInterstitial from '../../components/ads/AdInterstitial';
import useSyncWithCooldown from '../../hooks/useSyncWithCooldown';
import { published_app_slug, apps_title, email, ADMOB_ENABLED } from '../../config/url';
import AdNative from '../../components/ads/AdNative';

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
  const { isDark, toggleTheme } = useTheme();
  const { syncing, syncMsg, handleSync } = useSyncWithCooldown();
  const entryShown = useRef(false);
  const { showAd: showInterstitial, isLoaded } = useAdInterstitial();

  useEffect(() => {
    if (ADMOB_ENABLED && isLoaded && !entryShown.current) {
      entryShown.current = true;
      showInterstitial();
    }
  }, [isLoaded]);

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

  

  console.log('Server Settings:', serverSettings);

  return (
    <View style={styles(isDark).container}>
      <ScrollView contentContainerStyle={styles(isDark).content}>

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
          <View style={styles(isDark).divider} />
          <SettingItem
            icon="dark-mode"
            label="ডার্ক মোড"
            isDark={isDark}
            right={
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: '#ddd', true: '#4F46E5' }}
                thumbColor="#fff"
              />
            }
          />
          <View style={styles(isDark).divider} />
        </View>

        <SectionTitle title="অ্যাপ তথ্য" isDark={isDark} />
        <View style={styles(isDark).card}>
          <SettingItem icon="info" label="অ্যাপ ভার্সন" isDark={isDark} right={<Text style={styles(isDark).valueText}>1.0.0</Text>} />
          <View style={styles(isDark).divider} />
          <SettingItem
            icon="star-rate"
            label="অ্যাপ রেটিং দিন"
            isDark={isDark}
            onPress={() => Linking.openURL(`market://details?id=${published_app_slug}`)}
          />
          <View style={styles(isDark).divider} />
          <SettingItem icon="share" label="বন্ধুদের সাথে শেয়ার করুন" isDark={isDark} onPress={() => Share.share({
            message: `${apps_title}\n\nঅ্যাপটি ডাউনলোড করুন:\nhttps://play.google.com/store/apps/details?id=${published_app_slug}`,
          })} />
        </View>

        {/* <SectionTitle title="সার্ভার সেটিংস" isDark={isDark} />
        <View style={styles(isDark).card}>
          <SettingItem icon="cloud" label="সার্ভার থেকে সেটিংস দেখুন" isDark={isDark} onPress={loadServerSettings} />
        </View> */}

        {/* <Modal visible={showModal} transparent animationType="slide" onRequestClose={() => setShowModal(false)}>
          <View style={styles(isDark).modalOverlay}>
            <View style={styles(isDark).modalContent}>
              <Text style={styles(isDark).modalTitle}>সার্ভার সেটিংস</Text>
              <ScrollView style={{ maxHeight: 400 }}>
                {serverSettings && Object.entries(serverSettings).map(([key, value]) => (
                  <View key={key} style={styles(isDark).modalRow}>
                    <Text style={styles(isDark).modalKey}>{key}</Text>
                    <Text style={styles(isDark).modalValue}>{value}</Text>
                  </View>
                ))}
                {serverSettings && Object.keys(serverSettings).length === 0 && (
                  <Text style={{ color: '#888', textAlign: 'center', marginTop: 20 }}>কোনো সেটিংস নেই</Text>
                )}
              </ScrollView>
              <TouchableOpacity style={styles(isDark).modalClose} onPress={() => setShowModal(false)}>
                <Text style={styles(isDark).modalCloseText}>বন্ধ করুন</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal> */}

       <SectionTitle title="কয়েন সার্ভারে পাঠান" isDark={isDark} />
        <TouchableOpacity
          style={[styles(isDark).syncBtn, isDark && { borderColor: '#4F46E540', backgroundColor: '#4F46E515' }]}
          onPress={handleSync}
          activeOpacity={0.7}
        >
          <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#4F46E520', justifyContent: 'center', alignItems: 'center' }}>
            <MaterialIcons name="sync" size={20} color="#4F46E5" />
          </View>
          <Text style={styles(isDark).syncBtnText}>{syncing ? 'সিঙ্ক হচ্ছে...' : 'কয়েন সার্ভারে পাঠান'}</Text>
          {syncing ? (
            <ActivityIndicator size="small" color="#4F46E5" />
          ) : (
            <MaterialIcons name="chevron-right" size={18} color="#9CA3AF" />
          )}
        </TouchableOpacity>
        {syncMsg && (
          <View style={{ paddingLeft: 4, marginTop: 4 }}>
            <Text style={{ fontSize: 12, color: '#22C55E' }}>{syncMsg}</Text>
          </View>
        )}

        <SectionTitle title="সাপোর্ট" isDark={isDark} />
        <View style={styles(isDark).card}>
          <SettingItem
            icon="privacy-tip"
            label="প্রাইভেসি পলিসি"
            isDark={isDark}
            onPress={() => navigation.navigate('Privacy')}
          />
          
          <View style={styles(isDark).divider} />
          <SettingItem
            icon="mail"
            label="যোগাযোগ করুন"
            isDark={isDark}
            onPress={() => Linking.openURL(`mailto:${email}?subject=অ্যাপ%20সাপোর্ট`)}
          />
        </View>



      </ScrollView>
                                <AdNative style={{ marginBottom: 5, marginTop: 10 }} />
      
      <AdBanner />
    </View>
  );
}

const styles = (isDark) => StyleSheet.create({
  container: { flex: 1, backgroundColor: isDark ? '#0f172a' : '#f5f5f5' },
  content: { padding: 16, flexGrow: 1 },
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
    elevation: 0,
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
  syncBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderRadius: 12, padding: 14,
    backgroundColor: '#4F46E512',
    borderWidth: 1, borderColor: '#4F46E530',
  },
  syncBtnText: { flex: 1, fontSize: 14, fontWeight: '700', color: '#4F46E5' },
});
