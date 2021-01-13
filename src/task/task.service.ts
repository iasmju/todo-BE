import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto } from './task.dto';
import { Task } from './task.model';

@Injectable()
export class TaskService {
    tasks: Task[] = [new Task("0", "first task", true)];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    addNewTask(taskDto: TaskDto) {
        const id = Math.random().toString(36).substr(2, 9);
        const { name, complete } = taskDto;
        let task: Task = new Task(id, name, complete);
        this.tasks.push(task);
        return task;
    }

    async editTask(id: string, taskDto: TaskDto) {
        const { name, complete } = taskDto;

        const objIndex = await this.tasks.findIndex((task => task.id === id));
        if (this.tasks[objIndex]) {
            this.tasks[objIndex].name = name;
            this.tasks[objIndex].complete = complete;
        }
        else {
            throw new NotFoundException('Not Found');
        }
    }

    async checkedTask(id: string) {
        const objIndex = await this.tasks.findIndex((task => task.id === id));
        if(this.tasks[objIndex])
        this.tasks[objIndex].complete? this.tasks[objIndex].complete=false : this.tasks[objIndex].complete=true;
    }

    async deleteTask(id: string){
        const objIndex = await this.tasks.findIndex((task => task.id === id));
       return this.tasks.splice(objIndex, 1); 


    }

}
