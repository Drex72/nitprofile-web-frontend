/* eslint-disable no-param-reassign */
import { IProgram, IProgramNode, IProgramUser } from "@/services/programs/program.interface"
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

    programUsers: IProgramUser[]

    selectedProgram: {
        program: IProgram
        programNodes: IProgramNode[]
    } | null
}

const initialStateValue: IInitialState = {
    allPrograms: [],
    selectedProgram: null,
    programUsers: [],
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

        setProgramUsers: (
            state,
            action: {
                payload: IProgramUser[]
            },
        ) => {
            if (!state.selectedProgram) return

            state.programUsers = action.payload
        },

        addProgramUser: (
            state,
            action: {
                payload: IProgramUser
            },
        ) => {
            state.programUsers = [...state.programUsers, action.payload]
        },

        addProgramUsers: (
            state,
            action: {
                payload: IProgramUser[]
            },
        ) => {
            state.programUsers = [...state.programUsers, ...action.payload]
        },

        addProgram: (
            state,
            action: {
                payload: IProgram
            },
        ) => {
            state.allPrograms = [...state.allPrograms, action.payload]
        },

        addProgramProfileFrame: (
            state,
            action: {
                payload: {
                    programId: string
                    profileFrameSecureUrl: string
                    profileFramePublicId: string
                    profileFrameHeight: string
                    profileFrameWidth: string
                }
            },
        ) => {
            state.allPrograms = state.allPrograms.map((program) => {
                if (program.id === action.payload.programId) {
                    program.profileFrameSecureUrl = action.payload.profileFrameSecureUrl
                    program.profileFramePublicId = action.payload.profileFramePublicId
                    program.profileFrameHeight = action.payload.profileFrameHeight
                    program.profileFrameWidth = action.payload.profileFrameWidth
                }

                return program
            })

            if (!state.selectedProgram) return

            state.selectedProgram.program.profileFrameSecureUrl = action.payload.profileFrameSecureUrl
            state.selectedProgram.program.profileFramePublicId = action.payload.profileFramePublicId
            state.selectedProgram.program.profileFrameHeight = action.payload.profileFrameHeight
            state.selectedProgram.program.profileFrameWidth = action.payload.profileFrameWidth
        },

        deleteSelectedProgram: (state) => {
            if (!state.selectedProgram) return

            const filteredPrograms = state.allPrograms.filter((item) => item.id !== state.selectedProgram?.program.id)

            state.allPrograms = filteredPrograms

            state.selectedProgram = {
                program: filteredPrograms[0],
                programNodes: [],
            }
        },

        enableProfileGeneration: (state) => {
            if (!state.selectedProgram) return

            state.selectedProgram.program.profileGenerationAvailable = true
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
