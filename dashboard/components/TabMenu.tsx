import React from 'react'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'

export default function TabMenu({pathname, handleTabChange, tabs}: {pathname: string, handleTabChange: (value: string) => void, tabs: {label: string, value: string}[]}) {
    
    const cols = tabs.length;
    
    return (
        <Tabs
            defaultValue={pathname.split('/').pop() || 'projects'}
            className="w-full mt-6"
            onValueChange={handleTabChange}
        >
                <TabsList className={`grid grid-cols-3 w-96`}>
                    {tabs.map((tab) => (
                        <TabsTrigger key={tab.value} value={tab.value}>
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
        </Tabs>
    )
}
