"use client"

import { Pagination, TableContainer, TableHead, TableHeadProps } from "@/components/ui"
import useTable from "@/hooks/useTable"
import UserTableRow, { IUsersData } from "./UserTableRow"

const tableHeadData: TableHeadProps[] = [
    { id: "firstName", label: "First name", align: "left" },
    { id: "lastName", label: "Last name", align: "left" },
    { id: "email", label: "Email", align: "left" },
    { id: "date", label: "Date", align: "left" },
    { id: "", label: "" },
]

const UsersTable = ({ data }: { data: IUsersData[] }) => {
    const rowsPerPage = 7

    const { currentPage, currentPageData, handleChangePage, isLastPage, isFirstPage, goToNext, goToPrev } = useTable(
        data,
        rowsPerPage,
    )
    return (
        <TableContainer>
            <div className="h-[536px] overflow-y-auto">
                <table className="relative w-full min-w-[1203.152px]">
                    <TableHead items={tableHeadData} />
                    <tbody style={{ marginTop: "40px" }}>
                        {currentPageData.map((row, index) => (
                            <UserTableRow key={index} item={row} />
                        ))}
                    </tbody>
                </table>
            </div>
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
