"use client";
import React, { createContext, useContext, useState } from "react";

type PageTitleContextType = [string, React.Dispatch<React.SetStateAction<string>>];

const PageTitleContext = createContext<PageTitleContextType | undefined>(undefined);

export const PageTitleProvider = ({ children }: { children: React.ReactNode }) => {
  const state = useState("Rhinestock");
  return (
    <PageTitleContext.Provider value={state}>
      {children}
    </PageTitleContext.Provider>
  );
};

export const usePageTitle = () => {
  const context = useContext(PageTitleContext);
  if (!context) {
    throw new Error("usePageTitle must be used within a PageTitleProvider");
  }
  return context;
};
