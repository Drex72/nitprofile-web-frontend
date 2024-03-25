type IAlign = "left" | "right" | "center" | "end"

export interface TableHeadProps {
    id: string
    label: string
    align?: IAlign
}

const TableHead = ({ items }: { items: TableHeadProps[] }) => {
    return (
        <thead
            className="sticky inset-0 bottom-auto mb-[13.2px] h-[76.984px] bg-[#D4D2D2]"
            style={{ borderTopRightRadius: "14px" }}
        >
            <tr className="" style={{ borderRadius: "14px" }}>
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
