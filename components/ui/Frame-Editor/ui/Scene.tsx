import { NitdaLogo } from "@/public/icons"
import { useAppSelector } from "@/state_management"
import { Toolbar } from "@frame-editor/ui/components/Toolbar"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { convert_node_to_fabric_object } from "../logic"
import { useSceneLogic } from "./hooks"

export const FrameEditor = () => {
    const { canvas, handleCreateNode, imageRef, saveCustomization } = useSceneLogic()

    const { selectedProgram } = useAppSelector((state) => state.programSlice)

    const [imageLoading, setImageLoading] = useState(true)

    const router = useRouter()

    const programFrame = useMemo(() => {
        const node_type = localStorage.getItem("node_type") as "profile" | "certificate"

        if (!selectedProgram || !node_type) {
            router.back()
        }

        if (node_type !== "certificate" && node_type !== "profile") {
            router.back()
        }

        return {
            frame: selectedProgram?.program.profileFrameSecureUrl ?? "",
            nodes: selectedProgram?.programNodes ?? [],
            node_type:node_type ?? "profile",
        }
    }, [selectedProgram])

    const onImageLoad = () => {
        setImageLoading(false)
    }

    const initializeObjects = () => {
        const nodes = programFrame.nodes

        if (!canvas) return

        for (let node of nodes) {
            const obj = convert_node_to_fabric_object({
                node,
                canvasHeight: canvas.height ?? 100,
                canvasWidth: canvas.width ?? 100,
            })

            obj && canvas?.add(obj)
        }

        canvas?.renderAll()
    }

    useEffect(() => {
        initializeObjects()
    }, [canvas])

    return (
        <div className=" flex h-screen w-screen flex-col items-center justify-between gap-4 overflow-hidden bg-white px-8 py-8">
            <div className=" flex h-full w-full basis-[85%] justify-center rounded-md bg-[#ededee] p-5">
                <NitdaLogo width={150} height={50} className="absolute left-5 top-5" />
                <div className="relative">
                    {imageLoading && <div className="h-[400px] w-[300px] animate-pulse rounded-md bg-slate-400"></div>}

                    <Image
                        width={300}
                        height={300}
                        ref={imageRef}
                        src={programFrame.frame}
                        onLoad={onImageLoad}
                        alt="Frame Background"
                        className="h-full w-full "
                        priority
                    />
                    <div className="absolute left-0 top-0">
                        <canvas id="frame_editor" />
                    </div>
                </div>
            </div>
            <button onClick={() => saveCustomization()}>Save</button>

            {canvas && (
                <div className="w-full max-w-[95%] basis-[20%] overflow-scroll rounded-md  bg-[#ededee] p-2">
                    <Toolbar create_node={handleCreateNode} />
                </div>
            )}
        </div>
    )
}
