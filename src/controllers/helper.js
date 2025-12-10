export const badRequest = (ErrorMessage) => {
    return {
        statusCode: 400,
        body: {
            ErrorMessage,
        },
    }
}

export const created = (body) => {
    return {
        statusCode: 201,
        body,
    }
}

export const errorServer = () => {
    return {
        statusCode: 500,
        body: {
            Message: 'Internal server error',
        },
    }
}
