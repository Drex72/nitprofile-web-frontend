const Table = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-[480px] overflow-y-auto">
            <table className="relative w-full ">{children}</table>
        </div>
    )
}

export default Table
