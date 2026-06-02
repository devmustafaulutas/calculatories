"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyButton } from "@/components/copy-button";
import { ResultSkeleton } from "@/components/loading-skeletons";

interface BMIResults {
  bmi: number;
  category: string;
  categoryColor: string;
  healthyWeightMin: number;
  healthyWeightMax: number;
}

export function BMICalculatorWidget() {
  const [unit, setUnit] = useState<"metric" | "imperial">("imperial");
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(9);
  const [heightCm, setHeightCm] = useState(175);
  const [weightLbs, setWeightLbs] = useState(160);
  const [weightKg, setWeightKg] = useState(72);
  const [results, setResults] = useState<BMIResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    setIsCalculating(true);
    const timer = setTimeout(() => {
      let heightM: number;
      let weightKgValue: number;

      if (unit === "imperial") {
        const totalInches = heightFeet * 12 + heightInches;
        heightM = totalInches * 0.0254;
        weightKgValue = weightLbs * 0.453592;
      } else {
        heightM = heightCm / 100;
        weightKgValue = weightKg;
      }

      if (heightM > 0 && weightKgValue > 0) {
        const bmi = weightKgValue / (heightM * heightM);

        let category: string;
        let categoryColor: string;

        if (bmi < 18.5) {
          category = "Underweight";
          categoryColor = "text-blue-600";
        } else if (bmi < 25) {
          category = "Normal weight";
          categoryColor = "text-emerald-600";
        } else if (bmi < 30) {
          category = "Overweight";
          categoryColor = "text-amber-600";
        } else {
          category = "Obese";
          categoryColor = "text-red-600";
        }

        // Calculate healthy weight range (BMI 18.5 - 24.9)
        const healthyWeightMinKg = 18.5 * heightM * heightM;
        const healthyWeightMaxKg = 24.9 * heightM * heightM;

        let healthyWeightMin: number;
        let healthyWeightMax: number;

        if (unit === "imperial") {
          healthyWeightMin = healthyWeightMinKg / 0.453592;
          healthyWeightMax = healthyWeightMaxKg / 0.453592;
        } else {
          healthyWeightMin = healthyWeightMinKg;
          healthyWeightMax = healthyWeightMaxKg;
        }

        setResults({
          bmi,
          category,
          categoryColor,
          healthyWeightMin,
          healthyWeightMax,
        });
      } else {
        setResults(null);
      }
      setIsCalculating(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [unit, heightFeet, heightInches, heightCm, weightLbs, weightKg]);

  return (
    <Card className="shadow-lg border-2">
      <CardHeader className="bg-primary/5 border-b">
        <CardTitle className="text-xl">Calculate Your BMI</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs
          value={unit}
          onValueChange={(v) => setUnit(v as "metric" | "imperial")}
          className="mb-6"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="imperial">Imperial (ft/lbs)</TabsTrigger>
            <TabsTrigger value="metric">Metric (cm/kg)</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="space-y-4">
            {unit === "imperial" ? (
              <>
                <div>
                  <Label>Height</Label>
                  <div className="grid grid-cols-2 gap-3 mt-1.5">
                    <div className="relative">
                      <Input
                        type="number"
                        value={heightFeet}
                        onChange={(e) => setHeightFeet(Number(e.target.value))}
                        min={1}
                        max={8}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        ft
                      </span>
                    </div>
                    <div className="relative">
                      <Input
                        type="number"
                        value={heightInches}
                        onChange={(e) =>
                          setHeightInches(Number(e.target.value))
                        }
                        min={0}
                        max={11}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        in
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="weightLbs">Weight</Label>
                  <div className="relative mt-1.5">
                    <Input
                      id="weightLbs"
                      type="number"
                      value={weightLbs}
                      onChange={(e) => setWeightLbs(Number(e.target.value))}
                      min={1}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      lbs
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label htmlFor="heightCm">Height</Label>
                  <div className="relative mt-1.5">
                    <Input
                      id="heightCm"
                      type="number"
                      value={heightCm}
                      onChange={(e) => setHeightCm(Number(e.target.value))}
                      min={50}
                      max={250}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      cm
                    </span>
                  </div>
                </div>
                <div>
                  <Label htmlFor="weightKg">Weight</Label>
                  <div className="relative mt-1.5">
                    <Input
                      id="weightKg"
                      type="number"
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                      min={1}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      kg
                    </span>
                  </div>
                </div>
              </>
            )}
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
                    Your BMI
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-primary">
                      {results.bmi.toFixed(1)}
                    </span>
                    <CopyButton value={results.bmi.toFixed(1)} label="Copy" />
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Category
                  </div>
                  <span className={`text-xl font-semibold ${results.categoryColor}`}>
                    {results.category}
                  </span>
                </div>

                <div className="border-t pt-4">
                  <div className="text-sm text-muted-foreground mb-1">
                    Healthy Weight Range
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium">
                      {results.healthyWeightMin.toFixed(0)} -{" "}
                      {results.healthyWeightMax.toFixed(0)}{" "}
                      {unit === "imperial" ? "lbs" : "kg"}
                    </span>
                    <CopyButton
                      value={`${results.healthyWeightMin.toFixed(0)}-${results.healthyWeightMax.toFixed(0)}`}
                      label=""
                    />
                  </div>
                </div>

                {/* BMI Scale */}
                <div className="border-t pt-4">
                  <div className="text-sm text-muted-foreground mb-2">
                    BMI Categories
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-600">Underweight</span>
                      <span>{"< 18.5"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-600">Normal</span>
                      <span>18.5 - 24.9</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-600">Overweight</span>
                      <span>25 - 29.9</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-600">Obese</span>
                      <span>{">= 30"}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Enter your height and weight to see results.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
