const placeholderTextNodeEntity = ["program", "date", "user"] as const

type IPlaceholderTextNodeEntity = (typeof placeholderTextNodeEntity)[number]

interface INode {
    x: number
    y: number
}

interface IImageNode extends INode {
    type: "image"
    overlay?: string
    width: number
    height: number
    gravity: string
    radius: number
    crop: string
}

interface INonPlaceholderTextNode extends INode {
    type: "text"
    text: string
    font_family: string
    font_size?: number
    font_weight?: string
    color?: string
    placeholder?: false
}

interface IPlaceholderTextNode extends INode {
    type: "text"
    text: string
    font_family: string
    font_size?: number
    font_weight?: string
    color?: string
    placeholder?: true
    entity: IPlaceholderTextNodeEntity
    entity_key?: string
}

type ITextNode = INonPlaceholderTextNode | IPlaceholderTextNode

type Node = IImageNode | ITextNode

type PlaceholderKeys = {
    entity: IPlaceholderTextNodeEntity
    entityKey?: string
}

type ICreateNodeOptions =
    | {
          nodeType: "image" | "text"
      }
    | {
          nodeType: "placeholder"
          entity: IPlaceholderTextNodeEntity
          entityKey: string
      }

interface INodeFactory<T = undefined> {
    fabricNode: T
}

export type {
    ITextNode,
    IImageNode,
    Node,
    ICreateNodeOptions,
    IPlaceholderTextNodeEntity,
    INodeFactory,
    PlaceholderKeys,
}
