# Calculatories.com — Tool Catalog & Build Roadmap

Source of truth for the calculator build-out. 53 tools across 10 batches. Demand/CPM/Competition are qualitative tiers (H/M/L) pending a Semrush/Ahrefs pull, not precise search volumes.

## Build sequence

| Batch | Theme | Shared-Logic Core | Priority | Tools | Status |
|---|---|---|---|---|---|
| 1 | Finance core (reference) | Amortization + interest-growth | P1 | 3 | DONE |
| 2 | Health cluster | Anthropometric core | P1 | 6 | Next |
| 3 | Utility: percentage & date | Percentage + date cores | P1 | 5 | Queued |
| 4 | Salary / pay | Pay-period core | P1-P2 | 5 | Queued |
| 5 | Finance: loans & debt | Amortization core (reuse) | P2 | 6 | Queued |
| 6 | Finance: savings & growth | Interest-growth core (reuse) | P2 | 6 | Queued |
| 7 | Tax | Tax core (data-table backed) | P2-P3 | 5 | Queued |
| 8 | Legal / HR (US+UK) | Entitlement core | P1-P2 | 5 | Queued |
| 9 | SEO / text tools | Text-processing core | P2-P3 | 6 | Queued |
| 10 | Utility: grades & misc | Grade/date/conversion cores | P3 | 6 | Queued |
|  |  |  | TOTAL | 53 |  |

## Catalog

| Batch | Category | Tool Name | URL Path | Primary Keyword | Demand | CPM/Value | Competition | YMYL | Shared-Logic Core | Priority | Status | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Finance | Mortgage Calculator | /finance/mortgage-calculator | mortgage calculator | H | H | H | Y | Amortization core | P1 | Live | Reference build; shared finance core |
| 1 | Finance | Compound Interest Calculator | /finance/compound-interest-calculator | compound interest calculator | H | H | H | Y | Interest-growth core | P1 | Live |  |
| 1 | Finance | Loan Repayment Calculator | /finance/loan-repayment-calculator | loan repayment calculator | H | H | H | Y | Amortization core | P1 | Live |  |
| 2 | Health | BMI Calculator | /health/bmi-calculator | bmi calculator | H | M | H | Y | Anthropometric core | P1 | Planned | Metric/Imperial; original Phase-1 core |
| 2 | Health | Calorie Calculator (TDEE) | /health/calorie-calculator | calorie calculator | H | M | H | Y | Anthropometric core | P1 | Planned | TDEE/maintenance; original Phase-1 core |
| 2 | Health | BMR Calculator | /health/bmr-calculator | bmr calculator | M | M | M | Y | Anthropometric core | P1 | Planned | Mifflin-St Jeor |
| 2 | Health | Body Fat Calculator | /health/body-fat-calculator | body fat calculator | M | M | M | Y | Anthropometric core | P2 | Planned | US Navy method |
| 2 | Health | Ideal Weight Calculator | /health/ideal-weight-calculator | ideal weight calculator | M | M | M | Y | Anthropometric core | P2 | Planned |  |
| 2 | Health | Macro Calculator | /health/macro-calculator | macro calculator | M | M | M | Y | Anthropometric core | P2 | Planned | Builds on TDEE |
| 3 | Productivity | Percentage Calculator | /tools/percentage-calculator | percentage calculator | H | L | H | N | Percentage core | P1 | Planned | Very high volume; AdSense traffic builder; Phase-1 core |
| 3 | Productivity | Age Calculator | /tools/age-calculator | age calculator | H | L | H | N | Date core | P1 | Planned | Original Phase-1 core |
| 3 | Productivity | Tip Calculator | /tools/tip-calculator | tip calculator | H | L | M | N | Percentage core | P1 | Planned | Original Phase-1 core |
| 3 | Productivity | Discount Calculator | /tools/discount-calculator | discount calculator | M | L | M | N | Percentage core | P2 | Planned | Sale price |
| 3 | Productivity | Days Between Dates | /tools/days-between-dates | days between dates calculator | M | L | M | N | Date core | P2 | Planned |  |
| 4 | Salary | Salary to Hourly Calculator | /salary/salary-to-hourly | salary to hourly calculator | H | M | M | N | Pay-period core | P1 | Planned | Original Phase-1 core |
| 4 | Salary | Hourly to Salary Calculator | /salary/hourly-to-salary | hourly to salary calculator | M | M | M | N | Pay-period core | P2 | Planned |  |
| 4 | Salary | Overtime Calculator | /salary/overtime-calculator | overtime pay calculator | M | M | M | N | Pay-period core | P2 | Planned |  |
| 4 | Salary | Pay Raise Calculator | /salary/pay-raise-calculator | pay raise calculator | M | M | L | N | Percentage core | P2 | Planned |  |
| 4 | Salary | Pro-Rata Salary Calculator | /salary/pro-rata-salary | pro rata salary calculator | M | M | L | N | Pay-period core | P3 | Planned | UK-leaning |
| 5 | Finance | Auto Loan Calculator | /finance/auto-loan-calculator | auto loan calculator | H | H | H | Y | Amortization core | P2 | Planned | Reuses existing finance core |
| 5 | Finance | Credit Card Payoff Calculator | /finance/credit-card-payoff-calculator | credit card payoff calculator | M | H | M | Y | Amortization core | P2 | Planned |  |
| 5 | Finance | Student Loan Calculator | /finance/student-loan-calculator | student loan calculator | M | H | M | Y | Amortization core | P2 | Planned |  |
| 5 | Finance | Debt Payoff Calculator | /finance/debt-payoff-calculator | debt snowball calculator | M | H | M | Y | Amortization core | P2 | Planned | Snowball/avalanche |
| 5 | Finance | Refinance Calculator | /finance/refinance-calculator | refinance calculator | M | H | M | Y | Amortization core | P3 | Planned |  |
| 5 | Finance | Amortization Schedule Calculator | /finance/amortization-schedule | amortization calculator | M | H | M | Y | Amortization core | P3 | Planned |  |
| 6 | Finance | Savings Calculator | /finance/savings-calculator | savings calculator | M | H | M | Y | Interest-growth core | P2 | Planned | Reuses compound core |
| 6 | Finance | Simple Interest Calculator | /finance/simple-interest-calculator | simple interest calculator | M | H | M | Y | Interest-growth core | P2 | Planned |  |
| 6 | Finance | Retirement Calculator | /finance/retirement-calculator | retirement calculator | H | H | H | Y | Interest-growth core | P2 | Planned | 401k; strong incumbents (NerdWallet/Bankrate) |
| 6 | Finance | CD Calculator | /finance/cd-calculator | cd calculator | M | H | M | Y | Interest-growth core | P3 | Planned | Certificate of deposit |
| 6 | Finance | Inflation Calculator | /finance/inflation-calculator | inflation calculator | M | H | M | Y | Interest-growth core | P3 | Planned | Needs CPI data table |
| 6 | Finance | ROI Calculator | /finance/roi-calculator | roi calculator | M | H | M | Y | Interest-growth core | P3 | Planned |  |
| 7 | Finance | Sales Tax Calculator | /finance/sales-tax-calculator | sales tax calculator | H | H | M | Y | Tax core | P2 | Planned | State rates; data table + annual update |
| 7 | Salary | Take-Home Pay Calculator | /salary/take-home-pay | take home pay calculator | H | H | H | Y | Tax core | P3 | Planned | Paycheck; tax+FICA; high maintenance |
| 7 | Finance | Income Tax Calculator (US) | /finance/income-tax-calculator | income tax calculator | H | H | H | Y | Tax core | P3 | Planned | Federal+state brackets; high maintenance |
| 7 | Finance | Self-Employment Tax Calculator | /finance/self-employment-tax | self employment tax calculator | M | H | M | Y | Tax core | P3 | Planned |  |
| 7 | Finance | Capital Gains Tax Calculator | /finance/capital-gains-tax | capital gains tax calculator | M | H | M | Y | Tax core | P3 | Planned |  |
| 8 | Legal | PTO Calculator | /legal/pto-calculator | pto calculator | M | M | L | N | Entitlement core | P1 | Planned | Original Phase-1 core; US |
| 8 | Legal | Notice Period Calculator | /legal/notice-period-calculator | notice period calculator | M | H | L | Y | Entitlement core | P2 | Planned | UK |
| 8 | Legal | Redundancy Pay Calculator | /legal/redundancy-pay-calculator | redundancy pay calculator | M | H | L | Y | Entitlement core | P2 | Planned | UK statutory; needs rate data |
| 8 | Legal | Holiday Entitlement Calculator | /legal/holiday-entitlement-calculator | holiday entitlement calculator | M | H | L | Y | Entitlement core | P2 | Planned | UK |
| 8 | Legal | Severance Pay Calculator | /legal/severance-calculator | severance pay calculator | M | H | L | Y | Entitlement core | P3 | Planned |  |
| 9 | Tools | Word Counter | /tools/word-count | word counter | H | M | M | N | Text core | P2 | Planned |  |
| 9 | Tools | Character Counter | /tools/character-count | character counter | M | M | M | N | Text core | P3 | Planned |  |
| 9 | Tools | Readability Score Checker | /tools/readability-score | readability checker | M | M | L | N | Text core | P3 | Planned | Flesch |
| 9 | Tools | Keyword Density Checker | /tools/keyword-density | keyword density checker | M | M | L | N | Text core | P3 | Planned |  |
| 9 | Tools | Meta Tag Preview | /tools/meta-tag-preview | meta tag preview tool | M | M | L | N | Text core | P3 | Planned | SERP snippet preview |
| 9 | Tools | Case Converter | /tools/case-converter | case converter | M | L | M | N | Text core | P3 | Planned |  |
| 10 | Productivity | GPA Calculator | /tools/gpa-calculator | gpa calculator | H | L | M | N | Grade core | P2 | Planned | High volume (students) |
| 10 | Productivity | Grade Calculator | /tools/grade-calculator | grade calculator | H | L | M | N | Grade core | P2 | Planned |  |
| 10 | Productivity | Time Duration Calculator | /tools/time-duration | time duration calculator | M | L | M | N | Date core | P3 | Planned |  |
| 10 | Productivity | Days Until Calculator | /tools/days-until | days until calculator | M | L | L | N | Date core | P3 | Planned | Countdown |
| 10 | Productivity | Unit Converter | /tools/unit-converter | unit converter | H | L | H | N | Conversion core | P3 | Planned | Broad & competitive |
| 10 | Productivity | Fraction Calculator | /tools/fraction-calculator | fraction calculator | H | L | M | N | Math core | P3 | Planned |  |

## Guardrails

- Build in batches of ~5, grouped by shared-logic core so each run reuses one tested math/UI core (no duplicated math).
- Each tool must pass the QA gate in `docs/tool-authoring-spec.md` before `status: "live"`. Do NOT mass-publish.
- YMYL tools (finance/health/legal/tax) require author + reviewer byline, citations, and "last updated" per `.cursor/rules`.
- Tax (Batch 7) and UK statutory legal tools (Batch 8) depend on yearly-changing rates — back them with a data table and schedule an annual review.
