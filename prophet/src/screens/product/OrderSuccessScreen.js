import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AdBanner from '../../components/ads/AdBanner';

export default function OrderSuccessScreen({ route, navigation }) {
  const { total, count, payment, address } = route.params || {};

  return (
    <SafeAreaView style={s.container}>
      <View style={s.content}>
        <View style={s.iconCircle}>
          <MaterialIcons name="check" size={48} color="#fff" />
        </View>
        <Text style={s.title}>অর্ডার সফল!</Text>
        <Text style={s.subtitle}>আপনার অর্ডার গৃহীত হয়েছে</Text>

        <View style={s.card}>
          <View style={s.row}>
            <Text style={s.label}>প্রোডাক্ট</Text>
            <Text style={s.value}>{count}টি</Text>
          </View>
          <View style={s.divider} />
          <View style={s.row}>
            <Text style={s.label}>মোট</Text>
            <Text style={s.value}>৳{total}</Text>
          </View>
          <View style={s.divider} />
          <View style={s.row}>
            <Text style={s.label}>পেমেন্ট</Text>
            <Text style={s.value}>{payment}</Text>
          </View>
          <View style={s.divider} />
          <View style={s.row}>
            <Text style={s.label}>ঠিকানা</Text>
            <Text style={s.value} numberOfLines={2}>{address}</Text>
          </View>
        </View>

        <Text style={s.note}>আমরা খুব শীঘ্রই আপনার ঠিকানায় প্রোডাক্ট পাঠাবো</Text>

        <TouchableOpacity style={s.btn} onPress={() => navigation.popToTop()} activeOpacity={0.8}>
          <MaterialIcons name="home" size={20} color="#fff" />
          <Text style={s.btnText}>হোম এ ফিরুন</Text>
        </TouchableOpacity>
      </View>
      <AdBanner />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  iconCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#22C55E', justifyContent: 'center', alignItems: 'center',
    marginBottom: 16,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1F2937', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#6B7280', marginBottom: 28 },
  card: {
    backgroundColor: '#fff', borderRadius: 16, padding: 18,
    width: '100%', marginBottom: 16,
    elevation: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08, shadowRadius: 8,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 },
  label: { fontSize: 14, color: '#6B7280' },
  value: { fontSize: 14, fontWeight: '700', color: '#1F2937', maxWidth: '60%', textAlign: 'right' },
  divider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 8 },
  note: { fontSize: 13, color: '#9CA3AF', textAlign: 'center', marginBottom: 24, lineHeight: 20 },
  btn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: '#4F46E5', borderRadius: 14, paddingVertical: 15, paddingHorizontal: 40, width: '100%',
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
