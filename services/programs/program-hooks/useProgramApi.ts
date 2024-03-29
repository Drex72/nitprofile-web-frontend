import { useApi } from "@/hooks/useApi"
import { IApiHookBaseResponse, IBaseApiResponse } from "@/services/types"
import { ICreateProgramPayload, IProgram, IProgramMetrics } from "../program.interface"
import { programService } from "../program.service"

export const useCreateProgramApi: () => IApiHookBaseResponse<ICreateProgramPayload, IProgram> = () => {
    const createProgramRequest = useApi<IBaseApiResponse<IProgram>, ICreateProgramPayload>((payload: ICreateProgramPayload) => {
        return programService.createProgram(payload)
    })

    const handleCreateProgram = async (payload: ICreateProgramPayload) => {
        createProgramRequest.reset()

        return (await createProgramRequest.request(payload)) as IBaseApiResponse<IProgram>
    }

    return {
        handler: handleCreateProgram,
        data: createProgramRequest.data,
        error: createProgramRequest.error,
        loading: createProgramRequest.loading,
    }
}

export const useGetProgramsApi: () => IApiHookBaseResponse<undefined, IProgram[]> = () => {
    const getProgramsRequest = useApi<IBaseApiResponse<IProgram[]>, undefined>(() => {
        return programService.getAllPrograms()
    })

    const handleGetPrograms = async () => {
        getProgramsRequest.reset()

        const response = (await getProgramsRequest.request()) as IBaseApiResponse<IProgram[]>

        return response
    }

    return {
        handler: handleGetPrograms,
        data: getProgramsRequest.data,
        error: getProgramsRequest.error,
        loading: getProgramsRequest.loading,
    }
}

export const useGetProgramApi: () => IApiHookBaseResponse<string, IProgramMetrics> = () => {
    const getProgramMetricsRequest = useApi<IBaseApiResponse<IProgramMetrics>, string>((programId: string) => {
        return programService.getProgramMetrics(programId)
    })

    const handleGetProgramMetrics = async (programId: string) => {
        getProgramMetricsRequest.reset()

        return (await getProgramMetricsRequest.request(programId)) as IBaseApiResponse<IProgramMetrics>
    }

    return {
        handler: handleGetProgramMetrics,
        data: getProgramMetricsRequest.data,
        error: getProgramMetricsRequest.error,
        loading: getProgramMetricsRequest.loading,
    }
}

export const useUpdateProgramApi: () => IApiHookBaseResponse<string, IProgramMetrics> = () => {
    const getProgramMetricsRequest = useApi<IBaseApiResponse<IProgramMetrics>, string>((programId: string) => {
        return programService.getProgramMetrics(programId)
    })

    const handleGetProgramMetrics = async (programId: string) => {
        getProgramMetricsRequest.reset()

        return (await getProgramMetricsRequest.request(programId)) as IBaseApiResponse<IProgramMetrics>
    }

    return {
        handler: handleGetProgramMetrics,
        data: getProgramMetricsRequest.data,
        error: getProgramMetricsRequest.error,
        loading: getProgramMetricsRequest.loading,
    }
}