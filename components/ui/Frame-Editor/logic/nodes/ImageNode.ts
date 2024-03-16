import { INodeFactory } from "../Interface"
import { fabric } from "fabric"
import { DEFAULT_IMAGE_NODE_VALUES } from "@/components/ui/Frame-Editor/utils/defaultSizes"

export class ImageNode implements INodeFactory<fabric.Circle> {
    fabricNode!: fabric.Circle

    constructor() {
        this.fabricNode = this.createFabricNode()
    }

    private createFabricNode(): fabric.Circle {
        const createdFabricNode = new fabric.Circle({
            left: DEFAULT_IMAGE_NODE_VALUES.x,
            top: DEFAULT_IMAGE_NODE_VALUES.y,
            fill: "#aaa",
            radius: DEFAULT_IMAGE_NODE_VALUES.radius,
            opacity: 1,
            stroke: "#000",
            strokeWidth: 1,
        })

        this.fabricNode = createdFabricNode

        return createdFabricNode
    }
}
