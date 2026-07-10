import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import AdBanner from '../../components/ads/AdBanner';

const statusConfig = {
  processing: { label: 'প্রক্রিয়াধীন', color: '#6366F1', bg: '#EEF2FF', icon: 'sync' },
  courier: { label: 'কুরিয়ারে', color: '#F59E0B', bg: '#FEF3C7', icon: 'local-shipping' },
  delivered: { label: 'ডেলিভারি সম্পন্ন', color: '#059669', bg: '#D1FAE5', icon: 'check-circle' },
  returned: { label: 'রিটার্ন', color: '#EF4444', bg: '#FEE2E2', icon: 'assignment-return' },
  cancelled: { label: 'বাতিল', color: '#6B7280', bg: '#F3F4F6', icon: 'cancel' },
};

const statusFlow = ['processing', 'courier', 'delivered'];

export default function OrderDetailScreen({ route }) {
  const { order } = route.params;
  const { colors } = useTheme();
  const s = styles(colors);
  const st = statusConfig[order.status] || statusConfig.processing;

  return (
    <SafeAreaView style={s.container}>
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, flexGrow: 1 }}>
          <View style={s.headerCard}>
          <View style={s.headerTop}>
            <Text style={s.orderId}>{order.id}</Text>
            <View style={[s.badge, { backgroundColor: st.bg }]}>
              <MaterialIcons name={st.icon} size={14} color={st.color} />
              <Text style={[s.badgeText, { color: st.color }]}>{st.label}</Text>
            </View>
          </View>
          <Text style={s.orderDate}>{order.date}</Text>
        </View>

        <View style={s.tracker}>
          <Text style={s.sectionTitle}>স্ট্যাটাস ট্র্যাকার</Text>
          <View style={s.trackerRow}>
            {statusFlow.map((key, i) => {
              const step = statusConfig[key];
              const done = statusFlow.indexOf(order.status) >= i;
              const isLast = i === statusFlow.length - 1;
              return (
                <View key={key} style={s.stepWrap}>
                  <View style={[s.stepDot, done ? { backgroundColor: step.color } : { backgroundColor: '#E5E7EB' }]}>
                    {done && <MaterialIcons name="check" size={10} color="#fff" />}
                  </View>
                  {!isLast && <View style={[s.stepLine, done ? { backgroundColor: step.color } : { backgroundColor: '#E5E7EB' }]} />}
                  <Text style={[s.stepLabel, done && { color: step.color }]}>{step.label}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={s.detailCard}>
          <Text style={s.sectionTitle}>গ্রাহকের তথ্য</Text>
          <View style={s.detailRow}>
            <MaterialIcons name="person" size={14} color="#6B7280" />
            <Text style={s.detailLabel}>নাম</Text>
            <Text style={s.detailValue}>{order.name}</Text>
          </View>
          <View style={s.detailDivider} />
          <View style={s.detailRow}>
            <MaterialIcons name="phone" size={14} color="#6B7280" />
            <Text style={s.detailLabel}>ফোন</Text>
            <Text style={s.detailValue}>{order.phone}</Text>
          </View>
          <View style={s.detailDivider} />
          <View style={s.detailRow}>
            <MaterialIcons name="location-on" size={14} color="#6B7280" />
            <Text style={s.detailLabel}>ঠিকানা</Text>
            <Text style={s.detailValue}>{order.address}</Text>
          </View>
        </View>

        <View style={s.detailCard}>
          <Text style={s.sectionTitle}>অর্ডার বিবরণ</Text>
          <View style={s.detailRow}>
            <MaterialIcons name="inventory-2" size={14} color="#6B7280" />
            <Text style={s.detailLabel}>প্রোডাক্ট</Text>
            <Text style={s.detailValue}>{order.items}</Text>
          </View>
          <View style={s.detailDivider} />
          <View style={s.detailRow}>
            <MaterialIcons name="payments" size={14} color="#6B7280" />
            <Text style={s.detailLabel}>মোট মূল্য</Text>
            <Text style={s.detailValueBold}>৳{order.total}</Text>
          </View>
          <View style={s.detailDivider} />
          <View style={s.detailRow}>
            <MaterialIcons name="info" size={14} color="#6B7280" />
            <Text style={s.detailLabel}>স্ট্যাটাস</Text>
            <View style={[s.badge, { backgroundColor: st.bg }]}>
              <Text style={[s.badgeText, { color: st.color }]}>{st.label}</Text>
            </View>
          </View>
        </View>
        </ScrollView>
        <AdBanner />
      </View>
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  headerCard: {
    backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 12,
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  orderId: { fontSize: 16, fontWeight: '700', color: '#1F2937' },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  badgeText: { fontSize: 11, fontWeight: '600' },
  orderDate: { fontSize: 12, color: '#9CA3AF' },
  tracker: {
    backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 12,
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3,
  },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#1F2937', marginBottom: 14 },
  trackerRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  stepWrap: { alignItems: 'center', flex: 1, position: 'relative' },
  stepDot: {
    width: 20, height: 20, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center', marginBottom: 6,
  },
  stepLine: { position: 'absolute', top: 10, left: '60%', right: '-40%', height: 2 },
  stepLabel: { fontSize: 9, color: '#9CA3AF', textAlign: 'center', fontWeight: '500' },
  detailCard: {
    backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 12,
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3,
  },
  detailRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, gap: 6 },
  detailLabel: { fontSize: 12, color: '#6B7280', width: 50 },
  detailValue: { fontSize: 12, color: '#1F2937', fontWeight: '500', flex: 1, textAlign: 'right' },
  detailValueBold: { fontSize: 14, fontWeight: 'bold', color: colors.primary },
  detailDivider: { height: 0.5, backgroundColor: '#F0F0F0' },
});
