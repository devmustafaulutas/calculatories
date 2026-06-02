"use client";

import { useState, useEffect } from "react";
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
import { ResultSkeleton, TableSkeleton } from "@/components/loading-skeletons";

interface YearBreakdown {
  year: number;
  startBalance: number;
  interest: number;
  endBalance: number;
}

interface CompoundResults {
  finalAmount: number;
  totalInterest: number;
  yearByYear: YearBreakdown[];
}

export function CompoundInterestCalculatorWidget() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(7);
  const [time, setTime] = useState(10);
  const [frequency, setFrequency] = useState("12");
  const [results, setResults] = useState<CompoundResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    setIsCalculating(true);
    const timer = setTimeout(() => {
      const n = parseInt(frequency);
      const r = rate / 100;

      if (principal > 0 && r >= 0 && time > 0 && n > 0) {
        // A = P(1 + r/n)^(nt)
        const finalAmount = principal * Math.pow(1 + r / n, n * time);
        const totalInterest = finalAmount - principal;

        // Calculate year by year breakdown
        const yearByYear: YearBreakdown[] = [];
        for (let year = 1; year <= time; year++) {
          const startBalance =
            year === 1
              ? principal
              : principal * Math.pow(1 + r / n, n * (year - 1));
          const endBalance = principal * Math.pow(1 + r / n, n * year);
          const interest = endBalance - startBalance;

          yearByYear.push({
            year,
            startBalance,
            interest,
            endBalance,
          });
        }

        setResults({
          finalAmount,
          totalInterest,
          yearByYear,
        });
      } else {
        setResults(null);
      }
      setIsCalculating(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [principal, rate, time, frequency]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Card className="shadow-lg border-2">
      <CardHeader className="bg-primary/5 border-b">
        <CardTitle className="text-xl">
          Calculate Compound Interest
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Inputs */}
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
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="pl-7"
                  min={0}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="rate">Annual Interest Rate</Label>
              <div className="relative mt-1.5">
                <Input
                  id="rate"
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  step={0.1}
                  min={0}
                  max={100}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  %
                </span>
              </div>
            </div>

            <div>
              <Label htmlFor="time">Investment Period (Years)</Label>
              <Input
                id="time"
                type="number"
                value={time}
                onChange={(e) => setTime(Number(e.target.value))}
                className="mt-1.5"
                min={1}
                max={50}
              />
            </div>

            <div>
              <Label htmlFor="frequency">Compound Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger id="frequency" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Annually</SelectItem>
                  <SelectItem value="2">Semi-annually</SelectItem>
                  <SelectItem value="4">Quarterly</SelectItem>
                  <SelectItem value="12">Monthly</SelectItem>
                  <SelectItem value="365">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results */}
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-4">Your Results</h3>

            {isCalculating ? (
              <ResultSkeleton />
            ) : results ? (
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Final Amount
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-primary">
                      {formatCurrency(results.finalAmount)}
                    </span>
                    <CopyButton
                      value={results.finalAmount.toFixed(2)}
                      label="Copy"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t pt-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Total Interest
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xl font-semibold text-emerald-600">
                        +{formatCurrency(results.totalInterest)}
                      </span>
                      <CopyButton
                        value={results.totalInterest.toFixed(2)}
                        label=""
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Principal
                    </div>
                    <span className="text-xl font-semibold">
                      {formatCurrency(principal)}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="text-sm text-muted-foreground mb-1">
                    Interest Earned
                  </div>
                  <span className="text-lg font-medium">
                    {((results.totalInterest / principal) * 100).toFixed(1)}%
                    total return
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Enter valid values to see your results.
              </p>
            )}
          </div>
        </div>

        {/* Year by Year Breakdown */}
        {isCalculating ? (
          <TableSkeleton rows={Math.min(time, 5)} />
        ) : results && results.yearByYear.length > 0 ? (
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted/50 px-4 py-3 border-b">
              <h3 className="font-semibold">Year-by-Year Breakdown</h3>
            </div>
            <div className="max-h-80 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead className="text-right">Start Balance</TableHead>
                    <TableHead className="text-right">Interest</TableHead>
                    <TableHead className="text-right">End Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.yearByYear.map((row) => (
                    <TableRow key={row.year}>
                      <TableCell className="font-medium">{row.year}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(row.startBalance)}
                      </TableCell>
                      <TableCell className="text-right text-emerald-600">
                        +{formatCurrency(row.interest)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(row.endBalance)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
