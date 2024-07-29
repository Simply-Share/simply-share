// 'use client'

import { redirect } from "next/navigation";

// import Analytics from "@/components/Analytics"
// import Projects from "@/components/Projects"
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs"
// import UploadFile from "@/components/UploadFile"
// import { usePathname, useRouter } from "next/navigation"

export default function Dashboard() {

  return (
    redirect('/dashboard/projects')
  )
}
