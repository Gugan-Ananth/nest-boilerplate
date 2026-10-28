interface ExceptionResponse {
    success: false;
    statusCode: number;
    message: string;
    errors: string[] | null;
    path: string;
    method: string;
    timestamp: string;
    requestId: string | null;
}