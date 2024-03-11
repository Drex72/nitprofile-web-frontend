"use client"
import { RequireAuthentication } from "@/components/middlewares"
import { ResetPasswordModal } from "@/components/ui/Modals/ResetModal"
import React, { useState } from "react"

const AdminHome = () => {
    const [showModal, setShowModal] = useState(false)
    return (
        <div>
            <ResetPasswordModal modalIsMounted={showModal} handleClose={() => setShowModal(false)} />
            Helo
            <button onClick={() => setShowModal(true)} >Show modal</button>
        </div>
    )
}

export default AdminHome
