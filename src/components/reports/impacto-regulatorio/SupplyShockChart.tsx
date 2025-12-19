"use client";

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SupplyShockChart = () => {
  const colors = {
    purple: '#5352F6',
  };

  const data: ChartData<'line'> = {
    labels: ['Ene 25', 'Jun 25', 'Nov 25', 'Dic 18 (Decreto)', 'Ene 26', 'Mar 26'],
    datasets: [
      {
        label: 'Proyección Inercial (Sin Decreto)',
        data: [100, 105, 110, 112, 115, 120],
        borderColor: '#CBD5E1', // Slate 300
        borderDash: [6, 6],
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4
      },
      {
        label: 'Escenario Real (Con Decreto)',
        data: [100, 105, 110, 112, 65, 55], // 45% Drop
        borderColor: colors.purple,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(83, 82, 246, 0.15)');
          gradient.addColorStop(1, 'rgba(83, 82, 246, 0)');
          return gradient;
        },
        fill: true,
        borderWidth: 3,
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: colors.purple,
        pointBorderWidth: 2,
        pointRadius: 5,
        tension: 0.4
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#FFFFFF',
        titleColor: '#0F0F0F',
        bodyColor: '#444444',
        borderColor: '#E5E5E5',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        titleFont: { family: 'Inter', weight: 'bold' },
        bodyFont: { family: 'Inter' },
        callbacks: {
            labelColor: function(context) {
                return {
                    borderColor: context.dataset.borderColor as string || context.dataset.backgroundColor as string,
                    backgroundColor: context.dataset.backgroundColor as string,
                    borderWidth: 2,
                    borderRadius: 2,
                };
            }
        }
      }
    },
    scales: {
      y: {
        grid: { color: '#F1F5F9' },
        border: { display: false }
      },
      x: {
        grid: { display: false },
        border: { display: false }
      }
    }
  };

  return (
    <div className="w-full h-[350px]">
      <Line data={data} options={options} />
    </div>
  );
};

export default SupplyShockChart;
