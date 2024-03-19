import { Node } from "."

class Nodes {
    convert_fabric_objects_to_nodes(objects: fabric.Object[]): Node[] {
        return []
    }

    convert_node_to_fabric_object() {}

    private convert_fabric_object_to_node(object: fabric.Object): Node {
        if (object.type === "circle") {
            const newObj = object as fabric.Circle

            return {
                type: "image",
                x: newObj.left,
                y: newObj.top,
                width: newObj.radius,
                height: newObj.radius,
                gravity: string,
                radius: 100,
                crop: "fit",
            }
        }
    }

    private calculate_gravity_x_y() {}

    private convertCoordinatesToGravity(
        x: number,
        y: number,
        canvasWidth: number,
        canvasHeight: number,
        itemWidth: number,
        itemHeight: number,
    ) {
        // Calculate the center point of the div
        const divCenterX = canvasWidth / 2
        const divCenterY = canvasHeight / 2

        // Calculate the distance from the center of the div to the circle's center
        const distanceX = x - divCenterX
        const distanceY = y - divCenterY

        // // Determine the quadrant the circle lies in
        // const quadrant = {
        //     x: distanceX >= 0 ? 'east' : 'west',
        //     y: distanceY >= 0 ? 'south' : 'north'
        // };

        // Determine the quadrant the item lies in
        const quadrant = {
            x: x >= canvasWidth / 2 ? "east" : "west",
            y: y >= canvasHeight / 2 ? "south" : "north",
        }

        // Calculate the gravity direction
        const gravity = `${quadrant.y}_${quadrant.x}`

        // Calculate the offset values
        const offsetX = Math.abs(distanceX) - itemWidth / 2
        const offsetY = Math.abs(distanceY) - itemHeight / 2

        // // Calculate the offsets
        // const offsetX = Math.abs(x)
        // const offsetY = Math.abs(y)

        return {
            gravity: gravity,
            top: offsetY,
            left: offsetX,
        }
    }
}
