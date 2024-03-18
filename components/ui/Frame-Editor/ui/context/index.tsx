import React, { createContext, useReducer, Dispatch } from "react"
import { SceneActions, sceneReducer } from "./reducers/sceneReducers"
import { Canvas, Object } from "fabric/fabric-impl"

export interface ISceneState {
    canvas: Canvas | null
    selectedItem: Object | null
    sceneBackground: string | null
}

// Define the initial state type
export type InitialStateType = {
    scene: ISceneState
}

type IMainReducer<T> = {
    [key in keyof T]: T[key]
}

// Define the initial state
const initialState: InitialStateType = {
    scene: {
        canvas: null,
        selectedItem: null,
        sceneBackground:
            "https://res.cloudinary.com/dinrq1kf4/image/upload/c_fill,g_center,h_1500,w_1500/c_fit,h_500,l_Nithub:NITPROFILE_ASSETS:IMAGE%2022-8769646304,r_10000,w_500,x_20,y_20/co_red,l_text:Cookie_10_bold:Teledua,x_40,y_40/v1/Nithub/nitprofile_profile_frames/FRAME%20119-5069537755",
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

const mainReducer = ({ scene }: InitialStateType, action: SceneActions): IMainReducer<InitialStateType> => ({
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
