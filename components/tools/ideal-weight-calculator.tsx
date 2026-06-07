"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/copy-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AnthropometricFields,
  DEFAULT_ANTHROPOMETRIC_FORM,
  parseAnthropometric,
  type AnthropometricFormState,
} from "@/components/tools/shared/anthropometric-fields";
import { calculateIdealWeight } from "@/lib/ideal-weight";
import { kgToLb } from "@/lib/health/units";

function formatKgLb(kg: number): string {
  return `${kg} kg (${Math.round(kgToLb(kg))} lb)`;
}

export function IdealWeightCalculator() {
  const [form, setForm] = useState<AnthropometricFormState>({
    ...DEFAULT_ANTHROPOMETRIC_FORM,
  });

  const result = useMemo(() => {
    const parsed = parseAnthropometric({ ...form, age: form.age || "30" });
    if (!parsed) return null;
    return calculateIdealWeight(parsed);
  }, [form]);

  const copyValue = result
    ? `Healthy range: ${formatKgLb(result.minKg)} – ${formatKgLb(result.maxKg)}; midpoint ${formatKgLb(result.midpointKg)}; Devine ${formatKgLb(result.devineKg)}`
    : "";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ideal Weight Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <AnthropometricFields
          form={form}
          onChange={setForm}
          showAge={false}
        />

        {result ? (
          <div className="space-y-4" aria-live="polite">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Healthy weight range (BMI 18.5–24.9)
                </p>
                <p className="text-xl font-bold mt-1">
                  {formatKgLb(result.minKg)} – {formatKgLb(result.maxKg)}
                </p>
              </div>
              <CopyButton
                value={copyValue}
                aria-label="Copy ideal weight results"
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead className="text-right">kg</TableHead>
                  <TableHead className="text-right">lb</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Minimum (BMI 18.5)</TableCell>
                  <TableCell className="text-right">{result.minKg}</TableCell>
                  <TableCell className="text-right">
                    {Math.round(kgToLb(result.minKg))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Midpoint</TableCell>
                  <TableCell className="text-right">{result.midpointKg}</TableCell>
                  <TableCell className="text-right">
                    {Math.round(kgToLb(result.midpointKg))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Maximum (BMI 24.9)</TableCell>
                  <TableCell className="text-right">{result.maxKg}</TableCell>
                  <TableCell className="text-right">
                    {Math.round(kgToLb(result.maxKg))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Devine formula</TableCell>
                  <TableCell className="text-right">{result.devineKg}</TableCell>
                  <TableCell className="text-right">
                    {Math.round(kgToLb(result.devineKg))}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Enter valid height and sex to calculate ideal weight.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
