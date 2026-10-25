// Profil : statistiques de la saison et grille d'activité (référence : design/screens/Profil.png)
import { Alert, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { ActivityGrid } from '@/components/ActivityGrid';
import { Card, Screen, SectionTitle } from '@/components/ui';
import { useStore } from '@/data/store';
import { formatMinutes, today } from '@/lib/dates';
import { seasonLabel, seasonStartYear, seasonTotals, streakWeeks } from '@/lib/stats';
import { activity, colors, radius, space, type } from '@/theme/tokens';

export default function ProfileScreen() {
  const { state, resetToEmpty, resetToSample } = useStore();
  const now = today();
  const year = seasonStartYear(now);
  const t = seasonTotals(state.sessions, year);
  const streak = streakWeeks(state.sessions, now);

  const confirmReset = () => {
    const run = () => resetToEmpty();
    if (Platform.OS === 'web') return run();
    Alert.alert('Effacer toutes les données ?', 'Les séances et techniques maîtrisées seront supprimées de ce téléphone.', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Effacer', style: 'destructive', onPress: run },
    ]);
  };

  return (
    <Screen edges="none">
      <View style={styles.head}>
        <View style={styles.avatar}>
          <Text style={[type.title2, { color: colors.text }]}>{state.profile.firstName.slice(0, 2).toUpperCase()}</Text>
        </View>
        <View>
          <Text style={[type.title, { color: colors.text }]}>{state.profile.firstName}</Text>
          <Text style={[type.subhead, { color: colors.textSecondary }]}>{state.profile.dojo} · depuis sept. 2026</Text>
        </View>
      </View>

      <SectionTitle title={`Saison ${seasonLabel(year)}`} />
      <View style={styles.grid}>
        <Box title="Heures d’entraînement" value={formatMinutes(t.minutes)} sub={`Dojo ${formatMinutes(t.dojoMinutes)} · hors dojo ${formatMinutes(t.outsideMinutes)}`} />
        <Box title="Jours d’entraînement" value={String(t.days)} sub={`${t.dojoCount} au dojo · ${t.outsideCount} hors dojo`} />
        <Box title="Série" value={`${streak} sem.`} sub="Au moins 2 séances par semaine" color={colors.ringTrainings} />
        <Box title="Compétitions" value="0" sub="Phase 3" />
      </View>

      <Card style={{ marginTop: space.md }}>
        <Text style={[type.headline, { color: colors.text, marginBottom: space.sm }]}>Activité</Text>
        <ActivityGrid sessions={state.sessions} startYear={year} today={now} />
        <View style={styles.legend}>
          <Legend label="Dojo" color={activity.dojo[2]} />
          <Legend label="Hors dojo" color={activity.outside[2]} />
        </View>
        <Text style={[type.caption, { color: colors.textTertiary, marginTop: space.sm }]}>
          Juillet et août comptent en bonus (intersaison) et ne cassent pas la série.
        </Text>
      </Card>

      <SectionTitle title="Données" />
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <Pressable onPress={resetToSample} style={styles.action}>
          <Text style={[type.body, { color: colors.accent }]}>Recharger les données d’exemple</Text>
        </Pressable>
        <Pressable onPress={confirmReset} style={[styles.action, { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.separator }]}>
          <Text style={[type.body, { color: colors.accent }]}>Effacer toutes mes données</Text>
        </Pressable>
      </Card>
      <Text style={[type.caption, { color: colors.textTertiary, marginTop: space.md }]}>
        Tes données restent sur ce téléphone. Aucun compte, aucun envoi sur internet.
      </Text>
    </Screen>
  );
}

function Box({ title, value, sub, color = colors.text }: { title: string; value: string; sub: string; color?: string }) {
  return (
    <View style={styles.box}>
      <Text style={[type.footnote, { color: colors.textSecondary }]}>{title}</Text>
      <Text style={[type.title, { color }]}>{value}</Text>
      <Text style={[type.caption, { color: colors.textSecondary }]}>{sub}</Text>
    </View>
  );
}

const Legend = ({ label, color }: { label: string; color: string }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
    <View style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: color }} />
    <Text style={[type.caption, { color: colors.textSecondary }]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', gap: space.lg },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: space.md },
  box: { width: '47.5%', backgroundColor: colors.card, borderRadius: radius.lg, padding: space.lg, gap: 2 },
  legend: { flexDirection: 'row', gap: space.lg, marginTop: space.md },
  action: { padding: space.lg },
});
