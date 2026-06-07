import Link from "next/link";
import { InContentAd } from "@/components/ads/InContentAd";
import { Citation } from "@/components/seo/Citation";
import { RelatedTools } from "@/components/seo/RelatedTools";
import type { FAQItem } from "@/lib/types";
import { categoryPath, toolPath } from "@/lib/urls";

export const idealWeightFaqs: FAQItem[] = [
  {
    question: "What is ideal weight?",
    answer:
      "Ideal weight is a target body weight associated with lower health risk for a given height and sex. There is no single perfect number — healthy ranges span several pounds or kilograms. This calculator shows a BMI-based healthy range (18.5–24.9) and the Devine formula estimate as reference points, not medical prescriptions.",
  },
  {
    question: "How is the healthy weight range calculated?",
    answer:
      "We convert your height to meters, square it, and multiply by BMI 18.5 for the minimum and 24.9 for the maximum. That produces the weight span the CDC and WHO commonly associate with normal BMI classification. The midpoint is the average of min and max.",
  },
  {
    question: "What is the Devine formula?",
    answer:
      "The Devine formula (1974) estimates ideal body weight from height and sex: for men, 110 lb plus 5.2046 lb per inch over 5 feet; for women, 100.3 lb plus 4.5359 lb per inch over 5 feet. Clinicians historically used it for drug dosing and ventilation settings. It is one reference point, not a universal target.",
  },
  {
    question: "Why doesn't age affect ideal weight here?",
    answer:
      "Standard BMI healthy ranges and the Devine formula use height and sex only. Age influences muscle mass and fat distribution, but population BMI cutoffs do not shift by age in most public health guidelines. Older adults may be healthy slightly above the range if they maintain muscle and metabolic health — discuss individual targets with a clinician.",
  },
  {
    question: "Ideal weight vs. body fat percentage — which matters more?",
    answer:
      "Scale weight alone cannot distinguish muscle from fat. Ideal weight ranges help set ballpark targets, while body fat percentage describes composition. A muscular athlete may exceed the BMI range yet have low body fat. Use both metrics together: check ideal weight for context and body fat for adiposity.",
  },
];

export function IdealWeightCalculatorContent() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          What Is an Ideal Weight Calculator?
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          An ideal weight calculator estimates a healthy target weight for your
          height and sex. Unlike a single number from a vintage insurance chart,
          modern tools report a range — because healthy adults naturally vary by
          frame size, muscle mass, and genetics. Our calculator shows the BMI-based
          healthy band (18.5 to 24.9), the midpoint of that band, and the Devine
          formula estimate side by side in kilograms and pounds.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Whether you are setting a weight-loss goal, checking if your current
          weight falls in a low-risk zone, or comparing clinical formulas, having
          multiple reference points prevents over-reliance on any one method. The
          calculator updates instantly when you switch between imperial and metric
          units or change sex, which adjusts the Devine coefficients. For
          editorial standards on health content, see our{" "}
          <Link href="/editorial-policy" className="text-foreground underline underline-offset-2">
            editorial policy
          </Link>
          .
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          How to Use This Ideal Weight Calculator
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
          <li className="pl-2">Select imperial or metric units.</li>
          <li className="pl-2">Choose sex — the Devine formula uses sex-specific constants.</li>
          <li className="pl-2">Enter your height (weight is optional and not required).</li>
          <li className="pl-2">
            Review the healthy BMI range, midpoint, and Devine estimate in both
            kg and lb.
          </li>
          <li className="pl-2">
            Use the copy button to save results for coaching or medical visits.
          </li>
        </ol>
      </section>

      <InContentAd />

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          BMI Healthy Weight Range Formula
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Body mass index is weight in kilograms divided by height in meters
          squared: BMI = kg / m². Solving for weight at a target BMI gives
          weight = BMI × height(m)². At BMI 18.5 and 24.9, we produce minimum
          and maximum healthy weights for your stature. For a 5-foot-10-inch
          (178 cm) person, height in meters is 1.78, so height squared is about
          3.17. Minimum weight ≈ 18.5 × 3.17 ≈ 58.6 kg (129 lb); maximum ≈ 24.9
          × 3.17 ≈ 79.0 kg (174 lb).
        </p>
        <div className="bg-muted p-6 rounded-lg my-4 text-center font-mono text-lg">
          healthy weight (kg) = BMI × (height in m)²
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The{" "}
          <Citation
            label="CDC — About Adult BMI"
            url="https://www.cdc.gov/bmi/about/index.html"
          />{" "}
          and{" "}
          <Citation
            label="WHO — BMI classification"
            url="https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations"
          />{" "}
          use these cutoffs for population screening. They do not account for
          muscle mass, so athletes may be classified overweight despite low body
          fat. Pair this range with our{" "}
          <Link
            href={toolPath("health", "bmi-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            BMI calculator
          </Link>{" "}
          to see where your current weight sits on the index.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">The Devine Formula</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Devine et al. published sex-specific ideal body weight equations in
          1974 for clinical dosing. For men: IBW (lb) = 110 + 5.2046 × (height in
          inches − 60). For women: IBW (lb) = 100.3 + 4.5359 × (height in inches
          − 60). Only height above 5 feet (60 inches) adds to the base; shorter
          individuals use the base weight. The formula predates modern obesity
          trends but remains common in hospital protocols and nutrition research.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Devine often lands near the middle of the BMI healthy band for average
          heights, but it can fall below or above that band for very tall or
          short people. Treat it as a historical clinical reference, not a
          mandate. If your goal is fat loss, also estimate composition with our{" "}
          <Link
            href={toolPath("health", "body-fat-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            body fat calculator
          </Link>{" "}
          and plan calories with our{" "}
          <Link
            href={toolPath("health", "calorie-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            calorie calculator
          </Link>{" "}
          and{" "}
          <Link
            href={toolPath("health", "macro-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            macro calculator
          </Link>
          .
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          Setting Realistic Weight Goals
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Aiming for the midpoint of the healthy BMI range is reasonable for many
          adults starting a structured program, but gradual progress matters more
          than hitting a exact pound value. Losing 5–10% of body weight can
          improve blood pressure, blood sugar, and joint stress even if you remain
          above the &quot;ideal&quot; line. Strength training preserves lean mass
          so that scale loss reflects fat reduction — check BMR changes with our{" "}
          <Link
            href={toolPath("health", "bmr-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            BMR calculator
          </Link>
          .
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Children, pregnant individuals, and people with edema or muscle-wasting
          conditions need individualized medical guidance; BMI-based ideal weight
          is not designed for those groups. If you have a history of eating
          disorders, focus on behaviors and clinical support rather than numeric
          targets alone.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {idealWeightFaqs.map((faq, index) => (
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
        <Link href={categoryPath("health")} className="text-foreground underline underline-offset-2">
          health calculators
        </Link>{" "}
        for related tools.
      </p>

      <RelatedTools currentSlug="ideal-weight-calculator" />
    </article>
  );
}
