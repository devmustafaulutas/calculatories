"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calculator,
  ChevronDown,
  Menu,
  Search,
  X,
  DollarSign,
  Heart,
  Briefcase,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { categories, searchCalculators } from "@/lib/calculators";

const iconMap: Record<string, React.ReactNode> = {
  DollarSign: <DollarSign className="h-4 w-4" />,
  Heart: <Heart className="h-4 w-4" />,
  Briefcase: <Briefcase className="h-4 w-4" />,
  Clock: <Clock className="h-4 w-4" />,
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchCalculators>>([]);
  const router = useRouter();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 1) {
      setSearchResults(searchCalculators(query));
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      router.push(`/${searchResults[0].categorySlug}/${searchResults[0].slug}`);
      setSearchOpen(false);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Calculator className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Calculatories</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                  Categories
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.slug} asChild>
                    <Link
                      href={`/${category.slug}`}
                      className="flex items-center gap-2"
                    >
                      {iconMap[category.icon]}
                      <span>{category.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/blog"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </Link>

            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search calculators"
              >
                <Search className="h-5 w-5" />
              </Button>

              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-card border rounded-lg shadow-lg p-4">
                  <form onSubmit={handleSearchSubmit}>
                    <Input
                      placeholder="Search calculators..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      autoFocus
                    />
                  </form>
                  {searchResults.length > 0 && (
                    <div className="mt-2 divide-y">
                      {searchResults.slice(0, 5).map((result) => (
                        <Link
                          key={result.slug}
                          href={`/${result.categorySlug}/${result.slug}`}
                          className="block py-2 hover:text-primary transition-colors"
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery("");
                            setSearchResults([]);
                          }}
                        >
                          <div className="font-medium">{result.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {result.category}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="mb-4">
              <form onSubmit={handleSearchSubmit}>
                <Input
                  placeholder="Search calculators..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </form>
              {searchResults.length > 0 && (
                <div className="mt-2 divide-y">
                  {searchResults.slice(0, 3).map((result) => (
                    <Link
                      key={result.slug}
                      href={`/${result.categorySlug}/${result.slug}`}
                      className="block py-2"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setSearchQuery("");
                        setSearchResults([]);
                      }}
                    >
                      <div className="font-medium">{result.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {result.category}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <nav className="space-y-2">
              <div className="font-medium text-sm text-muted-foreground mb-2">
                Categories
              </div>
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/${category.slug}`}
                  className="flex items-center gap-2 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {iconMap[category.icon]}
                  <span>{category.name}</span>
                </Link>
              ))}
              <div className="border-t pt-2 mt-2">
                <Link
                  href="/blog"
                  className="block py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/about"
                  className="block py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
