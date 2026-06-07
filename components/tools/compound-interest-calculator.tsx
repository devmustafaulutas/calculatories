"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CopyButton } from "@/components/copy-button";
import {
  calculateCompoundInterest,
  type CompoundingFrequency,
  type CompoundInterestInput,
} from "@/lib/compound-interest";
import { formatUSD } from "@/lib/finance/format";

interface CompoundInterestFormState {
  principal: string;
  annualRate: string;
  years: string;
  compoundingFrequency: CompoundingFrequency;
  monthlyContribution: string;
}

function parseInput(state: CompoundInterestFormState): CompoundInterestInput | null {
  const principal = parseFloat(state.principal);
  const annualRatePercent = parseFloat(state.annualRate);
  const years = parseFloat(state.years);
  const monthlyContribution = parseFloat(state.monthlyContribution || "0");

  if (
    state.principal.trim() === "" ||
    state.annualRate.trim() === "" ||
    state.years.trim() === "" ||
    !Number.isFinite(principal) ||
    !Number.isFinite(annualRatePercent) ||
    !Number.isFinite(years) ||
    !Number.isFinite(monthlyContribution)
  ) {
    return null;
  }

  return {
    principal,
    annualRatePercent,
    years,
    compoundingFrequency: state.compoundingFrequency,
    monthlyContribution: monthlyContribution > 0 ? monthlyContribution : undefined,
  };
}

export function CompoundInterestCalculator() {
  const [form, setForm] = useState<CompoundInterestFormState>({
    principal: "10000",
    annualRate: "7",
    years: "10",
    compoundingFrequency: "monthly",
    monthlyContribution: "0",
  });

  const parsedInput = useMemo(() => parseInput(form), [form]);

  const results = useMemo(
    () => (parsedInput ? calculateCompoundInterest(parsedInput) : null),
    [parsedInput],
  );

  const breakdown = results?.yearlyBreakdown.slice(0, 10) ?? [];

  const updateField = <K extends keyof CompoundInterestFormState>(
    field: K,
    value: CompoundInterestFormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="shadow-lg border-2">
      <CardHeader className="bg-primary/5 border-b">
        <CardTitle className="text-xl">Calculate Compound Interest</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="principal">Initial Investment</Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="principal"
                  type="number"
                  inputMode="decimal"
                  value={form.principal}
                  onChange={(e) => updateField("principal", e.target.value)}
                  className="pl-7"
                  min={0}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="annualRate">Annual Interest Rate (%)</Label>
              <div className="relative mt-1.5">
                <Input
                  id="annualRate"
                  type="number"
                  inputMode="decimal"
                  value={form.annualRate}
                  onChange={(e) => updateField("annualRate", e.target.value)}
                  step={0.1}
                  min={0}
                  max={30}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  %
                </span>
              </div>
            </div>

            <div>
              <Label htmlFor="years">Investment Period (years)</Label>
              <Input
                id="years"
                type="number"
                inputMode="decimal"
                value={form.years}
                onChange={(e) => updateField("years", e.target.value)}
                className="mt-1.5"
                min={1}
                max={50}
              />
            </div>

            <div>
              <Label htmlFor="frequency">Compounding Frequency</Label>
              <Select
                value={form.compoundingFrequency}
                onValueChange={(v) =>
                  updateField("compoundingFrequency", v as CompoundingFrequency)
                }
              >
                <SelectTrigger id="frequency" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="monthlyContribution">
                Monthly Contribution (optional)
              </Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="monthlyContribution"
                  type="number"
                  inputMode="decimal"
                  value={form.monthlyContribution}
                  onChange={(e) =>
                    updateField("monthlyContribution", e.target.value)
                  }
                  className="pl-7"
                  min={0}
                />
              </div>
            </div>
          </div>

          <div
            className="bg-muted/50 rounded-lg p-6"
            aria-live="polite"
            aria-atomic="true"
          >
            <p className="font-semibold text-lg mb-4">Your Results</p>
            {results ? (
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Future Value
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-primary">
                      {formatUSD(results.futureValue)}
                    </span>
                    <CopyButton
                      value={results.futureValue.toFixed(2)}
                      label="Copy future value"
                    />
                  </div>
                </div>

                <div className="border-t pt-4 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Interest Earned
                    </div>
                    <span className="text-xl font-semibold">
                      {formatUSD(results.totalInterestEarned)}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Total Contributions
                    </div>
                    <span className="text-xl font-semibold">
                      {formatUSD(results.totalContributions)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Enter valid values to see your results.
              </p>
            )}
          </div>
        </div>

        {breakdown.length > 0 && (
          <div>
            <p className="font-semibold text-lg mb-3">
              Year-by-Year Growth (First 10 Years)
            </p>
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead className="text-right">Contributions</TableHead>
                    <TableHead className="text-right">Interest</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {breakdown.map((row) => (
                    <TableRow key={row.year}>
                      <TableCell>{row.year}</TableCell>
                      <TableCell className="text-right">
                        {formatUSD(row.balance)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatUSD(row.contributionsYtd)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatUSD(row.interestYtd)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
