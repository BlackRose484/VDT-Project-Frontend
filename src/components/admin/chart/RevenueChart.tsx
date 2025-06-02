import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import * as apiClient from "@/apis/admin.api";
import { useQuery } from "@tanstack/react-query";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register necessary chart components and plugins for use in the chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const RevenueChart: React.FC = () => {
  // State to store the selected year, defaulting to the current year
  const [year, setYear] = useState<number>(new Date().getFullYear());
  let revenueData: number[] = [];

  // Fetch revenue data from the API based on the selected year
  const { data: revenue } = useQuery({
    queryKey: ["get-revenue", year],
    queryFn: () =>
      apiClient.getRevenue({ year }).then((response) => response.data),
  });

  if (revenue) {
    revenueData = revenue;
  }

  // Find the maximum value in the revenue data and round it up to the nearest million
  const maxValue = Math.max(...revenueData);
  const roundedMax = Math.ceil(maxValue / 1000000) * 1000000;

  // Prepare chart data, including labels and datasets for plotting
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: `Revenue of months`,
        data: revenueData,
        backgroundColor: "rgba(62, 180, 244, 0.5)",
      },
    ],
  };

  // Configuration options for the chart
  const options = {
    responsive: true, // Make the chart responsive to different screen sizes
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      datalabels: {
        // Display labels for data points where the value is greater than 0
        display: (context: any) => context.dataset.data[context.dataIndex] > 0,
        color: "#000",
        font: {
          size: 12,
          weight: "bold" as "bold",
        },
        formatter: (value: number) => value.toLocaleString("vi-VN"), // Format the number as Vietnamese currency
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Revenue (VND)",
          font: {
            size: 14,
            weight: "bold" as "bold",
          },
        },
        ticks: {
          beginAtZero: true,
          stepSize: roundedMax / 5,
        },
        suggestedMax: roundedMax,
      },
      x: {
        title: {
          display: true,
          text: "Months",
          font: {
            size: 14,
            weight: "bold" as "bold",
          },
        },
      },
    },
  };

  return (
    <div>
      {/* Header with the selected year */}
      <h1 className="text-center">Revenue in {year} Chart</h1>
      {/* Input field for changing the year */}
      <div>
        <label htmlFor="year">Year: </label>
        <input
          type="number"
          id="year"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
        />
      </div>
      {/* Render the bar chart with the data and options */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default RevenueChart;
