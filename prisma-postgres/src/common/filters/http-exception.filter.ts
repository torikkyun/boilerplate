import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const response = ctx.getResponse<FastifyReply>();
    const status = exception.getStatus();
    const message = exception.getResponse();

    response.status(status).send({
      success: false,
      statusCode: status,
      message:
        typeof message === 'string'
          ? message
          : (message as { message: string | string[] }).message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
