/* eslint-disable no-param-reassign */
import { IProgram, IProgramNode } from "@/services/programs/program.interface"
import { createSlice } from "@reduxjs/toolkit"

const dummyprograms = [
    {
        id: "b6834400-d1f6-11ee-a164-ad0737a3791c",
        createdBy: "622c4d4e-3786-4c19-b790-29e4c8c67463",
        name: "Hatchdev",
        startDate: "2024-07-28",
        endDate: "2024-08-29",
        isCompleted: false,
        profileFrameSecureUrl: null,
        profileFramePublicId: null,
        profileFrameHeight: null,
        profileFrameWidth: null,
        profileGenerationAvailable: false,
        certificateFrameSecureUrl: null,
        certificateFramePublicId: null,
        certificateFrameHeight: null,
        certificateFrameWidth: null,
        certificateGenerationAvailable: false,
    },
]

interface IInitialState {
    allPrograms: IProgram[]
    selectedProgram: {
        program: IProgram
        programNodes: IProgramNode[]
    } | null
}

const initialStateValue: IInitialState = {
    allPrograms: dummyprograms,
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
