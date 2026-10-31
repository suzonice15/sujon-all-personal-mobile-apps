import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useTheme as usePaperTheme } from 'react-native-paper';
import { api } from '../../api/client';

const percentCal = (value) => {
  if (value > 0) return value + '%';
  return 'N/A';
};

export default function EmiInfoScreen() {
  const { colors } = usePaperTheme();
  const [emiData, setEmiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/emiInfo')
      .then((res) => {
        if (Array.isArray(res)) setEmiData(res);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color="#EB592C" />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>EMI Information</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Our Global EMI Policy</Text>
          <Text style={[styles.policyText, { color: colors.text }]}>
            EMI with specific amount & charges will bear by Customer/User - EMI with surcharge:
          </Text>
          <Text style={[styles.policyText, { color: colors.text }]}>
            In this model, merchants surcharge customers for EMI payment. Customers will find the EMI payment option on the SSL COMMERZ payment page. Upon selecting the EMI tenures, the EMI charge will be added to the product/service price. This is applicable to all product purchases.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 16 }]}>EMI (Equal Monthly Installment) Terms & Conditions:</Text>
          <Text style={[styles.policyText, { color: colors.text }]}>
            ১। ৫০০০ (পাঁচ হাজার) টাকার বেশি মুল্যের যেকোনো পন্য ক্রয়ের ক্ষেত্রে EMI উপভোগ করা যাবে।{'\n\n'}
            ২। ব্যাংকভেদে সর্বোচ্চ ৩৬(ছত্রিশ) মাস পর্যন্ত EMI এর সুবিধা উপভোগ করা যাবে।{'\n\n'}
            ৩। EMI এর অধীনে কোন পন্যের ক্যাশ প্রাইস(Cash Price), ডিস্কাউন্ট ও কোন ধরনের অফারের মুল্য প্রযোজ্য হবে না। এখানে উল্লেখ্য আমাদের সাইটে সকল পণ্যের ক্যাশ প্রাইস দেয়া আছে।{'\n\n'}
            ৪। এই মুহূর্তে ২২টি প্রধান ব্যাংকের ক্রেডিট কার্ডের মাধ্যমে EMI সুবিধা উপভোগ করা যাবে।{'\n\n'}
            ৫। EMI এর জন্য SSLCOMMERZ কর্তৃক ইএমআই চার্জ প্রযোজ্য যা ইএমআই এর সময়সীমার সাথে পরিবর্তনশীল।{'\n\n'}
            ৬। EMI সংক্রান্ত সকল প্রকার অফার যেকোনো সময় পরিবর্তন করার সকল প্রকার অধিকার Techland সংরক্ষন করে।
          </Text>

          <Image source={{ uri: 'https://jncomputerbd.com/images/emi.png' }} style={styles.emiImage} resizeMode="contain" />

          <View style={styles.tableSection}>
            <Text style={[styles.tableTitle, { color: colors.text }]}>Banks Under Online EMI and its Charges:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.tableScroll}>
              <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                  <Text style={[styles.tableHeaderCell, { width: 35 }]}>SL</Text>
                  <Text style={[styles.tableHeaderCell, { width: 140 }]}>Bank Name</Text>
                  <Text style={[styles.tableHeaderCell, { width: 45 }]}>3M</Text>
                  <Text style={[styles.tableHeaderCell, { width: 45 }]}>6M</Text>
                  <Text style={[styles.tableHeaderCell, { width: 45 }]}>9M</Text>
                  <Text style={[styles.tableHeaderCell, { width: 45 }]}>12M</Text>
                  <Text style={[styles.tableHeaderCell, { width: 45 }]}>18M</Text>
                  <Text style={[styles.tableHeaderCell, { width: 45 }]}>24M</Text>
                  <Text style={[styles.tableHeaderCell, { width: 45 }]}>30M</Text>
                  <Text style={[styles.tableHeaderCell, { width: 45 }]}>36M</Text>
                </View>
                {emiData.map((emi, index) => (
                  <View key={index} style={[styles.tableRow, index % 2 === 0 && { backgroundColor: '#F9FAFB' }]}>
                    <Text style={[styles.tableCell, { width: 35 }]}>{index + 1}</Text>
                    <Text style={[styles.tableCell, { width: 140, textAlign: 'left' }]} numberOfLines={1}>{emi.name}</Text>
                    <Text style={[styles.tableCell, { width: 45 }]}>{percentCal(emi.month_3)}</Text>
                    <Text style={[styles.tableCell, { width: 45 }]}>{percentCal(emi.month_6)}</Text>
                    <Text style={[styles.tableCell, { width: 45 }]}>{percentCal(emi.month_9)}</Text>
                    <Text style={[styles.tableCell, { width: 45 }]}>{percentCal(emi.month_12)}</Text>
                    <Text style={[styles.tableCell, { width: 45 }]}>{percentCal(emi.month_18)}</Text>
                    <Text style={[styles.tableCell, { width: 45 }]}>{percentCal(emi.month_24)}</Text>
                    <Text style={[styles.tableCell, { width: 45 }]}>{percentCal(emi.month_30)}</Text>
                    <Text style={[styles.tableCell, { width: 45 }]}>{percentCal(emi.month_36)}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { margin: 12, borderRadius: 12, overflow: 'hidden' },
  cardHeader: { backgroundColor: '#EA580C', paddingHorizontal: 16, paddingVertical: 14 },
  cardHeaderText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  cardBody: { padding: 16 },
  sectionTitle: { fontSize: 14, fontWeight: '700', marginBottom: 8 },
  policyText: { fontSize: 13, lineHeight: 20, marginBottom: 8 },
  emiImage: { width: '100%', height: 200, marginTop: 12, borderRadius: 8 },
  tableSection: { marginTop: 16 },
  tableTitle: { fontSize: 14, fontWeight: '700', marginBottom: 10 },
  tableScroll: { marginHorizontal: -4 },
  tableContainer: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, overflow: 'hidden' },
  tableHeader: { flexDirection: 'row', backgroundColor: '#F3F4F6', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  tableHeaderCell: { fontSize: 12, fontWeight: '700', color: '#374151', textAlign: 'center', paddingVertical: 10 },
  tableRow: { flexDirection: 'row', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#E5E7EB' },
  tableCell: { fontSize: 11, color: '#374151', textAlign: 'center', paddingVertical: 9 },
});
