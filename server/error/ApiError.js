class ApiError extends Error{
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    static badRequest(message) {
        return new ApiError(400, message)
    }

    static unauthorized(message) {
        return new ApiError(401, message)
    }

    static paymentRequired(message) {
        return new ApiError(402, message)
    }

    static forbidden(message) {
        return new ApiError(403, message)
    }

    static notFound(message) {
        return new ApiError(404, message)
    }

    static methodNotAllowed(message) {
        return new ApiError(405, message)
    }

    static internal(message) {
        return new ApiError(500, message)
    }

    static notImplimented(message) {
        return new ApiError(501, message)
    }

    static badGateway(message) {
        return new ApiError(502, message)
    }

    static serviceUnavailable(message) {
        return new ApiError(503, message)
    }

    static gatewayTimeout(message) {
        return new ApiError(504, message)
    }

}

export default new ApiError()