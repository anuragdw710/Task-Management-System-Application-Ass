// detail-task.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../models/task.module';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.css']
})
export class DetailTaskComponent implements OnInit {
  task: Task | undefined;

  constructor(private route: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit() {
    // Get the task ID from the route parameters
    this.route.paramMap.subscribe(params => {
      const taskId = params.get('id');
      if (taskId) {
        this.task = this.taskService.getTaskById(taskId);
      }
    });
  }
}
