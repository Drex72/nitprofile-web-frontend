export interface IBaseApiResponse<T = undefined> {
    message: string
    data: T
}

export interface IApiHookBaseResponse<T = undefined> {
    handler: Function
    data: IBaseApiResponse<T> | null
    error: Error | null
    loading: boolean
}

