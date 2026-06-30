import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const historyOptions = [
  
  {
    id: 'coin', title: 'কয়েন হিস্টোরি',
    subtitle: 'আপনার অর্জিত কয়েনের বিস্তারিত দেখুন',
    icon: 'monetization-on', color: '#F59E0B', screen: 'CoinHistory',
  },
  {
    id: 'point', title: 'পয়েন্ট হিস্টোরি',
    subtitle: 'গল্প পড়ে অর্জিত পয়েন্টের তালিকা',
    icon: 'star', color: '#22C55E', screen: 'PointHistory',
  },
  {
    id: 'withdraw', title: 'উইথড্র হিস্টোরি',
    subtitle: 'আপনার উত্তোলনের সব রেকর্ড',
    icon: 'account-balance-wallet', color: '#4F46E5', screen: 'WithdrawHistory',
  },
  {
    id: 'order', title: 'অর্ডার হিস্টোরি',
    subtitle: 'আপনার অর্ডারের বর্তমান অবস্থা দেখুন',
    icon: 'inventory-2', color: '#EF4444', screen: 'OrderHistory',
  },
];

const BalanceItem = ({ icon, iconColor, label, value, onPress, isVisible, mutedColor }) => {
  const animVal = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(animVal, {
      toValue: isVisible ? 1 : 0, duration: 250, useNativeDriver: true,
    }).start();
  }, [isVisible]);

  const labelOpacity = animVal.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 1, 0] });
  const amountOpacity = animVal.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 0, 1] });
  const labelTranslate = animVal.interpolate({ inputRange: [0, 1], outputRange: [0, -20] });
  const amountTranslate = animVal.interpolate({ inputRange: [0, 1], outputRange: [20, 0] });

  return (
    <View style={styles.balanceItem}>
      <MaterialIcons name={icon} size={20} color={iconColor} />
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.toggleArea}>
        <Animated.Text
          style={[styles.labelText, { color: mutedColor, opacity: labelOpacity, transform: [{ translateX: labelTranslate }] }]}
        >
          {label}
        </Animated.Text>
        <Animated.Text
          style={[styles.amountText, { color: iconColor, opacity: amountOpacity, transform: [{ translateX: amountTranslate }], position: 'absolute' }]}
        >
          {value}
        </Animated.Text>
      </TouchableOpacity>
    </View>
  );
};

export default function HistoryScreen({ navigation }) {
  const { colors } = useTheme();
  const s = dynStyles(colors);
  const [visible, setVisible] = useState({ coin: false, point: false, withdraw: false });
  const timers = useRef({});

  const toggleVisibility = (key) => {
    if (timers.current[key]) clearTimeout(timers.current[key]);
    setVisible((prev) => {
      const newVal = !prev[key];
      if (newVal) {
        timers.current[key] = setTimeout(() => {
          setVisible((p) => ({ ...p, [key]: false }));
        }, 30000);
      }
      return { ...prev, [key]: newVal };
    });
  };

  return (
    <SafeAreaView style={s.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={s.headerSection}>
          <MaterialIcons name="history" size={40} color={colors.headerBackground} />
          <Text style={s.headerTitle}>হিস্টোরি</Text>
          <Text style={s.headerSubtitle}>আপনার সকল লেনদেন ও অর্জনের বিবরণ</Text>
        </View>

        <View style={s.balanceCard}>
          <View style={s.balanceHeader}>
            <MaterialIcons name="account-balance" size={20} color={colors.muted} />
            <Text style={s.balanceHeaderText}>মোট ব্যালেন্স</Text>
          </View>
          <View style={s.balanceDivider} />
          <View style={s.balanceRow}>
            <BalanceItem
              icon="monetization-on" iconColor="#F59E0B"
              label="কয়েন দেখুন" value="১০০০"
              isVisible={visible.coin}
              onPress={() => toggleVisibility('coin')}
              mutedColor={colors.muted}
            />
            <View style={[s.balanceDot, { backgroundColor: colors.muted }]} />
            <BalanceItem
              icon="star" iconColor="#22C55E"
              label="পয়েন্ট দেখুন" value="৫০০"
              isVisible={visible.point}
              onPress={() => toggleVisibility('point')}
              mutedColor={colors.muted}
            />
            <View style={[s.balanceDot, { backgroundColor: colors.muted }]} />
            <BalanceItem
              icon="account-balance-wallet" iconColor="#4F46E5"
              label="উইথড্র দেখুন" value="০"
              isVisible={visible.withdraw}
              onPress={() => toggleVisibility('withdraw')}
              mutedColor={colors.muted}
            />
          </View>
        </View>

        <View style={{ height: 12 }} />
        {historyOptions.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={s.optionCard}
            onPress={() => navigation.navigate(item.screen)}
            activeOpacity={0.7}
          >
            <View style={[s.iconBox, { backgroundColor: item.color + '20' }]}>
              <MaterialIcons name={item.icon} size={28} color={item.color} />
            </View>
            <View style={s.optionTextContainer}>
              <Text style={s.optionTitle}>{item.title}</Text>
              <Text style={s.optionSubtitle}>{item.subtitle}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.muted} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  balanceItem: { alignItems: 'center', flex: 1 },
  toggleArea: { marginTop: 6, minHeight: 22, justifyContent: 'center', alignItems: 'center' },
  amountText: { fontSize: 16, fontWeight: 'bold' },
  labelText: { fontSize: 12, fontWeight: '500' },
});

const dynStyles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  headerSection: { alignItems: 'center', paddingTop: 20, paddingBottom: 10 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: colors.text, marginTop: 8 },
  headerSubtitle: { fontSize: 13, color: colors.muted, marginTop: 4 },
  balanceCard: {
    backgroundColor: colors.surface, marginHorizontal: 16, marginTop: 16,
    borderRadius: 16, padding: 18,
    elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 10,
  },
  balanceHeader: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 12,
  },
  balanceHeaderText: { fontSize: 13, color: colors.muted, marginLeft: 6, fontWeight: '500' },
  balanceDivider: { height: 1, backgroundColor: colors.muted + '30', marginBottom: 14 },
  balanceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  balanceDot: { width: 4, height: 4, borderRadius: 2 },
  optionCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface, marginHorizontal: 16,
    marginBottom: 12, borderRadius: 16, padding: 16,
    elevation: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08, shadowRadius: 8,
  },
  iconBox: {
    width: 52, height: 52, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center',
    elevation:0,
  },
  optionTextContainer: { flex: 1, marginLeft: 14 },
  optionTitle: { fontSize: 16, fontWeight: '700', color: colors.text },
  optionSubtitle: { fontSize: 12, color: colors.muted, marginTop: 3 },
});
