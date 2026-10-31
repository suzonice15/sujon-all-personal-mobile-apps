import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';

export default function ConfirmWatchAdModal({
  visible,
  onClose,
  onConfirm,
  title = 'ভিডিও দেখে কয়েন সংগ্রহ করবেন?',
  contentTitle,
  amountText,
  subtitle = 'একটি ভিডিও বিজ্ঞাপন দেখে কয়েন সংগ্রহ করুন',
  confirmText = 'ঠিক আছে',
  cancelText = 'বাতিল',
}) {
  const { colors } = useTheme();
  const s = styles(colors);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={s.overlay}>
        <View style={s.card}>
          <TouchableOpacity style={s.closeBtn} onPress={onClose}>
            <MaterialIcons name="close" size={20} color={colors.text} />
          </TouchableOpacity>
          <View style={s.iconWrap}>
            <MaterialIcons name="ondemand-video" size={44} color="#F59E0B" />
          </View>
          <Text style={s.title}>{title}</Text>
          {contentTitle ? (
            <Text style={s.contentTitle} numberOfLines={2}>"{contentTitle}"</Text>
          ) : null}
          <Text style={s.amount}>{amountText}</Text>
          <Text style={s.sub}>{subtitle}</Text>
          <View style={s.btnRow}>
            <TouchableOpacity style={[s.btn, s.cancelBtn]} onPress={onClose}>
              <Text style={s.cancelBtnText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.btn, s.okBtn]} onPress={onConfirm}>
              <Text style={s.okBtnText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = (colors) => StyleSheet.create({
  overlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center', alignItems: 'center', padding: 24,
  },
  card: {
    width: '100%', maxWidth: 320, backgroundColor: colors.surface,
    borderRadius: 20, paddingVertical: 28, paddingHorizontal: 24, alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute', top: 12, right: 12, zIndex: 1,
    width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center',
  },
  iconWrap: {
    width: 84, height: 84, borderRadius: 42, backgroundColor: '#F59E0B18',
    justifyContent: 'center', alignItems: 'center', marginBottom: 14,
  },
  title: { fontSize: 19, fontWeight: '800', color: colors.text, marginBottom: 6, textAlign: 'center' },
  contentTitle: { fontSize: 13, color: colors.text, opacity: 0.7, textAlign: 'center' },
  amount: { fontSize: 22, fontWeight: '800', color: '#22C55E', marginTop: 4 },
  sub: { fontSize: 12, color: colors.text, opacity: 0.5, marginTop: 4, marginBottom: 18, textAlign: 'center' },
  btnRow: { flexDirection: 'row', gap: 10, width: '100%' },
  btn: { flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  cancelBtn: { backgroundColor: colors.background, borderWidth: 1.5, borderColor: '#EF444455' },
  cancelBtnText: { color: '#EF4444', fontSize: 15, fontWeight: '700' },
  okBtn: { backgroundColor: '#F59E0B' },
  okBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
