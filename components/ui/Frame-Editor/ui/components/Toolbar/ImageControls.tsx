import { useState } from "react"
import { useSceneContext } from "@frame-editor/ui/hooks"
import { DEFAULT_IMAGE_NODE_VALUES } from "@frame-editor/utils"
import { makeToast } from "@/libs/react-toast"

export const ImageControls = () => {
    const { state } = useSceneContext()

    const { canvas, selectedItem } = state.scene

    const item = selectedItem as fabric.Circle

    interface IImageProperties {
        fill: string
        left: number
        top: number
        scale: number
        radius: number
        strokeWidth: number
        stroke: string
        opacity: number
    }

    const [imageProperties, setImageProperties] = useState<IImageProperties>({
        fill: item.fill?.toString() ?? "#000",
        left: item.left ?? DEFAULT_IMAGE_NODE_VALUES.x,
        top: item.top ?? DEFAULT_IMAGE_NODE_VALUES.y,
        radius: item.radius ?? DEFAULT_IMAGE_NODE_VALUES.radius,
        strokeWidth: item.strokeWidth ?? 1,
        stroke: item.stroke?.toString() ?? "1",
        opacity: item.opacity ?? 1,
        scale: item.scaleX ?? 1,
    })

    if (!canvas || !selectedItem) {
        return makeToast({
            id: "error_creating_canvas",
            message: "No Canvas or No Item Selected, Plase Contact Administrator",
            type: "error",
        })
    }

    canvas.on("object:moving", (options) => {
        const e = options

        if (!e || !e.target || !e.target.top || !e.target.left) return

        setImageProperties({
            ...imageProperties,
            left: e.target.left,
            top: e.target.top,
        })
    })

    canvas.on("object:scaling", (options) => {
        const e = options

        if (!e || !e.target || !e.target.top || !e.target.left) return

        setImageProperties({
            ...imageProperties,
            left: e.target.left,
            top: e.target.top,
        })
    })

    canvas.on("object:scaling", (options) => {
        const e = options

        if (!e || !e.target || !e.target.scaleX) return

        setImageProperties({ ...imageProperties, scale: e.target.scaleX })
    })

    const handleChangeRadius = (value: number) => {
        const activeObject = canvas.getActiveObject() as fabric.Circle

        if (!activeObject) return

        activeObject.set("radius", value)

        activeObject.set("scaleX", 1)

        activeObject.set("scaleY", 1)

        canvas.renderAll()
    }

    const handleChange = (key: keyof IImageProperties, value: number) => {
        const activeObject = canvas.getActiveObject()

        if (!activeObject) return

        activeObject.set("left", value)

        canvas.renderAll()
    }

    return (
        <div>
            <p>Redius: {imageProperties.radius * imageProperties.scale} </p>
            <p>Left: {imageProperties.left} </p>
            {/* <input type="number" onChange={(e) => handleChange(parseInt(e.target.value))} /> */}
            {/* <input type="number" onChange={(e) => handleChangeRadius(parseInt(e.target.value))} /> */}
            Image Options
            {/* Radius, Left, Top,  Opacity, Fill, Stroke, Stroke Width */}
        </div>
    )
}
