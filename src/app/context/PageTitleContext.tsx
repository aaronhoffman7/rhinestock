"use client";

import { createContext, useContext, useState } from "react";

const PageTitleContext = createContext<[string, (title: string) => void] | null>(null);

export function PageTitleProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState("ReDelicious");
  return (
    <PageTitleContext.Provider value={[title, setTitle]}>
      {children}
    </PageTitleContext.Provider>
  );
}

export function usePageTitle() {
  const context = useContext(PageTitleContext);
  if (!context) {
    throw new Error("usePageTitle must be used within a PageTitleProvider");
  }
  return context;
}
