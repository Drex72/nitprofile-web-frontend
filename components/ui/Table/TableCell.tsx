import Image from "next/image"

interface ITableCell {
    children: string | React.ReactNode
}

const TableCell = ({ children }: ITableCell) => {
    return <td className={`text-left text-[16px] font-normal uppercase leading-normal`}>{children}</td>
}

interface TableMoreMenuProps {
    actions: React.ReactNode
}

export const TableMoreMenu = ({ actions }: TableMoreMenuProps) => {
    return (
        <>
            <button>
                <Image src="/icons/charm_menu-kebab.svg" width={16} height={16} alt="more" />
            </button>
            {/* <PopOver content="lax" trigger="click">
                {actions}
            </PopOver> */}
        </>
    )
}

export default TableCell

interface MenuItemProps {
    children: React.ReactNode | string
}

export const MenuItem = ({ children }: MenuItemProps) => {
    return <button className="flex items-center">{children}</button>
}
