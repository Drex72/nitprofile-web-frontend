interface TableCheckBoxProps {
    isChecked: boolean
    handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TableCheckBox = ({ isChecked, handleCheckboxChange }: TableCheckBoxProps) => {
    return (
        <label className="ml-5 flex items-center space-x-2">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="h-6 w-6 appearance-none rounded-md border-[2px] border-black checked:border-transparent checked:bg-green-500 focus:outline-none"
            />
        </label>
    )
}

export default TableCheckBox
