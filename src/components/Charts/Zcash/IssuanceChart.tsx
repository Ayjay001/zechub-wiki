import { Spinner } from "flowbite-react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useIssuanceData } from "@/hooks/useIssuanceData";
import { useResponsiveFontSize } from "@/hooks/useResponsiveFontSize";
import { DATA_URL } from "@/lib/chart/data-url";

type IssuanceChartProps = {};

// Parse data and preload

export default function IssuanceChart(props: IssuanceChartProps) {
  const { data, loading } = useIssuanceData(DATA_URL.issuanceUrl);
  const fontSize = useResponsiveFontSize(); // optional: pass min/max

  return (
    <div className="space-y-6">
      <div className="flex mt-12">
        <h3 className="text-lg font-semibold mb-4 flex-1">
          ZEC Issuance vs. Inflation Rate
        </h3>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <ComposedChart data={data}>
            <defs>
              <linearGradient
                id="inflationGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#ff6b6b" // vivid red
                  stopOpacity={0.9}
                />
                <stop
                  offset="100%"
                  stopColor="#ff6b6b" // vivid red
                  stopOpacity={0.3}
                />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
            <XAxis dataKey="date" tick={{ fontSize, fill: "#94a3b8" }} />
            <YAxis
              yAxisId="left"
              tick={{ fontSize, fill: "#94a3b8" }}
              width={60}
              label={{ value: "Issuance", angle: -90, position: "insideLeft" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize, fill: "#94a3b8" }}
              width={60}
              label={{
                value: "Inflation (%)",
                angle: 90,
                position: "insideRight",
              }}
            />
            <Tooltip formatter={(v: any) => v.toLocaleString()} />
            <Legend />

            <Bar
              yAxisId="left"
              dataKey="issuance"
              fill="hsl(var(--chart-1))"
              radius={[4, 4, 0, 0]}
            />

            <Area
              yAxisId="right"
              type="monotone"
              dataKey="inflation"
              stroke="hsl(var(--chart-5))"
              fill="url(#inflationGradient)"
              fillOpacity={1} // ✅ max fill visibility
              strokeWidth={2}
            />
          </ComposedChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
