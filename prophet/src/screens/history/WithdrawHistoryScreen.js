import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const placeholderData = [
  { id: '1', method: 'বিকাশ', amount: '৫০৳', date: '২০২৪-০১-১০', status: 'completed' },
  { id: '2', method: 'নগদ', amount: '১০০৳', date: '২০২৪-০১-০৫', status: 'pending' },
  { id: '3', method: 'রকেট', amount: '৩০৳', date: '২০২৩-১২-২৮', status: 'completed' },
];

const statusConfig = {
  completed: { label: 'সফল', color: '#22C55E', icon: 'check-circle' },
  pending: { label: 'প্রক্রিয়াধীন', color: '#F59E0B', icon: 'hourglass-empty' },
  failed: { label: 'ব্যর্থ', color: '#EF4444', icon: 'cancel' },
};

export default function WithdrawHistoryScreen({ navigation }) {
  const { colors } = useTheme();
  const s = styles(colors);

  const renderItem = ({ item }) => {
    const status = statusConfig[item.status] || statusConfig.pending;
    return (
      <View style={s.card}>
        <View style={s.cardHeader}>
          <View style={[s.statusBadge, { backgroundColor: status.color + '20' }]}>
            <MaterialIcons name={status.icon} size={16} color={status.color} />
            <Text style={[s.statusText, { color: status.color }]}>{status.label}</Text>
          </View>
          <Text style={s.amount}>{item.amount}</Text>
        </View>
        <View style={s.cardBody}>
          <View style={s.detailRow}>
            <MaterialIcons name="account-balance-wallet" size={16} color={colors.muted} />
            <Text style={s.detailText}>{item.method}</Text>
          </View>
          <View style={s.detailRow}>
            <MaterialIcons name="calendar-today" size={16} color={colors.muted} />
            <Text style={s.detailText}>{item.date}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={s.container}>
      <View style={s.totalBox}>
        <MaterialIcons name="account-balance-wallet" size={28} color="#4F46E5" />
        <Text style={s.totalLabel}>মোট উত্তোলন</Text>
        <Text style={s.totalValue}>৳ ০</Text>
      </View>

      <TouchableOpacity style={s.withdrawBtn} onPress={() => navigation.navigate('WithdrawRequest')} activeOpacity={0.8}>
        <MaterialIcons name="add-circle-outline" size={20} color="#fff" />
        <Text style={s.withdrawBtnText}>উইথড্র করুন</Text>
      </TouchableOpacity>

      {placeholderData.length === 0 ? (
        <View style={s.empty}>
          <MaterialIcons name="receipt-long" size={48} color={colors.muted} />
          <Text style={s.emptyText}>কোনো উইথড্র হিস্টোরি নেই</Text>
        </View>
      ) : (
        <FlatList
          data={placeholderData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 8 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  totalBox: {
    alignItems: 'center', backgroundColor: colors.surface,
    margin: 16, borderRadius: 16, padding: 20,
    borderLeftWidth: 3, borderLeftColor: '#4F46E5',
  },
  totalLabel: { fontSize: 13, color: colors.muted, marginTop: 4 },
  totalValue: { fontSize: 34, fontWeight: 'bold', color: '#4F46E5', marginTop: 2 },
  withdrawBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#4F46E5', marginHorizontal: 16, marginBottom: 12,
    borderRadius: 12, paddingVertical: 12,
  },
  withdrawBtnText: { color: '#fff', fontSize: 15, fontWeight: '700', marginLeft: 6 },
  card: {
    backgroundColor: colors.surface, marginHorizontal: 16, marginBottom: 10,
    borderRadius: 12, padding: 14,
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 10,
  },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8,
    paddingVertical: 4, borderRadius: 6,
  },
  statusText: { fontSize: 12, fontWeight: '600', marginLeft: 4 },
  amount: { fontSize: 18, fontWeight: 'bold', color: colors.text },
  cardBody: {},
  detailRow: {
    flexDirection: 'row', alignItems: 'center', marginTop: 6,
  },
  detailText: { fontSize: 13, color: colors.muted, marginLeft: 8 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 15, color: colors.muted, marginTop: 12 },
});
