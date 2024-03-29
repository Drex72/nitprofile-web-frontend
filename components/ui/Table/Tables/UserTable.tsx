"use client"
import React, { useState } from "react"

import {
    Pagination,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableCell,
    TableCheckBox,
    TableMoreMenu,
    TableRow,
} from "@/components/ui"
import useTable from "@/hooks/useTable"
import { DeleteIcon, EditIcon } from "@/public/icons"
import { IProgramUser } from "@/services/programs/program.interface"
interface IUserProps {
    users: IProgramUser[]
}

export const UsersTable = (props: IUserProps) => {
    const { users } = props

    // const {data,handler,loading} = useGetProgramUsers()
    const rowsPerPage = 10

    const { currentPage, currentPageData, handleChangePage, isLastPage, isFirstPage, goToNext, goToPrev } = useTable(
        users,
        rowsPerPage,
    )

    const [selectedUsers, setSelectedUsers] = useState<string[]>([])

    const handleCheckboxChange = (userId: string) => {
        if (selectedUsers.includes(userId)) {
            const filteredUsers = selectedUsers.filter((id) => id !== userId)
            return setSelectedUsers(filteredUsers)
        }

        setSelectedUsers([...selectedUsers, userId])
    }

    const handleDeleteUser = (id: string) => {}

    const handleResendVerificationMail = (id: string) => {}

    const bulkDeleteUsers = () => {}

    return (
        <TableContainer>
            <Table>
                <TableHead items={["", "First Name", "Other Name", "Last Name", "Email", ""]} />
                <TableBody>
                    {currentPageData.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <TableCheckBox
                                    handleCheckboxChange={() => handleCheckboxChange(row.id)}
                                    checked={selectedUsers.includes(row.id)}
                                />
                            </TableCell>
                            <TableCell>{row.firstName}</TableCell>
                            <TableCell>{row.otherName ?? "-"}</TableCell>
                            <TableCell>{row.lastName}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>
                                <>
                                    <TableMoreMenu
                                        actions={
                                            <div className="flex flex-col gap-5 rounded-lg border-[0.5px] border-[#E3E6E8] bg-white shadow-program_card">
                                                {!row.isVerified && (
                                                    <button
                                                        className="flex items-center px-6 py-2 transition-all duration-300 ease-in-out hover:bg-[#E3E6E8]"
                                                        onClick={() => handleResendVerificationMail(row.id)}
                                                    >
                                                        <EditIcon />

                                                        <span>Resend Verification Mail</span>
                                                    </button>
                                                )}

                                                <button
                                                    className="flex items-center px-6 py-2  transition-all duration-300 ease-in-out hover:bg-[#E3E6E8]"
                                                    onClick={() => handleDeleteUser(row.id)}
                                                >
                                                    <DeleteIcon />

                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        }
                                    />
                                </>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Pagination
                rowsPerPage={rowsPerPage}
                totalRows={users.length}
                handleChangePage={handleChangePage}
                currentPage={currentPage}
                isFirstPage={isFirstPage}
                isLastPage={isLastPage}
                goToNext={goToNext}
                goToPrev={goToPrev}
            />
        </TableContainer>
    )
}

export const MemoizedUsersTable = React.memo(UsersTable)
