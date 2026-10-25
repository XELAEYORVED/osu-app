// Kumite : minuteur de rounds fonctionnel (référence : design/screens/Training.png).
// Le bilan de saison et le carnet de combats arrivent en phase 3.
import * as Haptics from 'expo-haptics';
import { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Rings } from '@/components/Rings';
import { Card, LargeTitle, ListRow, Screen } from '@/components/ui';
import { colors, space, type } from '@/theme/tokens';

const FIGHT = 120;
const REST = 30;
const ROUNDS = 5;

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
const buzz = () => {
  if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
};

export default function KumiteScreen() {
  const [running, setRunning] = useState(false);
  const [rest, setRest] = useState(false);
  const [left, setLeft] = useState(FIGHT);
  const [round, setRound] = useState(1);
  const [finished, setFinished] = useState(false);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    tick.current = setInterval(() => setLeft((l) => l - 1), 1000);
    return () => {
      if (tick.current) clearInterval(tick.current);
    };
  }, [running]);

  // Passage combat → repos → round suivant
  useEffect(() => {
    if (left > 0) return;
    buzz();
    if (!rest) {
      if (round >= ROUNDS) {
        setRunning(false);
        setFinished(true);
        setLeft(0);
        return;
      }
      setRest(true);
      setLeft(REST);
    } else {
      setRest(false);
      setRound((r) => r + 1);
      setLeft(FIGHT);
    }
  }, [left, rest, round]);

  const reset = () => {
    setRunning(false);
    setRest(false);
    setLeft(FIGHT);
    setRound(1);
    setFinished(false);
  };

  const total = rest ? REST : FIGHT;
  const color = rest ? '#30D158' : colors.accent;

  return (
    <Screen>
      <LargeTitle overline="Minuteur de rounds" title="Kumite" />

      <View style={{ alignItems: 'center', marginTop: space.md }}>
        <View style={{ width: 260, height: 260, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ position: 'absolute' }}>
            <Rings size={260} stroke={12} rings={[{ progress: finished ? 1 : left / total, color }]} />
          </View>
          <Text style={[type.overline, { color }]}>{finished ? 'Terminé' : rest ? 'Repos' : 'Combat'}</Text>
          <Text style={styles.time} accessibilityLiveRegion="polite">{fmt(Math.max(0, left))}</Text>
          <Text style={[type.subhead, { color: colors.textSecondary }]}>Round {round} sur {ROUNDS}</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <Pressable onPress={reset} style={[styles.ctrl, { backgroundColor: '#333' }]} accessibilityRole="button">
          <Text style={[type.headline, { color: colors.text }]}>Réinit.</Text>
        </Pressable>
        <Pressable
          onPress={() => (finished ? reset() : setRunning((r) => !r))}
          style={[styles.ctrl, { backgroundColor: running ? '#3A2A0A' : '#0F3D1E' }]}
          accessibilityRole="button"
        >
          <Text style={[type.headline, { color: running ? colors.ringTrainings : colors.success }]}>{running ? 'Pause' : 'Hajime'}</Text>
        </Pressable>
      </View>

      <Card style={{ padding: 0, overflow: 'hidden', marginTop: space.xl }}>
        <ListRow title="Rounds" right={<Text style={styles.val}>{ROUNDS}</Text>} />
        <ListRow title="Combat" right={<Text style={styles.val}>{fmt(FIGHT)}</Text>} />
        <ListRow title="Repos" right={<Text style={styles.val}>{fmt(REST)}</Text>} last />
      </Card>
      <Text style={[type.footnote, { color: colors.textTertiary, marginTop: space.md }]}>
        Phase 3 : réglages des rounds, bilan de la saison et carnet de combats.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  time: { color: colors.text, fontSize: 72, fontWeight: '200', fontVariant: ['tabular-nums'] },
  controls: { flexDirection: 'row', justifyContent: 'space-between', marginTop: space.lg },
  ctrl: { width: 88, height: 88, borderRadius: 44, alignItems: 'center', justifyContent: 'center' },
  val: { color: colors.textSecondary, fontSize: 17, fontVariant: ['tabular-nums'] },
});
