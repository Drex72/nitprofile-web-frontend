"use client"

import React, { useState } from "react"
import { ProgramsModal } from "../Modals/ProgramsModal"

export const Navbar = () => {
    const [programsModal, setProgramsModal] = useState({
        showPrograms: false,
        createProgram: false,
    })

    return (
        <nav className="ml-[15rem] flex items-center justify-between bg-white px-[20px] py-[15px] shadow-sm">
            <ProgramsModal
                modalIsMounted={programsModal.showPrograms}
                createProgram={() => setProgramsModal({ createProgram: true, showPrograms: false })}
                handleClose={() => setProgramsModal({ ...programsModal, showPrograms: false })}
            />

            <button onClick={() => setProgramsModal({ ...programsModal, showPrograms: true })}>Show Programs</button>

            <h1 className="text-sm font-semibold text-[#101010]">Home</h1>
            <div className="flex items-center gap-2">
                <div className="h-[40px] w-[40px] rounded-full bg-gray-500" />
                Hello
            </div>
        </nav>
    )
}
