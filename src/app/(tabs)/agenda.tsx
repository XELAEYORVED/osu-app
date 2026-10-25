// Agenda : écran provisoire (phase 3). Référence : design/screens/Agenda.png
import { Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Card, LargeTitle, Screen } from '@/components/ui';
import { colors, space, type } from '@/theme/tokens';

const COMING = [
  'Calendrier du mois avec pastilles : dojo, hors dojo, stage, compétition, passage de grade',
  'Compte à rebours de la prochaine compétition',
  '« J’y étais » sur les cours pour remplir le journal',
  'Synchronisation avec le calendrier de l’iPhone',
];

export default function AgendaScreen() {
  return (
    <Screen>
      <LargeTitle overline="[TON DOJO]" title="Agenda" />
      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm, marginBottom: space.sm }}>
          <Icon name="calendar" size={20} color={colors.accent} />
          <Text style={[type.headline, { color: colors.text }]}>Bientôt disponible</Text>
        </View>
        {COMING.map((c) => (
          <Text key={c} style={[type.subhead, { color: colors.textSecondary, marginTop: space.sm }]}>• {c}</Text>
        ))}
      </Card>
    </Screen>
  );
}
