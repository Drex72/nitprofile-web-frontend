"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PageLoader } from "@/components/ui/Loaders"
import { appSlice, useAppDispatch, useAppSelector } from "@/state_management"
import { useDelayUnmount } from "@/hooks/useDelayMount"

interface RequireAuthProps {
    children: React.ReactNode
    require?: "auth" | "no-auth"
}

export const RequireAuthentication: React.FC<RequireAuthProps> = ({ children, require = "auth" }) => {
    const router = useRouter()

    const dispatch = useAppDispatch()

    const { routeValidated } = useAppSelector((state) => state.appSlice)

    const { isAuthenticated, data } = useAppSelector((state) => state.authSlice)

    const { setRouteValidation } = appSlice.actions

    const [loading, setLoading] = useState(routeValidated ? false : true)

    const showLoader = useDelayUnmount(loading, 450)

    const mountedStyle = { animation: "fade-in-animation 450ms ease-in" }

    const unmountedStyle = {
        animation: "fade-out-animation 470ms ease-out",
        animationFillMode: "forwards",
    }

    const validatorHandler = (route: string) => {
        router.push(route)

        setLoading(false)

        dispatch(setRouteValidation(true))

        setTimeout(() => {
            dispatch(setRouteValidation(false))
        }, 5000)
    }

    useEffect(() => {
        // Check if a validation was just previously done
        if (routeValidated) {
            return setLoading(false)
        }

        setLoading(true)

        if (require === "auth") {
            if (isAuthenticated || data) {
                return setLoading(false)
            }

            if (!isAuthenticated || !data) {
                return validatorHandler("/auth")
            }
        }

        if (require === "no-auth") {
            if (isAuthenticated && data) {
                return validatorHandler(data.role === "USER" ? "/student" : "/admin")
            } else {
                return setLoading(false)
            }
        }
    }, [isAuthenticated, data, require])

    return (
        <div>
            {/* Render a page loader while waiting for authentication and authorization checks */}
            <div style={showLoader ? mountedStyle : unmountedStyle}>
                <PageLoader />
            </div>

            {/* Render the children if no redirection is needed */}
            <div style={showLoader ? unmountedStyle : mountedStyle}>{children}</div>
        </div>
    )
}
