import { RequireAuthentication } from "@/components/middlewares"
import React from "react"

const AdminHome = () => {
    return (
        <div>
            <RequireAuthentication allowedRoles={["ADMIN", "SUPER ADMIN"]}>AdminHome</RequireAuthentication>
        </div>
    )
}

export default AdminHome
