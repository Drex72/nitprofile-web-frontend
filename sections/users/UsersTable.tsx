"use client"

import { Pagination, Table, TableBody, TableContainer, TableHead, TableHeadProps } from "@/components/ui"
import useTable from "@/hooks/useTable"
import UsersTableRow, { IUsersData } from "./UsersTableRow"

const tableHeadData: TableHeadProps[] = [
    { id: "firstName", label: "First name", align: "left" },
    { id: "lastName", label: "Last name", align: "left" },
    { id: "email", label: "Email", align: "left" },
    { id: "date", label: "Date", align: "left" },
    { id: "", label: "" },
]

interface UsersTableProps {
    data: IUsersData[]
    handleDeleteUser: (id: string) => void
    handleEditUser: (id: string) => void
}

const UsersTable = ({ data, handleDeleteUser, handleEditUser }: UsersTableProps) => {
    const rowsPerPage = 7
    const { currentPage, currentPageData, handleChangePage, isLastPage, isFirstPage, goToNext, goToPrev } = useTable(
        data,
        rowsPerPage,
    )

    return (
        <TableContainer>
            <Table>
                <TableHead items={tableHeadData} />
                <TableBody>
                    {currentPageData.map((row, index) => (
                        <UsersTableRow
                            key={index}
                            item={row}
                            handleDeleteUser={handleDeleteUser}
                            handleEditUser={handleEditUser}
                        />
                    ))}
                </TableBody>
            </Table>
            <Pagination
                rowsPerPage={rowsPerPage}
                totalRows={data.length}
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

export default UsersTable
