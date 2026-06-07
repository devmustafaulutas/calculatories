import { describe, expect, it } from "vitest";
import {
  cmToFtIn,
  cmToIn,
  ftInToCm,
  inToCm,
  kgToLb,
  lbToKg,
} from "@/lib/health/units";

describe("health units", () => {
  it("converts lb to kg and back", () => {
    const kg = lbToKg(180);
    expect(kg).toBeCloseTo(81.65, 1);
    expect(kgToLb(kg)).toBeCloseTo(180, 0);
  });

  it("converts inches to cm", () => {
    expect(inToCm(70)).toBeCloseTo(177.8, 1);
    expect(cmToIn(177.8)).toBeCloseTo(70, 0);
  });

  it("converts ft+in to cm", () => {
    expect(ftInToCm(5, 10)).toBeCloseTo(177.8, 1);
  });

  it("converts cm to ft+in", () => {
    const { feet, inches } = cmToFtIn(177.8);
    expect(feet).toBe(5);
    expect(inches).toBeCloseTo(10, 0);
  });

  it("round-trips metric height", () => {
    const cm = ftInToCm(6, 2);
    const back = cmToFtIn(cm);
    expect(back.feet).toBe(6);
    expect(back.inches).toBeCloseTo(2, 0);
  });
});
