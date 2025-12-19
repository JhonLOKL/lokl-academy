"use client";

import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const EconomicFalloutChart = () => {
  const colors = {
    purple: '#5352F6',
    success: '#22C55E',
    warning: '#F59E0B'
  };

  const data: ChartData<'doughnut'> = {
    labels: ['Alojamiento (35%)', 'Gastos Locales (40%)', 'Transporte/Imp (25%)'],
    datasets: [{
      data: [35, 40, 25],
      backgroundColor: [colors.purple, colors.success, colors.warning],
      borderWidth: 0,
      hoverOffset: 10
    }]
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
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
        bodyFont: { family: 'Inter' }
      }
    }
  };

  return (
    <div className="w-full h-[350px]">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default EconomicFalloutChart;
