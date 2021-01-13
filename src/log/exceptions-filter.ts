import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const start = Date.now(); // Request start time


    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      typeof exception.message === 'string'
        ? exception.message
        : exception.message.message;

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      time:Date.now() - start +' ms',
      url: request.url,
      message: message,
    };
    
    Logger.error(
      `method: ${request.method} | url: ${request.url} | status: ${status} | exception: ${exception.stack}` ,
      '',
      //JSON.stringify(errorResponse),
      'ExceptionsFilter',
      true,
    );
    
    response.status(status).json(errorResponse);
  }
}