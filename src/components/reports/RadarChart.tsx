"use client";

import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

// Registrar componentes necesarios para Radar
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = () => {
  const data: ChartData<'radar'> = {
    labels: ['Exclusividad', 'Sostenibilidad', 'Artesanía', 'Transparencia', 'Impacto Social'],
    datasets: [{
      label: 'Lujo Tradicional',
      data: [95, 20, 60, 10, 5],
      backgroundColor: 'rgba(156, 163, 175, 0.2)', // Gray
      borderColor: '#9CA3AF',
      borderWidth: 2,
      pointRadius: 0
    }, {
      label: 'Lujo Consciente',
      data: [40, 95, 90, 95, 85],
      backgroundColor: 'rgba(83, 82, 246, 0.25)', // LOKL Purple
      borderColor: '#5352F6',
      borderWidth: 2,
      pointBackgroundColor: '#5352F6',
      pointBorderColor: '#fff',
    }]
  };

  const options: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: '#F3F4F6' },
        grid: { color: '#F3F4F6' },
        pointLabels: {
          font: { family: 'sans-serif', size: 11, weight: 'bold' },
          color: '#444444'
        },
        ticks: { display: false }
      }
    },
    plugins: { 
      legend: { 
        position: 'bottom', 
        labels: { font: { family: 'sans-serif' } } 
      } 
    }
  };

  return (
    <div className="w-full h-full min-h-[350px]">
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChart;
