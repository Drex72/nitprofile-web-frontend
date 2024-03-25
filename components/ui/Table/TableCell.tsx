import Image from "next/image"
import { PopOver } from "../Popover"

interface ITableCell {
    children: string | React.ReactNode
}

const TableCell = ({ children }: ITableCell) => {
    return <td className={`text-left text-[16px] font-normal leading-normal`}>{children}</td>
}

interface TableMoreMenuProps {
    actions: React.ReactNode
}

export const TableMoreMenu = ({ actions }: TableMoreMenuProps) => {
    return (
        <>
            <PopOver location="bottom" content={actions}>
                <button>
                    <Image src="/icons/charm_menu-kebab.svg" width={16} height={16} alt="more" />
                </button>
            </PopOver>
        </>
    )
}

export default TableCell

interface MenuItemProps {
    children: React.ReactNode | string
    handleClick: () => void
}

export const MenuItem = ({ children, handleClick }: MenuItemProps) => {
    return (
        <button className="flex items-center border border-red-500 shadow-md" onClick={handleClick}>
            {children}
        </button>
    )
}
