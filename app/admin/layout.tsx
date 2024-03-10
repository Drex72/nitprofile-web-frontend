"use client"

import { RequireAuthentication } from "@/components/middlewares"
import { Navbar } from "@/components/ui"
import { Sidebar } from "@/components/ui/Sidebar"
import React from "react"

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <RequireAuthentication allowedRoles={["ADMIN", "SUPER ADMIN"]}>
            <div className="h-full min-h-screen bg-[#F6F7FD]">
                <Navbar />

                <div className="flex overflow-scroll ">
                    <Sidebar />

                    {/* Main Content */}
                    <main id="main-content" className="relative !z-0 w-full px-8 pt-[120px] md:ml-[17rem] ">
                        {children}
                    </main>
                </div>
            </div>
        </RequireAuthentication>
    )
}

export default AdminLayout
