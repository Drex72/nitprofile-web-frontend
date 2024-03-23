import { IUser } from "../auth/auth.interface"

export interface IProgram {
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

export interface ICreateProgramPayload {
    name: string
    startDate: string
    endDate: string
}

export interface IProgramUser extends IUser {
    user_programs: {
        id: string
        userId: string
        programId: string
        completedTraining: boolean
        profileImageUrl: string | null
        profileGenerationDate: Date | null
        certificateImageUrl: string | null
        certificateGenerationDate: Date | null
    }[]
}

export interface IRegisterSingleUserForProgram {
    user: {
        email: string
        firstName: string
        lastName: string
    }
}

export interface IAdminAssignedToProgram extends IUser {
    admins_assigned_programs: {
        id: string
        userId: string
        programId: string
    }[]
}

export interface IAssignAdminToProgramPayload {
    adminId: string
    payloadid: string
}