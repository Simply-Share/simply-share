import { SiteFooter } from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
