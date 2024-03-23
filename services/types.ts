export interface IBaseApiResponse<T = undefined> {
    message: string
    data: T
}

export interface IApiHookBaseResponse<T = undefined, K = undefined> {
    handler: (data: T) => Promise<void>
    data: IBaseApiResponse<K> | null
    error: Error | null
    loading: boolean
}
