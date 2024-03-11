"use client"

import React, { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { PageLoader } from "@/components/ui/Loaders"
import { IRole, useAppSelector } from "@/state_management"

interface RequireAuthProps {
    children: React.ReactNode
    allowedRoles: IRole[]
}

/**
 * React component that conditionally renders its children based on user roles.
 *
 * @component
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - The React node(s) to be rendered conditionally.
 * @param {IRole[]} props.allowedRoles - The array of roles allowed to access the children when authentication is required.
 * @returns {ReactElement} - The rendered React element.
 */
export const RequireAuthorization: React.FC<RequireAuthProps> = ({ children, allowedRoles }) => {
    const { data } = useAppSelector((state) => state.authSlice)

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

        // Redirect to "/auth" if user roles are not allowed
        if (allowedRoles && allowedRoles.length > 0 && (!data || !allowedRoles.includes(data.role))) {
            return redirect("/auth")
        }

        setLoading(false)
    }, [data, allowedRoles])

    // Render a page loader while waiting for authentication and authorization checks
    if (loading) return <PageLoader />

    // Render the children if no redirection is needed
    return children
}
