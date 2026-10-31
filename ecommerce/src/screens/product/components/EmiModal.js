import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Modal, StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const formatPrice = (num) => {
  const n = Number(num);
  if (isNaN(n)) return '0';
  return n.toLocaleString('en-IN');
};

const singleEmiProductPrice = (price, month, rate) => {
  if (!rate || rate <= 0) return null;
  const totalEmiPrice = parseInt(price) + (price * rate) / 100;
  return { month, overallCost: Math.round(totalEmiPrice) };
};

const EMI_MONTHS = [
  { month: 3, key: 'month_3' },
  { month: 6, key: 'month_6' },
  { month: 9, key: 'month_9' },
  { month: 12, key: 'month_12' },
  { month: 18, key: 'month_18' },
  { month: 24, key: 'month_24' },
  { month: 30, key: 'month_30' },
  { month: 36, key: 'month_36' },
];

export default function EmiModal({
  visible,
  onClose,
  emiInfo = [],
  selectedBankId,
  setSelectedBankId,
  singleEmiRecord,
  price,
  onNavigateEmiInfo,
}) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>EMI Price Calculator</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#111" />
            </TouchableOpacity>
          </View>

          {/* Body */}
          <View style={styles.body}>
            {/* Bank List */}
            <View style={styles.bankList}>
              <Text style={styles.bankListTitle}>Select Bank</Text>
              <FlatList
                data={emiInfo}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[styles.bankItem, selectedBankId === item.id && styles.bankItemActive]}
                    onPress={() => setSelectedBankId(item.id)}
                  >
                    <Text style={[styles.bankItemText, selectedBankId === item.id && styles.bankItemTextActive]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            {/* EMI Table */}
            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Month</Text>
                <Text style={styles.tableHeaderText}>Overall Cost</Text>
              </View>
              {singleEmiRecord && (
                <View>
                  {EMI_MONTHS.map((item, index) => {
                    const emiData = singleEmiProductPrice(price, item.month, singleEmiRecord[item.key]);
                    if (!emiData) return null;
                    return (
                      <View key={index} style={[styles.tableRow, index % 2 === 0 && styles.tableRowAlt]}>
                        <Text style={styles.tableCell}>{emiData.month} Month</Text>
                        <Text style={styles.tableCell}>৳ {formatPrice(emiData.overallCost)}</Text>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          </View>

          {/* Footer */}
          <TouchableOpacity style={styles.footer} onPress={onNavigateEmiInfo}>
            <Text style={styles.footerText}>Find Our All Payment Partners</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  body: {
    flexDirection: 'row',
    height: 320,
  },
  bankList: {
    width: '45%',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  bankListTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  bankItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  bankItemActive: {
    backgroundColor: '#EB592C',
  },
  bankItemText: {
    fontSize: 12,
    color: '#374151',
  },
  bankItemTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  tableContainer: {
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
    paddingVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  tableRowAlt: {
    backgroundColor: '#F9FAFB',
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    color: '#374151',
    textAlign: 'center',
    paddingVertical: 8,
  },
  footer: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
  },
});
