import { RequireAuthentication } from "@/components/middlewares"
import React from "react"

const StudentHome = () => {
    return <RequireAuthentication allowedRoles={["USER"]}>StudentHome</RequireAuthentication>
}

export default StudentHome
