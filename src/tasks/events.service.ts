import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Task } from '../entities/task.entity';

@Injectable()
export class EventsService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  emitTaskCreated(task: Task) {
    this.eventEmitter.emit('task.created', task);
  }
}
