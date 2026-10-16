import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Share, Linking, Alert, ToastAndroid, ActivityIndicator, StatusBar } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { useDrawerStatus } from '@react-navigation/drawer';
import { getHomeCategory } from '../api/homeApi';
import { useAuth } from '../context/AuthContext';
import { api_image } from '../config/url';

const toFullUrl = (path, subdir = '') => {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = api_image.endsWith('/') ? api_image.slice(0, -1) : api_image;
  const prefix = subdir ? (subdir.startsWith('/') ? subdir : '/' + subdir) + '/' : '/';
  return base + prefix + path;
};

const menu = [
  
  { title: 'About App', icon: 'info-outline', screen: 'CmsPage', tab: 'Home', params: { link: 'about-us', title: 'About' } },
  // { title: 'About Developer', icon: 'person-outline', screen: 'AboutDeveloper', tab: 'Home' },
  { title: 'Share App', icon: 'share', action: 'share' },
  // { title: 'Rate App', icon: 'star-border', action: 'rate' },
  // { title: 'Feedback', icon: 'feedback', screen: 'Feedback', tab: 'Home' },
  // { title: 'Privacy Policy', icon: 'lock-outline', screen: 'Privacy', tab: 'Home' },
  // { title: 'More Apps', icon: 'apps', action: 'moreApps' },
  { title: 'Settings', icon: 'settings', screen: 'SettingInfo', tab: 'Home' },
];

export default function DrawerMenuScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(true);
  const { colors } = useTheme();
  const s = styles(colors);
  const drawerStatus = useDrawerStatus();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await getHomeCategory();
      console.log('Drawer categories:', res.data);
      const list = Array.isArray(res) ? res : res?.data || res?.categories || [];
      setCategories(res);
    } catch (e) {
      console.log('Drawer categories load error:', e);
    } finally {
      setCatLoading(false);
    }
  };

  const handlePress = async (item) => {
    if (item.screen) {
      navigation.closeDrawer();
      const leaf = { screen: item.screen, params: item.params };
      const params = item.tab
        ? { screen: item.tab, params: leaf }
        : leaf;
      navigation.navigate('Home', params);
    } else if (item.action === 'share') {
      await Share.share({ message: 'Download the app: https://play.google.com/store/apps/details?id=com.prophet' });
    } else if (item.action === 'rate') {
      Linking.openURL('market://details?id=com.prophet');
    } else if (item.action === 'moreApps') {
      Linking.openURL('https://play.google.com/store/apps/developer?id=YourDeveloperName');
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', onPress: async () => { await logout(); ToastAndroid.show('Logged out successfully', ToastAndroid.SHORT); } },
    ]);
  };

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      {drawerStatus === 'open' && (
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      )}
      <View style={s.header}>
        <View style={s.headerCircleTop} />
        <View style={s.headerCircleBottom} />
        <View style={s.avatarBox}>
          {user ? <Text style={s.avatarText}>{user.name?.charAt(0).toUpperCase()}</Text>
            : <MaterialIcons name="person" size={26} color={colors.primary} />}
        </View>
        <Text style={s.userName}>{user ? user.name : 'Guest User'}</Text>
        <Text style={s.userEmail}>{user ? user.email : 'Login'}</Text>
      </View>

      <View style={s.menuContainer}>
        <Text style={s.sectionTitle}>Categories</Text>
        {catLoading ? (
          <ActivityIndicator size="small" color={colors.primary} style={{ marginVertical: 10 }} />
        ) : (
          categories.slice(0, 15).map((cat, i) => (
            <TouchableOpacity
              key={i}
              style={s.menuItem}
              onPress={() => {
                navigation.closeDrawer();
                navigation.navigate('Home', { screen: 'Home', params: { screen: 'CategoryPage', params: { category: cat } } });
              }}
            >
              {cat.banner ? (
                <Image
                  source={{ uri: toFullUrl(cat.banner, 'category') }}
                  style={s.catImage}
                  resizeMode="contain"
                />
              ) : (
                <View style={s.catImagePlaceholder}>
                  <MaterialIcons name="category" size={18} color={colors.primary} />
                </View>
              )}
              <Text style={s.menuText}>{cat.category_title}</Text>
            </TouchableOpacity>
          ))
        )}
        {/* <View style={s.divider} /> */}

        {menu.map((item, index) => (
          <TouchableOpacity key={index} style={s.menuItem} onPress={() => handlePress(item)}>
            <MaterialIcons name={item.icon} size={20} color={colors.text} />
            <Text style={s.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={s.menuItem} onPress={user ? handleLogout : () => navigation.navigate('Account', { screen: 'Login' })}>
          <MaterialIcons name={user ? 'logout' : 'login'} size={20} color={user ? colors.danger : colors.text} />
          <Text style={[s.menuText, { color: user ? colors.danger : colors.text }]}>
            {user ? 'Logout' : 'Login / Register'}
          </Text>
        </TouchableOpacity>
      </View>

     
    </ScrollView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingTop: 36, paddingBottom: 18, alignItems: 'center',
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
  headerCircleTop: {
    position: 'absolute', top: -40, right: -30,
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  headerCircleBottom: {
    position: 'absolute', bottom: -50, left: -40,
    width: 140, height: 140, borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  avatarBox: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center', marginBottom: 8,
    elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4,
  },
  avatarText: { fontSize: 18, fontWeight: 'bold', color: colors.primary },
  userName: { fontSize: 15, fontWeight: '700', color: '#fff' },
  userEmail: { fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  menuContainer: { paddingHorizontal: 20, paddingTop: 15 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5, borderBottomColor: colors.surface,
  },
  menuText: { marginLeft: 16, fontSize: 14, color: colors.text, fontWeight: '500' },
  catImage: { width: 26, height: 26 },
  catImagePlaceholder: {
    width: 26, height: 26, borderRadius: 13, backgroundColor: colors.surface,
    alignItems: 'center', justifyContent: 'center',
  },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: colors.primary, marginBottom: 6, marginTop: 4 },
  divider: { height: 1, backgroundColor: colors.surface, marginVertical: 10 },
  footer: { textAlign: 'center', color: colors.text, fontSize: 11, marginVertical: 20, opacity: 0.4 },
});
