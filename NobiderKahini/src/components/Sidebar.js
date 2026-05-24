import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Share,
  Linking,
  Animated,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../theme';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.75;

const APP_NAME = 'নবীদের কাহিনী';
const DEVELOPER = 'Sujon Ahmed';
const POLICY_URL = 'https://example.com/privacy-policy'; // পরে real URL দাও
const SHARE_MESSAGE = 'নবীদের কাহিনী অ্যাপটি ডাউনলোড করুন এবং ইসলামিক গল্প পড়ুন।\nhttps://play.google.com/store'; // পরে real link দাও

const menuItems = [
  { id: '1', icon: '📖', label: 'নবীদের তালিকা' },
  { id: '5', icon: '🔖', label: 'বুকমার্ক' },
  { id: '2', icon: '📤', label: 'অ্যাপ শেয়ার করুন' },
  { id: '3', icon: '🔒', label: 'প্রাইভেসি পলিসি' },
  { id: '4', icon: 'ℹ️', label: 'অ্যাপ সম্পর্কে' },
];

export default function Sidebar({ visible, onClose, navigation, onBookmarks }) {
  const handleItem = id => {
    onClose();
    if (id === '1') navigation.navigate('Home');
    if (id === '2') Share.share({ message: SHARE_MESSAGE });
    if (id === '3') Linking.openURL(POLICY_URL);
    if (id === '4') navigation.navigate('About');
    if (id === '5') onBookmarks && onBookmarks();
  };

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />

        <Animated.View style={styles.sidebar}>
          <LinearGradient colors={[Colors.primaryDark, Colors.primary]} style={styles.sidebarHeader}>
            <Text style={styles.appEmoji}>🕌</Text>
            <Text style={styles.appName}>{APP_NAME}</Text>
            <Text style={styles.bismillah}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</Text>
          </LinearGradient>

          <View style={styles.menu}>
            {menuItems.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => handleItem(item.id)}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Text style={styles.menuArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.footer}>
            <Text style={styles.devLabel}>ডেভেলপার</Text>
            <Text style={styles.devName}>{DEVELOPER}</Text>
            <Text style={styles.version}>Version 1.0.0</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, flexDirection: 'row-reverse' },
  backdrop: { flex: 1, backgroundColor: '#00000066' },
  sidebar: {
    width: SIDEBAR_WIDTH,
    backgroundColor: Colors.background,
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  sidebarHeader: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  appEmoji: { fontSize: 44, marginBottom: 8 },
  appName: { color: Colors.white, fontSize: 20, fontWeight: 'bold' },
  bismillah: { color: Colors.gold, fontSize: 13, marginTop: 6 },
  menu: { paddingTop: 10 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 14,
  },
  menuIcon: { fontSize: 20 },
  menuLabel: { flex: 1, fontSize: 15, color: Colors.text, fontWeight: '500' },
  menuArrow: { fontSize: 20, color: Colors.textMuted },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  devLabel: { fontSize: 11, color: Colors.textMuted },
  devName: { fontSize: 14, color: Colors.primary, fontWeight: '700', marginTop: 2 },
  version: { fontSize: 11, color: Colors.textMuted, marginTop: 4 },
});
