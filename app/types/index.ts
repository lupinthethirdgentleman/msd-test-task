/**
 * Interface for Covid data.
 */
export interface CovidData {
  date: string;
  newCases: number;
  areaName: string;
  areaCode: string;
  newPeopleVaccinatedFirstDoseByPublishDate: number;
  newPeopleVaccinatedSecondDoseByPublishDate: number;
}

/**
 * Interface for chart properties.
 */
export interface ChartProps {
  covidStats: CovidData[];
}

/**
 * Interface for data used in a donut chart.
 */
export interface DonutChartData {
  item: string;   // Represents the category name in the chart
  count: number;  // The numerical value for the category
  percent: number; // The percentage representation of count
}

/**
 * Interface for data used in a line chart.
 */
export interface LineChartData {
  country: string;
  name: string;   // Represents the category or series name
  amount: number; // The numerical value for the series
}

/**
 * Type for keys identifying vaccine doses.
 */
export type VaccineDoseTypeKey =
  | "newPeopleVaccinatedFirstDoseByPublishDate"
  | "newPeopleVaccinatedSecondDoseByPublishDate";
