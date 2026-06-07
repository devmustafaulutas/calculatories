"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

export type ConsentCategory = "necessary" | "analytics" | "marketing";

interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface ConsentContextValue {
  consent: ConsentState;
  hasConsent: (category: ConsentCategory) => boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  showBanner: boolean;
  dismissBanner: () => void;
}

const STORAGE_KEY = "calculatories-consent";

const defaultConsent: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

function loadConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as ConsentState;
  } catch {
    return null;
  }
}

function saveConsent(consent: ConsentState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
}

function getInitialState(): { consent: ConsentState; showBanner: boolean } {
  const stored = loadConsent();
  if (stored) {
    return { consent: stored, showBanner: false };
  }
  return { consent: defaultConsent, showBanner: true };
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(getInitialState);
  const { consent, showBanner } = state;

  const hasConsent = useCallback(
    (category: ConsentCategory) => consent[category],
    [consent],
  );

  const acceptAll = useCallback(() => {
    const all: ConsentState = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    saveConsent(all);
    setState({ consent: all, showBanner: false });
  }, []);

  const rejectAll = useCallback(() => {
    const minimal: ConsentState = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    saveConsent(minimal);
    setState({ consent: minimal, showBanner: false });
  }, []);

  const dismissBanner = useCallback(() => {
    saveConsent(consent);
    setState((prev) => ({ ...prev, showBanner: false }));
  }, [consent]);

  return (
    <ConsentContext.Provider
      value={{
        consent,
        hasConsent,
        acceptAll,
        rejectAll,
        showBanner,
        dismissBanner,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used within ConsentProvider");
  }
  return ctx;
}
