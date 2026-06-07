"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  AnthropometricFields,
  DEFAULT_ANTHROPOMETRIC_FORM,
  parseAnthropometric,
  type AnthropometricFormState,
} from "@/components/tools/shared/anthropometric-fields";
import { ACTIVITY_LABELS } from "@/lib/health/tdee";
import type { ActivityLevel, CalorieGoal, MacroPreset } from "@/lib/health/types";
import { calculateMacroPlan, MACRO_PRESETS } from "@/lib/macro";

const PRESET_LABELS: Record<MacroPreset, string> = {
  balanced: "Balanced (30% protein / 40% carbs / 30% fat)",
  highProtein: "High protein (40% / 30% / 30%)",
  lowCarb: "Low carb (30% / 20% / 50%)",
};

const GOAL_LABELS: Record<CalorieGoal, string> = {
  maintain: "Maintain weight",
  lose: "Lose weight (−500 cal/day)",
  gain: "Gain weight (+500 cal/day)",
};

interface MacroFormExtras {
  activity: ActivityLevel;
  goal: CalorieGoal;
  preset: MacroPreset;
}

export function MacroCalculator() {
  const [form, setForm] = useState<AnthropometricFormState>({
    ...DEFAULT_ANTHROPOMETRIC_FORM,
  });
  const [extras, setExtras] = useState<MacroFormExtras>({
    activity: "moderate",
    goal: "maintain",
    preset: "balanced",
  });

  const result = useMemo(() => {
    const parsed = parseAnthropometric(form);
    if (!parsed) return null;
    return calculateMacroPlan({ ...parsed, ...extras });
  }, [form, extras]);

  const copyValue = result
    ? `${result.calories} kcal — Protein ${result.macros.proteinG}g, Carbs ${result.macros.carbsG}g, Fat ${result.macros.fatG}g`
    : "";

  const setExtra = (patch: Partial<MacroFormExtras>) =>
    setExtras((prev) => ({ ...prev, ...patch }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Macro Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <AnthropometricFields form={form} onChange={setForm} />

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="activity">Activity level</Label>
            <Select
              value={extras.activity}
              onValueChange={(v) => setExtra({ activity: v as ActivityLevel })}
            >
              <SelectTrigger id="activity">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(ACTIVITY_LABELS) as ActivityLevel[]).map((key) => (
                  <SelectItem key={key} value={key}>
                    {ACTIVITY_LABELS[key]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal">Goal</Label>
            <Select
              value={extras.goal}
              onValueChange={(v) => setExtra({ goal: v as CalorieGoal })}
            >
              <SelectTrigger id="goal">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(GOAL_LABELS) as CalorieGoal[]).map((key) => (
                  <SelectItem key={key} value={key}>
                    {GOAL_LABELS[key]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preset">Macro split</Label>
            <Select
              value={extras.preset}
              onValueChange={(v) => setExtra({ preset: v as MacroPreset })}
            >
              <SelectTrigger id="preset">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(MACRO_PRESETS) as MacroPreset[]).map((key) => (
                  <SelectItem key={key} value={key}>
                    {PRESET_LABELS[key]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {result ? (
          <div className="space-y-4" aria-live="polite">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm text-muted-foreground">Daily calories</p>
                <p className="text-3xl font-bold">{result.calories} kcal</p>
                <p className="text-sm text-muted-foreground mt-1">
                  BMR {result.bmr} · TDEE {result.tdee}
                </p>
              </div>
              <CopyButton
                value={copyValue}
                aria-label="Copy macro plan"
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Macronutrient</TableHead>
                  <TableHead className="text-right">Grams/day</TableHead>
                  <TableHead className="text-right">% of calories</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Protein</TableCell>
                  <TableCell className="text-right">
                    {result.macros.proteinG} g
                  </TableCell>
                  <TableCell className="text-right">
                    {MACRO_PRESETS[result.preset].proteinPercent}%
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Carbohydrates</TableCell>
                  <TableCell className="text-right">
                    {result.macros.carbsG} g
                  </TableCell>
                  <TableCell className="text-right">
                    {MACRO_PRESETS[result.preset].carbsPercent}%
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fat</TableCell>
                  <TableCell className="text-right">
                    {result.macros.fatG} g
                  </TableCell>
                  <TableCell className="text-right">
                    {MACRO_PRESETS[result.preset].fatPercent}%
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Enter valid height, weight, age, and sex to calculate macros.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
