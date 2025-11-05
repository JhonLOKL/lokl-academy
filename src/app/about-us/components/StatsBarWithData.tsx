"use client";

import React, { useEffect, useState } from 'react';
import StatsBar from './StatsBar';
import { getAboutUsAction } from '@/actions/aboutus-action';

interface Indicators {
  investors: number;
  totalInvestmentValue: number;
}

export default function StatsBarWithData() {
  const [indicators, setIndicators] = useState<Indicators>({
    investors: 0, 
    totalInvestmentValue: 0,
  });
  
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAboutUsAction();
        
        if (response?.success && response?.data) {
          setIndicators({
            investors: Number(response.data?.totalInvestors) || 0, 
            totalInvestmentValue: Number(response.data?.totalInvested) || 0,
          });
        }
      } catch (error) {
        console.error('Error fetching indicators:', error);
      }
    };
    getData();
  }, []);

  return (
    <StatsBar 
      investors={indicators.investors} 
      totalInvestmentValue={parseFloat((indicators.totalInvestmentValue / 1000000).toFixed(0))} 
    />
  );
}

