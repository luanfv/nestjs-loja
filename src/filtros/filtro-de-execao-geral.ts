import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GeneralExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const response = http.getResponse<Response>();
    const request = http.getRequest<Request>();

    const isHttpException = exception instanceof HttpException;

    if (isHttpException) {
      const status = exception.getStatus();
      const body = exception.getResponse();

      response.status(status).json(body);

      return;
    }

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const body = {
      statusCode: status,
      timestamp: new Date(),
      path: request.url,
    };

    response.status(status).json(body);
  }
}
