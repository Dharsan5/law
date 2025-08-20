import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from "chart.js";
import "./SystemAnalytics.css";

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

const SystemAnalytics = () => {
  const userGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{ label: "New Users", data: [30, 45, 60, 40, 80, 100], borderColor: "#4cafef", backgroundColor: "#4cafef88" }],
  };

  const casesData = {
    labels: ["Civil", "Criminal", "Family", "Corporate"],
    datasets: [{ label: "Cases", data: [50, 80, 30, 60], backgroundColor: ["#4cafef", "#ff9800", "#8bc34a", "#e91e63"] }],
  };

  return (
    <div className="analytics-page">
      <h2>System Analytics</h2>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>User Growth</h3>
          <Line data={userGrowthData} />
        </div>

        <div className="chart-card">
          <h3>Case Distribution</h3>
          <Bar data={casesData} />
        </div>
      </div>
    </div>
  );
};

export default SystemAnalytics;
