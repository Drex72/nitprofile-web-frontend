"use client"
import React, { useState } from "react"
import { KpiCard } from "@/components/ui/KpiCard"
import {
    ProfileAmountIllustration,
    CertificateAmountIllustration,
    VerifiedUsersAmountIllustration,
} from "@/public/illustrations"

const AdminHome = () => {
    const [showModal, setShowModal] = useState(false)

    const data = [
        {
            title: "No of Profiles generated",
            metric: 5,
            icon: <ProfileAmountIllustration height={100} />,
        },

        {
            title: "No of Users Verified",
            metric: 2,
            icon: <VerifiedUsersAmountIllustration height={100} />,
        },

        {
            title: "No of Certificates generated",
            metric: 4,
            icon: <CertificateAmountIllustration height={100} />,
        },
    ]

    return (
        <div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {data.map((item, index) => (
                    <KpiCard key={index} title={item.title} metric={item.metric} icon={item.icon} />
                ))}
            </div>
        </div>
    )
}

export default AdminHome
