// Fiche technique en 4 images clés (référence : design/screens/Technique_0.png)
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Card, PrimaryButton, Screen, SectionTitle } from '@/components/ui';
import { categoryLabels, getTechnique } from '@/content/syllabus';
import { useStore } from '@/data/store';
import { colors, radius, space, type } from '@/theme/tokens';

const STEP_MS = 1600;

export default function TechniqueScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const found = getTechnique(id);
  const { isMastered, toggleMastered } = useStore();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const steps = found?.technique.steps ?? [];

  // Lecture automatique des 4 images
  useEffect(() => {
    if (!playing || steps.length < 2) return;
    const t = setInterval(() => setStep((s) => (s + 1) % steps.length), STEP_MS);
    return () => clearInterval(t);
  }, [playing, steps.length]);

  if (!found) return <Screen edges="none"><Text style={{ color: colors.text }}>Technique introuvable.</Text></Screen>;
  const { technique: t, grade } = found;
  const done = isMastered(t.id);
  const current = steps[step];

  return (
    <Screen edges="none">
      <Text style={[type.overline, { color: colors.textSecondary }]}>
        {categoryLabels[t.category]} · {grade.label}
      </Text>
      <Text style={[type.title, { color: colors.text, marginBottom: space.lg }]}>{t.name}</Text>

      {steps.length ? (
        <>
          <View style={styles.panel}>
            <Text style={styles.counter}>
              {step + 1}
              <Text style={{ fontSize: 13, fontWeight: '500' }}> sur {steps.length}</Text>
            </Text>
            {current?.image ? <Image source={current.image} style={styles.image} resizeMode="contain" accessibilityLabel={`${t.name}, étape ${current.label}`} /> : null}
            <Pressable onPress={() => setPlaying((p) => !p)} style={styles.playBtn} accessibilityRole="button" accessibilityLabel={playing ? 'Pause' : 'Lecture'}>
              <Icon name={playing ? 'pause' : 'play'} size={16} color="#fff" />
            </Pressable>
          </View>

          <View style={styles.tabs}>
            {steps.map((s, i) => (
              <Pressable key={s.label} onPress={() => { setStep(i); setPlaying(false); }} style={[styles.tab, i === step && styles.tabOn]} accessibilityRole="tab" accessibilityState={{ selected: i === step }}>
                <View style={[styles.tabBar, { backgroundColor: i <= step ? colors.accent : colors.separator }]} />
                <Text style={[type.footnote, { color: i === step ? colors.text : colors.textSecondary, fontWeight: '600' }]}>{s.label}</Text>
              </Pressable>
            ))}
          </View>
          <Text style={[type.body, { color: colors.text, marginTop: space.lg }]}>{current?.text}</Text>
        </>
      ) : (
        <Card>
          <Text style={[type.headline, { color: colors.text }]}>Illustrations à venir</Text>
          <Text style={[type.subhead, { color: colors.textSecondary, marginTop: 4 }]}>
            {t.detail ? `${t.detail}. ` : ''}Les 4 images clés de cette technique arrivent dans une prochaine version.
          </Text>
        </Card>
      )}

      {t.facts ? (
        <View style={{ flexDirection: 'row', gap: space.sm, marginTop: space.lg }}>
          <Fact label="Position" value={t.facts.position} />
          <Fact label="Niveau" value={t.facts.level} />
          <Fact label="Hikite" value={t.facts.hikite} />
        </View>
      ) : null}

      {t.keyPoints ? (
        <>
          <SectionTitle title="Points clés" />
          <Card>
            {t.keyPoints.map((k, i) => (
              <View key={k} style={styles.point}>
                <Text style={styles.pointNum}>{i + 1}</Text>
                <Text style={[type.subhead, { color: colors.text, flex: 1 }]}>{k}</Text>
              </View>
            ))}
          </Card>
        </>
      ) : null}

      {t.mistakes ? (
        <>
          <SectionTitle title="Erreurs fréquentes" />
          <Card>
            {t.mistakes.map((m) => (
              <View key={m} style={styles.point}>
                <Icon name="close" size={16} color={colors.accent} strokeWidth={2.4} />
                <Text style={[type.subhead, { color: colors.text, flex: 1 }]}>{m}</Text>
              </View>
            ))}
          </Card>
        </>
      ) : null}

      <View style={{ marginTop: space.xxl }}>
        <PrimaryButton label={done ? 'Maîtrisée ✓ (annuler)' : 'Marquer comme maîtrisée'} onPress={() => toggleMastered(t.id)} variant={done ? 'dark' : 'white'} />
      </View>
    </Screen>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.fact}>
      <Text style={[type.caption, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[type.headline, { color: colors.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { backgroundColor: '#F2EFE8', borderRadius: radius.xl, height: 380, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  image: { width: '100%', height: '100%' },
  counter: { position: 'absolute', top: 14, left: 16, zIndex: 1, color: '#1C1C1E', fontSize: 26, fontWeight: '700' },
  playBtn: { position: 'absolute', right: 14, bottom: 14, width: 36, height: 36, borderRadius: 18, backgroundColor: '#1C1C1E', alignItems: 'center', justifyContent: 'center' },
  tabs: { flexDirection: 'row', gap: space.sm, marginTop: space.md },
  tab: { flex: 1, paddingVertical: space.sm, paddingHorizontal: space.sm, borderRadius: radius.sm },
  tabOn: { backgroundColor: colors.card },
  tabBar: { height: 3, borderRadius: 2, marginBottom: 6 },
  fact: { flex: 1, backgroundColor: colors.card, borderRadius: radius.md, padding: space.md },
  point: { flexDirection: 'row', gap: space.md, paddingVertical: space.sm, alignItems: 'flex-start' },
  pointNum: { color: colors.accent, fontWeight: '700', width: 16, fontSize: 15 },
});
