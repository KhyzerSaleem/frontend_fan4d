
declare type SuccessfulResponse<T> = {
    message: string,
    status: 200 | 201 | 204,
    data : T
} 

declare type ErrorResponse = {
    status: Exclude<number , SuccessfulResponse<unknown>["status"]> ,
    message: string ,
}

declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse