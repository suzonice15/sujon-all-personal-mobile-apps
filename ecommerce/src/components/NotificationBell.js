import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useNotifications } from '../context/NotificationsContext';

export default function NotificationBell({ color, onPress }) {
  const navigation = useNavigation();
  const { unread } = useNotifications();

  const handlePress = onPress || (() => navigation.navigate('Notifications'));

  return (
    <TouchableOpacity onPress={handlePress} style={{ marginRight: 6 }}>
      <View style={s.wrap}>
        <MaterialIcons name="notifications" size={26} color={color} />
        {unread > 0 && (
          <View style={s.badge}>
            <Text style={s.badgeText}>{unread > 99 ? '99+' : unread}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  wrap: {
    width: 34, height: 34,
    justifyContent: 'center', alignItems: 'center',
  },
  badge: {
    position: 'absolute', top: 0, right: 0,
    backgroundColor: '#EF4444', borderRadius: 12,
    minWidth: 22, height: 22,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#fff',
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
});
