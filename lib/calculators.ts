export interface Calculator {
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  category: string;
  categorySlug: string;
  icon: string;
  featured?: boolean;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  {
    name: "Finance",
    slug: "finance",
    description: "Financial calculators for loans, investments, and savings",
    icon: "DollarSign",
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  {
    name: "Health",
    slug: "health",
    description: "Health and fitness calculators for your wellbeing",
    icon: "Heart",
    color: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  },
  {
    name: "Salary",
    slug: "salary",
    description: "Salary and income calculators for career planning",
    icon: "Briefcase",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    name: "Productivity",
    slug: "productivity",
    description: "Tools to boost your productivity and time management",
    icon: "Clock",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
];

export const calculators: Calculator[] = [
  {
    slug: "mortgage-calculator",
    name: "Mortgage Calculator",
    description:
      "Calculate your monthly mortgage payments, total interest, and see a complete amortization schedule. Our mortgage calculator helps you understand the true cost of homeownership by breaking down principal, interest, taxes, and insurance.",
    shortDescription: "Calculate monthly payments and total cost of your home loan",
    category: "Finance",
    categorySlug: "finance",
    icon: "Home",
    featured: true,
  },
  {
    slug: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    description:
      "See how your money grows over time with compound interest. Enter your principal, interest rate, and time period to calculate your future investment value with detailed year-by-year breakdowns.",
    shortDescription: "Calculate investment growth with compound interest",
    category: "Finance",
    categorySlug: "finance",
    icon: "TrendingUp",
    featured: true,
  },
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    description:
      "Calculate your Body Mass Index (BMI) to understand your weight category. Supports both metric and imperial units and provides personalized healthy weight ranges based on your height.",
    shortDescription: "Calculate your Body Mass Index and healthy weight range",
    category: "Health",
    categorySlug: "health",
    icon: "Scale",
    featured: true,
  },
  {
    slug: "savings-calculator",
    name: "Savings Calculator",
    description: "Calculate how your savings will grow over time with regular contributions.",
    shortDescription: "Plan your savings goals with regular contributions",
    category: "Finance",
    categorySlug: "finance",
    icon: "PiggyBank",
  },
  {
    slug: "calorie-calculator",
    name: "Calorie Calculator",
    description: "Calculate your daily calorie needs based on your activity level and goals.",
    shortDescription: "Find your daily calorie requirements",
    category: "Health",
    categorySlug: "health",
    icon: "Flame",
  },
  {
    slug: "salary-to-hourly",
    name: "Salary to Hourly Calculator",
    description: "Convert your annual salary to hourly rate or vice versa.",
    shortDescription: "Convert between annual salary and hourly rate",
    category: "Salary",
    categorySlug: "salary",
    icon: "Calculator",
  },
  {
    slug: "time-zone-converter",
    name: "Time Zone Converter",
    description: "Convert times between different time zones easily.",
    shortDescription: "Convert times across global time zones",
    category: "Productivity",
    categorySlug: "productivity",
    icon: "Globe",
  },
];

export function getCalculatorBySlug(slug: string): Calculator | undefined {
  return calculators.find((calc) => calc.slug === slug);
}

export function getCalculatorsByCategory(categorySlug: string): Calculator[] {
  return calculators.filter((calc) => calc.categorySlug === categorySlug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug);
}

export function getFeaturedCalculators(): Calculator[] {
  return calculators.filter((calc) => calc.featured);
}

export function getRelatedCalculators(currentSlug: string, limit: number = 3): Calculator[] {
  const current = getCalculatorBySlug(currentSlug);
  if (!current) return calculators.slice(0, limit);

  const sameCategory = calculators.filter(
    (calc) => calc.categorySlug === current.categorySlug && calc.slug !== currentSlug
  );

  const others = calculators.filter(
    (calc) => calc.categorySlug !== current.categorySlug && calc.slug !== currentSlug
  );

  return [...sameCategory, ...others].slice(0, limit);
}

export function searchCalculators(query: string): Calculator[] {
  const lowercaseQuery = query.toLowerCase();
  return calculators.filter(
    (calc) =>
      calc.name.toLowerCase().includes(lowercaseQuery) ||
      calc.description.toLowerCase().includes(lowercaseQuery) ||
      calc.category.toLowerCase().includes(lowercaseQuery)
  );
}
