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
    <TouchableOpacity onPress={handlePress} style={{ marginRight: 8 }}>
      <View>
        <MaterialIcons name="notifications" size={22} color={color} />
        {unread > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unread > 99 ? '99+' : unread}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute', top: -4, right: -6,
    backgroundColor: 'red', borderRadius: 8,
    minWidth: 16, height: 16,
    justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
});
