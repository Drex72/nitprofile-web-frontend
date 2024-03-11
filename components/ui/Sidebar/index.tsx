"use client"
import SidebarItems from "./SidebarItem"

export const Sidebar = () => {
    const sidebarOpened = true

    return (
        <aside
            className={`fixed h-full top-0 left-0 flex lg:flex flex-shrink-0 flex-col transition-width duration-75 ${
                sidebarOpened ? "w-screen md:w-[17rem]" : "w-0"
            }`}
            aria-label="Sidebar"
        >
            <div className="relative flex-1 flex flex-col min-h-0 bg-white">
                <div
                    className={`pt-[120px] text-white h-full  overflow-y-scroll ${sidebarOpened ? "block" : "hidden"}`}
                >
                    <div>
                        <h2 className="text-base ml-8 font-medium mt-8 mb-4">Main Menu</h2>

                        <SidebarItems />
                    </div>
                </div>
            </div>
        </aside>
    )
}
