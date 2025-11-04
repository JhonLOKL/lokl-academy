"use client";

import React, { useEffect, useState } from 'react';
import LetsGrowthTogether from './sections/LetsGrowthTogether';
import WeAreDifferent from './sections/WeAreDifferent';
import TimeLine from './sections/TimeLine';
import OurTeam from './sections/OurTeam';
import FrequentlyQs from './sections/FrequentlyQs';
import Supplierbar from './sections/Supplierbar';
import StatsBar from './components/StatsBar';
import { getAboutUsAction } from '@/actions/aboutus-action';

interface Indicators {
  investors: number;
  totalInvestmentValue: number;
}

export default function AboutUsClient() {
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
    <main>
      {/* Hero Section */}
      <header>
        <LetsGrowthTogether />
      </header>
      
      {/* Timeline Section */}
      <section>
        <TimeLine />
      </section>
      
      {/* Stats Bar */}
      <section className="w-full">
        <StatsBar 
          investors={indicators.investors} 
          totalInvestmentValue={parseFloat((indicators.totalInvestmentValue / 1000000).toFixed(0))} 
        />
      </section>
      
      {/* We Are Different Section */}
      <article className="md:mt-0">
        <WeAreDifferent />
      </article>
      
      {/* Our Team Section */}
      <section>
        <OurTeam />
      </section>
     
      {/* FAQ Section */}
      <section>
        <FrequentlyQs />
      </section>
      
      {/* Suppliers Bar */}
      <aside className="mt-16">
        <Supplierbar />
      </aside>
    </main>
  );
}

