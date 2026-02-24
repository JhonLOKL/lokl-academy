"use client";

import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Bubble } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const RegionalBubbleChart = () => {
  const colors = {
    purple: '#5352F6',   // Medellín
    error: '#EF4444',    // Cartagena
    blue: '#3B82F6',     // Bogotá
    warning: '#F59E0B',  // Santa Marta
    success: '#22C55E',  // Cali
    black: '#0F0F0F',
    medGray: '#6D6C6C'
  };

  const data: ChartData<'bubble'> = {
    datasets: [
      {
        label: 'Medellín',
        data: [{ x: 75, y: 80, r: 30 }], 
        backgroundColor: colors.purple,
        borderColor: colors.purple,
        borderWidth: 1,
      },
      {
        label: 'Cartagena',
        data: [{ x: 85, y: 70, r: 28 }], 
        backgroundColor: colors.error,
        borderColor: colors.error,
        borderWidth: 1,
      },
      {
        label: 'Bogotá',
        data: [{ x: 60, y: 90, r: 25 }], 
        backgroundColor: colors.blue,
        borderColor: colors.blue,
        borderWidth: 1,
      },
      {
        label: 'Santa Marta',
        data: [{ x: 40, y: 40, r: 18 }], 
        backgroundColor: colors.warning,
        borderColor: colors.warning,
        borderWidth: 1,
      },
      {
        label: 'Cali',
        data: [{ x: 50, y: 30, r: 15 }], 
        backgroundColor: colors.success,
        borderColor: colors.success,
        borderWidth: 1,
      }
    ]
  };

  const options: ChartOptions<'bubble'> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 10,
        right: 20
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        align: 'center',
        labels: { 
          usePointStyle: true, 
          pointStyle: 'circle',
          font: { family: 'Inter', size: 11 },
          color: colors.medGray,
          padding: 15,
          boxWidth: 8
        }
      },
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
           label: (context) => {
             const label = context.dataset.label || '';
             // @ts-expect-error - ChartJS types workaround
             const x = context.raw.x;
             // @ts-expect-error - ChartJS types workaround
             const y = context.raw.y;
             return `${label}: Inf. ${x}, Dep. ${y}`;
           }
        }
      }
    },
    scales: {
      x: {
        min: 25,
        max: 100,
        title: { 
          display: true, 
          text: 'Índice de Informalidad Regulatoria',
          color: colors.medGray,
          font: { family: 'Inter', size: 11 }
        },
        grid: { color: '#F1F5F9' },
        ticks: { color: colors.medGray, font: { size: 10 } }
      },
      y: {
        min: 15,
        max: 105,
        title: { 
          display: true, 
          text: 'Dependencia Turismo STR',
          color: colors.medGray,
          font: { family: 'Inter', size: 11 }
        },
        grid: { color: '#F1F5F9' },
        ticks: { color: colors.medGray, font: { size: 10 } }
      }
    }
  };

  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Bubble data={data} options={options} />
    </div>
  );
};

export default RegionalBubbleChart;
