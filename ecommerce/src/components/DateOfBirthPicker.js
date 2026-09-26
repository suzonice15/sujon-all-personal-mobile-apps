import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

function parseValue(value) {
  if (!value) return null;
  const d = new Date(value);
  if (isNaN(d.getTime())) return null;
  return { day: d.getDate(), month: d.getMonth(), year: d.getFullYear() };
}

function formatDisplay(value) {
  const p = parseValue(value);
  if (!p) return null;
  return `${p.day} ${MONTHS[p.month]} ${p.year}`;
}

function Column({ data, selected, onSelect, colors, renderLabel }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item)}
      style={s.column}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        const active = item === selected;
        return (
          <TouchableOpacity
            style={[s.columnItem, active && { backgroundColor: colors.primary + '15' }]}
            onPress={() => onSelect(item)}
          >
            <Text style={[s.columnItemText, { color: active ? colors.primary : colors.text }, active && { fontWeight: '700' }]}>
              {renderLabel ? renderLabel(item) : item}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}

export default function DateOfBirthPicker({ value, onChange, colors, placeholder = 'Select Date of Birth' }) {
  const [open, setOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  const initial = parseValue(value) || { day: 1, month: 0, year: currentYear - 20 };
  const [day, setDay] = useState(initial.day);
  const [month, setMonth] = useState(initial.month);
  const [year, setYear] = useState(initial.year);

  const years = useMemo(() => {
    const arr = [];
    for (let y = currentYear; y >= currentYear - 90; y--) arr.push(y);
    return arr;
  }, [currentYear]);

  const days = useMemo(() => {
    const total = daysInMonth(month, year);
    return Array.from({ length: total }, (_, i) => i + 1);
  }, [month, year]);

  const openPicker = () => {
    const p = parseValue(value) || { day: 1, month: 0, year: currentYear - 20 };
    setDay(p.day);
    setMonth(p.month);
    setYear(p.year);
    setOpen(true);
  };

  const confirm = () => {
    const safeDay = Math.min(day, daysInMonth(month, year));
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(safeDay).padStart(2, '0');
    onChange(`${year}-${mm}-${dd}`);
    setOpen(false);
  };

  const display = formatDisplay(value);

  return (
    <>
      <TouchableOpacity
        style={[s.selectBtn, { borderColor: colors.onSurface + '20', backgroundColor: colors.background }]}
        onPress={openPicker}
      >
        <Text style={{ color: display ? colors.text : colors.onSurface + '50', fontSize: 14 }}>
          {display || placeholder}
        </Text>
        <MaterialIcons name="event" size={18} color={colors.onSurface + '60'} />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <TouchableOpacity style={s.overlay} activeOpacity={1} onPress={() => setOpen(false)}>
          <TouchableOpacity activeOpacity={1} style={[s.sheet, { backgroundColor: colors.surface }]}>
            <Text style={[s.title, { color: colors.text }]}>Date of Birth</Text>
            <View style={s.columns}>
              <Column data={days} selected={day} onSelect={setDay} colors={colors} />
              <Column data={MONTHS.map((_, i) => i)} selected={month} onSelect={setMonth} colors={colors} renderLabel={(i) => MONTHS[i]} />
              <Column data={years} selected={year} onSelect={setYear} colors={colors} />
            </View>
            <View style={s.actions}>
              <TouchableOpacity style={s.cancelBtn} onPress={() => setOpen(false)}>
                <Text style={s.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[s.confirmBtn, { backgroundColor: colors.primary }]} onPress={confirm}>
                <Text style={s.confirmBtnText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const s = StyleSheet.create({
  selectBtn: {
    borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, height: 44,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 24 },
  sheet: { borderRadius: 16, padding: 16 },
  title: { fontSize: 15, fontWeight: '700', marginBottom: 10, textAlign: 'center' },
  columns: { flexDirection: 'row', height: 220, gap: 6 },
  column: { flex: 1 },
  columnItem: { paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  columnItemText: { fontSize: 14 },
  actions: { flexDirection: 'row', gap: 10, marginTop: 14 },
  cancelBtn: { flex: 1, height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#EF4444' },
  cancelBtnText: { color: '#EF4444', fontSize: 14, fontWeight: '700' },
  confirmBtn: { flex: 1, height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  confirmBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
});
