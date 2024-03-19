/* eslint-disable no-param-reassign */
import { Node } from "@/components/ui/Frame-Editor/logic"
import { createSlice } from "@reduxjs/toolkit"

interface IInitialState {
    editorBackground: string | null

    saved:
        | false
        | {
              items: Node[]
              loading: boolean
              isSuccess: boolean
          }
}

const initialStateValue: IInitialState = {
    editorBackground:
        "https://res.cloudinary.com/dinrq1kf4/image/upload/c_fill,g_center,h_1500,w_1500/c_fit,h_500,l_Nithub:NITPROFILE_ASSETS:IMAGE%2022-8769646304,r_10000,w_500,x_20,y_20/co_red,l_text:Cookie_10_bold:Teledua,x_40,y_40/v1/Nithub/nitprofile_profile_frames/FRAME%20119-5069537755",
    saved: false,
    
}

export const frameEditorReduxSlice = createSlice({
    name: "FrameEditor",
    initialState: initialStateValue,
    reducers: {
        setEditorBackground: (
            state,
            action: {
                payload: string
            },
        ) => {
            state.editorBackground = action.payload
        },

        saveEditorCustomizations: (state, action: { payload: Node[] }) => {
            // state.saved = { ...state.saved, items: action.payload }
        },

        resetEditorCustomizations: (state) => {
            state.saved = false
        },
    },
})

export const frameEditorSlice = {
    reducer: frameEditorReduxSlice.reducer,
    actions: frameEditorReduxSlice.actions,
}
