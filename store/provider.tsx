"use client";

import { store } from "@/store/index";
import { Provider } from "react-redux";

interface ReduxProviderProps {
  children: React.ReactNode;
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
