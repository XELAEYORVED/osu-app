// Composants de base réutilisés par tous les écrans.
import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, space, type } from '@/theme/tokens';
import { Icon } from './Icon';

/** Écran défilant, fond noir, marges iOS */
export function Screen({ children, edges = 'top' }: { children: ReactNode; edges?: 'top' | 'none' }) {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingTop: edges === 'top' ? insets.top + space.sm : space.md, paddingHorizontal: space.lg, paddingBottom: 40 }}
    >
      {children}
    </ScrollView>
  );
}

export function LargeTitle({ overline, title, right }: { overline?: string; title: string; right?: ReactNode }) {
  return (
    <View style={styles.titleRow}>
      <View style={{ flex: 1 }}>
        {overline ? <Text style={[type.overline, { color: colors.textSecondary }]}>{overline}</Text> : null}
        <Text style={[type.largeTitle, { color: colors.text }]}>{title}</Text>
      </View>
      {right}
    </View>
  );
}

export function Card({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function SectionTitle({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <View style={styles.sectionRow}>
      <Text style={[type.title2, { color: colors.text }]}>{title}</Text>
      {action ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text style={[type.subhead, { color: colors.accent }]}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

type RowProps = { title: string; subtitle?: string; left?: ReactNode; right?: ReactNode; onPress?: () => void; last?: boolean; chevron?: boolean };
export function ListRow({ title, subtitle, left, right, onPress, last, chevron = !!onPress }: RowProps) {
  return (
    <Pressable onPress={onPress} disabled={!onPress} style={({ pressed }) => [styles.row, pressed && { backgroundColor: colors.cardPressed }]}>
      {left ? <View style={{ marginRight: space.md }}>{left}</View> : null}
      <View style={[styles.rowBody, !last && styles.rowBorder]}>
        <View style={{ flex: 1 }}>
          <Text style={[type.body, { color: colors.text }]}>{title}</Text>
          {subtitle ? <Text style={[type.footnote, { color: colors.textSecondary, marginTop: 2 }]}>{subtitle}</Text> : null}
        </View>
        {right}
        {chevron ? <Icon name="chevron-right" size={18} color={colors.textTertiary} /> : null}
      </View>
    </Pressable>
  );
}

export function Segmented<T extends string>({ options, value, onChange }: { options: { value: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <View style={styles.segmented} accessibilityRole="tablist">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <Pressable key={o.value} onPress={() => onChange(o.value)} style={[styles.segment, active && styles.segmentActive]} accessibilityRole="tab" accessibilityState={{ selected: active }}>
            <Text style={[type.footnote, { color: colors.text, fontWeight: active ? '600' : '500' }]}>{o.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function Chip({ label, active, onPress, color = colors.accent }: { label: string; active: boolean; onPress: () => void; color?: string }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      style={[styles.chip, active && { borderColor: color, backgroundColor: color + '33' }]}
    >
      <Text style={[type.subhead, { color: colors.text, fontWeight: '600' }]}>{label}</Text>
    </Pressable>
  );
}

export function PrimaryButton({ label, onPress, variant = 'white' }: { label: string; onPress: () => void; variant?: 'white' | 'accent' | 'dark' }) {
  const bg = variant === 'white' ? '#FFFFFF' : variant === 'accent' ? colors.accentStrong : colors.card;
  const fg = variant === 'white' ? '#000000' : '#FFFFFF';
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={({ pressed }) => [styles.button, { backgroundColor: bg, opacity: pressed ? 0.8 : 1 }]}>
      <Text style={[type.headline, { color: fg }]}>{label}</Text>
    </Pressable>
  );
}

export function RoundButton({ icon, onPress, label, bg = colors.card }: { icon: 'plus' | 'play' | 'pause' | 'close' | 'chevron-left'; onPress: () => void; label: string; bg?: string }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label} hitSlop={8} style={[styles.round, { backgroundColor: bg }]}>
      <Icon name={icon} size={18} color={icon === 'plus' ? colors.accent : '#fff'} strokeWidth={2.4} />
    </Pressable>
  );
}

export function Stat({ value, label, color = colors.text }: { value: string; label: string; color?: string }) {
  return (
    <View>
      <Text style={[type.number, { color }]}>{value}</Text>
      <Text style={[type.footnote, { color: colors.textSecondary }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: space.lg },
  card: { backgroundColor: colors.card, borderRadius: radius.lg, padding: space.lg },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginTop: space.xxl, marginBottom: space.md },
  row: { flexDirection: 'row', alignItems: 'center', paddingLeft: space.lg, minHeight: 52 },
  rowBody: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: space.md, paddingRight: space.md, gap: space.sm },
  rowBorder: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.separator },
  segmented: { flexDirection: 'row', backgroundColor: colors.card, borderRadius: 9, padding: 2 },
  segment: { flex: 1, alignItems: 'center', paddingVertical: 7, borderRadius: 7 },
  segmentActive: { backgroundColor: '#636366' },
  chip: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: radius.sm, borderWidth: 1.5, borderColor: colors.card, backgroundColor: colors.card },
  button: { height: 52, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  round: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
});
