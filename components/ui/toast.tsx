"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { X } from "lucide-react";

type Toast = {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "error" | "success";
};

type ToastContextValue = {
  push: (t: Omit<Toast, "id">) => string;
  remove: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((t: Omit<Toast, "id">) => {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 8);
    setToasts((s) => [...s, { id, ...t }]);
    // auto-dismiss
    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), 5000);
    return id;
  }, []);

  const remove = useCallback((id: string) => {
    setToasts((s) => s.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ push, remove }}>
      {children}
      <div className="fixed right-6 bottom-6 z-[9999] flex flex-col gap-3">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            aria-live="polite"
            className={`max-w-sm rounded-lg p-3 shadow-lg border bg-white ring-1 ring-black/5 flex items-start gap-3 ${
              t.variant === "error"
                ? "border-red-200 bg-red-50 text-red-900"
                : t.variant === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border-gray-200 bg-white text-gray-900"
            }`}
          >
            <div className="flex-1">
              <div className="font-medium text-sm">{t.title}</div>
              {t.description ? <div className="text-xs mt-1">{t.description}</div> : null}
            </div>
            <button
              aria-label="dismiss"
              onClick={() => remove(t.id)}
              className="opacity-70 hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
