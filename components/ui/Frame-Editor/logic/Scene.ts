import { ICanvasOptions } from "fabric/fabric-impl"
import { fabric } from "fabric"
import { ImageNode, TextNode } from "./nodes"
import { ICreateNodeOptions } from "./Interface"
import { DEFAULT_CANVAS_VALUES } from "../utils/defaultSizes"

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

    create_node(options: ICreateNodeOptions) {
        if (!this.canvas) throw new Error("Canvas Does not Exist")

        if (options.nodeType === "image") {
            const { fabricNode: imageNode } = new ImageNode()

            this.canvas.add(imageNode)

            return this.canvas.setActiveObject(imageNode)
        }

        if (options.nodeType === "text") {
            const { fabricNode: textNode } = new TextNode()

            this.canvas.add(textNode)

            return this.canvas.setActiveObject(textNode)
        }

        if (options.nodeType === "placeholder") {
            const { fabricNode: textNode } = new TextNode({
                entity: options.entity,
                entityKey: options.entityKey,
            })

            this.canvas.add(textNode)

            return this.canvas.setActiveObject(textNode)
        }

        throw new Error("Invalid node type")
    }

    get_canvas = () => {
        return this.canvas
    }
}
