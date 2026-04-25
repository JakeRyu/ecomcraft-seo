"use client";

import { useState } from "react";
import { Pricing } from "./Pricing";
import { ReportForm } from "./ReportForm";

export function HomeSections() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <>
      <Pricing selectedPlan={selectedPlan} onSelectPlan={setSelectedPlan} />
      <ReportForm selectedPlan={selectedPlan} onSelectPlan={setSelectedPlan} />
    </>
  );
}
