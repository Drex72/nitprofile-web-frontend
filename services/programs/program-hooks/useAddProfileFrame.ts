import { useApi } from "@/hooks/useApi"
import { IApiHookBaseResponse, IBaseApiResponse } from "@/services/types"
import { IProgram } from "../program.interface"
import { programService } from "../program.service"

interface IAddProfileFramePayload {
    data: FormData
    programId: string
}

export const useAddProfileFrame: () => IApiHookBaseResponse<IAddProfileFramePayload, IProgram> = () => {
    const addProfileFrameRequest = useApi<IBaseApiResponse<IProgram>, IAddProfileFramePayload>(
        (payload: IAddProfileFramePayload) => {
            return programService.uploadProfileFrame(payload.programId, payload.data)
        },
    )

    const handleUploadProfileFrame = async (payload: IAddProfileFramePayload) => {
        addProfileFrameRequest.reset()

        return (await addProfileFrameRequest.request(payload)) as IBaseApiResponse<IProgram>
    }

    return {
        handler: handleUploadProfileFrame,
        data: addProfileFrameRequest.data,
        error: addProfileFrameRequest.error,
        loading: addProfileFrameRequest.loading,
    }
}
