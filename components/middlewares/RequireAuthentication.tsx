"use client"

import React, { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { PageLoader } from "@/components/ui/Loaders"
import { IRole, useAppSelector } from "@/state_management"

interface RequireAuthProps {
    children: React.ReactNode
    require?: "auth" | "no-auth"
    allowedRoles?: IRole[]
}

/**
 * React component that conditionally renders its children based on authentication status and user roles.
 *
 * @component
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - The React node(s) to be rendered conditionally.
 * @param {"auth" | "no-auth"} [props.require="auth"] - Specifies whether authentication is required or not.
 *   - "auth" (default) - Requires authentication; redirects to "/auth" if not authenticated or if user roles are not allowed.
 *   - "no-auth" - Requires no authentication; redirects to "/" if authenticated.
 * @param {IRole[]} props.allowedRoles - The array of roles allowed to access the children when authentication is required.
 * @returns {ReactElement} - The rendered React element.
 */
export const RequireAuthentication: React.FC<RequireAuthProps> = ({ children, require = "auth", allowedRoles }) => {
    const { isAuthenticated, data } = useAppSelector((state) => state.authSlice)

    console.log(isAuthenticated, data)

    // State to manage the loading status
    const [loading, setLoading] = useState(false)

    /**
     * Effect hook to handle authentication checks, role-based authorization checks, and redirects.
     *
     * @function
     * @name useEffect
     * @param {function} effect - The effect function to be executed.
     * @param {Array} dependencies - The dependencies for the effect.
     */
    useEffect(() => {
        setLoading(true)

        // Check if authentication is required
        if (require === "auth") {
            // Redirect to "/auth" if not authenticated or access token is missing
            if (!isAuthenticated || !data) {
                return redirect("/auth")
            }

            // Redirect to "/auth" if user roles are not allowed
            if (allowedRoles && allowedRoles.length > 0 && (!data || !allowedRoles.includes(data.role))) {
                return redirect("/auth")
            }
        }

        // Check if no authentication is required and user is authenticated
        if (require === "no-auth") {
            // Redirect to "/" if authenticated
            if (isAuthenticated && data) {
                return data.role === "USER" ? redirect("/student") : redirect("/admin")
            }
        }

        setLoading(false)
    }, [isAuthenticated, data])

    // Render a page loader while waiting for authentication and authorization checks
    if (loading) return <PageLoader />

    // Render the children if no redirection is needed
    return children
}
