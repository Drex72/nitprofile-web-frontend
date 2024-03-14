import { ICreateNodeOptions, Node, ImageNode, TextNode, IPlaceholderTextNodeEntity } from "./interfaces/node.interface"
import uuid from "uuid"

export class NodeFactory {
    constructor(
        private readonly scene_boundary: number,
        private readonly node_list: Node[] = [],
    ) {}

    create_node(options: ICreateNodeOptions) {
        let node: Node | null = null

        if (options.nodeType === "image") node = this.create_new_image_node()

        if (options.nodeType === "text") node = this.create_new_text_node()

        if (options.nodeType === "placeholder") {
            node = this.create_new_placeholder_node(options.entity, options.entityKey)
        }

        if (!node) throw new Error("Invalid node type")

        this.node_list.push(node)

        return node
    }

    private create_new_image_node(): ImageNode {
        const image_id = uuid.v4()

        const { x, y } = this.calculate_x_y_based_on_boundary()

        return {
            id: image_id,
            type: "image",
            height: 100,
            width: 100,
            radius: 40,
            crop: "",
            gravity: "",
            overlay: "",
            x,
            y,
        }
    }

    private create_new_text_node(): TextNode {
        const text_id = uuid.v4()

        const { x, y } = this.calculate_x_y_based_on_boundary()

        return {
            id: text_id,
            type: "text",
            x,
            y,
            text: "",
            font_family: "Cambria",
            font_size: 24,
            font_weight: "bold",
            color: "black",
        }
    }

    private create_new_placeholder_node(entity: IPlaceholderTextNodeEntity, entity_key: string = ""): TextNode {
        const text_id = uuid.v4()

        const { x, y } = this.calculate_x_y_based_on_boundary()

        return {
            id: text_id,
            type: "text",
            x,
            y,
            text: "",
            font_family: "Cambria",
            font_size: 24,
            font_weight: "bold",
            color: "black",
            placeholder: true,
            entity,
            entity_key,
        }
    }

    private calculate_x_y_based_on_boundary() {
        return { x: 0, y: 0 }
    }
}
