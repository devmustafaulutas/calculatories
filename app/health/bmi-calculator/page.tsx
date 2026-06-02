import { Metadata } from "next";
import { BMICalculatorWidget } from "@/components/calculators/bmi-calculator";
import { CalculatorPageTemplate } from "@/components/calculator-page-template";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("bmi-calculator")!;

export const metadata: Metadata = {
  title: "BMI Calculator - Calculate Your Body Mass Index",
  description:
    "Free BMI calculator to check your body mass index. Supports metric and imperial units. Find your BMI category and healthy weight range instantly.",
  keywords: [
    "BMI calculator",
    "body mass index calculator",
    "weight calculator",
    "healthy weight calculator",
  ],
  openGraph: {
    title: "BMI Calculator | Calculatories",
    description:
      "Calculate your Body Mass Index instantly. Free online tool for health assessment.",
    url: "https://calculatories.com/health/bmi-calculator",
    images: [
      {
        url: "/og/bmi-calculator.png",
        width: 1200,
        height: 630,
        alt: "BMI Calculator",
      },
    ],
  },
  alternates: {
    canonical: "https://calculatories.com/health/bmi-calculator",
  },
};

const howToUse = [
  "Select your preferred unit system (Imperial or Metric).",
  "Enter your height (feet/inches or centimeters).",
  "Enter your weight (pounds or kilograms).",
  "View your BMI value instantly as you type.",
  "Check your BMI category (Underweight, Normal, Overweight, or Obese).",
  "Review your healthy weight range based on your height.",
];

const faqs = [
  {
    question: "What is BMI and what does it measure?",
    answer:
      "BMI (Body Mass Index) is a screening tool that measures body fat based on your height and weight. It provides a quick assessment of whether your weight falls within a healthy range. While BMI doesn't directly measure body fat, it correlates with more accurate measures of body fatness.",
  },
  {
    question: "What are the BMI categories?",
    answer:
      "BMI categories are: Underweight (BMI less than 18.5), Normal weight (18.5 to 24.9), Overweight (25 to 29.9), and Obese (30 or greater). These categories help identify potential weight-related health risks, though individual health assessments should consider other factors.",
  },
  {
    question: "Is BMI accurate for everyone?",
    answer:
      "BMI has limitations. It may overestimate body fat in athletes and muscular individuals, and underestimate it in older adults who have lost muscle mass. It also doesn't account for factors like bone density, ethnicity, or fat distribution. Use BMI as one of many health indicators.",
  },
  {
    question: "How is BMI calculated?",
    answer:
      "BMI is calculated by dividing weight in kilograms by height in meters squared (kg/m²). In imperial units, multiply weight in pounds by 703, then divide by height in inches squared. Our calculator handles both systems automatically.",
  },
  {
    question: "What is a healthy BMI for adults?",
    answer:
      "A healthy BMI for adults is generally between 18.5 and 24.9. However, optimal BMI can vary based on age, gender, and other factors. Athletes may have a higher BMI due to muscle mass while still being very healthy. Consult a healthcare provider for personalized advice.",
  },
];

function HowToCalculate() {
  return (
    <>
      <h2>How to Calculate BMI</h2>
      <p>
        Body Mass Index (BMI) is a widely used metric for assessing whether
        someone has a healthy body weight for their height. Understanding how
        BMI is calculated helps you interpret your results accurately.
      </p>

      <h3>The BMI Formula</h3>
      <p>BMI can be calculated using either metric or imperial units:</p>
      <div className="bg-muted p-4 rounded-lg my-4 space-y-2">
        <p className="font-mono text-center">
          <strong>Metric:</strong> BMI = weight (kg) ÷ height² (m²)
        </p>
        <p className="font-mono text-center">
          <strong>Imperial:</strong> BMI = [weight (lbs) × 703] ÷ height² (in²)
        </p>
      </div>

      <h3>Example Calculations</h3>
      <p>
        <strong>Metric example:</strong> A person who is 1.75m tall and weighs
        70kg:
      </p>
      <ul>
        <li>BMI = 70 ÷ (1.75 × 1.75)</li>
        <li>BMI = 70 ÷ 3.0625</li>
        <li>BMI = 22.9 (Normal weight)</li>
      </ul>

      <p>
        <strong>Imperial example:</strong> A person who is 5&apos;9&quot; (69 inches)
        and weighs 160 lbs:
      </p>
      <ul>
        <li>BMI = (160 × 703) ÷ (69 × 69)</li>
        <li>BMI = 112,480 ÷ 4,761</li>
        <li>BMI = 23.6 (Normal weight)</li>
      </ul>

      <h3>Understanding BMI Categories</h3>
      <p>The World Health Organization defines BMI categories as follows:</p>
      <ul>
        <li>
          <strong>Underweight:</strong> BMI less than 18.5 - May indicate
          malnutrition or other health issues
        </li>
        <li>
          <strong>Normal weight:</strong> BMI 18.5-24.9 - Associated with lowest
          health risks
        </li>
        <li>
          <strong>Overweight:</strong> BMI 25-29.9 - Increased risk of certain
          health conditions
        </li>
        <li>
          <strong>Obese:</strong> BMI 30 or higher - Higher risk of serious
          health conditions
        </li>
      </ul>

      <h3>Limitations of BMI</h3>
      <p>
        While BMI is a useful screening tool, it has important limitations:
      </p>
      <ul>
        <li>
          Doesn&apos;t distinguish between muscle and fat (athletes may have high BMI
          but low body fat)
        </li>
        <li>Doesn&apos;t account for fat distribution (belly fat vs. other areas)</li>
        <li>May not be accurate for elderly individuals or growing children</li>
        <li>Doesn&apos;t consider ethnic differences in body composition</li>
      </ul>
      <p>
        For a complete health assessment, consider BMI alongside other measures
        like waist circumference, body fat percentage, and consultation with a
        healthcare provider.
      </p>
    </>
  );
}

export default function BMICalculatorPage() {
  return (
    <CalculatorPageTemplate
      calculator={calculator}
      howToUse={howToUse}
      howToCalculate={<HowToCalculate />}
      faqs={faqs}
    >
      <BMICalculatorWidget />
    </CalculatorPageTemplate>
  );
}
