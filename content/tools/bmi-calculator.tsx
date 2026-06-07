import Link from "next/link";
import { InContentAd } from "@/components/ads/InContentAd";
import { Citation } from "@/components/seo/Citation";
import { RelatedTools } from "@/components/seo/RelatedTools";
import type { FAQItem } from "@/lib/types";
import { categoryPath, toolPath } from "@/lib/urls";

export const bmiFaqs: FAQItem[] = [
  {
    question: "What is a healthy BMI range?",
    answer:
      "For most adults, the CDC defines a healthy BMI as 18.5 to 24.9. Below 18.5 is underweight, 25.0 to 29.9 is overweight, and 30.0 or above is obesity. These ranges apply to adults aged 20 and older and do not account for muscle mass, age, or ethnicity.",
  },
  {
    question: "Is BMI accurate for athletes and muscular people?",
    answer:
      "BMI can overestimate body fat in people with high muscle mass, such as athletes and weightlifters, because muscle weighs more than fat per unit volume. It may also underestimate health risk in older adults who have lost muscle. BMI is a screening tool, not a diagnostic measure of body composition.",
  },
  {
    question: "How do I convert height and weight for BMI?",
    answer:
      "You can enter height in feet and inches or centimeters, and weight in pounds or kilograms. The calculator converts internally. In imperial units, BMI equals weight in pounds times 703, divided by height in inches squared. In metric units, BMI equals weight in kilograms divided by height in meters squared.",
  },
  {
    question: "Does BMI differ for children and teens?",
    answer:
      "Yes. For people under 20, BMI is interpreted using age- and sex-specific percentile charts rather than fixed adult cutoffs. A pediatric BMI calculator compares a child result to CDC growth reference data. This tool is designed for adults aged 20 and older.",
  },
  {
    question: "What should I do if my BMI is outside the healthy range?",
    answer:
      "A BMI outside 18.5 to 24.9 is a signal to talk with a healthcare provider, not a diagnosis on its own. Your doctor may consider waist circumference, blood pressure, cholesterol, family history, and lifestyle. Use BMI alongside tools like our calorie calculator to estimate daily energy needs if you are planning weight changes.",
  },
];

export function BmiCalculatorContent() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          What Is a BMI Calculator?
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A BMI calculator estimates your Body Mass Index — a simple ratio of
          weight to height used worldwide as a first-pass screening tool for
          weight categories. Public health agencies including the CDC and NIH
          rely on BMI because it requires only two measurements, correlates
          reasonably with body fat at the population level, and helps identify
          adults who may benefit from further clinical assessment. Our free BMI
          calculator accepts imperial or metric units, shows your numeric result,
          and maps it to standard adult weight categories.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          BMI does not measure body fat directly, and it cannot distinguish
          muscle from fat. Still, it remains one of the most widely cited
          metrics in medical guidelines, insurance underwriting, and wellness
          programs because large epidemiological studies link BMI ranges to
          risks for type 2 diabetes, cardiovascular disease, and certain
          cancers. Use this calculator to get a quick snapshot, then explore
          related health tools for a fuller picture of your energy needs and
          target weight. For how we verify formulas and cite medical sources,
          see our{" "}
          <Link
            href="/editorial-policy"
            className="text-foreground underline underline-offset-2"
          >
            editorial policy
          </Link>{" "}
          and{" "}
          <Link
            href="/methodology"
            className="text-foreground underline underline-offset-2"
          >
            methodology
          </Link>
          .
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          If your BMI suggests you are underweight, overweight, or obese, pair
          the result with our{" "}
          <Link
            href={toolPath("health", "calorie-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            calorie calculator
          </Link>{" "}
          to estimate total daily energy expenditure, or check whether your
          current weight falls within a healthy range using our{" "}
          <Link
            href={toolPath("health", "ideal-weight-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            ideal weight calculator
          </Link>
          . Resting metabolism — the calories your body burns at complete rest
          — is modeled separately in our{" "}
          <Link
            href={toolPath("health", "bmr-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            BMR calculator
          </Link>
          .
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          How to Use This BMI Calculator
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
          <li className="pl-2">
            Choose your preferred unit system: imperial (feet, inches, pounds)
            or metric (centimeters, kilograms).
          </li>
          <li className="pl-2">
            Enter your height. In imperial mode, provide feet and inches
            separately; in metric mode, enter centimeters.
          </li>
          <li className="pl-2">
            Enter your current body weight in pounds or kilograms.
          </li>
          <li className="pl-2">
            Review your BMI value and the weight category assigned by CDC adult
            standards.
          </li>
          <li className="pl-2">
            Compare your result against the category table below to understand
            where you fall relative to underweight, healthy weight, overweight,
            and obesity ranges.
          </li>
          <li className="pl-2">
            Explore related calculators — calorie needs, basal metabolic rate,
            or ideal weight — if you are planning next steps with a healthcare
            provider.
          </li>
        </ol>
      </section>

      <InContentAd />

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          How to Calculate BMI Manually
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Manual BMI calculation requires converting your measurements into
          consistent units, then applying one of two standard formulas. In
          metric form, divide weight in kilograms by height in meters squared.
          In imperial form — common in the United States — multiply weight in
          pounds by 703, then divide by height in inches squared. Both methods
          produce the same BMI when inputs are converted correctly.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Let us work through a concrete example. Suppose you are 5 feet 10
          inches tall and weigh 180 pounds. First convert height to total
          inches: 5 × 12 + 10 = 70 inches. Square the height: 70 × 70 =
          4,900. Multiply weight by the imperial conversion factor: 180 × 703 =
          126,540. Divide: 126,540 ÷ 4,900 ≈ 25.8. Your BMI is approximately
          25.8, which falls in the overweight category (25.0 to 29.9) under
          CDC adult guidelines.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          To verify with metric units, convert 180 lb to about 81.6 kg and 70
          inches to 1.778 m. BMI = 81.6 ÷ (1.778)² = 81.6 ÷ 3.161 ≈ 25.8 — the
          same result. Small rounding differences are normal when converting
          between unit systems. The{" "}
          <Citation label="CDC BMI resources" url="https://www.cdc.gov/bmi/" />{" "}
          and the{" "}
          <Citation
            label="NIH NHLBI BMI calculator"
            url="https://www.nhlbi.nih.gov/health/educational/lose_wt/BMI/bmicalc.htm"
          />{" "}
          publish the same formulas, which is why our calculator aligns with
          government screening tools.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Remember that BMI is a population-level screening metric. A person
          with substantial muscle mass may score in the overweight range despite
          low body fat, while someone with normal BMI may still carry excess
          visceral fat. Waist circumference, body fat percentage, and clinical
          labs provide context that BMI alone cannot. Treat your number as a
          starting point for conversation with a qualified provider, not a
          final verdict on health.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">BMI Formula</h2>
        <div className="bg-muted p-6 rounded-lg my-4 text-center font-mono text-lg">
          BMI = weight (kg) ÷ height (m)²
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Imperial equivalent (US customary units):
        </p>
        <div className="bg-muted p-6 rounded-lg my-4 text-center font-mono text-lg">
          BMI = [weight (lb) × 703] ÷ height (in)²
        </div>
        <ul className="space-y-2 text-muted-foreground mb-6">
          <li>
            <strong>kg</strong> = kilograms
          </li>
          <li>
            <strong>m</strong> = meters
          </li>
          <li>
            <strong>lb</strong> = pounds
          </li>
          <li>
            <strong>in</strong> = inches
          </li>
          <li>
            <strong>703</strong> = conversion factor linking imperial units to
            the metric formula
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-4">
          CDC Adult BMI Categories
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The table below reflects standard adult cutoffs used by the CDC for
          people aged 20 and older. Pediatric and adolescent BMI uses
          percentile charts rather than these fixed thresholds.
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-semibold">Category</th>
                <th className="text-left p-3 font-semibold">BMI Range</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b">
                <td className="p-3">Underweight</td>
                <td className="p-3">Below 18.5</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Healthy weight</td>
                <td className="p-3">18.5 – 24.9</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Overweight</td>
                <td className="p-3">25.0 – 29.9</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Obesity</td>
                <td className="p-3">30.0 and above</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Obesity is sometimes subdivided into Class I (30.0–34.9), Class II
          (35.0–39.9), and Class III (40.0 and above) in clinical settings, but
          the four-row table above covers the screening categories most people
          encounter in everyday use. If your BMI is 25.8 — as in our 5&apos;10&quot;,
          180 lb example — you would be classified as overweight and may wish
          to discuss lifestyle factors, waist measurement, and metabolic markers
          with a doctor before setting weight goals.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {bmiFaqs.map((faq, index) => (
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
        <Link
          href={categoryPath("health")}
          className="text-foreground underline underline-offset-2"
        >
          health calculators
        </Link>{" "}
        category, including BMR, calorie, and ideal weight tools for a complete
        picture of your anthropometric profile.
      </p>

      <RelatedTools currentSlug="bmi-calculator" />
    </article>
  );
}
