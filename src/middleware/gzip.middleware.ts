import { Injectable, NestMiddleware } from '@nestjs/common';
import * as compression from 'compression';

@Injectable()
export class GzipMiddleware implements NestMiddleware {
  use(req, res, next) {
    compression()(req, res, next);
  }
}
