"use client"
import React, { useState } from "react"
import UsersTable from "./UsersTable"
import { _mockUsers } from "@/constants/usersData"

const Users = () => {
    const [data, setData] = useState(_mockUsers)
    return (
        <main>
            <UsersTable data={data} />
        </main>
    )
}

export default Users
