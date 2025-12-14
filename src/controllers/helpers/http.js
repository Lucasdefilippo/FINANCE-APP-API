export const Ok = (body) => ({
    statusCode: 200,
    body,
})

export const created = (body) => ({ statusCode: 201, body })

export const badRequest = (ErrorMessage) => ({
    statusCode: 400,
    body: {
        ErrorMessage,
    },
})

export const notFound = (body) => ({
    statusCode: 404,
    body,
})

export const errorServer = () => ({
    statusCode: 500,
    body: {
        Message: 'Internal server error',
    },
})
