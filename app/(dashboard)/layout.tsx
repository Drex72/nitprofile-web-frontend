"use client"

import { RequireAuthentication } from "@/components/middlewares"
import { Navbar } from "@/components/ui"
import { Sidebar } from "@/components/ui/Sidebar"
import { useScreenSize } from "@/hooks/useScreenSize"
import { useGetProgramsApi } from "@/services/programs/program-hooks"
import { programSlice, useAppSelector } from "@/state_management"
import { getAllowedRoles } from "@/utils"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()

    const [programsFetching, setProgramsFetching] = useState(false)

    const { handler } = useGetProgramsApi()

    const dispatch = useDispatch()

    const { allPrograms } = useAppSelector((state) => state.programSlice)

    const { initialize } = programSlice.actions

    useScreenSize()

    const getAllPrograms = async () => {
        setProgramsFetching(true)

        const programs = await handler(undefined)

        programs && dispatch(initialize(programs?.data))

        setProgramsFetching(false)
    }

    useEffect(() => {
        !allPrograms.length && getAllPrograms()
    }, [allPrograms])

    return (
        <RequireAuthentication loading={programsFetching} allowedRoles={getAllowedRoles(pathname)}>
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
