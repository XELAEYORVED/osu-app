// Nouvelle séance, en feuille modale (référence : design/screens/Seance.png)
import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { Chip } from '@/components/ui';
import { useStore } from '@/data/store';
import { contentOptions, feelingLabels, type ContentKind, type Feeling, type Place } from '@/data/types';
import { formatLongCap, formatMinutes, today } from '@/lib/dates';
import { colors, radius, space, type } from '@/theme/tokens';

const FEELINGS = Object.keys(feelingLabels) as Feeling[];
const MAX_NOTE = 280;

export default function NewSessionScreen() {
  const { addSession } = useStore();
  const date = today();
  const [place, setPlace] = useState<Place>('dojo');
  const [minutes, setMinutes] = useState(90);
  const [content, setContent] = useState<ContentKind[]>(['Kihon']);
  const [intensity, setIntensity] = useState(7);
  const [feeling, setFeeling] = useState<Feeling>('bien');
  const [senseiNote, setSenseiNote] = useState('');
  const [hasPain, setHasPain] = useState(false);
  const [pain, setPain] = useState('');

  const toggle = (c: ContentKind) => setContent((l) => (l.includes(c) ? l.filter((x) => x !== c) : [...l, c]));

  const save = () => {
    addSession({
      date,
      place,
      minutes,
      content,
      intensity,
      feeling,
      senseiNote: senseiNote.trim() || undefined,
      pain: hasPain && pain.trim() ? pain.trim() : undefined,
    });
    router.back();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#111' }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.bar}>
        <Pressable onPress={() => router.back()} hitSlop={10}><Text style={[type.body, { color: colors.accent }]}>Annuler</Text></Pressable>
        <Text style={[type.headline, { color: colors.text }]}>Nouvelle séance</Text>
        <Pressable onPress={save} hitSlop={10} disabled={content.length === 0}>
          <Text style={[type.headline, { color: content.length ? colors.accent : colors.textTertiary }]}>Enregistrer</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ padding: space.lg, paddingBottom: 60 }} keyboardShouldPersistTaps="handled">
        <View style={{ flexDirection: 'row', gap: space.md }}>
          <PlaceButton label="Au dojo" dot={colors.success} active={place === 'dojo'} onPress={() => setPlace('dojo')} />
          <PlaceButton label="Hors dojo" dot="#0A84FF" active={place === 'outside'} onPress={() => setPlace('outside')} />
        </View>

        <View style={styles.group}>
          <Row label="Date" value={`Aujourd’hui, ${formatLongCap(date)}`} />
          <View style={[styles.row, { borderBottomWidth: 0 }]}>
            <Text style={[type.body, { color: colors.text }]}>Durée</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.md }}>
              <Text style={[type.body, { color: colors.text, fontVariant: ['tabular-nums'] }]}>{formatMinutes(minutes)}</Text>
              <View style={styles.stepper}>
                <Pressable onPress={() => setMinutes((m) => Math.max(15, m - 15))} style={styles.stepBtn} accessibilityLabel="Moins 15 minutes"><Text style={styles.stepTxt}>−</Text></Pressable>
                <View style={{ width: StyleSheet.hairlineWidth, backgroundColor: colors.separator }} />
                <Pressable onPress={() => setMinutes((m) => Math.min(300, m + 15))} style={styles.stepBtn} accessibilityLabel="Plus 15 minutes"><Text style={styles.stepTxt}>+</Text></Pressable>
              </View>
            </View>
          </View>
        </View>

        <Label text="Contenu" />
        <View style={styles.wrap}>
          {contentOptions.map((c) => <Chip key={c} label={c} active={content.includes(c)} onPress={() => toggle(c)} />)}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Label text="Intensité" />
          <Text style={[type.subhead, { color: colors.ringTrainings, fontWeight: '600' }]}>{intensity}/10</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <Pressable key={n} onPress={() => setIntensity(n)} style={[styles.level, n <= intensity && { backgroundColor: colors.ringTrainings }]} accessibilityLabel={`Intensité ${n}`}>
              <Text style={{ color: n <= intensity ? '#000' : colors.textSecondary, fontWeight: '700', fontSize: 13 }}>{n}</Text>
            </Pressable>
          ))}
        </View>

        <Label text="Ressenti" />
        <View style={styles.wrap}>
          {FEELINGS.map((f) => <Chip key={f} label={feelingLabels[f]} active={feeling === f} onPress={() => setFeeling(f)} />)}
        </View>

        <Label text="Ce que le sensei m’a corrigé" />
        <TextInput
          value={senseiNote}
          onChangeText={(t) => setSenseiNote(t.slice(0, MAX_NOTE))}
          placeholder="Ex. : hikite trop bas sur oi tsuki"
          placeholderTextColor={colors.textTertiary}
          multiline
          style={styles.input}
        />

        <View style={[styles.group, styles.row, { borderBottomWidth: 0 }]}>
          <Text style={[type.body, { color: colors.text }]}>Douleur ou gêne</Text>
          <Switch value={hasPain} onValueChange={setHasPain} trackColor={{ true: colors.accent }} />
        </View>
        {hasPain ? (
          <TextInput
            value={pain}
            onChangeText={(t) => setPain(t.slice(0, 120))}
            placeholder="Où ? (ex. tibia gauche, douleur légère)"
            placeholderTextColor={colors.textTertiary}
            style={[styles.input, { minHeight: 48, marginTop: space.sm }]}
          />
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function PlaceButton({ label, dot, active, onPress }: { label: string; dot: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="radio" accessibilityState={{ selected: active }} style={[styles.place, active && { borderColor: dot, backgroundColor: dot + '22' }]}>
      <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: dot }} />
      <Text style={[type.headline, { color: colors.text }]}>{label}</Text>
    </Pressable>
  );
}

const Label = ({ text }: { text: string }) => <Text style={[type.overline, { color: colors.textSecondary, marginTop: space.xl, marginBottom: space.sm }]}>{text}</Text>;
const Row = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.row}>
    <Text style={[type.body, { color: colors.text }]}>{label}</Text>
    <Text style={[type.body, { color: colors.textSecondary }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: space.lg, paddingTop: space.xl, paddingBottom: space.md },
  place: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: space.sm, height: 50, borderRadius: radius.md, borderWidth: 1.5, borderColor: colors.card, backgroundColor: colors.card },
  group: { backgroundColor: colors.card, borderRadius: radius.md, marginTop: space.lg, overflow: 'hidden' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: space.lg, minHeight: 50, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.separator },
  stepper: { flexDirection: 'row', backgroundColor: '#2C2C2E', borderRadius: 8 },
  stepBtn: { width: 40, height: 32, alignItems: 'center', justifyContent: 'center' },
  stepTxt: { color: colors.text, fontSize: 20 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  level: { flex: 1, height: 34, borderRadius: 7, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center' },
  input: { backgroundColor: colors.card, borderRadius: radius.md, padding: space.md, minHeight: 88, color: colors.text, fontSize: 16, textAlignVertical: 'top' },
});
