// Fiche d'un grade : checklist des techniques (référence : design/screens/Grade.png)
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Belt } from '@/components/Belt';
import { Icon } from '@/components/Icon';
import { RingLabel } from '@/components/Rings';
import { Card, ListRow, Screen, SectionTitle } from '@/components/ui';
import { categoryLabels, getGrade, type Category } from '@/content/syllabus';
import { useStore } from '@/data/store';
import { colors, radius, space, type } from '@/theme/tokens';

export default function GradeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const grade = getGrade(id);
  const { isMastered, toggleMastered } = useStore();
  if (!grade) return <Screen edges="none"><Text style={{ color: colors.text }}>Grade introuvable.</Text></Screen>;

  const mastered = grade.techniques.filter((t) => isMastered(t.id)).length;
  const total = grade.techniques.length;
  const categories = [...new Set(grade.techniques.map((t) => t.category))] as Category[];

  return (
    <Screen edges="none">
      <View style={styles.hero}>
        <RingLabel progress={total ? mastered / total : 0} label={`${mastered}/${total}`} size={88} stroke={10} />
        <View style={{ flex: 1, marginLeft: space.lg }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm }}>
            <Belt color={grade.belt} stripe={grade.stripe} />
            <Text style={[type.subhead, { color: colors.textSecondary }]}>{grade.beltName}</Text>
          </View>
          <Text style={[type.largeTitle, { color: colors.text }]}>{grade.label}</Text>
          <Text style={[type.footnote, { color: colors.textSecondary }]}>
            {total ? Math.round((mastered / total) * 100) : 0} % des techniques maîtrisées
          </Text>
        </View>
      </View>

      {grade.exam ? (
        <View style={{ flexDirection: 'row', gap: space.sm, marginTop: space.lg }}>
          <Info label="Entraînements" value={grade.exam.duration} />
          <Info label="Frais" value={grade.exam.fee} />
          <Info label="Examen" value={grade.exam.place} />
        </View>
      ) : null}

      {categories.map((cat) => {
        const list = grade.techniques.filter((t) => t.category === cat);
        return (
          <View key={cat}>
            <SectionTitle title={categoryLabels[cat]} />
            <Card style={{ padding: 0, overflow: 'hidden' }}>
              {list.map((t, i) => {
                const done = isMastered(t.id);
                return (
                  <ListRow
                    key={t.id}
                    title={t.name}
                    subtitle={t.detail || undefined}
                    left={
                      <Pressable
                        onPress={() => toggleMastered(t.id)}
                        hitSlop={10}
                        accessibilityRole="checkbox"
                        accessibilityState={{ checked: done }}
                        accessibilityLabel={`${t.name} maîtrisé`}
                        style={[styles.check, done && styles.checkOn]}
                      >
                        {done ? <Icon name="check" size={14} color="#fff" strokeWidth={3} /> : null}
                      </Pressable>
                    }
                    onPress={() => router.push({ pathname: '/technique/[id]', params: { id: t.id } })}
                    last={i === list.length - 1}
                  />
                );
              })}
            </Card>
          </View>
        );
      })}

      {grade.stamina ? (
        <>
          <SectionTitle title="Stamina" />
          <Card style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Mini value={grade.stamina.squats} label="Jumping squats" />
            <Mini value={grade.stamina.situps} label="Sit-ups" />
            <Mini value={grade.stamina.pushups} label="Push-ups" />
          </Card>
        </>
      ) : null}

      {grade.knowledge ? (
        <>
          <SectionTitle title="Connaissances" />
          <Card style={{ padding: 0, overflow: 'hidden' }}>
            {grade.knowledge.map((k, i) => (
              <ListRow key={k} title={k} last={i === grade.knowledge!.length - 1} />
            ))}
          </Card>
        </>
      ) : null}
    </Screen>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.info}>
      <Text style={[type.caption, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[type.headline, { color: colors.text }]}>{value}</Text>
    </View>
  );
}

function Mini({ value, label }: { value: number; label: string }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={[type.title2, { color: colors.text }]}>{value}</Text>
      <Text style={[type.caption, { color: colors.textSecondary }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { flexDirection: 'row', alignItems: 'center' },
  info: { flex: 1, backgroundColor: colors.card, borderRadius: radius.md, padding: space.md },
  check: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: colors.separator, alignItems: 'center', justifyContent: 'center' },
  checkOn: { backgroundColor: colors.accent, borderColor: colors.accent },
});
