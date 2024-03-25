import { authService } from "../auth.service"
import { IEmailOnlyRequest } from "../auth.interface"
import { useApi } from "@/hooks/useApi"
import { IApiHookBaseResponse, IBaseApiResponse } from "@/services/types"
import { makeToast } from "@/libs/react-toast"

export const useForgotPasswordApi: () => IApiHookBaseResponse<IEmailOnlyRequest> = () => {
    const forgotPasswordRequest = useApi<IBaseApiResponse, IEmailOnlyRequest>((data: IEmailOnlyRequest) => {
        return authService.forgot_password(data)
    })

    const handleForgotPassword = async (data: IEmailOnlyRequest) => {
        forgotPasswordRequest.reset()

        const response = await forgotPasswordRequest.request(data)

        if (!response) {
            makeToast({ message: "No Response", type: "error", id: "forgot-password-error", duration: 5000 })

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
        handler: handleForgotPassword,
        data: forgotPasswordRequest.data,
        error: forgotPasswordRequest.error,
        loading: forgotPasswordRequest.loading,
    }
}
