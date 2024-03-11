import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { MdKeyboardArrowRight } from "react-icons/md"
import { getSidebarData } from "./data"
import { useAppSelector } from "@/state_management"

const SidebarItems = () => {
    const router = useRouter()

    const pathname = usePathname()

    const goToPage = (page: string) => () => router.push(page)

    const isItemActive = (routes: string[], index: number = 1) => {
        const currentPath = pathname.split("/")[index]

        return routes.includes(currentPath)
    }

    const { data } = useAppSelector((state) => state.authSlice)

    const sidebarData = getSidebarData(data!.role)

    return (
        <div>
            {sidebarData.map((item, index) => {
                const isActive = isItemActive(item.activeRoutes)
                return (
                    <div
                        key={index}
                        onClick={goToPage(item.route)}
                        className="relative mb-[5px]  flex w-full cursor-pointer items-center justify-between bg-[#F6F7FD26] py-4 pl-8 pr-3 "
                    >
                        <div className="flex items-center gap-2">
                            {item.icon}
                            <p
                                className={`text-sm font-medium transition-all duration-300 ease-in-out ${isActive ? "text-white" : "text-[#B1B1B1]"}`}
                            >
                                {item.name}
                            </p>
                        </div>

                        <MdKeyboardArrowRight className="text-2xl font-light" />

                        <div
                            className={`absolute left-0 top-0 h-full bg-[#F6F7FD] transition-all duration-300 ease-in-out ${
                                isActive ? "w-[5px]" : "w-0"
                            }`}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default SidebarItems
