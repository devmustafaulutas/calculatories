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
import { CopyButton } from "@/components/copy-button";
import {
  ACTIVITY_LABELS,
  calculateCalories,
  type CalorieInput,
} from "@/lib/calorie";
import type { ActivityLevel, CalorieGoal } from "@/lib/health/types";
import {
  AnthropometricFields,
  DEFAULT_ANTHROPOMETRIC_FORM,
  parseAnthropometric,
  type AnthropometricFormState,
} from "@/components/tools/shared/anthropometric-fields";

interface CalorieFormState extends AnthropometricFormState {
  activity: ActivityLevel;
  goal: CalorieGoal;
}

const DEFAULT_CALORIE_FORM: CalorieFormState = {
  ...DEFAULT_ANTHROPOMETRIC_FORM,
  activity: "moderate",
  goal: "maintain",
};

const GOAL_LABELS: Record<CalorieGoal, string> = {
  maintain: "Maintain weight",
  lose: "Lose weight (~1 lb/week)",
  gain: "Gain weight (~1 lb/week)",
};

function parseCalorieInput(form: CalorieFormState): CalorieInput | null {
  const anthropometric = parseAnthropometric(form);
  if (!anthropometric) return null;
  return {
    ...anthropometric,
    activity: form.activity,
    goal: form.goal,
  };
}

export function CalorieCalculator() {
  const [form, setForm] = useState<CalorieFormState>(DEFAULT_CALORIE_FORM);

  const parsed = useMemo(() => parseCalorieInput(form), [form]);

  const result = useMemo(
    () => (parsed ? calculateCalories(parsed) : null),
    [parsed],
  );

  const setAnthropometric = (anthropometric: AnthropometricFormState) => {
    setForm((prev) => ({ ...prev, ...anthropometric }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calorie Calculator (TDEE)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <AnthropometricFields form={form} onChange={setAnthropometric} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="activity-level">Activity level</Label>
            <Select
              value={form.activity}
              onValueChange={(v) =>
                setForm((prev) => ({ ...prev, activity: v as ActivityLevel }))
              }
            >
              <SelectTrigger id="activity-level">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(ACTIVITY_LABELS) as ActivityLevel[]).map(
                  (level) => (
                    <SelectItem key={level} value={level}>
                      {ACTIVITY_LABELS[level]}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="calorie-goal">Goal</Label>
            <Select
              value={form.goal}
              onValueChange={(v) =>
                setForm((prev) => ({ ...prev, goal: v as CalorieGoal }))
              }
            >
              <SelectTrigger id="calorie-goal">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(GOAL_LABELS) as CalorieGoal[]).map((goal) => (
                  <SelectItem key={goal} value={goal}>
                    {GOAL_LABELS[goal]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {result ? (
          <div
            className="space-y-4 rounded-lg border p-4"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">BMR</p>
                <p className="text-2xl font-bold">{result.bmr}</p>
                <p className="text-xs text-muted-foreground">kcal/day</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">TDEE</p>
                <p className="text-2xl font-bold">{result.tdee}</p>
                <p className="text-xs text-muted-foreground">
                  kcal/day (maintenance)
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Goal calories</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-primary">
                    {result.goalCalories}
                  </p>
                  <CopyButton
                    value={String(result.goalCalories)}
                    label="Copy goal"
                  />
                </div>
                <p className="text-xs text-muted-foreground">kcal/day</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              TDEE = BMR × {result.activityMultiplier} for your activity level.
              Goal calories adjust maintenance by ±500 kcal for weight change.
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Enter valid measurements to estimate daily calorie needs.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
