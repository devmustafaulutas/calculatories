import Link from "next/link";
import { InContentAd } from "@/components/ads/InContentAd";
import { Citation } from "@/components/seo/Citation";
import { RelatedTools } from "@/components/seo/RelatedTools";
import type { FAQItem } from "@/lib/types";
import { categoryPath, toolPath } from "@/lib/urls";

export const bodyFatFaqs: FAQItem[] = [
  {
    question: "What is body fat percentage?",
    answer:
      "Body fat percentage is the proportion of your total body weight that comes from fat tissue, as opposed to lean mass (muscle, bone, organs, and water). Unlike BMI, which only uses height and weight, body fat % attempts to separate adipose tissue from lean tissue. It is commonly used in fitness, clinical screening, and military fitness standards.",
  },
  {
    question: "How accurate is the US Navy body fat method?",
    answer:
      "The US Navy circumference method is a field-tested anthropometric formula that correlates well with hydrostatic weighing and DEXA scans for most adults when measurements are taken consistently. Error margins of roughly 3–4 percentage points are typical. Accuracy depends on correct tape placement, relaxed posture, and measuring at the same time of day.",
  },
  {
    question: "Where do I measure neck, waist, and hip?",
    answer:
      "For the Navy method, measure neck just below the larynx (Adam's apple), sloping slightly downward. Measure waist at the narrowest point for men, or at the navel level for women. Women also measure hips at the widest part of the buttocks. Keep the tape horizontal, snug but not compressing skin.",
  },
  {
    question: "What is a healthy body fat percentage?",
    answer:
      "General fitness guidelines suggest roughly 10–20% for men and 18–28% for women, though athletes and older adults may fall outside these ranges while still being healthy. Essential fat minimums are about 2–5% for men and 10–13% for women. Context matters — muscle mass, age, and activity level all influence what is appropriate for you.",
  },
  {
    question: "Why does this calculator ask for sex?",
    answer:
      "The US Navy publishes separate logarithmic formulas for men and women because fat distribution differs by sex. Men use height, neck, and waist only. Women add hip circumference because waist-to-hip ratio is a stronger predictor of body composition in female populations. Using the wrong formula produces misleading results.",
  },
];

export function BodyFatCalculatorContent() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          What Is a Body Fat Calculator?
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A body fat calculator estimates what share of your total weight comes
          from fat tissue versus lean mass — muscle, bone, organs, and water.
          While bathroom scales only report total pounds or kilograms, body fat
          percentage gives you a clearer picture of composition, which matters
          for fitness goals, health screening, and tracking progress during
          weight loss or strength training. Our free body fat calculator uses the
          US Navy circumference method, the same anthropometric approach used in
          military fitness assessments and many clinical field studies.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          You enter height, weight, sex, age, and tape measurements at the neck
          and waist (plus hips for women). The calculator applies sex-specific
          logarithmic formulas to estimate body fat %, then derives fat mass
          and lean mass in kilograms or pounds. Results update instantly as you
          adjust inputs, so you can compare morning versus evening measurements
          or see how a few inches at the waist changes your estimate. For how we
          verify health formulas, see our{" "}
          <Link href="/methodology" className="text-foreground underline underline-offset-2">
            methodology
          </Link>{" "}
          page.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          How to Use This Body Fat Calculator
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
          <li className="pl-2">Choose imperial (lb, in) or metric (kg, cm) units.</li>
          <li className="pl-2">Select your sex — the Navy formula differs for men and women.</li>
          <li className="pl-2">Enter age, height, and current body weight.</li>
          <li className="pl-2">
            Measure neck circumference just below the larynx, tape sloping
            slightly downward.
          </li>
          <li className="pl-2">
            Measure waist at the narrowest point (men) or at navel level (women).
          </li>
          <li className="pl-2">
            Women: add hip measurement at the widest part of the buttocks.
          </li>
          <li className="pl-2">
            Review body fat %, fat mass, and lean mass. Use the copy button to
            save results.
          </li>
        </ol>
      </section>

      <InContentAd />

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          US Navy Body Fat Formula Explained
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The US Navy method estimates body fat from circumference measurements
          and height using logarithmic regression equations developed from large
          military datasets. For men, the formula uses the log of (waist − neck)
          and the log of height. For women, it uses the log of (waist + hip −
          neck) and the log of height. Constants differ by sex because men and
          women store fat differently — men tend toward abdominal fat, while
          women carry more subcutaneous fat at hips and thighs.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The male equation published in Navy instruction{" "}
          <Citation
            label="OPNAVINST 6110.1J — Physical Readiness Program"
            url="https://www.navy.mil/Resources/Instructions/"
          />{" "}
          takes the form: %BF = 495 / (1.0324 − 0.19077 × log₁₀(waist − neck) +
          0.15456 × log₁₀(height)) − 450, with all circumferences and height in
          inches. The female equation substitutes (waist + hip − neck) and uses
          coefficients 1.29579, −0.35004, and 0.221. Our calculator converts
          metric inputs to inches internally so you can measure in either system.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          After computing body fat percentage, we multiply by total weight to
          get fat mass, then subtract from total weight for lean mass. This
          decomposition helps athletes track muscle retention during a cut and
          helps anyone understand whether scale weight changes reflect fat loss
          or lean tissue changes. The{" "}
          <Citation
            label="CDC — About Adult BMI"
            url="https://www.cdc.gov/bmi/about/index.html"
          />{" "}
          notes that BMI alone cannot distinguish fat from muscle; combining BMI
          with a circumference-based body fat estimate gives a more complete
          picture. Compare your BMI with our{" "}
          <Link
            href={toolPath("health", "bmi-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            BMI calculator
          </Link>
          .
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Body Fat vs. BMI and Weight</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          BMI (body mass index) divides weight by height squared and classifies
          results into underweight, normal, overweight, and obese categories. It
          is fast and population-level useful, but it misclassifies muscular
          people as overweight and can miss normal-weight individuals with high
          body fat — sometimes called &quot;skinny fat.&quot; Body fat
          percentage directly targets adiposity rather than total mass.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Ideal weight ranges based on BMI 18.5–24.9 tell you what a healthy
          scale weight might look like for your height. Our{" "}
          <Link
            href={toolPath("health", "ideal-weight-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            ideal weight calculator
          </Link>{" "}
          shows that range alongside the Devine formula. Calorie and macro
          planning build on the same anthropometric inputs: use our{" "}
          <Link
            href={toolPath("health", "calorie-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            calorie calculator
          </Link>
          ,{" "}
          <Link
            href={toolPath("health", "bmr-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            BMR calculator
          </Link>
          , and{" "}
          <Link
            href={toolPath("health", "macro-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            macro calculator
          </Link>{" "}
          to align nutrition with your composition goals.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Tips for Accurate Measurements</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Consistency beats precision. Measure at the same time of day — morning
          before eating is common — with the same tape measure and the same
          posture. Stand relaxed, feet together, arms at sides. Do not suck in
          your stomach or flex muscles. Take each measurement twice and average
          if they differ by more than half an inch. Hydration, menstrual cycle,
          and recent meals can shift circumferences slightly; track trends over
          weeks rather than reacting to a single reading.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The Navy method is not appropriate for everyone. It was validated on
          adults and may be less accurate for very lean bodybuilders, people
          with significant abdominal distension, or those with mobility
          limitations that affect posture. DEXA scans, hydrostatic weighing, and
          bioelectrical impedance offer alternative estimates with their own
          trade-offs in cost, availability, and error. Treat this calculator as
          a practical field estimate, not a clinical diagnosis.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {bodyFatFaqs.map((faq, index) => (
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
        <Link href={categoryPath("health")} className="text-foreground underline underline-offset-2">
          health calculators
        </Link>{" "}
        category.
      </p>

      <RelatedTools currentSlug="body-fat-calculator" />
    </article>
  );
}
