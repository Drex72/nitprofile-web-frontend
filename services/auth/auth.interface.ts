export interface ILoginRequest {
    email: string
    password: string
}

export interface IEmailOnlyRequest {
    email: string
}

export interface IResetPasswordRequest {
    resetToken: string
    password: string
}

export interface IAcceptAdminInvitationRequest {
    resetToken: string
    firstName: string
    lastName: string
}


export interface IVerifyAccountRequest {
    token: string
    password: string
}