"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/copy-button";
import { calculateBmr } from "@/lib/bmr";
import {
  AnthropometricFields,
  DEFAULT_ANTHROPOMETRIC_FORM,
  parseAnthropometric,
  type AnthropometricFormState,
} from "@/components/tools/shared/anthropometric-fields";

export function BmrCalculator() {
  const [form, setForm] = useState<AnthropometricFormState>({
    ...DEFAULT_ANTHROPOMETRIC_FORM,
  });

  const parsed = useMemo(() => parseAnthropometric(form), [form]);

  const bmr = useMemo(
    () => (parsed ? calculateBmr(parsed) : null),
    [parsed],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>BMR Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <AnthropometricFields form={form} onChange={setForm} />

        {bmr !== null ? (
          <div className="space-y-4" aria-live="polite" aria-atomic="true">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Basal Metabolic Rate
                </p>
                <p className="text-3xl font-bold">{bmr}</p>
                <p className="text-sm font-medium mt-1">kcal/day at rest</p>
              </div>
              <CopyButton
                value={String(bmr)}
                label="Copy BMR"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              BMR is the calories your body burns at complete rest to maintain
              vital functions. It does not include activity or exercise.
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Enter valid sex, age, height, and weight to calculate BMR.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
