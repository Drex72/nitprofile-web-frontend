import { ICanvasOptions } from "fabric/fabric-impl"
import { fabric } from "fabric"
import { ICreateNodeOptions, PlaceholderKeys } from "./Interface"
import { DEFAULT_CANVAS_VALUES, DEFAULT_IMAGE_NODE_VALUES, DEFAULT_TEXT_NODE_VALUES } from "../utils/defaultSizes"

type ICreateSceneOptions = {
    canvas_id: string
    options: ICanvasOptions
}

export class Scene {
    private canvas: fabric.Canvas | null = null

    private defaultCanvasSize = DEFAULT_CANVAS_VALUES

    constructor(private readonly sceneOptions: ICreateSceneOptions) {
        const { canvas_id, options } = this.sceneOptions

        this.canvas = new fabric.Canvas(canvas_id, options)

        this.canvas.on("object:moving", (e) => {
            var obj = e.target

            if (!obj || !obj.canvas || !obj.top || !obj.left) return

            const { height = this.defaultCanvasSize.height, width = this.defaultCanvasSize.width } = obj.canvas

            // if object is too big ignore
            if (obj.getScaledHeight() > height || obj.getScaledWidth() > width) {
                return
            }

            obj.setCoords()

            var boundingRect = obj.getBoundingRect()

            if (boundingRect.top < 0 || boundingRect.left < 0) {
                obj.top = Math.max(obj.top, obj.top - boundingRect.top)
                obj.left = Math.max(obj.left, obj.left - boundingRect.left)
            }

            if (boundingRect.top + boundingRect.height > height || boundingRect.left + boundingRect.width > width) {
                obj.top = Math.min(obj.top, height - boundingRect.height + obj.top - boundingRect.top)
                obj.left = Math.min(obj.left, width - boundingRect.width + obj.left - boundingRect.left)
            }
        })
    }
    get_canvas = () => {
        return this.canvas
    }

    create_node(options: ICreateNodeOptions) {
        if (!this.canvas) throw new Error("Canvas Does not Exist")

        if (options.nodeType === "image") {
            const imageNode = this.createImageObject()

            this.canvas.add(imageNode)

            return this.canvas.setActiveObject(imageNode)
        }

        if (options.nodeType === "text") {
            const textNode = this.createTextObject()

            this.canvas.add(textNode)

            return this.canvas.setActiveObject(textNode)
        }

        if (options.nodeType === "placeholder") {
            const textNode = this.createTextObject({
                entity: options.entity,
                entityKey: options.entityKey,
            })

            this.canvas.add(textNode)

            return this.canvas.setActiveObject(textNode)
        }

        throw new Error("Invalid node type")
    }

    private createImageObject(): fabric.Circle {
        const createdFabricNode = new fabric.Circle({
            left: DEFAULT_IMAGE_NODE_VALUES.x,
            top: DEFAULT_IMAGE_NODE_VALUES.y,
            fill: "#aaa",
            radius: DEFAULT_IMAGE_NODE_VALUES.radius,
            opacity: 1,
            stroke: "#000",
            strokeWidth: 1,
        })

        return createdFabricNode
    }

    private createTextObject(placeholder?: PlaceholderKeys): fabric.Text {
        const isPlaceholder = placeholder && placeholder.entity

        const createdFabricNode = new fabric.IText(DEFAULT_TEXT_NODE_VALUES.text, {
            fontFamily: DEFAULT_TEXT_NODE_VALUES.font_family,
            left: DEFAULT_TEXT_NODE_VALUES.x,
            top: DEFAULT_TEXT_NODE_VALUES.y,
            fontSize: DEFAULT_TEXT_NODE_VALUES.font_size,
            fontWeight: DEFAULT_TEXT_NODE_VALUES.font_weight,
            fill: DEFAULT_TEXT_NODE_VALUES.color,
            opacity: 1,
            stroke: DEFAULT_TEXT_NODE_VALUES.color,
            editable: !isPlaceholder,
        })

        if (isPlaceholder) {
            createdFabricNode.toObject = () => {
                return {
                    placeholder: true,
                    entity: placeholder.entity,
                    entityKey: placeholder.entityKey ?? undefined,
                }
            }

            // createdFabricNode.toObject = function (this: fabric.IText, propertiesToInclude) {
            //     return fabric.util.object.extend(fabric.IText.prototype.toObject.call(this, propertiesToInclude), {
            //         placeholder: true,
            //         entity: placeholder.entity,
            //         entityKey: placeholder.entityKey ?? undefined,
            //     })
            // }
        }

        return createdFabricNode
    }
}
