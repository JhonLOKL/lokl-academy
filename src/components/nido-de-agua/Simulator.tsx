"use client";

import { useEffect } from "react";
import SimulatorLazyWrapper from "@/components/simulator/simulator-lazy-wrapper";
import { getProjectCardsAction } from "@/actions/project-actions";

export function Simulator() {
  useEffect(() => {
    void getProjectCardsAction();
  }, []);

  return (
    <div className="w-full">
      <SimulatorLazyWrapper id="nido-de-agua-simulator" />
    </div>
  );
}

