import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { MdKeyboardArrowRight } from "react-icons/md"
import { PiGraduationCapLight } from "react-icons/pi"

const SidebarItems = () => {
    const router = useRouter()

    const pathname = usePathname()

    const goToPage = (page: string) => () => router.push(page)

    const isItemActive = (routes: string[], index: number = 1) => {
        const currentPath = pathname.split("/")[index]

        return routes.includes(currentPath)
    }

    const sidebarData = [
        {
            name: "Applicants",
            icon: <PiGraduationCapLight />,
            route: "/",
            active: isItemActive(["", "applicants"]),
        },
    ]

    return (
        <div>
            {sidebarData.map((item, index) => (
                <div
                    key={index}
                    onClick={goToPage(item.route)}
                    className="relative bg-[#F6F7FD26]  pl-8 pr-3 py-4 w-full mb-[5px] cursor-pointer flex items-center justify-between "
                >
                    <div className="flex items-center gap-2">
                        {item.icon}
                        <p className={`text-sm font-medium transition-all duration-300 ease-in-out ${item.active ? "text-white" : "text-[#B1B1B1]"}`}>
                            {item.name}
                        </p>
                    </div>

                    <MdKeyboardArrowRight className="text-2xl font-light" />

                    <div
                        className={`h-full absolute bg-[#F6F7FD] top-0 left-0 transition-all duration-300 ease-in-out ${
                            item.active ? "w-[5px]" : "w-0"
                        }`}
                    />
                </div>
            ))}
        </div>
    )
}

export default SidebarItems
