import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(task: Task): Promise<Task> {
    return this.tasksRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: Task): Promise<Task> {
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    await this.tasksRepository.update(id, updateTaskDto);
    return this.tasksRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // or throw an error if not found
    await this.tasksRepository.delete(id);
  }
}
