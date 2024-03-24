import { useEffect, useState } from "react"

const useTable = (data: any[], rowsPerPage: number) => {
    const [currentPage, setCurrentPage] = useState<number>(1)

    const [currentPageData, setCurrentPageData] = useState<any[]>([])

    const totalRows = data.length

    const totalPages = Math.ceil(totalRows / rowsPerPage)

    const isLastPage: boolean = currentPage === totalPages
    const isFirstPage: boolean = currentPage === 1

    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage
        const endIndex = startIndex + rowsPerPage
        setCurrentPageData(data.slice(startIndex, endIndex))
    }, [currentPage, data, rowsPerPage])

    const handleChangePage = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    const goToNext = () => {
        if (!isLastPage) {
            setCurrentPage((prev) => prev + 1)
        }
    }

    const goToPrev = () => {
        if (!isFirstPage) {
            setCurrentPage((prev) => prev - 1)
        }
    }

    return { currentPage, currentPageData, handleChangePage, isLastPage, isFirstPage, goToNext, goToPrev }
}

export default useTable
