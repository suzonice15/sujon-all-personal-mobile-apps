import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NotificationBell from '../../components/NotificationBell';

export default function SearchProductScreen({ navigation }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [results] = useState([]);

  const s = styles(colors);

  return (
    <View style={s.container}>
      <View style={[s.header, { backgroundColor: colors.headerBackground, paddingTop: insets.top + 6 }]}>
        <View style={s.headerRow}>
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={s.menuBtn}>
            <MaterialIcons name="menu" size={24} color={colors.headerColor} />
          </TouchableOpacity>

          <View style={s.inputWrap}>
            <MaterialIcons name="search" size={18} color={colors.headerColor + '99'} />
            <TextInput
              ref={inputRef}
              style={s.input}
              placeholder="Search products..."
              placeholderTextColor={colors.headerColor + '99'}
              value={query}
              onChangeText={setQuery}
              autoFocus
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery('')}>
                <MaterialIcons name="close" size={18} color={colors.headerColor + '99'} />
              </TouchableOpacity>
            )}
          </View>

          <NotificationBell color={colors.headerColor} />
        </View>
      </View>

      <FlatList
        data={results}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={s.list}
        ListEmptyComponent={
          <View style={s.empty}>
            <MaterialIcons name="search" size={64} color={colors.onSurface + '30'} />
            <Text style={s.emptyText}>
              {query ? 'No products found' : 'Type to search products'}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={s.item}>
            <Text style={s.itemText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingBottom: 8,
    paddingHorizontal: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuBtn: {
    padding: 6,
    marginRight: 4,
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 6,
    height: 40,
  },
  input: {
    flex: 1,
    color: colors.headerColor,
    fontSize: 15,
    marginLeft: 6,
    padding: 0,
  },
  list: {
    flexGrow: 1,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 15,
    color: colors.onSurface + '60',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.onSurface + '15',
  },
  itemText: {
    fontSize: 15,
    color: colors.text,
  },
});
