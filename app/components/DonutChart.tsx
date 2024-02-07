"use client";

import React, { useEffect } from "react";
import { Chart } from "@antv/g2";

import { ChartProps, DonutChartData } from "../types";

const DonutChart: React.FC<ChartProps> = ({ covidStats }) => {
  useEffect(() => {
    const totalNewCases = covidStats.reduce(
      (sum, record) => sum + record.newCases,
      0
    );

    const chartData = covidStats.map(
      (record): DonutChartData => ({
        item: record.areaName,
        count: record.newCases,
        percent: record.newCases / totalNewCases,
      })
    );

    const chart = new Chart({
      container: "donut-chart-container",
      autoFit: true,
    });

    chart.coordinate({ type: "theta", outerRadius: 0.75, innerRadius: 0.6 });

    chart
      .interval()
      .transform({ type: "stackY" })
      .encode("y", "percent")
      .encode("color", "item")
      .legend("color", {
        position: "bottom",
        layout: { justifyContent: "center" },
      })
      .tooltip((data) => ({
        name: data.item,
        value: `${(data.percent * 100).toFixed(1)}%`,
      }));

    chart.data(chartData);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [covidStats]);

  return <div id="donut-chart-container" />;
};

export default DonutChart;
