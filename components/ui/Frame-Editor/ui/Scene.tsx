import React, { useEffect, useRef } from "react"
import { ICreateNodeOptions, Scene } from "../logic"
import { useSceneContext } from "./hooks"
import { makeToast } from "@/libs/react-toast"
import { Toolbar } from "@frame-editor/ui/components/Toolbar"

export const FrameEditor = () => {
    const sceneRef = useRef<Scene | null>(null)

    const { dispatch, state } = useSceneContext()

    const initializeScene = () => {
        const scene = new Scene({
            canvas_id: "frame_editor",
            options: {
                selection: false,
                width: 600,
                height: 300,
                backgroundColor: "red",
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
    }

    const handleCreateNode = (options: ICreateNodeOptions) => {
        sceneRef.current?.create_node(options)
    }

    useEffect(() => {
        if (sceneRef.current) return

        initializeScene()
    })

    return (
        <div>
            <canvas id="frame_editor" />

            {state.scene.canvas && <Toolbar create_node={handleCreateNode} />}
        </div>
    )
}
