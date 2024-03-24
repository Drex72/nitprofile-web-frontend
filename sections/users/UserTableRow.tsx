import { MenuItem, TableCell, TableMoreMenu } from "@/components/ui"
import Image from "next/image"

export interface IUsersData {
    firstName: string
    lastName: string
    email: string
    date: string
}

const UserTableRow = ({ item }: { item: IUsersData }) => {
    return (
        <tr className="h-[50px] border-b border-[#000]/30 bg-white last-of-type:border-b-0">
            <TableCell>
                <label className="ml-5 flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={false}
                        onChange={() => {}}
                        className="h-6 w-6 appearance-none rounded-md border-[2px] border-black checked:border-transparent checked:bg-green-500 focus:outline-none"
                    />
                </label>
            </TableCell>
            <TableCell>{item.firstName}</TableCell>
            <TableCell>{item.lastName}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.date}</TableCell>
            <TableCell>
                <>
                    <TableMoreMenu
                        actions={
                            <>
                                <MenuItem>
                                    <Image src="/icons/charm_menu-kebab.svg" width={16} height={16} alt="more" />
                                    <span>Edit</span>
                                </MenuItem>
                                <MenuItem>
                                    <Image src="/icons/charm_menu-kebab.svg" width={16} height={16} alt="more" />
                                    <span>Edit</span>
                                </MenuItem>
                            </>
                        }
                    />
                </>
            </TableCell>
        </tr>
    )
}

export default UserTableRow
