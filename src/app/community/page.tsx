"use client";

import { useEffect } from "react";
import { usePageTitle } from "../context/PageTitleContext";
import SignUpsClient from "../components/SignUpsClient";

export default function SignUpsPage() {
  const [, setTitle] = usePageTitle();

  useEffect(() => {
    setTitle("Event Sign Ups");
  }, [setTitle]);

  return <SignUpsClient />;
}