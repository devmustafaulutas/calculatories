import { CategorySchema, type Category } from "@/data/schemas/category";
import { assertValidArray } from "@/lib/validate";

const rawCategories: Category[] = [
  {
    id: "finance",
    slug: "finance",
    name: "Finance",
    description:
      "Free finance calculators for mortgages, loans, investments, and savings. Plan your money with accurate, instant results.",
    intro:
      "From mortgage payments to compound interest, our finance calculators help you make smarter money decisions. Every tool is free, instant, and built for US households.",
    icon: "DollarSign",
    parent: null,
    order: 1,
    seo: {
      title: "Finance Calculators - Loans, Mortgages & Investments | Calculatories",
      description:
        "Free online finance calculators for mortgages, loans, savings, and investments. Accurate formulas, instant results, no signup required.",
    },
  },
  {
    id: "health",
    slug: "health",
    name: "Health",
    description:
      "Health and fitness calculators for BMI, calories, and wellness metrics. Evidence-based tools reviewed by registered dietitians.",
    intro:
      "Understand your body and wellness goals with calculators reviewed by health professionals. Supports both metric and imperial units.",
    icon: "Heart",
    parent: null,
    order: 2,
    seo: {
      title: "Health Calculators - BMI, Calories & Fitness | Calculatories",
      description:
        "Free health calculators for BMI, daily calories, and fitness metrics. Reviewed by registered dietitians. Metric and imperial units supported.",
    },
  },
  {
    id: "salary",
    slug: "salary",
    name: "Salary",
    description:
      "Salary and income calculators to convert hourly rates, estimate take-home pay, and plan your career finances.",
    intro:
      "Whether you are negotiating a job offer or comparing contract vs. full-time pay, our salary calculators give you clear numbers in seconds.",
    icon: "Briefcase",
    parent: null,
    order: 3,
    seo: {
      title: "Salary Calculators - Hourly, Annual & Take-Home Pay | Calculatories",
      description:
        "Convert salary to hourly pay, estimate take-home income, and plan your career finances with free, accurate salary calculators.",
    },
  },
  {
    id: "tools",
    slug: "tools",
    name: "Tools",
    description:
      "Everyday utility calculators and converters for dates, percentages, units, and more. Fast, free, and mobile-friendly.",
    intro:
      "Quick utility calculators for everyday math — percentages, unit conversions, date differences, and more. No account needed.",
    icon: "Wrench",
    parent: null,
    order: 4,
    seo: {
      title: "Utility Calculators - Percentages, Units & Converters | Calculatories",
      description:
        "Free utility calculators for percentages, unit conversions, dates, and everyday math. Fast, accurate, and mobile-friendly.",
    },
  },
  {
    id: "legal",
    slug: "legal",
    name: "Legal",
    description:
      "Legal and compliance calculators for settlements, deadlines, and fee estimates. Informational tools reviewed by professionals.",
    intro:
      "Estimate legal fees, calculate court deadlines, and understand settlement ranges with calculators designed for informational use. Always consult a licensed attorney for legal advice.",
    icon: "Scale",
    parent: null,
    order: 5,
    seo: {
      title: "Legal Calculators - Fees, Deadlines & Settlements | Calculatories",
      description:
        "Free legal calculators for fee estimates, court deadlines, and settlement ranges. Informational tools reviewed by professionals. Not legal advice.",
    },
  },
  {
    id: "productivity",
    slug: "productivity",
    name: "Productivity",
    description:
      "Productivity calculators for time zones, work hours, and project planning. Stay organized and on schedule.",
    intro:
      "Convert time zones, calculate billable hours, and plan projects with tools built for freelancers, remote workers, and busy professionals.",
    icon: "Clock",
    parent: null,
    order: 6,
    seo: {
      title: "Productivity Calculators - Time Zones & Work Hours | Calculatories",
      description:
        "Free productivity calculators for time zone conversion, billable hours, and project planning. Built for freelancers and remote teams.",
    },
  },
];

export const categories: Category[] = assertValidArray(
  CategorySchema,
  rawCategories,
  "categories",
);
