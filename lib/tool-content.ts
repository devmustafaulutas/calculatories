import type { ComponentType } from "react";
import {
  BmiCalculatorContent,
  bmiFaqs,
} from "@/content/tools/bmi-calculator";
import {
  BodyFatCalculatorContent,
  bodyFatFaqs,
} from "@/content/tools/body-fat-calculator";
import {
  BmrCalculatorContent,
  bmrFaqs,
} from "@/content/tools/bmr-calculator";
import {
  CalorieCalculatorContent,
  calorieFaqs,
} from "@/content/tools/calorie-calculator";
import {
  CompoundInterestCalculatorContent,
  compoundInterestFaqs,
} from "@/content/tools/compound-interest-calculator";
import {
  IdealWeightCalculatorContent,
  idealWeightFaqs,
} from "@/content/tools/ideal-weight-calculator";
import {
  MacroCalculatorContent,
  macroFaqs,
} from "@/content/tools/macro-calculator";
import {
  LoanRepaymentCalculatorContent,
  loanRepaymentFaqs,
} from "@/content/tools/loan-repayment-calculator";
import {
  MortgageCalculatorContent,
  mortgageFaqs,
} from "@/content/tools/mortgage-calculator";
import type { FAQItem } from "@/lib/types";

interface ToolContentEntry {
  Content: ComponentType;
  faqs: FAQItem[];
}

const toolContentMap: Record<string, ToolContentEntry> = {
  "mortgage-calculator": {
    Content: MortgageCalculatorContent,
    faqs: mortgageFaqs,
  },
  "compound-interest-calculator": {
    Content: CompoundInterestCalculatorContent,
    faqs: compoundInterestFaqs,
  },
  "loan-repayment-calculator": {
    Content: LoanRepaymentCalculatorContent,
    faqs: loanRepaymentFaqs,
  },
  "bmi-calculator": {
    Content: BmiCalculatorContent,
    faqs: bmiFaqs,
  },
  "bmr-calculator": {
    Content: BmrCalculatorContent,
    faqs: bmrFaqs,
  },
  "calorie-calculator": {
    Content: CalorieCalculatorContent,
    faqs: calorieFaqs,
  },
  "body-fat-calculator": {
    Content: BodyFatCalculatorContent,
    faqs: bodyFatFaqs,
  },
  "ideal-weight-calculator": {
    Content: IdealWeightCalculatorContent,
    faqs: idealWeightFaqs,
  },
  "macro-calculator": {
    Content: MacroCalculatorContent,
    faqs: macroFaqs,
  },
};

export function getToolContent(slug: string): ToolContentEntry | undefined {
  return toolContentMap[slug];
}
