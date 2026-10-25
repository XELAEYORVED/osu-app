// Journal d'entraînement (référence : design/screens/Journal.png)
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Card, LargeTitle, RoundButton, Screen, Segmented } from '@/components/ui';
import { useStore } from '@/data/store';
import { feelingLabels, type Session } from '@/data/types';
import { formatLongCap, formatMinutes, today } from '@/lib/dates';
import { lastDays, recurringNotes } from '@/lib/stats';
import { colors, radius, space, type } from '@/theme/tokens';

type Filter = 'all' | 'dojo' | 'outside';

export default function JournalScreen() {
  const { state } = useStore();
  const [filter, setFilter] = useState<Filter>('all');
  const week = lastDays(state.sessions, today());
  const notes = useMemo(() => recurringNotes(state.sessions).slice(0, 3), [state.sessions]);
  const list = [...state.sessions]
    .filter((s) => filter === 'all' || s.place === filter)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <Screen>
      <LargeTitle
        overline="Carnet d’entraînement"
        title="Journal"
        right={<RoundButton icon="plus" label="Nouvelle séance" onPress={() => router.push('/session/new')} />}
      />

      <View style={{ flexDirection: 'row', gap: space.sm }}>
        <StatBox value={String(week.count)} label="séances · 7 jours" />
        <StatBox value={formatMinutes(week.minutes)} label="d’entraînement" />
        <StatBox value={week.intensity ? week.intensity.toFixed(1).replace('.', ',') : '–'} label="intensité moy." />
      </View>

      <Card style={{ marginTop: space.lg }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm }}>
          <Icon name="bulb" size={18} color={colors.ringTrainings} />
          <Text style={[type.headline, { color: colors.text }]}>Corrections qui reviennent</Text>
        </View>
        {notes.length === 0 ? (
          <Text style={[type.subhead, { color: colors.textSecondary, marginTop: space.sm }]}>
            Note les corrections du sensei dans tes séances : elles apparaîtront ici.
          </Text>
        ) : (
          notes.map((n) => (
            <View key={n.text} style={styles.noteRow}>
              <Text style={[type.subhead, { color: colors.text, flex: 1 }]}>{n.text}</Text>
              <Text style={[type.subhead, { color: colors.ringTrainings }]}>{n.count === 1 ? '1 fois' : `${n.count} fois`}</Text>
            </View>
          ))
        )}
        <Text style={[type.caption, { color: colors.textTertiary, marginTop: space.sm }]}>Résumé IA : prévu en phase 5.</Text>
      </Card>

      <View style={{ marginVertical: space.lg }}>
        <Segmented
          options={[{ value: 'all', label: 'Tout' }, { value: 'dojo', label: 'Dojo' }, { value: 'outside', label: 'Hors dojo' }]}
          value={filter}
          onChange={setFilter}
        />
      </View>

      {list.length === 0 ? (
        <Card>
          <Text style={[type.subhead, { color: colors.textSecondary }]}>Aucune séance pour l’instant. Appuie sur + pour en ajouter une.</Text>
        </Card>
      ) : (
        list.map((s) => <SessionCard key={s.id} s={s} />)
      )}
    </Screen>
  );
}

function SessionCard({ s }: { s: Session }) {
  return (
    <Card style={{ marginBottom: space.md }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={[type.footnote, { color: colors.textSecondary }]}>{formatLongCap(s.date)}</Text>
        <View style={[styles.badge, { backgroundColor: s.place === 'dojo' ? colors.successStrong : '#1F4FA8' }]}>
          <Text style={[type.caption, { color: '#fff' }]}>{s.place === 'dojo' ? 'Dojo' : 'Hors dojo'}</Text>
        </View>
      </View>
      <Text style={[type.title2, { color: colors.text, marginTop: 2 }]}>{s.content.join(' et ') || 'Séance'}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.md, marginTop: space.xs }}>
        <Text style={[type.subhead, { color: colors.text }]}>{formatMinutes(s.minutes)}</Text>
        <View style={{ flexDirection: 'row', gap: 2 }} accessibilityLabel={`Intensité ${s.intensity} sur 10`}>
          {Array.from({ length: 10 }, (_, i) => (
            <View key={i} style={{ width: 4, height: 12, borderRadius: 1, backgroundColor: i < s.intensity ? colors.ringTrainings : colors.separator }} />
          ))}
        </View>
        <Text style={[type.subhead, { color: colors.textSecondary }]}>{feelingLabels[s.feeling]}</Text>
      </View>
      {s.senseiNote ? (
        <View style={styles.note}>
          <Text style={[type.overline, { color: colors.ringTrainings, fontSize: 11 }]}>Correction du sensei</Text>
          <Text style={[type.subhead, { color: colors.text, marginTop: 2 }]}>{s.senseiNote}</Text>
        </View>
      ) : null}
      {s.pain ? <Text style={[type.footnote, { color: colors.accent, marginTop: space.sm }]}>⚠︎ {s.pain}</Text> : null}
    </Card>
  );
}

function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={[type.title2, { color: colors.text }]}>{value}</Text>
      <Text style={[type.caption, { color: colors.textSecondary }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  stat: { flex: 1, backgroundColor: colors.card, borderRadius: radius.md, padding: space.md },
  noteRow: { flexDirection: 'row', paddingVertical: 6, gap: space.sm },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  note: { marginTop: space.md, backgroundColor: '#2C2C2E', borderRadius: radius.sm, padding: space.md },
});
