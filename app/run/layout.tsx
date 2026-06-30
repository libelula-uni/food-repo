'use client'
import { StoreProvider } from './_lib/store'

export default function AppRootLayout({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>
}