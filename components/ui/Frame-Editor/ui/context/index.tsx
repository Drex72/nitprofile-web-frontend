import React, { createContext, useReducer, Dispatch } from "react"
import { SceneActions, sceneReducer } from "./reducers/sceneReducers"
import { Canvas, Object } from "fabric/fabric-impl"

// TODO: Write A combine Reducers Function to merge all reducers into one
export interface ISceneState {
    canvas: Canvas | null
    selectedItem: Object | null
}

// Define the initial state type
export type InitialStateType = {
    scene: ISceneState
}

// Define the initial state
const initialState: InitialStateType = {
    scene: {
        canvas: null,
        selectedItem: null,
    },
}

// Create a context to hold the state and dispatch function
const SceneContext = createContext<{
    state: InitialStateType
    dispatch: Dispatch<SceneActions>
}>({
    state: initialState,
    dispatch: () => null,
})

const mainReducer = ({ scene }: InitialStateType, action: SceneActions) => ({
    scene: sceneReducer(scene, action),
})
// Define props for the SceneProvider component
interface IAppProviderProps {
    children: React.ReactNode
}

// Component to provide the scene context to its children
const SceneProvider = ({ children }: IAppProviderProps) => {
    // Use reducer hook to manage state using the sceneReducer
    const [state, dispatch] = useReducer(mainReducer, initialState)

    // Provide the state and dispatch function to children via context
    return <SceneContext.Provider value={{ state, dispatch }}>{children}</SceneContext.Provider>
}

export { SceneProvider, SceneContext }
