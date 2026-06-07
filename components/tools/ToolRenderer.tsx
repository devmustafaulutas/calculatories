import { BmiCalculator } from "@/components/tools/bmi-calculator";
import { BmrCalculator } from "@/components/tools/bmr-calculator";
import { CalorieCalculator } from "@/components/tools/calorie-calculator";
import { BodyFatCalculator } from "@/components/tools/body-fat-calculator";
import { CompoundInterestCalculator } from "@/components/tools/compound-interest-calculator";
import { IdealWeightCalculator } from "@/components/tools/ideal-weight-calculator";
import { LoanRepaymentCalculator } from "@/components/tools/loan-repayment-calculator";
import { MacroCalculator } from "@/components/tools/macro-calculator";
import { MortgageCalculator } from "@/components/tools/mortgage-calculator";

interface ToolRendererProps {
  slug: string;
  defaultRate?: number;
}

export function ToolRenderer({ slug, defaultRate }: ToolRendererProps) {
  switch (slug) {
    case "mortgage-calculator":
      return <MortgageCalculator defaultRate={defaultRate} />;
    case "compound-interest-calculator":
      return <CompoundInterestCalculator />;
    case "loan-repayment-calculator":
      return <LoanRepaymentCalculator />;
    case "bmi-calculator":
      return <BmiCalculator />;
    case "bmr-calculator":
      return <BmrCalculator />;
    case "calorie-calculator":
      return <CalorieCalculator />;
    case "body-fat-calculator":
      return <BodyFatCalculator />;
    case "ideal-weight-calculator":
      return <IdealWeightCalculator />;
    case "macro-calculator":
      return <MacroCalculator />;
    default:
      return null;
  }
}
