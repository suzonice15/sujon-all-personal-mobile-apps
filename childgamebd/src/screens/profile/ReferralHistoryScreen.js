import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme as usePaperTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NotificationBell from '../../components/NotificationBell';
import { useTheme } from '../../context/ThemeContext';
import { getReferralCache } from '../../db/referral';
import { toBn } from '../../utils/helper';
import AdBanner from '../../components/ads/AdBanner';
import AdNative from '../../components/ads/AdNative';

export default function ReferralHistoryScreen({ navigation }) {
  const { colors } = usePaperTheme();
  const { isDark, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const s = styles(colors);
  const [activeList, setActiveList] = useState([]);
  const [inactiveList, setInactiveList] = useState([]);
  const [tab, setTab] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const cached = await getReferralCache('referral_history');
      if (cached) {
        setActiveList(cached.active_users_list || []);
        setInactiveList(cached.inactive_users_list || []);
      }
    } catch (e) {}
    setLoading(false);
  };

  const allList = [...activeList, ...inactiveList];
  const list = tab === 'all' ? allList : tab === 'active' ? activeList : inactiveList;

  return (
    <SafeAreaView style={s.container}>
      <View style={[s.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
          <MaterialIcons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={s.headerTitle}>রেফারেল ইতিহাস</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <NotificationBell color="#fff" />
          <TouchableOpacity onPress={() => toggleTheme(!isDark)} style={{ marginLeft: 4 }}>
            <MaterialIcons name={isDark ? 'light-mode' : 'dark-mode'} size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
          <View style={s.tabRow}>
            <TouchableOpacity
              style={[s.tabBtn, tab === 'all' && { backgroundColor: '#4F46E5' }]}
              onPress={() => setTab('all')}
              activeOpacity={0.7}
            >
              <MaterialIcons name="list" size={15} color={tab === 'all' ? '#fff' : colors.text} />
              <Text style={[s.tabBtnText, tab === 'all' && { color: '#fff' }]}>সব রেফারেল ({toBn(activeList.length + inactiveList.length)})</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[s.tabBtn, tab === 'active' && { backgroundColor: '#16A34A' }]}
              onPress={() => setTab('active')}
              activeOpacity={0.7}
            >
              <MaterialIcons name="check-circle" size={15} color={tab === 'active' ? '#fff' : '#16A34A'} />
              <Text style={[s.tabBtnText, tab === 'active' && { color: '#fff' }]}>সক্রিয় রেফারেল ({toBn(activeList.length)})</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[s.tabBtn, tab === 'inactive' && { backgroundColor: '#6B7280' }]}
              onPress={() => setTab('inactive')}
              activeOpacity={0.7}
            >
              <MaterialIcons name="remove-circle" size={15} color={tab === 'inactive' ? '#fff' : '#6B7280'} />
              <Text style={[s.tabBtnText, tab === 'inactive' && { color: '#fff' }]}>নিষ্ক্রিয় রেফারেল ({toBn(inactiveList.length)})</Text>
            </TouchableOpacity>
          </View>

          <View style={s.list}>
            {loading ? (
              <Text style={s.empty}>লোড হচ্ছে...</Text>
            ) : list.length === 0 ? (
              <Text style={s.empty}>কোনো তথ্য নেই</Text>
            ) : (
              list.map((item, i) => (
                <View key={item.id || i} style={s.userCard}>
                  <View style={s.avatar}>
                    <Text style={s.avatarText}>{(item.name || '?').charAt(0)}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.userName}>{item.name || 'অজানা'}</Text>
                    {item.phone ? <Text style={s.userPhone}>{item.phone}</Text> : null}
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 }}>
                      <MaterialIcons name="calendar-today" size={10} color="#9CA3AF" />
                      <Text style={s.userJoined}>{item.joined || '-'}</Text>
                    </View>
                  </View>
                  <View style={s.coinBox}>
                    <MaterialIcons name="monetization-on" size={14} color="#F59E0B" />
                    <Text style={s.coinText}>{toBn(item.total_coin)}</Text>
                  </View>
                  {item.phone ? (
                    <View style={{ gap: 4 }}>
                      <TouchableOpacity style={s.actionBtn} onPress={() => Linking.openURL(`tel:${item.phone}`)}>
                        <MaterialIcons name="phone" size={16} color="#4F46E5" />
                      </TouchableOpacity>
                      <TouchableOpacity style={s.actionBtn} onPress={() => {
                        const d = item.phone.replace(/[^0-9]/g, '');
                        Linking.openURL(`https://wa.me/${d.startsWith('0') ? '880' + d.slice(1) : d}`);
                      }}>
                        <MaterialIcons name="chat" size={16} color="#22C55E" />
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
              ))
            )}
          </View>
        </ScrollView>
                  <AdNative style={{ marginBottom: 5, marginTop: 10 }} />
        
        <AdBanner />
      </View>
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.headerBackground || colors.primary, paddingHorizontal: 12, paddingVertical: 12 },
  backBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: 'bold', color: colors.headerColor || '#fff' },
  tabRow: { flexDirection: 'row', gap: 8, marginHorizontal: 10, marginTop: 12, marginBottom: 8 },
  tabBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, backgroundColor: colors.surface, borderRadius: 10, paddingVertical: 9 },
  tabBtnText: { fontSize: 12, fontWeight: '600', color: colors.text },
  list: { paddingHorizontal: 10, gap: 8 },
  userCard: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.surface, borderRadius: 14, padding: 12, elevation: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
  avatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#EEF2FF', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 15, fontWeight: 'bold', color: '#4F46E5' },
  userName: { fontSize: 15, fontWeight: '700', color: colors.text },
  userPhone: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  userJoined: { fontSize: 10, color: '#9CA3AF' },
  coinBox: { flexDirection: 'row', alignItems: 'center', gap: 2, backgroundColor: '#FEF3C7', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  coinText: { fontSize: 12, fontWeight: 'bold', color: '#F59E0B' },
  actionBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center', elevation: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 2 },
  empty: { textAlign: 'center', color: colors.muted || '#9CA3AF', fontSize: 13, marginTop: 20 },
});
