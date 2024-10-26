import { useSuspenseQuery } from "@tanstack/react-query";
import themes from "daisyui/src/theming/themes";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { projectsTotalsQueryOptions } from "@/api/query-projects-totals";
import { useAppTheme } from "@/hooks/stores/app";

export const OverviewChart = () => {
  const { data } = useSuspenseQuery(projectsTotalsQueryOptions);
  const theme = useAppTheme();

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} title="Overview Bar Chart">
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          cursor={false}
          contentStyle={{
            backgroundColor: themes[theme]["base-100"],
            borderStyle: "none",
            borderRadius: "16px",
          }}
        />
        <Legend />
        <Bar
          dataKey="Backlog"
          stackId="b"
          fill={themes[theme].secondary}
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="Todo"
          stackId="t"
          fill={themes[theme].primary}
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="In Progress"
          stackId="ip"
          fill={themes[theme].accent}
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="Done"
          stackId="d"
          fill={themes[theme].success}
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="Canceled"
          stackId="c"
          fill={themes[theme].warning}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
