import React from "react"

const DrawingBoard = () => {
    return <canvas>DrawingBoard</canvas>
}

export const MemoizedDrawingBoard = React.memo(DrawingBoard)
