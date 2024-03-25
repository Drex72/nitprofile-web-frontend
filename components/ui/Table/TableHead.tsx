type IAlign = "left" | "right" | "center" | "end"

export interface TableHeadProps {
    id: string
    label: string
    align?: IAlign
}

const TableHead = ({ items }: { items: TableHeadProps[] }) => {
    return (
        <thead className=" bg-[#D4D2D2] !py-5" style={{ borderTopRightRadius: "14px" }}>
            <tr className="rounded-[14px] py-10">
                <th></th>

                {items.map((item, index) => (
                    <th
                        key={index}
                        className={`text-${item.align || "left"} text-[16px] font-semibold leading-normal text-[#04091E]`}
                    >
                        {item.label}
                    </th>
                ))}
            </tr>
        </thead>
    )
}

export default TableHead
