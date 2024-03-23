"use client"
import { Button } from "@/components/ui/Button"
import { DropzoneModal } from "@/components/ui/Modals/DropzoneModal"
import { IDropZoneHandlerProps } from "@/hooks/useDropZone"
import { useAppSelector } from "@/state_management"
import { getAsset } from "@/utils"
import Image from "next/image"
import { useState } from "react"

const Profile = () => {
    const { selectedProgram } = useAppSelector((state) => state.programSlice)

    const [uploadProfileFrame, setUploadProfileFrame] = useState(false)

    const [imageUrl, setImageUrl] = useState("")

    const handleFileForm = (file: IDropZoneHandlerProps) => {
        if (file.stream) {
            setImageUrl(file.stream)
        }
    }

    // const clos
    return (
        <section className="flex h-full flex-col items-center justify-center">
            <DropzoneModal
                header={"Upload Profile Frame"}
                modalIsMounted={uploadProfileFrame}
                handleClose={() => setUploadProfileFrame(false)}
                handleInputChange={handleFileForm}
                accept={{
                    "image/*": [".jpeg", ".png"],
                }}
            >
                <Image src={imageUrl} alt="Uploaded Frame" width={400} height={400} />
            </DropzoneModal>

            <Image src={getAsset("rocket.svg", "images")} alt="Rocket svg" width={280} height={280} />

            <p className="my-6 max-w-[32rem] text-center">
                There is no Profile Frame for this Program. Click the button below to Upload a Profile Frame for this
                program.
            </p>

            <Button label="Upload Profile Frame" variant="contained" onClick={() => setUploadProfileFrame(true)} />
        </section>
    )
}
export default Profile
