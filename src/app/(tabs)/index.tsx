// Écran « Aujourd'hui » (référence : design/screens/Main.png)
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Belt } from '@/components/Belt';
import { Icon } from '@/components/Icon';
import { Rings } from '@/components/Rings';
import { Card, ListRow, Screen, SectionTitle } from '@/components/ui';
import { getGrade } from '@/content/syllabus';
import { useStore } from '@/data/store';
import { formatLongCap, today } from '@/lib/dates';
import { seasonStartYear, seasonTotals } from '@/lib/stats';
import { colors, radius, space, type } from '@/theme/tokens';

const TRAINING_GOAL = 20; // entraînements conseillés avant le passage de grade

export default function TodayScreen() {
  const { state, isMastered } = useStore();
  const goal = getGrade(state.goalGradeId)!;
  const mastered = goal.techniques.filter((t) => isMastered(t.id)).length;
  const now = today();
  const totals = seasonTotals(state.sessions, seasonStartYear(now));
  const toReview = goal.techniques.filter((t) => !isMastered(t.id));
  const initials = state.profile.firstName.slice(0, 2).toUpperCase();

  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.logo} accessibilityLabel="Emplacement du logo">
          <Text style={{ color: colors.textSecondary, fontSize: 8, fontWeight: '600' }}>LOGO</Text>
        </View>
        <Pressable onPress={() => router.push('/profile')} style={styles.avatar} accessibilityRole="button" accessibilityLabel="Ouvrir le profil">
          <Text style={[type.footnote, { color: colors.text, fontWeight: '700' }]}>{initials}</Text>
        </Pressable>
      </View>
      <Text style={[type.overline, { color: colors.textSecondary, marginTop: space.lg }]}>{formatLongCap(now)}</Text>
      <Text style={[type.largeTitle, { color: colors.text, marginBottom: space.lg }]}>Bonjour {state.profile.firstName}</Text>

      <Pressable onPress={() => router.push({ pathname: '/grade/[id]', params: { id: goal.id } })}>
        <Card style={styles.goalCard}>
          <Rings
            size={128}
            rings={[
              { progress: mastered / goal.techniques.length, color: colors.ringTechniques },
              { progress: totals.dojoCount / TRAINING_GOAL, color: colors.ringTrainings },
            ]}
          />
          <View style={{ flex: 1, marginLeft: space.xl }}>
            <Text style={[type.footnote, { color: colors.textSecondary }]}>Objectif</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm }}>
              <Text style={[type.title2, { color: colors.text }]}>{goal.label}</Text>
              <Belt color={goal.belt} stripe={goal.stripe} />
            </View>
            <Text style={[type.footnote, { color: colors.ringTechniques, marginTop: space.sm }]}>Techniques</Text>
            <Text style={[type.title2, { color: colors.text }]}>
              {mastered}
              <Text style={[type.subhead, { color: colors.textSecondary }]}>/{goal.techniques.length}</Text>
            </Text>
            <Text style={[type.footnote, { color: colors.ringTrainings, marginTop: space.xs }]}>Entraînements</Text>
            <Text style={[type.title2, { color: colors.text }]}>
              {totals.dojoCount}
              <Text style={[type.subhead, { color: colors.textSecondary }]}>/{TRAINING_GOAL}</Text>
            </Text>
          </View>
        </Card>
      </Pressable>

      <Pressable onPress={() => router.push({ pathname: '/grade/[id]', params: { id: goal.id } })} style={styles.today}>
        <Text style={[type.overline, { color: '#fff' }]}>Séance du jour</Text>
        <Text style={[type.title, { color: '#fff', marginTop: 4 }]}>Kihon{'\n'}{goal.label}</Text>
        <View style={styles.todayFooter}>
          <View style={{ flexDirection: 'row', gap: space.xl }}>
            <TodayStat value="14" label="minutes" />
            <TodayStat value={String(goal.techniques.length)} label="techniques" />
            <TodayStat value="3" label="séries" />
          </View>
          <View style={styles.play}>
            <Icon name="play" size={22} color={colors.accentStrong} />
          </View>
        </View>
      </Pressable>

      <SectionTitle title="À revoir" />
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        {toReview.length === 0 ? (
          <ListRow title="Tout est maîtrisé, bravo !" subtitle="Passe au grade suivant dans Apprendre" last />
        ) : (
          toReview.slice(0, 4).map((t, i, arr) => (
            <ListRow
              key={t.id}
              title={t.name}
              subtitle={`${t.detail} · pas encore maîtrisé`}
              onPress={() => router.push({ pathname: '/technique/[id]', params: { id: t.id } })}
              last={i === arr.length - 1}
            />
          ))
        )}
      </Card>
    </Screen>
  );
}

function TodayStat({ value, label }: { value: string; label: string }) {
  return (
    <View>
      <Text style={[type.title2, { color: '#fff' }]}>{value}</Text>
      <Text style={[type.caption, { color: 'rgba(255,255,255,0.85)' }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logo: { width: 40, height: 40, borderRadius: 10, borderWidth: 1, borderStyle: 'dashed', borderColor: colors.separator, alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center' },
  goalCard: { flexDirection: 'row', alignItems: 'center' },
  today: { marginTop: space.lg, backgroundColor: colors.accentStrong, borderRadius: radius.lg, padding: space.lg },
  todayFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: space.lg },
  play: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', paddingLeft: 3 },
});
