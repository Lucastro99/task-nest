import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Task } from '../entities/task.entity';

@Injectable()
export class TaskCreatedObserver {
  @OnEvent('task.created') // Use a anotação OnEvent para ouvir o evento 'task.created'
  handleTaskCreated(task: Task) {
    // Lógica para lidar com a tarefa criada
    console.log('Nova tarefa criada:', task);
  }
}
