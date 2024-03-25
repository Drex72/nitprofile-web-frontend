const Table = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-[480px] overflow-y-auto">
            <table className="relative w-full min-w-[1203.152px]">{children}</table>
        </div>
    )
}

export default Table
