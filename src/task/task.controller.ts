import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {

    constructor(private taskService: TaskService) {
    } 

    @Get()
    async getAllTasks() {
      return await this.taskService.getAllTasks();
    }

    @Post('add-task')
    async addNewTask(@Body('taskDto') taskDto: TaskDto) {
      return await this.taskService.addNewTask(taskDto);
    }

    @Put('update-task/:id')
    async update(@Param('id') id: string, @Body('taskDto') taskDto: TaskDto) {
      console.log('1///',taskDto);
      return await this.taskService.editTask(id,taskDto);
    }

    @Put('checked-task/:id')
    async checked(@Param('id') id: string) {
      return await this.taskService.checkedTask(id);
    }

    @Delete('delete-task/:id')
    deleteEmployee(@Param('id') id: string) {
      return this.taskService.deleteTask(id);
    }
  
}
