'use client'

import TabMenu from "@/components/TabMenu";
import { usePathname, useRouter } from "next/navigation"

export default function DashboardLayout({children}: {children: React.ReactNode}) {

    const router = useRouter();
    const pathname = usePathname();

    const handleTabChange = (value: string) => {
        router.push(`/dashboard/${value}`);
    };

    return (
        <div className="container">
            <TabMenu handleTabChange={handleTabChange} pathname={pathname} tabs={TABS} />
            {children}
        </div>
    )
}

const TABS = [
    {label: 'Projects', value: 'projects'},
    {label: 'Analytics', value: 'analytics'},
    {label: 'Create', value: 'create'},
]
