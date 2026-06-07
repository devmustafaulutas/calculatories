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
  calculateMortgage,
  formatUSD,
  generateAmortizationSchedule,
  type MortgageInput,
} from "@/lib/mortgage";

interface MortgageCalculatorProps {
  defaultRate?: number;
}

interface MortgageFormState {
  homePrice: string;
  downPayment: string;
  interestRate: string;
  loanTerm: string;
}

function parseMortgageInput(state: MortgageFormState): MortgageInput | null {
  const homePrice = parseFloat(state.homePrice);
  const downPayment = parseFloat(state.downPayment);
  const annualRate = parseFloat(state.interestRate);
  const termYears = parseInt(state.loanTerm, 10);

  if (
    state.homePrice.trim() === "" ||
    state.downPayment.trim() === "" ||
    state.interestRate.trim() === "" ||
    !Number.isFinite(homePrice) ||
    !Number.isFinite(downPayment) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(termYears)
  ) {
    return null;
  }

  return { homePrice, downPayment, annualRate, termYears };
}

export function MortgageCalculator({ defaultRate }: MortgageCalculatorProps) {
  const [form, setForm] = useState<MortgageFormState>({
    homePrice: "350000",
    downPayment: "70000",
    interestRate: String(defaultRate ?? 6.5),
    loanTerm: "30",
  });

  const parsedInput = useMemo(() => parseMortgageInput(form), [form]);

  const results = useMemo(
    () => (parsedInput ? calculateMortgage(parsedInput) : null),
    [parsedInput],
  );

  const schedule = useMemo(
    () =>
      parsedInput ? generateAmortizationSchedule(parsedInput) : [],
    [parsedInput],
  );

  const homePriceNum = parseFloat(form.homePrice);
  const downPaymentNum = parseFloat(form.downPayment);
  const downPaymentPercent =
    Number.isFinite(homePriceNum) && homePriceNum > 0 && Number.isFinite(downPaymentNum)
      ? (downPaymentNum / homePriceNum) * 100
      : 0;

  const updateField = (field: keyof MortgageFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="shadow-lg border-2">
      <CardHeader className="bg-primary/5 border-b">
        <CardTitle className="text-xl">Calculate Your Mortgage</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  inputMode="decimal"
                  value={form.homePrice}
                  onChange={(e) => updateField("homePrice", e.target.value)}
                  className="pl-7"
                  min={0}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="downPayment">
                Down Payment (
                {Number.isFinite(downPaymentPercent)
                  ? downPaymentPercent.toFixed(1)
                  : "0.0"}
                %)
              </Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="downPayment"
                  type="number"
                  inputMode="decimal"
                  value={form.downPayment}
                  onChange={(e) => updateField("downPayment", e.target.value)}
                  className="pl-7"
                  min={0}
                  max={
                    Number.isFinite(homePriceNum) ? homePriceNum : undefined
                  }
                />
              </div>
            </div>

            <div>
              <Label htmlFor="interestRate">Interest Rate (% per year)</Label>
              <div className="relative mt-1.5">
                <Input
                  id="interestRate"
                  type="number"
                  inputMode="decimal"
                  value={form.interestRate}
                  onChange={(e) => updateField("interestRate", e.target.value)}
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
              <Select
                value={form.loanTerm}
                onValueChange={(v) => updateField("loanTerm", v)}
              >
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
                    Monthly Payment
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-primary">
                      {formatUSD(results.monthlyPayment)}
                    </span>
                    <CopyButton
                      value={results.monthlyPayment.toFixed(2)}
                      label="Copy monthly payment"
                    />
                  </div>
                </div>

                <div className="border-t pt-4 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Total Payment
                    </div>
                    <span className="text-xl font-semibold">
                      {formatUSD(results.totalPayment)}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Total Interest
                    </div>
                    <span className="text-xl font-semibold">
                      {formatUSD(results.totalInterest)}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="text-sm text-muted-foreground mb-2">
                    Loan Amount
                  </div>
                  <div className="text-lg font-medium">
                    {formatUSD(results.principal)}
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

        {schedule.length > 0 && (
          <div>
            <p className="font-semibold text-lg mb-3">
              Amortization Schedule (First 12 Months)
            </p>
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead className="text-right">Payment</TableHead>
                    <TableHead className="text-right">Principal</TableHead>
                    <TableHead className="text-right">Interest</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedule.map((row) => (
                    <TableRow key={row.month}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell className="text-right">
                        {formatUSD(row.payment)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatUSD(row.principal)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatUSD(row.interest)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatUSD(row.balance)}
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
