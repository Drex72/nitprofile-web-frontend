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

            result.push({
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
            })
        }
    })

    console.log(result)

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
        y: offsetY,
        x: offsetX,
    }
}
const convert_node_to_fabric_object = () => {}

export { convert_fabric_objects_to_nodes, convert_node_to_fabric_object }
