import Link from "next/link";
import { InContentAd } from "@/components/ads/InContentAd";
import { Citation } from "@/components/seo/Citation";
import { RelatedTools } from "@/components/seo/RelatedTools";
import type { FAQItem } from "@/lib/types";
import { toolPath } from "@/lib/urls";

export const bmrFaqs: FAQItem[] = [
  {
    question: "What is BMR (basal metabolic rate)?",
    answer:
      "Basal metabolic rate (BMR) is the number of calories your body burns at complete rest to maintain vital functions such as breathing, circulation, and cell repair. It represents the minimum energy required to keep you alive and does not include calories burned through physical activity, digestion, or exercise.",
  },
  {
    question: "How is BMR calculated?",
    answer:
      "This calculator uses the Mifflin-St Jeor equation (1990), which is widely recommended by dietitians and researchers. For men: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age(y) + 5. For women: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age(y) − 161. The result is expressed in kilocalories per day (kcal/day).",
  },
  {
    question: "What is the difference between BMR and TDEE?",
    answer:
      "BMR measures calories burned at rest only. Total daily energy expenditure (TDEE) includes BMR plus all activity — walking, working, exercising, and even digesting food. To estimate how many calories you should eat daily, multiply BMR by an activity factor to get TDEE. Use our calorie calculator for a full TDEE estimate with weight goals.",
  },
  {
    question: "Why is my BMR different from someone else's?",
    answer:
      "BMR varies based on sex, age, height, and weight. Men typically have higher BMR because they tend to carry more lean mass. BMR generally decreases with age as muscle mass declines. Taller and heavier individuals burn more calories at rest because their bodies require more energy to sustain a larger frame.",
  },
  {
    question: "How can I use my BMR for weight loss or gain?",
    answer:
      "BMR alone is not your daily calorie target — you need TDEE for that. Once you know TDEE, eating below it promotes weight loss and eating above it promotes gain. A common approach is a 500 kcal/day deficit for roughly one pound of fat loss per week. Pair BMR with our calorie calculator and macro calculator to build a complete nutrition plan.",
  },
];

export function BmrCalculatorContent() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What Is a BMR Calculator?</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A BMR calculator estimates your basal metabolic rate — the calories
          your body burns every day just to stay alive, before you walk to the
          mailbox, lift weights, or digest lunch. Think of BMR as your
          metabolic floor: the baseline energy cost of breathing, pumping blood,
          regulating temperature, and repairing cells while you lie in bed. For
          anyone planning meals, cutting calories, or building muscle, knowing
          this number is the first step toward a realistic daily calorie target.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Our free BMR calculator applies the Mifflin-St Jeor equation, the
          formula most nutrition professionals prefer over older methods like
          Harris-Benedict because it tends to predict resting metabolism more
          accurately in modern populations. Enter your sex, age, height, and
          weight in imperial or metric units and you get an instant result in
          kilocalories per day. From there, multiply BMR by an activity factor
          to estimate total daily energy expenditure (TDEE) — or skip straight
          to our{" "}
          <Link
            href={toolPath("health", "calorie-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            calorie calculator
          </Link>{" "}
          for maintenance, weight-loss, and weight-gain targets. For how we
          verify health formulas and source citations, see our{" "}
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
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          How to Use This BMR Calculator
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
          <li className="pl-2">
            Choose imperial (lb, ft/in) or metric (kg, cm) units.
          </li>
          <li className="pl-2">Select your biological sex (male or female).</li>
          <li className="pl-2">Enter your age in years (15–120).</li>
          <li className="pl-2">Input your current height and body weight.</li>
          <li className="pl-2">
            Read your BMR in kcal/day — calories burned at complete rest.
          </li>
          <li className="pl-2">
            Use the copy button to save your result, then estimate TDEE with
            our calorie calculator or plan macros with our{" "}
            <Link
              href={toolPath("health", "macro-calculator")}
              className="text-foreground underline underline-offset-2"
            >
              macro calculator
            </Link>
            .
          </li>
        </ol>
      </section>

      <InContentAd />

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          How to Calculate BMR Manually (Mifflin-St Jeor)
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The Mifflin-St Jeor equation was published in 1990 and validated
          against indirect calorimetry — the gold-standard lab method for
          measuring resting energy expenditure. Researchers found it predicted
          BMR within about 10% of measured values for most healthy adults,
          outperforming the revised Harris-Benedict equation in several
          comparison studies. That accuracy is why registered dietitians,
          sports nutritionists, and clinical guidelines often default to this
          formula when estimating resting metabolism.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The math is straightforward once your measurements are in metric
          units. Convert height to centimeters and weight to kilograms if you
          normally use feet, inches, and pounds. For men, multiply weight by
          10, multiply height by 6.25, subtract five times your age, then add
          5. For women, use the same weight, height, and age terms but subtract
          161 instead of adding 5. The sex-specific constant accounts for
          average differences in lean body mass and hormonal influences on
          resting metabolism.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Here is a worked example. A 30-year-old man who is 5 feet 10 inches
          (178 cm) and weighs 180 pounds (about 82 kg) would calculate: BMR =
          (10 × 82) + (6.25 × 178) − (5 × 30) + 5 = 820 + 1,112.5 − 150 + 5 =
          1,787.5 kcal/day, rounded to 1,788. A woman of the same age, height,
          and weight would subtract 161 instead of adding 5, yielding roughly
          1,621 kcal/day — about 165 fewer calories at rest, reflecting typical
          sex differences in body composition.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          BMR is only the starting point. Your actual daily burn includes
          non-exercise activity (NEAT), structured exercise, and the thermic
          effect of food. The{" "}
          <Citation
            label="National Institutes of Health"
            url="https://www.niddk.nih.gov/health-information/weight-management/body-weight-planner"
          />{" "}
          Body Weight Planner and related nutrition guidance emphasize
          combining resting metabolic rate estimates with activity levels to set
          sustainable calorie targets — not relying on BMR alone. That is why
          we recommend pairing this tool with our{" "}
          <Link
            href={toolPath("health", "calorie-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            TDEE calorie calculator
          </Link>{" "}
          and checking body composition context with our{" "}
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
        <h2 className="text-2xl font-bold mb-4">Mifflin-St Jeor BMR Formula</h2>
        <div className="bg-muted p-6 rounded-lg my-4 text-center font-mono text-lg space-y-2">
          <p>Men: BMR = 10W + 6.25H − 5A + 5</p>
          <p>Women: BMR = 10W + 6.25H − 5A − 161</p>
        </div>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <strong>W</strong> = Weight in kilograms (kg)
          </li>
          <li>
            <strong>H</strong> = Height in centimeters (cm)
          </li>
          <li>
            <strong>A</strong> = Age in years
          </li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Result is expressed in kilocalories per day (kcal/day), commonly
          called &quot;calories&quot; on food labels in the United States.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          What Affects Your Basal Metabolic Rate?
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Lean muscle tissue is metabolically active — it burns more calories at
          rest than fat tissue. That is why resistance training can nudge BMR
          upward over time even if scale weight stays flat. Age matters too:
          BMR typically drops 1–2% per decade after your twenties, largely due
          to gradual muscle loss unless you actively counter it with strength
          work and adequate protein. Genetics, thyroid function, sleep quality,
          and chronic stress also influence resting metabolism, which is why two
          people with identical height and weight can have slightly different
          measured BMR in a lab setting.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Formula-based estimates cannot capture every individual variation.
          Athletes with very low body fat, people recovering from illness, and
          those on certain medications may see results that diverge from
          prediction. Treat your calculated BMR as a well-supported estimate —
          then adjust based on real-world feedback. If you eat at your estimated
          maintenance calories for two to three weeks and weight stays stable,
          your TDEE estimate is on track. If you gain or lose unexpectedly,
          adjust intake by 100–200 kcal and reassess.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {bmrFaqs.map((faq, index) => (
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

      <RelatedTools currentSlug="bmr-calculator" />
    </article>
  );
}
