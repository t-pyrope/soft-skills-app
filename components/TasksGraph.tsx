import {Dimensions} from 'react-native';
import { ContributionGraph } from 'react-native-chart-kit';
import dateformat from 'dateformat';
import { processFontFamily } from 'expo-font';

import { useAppContext } from '@/context/AppContext';

export const TasksGraph = () => {
    const { doneTasks } = useAppContext();
    const graphWidth = Dimensions.get('window').width - 25;

    const commitsData = doneTasks.reduce(
        (acc, next) => {
            const date = dateformat(next.date, 'isoDate');
            const existing = acc.find((commit) => commit.date === date);

            if (existing) {
                return acc.map((commit) =>
                    commit.date === date ? { ...commit, count: commit.count++ } : { ...commit },
                );
            } else {
                return [...acc, { date, count: 1 }];
            }
        },
        [] as { date: string; count: number }[],
    );

    return (
        <ContributionGraph
            values={commitsData}
            endDate={new Date()}
            numDays={70}
            width={graphWidth}
            height={220}
            gutterSize={2}
            chartConfig={{
                backgroundColor: '#f6f6f6',
                backgroundGradientFrom: '#f6f6f6',
                backgroundGradientTo: '#f6f6f6',
                color: (opacity = 1) => `rgba(135, 211, 124, ${opacity})`,
                labelColor: (opacity = 1) => `#181818`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: 'red',
                },
                propsForLabels: { fontFamily: processFontFamily('Helvetica') ?? undefined }
            }}
            tooltipDataAttrs={() => {
                return {rx: 4, ry: 4};
            }}
            getMonthLabel={(monthIndex) => dateformat(new Date().setMonth(monthIndex), 'mmmm')}
        />
    );
};
