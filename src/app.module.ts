import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Task } from './entities/task.entity';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { GzipMiddleware } from './middleware/gzip.middleware';
import { EventsService } from './tasks/events.service';
import { TaskCreatedObserver } from './tasks/task-created.observer';
import { EventEmitterModule } from '@nestjs/event-emitter';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'nest',
      synchronize: true,
      entities: [Task],
    }),
    TypeOrmModule.forFeature([Task]),
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController, TasksController],
  providers: [AppService, TasksService, EventsService, TaskCreatedObserver],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GzipMiddleware).forRoutes('*');
  }
}
