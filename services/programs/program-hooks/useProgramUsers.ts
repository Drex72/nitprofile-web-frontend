import { useApi } from "@/hooks/useApi"
import { IApiHookBaseResponse, IBaseApiResponse } from "@/services/types"
import { IProgram, IProgramNode, IProgramUser, IRegisterSingleUserForProgram } from "../program.interface"
import { programService } from "../program.service"

interface IGetProgramNodes {
    category: "profile" | "certificate"
    programId: string
}

export const useGetProgramUsers: () => IApiHookBaseResponse<string, IProgramUser[]> = () => {
    const getProgramUsersRequest = useApi<IBaseApiResponse<IProgramUser[]>, string>((programId: string) => {
        return programService.getProgramRegisteredUsers(programId)
    })

    const handleGetProgramUsers = async (programId: string) => {
        getProgramUsersRequest.reset()

        return (await getProgramUsersRequest.request(programId)) as IBaseApiResponse<IProgramUser[]>
    }

    return {
        handler: handleGetProgramUsers,
        data: getProgramUsersRequest.data,
        error: getProgramUsersRequest.error,
        loading: getProgramUsersRequest.loading,
    }
}

interface ICreateProgramUserPaylaod {
    programid: string
    data: IRegisterSingleUserForProgram
}

export const useCreateProgramUserApi: () => IApiHookBaseResponse<ICreateProgramUserPaylaod, IProgramUser> = () => {
    const createProgramUserRequest = useApi<IBaseApiResponse<IProgramUser>, ICreateProgramUserPaylaod>(
        (payload: ICreateProgramUserPaylaod) => {
            return programService.registerSingleUserForProgram(payload.programid, payload.data)
        },
    )

    const handleCreateProgramUser = async (payload: ICreateProgramUserPaylaod) => {
        createProgramUserRequest.reset()

        return (await createProgramUserRequest.request(payload)) as IBaseApiResponse<IProgramUser>
    }

    return {
        handler: handleCreateProgramUser,
        data: createProgramUserRequest.data,
        error: createProgramUserRequest.error,
        loading: createProgramUserRequest.loading,
    }
}

export const useAddProgramUsers: () => IApiHookBaseResponse<IGetProgramNodes, IProgramNode[]> = () => {
    const getProgramNodesRequest = useApi<IBaseApiResponse<IProgramNode[]>, IGetProgramNodes>(
        (payload: IGetProgramNodes) => {
            return programService.getProgramNodes(payload.programId, payload.category)
        },
    )

    const handleGetProgramNodes = async (payload: IGetProgramNodes) => {
        getProgramNodesRequest.reset()

        return (await getProgramNodesRequest.request(payload)) as IBaseApiResponse<IProgramNode[]>
    }

    return {
        handler: handleGetProgramNodes,
        data: getProgramNodesRequest.data,
        error: getProgramNodesRequest.error,
        loading: getProgramNodesRequest.loading,
    }
}


interface ICreateProgramUsersPayload {
    data: FormData
    programId: string
}

export const useCreateProgramUsers: () => IApiHookBaseResponse<ICreateProgramUsersPayload, IProgramUser[]> = () => {
    const createProgramUsersRequest = useApi<IBaseApiResponse<IProgramUser[]>, ICreateProgramUsersPayload>(
        (payload: ICreateProgramUsersPayload) => {
            return programService.registerBulkUsersForProgram(payload.programId, payload.data)
        },
    )

    const handleCreateBulkUsers = async (payload: ICreateProgramUsersPayload) => {
        createProgramUsersRequest.reset()

        return (await createProgramUsersRequest.request(payload)) as IBaseApiResponse<IProgramUser[]>
    }

    return {
        handler: handleCreateBulkUsers,
        data: createProgramUsersRequest.data,
        error: createProgramUsersRequest.error,
        loading: createProgramUsersRequest.loading,
    }
}
