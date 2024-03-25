import { authService } from "../auth.service"
import { IEmailOnlyRequest, IResetPasswordRequest } from "../auth.interface"
import { useApi } from "@/hooks/useApi"
import { IApiHookBaseResponse, IBaseApiResponse } from "@/services/types"
import { makeToast } from "@/libs/react-toast"

export const useResetPasswordApi: () => IApiHookBaseResponse<IResetPasswordRequest> = () => {
    const resetPasswordRequest = useApi<IBaseApiResponse, IResetPasswordRequest>((data: IResetPasswordRequest) => {
        return authService.reset_password(data)
    })

    const handleResetPassword = async (data: IResetPasswordRequest) => {
        resetPasswordRequest.reset()

        const response = await resetPasswordRequest.request(data)

        if (!response) {
            makeToast({ message: "No Response", type: "error", id: "reset-password-error", duration: 5000 })

            return undefined
        }

        if (!response.data) return

        makeToast({
            message: "Mail Sent Successfully",
            type: "success",
            id: "login",
        })
    }

    return {
        handler: handleResetPassword,
        data: resetPasswordRequest.data,
        error: resetPasswordRequest.error,
        loading: resetPasswordRequest.loading,
    }
}
