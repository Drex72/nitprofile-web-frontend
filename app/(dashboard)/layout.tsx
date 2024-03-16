"use client"

import { RequireAuthentication } from "@/components/middlewares"
import { Navbar } from "@/components/ui"
import { MemoizedFrameEditor } from "@/components/ui/Frame-Editor/ui"
import { Sidebar } from "@/components/ui/Sidebar"
import { getAllowedRoles } from "@/utils"
import { usePathname } from "next/navigation"
import React from "react"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()

    return (
        <RequireAuthentication allowedRoles={getAllowedRoles(pathname)}>
            {/* <div className="h-full min-h-screen bg-[#ededee]">
                <Navbar />

                <div className="flex overflow-scroll ">
                    <Sidebar />

                    <main id="main-content" className="relative !z-0 w-full px-8 pt-[120px] md:ml-[17rem] ">
                        {children}
                    </main>
                </div>
            </div> */}
            <MemoizedFrameEditor />
        </RequireAuthentication>
    )
}

export default DashboardLayout
