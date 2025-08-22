import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ApiV1Module } from './api/v1/api.module';

@Module({
  // imports: [ApiV1Module],
  imports: [ApiV1Module],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
      // .forRoutes({ path: 'cats', method: RequestMethod.GET });
      // consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);  // multiple middlewares
      // .exclude(
      //   { path: 'cats', method: RequestMethod.GET },
      //   { path: 'cats', method: RequestMethod.POST },
      //   'cats/{*splat}',
      // )
  }
}
