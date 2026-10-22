// Shared design tokens and small building blocks for the course screens, so
// every screen uses the same colors, spacing, radius and shadows in both themes.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme as usePaperTheme } from 'react-native-paper';

const LIGHT = {
  dark: false,
  bg: '#F4F6FB',
  card: '#FFFFFF',
  cardAlt: '#F1F5F9',
  text: '#0F172A',
  sub: '#64748B',
  border: '#E2E8F0',
  brand: '#0F766E',
  brandSoft: '#CCFBF1',
  success: '#16A34A',
  successSoft: '#DCFCE7',
  danger: '#DC2626',
  noteBg: '#FEF3C7', noteBorder: '#F59E0B', noteText: '#78350F',
  infoBg: '#DBEAFE', infoText: '#1E3A8A',
  track: '#E2E8F0',
};

const DARK = {
  dark: true,
  bg: '#0B1120',
  card: '#151E2E',
  cardAlt: '#1E293B',
  text: '#E2E8F0',
  sub: '#94A3B8',
  border: '#1E293B',
  brand: '#2DD4BF',
  brandSoft: '#134E4A',
  success: '#22C55E',
  successSoft: '#14532D',
  danger: '#F87171',
  noteBg: '#3A2E0B', noteBorder: '#F59E0B', noteText: '#FDE68A',
  infoBg: '#172554', infoText: '#BFDBFE',
  track: '#1E293B',
};

export const RADIUS = { sm: 8, md: 14, lg: 20, pill: 999 };
export const SPACE = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 };

export const useUI = () => {
  const { dark } = usePaperTheme();
  return dark ? DARK : LIGHT;
};

// Soft shadow in light mode; dark mode relies on a subtle border instead.
// boxShadow (New Architecture) follows borderRadius, unlike Android elevation.
export const cardShadow = (ui) => (ui.dark
  ? { borderWidth: 1, borderColor: ui.border }
  : { boxShadow: '0 4px 14px rgba(15, 23, 42, 0.07)' });

// Course color tinted for backgrounds, e.g. tint('#E44D26', 0.15).
export const tint = (hex, alpha) => {
  const a = Math.round(alpha * 255).toString(16).padStart(2, '0');
  return `${hex}${a}`;
};

export function ProgressBar({ value, color, track, height = 6, style }) {
  const pct = Math.max(0, Math.min(1, value || 0)) * 100;
  return (
    <View style={[{ height, borderRadius: height, backgroundColor: track, overflow: 'hidden' }, style]}>
      <View style={{ width: `${pct}%`, height, borderRadius: height, backgroundColor: color }} />
    </View>
  );
}

// Rounded square with the course's short name, used as the course "logo".
export function CourseLogo({ course, size = 52 }) {
  return (
    <View style={[s.logo, { width: size, height: size, borderRadius: size * 0.28, backgroundColor: course.color }]}>
      <Text style={[s.logoText, { fontSize: size * 0.3 }]} numberOfLines={1} adjustsFontSizeToFit>
        {course.short || course.title}
      </Text>
    </View>
  );
}

// Decorative translucent circles for colored hero cards.
export function HeroDecor() {
  return (
    <>
      <View pointerEvents="none" style={[s.circle, { width: 180, height: 180, top: -70, right: -50 }]} />
      <View pointerEvents="none" style={[s.circle, { width: 110, height: 110, bottom: -50, right: 70 }]} />
    </>
  );
}

export function Pill({ label, color, bg, icon, style }) {
  return (
    <View style={[s.pill, { backgroundColor: bg }, style]}>
      {icon}
      <Text style={[s.pillText, { color }]}>{label}</Text>
    </View>
  );
}

export function SectionTitle({ title, ui, right }) {
  return (
    <View style={s.sectionRow}>
      <Text style={[s.sectionTitle, { color: ui.text }]}>{title}</Text>
      {right}
    </View>
  );
}

const s = StyleSheet.create({
  logo: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  logoText: { color: '#fff', fontWeight: '900' },
  circle: { position: 'absolute', borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.12)' },
  pill: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', borderRadius: RADIUS.pill, paddingHorizontal: 10, paddingVertical: 4 },
  pillText: { fontSize: 12, fontWeight: '700' },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: SPACE.xl, marginBottom: SPACE.md },
  sectionTitle: { fontSize: 18, fontWeight: '800' },
});
