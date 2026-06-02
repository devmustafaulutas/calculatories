import { Metadata } from "next";
import { Calculator, Users, Target, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - Calculatories",
  description:
    "Learn about Calculatories - your trusted source for free online calculators. Our mission is to make complex calculations simple and accessible.",
  alternates: {
    canonical: "https://calculatories.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">About Calculatories</h1>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            Calculatories is your trusted source for free, accurate, and
            easy-to-use online calculators. We help millions of people make
            informed decisions about their finances, health, and more.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12 not-prose">
            <div className="bg-muted/50 rounded-lg p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Our Mission</h3>
              <p className="text-muted-foreground">
                To make complex calculations simple and accessible to everyone,
                empowering informed decision-making.
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <Calculator className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">100+ Calculators</h3>
              <p className="text-muted-foreground">
                From mortgages to BMI, we offer a comprehensive suite of
                calculators for every need.
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Millions of Users</h3>
              <p className="text-muted-foreground">
                Trusted by millions of people worldwide who use our tools to
                make important decisions.
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Privacy First</h3>
              <p className="text-muted-foreground">
                All calculations happen in your browser. We never store your
                personal financial data.
              </p>
            </div>
          </div>

          <h2>Our Story</h2>
          <p>
            Calculatories was founded with a simple idea: everyone deserves
            access to accurate, easy-to-use calculation tools. Whether you are
            buying your first home, tracking your health goals, or planning your
            investments, we believe the right tools should be free and
            accessible.
          </p>

          <p>
            We started with just a handful of financial calculators and have
            grown to offer over 100 tools across finance, health, salary, and
            productivity categories. Our calculators are designed with accuracy
            and user experience in mind, ensuring you get reliable results every
            time.
          </p>

          <h2>Our Commitment</h2>
          <p>We are committed to:</p>
          <ul>
            <li>
              <strong>Accuracy:</strong> Our calculators use industry-standard
              formulas verified by experts
            </li>
            <li>
              <strong>Privacy:</strong> Your data stays in your browser - we
              never store sensitive information
            </li>
            <li>
              <strong>Accessibility:</strong> Free to use, no sign-up required,
              works on any device
            </li>
            <li>
              <strong>Education:</strong> We explain the math behind every
              calculation so you can learn
            </li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            Have questions, feedback, or suggestions for new calculators? We
            would love to hear from you. Visit our{" "}
            <a href="/contact" className="text-primary hover:underline">
              contact page
            </a>{" "}
            to get in touch.
          </p>
        </div>
      </div>
    </div>
  );
}
