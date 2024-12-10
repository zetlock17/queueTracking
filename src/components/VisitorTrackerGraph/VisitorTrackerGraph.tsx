import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import styles from './VisitorTrackerGraph.module.css';
import { max } from 'date-fns';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin);

type DataPoint = {
  count: number;
  capture_time: string;
};

interface CafeteriaChartProps {
  cafeteria_count: DataPoint[];
}

const CafeteriaChart: React.FC<CafeteriaChartProps> = ({ cafeteria_count }) => {
  // Sort data by time
  const sortedData = [...cafeteria_count].sort((a, b) => {
    const timeA = new Date(a.capture_time).getTime();
    const timeB = new Date(b.capture_time).getTime();
    return timeA - timeB;
  });

  // Transform sorted data for the chart
  const labels = sortedData.map(item => {
    const date = new Date(item.capture_time);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  });
  const data = sortedData.map(item => item.count);

  // Chart data configuration
  const chartData = {
    labels, // Time on X-axis
    datasets: [
      {
        label: 'Количество посетителей',
        data, // Visitor count on Y-axis
        borderColor: 'rgba(79,172,254,1)',
        backgroundColor: 'rgba(79,172,254,0.2)',
        fill: true,
        tension: 0.4, // Slight curve in the line
      },
    ],
  };

  // Chart options configuration
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'График количества посетителей',
      },
      zoom: {
        limits: {
          y: { min: 0, max: 80}
        },
        pan: {
          enabled: true,
          mode: 'xy' as const,
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy' as const,
        },
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
        min: 0,
        ticks: {
          beginAtZero: true,
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
    },
  };

  return (
    <div className={styles.container}>
      <Line data={chartData} options={chartOptions} height={270} />
    </div>
  );
};

export default CafeteriaChart;
