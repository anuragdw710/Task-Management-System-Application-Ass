import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.module';
import { TaskService } from '../../services/task.service';
@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit {
  tasks: Task[] = [];
  isFormExpanded: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasksObservable().subscribe(tasks => {
      this.tasks = tasks;
    });
  }
}
