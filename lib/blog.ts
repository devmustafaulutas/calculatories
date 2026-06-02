export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-calculate-mortgage-payments",
    title: "How to Calculate Mortgage Payments: A Complete Guide",
    excerpt:
      "Learn the mortgage payment formula and understand all the factors that affect your monthly payment. A comprehensive guide for first-time home buyers.",
    content: "",
    author: "Calculatories Team",
    date: "2024-01-15",
    category: "Finance",
    readTime: "8 min read",
  },
  {
    slug: "understanding-compound-interest",
    title: "The Power of Compound Interest: Your Path to Wealth",
    excerpt:
      "Discover how compound interest can grow your wealth exponentially over time. Learn strategies to maximize your investment returns.",
    content: "",
    author: "Calculatories Team",
    date: "2024-01-10",
    category: "Finance",
    readTime: "6 min read",
  },
  {
    slug: "bmi-explained",
    title: "BMI Explained: What Your Body Mass Index Really Means",
    excerpt:
      "Understand what BMI measures, its limitations, and how to use it as part of a comprehensive health assessment.",
    content: "",
    author: "Calculatories Team",
    date: "2024-01-05",
    category: "Health",
    readTime: "5 min read",
  },
  {
    slug: "saving-for-retirement",
    title: "How Much Do You Need to Save for Retirement?",
    excerpt:
      "Use our calculators and this guide to determine your retirement savings goal based on your age, income, and lifestyle expectations.",
    content: "",
    author: "Calculatories Team",
    date: "2024-01-01",
    category: "Finance",
    readTime: "10 min read",
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRecentBlogPosts(limit: number = 3): BlogPost[] {
  return blogPosts.slice(0, limit);
}
