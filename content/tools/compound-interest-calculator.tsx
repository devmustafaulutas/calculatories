import Link from "next/link";
import { InContentAd } from "@/components/ads/InContentAd";
import { Citation } from "@/components/seo/Citation";
import { RelatedTools } from "@/components/seo/RelatedTools";
import type { FAQItem } from "@/lib/types";
import { blogPath, categoryPath, toolPath } from "@/lib/urls";

export const compoundInterestFaqs: FAQItem[] = [
  {
    question: "What is compound interest?",
    answer:
      "Compound interest is interest calculated on both your initial principal and the accumulated interest from previous periods. Each compounding period, you earn interest on a growing balance, which accelerates growth over time compared with simple interest that only applies to the original amount.",
  },
  {
    question: "How does compounding frequency affect returns?",
    answer:
      "More frequent compounding produces a higher future value at the same stated annual rate. Monthly compounding earns interest twelve times per year, while annual compounding earns it once. The difference is modest at low rates but becomes meaningful over long horizons and higher balances.",
  },
  {
    question: "What is the Rule of 72?",
    answer:
      "The Rule of 72 is a quick estimate for how long it takes an investment to double: divide 72 by the annual interest rate. At 8% return, money roughly doubles in 9 years (72 ÷ 8 = 9). It is an approximation, not a substitute for precise compound interest math.",
  },
  {
    question: "Do regular contributions change compound interest results?",
    answer:
      "Yes. Monthly or periodic contributions add new principal that also compounds. The future value formula combines a lump-sum growth factor with an annuity factor for the contribution stream. Even modest monthly additions can dramatically increase long-term balances.",
  },
  {
    question: "What happens at a 0% interest rate?",
    answer:
      "At 0% interest, your balance grows only through contributions. The future value equals your initial principal plus the total of all contributions. No interest is earned, so compounding frequency has no effect on returns.",
  },
];

export function CompoundInterestCalculatorContent() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          What Is a Compound Interest Calculator?
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A compound interest calculator estimates how an investment grows when
          earnings are reinvested and earn returns of their own. Unlike simple
          interest, which applies only to the original deposit, compound interest
          builds on prior gains — the core mechanism behind long-term savings,
          retirement accounts, and investment portfolios. Our free compound
          interest calculator lets you model principal, annual rate, time horizon,
          compounding frequency, and optional monthly contributions in one place.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Whether you are comparing a high-yield savings account, projecting
          retirement growth, or weighing debt payoff against investing, understanding
          compound returns helps you make informed decisions. The calculator shows
          future value, total interest earned, and a year-by-year breakdown so you
          can see how your balance accelerates over time. For how we verify
          financial formulas and source rates, see our{" "}
          <Link href="/editorial-policy" className="text-foreground underline underline-offset-2">
            editorial policy
          </Link>{" "}
          and{" "}
          <Link href="/methodology" className="text-foreground underline underline-offset-2">
            methodology
          </Link>
          .
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          How to Use This Compound Interest Calculator
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
          <li className="pl-2">
            Enter your initial investment (starting principal).
          </li>
          <li className="pl-2">
            Set the annual interest rate as a percentage.
          </li>
          <li className="pl-2">
            Choose the investment period in years.
          </li>
          <li className="pl-2">
            Select compounding frequency: monthly, quarterly, or annually.
          </li>
          <li className="pl-2">
            Optionally add a monthly contribution to model regular savings.
          </li>
          <li className="pl-2">
            Review future value, interest earned, and the year-by-year table.
          </li>
        </ol>
      </section>

      <InContentAd />

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          How to Calculate Compound Interest Manually
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Manual compound interest calculation starts with four variables:
          principal (P), annual rate (r), time in years (t), and compounding
          periods per year (n). Convert the annual rate to a periodic rate by
          dividing r by n. The total number of compounding periods is N = t × n.
          For a lump sum with no contributions, the future value is A = P(1 + r/n)^(Nt).
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Let us work through a concrete example. Suppose you invest $10,000 at
          7% annual interest compounded monthly for 10 years. Here n = 12, so the
          monthly rate is 7% ÷ 12 = 0.5833% (0.005833 as a decimal). The total
          periods are 10 × 12 = 120. The growth factor is (1.005833)^120 ≈ 2.009.
          Multiplying by the principal: $10,000 × 2.009 ≈ $20,090. Your investment
          roughly doubles in a decade at 7% compounded monthly.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          If you also contribute $200 per month, each contribution compounds for
          the remaining periods after it is deposited. The annuity formula captures
          this stream: FV_contributions = C × [((1 + i)^N − 1) / i], where C is
          the per-period contribution and i is the periodic rate. Add that to the
          lump-sum future value for the total balance. The{" "}
          <Citation
            label="SEC Investor.gov compound interest calculator"
            url="https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator"
          />{" "}
          uses the same underlying math, which is why our results align with
          government-published tools.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Compound growth is the flip side of amortizing debt. While compound
          interest grows wealth, loan interest works against you on an outstanding
          balance. Compare scenarios with our{" "}
          <Link
            href={toolPath("finance", "loan-repayment-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            loan repayment calculator
          </Link>{" "}
          or estimate home loan costs with our{" "}
          <Link
            href={toolPath("finance", "mortgage-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            mortgage calculator
          </Link>
          . For a deeper walkthrough of mortgage amortization, read our guide on{" "}
          <Link
            href={blogPath("how-to-calculate-mortgage-payments")}
            className="text-foreground underline underline-offset-2"
          >
            how to calculate mortgage payments
          </Link>
          .
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Compound Interest Formula</h2>
        <div className="bg-muted p-6 rounded-lg my-4 text-center font-mono text-lg">
          A = P(1 + r/n)^(nt)
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          With regular end-of-period contributions:
        </p>
        <div className="bg-muted p-6 rounded-lg my-4 text-center font-mono text-lg">
          A = P(1 + r/n)^(nt) + C × [((1 + r/n)^(nt) − 1) / (r/n)]
        </div>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <strong>A</strong> = Future value (final balance)
          </li>
          <li>
            <strong>P</strong> = Initial principal
          </li>
          <li>
            <strong>r</strong> = Annual interest rate (decimal)
          </li>
          <li>
            <strong>n</strong> = Compounding periods per year
          </li>
          <li>
            <strong>t</strong> = Time in years
          </li>
          <li>
            <strong>C</strong> = Contribution per compounding period
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {compoundInterestFaqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-lg border px-4 py-2 open:bg-muted/30"
            >
              <summary className="cursor-pointer font-medium list-none flex items-center justify-between">
                {faq.question}
                <span className="text-muted-foreground text-sm group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="text-muted-foreground mt-3 pb-2 leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <p className="text-muted-foreground mb-8">
        Explore more tools in our{" "}
        <Link href={categoryPath("finance")} className="text-foreground underline underline-offset-2">
          finance calculators
        </Link>{" "}
        category.
      </p>

      <RelatedTools currentSlug="compound-interest-calculator" />
    </article>
  );
}
