import { RequireAuthentication } from "@/components/middlewares"
import React from "react"

const Auth = () => {
    return <RequireAuthentication require="no-auth">Auth</RequireAuthentication>
}

export default Auth
