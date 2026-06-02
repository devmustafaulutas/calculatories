"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchCalculators, Calculator } from "@/lib/calculators";
import Link from "next/link";

export function HeroSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Calculator[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length > 1) {
      setResults(searchCalculators(value));
    } else {
      setResults([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      router.push(`/${results[0].categorySlug}/${results[0].slug}`);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search calculators... (e.g., mortgage, BMI, compound interest)"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="w-full h-14 pl-12 pr-4 text-lg rounded-xl border-2 border-border focus:border-primary transition-colors"
          />
        </div>
      </form>

      {isFocused && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-xl shadow-lg overflow-hidden z-50">
          {results.slice(0, 5).map((calc) => (
            <Link
              key={calc.slug}
              href={`/${calc.categorySlug}/${calc.slug}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors"
            >
              <div className="flex-1">
                <div className="font-medium">{calc.name}</div>
                <div className="text-sm text-muted-foreground">
                  {calc.category}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
