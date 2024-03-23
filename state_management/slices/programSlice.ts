/* eslint-disable no-param-reassign */
import { IProgram, IProgramNode } from "@/services/programs/program.interface"
import { createSlice } from "@reduxjs/toolkit"

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
