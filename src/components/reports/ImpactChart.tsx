"use client";

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registrar componentes necesarios para Bar
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ImpactChart = () => {
  const data: ChartData<'bar'> = {
    labels: ['Huella de Carbono', 'Uso de Agua', 'Desperdicio'],
    datasets: [
      {
        label: 'Estándar Tradicional',
        data: [100, 100, 100],
        backgroundColor: '#E5E5E5',
        borderRadius: 4
      },
      {
        label: 'Estándar Consciente',
        data: [45, 60, 15],
        backgroundColor: '#5352F6',
        borderRadius: 4
      }
    ]
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } },
    scales: {
      y: { display: false, beginAtZero: true },
      x: { grid: { display: false }, ticks: { color: '#6D6C6C', font: { size: 11 } } }
    }
  };

  return (
    <div className="w-full h-full min-h-[350px]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ImpactChart;
