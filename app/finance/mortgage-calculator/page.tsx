import { Metadata } from "next";
import { MortgageCalculatorWidget } from "@/components/calculators/mortgage-calculator";
import { CalculatorPageTemplate } from "@/components/calculator-page-template";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("mortgage-calculator")!;

export const metadata: Metadata = {
  title: "Mortgage Calculator - Calculate Monthly Payments",
  description:
    "Free mortgage calculator to estimate your monthly payments. Calculate principal, interest, and total cost of your home loan instantly.",
  keywords: [
    "mortgage calculator",
    "home loan calculator",
    "monthly payment calculator",
    "mortgage interest calculator",
  ],
  openGraph: {
    title: "Mortgage Calculator | Calculatories",
    description:
      "Calculate your monthly mortgage payments instantly. Free online tool for home buyers.",
    url: "https://calculatories.com/finance/mortgage-calculator",
    images: [
      {
        url: "/og/mortgage-calculator.png",
        width: 1200,
        height: 630,
        alt: "Mortgage Calculator",
      },
    ],
  },
  alternates: {
    canonical: "https://calculatories.com/finance/mortgage-calculator",
  },
};

const howToUse = [
  "Enter the total home price you are considering purchasing.",
  "Input your down payment amount (the money you will pay upfront).",
  "Set the annual interest rate offered by your lender.",
  "Select your preferred loan term (15, 20, or 30 years are common options).",
  "View your estimated monthly payment instantly as you adjust the values.",
  "Review the total payment and total interest to understand the full cost.",
];

const faqs = [
  {
    question: "How is monthly mortgage payment calculated?",
    answer:
      "Monthly mortgage payment is calculated using the formula: M = P[r(1+r)^n]/[(1+r)^n-1], where P is the principal loan amount, r is the monthly interest rate (annual rate divided by 12), and n is the total number of payments. Our calculator automatically applies this formula to give you instant results.",
  },
  {
    question: "What is included in a mortgage payment?",
    answer:
      "A typical mortgage payment includes principal (the amount borrowed), interest (the cost of borrowing), property taxes, and homeowners insurance. Some loans also include private mortgage insurance (PMI) if your down payment is less than 20%. Our calculator focuses on principal and interest.",
  },
  {
    question: "How much should my down payment be?",
    answer:
      "While traditional advice suggests 20% to avoid PMI, many loan programs allow down payments as low as 3-5%. A larger down payment reduces your loan amount, monthly payments, and total interest paid over the life of the loan.",
  },
  {
    question: "Should I choose a 15-year or 30-year mortgage?",
    answer:
      "A 15-year mortgage has higher monthly payments but significantly lower total interest. A 30-year mortgage offers lower monthly payments but you will pay more interest over time. Use our calculator to compare both options based on your budget.",
  },
  {
    question: "How does interest rate affect my mortgage?",
    answer:
      "Even a small difference in interest rate can significantly impact your total cost. For example, on a $300,000 loan, the difference between 6% and 7% can mean tens of thousands of dollars in additional interest over a 30-year term.",
  },
];

function HowToCalculate() {
  return (
    <>
      <h2>How to Calculate Mortgage Payments</h2>
      <p>
        Understanding how mortgage payments are calculated helps you make
        informed decisions about your home purchase. The monthly payment
        calculation involves several key factors that determine your overall
        cost of borrowing.
      </p>

      <h3>The Mortgage Payment Formula</h3>
      <p>
        The standard formula for calculating monthly mortgage payments is:
      </p>
      <div className="bg-muted p-4 rounded-lg my-4 text-center font-mono">
        M = P × [r(1+r)^n] / [(1+r)^n - 1]
      </div>
      <p>Where:</p>
      <ul>
        <li>
          <strong>M</strong> = Monthly payment
        </li>
        <li>
          <strong>P</strong> = Principal loan amount (home price minus down
          payment)
        </li>
        <li>
          <strong>r</strong> = Monthly interest rate (annual rate ÷ 12)
        </li>
        <li>
          <strong>n</strong> = Total number of payments (years × 12)
        </li>
      </ul>

      <h3>Example Calculation</h3>
      <p>
        Let&apos;s calculate the monthly payment for a $350,000 home with a $70,000
        down payment, 6.5% interest rate, and 30-year term:
      </p>
      <ul>
        <li>Principal (P) = $350,000 - $70,000 = $280,000</li>
        <li>Monthly rate (r) = 6.5% ÷ 12 = 0.5417%</li>
        <li>Number of payments (n) = 30 × 12 = 360</li>
        <li>Monthly payment = approximately $1,770</li>
      </ul>

      <h3>Factors That Affect Your Payment</h3>
      <p>Several factors influence your monthly mortgage payment:</p>
      <ul>
        <li>
          <strong>Home price:</strong> Higher purchase price means larger loan
          amount
        </li>
        <li>
          <strong>Down payment:</strong> Larger down payment reduces loan amount
        </li>
        <li>
          <strong>Interest rate:</strong> Lower rates mean lower monthly payments
        </li>
        <li>
          <strong>Loan term:</strong> Longer terms have lower monthly payments
          but higher total interest
        </li>
      </ul>

      <h3>Tips for Getting the Best Mortgage</h3>
      <p>
        To secure the most favorable mortgage terms, maintain a good credit
        score, save for a larger down payment, and shop around with multiple
        lenders. Even a quarter percent difference in interest rate can save
        thousands over the life of your loan.
      </p>
    </>
  );
}

export default function MortgageCalculatorPage() {
  return (
    <CalculatorPageTemplate
      calculator={calculator}
      howToUse={howToUse}
      howToCalculate={<HowToCalculate />}
      faqs={faqs}
    >
      <MortgageCalculatorWidget />
    </CalculatorPageTemplate>
  );
}
