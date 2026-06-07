import Link from "next/link";
import { InContentAd } from "@/components/ads/InContentAd";
import { Citation } from "@/components/seo/Citation";
import { RelatedTools } from "@/components/seo/RelatedTools";
import type { FAQItem } from "@/lib/types";
import { categoryPath, toolPath } from "@/lib/urls";

export const macroFaqs: FAQItem[] = [
  {
    question: "What are macronutrients?",
    answer:
      "Macronutrients are the three calorie-providing nutrients: protein (4 kcal/g), carbohydrates (4 kcal/g), and fat (9 kcal/g). Your body needs all three for energy, hormone production, tissue repair, and nutrient absorption. Macro counting allocates a daily calorie budget across these three buckets rather than tracking only total calories.",
  },
  {
    question: "How does this calculator determine calorie needs?",
    answer:
      "We estimate basal metabolic rate (BMR) with the Mifflin-St Jeor equation, multiply by an activity factor to get total daily energy expenditure (TDEE), then adjust for your goal: maintenance (no change), weight loss (−500 kcal/day), or weight gain (+500 kcal/day). Minimum calories are capped at 1,200 kcal for safety.",
  },
  {
    question: "Which macro split should I choose?",
    answer:
      "Balanced (30% protein / 40% carbs / 30% fat) suits general health and sustainability. High protein (40/30/30) supports muscle retention during a cut or higher satiety. Low carb (30/20/50) may help some people manage blood sugar or prefer higher fat intake. Athletes with heavy training often need more carbs than low-carb presets provide — adjust based on performance and recovery.",
  },
  {
    question: "How many grams of protein do I need?",
    answer:
      "This calculator sets protein as a percentage of goal calories. At 2,000 kcal and 30% protein, you get 150 g protein (600 kcal ÷ 4). Many active adults target 1.6–2.2 g per kg body weight for muscle goals; compare our gram output to that range and adjust preset or calories if needed.",
  },
  {
    question: "Are macro calculators accurate?",
    answer:
      "They provide evidence-based estimates, not exact requirements. Individual metabolism, NEAT (non-exercise activity), sleep, stress, and medical conditions shift true needs. Use the output as a starting point, track weight and performance for 2–4 weeks, then adjust calories by 100–200 kcal if progress stalls.",
  },
];

export function MacroCalculatorContent() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What Is a Macro Calculator?</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A macro calculator splits your daily calorie target into grams of
          protein, carbohydrates, and fat — the three macronutrients that supply
          energy and support muscle, hormones, and organ function. Instead of
          counting calories alone, macro tracking ensures you get enough protein
          for recovery, enough carbs for training fuel, and enough fat for
          essential fatty acids and fat-soluble vitamins. Our free macro
          calculator combines the Mifflin-St Jeor BMR equation, activity
          multipliers, goal adjustments, and preset splits (balanced, high
          protein, or low carb) into one instant result table.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Enter sex, age, height, weight, activity level, and whether you want
          to maintain, lose, or gain weight. Pick a macro preset and review daily
          calories plus protein, carb, and fat grams. The calculator also shows
          BMR and TDEE so you understand the baseline before goal adjustments.
          Nutrition planning pairs naturally with financial planning — building
          long-term savings with our{" "}
          <Link
            href={toolPath("finance", "compound-interest-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            compound interest calculator
          </Link>{" "}
          reduces financial stress that often derails diet consistency.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          How to Use This Macro Calculator
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
          <li className="pl-2">Choose units and enter sex, age, height, and weight.</li>
          <li className="pl-2">
            Select activity level from sedentary through extra active.
          </li>
          <li className="pl-2">
            Pick a goal: maintain, lose (~500 kcal deficit), or gain (~500 kcal
            surplus).
          </li>
          <li className="pl-2">
            Choose a macro preset: balanced, high protein, or low carb.
          </li>
          <li className="pl-2">
            Read daily calories and the protein / carbs / fat gram table.
          </li>
          <li className="pl-2">
            Copy results into your food logging app or meal prep spreadsheet.
          </li>
        </ol>
      </section>

      <InContentAd />

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          From BMR to TDEE to Macro Grams
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Basal metabolic rate is the energy your body burns at rest for
          breathing, circulation, and cellular maintenance. The Mifflin-St Jeor
          equation (1990) is among the most validated BMR estimates for general
          adults: for men, BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age +
          5; for women, substitute −161 for +5. Multiplying BMR by an activity
          factor yields TDEE — total daily energy expenditure including exercise
          and daily movement.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Activity multipliers follow standard practice: sedentary 1.2, light
          1.375, moderate 1.55, active 1.725, very active 1.9. A 500 kcal daily
          deficit is a common weight-loss target (~1 lb per week). The{" "}
          <Citation
            label="NIH — Aim for a Healthy Weight"
            url="https://www.nhlbi.nih.gov/health/educational/lose_wt/recommen.htm"
          />{" "}
          discusses sustainable calorie reduction. After goal calories are set,
          each macronutrient percentage converts to grams: protein and carbs
          divide by 4 kcal per gram; fat divides by 9 kcal per gram.
        </p>
        <div className="bg-muted p-6 rounded-lg my-4 text-center font-mono text-sm space-y-2">
          <p>protein (g) = (calories × protein%) / 100 / 4</p>
          <p>carbs (g) = (calories × carbs%) / 100 / 4</p>
          <p>fat (g) = (calories × fat%) / 100 / 9</p>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Cross-check BMR alone with our{" "}
          <Link
            href={toolPath("health", "bmr-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            BMR calculator
          </Link>{" "}
          and full calorie estimate with our{" "}
          <Link
            href={toolPath("health", "calorie-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            calorie calculator
          </Link>
          . Composition context from our{" "}
          <Link
            href={toolPath("health", "body-fat-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            body fat calculator
          </Link>{" "}
          and weight targets from our{" "}
          <Link
            href={toolPath("health", "ideal-weight-calculator")}
            className="text-foreground underline underline-offset-2"
          >
            ideal weight calculator
          </Link>{" "}
          help you decide whether to cut, maintain, or lean bulk.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Macro Presets Compared</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          <strong>Balanced (30/40/30)</strong> mirrors mainstream dietary
          guidelines: adequate protein, majority carbs for fiber and training,
          moderate fat for hormones and meal satisfaction. It works well for
          general health and moderate activity.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          <strong>High protein (40/30/30)</strong> raises protein to improve
          satiety and support muscle protein synthesis during fat loss or
          recomposition. Endurance athletes may need to add carbs on hard training
          days beyond what this preset suggests.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          <strong>Low carb (30/20/50)</strong> reduces carbohydrate percentage
          in favor of fat. Some people prefer this for appetite control or
          glycemic management, though evidence on long-term superiority versus
          balanced diets is mixed when calories are equated. Consult a dietitian
          if you manage diabetes or kidney disease.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          Putting Macros Into Practice
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Hit protein first — distribute across 3–4 meals with 25–40 g per sitting
          for most adults. Fill carbohydrates around workouts and fiber-rich
          vegetables. Use fats for cooking, nuts, avocado, and fatty fish. Weigh
          foods for a week to calibrate portion estimates, then relax precision if
          maintenance is stable. Sleep 7–9 hours; the{" "}
          <Citation
            label="Academy of Nutrition and Dietetics — macronutrients"
            url="https://www.eatright.org/health/essential-nutrients/carbohydrates/macronutrients"
          />{" "}
          emphasizes balance rather than eliminating entire macro groups without
          medical reason.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Recalculate when weight changes by more than 5–10 lb, when activity
          shifts substantially, or every 4–6 weeks during a dedicated cut or bulk.
          Plateaus are normal — adjust calories slightly before overhauling your
          entire macro split.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {macroFaqs.map((faq, index) => (
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
        More tools in our{" "}
        <Link href={categoryPath("health")} className="text-foreground underline underline-offset-2">
          health calculators
        </Link>{" "}
        collection.
      </p>

      <RelatedTools currentSlug="macro-calculator" />
    </article>
  );
}
