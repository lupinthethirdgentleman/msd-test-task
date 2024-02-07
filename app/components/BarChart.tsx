"use client";

import React, { useEffect } from "react";
import { Chart } from "@antv/g2";

import { ChartProps, VaccineDoseTypeKey } from "../types";

const vaccineDoseTypes: VaccineDoseTypeKey[] = [
  "newPeopleVaccinatedFirstDoseByPublishDate",
  "newPeopleVaccinatedSecondDoseByPublishDate",
];

const BarChart: React.FC<ChartProps> = ({ covidStats }) => {
  useEffect(() => {
    if (!covidStats) return;

    const barChartData = covidStats.flatMap((country) =>
      vaccineDoseTypes.map((doseType) => ({
        country: country.areaName,
        doseType: doseType.endsWith("FirstDoseByPublishDate")
          ? "First Dose"
          : "Second Dose",
        cases: country[doseType],
      }))
    );

    const chart = new Chart({
      container: "bar-chart-container",
      autoFit: true,
    });

    chart
      .interval()
      .data(barChartData)
      .encode("x", "country")
      .encode("y", "cases")
      .encode("color", "doseType")
      .legend("color", {
        position: "bottom",
        layout: { justifyContent: "center" },
      })
      .transform({ type: "dodgeX" })
      .interaction("elementHighlight", { background: true });

    chart.render();

    return () => {
      chart.destroy();
    };
  }, [covidStats]);

  return <div id="bar-chart-container"></div>;
};

export default BarChart;
