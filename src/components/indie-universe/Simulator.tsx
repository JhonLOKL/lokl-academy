"use client";

import { useEffect } from "react";
import { getProjectCardsAction } from "@/actions/project-actions";
import SimulatorLazyWrapper from "@/components/simulator/simulator-lazy-wrapper";

export function Simulator() {
  useEffect(() => {
    void getProjectCardsAction();
  }, []);

  return (
    <div className="w-full">
      <SimulatorLazyWrapper id="indie-universe-simulator" />
    </div>
  );
}

