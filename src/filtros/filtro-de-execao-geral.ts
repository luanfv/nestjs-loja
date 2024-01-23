import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class GeneralExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapter: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const response = http.getResponse();
    const request = http.getRequest();

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
      path: this.httpAdapter.httpAdapter.getRequestUrl(request),
    };

    response.status(status).json(body);
  }
}
