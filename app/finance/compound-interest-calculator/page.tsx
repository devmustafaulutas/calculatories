import { Metadata } from "next";
import { CompoundInterestCalculatorWidget } from "@/components/calculators/compound-interest-calculator";
import { CalculatorPageTemplate } from "@/components/calculator-page-template";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("compound-interest-calculator")!;

export const metadata: Metadata = {
  title: "Compound Interest Calculator - Calculate Investment Growth",
  description:
    "Free compound interest calculator to see how your investments grow over time. Calculate final amount, interest earned, and view year-by-year breakdown.",
  keywords: [
    "compound interest calculator",
    "investment calculator",
    "interest calculator",
    "savings calculator",
  ],
  openGraph: {
    title: "Compound Interest Calculator | Calculatories",
    description:
      "Calculate how your money grows with compound interest. Free online investment calculator.",
    url: "https://calculatories.com/finance/compound-interest-calculator",
    images: [
      {
        url: "/og/compound-interest-calculator.png",
        width: 1200,
        height: 630,
        alt: "Compound Interest Calculator",
      },
    ],
  },
  alternates: {
    canonical: "https://calculatories.com/finance/compound-interest-calculator",
  },
};

const howToUse = [
  "Enter your initial investment amount (the principal).",
  "Input the annual interest rate as a percentage.",
  "Set the investment period in years.",
  "Choose how often interest compounds (monthly is most common).",
  "View your projected final amount and total interest earned instantly.",
  "Review the year-by-year breakdown table to see your wealth grow.",
];

const faqs = [
  {
    question: "What is compound interest?",
    answer:
      "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest, which only calculates interest on the principal, compound interest allows your money to grow exponentially over time, often called 'interest on interest.'",
  },
  {
    question: "How often should interest compound?",
    answer:
      "More frequent compounding results in higher returns. Daily compounding yields slightly more than monthly, which yields more than annual. For most savings accounts and investments, monthly or daily compounding is common. The difference becomes more significant with larger amounts and longer time periods.",
  },
  {
    question: "What is the compound interest formula?",
    answer:
      "The formula is A = P(1 + r/n)^(nt), where A is the final amount, P is the principal, r is the annual interest rate, n is the number of times interest compounds per year, and t is the time in years. Our calculator automatically applies this formula.",
  },
  {
    question: "How can I maximize compound interest?",
    answer:
      "Start investing early, contribute regularly, choose investments with higher interest rates, and opt for more frequent compounding. The power of compound interest is most effective over long time periods, which is why starting early is crucial.",
  },
  {
    question: "What is the Rule of 72?",
    answer:
      "The Rule of 72 is a quick way to estimate how long it takes for an investment to double. Divide 72 by your interest rate to get the approximate years. For example, at 7% interest, your money would double in about 10.3 years (72 ÷ 7 = 10.3).",
  },
];

function HowToCalculate() {
  return (
    <>
      <h2>How to Calculate Compound Interest</h2>
      <p>
        Compound interest is one of the most powerful concepts in finance.
        Understanding how it works can help you make better investment decisions
        and grow your wealth over time.
      </p>

      <h3>The Compound Interest Formula</h3>
      <p>The standard formula for calculating compound interest is:</p>
      <div className="bg-muted p-4 rounded-lg my-4 text-center font-mono">
        A = P(1 + r/n)^(nt)
      </div>
      <p>Where:</p>
      <ul>
        <li>
          <strong>A</strong> = Final amount (principal + interest)
        </li>
        <li>
          <strong>P</strong> = Principal (initial investment)
        </li>
        <li>
          <strong>r</strong> = Annual interest rate (as a decimal)
        </li>
        <li>
          <strong>n</strong> = Number of times interest compounds per year
        </li>
        <li>
          <strong>t</strong> = Time in years
        </li>
      </ul>

      <h3>Example Calculation</h3>
      <p>
        Let&apos;s calculate the growth of $10,000 invested at 7% annual interest,
        compounded monthly, for 10 years:
      </p>
      <ul>
        <li>Principal (P) = $10,000</li>
        <li>Rate (r) = 7% = 0.07</li>
        <li>Compounds per year (n) = 12</li>
        <li>Time (t) = 10 years</li>
        <li>A = $10,000 × (1 + 0.07/12)^(12×10)</li>
        <li>A = $10,000 × (1.00583)^120</li>
        <li>A ≈ $20,096.61</li>
      </ul>
      <p>
        After 10 years, your $10,000 has grown to over $20,000, with $10,096.61
        in interest earned!
      </p>

      <h3>The Power of Time</h3>
      <p>
        The most important factor in compound interest is time. Starting early,
        even with smaller amounts, can result in significantly more wealth than
        starting later with larger amounts. This is why financial advisors
        emphasize beginning to invest as early as possible.
      </p>

      <h3>Compound Frequency Comparison</h3>
      <p>
        For the same principal, rate, and time, different compounding
        frequencies yield different results:
      </p>
      <ul>
        <li>Annual compounding: Interest added once per year</li>
        <li>Semi-annual: Twice per year</li>
        <li>Quarterly: Four times per year</li>
        <li>Monthly: Twelve times per year</li>
        <li>Daily: 365 times per year</li>
      </ul>
      <p>
        While daily compounding yields the highest return, the difference
        between monthly and daily is relatively small for most practical
        purposes.
      </p>
    </>
  );
}

export default function CompoundInterestCalculatorPage() {
  return (
    <CalculatorPageTemplate
      calculator={calculator}
      howToUse={howToUse}
      howToCalculate={<HowToCalculate />}
      faqs={faqs}
    >
      <CompoundInterestCalculatorWidget />
    </CalculatorPageTemplate>
  );
}
