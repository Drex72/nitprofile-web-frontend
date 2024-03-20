"use client"
import Image from "next/image"
import { SidebarItems } from "./SidebarItem"
import { getAsset } from "@/utils"
import { usePathname } from "next/navigation"
import { getSidebarData } from "./data"
import { useAppSelector } from "@/state_management"
import { RiLogoutBoxRFill } from "react-icons/ri"

export const Sidebar = () => {
    // Work on the keyboard accessibility

    // Determines whether the sidebar is opened or closed
    const sidebarOpened = true

    // Gets the current pathname using the usePathname hook
    const pathname = usePathname()

    /**
     * Checks if the provided routes include the current path.
     * @param {string[]} routes - Array of route strings
     * @param {number} index - Index to extract the current path from the pathname
     * @returns {boolean} Whether the current path is included in the routes
     */
    const isItemActive = (routes: (string | undefined)[], index: number = 1) => {
        const currentPath = pathname.split("/")[index]
        return routes.includes(currentPath)
    }

    // Retrieves user data from the state
    const { data } = useAppSelector((state) => state.authSlice)

    // Retrieves sidebar data based on user role
    const sidebarData = getSidebarData(data!.role)

    return (
        <aside
            className={`transition-width fixed left-0 top-0 z-[1] flex h-full flex-shrink-0 flex-col duration-75 lg:flex ${
                sidebarOpened ? "w-screen md:w-[15rem]" : "w-0"
            }`}
            aria-label="Sidebar"
        >
            <div
                className={`relative flex max-h-screen min-h-0 flex-1  flex-col bg-white px-4 py-5 ${sidebarOpened ? "block" : "hidden"}`}
            >
                <Image
                    alt="Logo"
                    width={120}
                    height={35}
                    src={getAsset("nitda_logo.png", "icons")}
                    unoptimized
                    priority
                    className="mb-12"
                />

                <div className="flex h-full flex-col justify-between gap-4 ">
                    <div className="flex flex-col gap-5">
                        {sidebarData.map((item, index) => {
                            const { activeRoutes, icon, name, route } = item
                            const isActive = isItemActive(activeRoutes, 2)

                            return <SidebarItems key={index} active={isActive} icon={icon} name={name} route={route} />
                        })}
                    </div>

                    <SidebarItems icon={<RiLogoutBoxRFill />} name="Logout" />
                </div>
            </div>
        </aside>
    )
}
