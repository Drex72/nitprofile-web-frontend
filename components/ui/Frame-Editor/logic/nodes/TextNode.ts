import { v4 as uuid } from "uuid"
import { ITextNode, INodeFactory, PlaceholderKeys } from "../Interface"
import { fabric } from "fabric"
import { DEFAULT_TEXT_NODE_VALUES } from "@/components/ui/Frame-Editor/utils/defaultSizes"

export class TextNode implements INodeFactory<fabric.Text> {
    fabricNode: fabric.Text

    constructor(private readonly placeholder: false | PlaceholderKeys = false) {
        this.fabricNode = this.createFabricNode()
    }

    private createFabricNode(): fabric.Text {
        const isPlaceholder = this.placeholder && this.placeholder.entity

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

        this.fabricNode = createdFabricNode

        return createdFabricNode
    }

    private getNodeDefaultValues = (): ITextNode => {
        const isPlaceholder = this.placeholder && this.placeholder.entity

        const base: ITextNode = {
            id: uuid(),
            type: "text",
            x: 50,
            y: 50,
            text: "Hello",
            font_family: "Cambria",
            font_size: 24,
            font_weight: "bold",
            color: "black",
        }

        if (isPlaceholder) {
            return {
                ...base,
                placeholder: true,
                text: `${this.placeholder.entity.toLocaleUpperCase()}`,
                entity: this.placeholder.entity,
                entity_key: this.placeholder.entityKey,
            }
        }

        return base
    }
}
