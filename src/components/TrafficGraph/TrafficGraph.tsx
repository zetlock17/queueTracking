import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { format } from 'date-fns';
import styles from './TrafficGraph.module.css';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface TrafficGraphProps {
  detailed_megacount: {
    entrance: Record<string, number>;
    exit: Record<string, number>;
  };
}

const TrafficGraph: React.FC<TrafficGraphProps> = ({ detailed_megacount }) => {
  const { entrance, exit } = detailed_megacount;

  // Extract labels and data
  const labels = Object.keys(entrance).map(date => format(new Date(date), 'HH:mm'));
  const entranceData = Object.values(entrance);
  const exitData = Object.values(exit);

  // Chart data configuration
  const chartData = {
    labels, // Time on X-axis
    datasets: [
      {
        label: 'Вход',
        data: entranceData, // Entrance count on Y-axis
        backgroundColor: 'rgba(79,172,254,1)',
      },
      {
        label: 'Выход',
        data: exitData, // Exit count on Y-axis
        backgroundColor: 'rgba(0,242,254,1)',
      },
    ],
  };

  // Chart options configuration
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'График входов и выходов',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
        },
      },
      y: {
        title: {
          display: true,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={styles.container}>
      <Bar data={chartData} options={chartOptions} height={250}/>
    </div>
  );
};

export default TrafficGraph;