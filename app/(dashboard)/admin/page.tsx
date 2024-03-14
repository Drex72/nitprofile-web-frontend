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

    const schema = z.object({
        file: z.any(),
    })

    type schemaType = z.infer<typeof schema>

    const { register } = useForm<schemaType>({
        resolver: zodResolver(schema),
    })

    return (
        <div>
            <ResetPasswordModal modalIsMounted={showModal} handleClose={() => setShowModal(false)} />
            Helo
            <button onClick={() => setShowModal(true)}>Show modal</button>
            <FileInput name="file" label="Upload File" register={register} />
        </div>
    )
}

export default AdminHome
