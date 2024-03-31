import { IProgramNode } from "@/services/programs/program.interface"
import { fabric } from "fabric"
import { Node } from "."

interface IOptions {
    objects: fabric.Object[]
    scaleFactor: number
    canvasHeight: number
    canvasWidth: number
}
const convert_fabric_objects_to_nodes = (options: IOptions): Node[] => {
    const { canvasHeight, canvasWidth, objects, scaleFactor } = options

    const result: Node[] = []

    objects.forEach((item) => {
        if (item.type === "circle") {
            const newObj = item as fabric.Circle

            const finalRadius = newObj.radius! * scaleFactor

            const scaledLeft = newObj.left! * scaleFactor

            const scaledTop = newObj.top! * scaleFactor

            const { gravity, x, y } = get_gravity_and_offsets(scaledLeft, scaledTop, canvasWidth, canvasHeight)

            console.log(x,y)

            result.push({
                type: "image",
                x,
                y,
                width: finalRadius,
                height: finalRadius,
                gravity,
                radius: 100,
                crop: "fit",
            })
        }

        if ((item.type = "i-text")) {
            const newObj = item as fabric.IText

            const scaledLeft = newObj.left! * scaleFactor

            const scaledTop = newObj.top! * scaleFactor

            const { gravity, x, y } = get_gravity_and_offsets(scaledLeft, scaledTop, canvasWidth, canvasHeight)

            const metadata = newObj.toObject()

            const test = {
                type: "text",
                x,
                y,
                gravity,
                text: newObj.text ?? "",
                font_family: (newObj.fontFamily as string) ?? "Helvetica",
                font_size: newObj.fontSize,
                font_weight: (newObj.fontWeight as string) ?? "bold",
                color: newObj.fill as string,
                placeholder: metadata?.placeholder ?? false,
                entity: metadata?.entity ?? undefined,
                entity_key: metadata?.entityKey ?? undefined,
            }

            if (!test.placeholder) {
                delete test.entity_key
                delete test.entity
                delete test.placeholder
            }

            result.push(test as any)
        }
    })

    return result
}

const get_gravity_and_offsets = (x: number, y: number, canvasWidth: number, canvasHeight: number) => {
    // Determine the quadrant the item lies in
    const quadrant = {
        x: x >= canvasWidth / 2 ? "east" : "west",
        y: y >= canvasHeight / 2 ? "south" : "north",
    }

    // Calculate the gravity direction
    const gravity = `${quadrant.y}_${quadrant.x}`

    // // Calculate the offsets
    const offsetX = Math.abs(x)
    const offsetY = Math.abs(y)

    return {
        gravity: gravity,
        y: Math.round(offsetY),
        x: Math.round(offsetX),
    }
}

const reverse_gravity_and_offsets = (
    gravity: string,
    offsetX: number,
    offsetY: number,
    canvasWidth: number,
    canvasHeight: number,
) => {
    // Extract quadrant information from gravity
    const gravityParts = gravity?.split("_")
    const yQuadrant = gravityParts[0]
    const xQuadrant = gravityParts[1]

    // Determine x and y coordinates based on quadrant and offsets
    let x, y
    if (xQuadrant === "east") {
        x = offsetX
    } else {
        x = -offsetX
    }

    if (yQuadrant === "south") {
        y = offsetY
    } else {
        y = -offsetY
    }

    // Adjust x and y coordinates if canvas size is provided
    if (canvasWidth !== undefined && canvasHeight !== undefined) {
        x += canvasWidth / 2
        y += canvasHeight / 2
    }

    return { x, y }
}

interface IConvertNodeToObjectOptions {
    node: IProgramNode
    canvasHeight: number
    canvasWidth: number
}

const convert_node_to_fabric_object = (options: IConvertNodeToObjectOptions): fabric.Object | undefined => {
    const { canvasHeight, canvasWidth, node } = options

    const { x, y } = reverse_gravity_and_offsets(node.gravity, node.x, node.y, canvasWidth, canvasHeight)

    if (node.type === "image") {
        if (node.overlay) {
            return new fabric.Image(node.overlay, {})
        }

        return new fabric.Circle({
            left: x,
            top: y,
            fill: "#aaa",
            radius: node.width,
            opacity: 1,
            stroke: "#000",
            strokeWidth: 1,
        })
    }

    // if (node.type === "text") {

    //     const text = () => {
    //         if(node.placeholder) {
    //             return ""
    //         }

    //         return node.text!
    //     }
    //     const textNode = new fabric.IText(text(), {
    //         fontFamily: node.font_family ?? "Cambria",
    //         left: x,
    //         top: y,
    //         fontSize: parseInt(node.font_size ?? "13"),
    //         fontWeight: node.font_weight ?? "bold",
    //         fill: node.color ?? "#000",
    //         opacity: 1,
    //         editable: !node.placeholder,
    //     })

    //     if (node.placeholder) {
    //         textNode.toObject = () => {
    //             return {
    //                 placeholder: true,
    //                 entity: node.entity,
    //                 entityKey: node?.entity_key ?? undefined,
    //             }
    //         }
    //     }

    //     return textNode
    // }
}

export { convert_fabric_objects_to_nodes, convert_node_to_fabric_object }
