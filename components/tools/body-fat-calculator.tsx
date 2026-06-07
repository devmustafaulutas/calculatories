"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/copy-button";
import {
  AnthropometricFields,
  DEFAULT_ANTHROPOMETRIC_FORM,
  parseAnthropometric,
  type AnthropometricFormState,
} from "@/components/tools/shared/anthropometric-fields";
import { calculateBodyFatPercent } from "@/lib/body-fat";
import { inToCm, kgToLb } from "@/lib/health/units";

interface CircumferenceFormState {
  neckCm: string;
  neckIn: string;
  waistCm: string;
  waistIn: string;
  hipCm: string;
  hipIn: string;
}

const DEFAULT_CIRCUMFERENCE: CircumferenceFormState = {
  neckCm: "38",
  neckIn: "15",
  waistCm: "91",
  waistIn: "36",
  hipCm: "102",
  hipIn: "40",
};

function parseCircumferenceCm(
  unitSystem: AnthropometricFormState["unitSystem"],
  form: CircumferenceFormState,
  field: "neck" | "waist" | "hip",
): number | null {
  const value =
    unitSystem === "metric"
      ? parseFloat(form[`${field}Cm`])
      : inToCm(parseFloat(form[`${field}In`]));
  return Number.isFinite(value) ? value : null;
}

export function BodyFatCalculator() {
  const [form, setForm] = useState<AnthropometricFormState>({
    ...DEFAULT_ANTHROPOMETRIC_FORM,
  });
  const [circ, setCirc] = useState<CircumferenceFormState>(DEFAULT_CIRCUMFERENCE);

  const result = useMemo(() => {
    const base = parseAnthropometric(form);
    if (!base) return null;

    const neckCm = parseCircumferenceCm(form.unitSystem, circ, "neck");
    const waistCm = parseCircumferenceCm(form.unitSystem, circ, "waist");
    if (neckCm === null || waistCm === null) return null;

    let hipCm: number | undefined;
    if (form.sex === "female") {
      const hip = parseCircumferenceCm(form.unitSystem, circ, "hip");
      if (hip === null) return null;
      hipCm = hip;
    }

    return calculateBodyFatPercent({
      ...base,
      neckCm,
      waistCm,
      hipCm,
    });
  }, [form, circ]);

  const displayMass = (kg: number) =>
    form.unitSystem === "imperial"
      ? `${Math.round(kgToLb(kg))} lb`
      : `${kg} kg`;

  const setCircField = (patch: Partial<CircumferenceFormState>) =>
    setCirc((prev) => ({ ...prev, ...patch }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Body Fat Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <AnthropometricFields form={form} onChange={setForm} />

        <div className="space-y-4">
          <p className="text-sm font-medium">Circumference measurements</p>
          {form.unitSystem === "metric" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="neck-cm">Neck (cm)</Label>
                <Input
                  id="neck-cm"
                  type="number"
                  value={circ.neckCm}
                  onChange={(e) => setCircField({ neckCm: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="waist-cm">Waist (cm)</Label>
                <Input
                  id="waist-cm"
                  type="number"
                  value={circ.waistCm}
                  onChange={(e) => setCircField({ waistCm: e.target.value })}
                />
              </div>
              {form.sex === "female" && (
                <div className="space-y-2">
                  <Label htmlFor="hip-cm">Hip (cm)</Label>
                  <Input
                    id="hip-cm"
                    type="number"
                    value={circ.hipCm}
                    onChange={(e) => setCircField({ hipCm: e.target.value })}
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="neck-in">Neck (in)</Label>
                <Input
                  id="neck-in"
                  type="number"
                  value={circ.neckIn}
                  onChange={(e) => setCircField({ neckIn: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="waist-in">Waist (in)</Label>
                <Input
                  id="waist-in"
                  type="number"
                  value={circ.waistIn}
                  onChange={(e) => setCircField({ waistIn: e.target.value })}
                />
              </div>
              {form.sex === "female" && (
                <div className="space-y-2">
                  <Label htmlFor="hip-in">Hip (in)</Label>
                  <Input
                    id="hip-in"
                    type="number"
                    value={circ.hipIn}
                    onChange={(e) => setCircField({ hipIn: e.target.value })}
                  />
                </div>
              )}
            </>
          )}
        </div>

        {result ? (
          <div className="space-y-4" aria-live="polite">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm text-muted-foreground">Body fat</p>
                <p className="text-3xl font-bold">{result.bodyFatPercent}%</p>
              </div>
              <CopyButton
                value={`${result.bodyFatPercent}%`}
                aria-label="Copy body fat percentage"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-muted/50 p-4 text-sm">
                <p className="font-medium mb-1">Fat mass</p>
                <p>{displayMass(result.fatMassKg)}</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-4 text-sm">
                <p className="font-medium mb-1">Lean mass</p>
                <p>{displayMass(result.leanMassKg)}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Enter valid measurements to estimate body fat percentage.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
