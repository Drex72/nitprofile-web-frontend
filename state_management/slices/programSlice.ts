/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit"

interface IProgram {
    id: string
    name: string
    startDate: string
    endDate: string
    isCompleted: boolean
    profileFrameSecureUrl: string | null
    profileFramePublicId: string | null
    profileFrameHeight: string | null
    profileFrameWidth: string | null
    profileGenerationAvailable: boolean
    certificateFrameSecureUrl: string | null
    certificateFramePublicId: string | null
    certificateFrameHeight: string | null
    certificateFrameWidth: string | null
    certificateGenerationAvailable: boolean
}

interface IProgramNode {
    id: string
    placeholder: boolean
    type: "image" | "text"
    x: number
    y: number
    width: number
    height: number
    gravity: string
    radius: number
    crop: string
    programId: string
    overlay: string | null
    text: string | null
    font_family: string | null
    font_size: string | null
    font_weight: string | null
    color: string | null
    entity: string | null
    entity_key: string | null
}

interface IInitialState {
    allPrograms: IProgram[]
    selectedProgram: {
        program: IProgram
        programNodes: IProgramNode[]
    } | null
}

const initialStateValue: IInitialState = {
    allPrograms: [],
    selectedProgram: null,
}

export const programReduxSlice = createSlice({
    name: "Programs",
    initialState: initialStateValue,
    reducers: {
        initialize: (
            state,
            action: {
                payload: IProgram[]
            },
        ) => {
            state.allPrograms = action.payload
        },

        setSelectedProgram: (
            state,
            action: {
                payload: IProgram
            },
        ) => {
            localStorage.setItem("selected_program_id", action.payload.id)

            state.selectedProgram = {
                program: action.payload,
                programNodes: [],
            }
        },

        setProgramNodes: (
            state,
            action: {
                payload: IProgramNode[]
            },
        ) => {
            if (!state.selectedProgram) return

            state.selectedProgram = {
                ...state.selectedProgram,
                programNodes: action.payload,
            }
        },

        addProgram: (
            state,
            action: {
                payload: IProgram
            },
        ) => {
            state.allPrograms = [...state.allPrograms, action.payload]
        },

        clearPrograms: (state) => {
            state.allPrograms = []
            state.selectedProgram = null
        },
    },
})

export const programSlice = {
    reducer: programReduxSlice.reducer,
    actions: programReduxSlice.actions,
}
