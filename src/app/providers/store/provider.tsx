'use client';
import { Provider } from 'react-redux'
import React from "react";
import store from "@/app/store";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}