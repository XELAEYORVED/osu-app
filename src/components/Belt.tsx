import { View } from 'react-native';
import { belt } from '@/theme/tokens';
import type { BeltColor } from '@/content/syllabus';

/** Petite ceinture colorée, avec la barrette noire des grades intermédiaires */
export function Belt({ color, stripe, width = 28 }: { color: BeltColor; stripe?: boolean; width?: number }) {
  return (
    <View
      style={{
        width,
        height: 8,
        borderRadius: 3,
        backgroundColor: belt[color],
        borderWidth: color === 'black' ? 1 : 0,
        borderColor: '#555',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 4,
      }}
    >
      {stripe ? <View style={{ width: 4, height: 8, backgroundColor: '#111' }} /> : null}
    </View>
  );
}
