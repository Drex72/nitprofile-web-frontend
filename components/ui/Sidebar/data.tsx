import { IRole } from "@/state_management"
import { PiGraduationCapLight } from "react-icons/pi"

const adminRoutes = [
    {
        name: "Home",
        icon: <PiGraduationCapLight />,
        route: "/admin",
        activeRoutes: [""],
    },
]

const userRoutes = [
    {
        name: "Home",
        icon: <PiGraduationCapLight />,
        route: "/admin",
        activeRoutes: [""],
    },
]

interface ISidebarData {
    name: string
    icon: string | React.ReactNode | null
    route: string
    activeRoutes: string[]
}

export const getSidebarData = (role: IRole): ISidebarData[] => {
    switch (role) {
        case "ADMIN":
            return adminRoutes

        case "SUPER ADMIN":
            return [
                ...adminRoutes,
                { name: "Admins", icon: <PiGraduationCapLight />, route: "/admin", activeRoutes: [""] },
            ]

        case "USER":
            return userRoutes

        default:
            return []
    }
}
