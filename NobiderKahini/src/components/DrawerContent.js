import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Share,
  Linking,
  ScrollView,
} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../theme';

const APP_NAME = 'নবীদের কাহিনী';
const DEVELOPER = 'Sujon Ahmed';
const POLICY_URL = 'https://example.com/privacy-policy';
const SHARE_MESSAGE = 'নবীদের কাহিনী অ্যাপটি ডাউনলোড করুন এবং ইসলামিক গল্প পড়ুন।\nhttps://play.google.com/store';

export default function DrawerContent(props) {
  const handleShare = () => {
    Share.share({ message: SHARE_MESSAGE });
  };

  const handlePrivacy = () => {
    Linking.openURL(POLICY_URL);
  };

  return (
    <DrawerContentScrollView {...props} scrollEnabled={false}>
      <LinearGradient colors={[Colors.primaryDark, Colors.primary]} style={styles.header}>
        <Text style={styles.appEmoji}>🕌</Text>
        <Text style={styles.appName}>{APP_NAME}</Text>
        <Text style={styles.bismillah}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</Text>
      </LinearGradient>

      <DrawerItemList {...props} />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerBtn} onPress={handleShare}>
          <Text style={styles.footerIcon}>📤</Text>
          <Text style={styles.footerLabel}>অ্যাপ শেয়ার করুন</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerBtn} onPress={handlePrivacy}>
          <Text style={styles.footerIcon}>🔒</Text>
          <Text style={styles.footerLabel}>প্রাইভেসি পলিসি</Text>
        </TouchableOpacity>

        <View style={styles.devInfo}>
          <Text style={styles.devLabel}>ডেভেলপার</Text>
          <Text style={styles.devName}>{DEVELOPER}</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingBottom: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  appEmoji: { fontSize: 44, marginBottom: 8 },
  appName: { fontSize: 20, fontWeight: 'bold', color: Colors.white, marginBottom: 4 },
  bismillah: { fontSize: 12, color: Colors.white, fontStyle: 'italic' },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginTop: 'auto',
  },
  footerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  footerIcon: { fontSize: 20, marginRight: 12 },
  footerLabel: { fontSize: 14, color: Colors.text, fontWeight: '500' },
  devInfo: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
  },
  devLabel: { fontSize: 11, color: Colors.gray, fontWeight: '600', marginBottom: 4 },
  devName: { fontSize: 13, color: Colors.text, fontWeight: 'bold', marginBottom: 2 },
  version: { fontSize: 11, color: Colors.gray },
});
