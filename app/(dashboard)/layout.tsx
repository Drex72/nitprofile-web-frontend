"use client"

import { RequireAuthentication } from "@/components/middlewares"
import { Navbar } from "@/components/ui"
import { Sidebar } from "@/components/ui/Sidebar"
import { getAllowedRoles } from "@/utils"
import { usePathname } from "next/navigation"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()

    return (
        <RequireAuthentication allowedRoles={getAllowedRoles(pathname)}>
            <div className="min-h-screen bg-[#ededee]">
                <Navbar />

                <div className="flex">
                    <Sidebar />

                    <main
                        id="main-content"
                        style={{
                            minHeight: "calc(100vh - 70px)",
                        }}
                        className="relative !z-0 w-full overflow-y-scroll  px-8 py-[40px] md:ml-[15rem] "
                    >
                        {children}
                    </main>
                </div>
            </div>
        </RequireAuthentication>
    )
}

export default DashboardLayout
