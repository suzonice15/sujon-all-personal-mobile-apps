import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Share, Linking, Alert, ToastAndroid, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { getHomeCategory } from '../api/homeApi';
import { useAuth } from '../context/AuthContext';
 
const menu = [
  
  { title: 'About App', icon: 'info-outline', screen: 'AboutApps', tab: 'Home' },
  { title: 'About Developer', icon: 'person-outline', screen: 'AboutDeveloper', tab: 'Home' },
  { title: 'Share App', icon: 'share', action: 'share' },
  { title: 'Rate App', icon: 'star-border', action: 'rate' },
  { title: 'Feedback', icon: 'feedback', screen: 'Feedback', tab: 'Home' },
  { title: 'Privacy Policy', icon: 'lock-outline', screen: 'Privacy', tab: 'Home' },
  { title: 'More Apps', icon: 'apps', action: 'moreApps' },
  { title: 'Settings', icon: 'settings', screen: 'SettingInfo', tab: 'Home' },
];

export default function DrawerMenuScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(true);
  const { colors } = useTheme();
  const s = styles(colors);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await getHomeCategory();
      const list = Array.isArray(res) ? res : res?.data || res?.categories || [];
      setCategories(list);
    } catch (e) {
      console.log('Drawer categories load error:', e);
    } finally {
      setCatLoading(false);
    }
  };

  const handlePress = async (item) => {
    if (item.screen) {
      navigation.closeDrawer();
      const params = item.tab
        ? { screen: item.tab, params: { screen: item.screen } }
        : { screen: item.screen };
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
      <View style={s.header}>
        <View style={s.avatarBox}>
          {user ? <Text style={s.avatarText}>{user.name?.charAt(0).toUpperCase()}</Text>
            : <MaterialIcons name="person" size={28} color={colors.primary} />}
        </View>
        <Text style={s.userName}>{user ? user.name : 'Guest User'}</Text>
        <Text style={s.userEmail}>{user ? user.email : 'Login'}</Text>
      </View>

      <View style={s.menuContainer}>
        <Text style={s.sectionTitle}>Categories</Text>
        {catLoading ? (
          <ActivityIndicator size="small" color={colors.primary} style={{ marginVertical: 10 }} />
        ) : (
          categories.slice(0, 6).map((cat, i) => (
            <TouchableOpacity
              key={i}
              style={s.menuItem}
              onPress={() => {
                navigation.closeDrawer();
                navigation.navigate('Home', { screen: 'CategoryPage', params: { category: cat } });
              }}
            >
              <MaterialIcons name="category" size={18} color={colors.primary} />
              <Text style={s.menuText}>{cat.category_title}</Text>
            </TouchableOpacity>
          ))
        )}
        <View style={s.divider} />

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
    paddingTop: 60, paddingBottom: 30, alignItems: 'center',
    backgroundColor: colors.headerBackground,
    borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
  },
  avatarBox: {
    width: 60, height: 60, borderRadius: 30, backgroundColor: colors.background,
    justifyContent: 'center', alignItems: 'center', marginBottom: 12,
  },
  avatarText: { fontSize: 24, fontWeight: 'bold', color: colors.headerColor },
  userName: { fontSize: 17, fontWeight: '700', color: colors.headerColor },
  userEmail: { fontSize: 12, color: colors.headerColor, marginTop: 2 },
  menuContainer: { paddingHorizontal: 20, paddingTop: 15 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5, borderBottomColor: colors.surface,
  },
  menuText: { marginLeft: 16, fontSize: 14, color: colors.text, fontWeight: '500' },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: colors.primary, marginBottom: 6, marginTop: 4 },
  divider: { height: 1, backgroundColor: colors.surface, marginVertical: 10 },
  footer: { textAlign: 'center', color: colors.text, fontSize: 11, marginVertical: 20, opacity: 0.4 },
});
