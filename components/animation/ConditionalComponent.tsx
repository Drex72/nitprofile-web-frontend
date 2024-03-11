import { useDelayUnmount } from "@/hooks/useDelayMount"
import React from "react"

interface IConditionalComponent {
    children: React.ReactNode
    isMounted: boolean
}

export const ConditionalComponent = ({ children, isMounted }: IConditionalComponent) => {
    // Custom hook for handling mounting and unmounting delay
    const showComponent = useDelayUnmount(isMounted, 1000)

    // Styles for mounted and unmounted states
    const mountedStyle = { animation: "fade-in-animation 200ms ease-in" }

    const unmountedStyle = {
        animation: "fade-out-animation 300ms ease-out",
        animationFillMode: "forwards",
    }

    return <div>{showComponent && <div style={isMounted ? mountedStyle : unmountedStyle}>{children}</div>}</div>
}
