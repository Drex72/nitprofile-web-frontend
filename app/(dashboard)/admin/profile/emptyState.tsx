"use client"
import { Button } from "@/components/ui/Button"
import { DropzoneModal } from "@/components/ui/Modals/DropzoneModal"
import { IDropZoneHandlerProps } from "@/hooks/useDropZone"
import { makeToast } from "@/libs/react-toast"
import { useAddProfileFrame } from "@/services/programs/program-hooks"
import { programSlice, useAppDispatch, useAppSelector } from "@/state_management"
import { getAsset } from "@/utils"
import Image from "next/image"
import { useRef, useState } from "react"

interface IImageProperties {
    streamUrl: string
    fileObj: File | null
}

export const ProfileEmptyState = () => {
    const { selectedProgram } = useAppSelector((state) => state.programSlice)

    const { handler, loading } = useAddProfileFrame()

    const dispatch = useAppDispatch()

    const { addProgramProfileFrame } = programSlice.actions

    const [uploadProfileFrame, setUploadProfileFrame] = useState(false)

    const [imageProperties, setImageproperties] = useState<IImageProperties>({
        streamUrl: "",
        fileObj: null,
    })

    const ref = useRef<HTMLImageElement>(null)

    const handleFileForm = (file: IDropZoneHandlerProps) => {
        setImageproperties({
            streamUrl: file.stream ?? "",
            fileObj: file.file ?? null,
        })
    }

    const onSubmit = async () => {
        if (!selectedProgram || !imageProperties.fileObj || !imageProperties.streamUrl) return

        const profileFrameHeight = ref.current?.naturalHeight ?? 1000
        const profileFrameWidth = ref.current?.naturalWidth ?? 1000

        const formData = new FormData()

        formData.append("frame", imageProperties.fileObj)
        formData.append("profileFrameHeight", profileFrameHeight.toString())
        formData.append("profileFrameWidth", profileFrameWidth.toString())

        const response = await handler({
            data: formData,
            programId: selectedProgram?.program.id,
        })

        if (!response || !response.data) return

        makeToast({
            id: "program-success",
            message: "Profile Frame Uploaded Successfully",
            type: "success",
        })

        dispatch(
            addProgramProfileFrame({
                programId: selectedProgram?.program.id,
                profileFrameSecureUrl: response.data.profileFrameSecureUrl!,
                profileFramePublicId: response.data.profileFramePublicId!,
                profileFrameHeight: response.data.profileFrameHeight!,
                profileFrameWidth: response.data.profileFrameWidth!,
            }),
        )

        setImageproperties({
            streamUrl: "",
            fileObj: null,
        })

        setUploadProfileFrame(false)
    }

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
                <Image ref={ref} src={imageProperties.streamUrl} alt="Uploaded Frame" width={400} height={400} />

                <Button variant="contained" label="Submit" loading={loading} onClick={() => onSubmit()} />
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
