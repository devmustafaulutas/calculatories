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
  calculateLoanRepayment,
  generateLoanRepaymentSchedule,
  type LoanRepaymentInput,
} from "@/lib/loan-repayment";
import { formatUSD } from "@/lib/finance/format";

interface LoanRepaymentFormState {
  loanAmount: string;
  interestRate: string;
  loanTerm: string;
  extraPayment: string;
}

function parseInput(state: LoanRepaymentFormState): LoanRepaymentInput | null {
  const loanAmount = parseFloat(state.loanAmount);
  const annualRatePercent = parseFloat(state.interestRate);
  const termYears = parseInt(state.loanTerm, 10);
  const extra = parseFloat(state.extraPayment || "0");

  if (
    state.loanAmount.trim() === "" ||
    state.interestRate.trim() === "" ||
    !Number.isFinite(loanAmount) ||
    !Number.isFinite(annualRatePercent) ||
    !Number.isFinite(termYears) ||
    !Number.isFinite(extra)
  ) {
    return null;
  }

  return {
    loanAmount,
    annualRatePercent,
    termYears,
    extraMonthlyPayment: extra > 0 ? extra : undefined,
  };
}

function formatPayoffTerm(months: number): string {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (years === 0) return `${months} months`;
  if (remainingMonths === 0) return `${years} years`;
  return `${years} years, ${remainingMonths} months`;
}

export function LoanRepaymentCalculator() {
  const [form, setForm] = useState<LoanRepaymentFormState>({
    loanAmount: "25000",
    interestRate: "8",
    loanTerm: "5",
    extraPayment: "0",
  });

  const parsedInput = useMemo(() => parseInput(form), [form]);

  const results = useMemo(
    () => (parsedInput ? calculateLoanRepayment(parsedInput) : null),
    [parsedInput],
  );

  const schedule = useMemo(
    () => (parsedInput ? generateLoanRepaymentSchedule(parsedInput) : []),
    [parsedInput],
  );

  const standardTermMonths = parsedInput ? parsedInput.termYears * 12 : 0;
  const paysOffEarly =
    results !== null && results.payoffMonths < standardTermMonths;

  const updateField = (field: keyof LoanRepaymentFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="shadow-lg border-2">
      <CardHeader className="bg-primary/5 border-b">
        <CardTitle className="text-xl">Calculate Your Loan Payment</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="loanAmount">Loan Amount</Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="loanAmount"
                  type="number"
                  inputMode="decimal"
                  value={form.loanAmount}
                  onChange={(e) => updateField("loanAmount", e.target.value)}
                  className="pl-7"
                  min={0}
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
                  max={30}
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
                  <SelectItem value="1">1 year</SelectItem>
                  <SelectItem value="2">2 years</SelectItem>
                  <SelectItem value="3">3 years</SelectItem>
                  <SelectItem value="4">4 years</SelectItem>
                  <SelectItem value="5">5 years</SelectItem>
                  <SelectItem value="7">7 years</SelectItem>
                  <SelectItem value="10">10 years</SelectItem>
                  <SelectItem value="15">15 years</SelectItem>
                  <SelectItem value="30">30 years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="extraPayment">Extra Monthly Payment (optional)</Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="extraPayment"
                  type="number"
                  inputMode="decimal"
                  value={form.extraPayment}
                  onChange={(e) => updateField("extraPayment", e.target.value)}
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
                      Total Interest
                    </div>
                    <span className="text-xl font-semibold">
                      {formatUSD(results.totalInterest)}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Total Paid
                    </div>
                    <span className="text-xl font-semibold">
                      {formatUSD(results.totalPaid)}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="text-sm text-muted-foreground mb-1">
                    Payoff Time
                  </div>
                  <div className="text-lg font-medium">
                    {formatPayoffTerm(results.payoffMonths)}
                  </div>
                  {paysOffEarly && (
                    <p className="text-sm text-primary mt-2">
                      Extra payments save{" "}
                      {standardTermMonths - results.payoffMonths} months
                    </p>
                  )}
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
