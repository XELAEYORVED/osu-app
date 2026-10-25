import { Tabs } from 'expo-router';
import type { ColorValue } from 'react-native';
import { Icon, type IconName } from '@/components/Icon';
import { colors } from '@/theme/tokens';

const tab = (title: string, icon: IconName) => ({
  title,
  tabBarIcon: ({ color }: { color: ColorValue }) => <Icon name={icon} size={24} color={String(color ?? '#8E8E93')} />,
});

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: { backgroundColor: 'rgba(18,18,18,0.96)', borderTopColor: colors.separator },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '500' },
        sceneStyle: { backgroundColor: colors.bg },
      }}
    >
      <Tabs.Screen name="index" options={tab('Aujourd’hui', 'home')} />
      <Tabs.Screen name="learn" options={tab('Apprendre', 'book')} />
      <Tabs.Screen name="kumite" options={tab('Kumite', 'fist')} />
      <Tabs.Screen name="agenda" options={tab('Agenda', 'calendar')} />
      <Tabs.Screen name="journal" options={tab('Journal', 'journal')} />
    </Tabs>
  );
}
