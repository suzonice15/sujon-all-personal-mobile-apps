import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Share, Linking, Alert, ToastAndroid } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getLoggedInUser, logoutUser } from '../db/auth';

const menu = [
  { title: 'অ্যাপ সম্পর্কে', icon: 'info-outline', screen: 'AboutApps' },
  { title: 'আয় করুন', icon: 'monetization-on', screen: 'AdEarn' },
  { title: 'ডেভেলপার সম্পর্কে', icon: 'person-outline', screen: 'AboutDeveloper' },
  { title: 'অ্যাপ শেয়ার করুন', icon: 'share', action: 'share' },
  { title: 'অ্যাপ রেটিং দিন', icon: 'star-border', action: 'rate' },
  { title: 'মতামত দিন', icon: 'feedback', screen: 'Feedback' },
  { title: 'প্রাইভেসি পলিসি', icon: 'lock-outline', screen: 'Privacy' },
  { title: 'আরো অ্যাপ', icon: 'apps', action: 'moreApps' },
  { title: 'সেটিংস', icon: 'settings', screen: 'SettingInfo' },
];

export default function DrawerMenuScreen({ navigation }) {
  const nav = useNavigation();
  const [user, setUser] = useState(null);

  useFocusEffect(useCallback(() => {
    getLoggedInUser().then(setUser);
  }, []));

  const handlePress = async (item) => {
    if (item.screen) {
      navigation.closeDrawer();
      nav.navigate('Home', { screen: item.screen });
    } else if (item.action === 'share') {
      await Share.share({ message: 'নবীদের গল্প অ্যাপটি ডাউনলোড করুন: https://play.google.com/store/apps/details?id=com.prophet' });
    } else if (item.action === 'rate') {
      Linking.openURL('market://details?id=com.prophet');
    } else if (item.action === 'moreApps') {
      Linking.openURL('https://play.google.com/store/apps/developer?id=YourDeveloperName');
    }
  };

  const handleLogout = () => {
    Alert.alert('লগআউট', 'আপনি কি লগআউট করতে চান?', [
      { text: 'না', style: 'cancel' },
      { text: 'হ্যাঁ', onPress: async () => { await logoutUser(); setUser(null); ToastAndroid.show('লগআউট সফল হয়েছে', ToastAndroid.SHORT); } },
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Solid Color */}
      <View style={styles.header}>
        <View style={styles.avatarBox}>
          {user ? <Text style={styles.avatarText}>{user.name?.charAt(0).toUpperCase()}</Text>
            : <MaterialIcons name="person" size={28} color="#4F46E5" />}
        </View>
        <Text style={styles.userName}>{user ? user.name : 'অতিথি ব্যবহারকারী'}</Text>
        <Text style={styles.userEmail}>{user ? user.email : 'লগইন করুন'}</Text>
      </View>

      {/* Menu Container */}
      <View style={styles.menuContainer}>
        {menu.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={() => handlePress(item)}>
            <MaterialIcons name={item.icon} size={20} color="#64748B" />
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.menuItem} onPress={user ? handleLogout : () => nav.navigate('Profile')}>
          <MaterialIcons name={user ? "logout" : "login"} size={20} color={user ? "#E11D48" : "#4F46E5"} />
          <Text style={[styles.menuText, { color: user ? "#E11D48" : "#4F46E5" }]}>
            {user ? 'লগআউট' : 'লগইন / নিবন্ধন'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>v 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: { 
    paddingTop: 60, paddingBottom: 30, alignItems: 'center', 
    backgroundColor: '#4F46E5', // সলিড ইনডিগো কালার
    borderBottomLeftRadius: 24, borderBottomRightRadius: 24 
  },
  avatarBox: { 
    width: 60, height: 60, borderRadius: 30, backgroundColor: '#ffffff', 
    justifyContent: 'center', alignItems: 'center', marginBottom: 12 
  },
  avatarText: { fontSize: 24, fontWeight: 'bold', color: '#4F46E5' },
  userName: { fontSize: 17, fontWeight: '700', color: '#ffffff' },
  userEmail: { fontSize: 12, color: '#E0E7FF', marginTop: 2 },
  
  menuContainer: { paddingHorizontal: 20, paddingTop: 15 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 0.5, borderBottomColor: '#F1F5F9' },
  menuText: { marginLeft: 16, fontSize: 14, color: '#334155', fontWeight: '500' },
  footer: { textAlign: 'center', color: '#CBD5E1', fontSize: 11, marginVertical: 20 }
});