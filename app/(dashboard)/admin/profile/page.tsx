"use client"

import { programSlice, useAppDispatch, useAppSelector } from "@/state_management"
import { ProfileEmptyState } from "./emptyState"
import Image from "next/image"
import { Button } from "@/components/ui/Button"
import { useEffect, useMemo, useState } from "react"
import { useGetProgramNodes, useProfilePreview } from "@/services/programs/program-hooks"
import { ConditionalComponent } from "@/components/animation"
import { useRouter } from "next/navigation"

const Profile = () => {
    const { selectedProgram } = useAppSelector((state) => state.programSlice)

    const { handler, loading } = useProfilePreview()

    const dispatch = useAppDispatch()

    const { setProgramNodes } = programSlice.actions

    const { handler: getProgramNodes, loading: programNodesFetching } = useGetProgramNodes()

    const router = useRouter()

    const [previewedProfile, setPreviewedProfile] = useState("")

    const programFrame = useMemo(() => {
        return selectedProgram?.program.profileFrameSecureUrl
    }, [selectedProgram])

    const handleCustomizeFrame = async () => {
        if (!selectedProgram) return

        const programNodes = await getProgramNodes({
            programId: selectedProgram?.program.id,
            category: "profile",
        })

        programNodes && dispatch(setProgramNodes(programNodes.data))

        router.push("/editor")
    }

    useEffect(() => {
         previewProfile()

        async function previewProfile() {
            const response = selectedProgram && (await handler(selectedProgram?.program.id))

            setPreviewedProfile(response?.data ?? "")
        }
    }, [selectedProgram])

    if (!programFrame) return <ProfileEmptyState />

    return (
        <section className=" mx-auto h-full max-w-[1500px]">
            <div className="mb-4 flex w-full items-end justify-end gap-4">
                <Button variant="outlined" label="Enable Profile Generation" />

                <Button
                    variant="contained"
                    label="Customize"
                    loading={programNodesFetching}
                    onClick={() => handleCustomizeFrame()}
                />
            </div>

            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="basis-[50%]">
                    <h2 className="mb-2 text-center text-lg font-semibold text-[#101010] md:text-xl">Frame</h2>
                    <ConditionalComponent delay={100} isMounted={loading}>
                        <div className="h-[400px] w-full animate-pulse rounded-md bg-slate-400"></div>
                    </ConditionalComponent>

                    <ConditionalComponent delay={100} isMounted={!loading}>
                        <Image
                            src={programFrame}
                            alt="Profile Frame"
                            width={100}
                            height={100}
                            className="w-full rounded-md"
                            unoptimized
                            priority
                        />
                    </ConditionalComponent>
                </div>

                <div className="basis-[50%]">
                    <h2 className="mb-2 text-center text-lg font-semibold text-primary md:text-xl">Preview</h2>
                    <ConditionalComponent delay={100} isMounted={loading}>
                        <div className="h-[400px] w-full animate-pulse rounded-md bg-slate-400"></div>
                    </ConditionalComponent>

                    <ConditionalComponent delay={100} isMounted={!loading}>
                        <Image
                            src={previewedProfile}
                            alt="Profile Frame"
                            width={100}
                            height={100}
                            className="w-full rounded-md"
                            unoptimized
                            priority
                        />
                    </ConditionalComponent>
                </div>
            </div>
        </section>
    )
}
export default Profile
