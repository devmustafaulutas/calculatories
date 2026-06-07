interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs: FaqItem[];
}

export function FaqSection({ faqs }: FaqSectionProps) {
  if (faqs.length === 0) return null;

  return (
    <section className="mt-10 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group border rounded-lg p-4"
          >
            <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
              {faq.question}
              <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                ▾
              </span>
            </summary>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
