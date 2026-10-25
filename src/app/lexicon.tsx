// Lexique : les mots qui reviennent dans les noms de techniques, par catégorie
import { StyleSheet, Text, View } from 'react-native';
import { Card, Screen, SectionTitle } from '@/components/ui';
import { lexicon } from '@/content/lexicon';
import { colors, space, type } from '@/theme/tokens';

export default function LexiconScreen() {
  return (
    <Screen edges="none">
      <Text style={[type.subhead, { color: colors.textSecondary }]}>
        Un nom de technique se lit presque toujours comme arme + niveau + direction + action. Exemple : Seiken
        (poing) chudan (milieu) uchi (de l’intérieur) uke (blocage).
      </Text>

      {lexicon.map((group) => (
        <View key={group.id}>
          <SectionTitle title={group.title} />
          <Card style={{ paddingVertical: space.xs }}>
            {group.entries.map((e, i) => (
              <View key={e.term} style={[styles.row, i === group.entries.length - 1 && styles.last]}>
                <Text style={[type.headline, styles.term]}>{e.term}</Text>
                <Text style={[type.subhead, styles.meaning]}>{e.meaning}</Text>
              </View>
            ))}
          </Card>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: space.md,
    paddingVertical: space.sm + 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
  },
  last: { borderBottomWidth: 0 },
  term: { color: colors.text, width: 104 },
  meaning: { color: colors.textSecondary, flex: 1 },
});
