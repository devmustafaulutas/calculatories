"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/copy-button";
import { calculateBmiFromMetric } from "@/lib/bmi";
import { kgToLb } from "@/lib/health/units";
import {
  AnthropometricFields,
  DEFAULT_ANTHROPOMETRIC_FORM,
  parseAnthropometric,
  type AnthropometricFormState,
} from "@/components/tools/shared/anthropometric-fields";

export function BmiCalculator() {
  const [form, setForm] = useState<AnthropometricFormState>({
    ...DEFAULT_ANTHROPOMETRIC_FORM,
    age: "",
  });

  const parsed = useMemo(() => {
    if (form.unitSystem === "metric") {
      const heightCm = parseFloat(form.heightCm);
      const weightKg = parseFloat(form.weightKg);
      if (!Number.isFinite(heightCm) || !Number.isFinite(weightKg)) return null;
      return { heightCm, weightKg };
    }
    const p = parseAnthropometric({ ...form, age: "30" });
    if (!p) return null;
    return { heightCm: p.heightCm, weightKg: p.weightKg };
  }, [form]);

  const result = useMemo(
    () =>
      parsed
        ? calculateBmiFromMetric(parsed.heightCm, parsed.weightKg)
        : null,
    [parsed],
  );

  const displayWeight = (kg: number) =>
    form.unitSystem === "imperial"
      ? `${Math.round(kgToLb(kg))} lb`
      : `${kg} kg`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>BMI Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <AnthropometricFields
          form={form}
          onChange={setForm}
          showSex={false}
          showAge={false}
        />

        {result ? (
          <div className="space-y-4" aria-live="polite">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm text-muted-foreground">Your BMI</p>
                <p className="text-3xl font-bold">{result.bmi}</p>
                <p className="text-sm font-medium mt-1">{result.category}</p>
              </div>
              <CopyButton
                value={String(result.bmi)}
                aria-label="Copy BMI result"
              />
            </div>
            <div className="rounded-lg bg-muted/50 p-4 text-sm">
              <p className="font-medium mb-1">Healthy weight range for your height</p>
              <p>
                {displayWeight(result.healthyWeightMinKg)} –{" "}
                {displayWeight(result.healthyWeightMaxKg)}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Enter valid height and weight to calculate BMI.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
