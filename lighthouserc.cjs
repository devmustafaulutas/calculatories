/** @type {import('lighthouse-ci').LHCI.ServerCommand.Options} */
module.exports = {
  ci: {
    collect: {
      startServerCommand: "pnpm start",
      startServerReadyPattern: "Ready",
      startServerReadyTimeout: 30000,
      url: [
        "http://localhost:3000/",
        "http://localhost:3000/finance/mortgage-calculator",
        "http://localhost:3000/health/bmi-calculator",
        "http://localhost:3000/health/calorie-calculator",
        "http://localhost:3000/blog/how-to-calculate-mortgage-payments",
      ],
      numberOfRuns: 1,
      settings: {
        chromeFlags: "--headless --no-sandbox",
      },
    },
    assert: {
      assertions: {
        "categories:seo": ["error", { minScore: 1 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "largest-contentful-paint": ["warn", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
