"use client"
import { FileInput } from "@/components/form"
import { RequireAuthentication } from "@/components/middlewares"
import { ResetPasswordModal } from "@/components/ui/Modals/ResetModal"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const AdminHome = () => {
    const [showModal, setShowModal] = useState(false)

    return <div>Hello</div>
}

export default AdminHome
