import { useSuspenseQuery } from "@tanstack/react-query";
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

export const OverviewChart = () => {
  const { data } = useSuspenseQuery(projectsTotalsQueryOptions);

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
            backgroundColor: "var(--color-base-100)",
            borderStyle: "none",
            borderRadius: "16px",
          }}
        />
        <Legend />
        <Bar
          dataKey="Backlog"
          fill="var(--color-secondary)"
          radius={[4, 4, 0, 0]}
        />
        <Bar dataKey="Todo" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
        <Bar
          dataKey="In Progress"
          fill="var(--color-accent)"
          radius={[4, 4, 0, 0]}
        />
        <Bar dataKey="Done" fill="var(--color-success)" radius={[4, 4, 0, 0]} />
        <Bar
          dataKey="Canceled"
          fill="var(--color-warning)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
