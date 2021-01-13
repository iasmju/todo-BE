import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { tap } from 'rxjs/operators'
import { format } from 'util';


@Injectable()
export class LoggingInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now(); // Request start time

    return next.handle().pipe(tap((response) => {
      // After calling handle(), the RxJs response object is obtained,
      // and the return value of the routing function can be obtained by tap.

      const ctx = context.switchToHttp();
      const request = ctx.getRequest<Request>();
      const headers = ctx.getRequest().headers;

   
      // Print request method, request link, processing time and response data
      Logger.log(format(
        '%s %s %s %s%dms %s',
        'method: ' + request.method,
        '| host: ' + headers.host,
        '| url: ' + request.url,
        '| time: ',
        Date.now() - start,
        '| response: ' + JSON.stringify(response),
      ),
      "LoggingInterceptor");


    }));
  }
}