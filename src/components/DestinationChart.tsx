import React, { useEffect, useState } from "react";
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
import ChartDataLabels from "chartjs-plugin-datalabels";
import * as apiClient from "../apis/admin.api";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const DestinationChart: React.FC = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear()); // Store the selected year for the chart
  const [chartData, setChartData] = useState<any>(null); // Store the chart data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.getPopular({ year });
        const data = response.data; // Array of 12 items, each containing the top 3 destinations for each month

        const labels = [
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
        ];

        const datasets: any[] = []; // Array to hold datasets for the chart
        let maxBooking = 0; // Variable to track the maximum number of bookings for any destination

        // Prepare data for the chart
        data.forEach((monthData: any[], monthIndex: number) => {
          monthData.forEach(([, count], destIndex) => {
            maxBooking = Math.max(maxBooking, count); // Track the maximum booking count
            if (!datasets[destIndex]) {
              datasets[destIndex] = {
                label: `Destination ${destIndex + 1}`,
                backgroundColor: `rgba(${50 + destIndex * 70}, 150, ${
                  200 - destIndex * 50
                }, 0.6)`,
                borderColor: `rgba(${50 + destIndex * 70}, 150, ${
                  200 - destIndex * 50
                }, 1)`,
                borderWidth: 1,
                data: Array(12).fill(0), // Initialize data array with 0 values for each month
                datalabels: {
                  display: true,
                  align: "top",
                  anchor: "end",
                  color: "black",
                  font: {
                    size: 10,
                    weight: "bold",
                  },
                },
              };
            }
            datasets[destIndex].data[monthIndex] = count; // Set the booking count for the corresponding month
          });
        });

        // Round maxBooking up to the nearest multiple of 10
        maxBooking = Math.ceil(maxBooking / 10) * 10;

        // Set the chart data state
        setChartData({
          labels,
          datasets,
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
              datalabels: {
                formatter: (_value: any, context: any) => {
                  const cityName =
                    data[context.dataIndex][context.datasetIndex]?.[0] || "";
                  return cityName;
                },
              },
              tooltip: {
                callbacks: {
                  label: (context: any) => {
                    const { label, raw } = context;
                    const cityName =
                      data[context.dataIndex][context.datasetIndex]?.[0] ||
                      "N/A";
                    return `${label} (${cityName}): ${raw} bookings`; // Display custom tooltip with city name and bookings count
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Months",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Bookings",
                },
                beginAtZero: true,
                max: maxBooking, // Set the maximum Y-axis value to the rounded max bookings value
              },
            },
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [year]);

  return (
    <div>
      <h1 className="text-center">Top Destinations in {year} Chart</h1>
      <div>
        <label htmlFor="year">Year: </label>
        <input
          type="number"
          id="year"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
        />
      </div>
      {chartData && (
        <Bar
          data={{
            labels: chartData.labels,
            datasets: chartData.datasets,
          }}
          options={chartData.options}
        />
      )}
    </div>
  );
};

export default DestinationChart;
