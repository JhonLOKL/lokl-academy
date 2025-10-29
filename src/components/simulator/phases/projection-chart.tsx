"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ProjectionChartProps {
  chartData: Array<{
    year: string;
    valorization: number;
    income: number;
    return: number;
  }>;
}

export default function ProjectionChart({ chartData }: ProjectionChartProps) {
  const chartKey = `chart-${chartData[0]?.valorization}-${chartData[0]?.income}`;

  return (
    <>
      <ResponsiveContainer width="100%" height={280} key={chartKey}>
        <BarChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fill: "#64748b", fontSize: 13, fontWeight: 500 }}
            axisLine={{ stroke: "#e2e8f0" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#64748b", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            label={{
              value: "Millones COP",
              angle: -90,
              position: "insideLeft",
              fill: "#64748b",
              style: { fontSize: 12 },
            }}
            tickFormatter={(value) => `${value.toFixed(1)}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "none",
              borderRadius: "12px",
              boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.1)",
              padding: "12px",
            }}
            labelStyle={{ fontWeight: "bold", color: "#1e293b", marginBottom: "8px" }}
            formatter={(value: number, name: string) => {
              if (name === "Valorización" || name === "Utilidades") {
                return [`$${value.toFixed(2)}M`, name];
              }
              return [`${value.toFixed(2)}%`, name];
            }}
            cursor={{ fill: "rgba(99, 102, 241, 0.05)" }}
          />
          <Bar
            dataKey="valorization"
            fill="#6366f1"
            name="Valorización"
            radius={[8, 8, 0, 0]}
            maxBarSize={60}
          />
          <Bar
            dataKey="income"
            fill="#10b981"
            name="Utilidades"
            radius={[8, 8, 0, 0]}
            maxBarSize={60}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Tags de rentabilidad exactamente debajo de cada año */}
      <div className="relative mt-2" style={{ marginLeft: "65px", marginRight: "0px" }} key={`tags-${chartKey}`}>
        <div className="grid grid-cols-5 gap-0">
          {chartData.map((data, index) => (
            <div key={`tag-${index}-${data.return}`} className="flex justify-center items-center">
              <div className="inline-flex items-center gap-1.5 px-2 py-1 md:px-3 md:py-1.5 bg-white border-2 border-[#5352F6] rounded-full">
                <span className="text-xs md:text-sm font-semibold text-[#5352F6]">
                  {data.return.toFixed(2)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

