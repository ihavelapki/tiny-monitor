import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { HostMetricSeries } from '../model/types';
import { buildChartData } from '../lib/buildChartData';

type HostMetricChartProps = {
  title: string;
  series: HostMetricSeries[];
  metricKey: 'cpuUsagePercent' | 'memoryUsagePercent';
};

export const HostMetricChart = ({ title, series, metricKey }: HostMetricChartProps) => {
  const chartData = buildChartData(series, metricKey);

  return (
    <div className="surface-card metric-chart-card">
      <h3>{title}</h3>

      <div className="metric-chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(value) =>
                new Date(String(value)).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              }
            />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />

            {series.map((hostSeries) => (
              <Line
                key={hostSeries.serverAlias}
                type="monotone"
                dataKey={hostSeries.serverAlias}
                dot={false}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};