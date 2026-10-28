import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Request } from 'express';
import normalizeErrors from "./normalize_error";
import { EntityNotFoundError, QueryFailedError } from "typeorm";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionFilter.name);

    private resolveException(exception: unknown): {
        status: number,
        message: string,
        errors: string[] | null
    } {
        if (exception instanceof HttpException){
            const status = exception.getStatus();
            const errorResponse = exception.getResponse();

            if (typeof errorResponse === 'string'){
                return { status, message: errorResponse, errors: null };
            }
            
            if(typeof errorResponse === 'object' && errorResponse !== null){
                const responseObject = errorResponse as Record<string, unknown>;
                let message: string;
                if(typeof responseObject['message'] === 'string'){
                    message = responseObject['message'];
                }else if(Array.isArray(responseObject['message'])){
                    message = 'Validation Failed';
                }else{
                    message = 'An Error Occured';
                }
                const errors = Array.isArray(responseObject['message']) ? normalizeErrors(responseObject['message']) : normalizeErrors(responseObject['error']);
                return {status, message, errors};
            }
        } 

        if (exception instanceof EntityNotFoundError) {
            return {
                status: HttpStatus.NOT_FOUND,
                message: 'The requested resource was not found',
                errors: null,
            };
        }

        if (exception instanceof QueryFailedError) {
            const dbError = exception as QueryFailedError & { code ?: string}
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'A database error occurred',
                errors: null,
            };
        }

        if (exception instanceof Error) {
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal server error',
                errors: null,
            };
        }
        
        return {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
            errors: null
        };
    }

    catch (exception: unknown, host: ArgumentsHost): void {
        const context = host.switchToHttp();
        const request = context.getRequest<Request>();
        const result = this.resolveException(exception);
        const response = context.getResponse(); 

        if (!result) {
            this.logger.error({
                message: 'Unknown error',
                stack: exception instanceof Error ? exception.stack : null,
                path: request.url,
                method: request.method,
            });
            return;
        }

        const { status, message, errors } = result;

        this.logger.error({
            message,
            stack: exception instanceof Error ? exception.stack : null,
            path: request.url,
            method: request.method,
            errors,
            status
        });  
        
        response.status(status).json({
            statusCode: status,
            message,
            errors,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}