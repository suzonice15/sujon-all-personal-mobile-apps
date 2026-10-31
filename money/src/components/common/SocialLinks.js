import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SOCIAL_LINKS } from '../../config/url';

function SocialTile({ item, colors, styles }) {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.08,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [pulse]);

  return (
    <TouchableOpacity
      accessibilityRole="link"
      onPress={() => Linking.openURL(item.url)}
      style={styles.tile}
      activeOpacity={0.75}
    >
      <Animated.View
        style={[
          styles.iconBox,
          { backgroundColor: `${item.color}18`, transform: [{ scale: pulse }] },
        ]}
      >
        {item.iconSet === 'brand' ? (
          <FontAwesome5 name={item.icon} size={22} color={item.color} brand />
        ) : (
          <MaterialIcons name={item.icon} size={24} color={item.color} />
        )}
      </Animated.View>
      <Text numberOfLines={2} style={[styles.label, { color: colors.onSurface }]}>
        {item.label}
      </Text>
      <MaterialIcons name="arrow-forward" size={17} color={item.color} />
    </TouchableOpacity>
  );
}

export default function SocialLinks() {
  const { colors } = useTheme();
  const s = styles(colors);
  const rows = [];

  for (let index = 0; index < SOCIAL_LINKS.length; index += 2) {
    rows.push(SOCIAL_LINKS.slice(index, index + 2));
  }

  return (
    <View style={s.section}>
      <View style={s.header}>
        <View style={s.headerIcon}>
          <MaterialIcons name="diversity-3" size={22} color={colors.primary} />
        </View>
        <View style={s.headerText}>
          <Text style={s.title}>আমাদের সাথে যুক্ত থাকুন</Text>
          <Text style={s.subtitle}>আপডেট পেতে আমাদের সোশ্যাল গ্রুপে যোগ দিন।</Text>
        </View>
      </View>

      {rows.map((row, rowIndex) => (
        <View key={`social-row-${rowIndex}`} style={s.row}>
          {row.map((item) => (
            <SocialTile key={item.key} item={item} colors={colors} styles={s} />
          ))}
          {row.length < 2 ? <View style={s.emptyTile} /> : null}
        </View>
      ))}
    </View>
  );
}

const styles = (colors) => StyleSheet.create({
  section: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  headerIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: `${colors.primary}18`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  headerText: {
    flex: 1,
  },
  title: {
    color: colors.onSurface,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 3,
  },
  subtitle: {
    color: colors.onSurface,
    fontSize: 11,
    lineHeight: 16,
    opacity: 0.65,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  emptyTile: {
    flex: 1,
  },
  tile: {
    flex: 1,
    minWidth: 0,
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: colors.background,
  },
  iconBox: {
    width: 42,
    height: 42,
    flexShrink: 0,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  label: {
    flex: 1,
    minWidth: 0,
    fontSize: 13,
    lineHeight: 17,
    fontWeight: '700',
    marginRight: 4,
  },
});
