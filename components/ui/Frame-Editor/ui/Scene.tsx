import { useSceneLogic } from "./hooks"
import { Toolbar } from "@frame-editor/ui/components/Toolbar"
import NextImage from "next/image"
import { useAppSelector } from "@/state_management"

export const FrameEditor = () => {
    const { canvas, handleCreateNode, imageRef, saves } = useSceneLogic()

    const { editorBackground } = useAppSelector((state) => state.editorSlice)

    return (
        <div className="flex items-center ">
            <div className="relative">
                <NextImage
                    width={300}
                    height={300}
                    ref={imageRef}
                    src={editorBackground ?? ""}
                    alt="Frame Background"
                    className="  basis-[70%] "
                />
                <div className="absolute left-0 top-0">
                    <canvas id="frame_editor" />
                </div>
            </div>
            <button onClick={() => saves()}>save</button>
            {canvas && <Toolbar create_node={handleCreateNode} />}
        </div>
    )
}
