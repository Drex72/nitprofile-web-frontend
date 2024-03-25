"use client"
import { MenuItem, TableCell, TableCheckBox, TableMoreMenu, TableRow } from "@/components/ui"
import Image from "next/image"
import { useState } from "react"

export interface IUsersData {
    userId: string
    firstName: string
    lastName: string
    email: string
    date: string
}

interface UsersTableRowProps {
    item: IUsersData
    handleEditUser: (id: string) => void
    handleDeleteUser: (id: string) => void
}

const UsersTableRow = ({ item, handleEditUser, handleDeleteUser }: UsersTableRowProps) => {
    const [isChecked, setIsChecked] = useState(false)

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked)
    }

    return (
        <TableRow>
            <TableCell>
                <TableCheckBox handleCheckboxChange={handleCheckboxChange} isChecked={isChecked} />
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
                                <MenuItem handleClick={() => handleEditUser(item.userId)}>
                                    <Image src="/icons/edit_ic.svg" width={16} height={16} alt="more" />
                                    <span>Edit</span>
                                </MenuItem>
                                <MenuItem handleClick={() => handleDeleteUser(item.userId)}>
                                    <Image src="/icons/delete_icon.svg" width={15.11} height={17} alt="more" />
                                    <span>Delete</span>
                                </MenuItem>
                            </>
                        }
                    />
                </>
            </TableCell>
        </TableRow>
    )
}

export default UsersTableRow
