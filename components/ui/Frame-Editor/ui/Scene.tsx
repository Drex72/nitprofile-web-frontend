import React, { useCallback, useEffect, useRef, useState } from "react"
import { ICreateNodeOptions, Scene } from "../logic"
import { useSceneContext } from "./hooks"
import { makeToast } from "@/libs/react-toast"
import { Toolbar } from "@frame-editor/ui/components/Toolbar"
import NextImage from "next/image"
import { useAppSelector } from "@/state_management"

export const FrameEditor = () => {
    const sceneRef = useRef<Scene | null>(null)

    const { dispatch, state } = useSceneContext()

    const {isMobile} = useAppSelector((state) => state.appSlice)

    console.log(isMobile)

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

    const save = () => {
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
                    src={state.scene.sceneBackground ?? ""}
                    alt="Frame Background"
                    className="h-full w-full"
                />
                <div className="absolute left-0 top-0">
                    <canvas id="frame_editor" />
                </div>
            </div>

            {state.scene.canvas && <Toolbar create_node={handleCreateNode} />}
        </div>
    )
}
