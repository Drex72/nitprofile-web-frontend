import React, { useCallback, useEffect, useRef, useState } from "react"
import { ICreateNodeOptions, Scene } from "../logic"
import { useSceneContext } from "./hooks"
import { makeToast } from "@/libs/react-toast"
import { Toolbar } from "@frame-editor/ui/components/Toolbar"
import NextImage from "next/image"
import { useAppDispatch, useAppSelector, useEditorActions } from "@/state_management"
import { convert_fabric_objects_to_nodes } from "../logic/utils"

export const FrameEditor = () => {
    const sceneRef = useRef<Scene | null>(null)

    const { dispatch, state } = useSceneContext()

    const { editorBackground } = useAppSelector((state) => state.editorSlice)

    const { save } = useEditorActions()

    // sceneBackground:
    // "https://res.cloudinary.com/dinrq1kf4/image/upload/c_fill,g_center,h_1500,w_1500/c_fit,h_500,l_Nithub:NITPROFILE_ASSETS:IMAGE%2022-8769646304,r_10000,w_500,x_20,y_20/co_red,l_text:Cookie_10_bold:Teledua,x_40,y_40/v1/Nithub/nitprofile_profile_frames/FRAME%20119-5069537755",

    const [type, setType] = useState<"landscape" | "portrait">("portrait")

    const initializeScene = useCallback(() => {
        const scene = new Scene({
            canvas_id: "frame_editor",
            options: {
                selection: false,
                // backgroundColor: "red",
                renderOnAddRemove: true,
            },
        })

        const canvas = scene.get_canvas()

        if (!canvas) {
            return makeToast({
                id: "error_creating_canvas",
                message: "Error Creating Canvas, Plase Contact Administrator",
                type: "error",
            })
        }

        dispatch({
            type: "initialize_canvas",
            payload: {
                canvas,
            },
        })

        sceneRef.current = scene
    }, [])

    const handleCreateNode = (options: ICreateNodeOptions) => {
        sceneRef.current?.create_node(options)
    }

    useEffect(() => {
        if (sceneRef.current) return

        initializeScene()
    })

    const imageRef = useRef<HTMLImageElement>(null)

    const rescaleCanvas = () => {
        if (!imageRef.current || !state.scene.canvas) return

        const canvasWidth = state.scene.canvas.getWidth()

        const clientWidth = imageRef.current?.offsetWidth
        const clientHeight = imageRef.current?.offsetHeight

        const scaleFactor = clientWidth / canvasWidth

        var renderedObjects = state.scene.canvas.getObjects()

        renderedObjects.forEach((obj) => {
            if (!obj.scaleX || !obj.scaleY || !obj.top || !obj.left) return
            const originalLeft = obj.left
            const originalTop = obj.top

            obj.scaleX *= scaleFactor
            obj.scaleY *= scaleFactor

            obj.left = originalLeft * scaleFactor
            obj.top = originalTop * scaleFactor
            obj.setCoords()
        })

        state.scene.canvas.setWidth(clientWidth)
        state.scene.canvas.setHeight(clientHeight)
        state.scene.canvas.renderAll()
    }

    // Setting the Screen Size State whenever the screen is resized
    useEffect(() => {
        const handleResize = () => rescaleCanvas()

        window.addEventListener("resize", rescaleCanvas)

        handleResize()
        return () => window.removeEventListener("resize", handleResize)
    }, [imageRef.current])

    const saves = () => {
        const objects = state.scene.canvas?.getObjects()

        if (!objects || !state.scene.canvas || !imageRef.current) return

        const canvasWidth = state.scene.canvas.getWidth()

        const clientWidth = imageRef.current?.offsetWidth

        const scaleFactor = clientWidth / canvasWidth

        convert_fabric_objects_to_nodes({
            canvasHeight: state.scene.canvas.getHeight(),
            canvasWidth: state.scene.canvas.getWidth(),
            objects,
            scaleFactor,
        })
        // Get all objects on the page
        // Get the properties needed from them
        // Send it to the api
        // Clear the scene, canvas, etc
        // Take them back to home page
    }

    return (
        <div>
            <div className="relative border border-purple-700">
                <NextImage
                    width={300}
                    height={300}
                    ref={imageRef}
                    src={editorBackground ?? ""}
                    alt="Frame Background"
                    className="h-full w-full"
                />
                <div className="absolute left-0 top-0">
                    <canvas id="frame_editor" />
                </div>
            </div>
<button onClick={() => saves()}>save</button>
            {state.scene.canvas && <Toolbar create_node={handleCreateNode} />}
        </div>
    )
}
