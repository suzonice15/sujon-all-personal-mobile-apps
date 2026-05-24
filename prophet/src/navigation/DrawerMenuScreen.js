import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Share, Linking, Alert, ToastAndroid } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { getLoggedInUser, logoutUser } from '../db/auth';

const menu = [
  { title: 'অ্যাপ সম্পর্কে', icon: 'info', screen: 'AboutApps' },
  { title: 'আয় করুন', icon: 'monetization-on', screen: 'AdEarn' },
  { title: 'ডেভেলপার সম্পর্কে', icon: 'person', screen: 'AboutDeveloper' },
  { title: 'অ্যাপ শেয়ার করুন', icon: 'share', action: 'share' },
  { title: 'অ্যাপ রেটিং দিন', icon: 'star', action: 'rate' },
  { title: 'মতামত দিন', icon: 'feedback', screen: 'Feedback' },
  { title: 'প্রাইভেসি পলিসি', icon: 'privacy-tip', screen: 'Privacy' },
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
    console.log(item)
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
      {
        text: 'হ্যাঁ', onPress: async () => {
          await logoutUser();
          setUser(null);
          ToastAndroid.show('লগআউট সফল হয়েছে', ToastAndroid.SHORT);
        },
      },
    ]);
  };

  const goToProfile = () => {
    navigation.closeDrawer();
    nav.navigate('Profile');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Header — user info or guest */}
      <TouchableOpacity style={styles.header} onPress={goToProfile} activeOpacity={0.85}>
        <View style={styles.avatarBox}>
          {user
            ? <Text style={styles.avatarText}>{user.name?.charAt(0).toUpperCase()}</Text>
            : <MaterialIcons name="account-circle" size={48} color="rgba(255,255,255,0.7)" />}
        </View>
        {user ? (
          <>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </>
        ) : (
          <>
            <Text style={styles.appName}>নবীদের গল্প</Text>
            <Text style={styles.appTag}>জানুন • অন্বেষণ করুন • অনুপ্রাণিত হন</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Menu */}
      <View style={styles.menuContainer}>
        {menu.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            style={styles.menuItem}
            onPress={() => handlePress(item)}>
            <View style={styles.leftSide}>
              <View style={styles.iconBox}>
                <MaterialIcons name={item.icon} size={25} color="#4F46E5" />
              </View>
              <Text style={styles.menuText}>{item.title}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#94A3B8" />
          </TouchableOpacity>
        ))}

        {/* Login / Logout button */}
        {user ? (
          <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={handleLogout}>
            <View style={styles.leftSide}>
              <View style={[styles.iconBox, styles.logoutIcon]}>
                <MaterialIcons name="logout" size={20} color="#e53e3e" />
              </View>
              <Text style={styles.logoutText}>লগআউট</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.menuItem, styles.loginItem]} onPress={goToProfile}>
            <View style={styles.leftSide}>
              <View style={[styles.iconBox, styles.loginIcon]}>
                <MaterialIcons name="login" size={20} color="#4F46E5" />
              </View>
              <Text style={styles.menuText}>লগইন / নিবন্ধন</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#94A3B8" />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.footer}>ভার্সন 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    paddingTop: 60, paddingBottom: 30,
    alignItems: 'center', backgroundColor: '#4F46E5',
    borderBottomLeftRadius: 35, borderBottomRightRadius: 35,
  },
  avatarBox: {
    width: 80, height: 80, borderRadius: 40,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: 12,
  },
  avatarText: { fontSize: 36, fontWeight: 'bold', color: '#fff' },
  userName: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  userEmail: { fontSize: 12, color: '#C7D2FE' },
  appName: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  appTag: { marginTop: 5, fontSize: 13, color: '#E0E7FF' },
  menuContainer: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 10 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingVertical: 10,
    paddingHorizontal: 14, borderRadius: 14,
    marginBottom: 10, backgroundColor: '#fff', elevation: 2,
  },
  leftSide: { flexDirection: 'row', alignItems: 'center' },
  iconBox: {
    width: 30, height: 30, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#EEF2FF',
  },
  menuText: { marginLeft: 14, fontSize: 15, fontWeight: '600', color: '#111827' },
  logoutItem: { borderWidth: 1, borderColor: '#fee2e2', backgroundColor: '#fff5f5', elevation: 0 },
  logoutIcon: { backgroundColor: '#fee2e2' },
  logoutText: { marginLeft: 14, fontSize: 15, fontWeight: '600', color: '#e53e3e' },
  loginItem: {},
  loginIcon: { backgroundColor: '#EEF2FF' },
  footer: { textAlign: 'center', color: '#bbb', fontSize: 12, paddingVertical: 20 },
});
