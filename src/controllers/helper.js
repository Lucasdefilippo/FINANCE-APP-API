export const Ok = (body) => {
    return {
        statusCode: 200,
        body,
    }
}

export const created = (body) => {
    return {
        statusCode: 201,
        body,
    }
}

export const badRequest = (ErrorMessage) => {
    return {
        statusCode: 400,
        body: {
            ErrorMessage,
        },
    }
}

export const notFound = (body) => {
    return {
        statusCode: 404,
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
