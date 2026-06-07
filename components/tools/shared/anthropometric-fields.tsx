"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ftInToCm, lbToKg } from "@/lib/health/units";
import type { Sex, UnitSystem } from "@/lib/health/types";

export interface AnthropometricFormState {
  unitSystem: UnitSystem;
  sex: Sex;
  age: string;
  heightCm: string;
  heightFt: string;
  heightIn: string;
  weightKg: string;
  weightLb: string;
}

export const DEFAULT_ANTHROPOMETRIC_FORM: AnthropometricFormState = {
  unitSystem: "imperial",
  sex: "male",
  age: "30",
  heightCm: "178",
  heightFt: "5",
  heightIn: "10",
  weightKg: "82",
  weightLb: "180",
};

export interface ParsedAnthropometric {
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
}

export function parseAnthropometric(
  form: AnthropometricFormState,
): ParsedAnthropometric | null {
  const age = parseInt(form.age, 10);
  if (!Number.isFinite(age)) return null;

  let heightCm: number;
  let weightKg: number;

  if (form.unitSystem === "metric") {
    heightCm = parseFloat(form.heightCm);
    weightKg = parseFloat(form.weightKg);
  } else {
    const ft = parseInt(form.heightFt, 10);
    const inches = parseFloat(form.heightIn);
    const lb = parseFloat(form.weightLb);
    if (!Number.isFinite(ft) || !Number.isFinite(inches) || !Number.isFinite(lb)) {
      return null;
    }
    heightCm = ftInToCm(ft, inches);
    weightKg = lbToKg(lb);
  }

  if (!Number.isFinite(heightCm) || !Number.isFinite(weightKg)) return null;

  return { sex: form.sex, age, heightCm, weightKg };
}

interface AnthropometricFieldsProps {
  form: AnthropometricFormState;
  onChange: (form: AnthropometricFormState) => void;
  showSex?: boolean;
  showAge?: boolean;
}

export function AnthropometricFields({
  form,
  onChange,
  showSex = true,
  showAge = true,
}: AnthropometricFieldsProps) {
  const set = (patch: Partial<AnthropometricFormState>) =>
    onChange({ ...form, ...patch });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="unit-system">Units</Label>
        <Select
          value={form.unitSystem}
          onValueChange={(v) => set({ unitSystem: v as UnitSystem })}
        >
          <SelectTrigger id="unit-system">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="imperial">Imperial (lb, ft/in)</SelectItem>
            <SelectItem value="metric">Metric (kg, cm)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {showSex && (
        <div className="space-y-2">
          <Label htmlFor="sex">Sex</Label>
          <Select
            value={form.sex}
            onValueChange={(v) => set({ sex: v as Sex })}
          >
            <SelectTrigger id="sex">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {showAge && (
        <div className="space-y-2">
          <Label htmlFor="age">Age (years)</Label>
          <Input
            id="age"
            type="number"
            min={15}
            max={120}
            value={form.age}
            onChange={(e) => set({ age: e.target.value })}
          />
        </div>
      )}

      {form.unitSystem === "metric" ? (
        <>
          <div className="space-y-2">
            <Label htmlFor="height-cm">Height (cm)</Label>
            <Input
              id="height-cm"
              type="number"
              value={form.heightCm}
              onChange={(e) => set({ heightCm: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight-kg">Weight (kg)</Label>
            <Input
              id="weight-kg"
              type="number"
              value={form.weightKg}
              onChange={(e) => set({ weightKg: e.target.value })}
            />
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height-ft">Height (ft)</Label>
              <Input
                id="height-ft"
                type="number"
                value={form.heightFt}
                onChange={(e) => set({ heightFt: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height-in">Height (in)</Label>
              <Input
                id="height-in"
                type="number"
                value={form.heightIn}
                onChange={(e) => set({ heightIn: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight-lb">Weight (lb)</Label>
            <Input
              id="weight-lb"
              type="number"
              value={form.weightLb}
              onChange={(e) => set({ weightLb: e.target.value })}
            />
          </div>
        </>
      )}
    </div>
  );
}
