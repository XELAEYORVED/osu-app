// Grille d'activité de la saison façon GitHub : une colonne par semaine, une ligne par jour.
import { ScrollView, Text, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import type { Session } from '@/data/types';
import { addDays, fromISODate, monthShort } from '@/lib/dates';
import { activityByDay, cellLevel, seasonBounds, seasonWeeks } from '@/lib/stats';
import { activity, colors, type } from '@/theme/tokens';

const CELL = 11;
const GAP = 3;
const DAY_LABELS = ['L', '', 'Me', '', 'V', '', ''];

export function ActivityGrid({ sessions, startYear, today }: { sessions: Session[]; startYear: number; today: string }) {
  const weeks = seasonWeeks(startYear);
  const map = activityByDay(sessions);
  const { start, end } = seasonBounds(startYear);
  const width = weeks.length * (CELL + GAP);

  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ marginTop: 16, marginRight: 6 }}>
        {DAY_LABELS.map((d, i) => (
          <Text key={i} style={{ height: CELL + GAP, fontSize: 9, color: colors.textSecondary }}>
            {d}
          </Text>
        ))}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <View style={{ height: 16, width, flexDirection: 'row' }}>
            {weeks.map((w, i) => {
              const month = fromISODate(addDays(w, 6)).getMonth();
              const isFirst = i === 0 || fromISODate(addDays(weeks[i - 1], 6)).getMonth() !== month;
              return (
                <Text key={w} style={{ position: 'absolute', left: i * (CELL + GAP), ...type.caption, fontSize: 9, color: colors.textSecondary }}>
                  {isFirst ? monthShort(month) : ''}
                </Text>
              );
            })}
          </View>
          <Svg width={width} height={7 * (CELL + GAP)}>
            <Defs>
              <LinearGradient id="both" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0.5" stopColor={activity.dojo[2]} />
                <Stop offset="0.5" stopColor={activity.outside[2]} />
              </LinearGradient>
            </Defs>
            {weeks.map((w, wi) =>
              Array.from({ length: 7 }, (_, di) => {
                const date = addDays(w, di);
                const out = date < start || date > end;
                const a = map.get(date);
                let fill: string = activity.empty;
                if (a) {
                  const lvl = cellLevel(a.minutes) - 1;
                  fill = a.dojo && a.outside ? 'url(#both)' : a.dojo ? activity.dojo[lvl] : activity.outside[lvl];
                }
                return (
                  <Rect
                    key={date}
                    x={wi * (CELL + GAP)}
                    y={di * (CELL + GAP)}
                    width={CELL}
                    height={CELL}
                    rx={2.5}
                    fill={fill}
                    opacity={out ? 0.25 : date > today ? 0.45 : 1}
                    stroke={date === today ? '#FFFFFF' : undefined}
                    strokeWidth={date === today ? 1.2 : 0}
                  />
                );
              }),
            )}
          </Svg>
        </View>
      </ScrollView>
    </View>
  );
}
