// Anneaux de progression façon Apple Fitness.
import { Text, View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { colors } from '@/theme/tokens';

type Ring = { progress: number; color: string };

export function Rings({ rings, size = 120, stroke = 14, gap = 4 }: { rings: Ring[]; size?: number; stroke?: number; gap?: number }) {
  const c = size / 2;
  return (
    <Svg width={size} height={size}>
      <G rotation={-90} origin={`${c}, ${c}`}>
        {rings.map((r, i) => {
          const radius = c - stroke / 2 - i * (stroke + gap);
          const len = 2 * Math.PI * radius;
          const p = Math.max(0, Math.min(1, r.progress));
          return (
            <G key={i}>
              <Circle cx={c} cy={c} r={radius} stroke={r.color} strokeOpacity={0.22} strokeWidth={stroke} fill="none" />
              <Circle
                cx={c}
                cy={c}
                r={radius}
                stroke={r.color}
                strokeWidth={stroke}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${len} ${len}`}
                strokeDashoffset={len * (1 - p)}
              />
            </G>
          );
        })}
      </G>
    </Svg>
  );
}

/** Anneau simple avec un texte au centre (ex. « 6/9 ») */
export function RingLabel({ progress, label, size = 64, stroke = 7, color = colors.accent }: { progress: number; label: string; size?: number; stroke?: number; color?: string }) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ position: 'absolute' }}>
        <Rings rings={[{ progress, color }]} size={size} stroke={stroke} />
      </View>
      <Text style={{ color: colors.text, fontWeight: '700', fontSize: size * 0.24, fontVariant: ['tabular-nums'] }}>{label}</Text>
    </View>
  );
}
