"use client"

import { useAppSelector } from "@/state_management"
import { ProfileEmptyState } from "./emptyState"
import Image from "next/image"
import { Button } from "@/components/ui/Button"

const Profile = () => {
    const { selectedProgram } = useAppSelector((state) => state.programSlice)

    if (!selectedProgram?.program.profileFrameSecureUrl) return <ProfileEmptyState />
    
    return (
        <section className=" h-full">
            <div className="mb-2 flex w-full items-end justify-end">
                <Button variant="contained" label="Customize" />
            </div>

            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="basis-[50%]">
                    <h2 className="mb-2 text-center text-lg font-semibold text-[#101010] md:text-xl">Frame</h2>
                    <Image
                        src="https://res.cloudinary.com/dinrq1kf4/image/upload/c_fill,g_center,h_1000,w_1000/c_fit,h_500,l_Nithub:NITPROFILE_ASSETS:IMAGE%2022-8769646304,r_10000,w_500,x_20,y_20/co_red,l_text:Cookie_10_bold:Teledua,x_40,y_40/v1/Nithub/nitprofile_profile_frames/FRAME%20119-5069537755"
                        alt="Profile Frame"
                        width={100}
                        height={100}
                        className="w-full"
                        unoptimized
                        priority
                    />
                </div>

                <div className="basis-[50%]">
                    <h2 className="mb-2 text-center text-lg font-semibold text-primary md:text-xl">Preview</h2>
                    <Image
                        src="https://res.cloudinary.com/dinrq1kf4/image/upload/c_fill,g_center,h_1000,w_1000/c_fit,h_500,l_Nithub:NITPROFILE_ASSETS:IMAGE%2022-8769646304,r_10000,w_500,x_20,y_20/co_red,l_text:Cookie_10_bold:Teledua,x_40,y_40/v1/Nithub/nitprofile_profile_frames/FRAME%20119-5069537755"
                        alt="Profile Frame"
                        width={100}
                        height={100}
                        className="w-full"
                        unoptimized
                        priority
                    />
                </div>
            </div>
        </section>
    )
}
export default Profile
