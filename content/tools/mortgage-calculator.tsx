import Link from "next/link";
import { InContentAd } from "@/components/ads/InContentAd";
import { Citation } from "@/components/seo/Citation";
import { RelatedTools } from "@/components/seo/RelatedTools";
import type { FAQItem } from "@/lib/types";
import { toolPath } from "@/lib/urls";

export const mortgageFaqs: FAQItem[] = [
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

export function MortgageCalculatorContent() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What Is a Mortgage Calculator?</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A mortgage calculator is a financial tool that estimates your monthly
          home loan payment based on the home price, down payment, interest rate,
          and loan term. Whether you are a first-time buyer comparing neighborhoods
          or a homeowner considering a refinance, a mortgage calculator gives you
          the numbers you need before you talk to a lender. Our free mortgage
          calculator uses the same standard amortization formula that banks and
          credit unions rely on, so you can trust the output as a reliable
          starting point for your home buying budget.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Unlike a simple payment estimator, this tool also shows your total
          interest cost and a month-by-month amortization breakdown. That
          transparency helps you understand how much of each payment goes toward
          paying down the loan versus paying interest — especially important in
          the early years of a 30-year mortgage when interest dominates. On the
          other side of the ledger, see how savings grow with our{" "}
          <Link
            href={toolPath("finance", "compound-interest-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            compound interest calculator
          </Link>
          . For editorial standards on how we source rates and verify formulas,
          see our{" "}
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
          How to Use This Mortgage Calculator
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
          <li className="pl-2">
            Enter the total home price you are considering purchasing.
          </li>
          <li className="pl-2">
            Input your down payment amount (the money you will pay upfront).
          </li>
          <li className="pl-2">
            Set the annual interest rate offered by your lender.
          </li>
          <li className="pl-2">
            Select your preferred loan term (15, 20, or 30 years are common
            options).
          </li>
          <li className="pl-2">
            View your estimated monthly payment instantly as you adjust the
            values.
          </li>
          <li className="pl-2">
            Review the amortization table and total interest to understand the
            full cost of borrowing.
          </li>
        </ol>
      </section>

      <InContentAd />

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          How to Calculate Mortgage Payments Manually
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Learning to calculate a mortgage payment by hand builds confidence
          when you review lender quotes. The process starts with four inputs:
          home price, down payment, annual interest rate, and loan term in
          years. First, subtract your down payment from the home price to find
          the principal (P). Next, divide the annual interest rate by 12 to
          convert it to a monthly decimal rate (r). Multiply the loan term by 12
          to get the total number of monthly payments (n). Plug these values
          into the standard amortization formula and you have your monthly
          payment (M).
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The formula looks intimidating, but each piece has a clear meaning. The
          numerator P × [r(1+r)^n] represents the compounded cost of borrowing
          the principal at rate r over n periods. The denominator [(1+r)^n − 1]
          normalizes that growth so the payment stays level every month. This is
          why your early payments are mostly interest: the outstanding balance
          is highest at the start, so r × balance produces a large interest
          charge even though M stays constant.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Let us walk through a concrete example. Suppose you are buying a home
          for $350,000 with a $70,000 down payment (20%), a 6.5% annual interest
          rate, and a 30-year term. The principal is $350,000 − $70,000 =
          $280,000. The monthly rate is 6.5% ÷ 12 = 0.005417 (about 0.5417%).
          The number of payments is 30 × 12 = 360. Applying the formula gives a
          monthly payment of approximately $1,770. Over 360 payments, you would
          pay about $636,800 total, of which roughly $356,800 is interest on top
          of the $280,000 principal.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          You can sanity-check this result by comparing loan terms. Run the same
          $280,000 principal at 6.5% for 15 years and the monthly payment jumps
          to roughly $2,441 — but total interest falls to about $159,400, saving
          you nearly $200,000 compared with the 30-year option. That trade-off
          between monthly affordability and lifetime cost is exactly what a
          mortgage calculator is designed to illuminate.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Keep in mind that manual calculations cover principal and interest
          (P&amp;I) only. Your actual housing payment may also include property
          taxes, homeowners insurance, and HOA fees. According to the{" "}
          <Citation
            label="Consumer Financial Protection Bureau"
            url="https://www.consumerfinance.gov/owning-a-home/"
          />
          , understanding P&amp;I separately helps you compare loan offers
          apples-to-apples before adding escrow items. The{" "}
          <Citation
            label="Federal Reserve"
            url="https://www.federalreserve.gov/releases/h15/"
          />{" "}
          publishes average mortgage rate data weekly, which is useful for
          benchmarking the rate you enter in the calculator.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          If you are comparing markets, also look at localized data. Median home
          prices vary widely by state — the{" "}
          <Citation
            label="US Census Bureau American Community Survey"
            url="https://www.census.gov/programs-surveys/acs"
          />{" "}
          reports state-level medians that can anchor your home price input. For
          state-specific estimates, try our localized calculators for{" "}
          <Link
            href={toolPath("finance", "mortgage-calculator") + "/new-york"}
            className="text-foreground underline underline-offset-2"
          >
            New York
          </Link>{" "}
          and{" "}
          <Link
            href={toolPath("finance", "mortgage-calculator") + "/california"}
            className="text-foreground underline underline-offset-2"
          >
            California
          </Link>
          .
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Mortgage Payment Formula</h2>
        <div className="bg-muted p-6 rounded-lg my-4 text-center font-mono text-lg">
          M = P × [r(1+r)^n] / [(1+r)^n − 1]
        </div>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <strong>M</strong> = Monthly payment (principal + interest)
          </li>
          <li>
            <strong>P</strong> = Principal loan amount (home price − down payment)
          </li>
          <li>
            <strong>r</strong> = Monthly interest rate (annual rate ÷ 12)
          </li>
          <li>
            <strong>n</strong> = Total number of payments (years × 12)
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {mortgageFaqs.map((faq, index) => (
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

      <RelatedTools currentSlug="mortgage-calculator" />
    </article>
  );
}
