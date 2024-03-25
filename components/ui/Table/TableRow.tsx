const TableRow = ({ children }: { children: React.ReactNode }) => {
    return <tr className="h-[50px] border-b border-[#000]/30 bg-white last-of-type:border-b-0">{children}</tr>
}

export default TableRow
