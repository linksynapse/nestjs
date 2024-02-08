export enum Auth {
    OK = 200,
    NO_RECORD = 201,
    UPDATE_ERROR = 202,
    INSERT_ERROR = 203,
    DELETE_ERROR = 204
}

export interface RT_MESSAGE {
    status: Auth,
    message: string
}