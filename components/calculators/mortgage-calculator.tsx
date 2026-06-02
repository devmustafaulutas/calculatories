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
import { CopyButton } from "@/components/copy-button";
import { ResultSkeleton } from "@/components/loading-skeletons";

interface MortgageResults {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

export function MortgageCalculatorWidget() {
  const [homePrice, setHomePrice] = useState(350000);
  const [downPayment, setDownPayment] = useState(70000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState("30");
  const [results, setResults] = useState<MortgageResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    setIsCalculating(true);
    const timer = setTimeout(() => {
      const principal = homePrice - downPayment;
      const monthlyRate = interestRate / 100 / 12;
      const numberOfPayments = parseInt(loanTerm) * 12;

      if (principal > 0 && monthlyRate > 0 && numberOfPayments > 0) {
        const monthlyPayment =
          (principal *
            (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        const totalPayment = monthlyPayment * numberOfPayments;
        const totalInterest = totalPayment - principal;

        setResults({
          monthlyPayment,
          totalPayment,
          totalInterest,
        });
      } else {
        setResults(null);
      }
      setIsCalculating(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [homePrice, downPayment, interestRate, loanTerm]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const downPaymentPercent = homePrice > 0 ? (downPayment / homePrice) * 100 : 0;

  return (
    <Card className="shadow-lg border-2">
      <CardHeader className="bg-primary/5 border-b">
        <CardTitle className="text-xl">Calculate Your Mortgage</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="homePrice">Home Price</Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="homePrice"
                  type="number"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className="pl-7"
                  min={0}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="downPayment">
                Down Payment ({downPaymentPercent.toFixed(1)}%)
              </Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="downPayment"
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="pl-7"
                  min={0}
                  max={homePrice}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="interestRate">Interest Rate (% per year)</Label>
              <div className="relative mt-1.5">
                <Input
                  id="interestRate"
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  step={0.125}
                  min={0}
                  max={20}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  %
                </span>
              </div>
            </div>

            <div>
              <Label htmlFor="loanTerm">Loan Term</Label>
              <Select value={loanTerm} onValueChange={setLoanTerm}>
                <SelectTrigger id="loanTerm" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 years</SelectItem>
                  <SelectItem value="15">15 years</SelectItem>
                  <SelectItem value="20">20 years</SelectItem>
                  <SelectItem value="30">30 years</SelectItem>
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
                    Monthly Payment
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-primary">
                      {formatCurrency(results.monthlyPayment)}
                    </span>
                    <CopyButton
                      value={results.monthlyPayment.toFixed(2)}
                      label="Copy"
                    />
                  </div>
                </div>

                <div className="border-t pt-4 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Total Payment
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xl font-semibold">
                        {formatCurrency(results.totalPayment)}
                      </span>
                      <CopyButton
                        value={results.totalPayment.toFixed(2)}
                        label=""
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Total Interest
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xl font-semibold">
                        {formatCurrency(results.totalInterest)}
                      </span>
                      <CopyButton
                        value={results.totalInterest.toFixed(2)}
                        label=""
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="text-sm text-muted-foreground mb-2">
                    Loan Amount
                  </div>
                  <div className="text-lg font-medium">
                    {formatCurrency(homePrice - downPayment)}
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
      </CardContent>
    </Card>
  );
}
