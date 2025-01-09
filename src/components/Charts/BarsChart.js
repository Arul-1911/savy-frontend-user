import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  ReferenceLine,
} from "recharts";

const BarsChart = ({
  data,
  width,
  height,
  barWidth,
  gradient,
  gradientNumber,
  moneyIn,
  cashFlow,
  moneyInvsOut,
  cashFlowBar,
  netWorth,
  barGrad1,
  barGrad2,
  barGrad3,
  barGrad4,
  color,
}) => {
  const renderCustomizedLabel = (props) => {
    const { x, y, width, index } = props;
    const val = data[index]?.uv;

    return (
      <text
        x={x + width / 2}
        y={y - 10}
        fill="#004AAD"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {String(val)}
      </text>
    );
  };

  const legendPayload = [
    { value: data && data[0]?.name, type: "square", color: barGrad1 },
    { value: data && data[1]?.name, type: "square", color: barGrad3 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            backgroundColor: "white",
          }}
        >
          <p className="label">{`${label}`}</p>
          <p className="label">{`$:${String(payload[0].value)}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <defs>
          {gradient &&
            Array.from({ length: gradientNumber }, (_, index) => {
              const id = `colorUv${index}`;
              const startColor = index % 2 === 0 ? barGrad1 : barGrad3;
              const endColor = index % 2 === 0 ? barGrad2 : barGrad4;

              return (
                <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={startColor} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={endColor} stopOpacity={0.8} />
                </linearGradient>
              );
            })}
        </defs>
        {(moneyInvsOut || cashFlowBar) && (
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#5CB6F9", fontSize: 14, fontWeight: "bold" }}
            tickLine={false}
            tickMargin={10}
            interval={0}
          />
        )}
        <Tooltip content={<CustomTooltip />} />
        {cashFlow && (
          <Legend
            payload={legendPayload}
            align="right"
            verticalAlign="middle"
            layout="vertical"
          />
        )}
        {netWorth && <ReferenceLine y={0} stroke="#5CB6F9" />}
        <Bar
          dataKey="uv"
          radius={[10, 10, 10, 10]}
          label={moneyIn ? renderCustomizedLabel : null}
        >
          {moneyIn && (
            <LabelList dataKey="name" content={renderCustomizedLabel} />
          )}
          {data?.map((_, index) => (
            <Cell
              width={barWidth}
              key={`cell-${index}`}
              cursor="pointer"
              fill={`url(#colorUv${index})`}
              
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarsChart;
