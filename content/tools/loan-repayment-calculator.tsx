import Link from "next/link";
import { InContentAd } from "@/components/ads/InContentAd";
import { Citation } from "@/components/seo/Citation";
import { RelatedTools } from "@/components/seo/RelatedTools";
import type { FAQItem } from "@/lib/types";
import { blogPath, categoryPath, toolPath } from "@/lib/urls";

export const loanRepaymentFaqs: FAQItem[] = [
  {
    question: "How is a loan repayment calculated?",
    answer:
      "Loan repayment is calculated using the standard amortization formula: M = P × [r(1+r)^n] / [(1+r)^n − 1], where P is the loan principal, r is the periodic interest rate, and n is the total number of payments. Our calculator applies this formula automatically for any loan amount, rate, and term.",
  },
  {
    question: "What happens at a 0% interest rate?",
    answer:
      "At 0% interest, there is no cost of borrowing. Your monthly payment is simply the principal divided by the number of payments. Total interest is zero, and the amortization schedule shows equal principal payments each month.",
  },
  {
    question: "How do extra monthly payments affect my loan?",
    answer:
      "Extra payments reduce your outstanding balance faster, which lowers total interest and shortens the payoff period. Each extra dollar goes directly toward principal after interest is covered, so even modest additional payments can save months or years on the loan term.",
  },
  {
    question: "How is a loan repayment calculator different from a mortgage calculator?",
    answer:
      "Both use the same amortization math. A mortgage calculator starts from home price and down payment to derive the loan amount, while a loan repayment calculator accepts the principal directly — useful for personal loans, auto loans, and student loans where there is no property purchase price.",
  },
  {
    question: "Can I see how much total interest I will pay?",
    answer:
      "Yes. The calculator displays total interest alongside your monthly payment and payoff timeline. The amortization table shows how each payment splits between principal and interest, so you can see interest front-loaded in the early months.",
  },
];

export function LoanRepaymentCalculatorContent() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          What Is a Loan Repayment Calculator?
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A loan repayment calculator estimates your monthly payment, total interest,
          and payoff schedule for any fixed-rate installment loan. Whether you are
          financing a car, consolidating credit card debt, covering education costs,
          or comparing personal loan offers, a loan repayment calculator translates
          principal, interest rate, and term into concrete numbers before you sign.
          Our free tool uses the same standard amortization formula that banks apply
          to auto loans, personal loans, and other fixed-rate products.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Unlike promotional rate teasers, this calculator shows the full cost of
          borrowing: monthly payment, total interest over the life of the loan, and
          an optional amortization preview. You can also model extra monthly payments
          to see how much time and interest you save by paying ahead. For editorial
          standards on financial content, see our{" "}
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
          How to Use This Loan Repayment Calculator
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
          <li className="pl-2">Enter the total loan amount you plan to borrow.</li>
          <li className="pl-2">
            Set the annual interest rate from your lender&apos;s offer.
          </li>
          <li className="pl-2">Select the loan term in years.</li>
          <li className="pl-2">
            Optionally add an extra monthly payment to model early payoff.
          </li>
          <li className="pl-2">
            Review your monthly payment, total interest, and payoff timeline.
          </li>
          <li className="pl-2">
            Check the amortization table to see principal vs. interest each month.
          </li>
        </ol>
      </section>

      <InContentAd />

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          How to Calculate Loan Payments Manually
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Calculating a loan payment by hand requires three inputs: the principal
          (P), the annual interest rate, and the loan term. First, convert the
          annual rate to a monthly decimal rate (r) by dividing by 12. Next,
          multiply the term in years by 12 to get the total number of monthly
          payments (n). Plug these into the amortization formula to find the level
          monthly payment (M).
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Consider a $20,000 auto loan at 7.5% annual interest for 4 years. The
          monthly rate is 7.5% ÷ 12 = 0.625% (0.00625). The number of payments is
          4 × 12 = 48. Applying the formula: M = $20,000 × [0.00625(1.00625)^48] /
          [(1.00625)^48 − 1] ≈ $484 per month. Over 48 payments, you would pay
          roughly $23,230 total, meaning about $3,230 in interest on top of the
          $20,000 principal.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The amortization schedule explains why early payments feel interest-heavy.
          In month one, interest is 0.00625 × $20,000 = $125, leaving only $359
          toward principal. As the balance shrinks, the interest portion declines
          and more of each payment attacks the principal. Adding a $50 extra payment
          each month accelerates that principal reduction and can shave several months
          off the term.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The same math powers our{" "}
          <Link
            href={toolPath("finance", "mortgage-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            mortgage calculator
          </Link>
          , which derives principal from home price minus down payment. For
          investment growth on the other side of the ledger, try our{" "}
          <Link
            href={toolPath("finance", "compound-interest-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            compound interest calculator
          </Link>
          . The{" "}
          <Citation
            label="Consumer Financial Protection Bureau"
            url="https://www.consumerfinance.gov/ask-cfpb/what-is-amortization-en-1559/"
          />{" "}
          explains how amortization applies across loan types. Our blog guide on{" "}
          <Link
            href={blogPath("how-to-calculate-mortgage-payments")}
            className="text-foreground underline underline-offset-2"
          >
            how to calculate mortgage payments
          </Link>{" "}
          walks through the same formula in a home-buying context.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Loan Repayment Formula</h2>
        <div className="bg-muted p-6 rounded-lg my-4 text-center font-mono text-lg">
          M = P × [r(1+r)^n] / [(1+r)^n − 1]
        </div>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <strong>M</strong> = Monthly payment
          </li>
          <li>
            <strong>P</strong> = Loan principal
          </li>
          <li>
            <strong>r</strong> = Monthly interest rate (annual rate ÷ 12)
          </li>
          <li>
            <strong>n</strong> = Total number of monthly payments
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {loanRepaymentFaqs.map((faq, index) => (
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
        Browse all{" "}
        <Link href={categoryPath("finance")} className="text-foreground underline underline-offset-2">
          finance calculators
        </Link>{" "}
        for related tools.
      </p>

      <RelatedTools currentSlug="loan-repayment-calculator" />
    </article>
  );
}
