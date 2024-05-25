import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export const AverageGrades = ({ averageGrades }: any) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={averageGrades}>
        <XAxis dataKey="curso" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
        domain={[0, 5]}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="promedio" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  );
};
