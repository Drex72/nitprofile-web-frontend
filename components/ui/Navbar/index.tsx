"use client"

import React, { useState } from "react"
import { ProgramsModal } from "../Modals/ProgramsModal"
import { MdKeyboardArrowDown } from "react-icons/md"
import { useAppSelector } from "@/state_management"
import { usePathname } from "next/navigation"

/**
 * Navbar component for displaying navigation options and user information.
 * @returns {JSX.Element} Navbar component JSX.
 */
export const Navbar = () => {
    // State for managing the visibility of programs modal
    const [programsModal, setProgramsModal] = useState({
        showPrograms: false,
        createProgram: false,
    })

    // Gets the current pathname using the usePathname hook
    const pathname = usePathname()

    // Retrieves user data from the state
    const { data } = useAppSelector((state) => state.authSlice)

    return (
        <nav className="ml-[15rem] flex items-center justify-between bg-white px-[20px] py-[15px] shadow-sm">
            {/* Programs Modal */}
            <ProgramsModal
                modalIsMounted={programsModal.showPrograms}
                createProgram={() => setProgramsModal({ createProgram: true, showPrograms: false })}
                handleClose={() => setProgramsModal({ ...programsModal, showPrograms: false })}
            />

            {/* Current Page Title */}
            <h2 className="text-lg font-semibold capitalize text-[#101010]">{pathname.split("/")[2] ?? "Home"}</h2>

            {/* Nitprofile Dropdown */}
            <div
                onClick={() => setProgramsModal({ ...programsModal, showPrograms: true })}
                className="group flex cursor-pointer items-center justify-between gap-20 rounded-md border border-[#676767] px-4 py-2 text-[14px] font-medium  text-[#101010]"
            >
                <p>Nitprofile</p>

                <MdKeyboardArrowDown className="text-2xl transition-all duration-300 ease-in-out group-hover:rotate-180" />
            </div>

            {/* User Information */}
            <div className="flex items-center gap-2">
                <div className="h-[40px] w-[40px] rounded-full bg-gray-500" />
                <div>
                    <p className="text-sm font-normal text-[#101010]">{data?.firstName ?? "Chidi"}</p>

                    <p className="text-xs font-normal capitalize text-[#676767]">{data?.role ?? "Admin"}</p>
                </div>
            </div>
        </nav>
    )
}
