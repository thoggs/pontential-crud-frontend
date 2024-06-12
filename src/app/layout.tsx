import '@mantine/core/styles.css';
import RootStyleRegistry from "@/config/mantine";
import React from "react";
import { Inter } from 'next/font/google'
import { ColorSchemeScript } from "@mantine/core";
import StoreProvider from "@/providers/store/provider";
import QueryProvider from "@/providers/query/provider";

const inter = Inter({ subsets: [ 'latin' ] })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
    <head>
      <title>Gazin Tech</title>
      <link rel="icon" href="/favicon.ico" sizes="any"/>
      <ColorSchemeScript defaultColorScheme='auto'/>
    </head>
    <body className={inter.className}>
    <StoreProvider>
      <QueryProvider>
        <RootStyleRegistry>
          {children}
        </RootStyleRegistry>
      </QueryProvider>
    </StoreProvider>
    </body>
    </html>
  )
}
