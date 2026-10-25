// Écran « Apprendre » : liste des grades (référence : design/screens/Syllabus.png)
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Belt } from '@/components/Belt';
import { Icon } from '@/components/Icon';
import { RingLabel } from '@/components/Rings';
import { Card, LargeTitle, ListRow, Screen, Segmented } from '@/components/ui';
import { getGrade, grades } from '@/content/syllabus';
import { useStore } from '@/data/store';
import { colors, radius, space, type } from '@/theme/tokens';

export default function LearnScreen() {
  const { state, isMastered } = useStore();
  const [tab, setTab] = useState<'kyu' | 'dan'>('kyu');
  const goal = getGrade(state.goalGradeId)!;
  const mastered = goal.techniques.filter((t) => isMastered(t.id)).length;
  const list = grades.filter((g) => g.kind === tab);

  return (
    <Screen>
      <LargeTitle title="Apprendre" />

      <View style={{ flexDirection: 'row', gap: space.md }}>
        <Tile title="Examen blanc" subtitle="Bientôt" icon="check" color={colors.success} />
        <Tile title="Lexique" subtitle="Bientôt" icon="book" color="#64D2FF" />
      </View>

      <Pressable onPress={() => router.push({ pathname: '/grade/[id]', params: { id: goal.id } })} style={{ marginTop: space.md }}>
        <Card style={styles.goal}>
          <View style={{ flex: 1 }}>
            <Text style={[type.overline, { color: colors.ringTrainings }]}>Ton objectif</Text>
            <Text style={[type.title, { color: colors.text }]}>{goal.label}</Text>
            <Text style={[type.subhead, { color: colors.textSecondary }]}>{goal.beltName}</Text>
          </View>
          <RingLabel progress={mastered / goal.techniques.length} label={`${mastered}/${goal.techniques.length}`} />
        </Card>
      </Pressable>

      <View style={{ marginVertical: space.lg }}>
        <Segmented options={[{ value: 'kyu', label: 'Kyu' }, { value: 'dan', label: 'Dan' }]} value={tab} onChange={setTab} />
      </View>

      <Card style={{ padding: 0, overflow: 'hidden' }}>
        {list.map((g, i) => (
          <ListRow
            key={g.id}
            title={g.label}
            subtitle={`${g.beltName} · ${g.techniques.slice(0, 3).map((t) => t.name).join(', ')}`}
            left={<Belt color={g.belt} stripe={g.stripe} />}
            onPress={() => router.push({ pathname: '/grade/[id]', params: { id: g.id } })}
            last={i === list.length - 1}
          />
        ))}
      </Card>
    </Screen>
  );
}

function Tile({ title, subtitle, icon, color }: { title: string; subtitle: string; icon: 'check' | 'book'; color: string }) {
  return (
    <View style={styles.tile}>
      <Icon name={icon} size={22} color={color} />
      <Text style={[type.headline, { color: colors.text, marginTop: space.lg }]}>{title}</Text>
      <Text style={[type.footnote, { color: colors.textSecondary }]}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  goal: { flexDirection: 'row', alignItems: 'center', borderTopWidth: 3, borderTopColor: colors.ringTrainings },
  tile: { flex: 1, backgroundColor: colors.card, borderRadius: radius.lg, padding: space.lg },
});
