// * NPM
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Chart, useChart } from "@chakra-ui/charts";
import dayjs from "dayjs";

export default function TransactionsChart() {
  let _transactions: { date: string; amount: number }[] = [];

  for (let d = 1; d <= 30; d++)
    _transactions.push({
      date: dayjs(new Date(2022, 3, 30))
        .subtract(d, "day")
        .format("MMMM DD, YYYY"),
      amount: Math.floor(Math.random() * 100),
    });

  const transactions = _transactions
    .sort((a: any, b: any) => a.date - b.date)
    .reverse();

  const chart = useChart({
    data: transactions,
    series: [{ name: "amount", color: "orange.solid" }],
  });

  return (
    <Chart.Root maxH="sm" chart={chart}>
      <LineChart data={chart.data}>
        <CartesianGrid stroke={chart.color("border")} vertical={false} />
        <XAxis
          axisLine={false}
          dataKey={chart.key("date")}
          //tickFormatter={(value) => value.slice(0, 3)}
          stroke={chart.color("border")}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          stroke={chart.color("border")}
        />
        <Tooltip
          animationDuration={100}
          cursor={false}
          content={<Chart.Tooltip />}
        />
        {chart.series.map((item) => (
          <Line
            key={item.name}
            isAnimationActive={false}
            dataKey={chart.key(item.name)}
            stroke={chart.color(item.color)}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </Chart.Root>
  );
}
