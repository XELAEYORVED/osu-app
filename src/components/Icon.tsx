// Icônes dessinées en SVG (pas de dépendance d'icônes externe).
import Svg, { Circle, Path, Rect } from 'react-native-svg';

export type IconName =
  | 'home' | 'book' | 'fist' | 'calendar' | 'journal' | 'plus' | 'chevron-right' | 'chevron-left'
  | 'check' | 'play' | 'pause' | 'reset' | 'close' | 'bulb' | 'person';

type Props = { name: IconName; size?: number; color?: string; strokeWidth?: number };

export function Icon({ name, size = 24, color = '#fff', strokeWidth = 1.8 }: Props) {
  const p = { stroke: color, strokeWidth, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'home' && <Path {...p} d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z" />}
      {name === 'book' && (
        <>
          <Rect {...p} x={5} y={3} width={14} height={18} rx={2} />
          <Path {...p} d="M9 3v18M12 8h4M12 12h4" />
        </>
      )}
      {name === 'fist' && (
        <>
          <Path {...p} d="M7 11V7.5a1.5 1.5 0 0 1 3 0V11M10 10V6.5a1.5 1.5 0 0 1 3 0V10M13 10V7a1.5 1.5 0 0 1 3 0v3.5" />
          <Path {...p} d="M16 10.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-1a5 5 0 0 1-5-5v-3.5a1.5 1.5 0 0 1 3 0" />
        </>
      )}
      {name === 'calendar' && (
        <>
          <Rect {...p} x={3.5} y={5} width={17} height={15.5} rx={2.5} />
          <Path {...p} d="M3.5 10h17M8 3v4M16 3v4" />
        </>
      )}
      {name === 'journal' && (
        <>
          <Path {...p} d="M6 3h9l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
          <Path {...p} d="M8.5 11h7M8.5 14.5h7M8.5 18h4" />
        </>
      )}
      {name === 'plus' && <Path {...p} d="M12 5v14M5 12h14" />}
      {name === 'chevron-right' && <Path {...p} d="m9.5 6 6 6-6 6" />}
      {name === 'chevron-left' && <Path {...p} d="m14.5 6-6 6 6 6" />}
      {name === 'check' && <Path {...p} d="m5 12.5 4.5 4.5L19 7.5" />}
      {name === 'play' && <Path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" fill={color} />}
      {name === 'pause' && (
        <>
          <Rect x={6.5} y={5} width={4} height={14} rx={1.2} fill={color} />
          <Rect x={13.5} y={5} width={4} height={14} rx={1.2} fill={color} />
        </>
      )}
      {name === 'reset' && <Path {...p} d="M4 12a8 8 0 1 0 2.5-5.8M4 4.5v4h4" />}
      {name === 'close' && <Path {...p} d="M6 6l12 12M18 6 6 18" />}
      {name === 'bulb' && <Path {...p} d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z" />}
      {name === 'person' && (
        <>
          <Circle {...p} cx={12} cy={8} r={4} />
          <Path {...p} d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
        </>
      )}
    </Svg>
  );
}
