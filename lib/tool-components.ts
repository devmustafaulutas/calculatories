import type { ComponentType } from "react";
import { BmiCalculator } from "@/components/tools/bmi-calculator";
import { BodyFatCalculator } from "@/components/tools/body-fat-calculator";
import { BmrCalculator } from "@/components/tools/bmr-calculator";
import { CalorieCalculator } from "@/components/tools/calorie-calculator";
import { CompoundInterestCalculator } from "@/components/tools/compound-interest-calculator";
import { IdealWeightCalculator } from "@/components/tools/ideal-weight-calculator";
import { MacroCalculator } from "@/components/tools/macro-calculator";
import { LoanRepaymentCalculator } from "@/components/tools/loan-repayment-calculator";
import { MortgageCalculator } from "@/components/tools/mortgage-calculator";

interface ToolComponentProps {
  defaultRate?: number;
}

export const toolComponents: Record<
  string,
  ComponentType<ToolComponentProps>
> = {
  "mortgage-calculator": MortgageCalculator,
  "compound-interest-calculator": CompoundInterestCalculator,
  "loan-repayment-calculator": LoanRepaymentCalculator,
  "bmi-calculator": BmiCalculator,
  "bmr-calculator": BmrCalculator,
  "calorie-calculator": CalorieCalculator,
  "body-fat-calculator": BodyFatCalculator,
  "ideal-weight-calculator": IdealWeightCalculator,
  "macro-calculator": MacroCalculator,
};

export function getToolComponent(
  slug: string,
): ComponentType<ToolComponentProps> | undefined {
  return toolComponents[slug];
}
