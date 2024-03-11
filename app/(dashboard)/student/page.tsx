import { RequireAuthentication } from "@/components/middlewares"
import React from "react"

const StudentHome = () => {
    return <RequireAuthentication>StudentHome</RequireAuthentication>
}

export default StudentHome
