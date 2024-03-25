"use client"
import React, { useState } from "react"
import UsersTable from "./UsersTable"
import { _mockUsers } from "@/constants/usersData"
import { IUsersData } from "./UsersTableRow"

const Users = () => {
    const [data, setData] = useState<IUsersData[]>(_mockUsers)

    const handleDeleteUser = (id: string) => {
        const newUsers = data.filter((user) => user.userId !== id)
        setData(newUsers)
    }

    const handleEditUser = () => {}
    return (
        <main>

            <div></div>
            <UsersTable data={data} handleDeleteUser={handleDeleteUser} handleEditUser={handleEditUser} />
        </main>
    )
}

export default Users
