"use client"
import { Button } from "@/components/ui/Button"
import { makeToast } from "@/libs/react-toast"
import { useGenerateProfileCard } from "@/services/programs/program-hooks/program-profile/useGenerateProfileCard"
import { programSlice, useAppDispatch, useAppSelector } from "@/state_management"
import { getAsset } from "@/utils"
import Image from "next/image"

const Certificate = () => {
    const { selectedProgram } = useAppSelector((state) => state.programSlice)

    const { handler, loading } = useGenerateProfileCard()

    const dispatch = useAppDispatch()

    const { updateGeneratedProfile } = programSlice.actions

    const generateProfile = async () => {
        const response = selectedProgram && (await handler(selectedProgram?.program.id))

        if (!response?.data) return

        dispatch(updateGeneratedProfile({ profileUrl: response.data }))

        makeToast({
            id: "profile-generation-successful",
            message: "Generated profile Successfully",
            type: "success",
        })

        console.log(selectedProgram)
    }

    return (
        <section className="flex h-full flex-col items-center justify-center">
            {!selectedProgram?.userProgram?.certificateImageUrl && (
                <Image src={getAsset("rocket.svg", "images")} alt="Rocket svg" width={280} height={280} />
            )}

            {!selectedProgram?.program.certificateGenerationAvailable && (
                <p className="my-6 max-w-[32rem] text-center">
                    Generation of Certificate for this Program isn&apos;t available yet. Please look forward to it. Contact
                    Administrator for more details
                </p>
            )}

            {selectedProgram?.program.certificateGenerationAvailable && !selectedProgram.userProgram?.certificateImageUrl && (
                <p className="my-6 max-w-[32rem] text-center">
                    You haven&apos;t generated a Certificate yet for this program. Click the button below to generate your
                    profile.
                </p>
            )}

            {!selectedProgram?.userProgram?.certificateImageUrl && (
                <Button
                    label="Generate Certificate"
                    variant="contained"
                    disabled={!selectedProgram?.program.certificateGenerationAvailable}
                    onClick={generateProfile}
                    loading={loading}
                />
            )}

            {selectedProgram?.userProgram?.certificateImageUrl && (
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="w-full md:basis-[50%]">
                        <h2 className="mb-2 text-center text-lg font-semibold text-[#101010] md:text-xl">Certificate</h2>
                        <Image
                            src={selectedProgram.userProgram?.certificateImageUrl ?? ""}
                            alt="Certificate"
                            width={100}
                            height={100}
                            className="w-full rounded-md"
                            unoptimized
                            priority
                        />
                    </div>
                </div>
            )}
        </section>
    )
}
export default Certificate
