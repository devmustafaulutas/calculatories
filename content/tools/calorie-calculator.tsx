import Link from "next/link";
import { InContentAd } from "@/components/ads/InContentAd";
import { Citation } from "@/components/seo/Citation";
import { RelatedTools } from "@/components/seo/RelatedTools";
import type { FAQItem } from "@/lib/types";
import { toolPath } from "@/lib/urls";

export const calorieFaqs: FAQItem[] = [
  {
    question: "What is TDEE (total daily energy expenditure)?",
    answer:
      "TDEE is the total number of calories you burn in a day, including basal metabolism, physical activity, exercise, and the energy cost of digesting food. It represents your maintenance calorie level — the intake at which your weight stays roughly stable over time.",
  },
  {
    question: "How many calories should I eat to lose weight?",
    answer:
      "Subtract about 500 kcal/day from your TDEE for a pace of roughly one pound of fat loss per week, since one pound of fat stores about 3,500 kcal. Our calculator applies this adjustment automatically when you select the weight-loss goal. Very low intakes (below ~1,200 kcal/day for most adults) are not recommended without medical supervision.",
  },
  {
    question: "What activity level should I choose?",
    answer:
      "Pick the option that best describes your typical week, not your most active day. Sedentary fits desk jobs with little exercise. Light covers 1–3 workouts per week. Moderate fits 3–5 sessions. Active and extra-active levels are for daily training or physically demanding jobs. When unsure, start conservative and adjust based on scale trends over two to three weeks.",
  },
  {
    question: "How accurate is this calorie calculator?",
    answer:
      "This tool uses the Mifflin-St Jeor equation for BMR and standard activity multipliers endorsed by major health organizations. Estimates are typically within 10–15% of measured expenditure for most adults, but individual variation exists. Use the result as a starting point and refine based on your real-world weight changes.",
  },
  {
    question: "Should I eat back exercise calories?",
    answer:
      "If you selected an activity level that already includes your regular workouts, do not add exercise calories on top — that double-counts activity. If you chose sedentary but occasionally exercise, either bump your activity level or add a portion of tracked burn. Consistency matters more than chasing perfect precision every single day.",
  },
];

export function CalorieCalculatorContent() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          What Is a Calorie Calculator (TDEE)?
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A calorie calculator estimates how many calories you need each day
          based on your body size, age, sex, activity level, and weight goal.
          Unlike a simple BMR tool that only measures rest, this calculator
          computes total daily energy expenditure (TDEE) — your full maintenance
          calorie burn including walking, working, training, and everyday
          movement. Whether you want to lose fat, maintain your current weight,
          or add lean mass, TDEE is the anchor number that turns nutrition
          advice into a concrete daily target.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Our calculator starts with the Mifflin-St Jeor basal metabolic rate
          formula, then multiplies BMR by an activity factor ranging from 1.2
          (sedentary) to 1.9 (extra active). Select a goal and the tool adjusts
          maintenance calories by ±500 kcal/day — a widely used heuristic linked
          to roughly one pound of weight change per week. Results update
          instantly as you change inputs. For resting metabolism alone, see our{" "}
          <Link
            href={toolPath("health", "bmr-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            BMR calculator
          </Link>
          ; for protein, carb, and fat splits, try our{" "}
          <Link
            href={toolPath("health", "macro-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            macro calculator
          </Link>
          . Review our{" "}
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
          </Link>{" "}
          for how we validate health formulas.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          How to Use This Calorie Calculator
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
          <li className="pl-2">
            Enter your sex, age, height, and weight (imperial or metric).
          </li>
          <li className="pl-2">
            Select the activity level that best matches your typical week.
          </li>
          <li className="pl-2">
            Choose your goal: maintain weight, lose (~1 lb/week), or gain (~1
            lb/week).
          </li>
          <li className="pl-2">
            Review BMR (rest), TDEE (maintenance), and goal calories side by
            side.
          </li>
          <li className="pl-2">
            Copy your goal calorie target and track intake with a food diary or
            app.
          </li>
          <li className="pl-2">
            Reassess every few weeks — adjust activity level or calories if
            weight trends differ from your goal.
          </li>
        </ol>
      </section>

      <InContentAd />

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          How TDEE Is Calculated
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Total daily energy expenditure combines several components. Basal
          metabolic rate (BMR) is the largest slice for most people — the
          energy required to keep organs functioning at rest. Activity
          thermogenesis covers deliberate exercise and non-exercise movement
          like fidgeting, standing, and household chores (often called NEAT).
          The thermic effect of food (TEF) is the energy cost of digesting
          meals, typically 8–12% of intake. Practical TDEE formulas fold
          activity and TEF into a single multiplier applied to BMR rather than
          calculating each term separately.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The activity multipliers used here follow the standard five-level
          scale recommended in clinical and sports nutrition references. A
          sedentary office worker might multiply BMR by 1.2. Someone who trains
          three to five days per week often lands near 1.55 (moderate). Daily
          athletes or people with physically demanding jobs may approach 1.725 to
          1.9. These factors are approximations — your true multiplier depends
          on step count, training intensity, and lifestyle habits the categories
          cannot fully capture.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Consider a 30-year-old woman, 5 feet 6 inches (168 cm), 150 pounds
          (68 kg), with moderate activity. Her BMR calculates to roughly 1,430
          kcal/day. Multiplying by 1.55 yields a TDEE near 2,217 kcal/day —
          her estimated maintenance. Selecting a weight-loss goal subtracts 500
          kcal, targeting about 1,717 kcal/day. At that deficit, she would
          theoretically lose close to one pound per week, though water weight
          fluctuations can mask fat loss on the scale in the short term.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Major health agencies emphasize sustainable deficits and adequate
          nutrition over extreme restriction. The{" "}
          <Citation
            label="Centers for Disease Control and Prevention"
            url="https://www.cdc.gov/healthy-weight-growth/losing-weight/"
          />{" "}
          recommends gradual weight loss of about one to two pounds per week for
          most adults. The{" "}
          <Citation
            label="National Institutes of Health"
            url="https://www.niddk.nih.gov/health-information/weight-management/body-weight-planner"
          />{" "}
          Body Weight Planner uses similar energy-balance principles to project
          weight change over time. Our ±500 kcal adjustment aligns with this
          evidence-based pace while capping very low targets at 1,200 kcal/day
          for safety.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">TDEE Formula Overview</h2>
        <div className="bg-muted p-6 rounded-lg my-4 text-center font-mono text-lg space-y-2">
          <p>TDEE = BMR × Activity Multiplier</p>
          <p>Goal calories = TDEE ± 500 (lose / gain)</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-muted-foreground border rounded-lg">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-semibold text-foreground">
                  Activity level
                </th>
                <th className="text-left p-3 font-semibold text-foreground">
                  Multiplier
                </th>
                <th className="text-left p-3 font-semibold text-foreground">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">Sedentary</td>
                <td className="p-3">1.2</td>
                <td className="p-3">Little or no exercise</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Light</td>
                <td className="p-3">1.375</td>
                <td className="p-3">Exercise 1–3 days/week</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Moderate</td>
                <td className="p-3">1.55</td>
                <td className="p-3">Exercise 3–5 days/week</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Active</td>
                <td className="p-3">1.725</td>
                <td className="p-3">Exercise 6–7 days/week</td>
              </tr>
              <tr>
                <td className="p-3">Extra active</td>
                <td className="p-3">1.9</td>
                <td className="p-3">Physical job or 2× daily training</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          Turning TDEE Into a Nutrition Plan
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Calories set the quantity; macros shape the quality of your plate.
          Once you have a goal calorie target, distribute protein, carbohydrates,
          and fats to support muscle retention during a cut or fuel performance
          during a bulk. Many adults benefit from 0.7–1.0 grams of protein per
          pound of goal body weight, especially when eating in a deficit. Our{" "}
          <Link
            href={toolPath("health", "macro-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            macro calculator
          </Link>{" "}
          builds on the same anthropometric inputs to suggest a balanced split.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Context matters beyond the calorie number. Sleep deprivation, chronic
          stress, and highly processed diets can blunt adherence even when the
          math is correct. Pair calorie targets with body-composition awareness
          via our{" "}
          <Link
            href={toolPath("health", "bmi-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            BMI calculator
          </Link>{" "}
          and{" "}
          <Link
            href={toolPath("health", "body-fat-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            body fat calculator
          </Link>
          . Track trends over two to four weeks rather than reacting to daily
          scale noise. If weight is not moving as expected, adjust calories by
          100–200 kcal before overhauling your entire approach.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {calorieFaqs.map((faq, index) => (
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

      <RelatedTools currentSlug="calorie-calculator" />
    </article>
  );
}
