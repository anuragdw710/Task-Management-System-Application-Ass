import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../models/task.module';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
})
export class TaskEditComponent implements OnInit {
  taskForm!: FormGroup;
  taskId!: string;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.taskForm = this.fb.group({
      title: [''],
      description: [''],
      dueDate: [''],
      priority: [''],
      status: [''],
    });

    this.route.paramMap.subscribe(params => {
      const taskId = params.get('taskId');
      if (taskId) {
        this.taskId = taskId;
        const task = this.taskService.getTaskById(this.taskId);

        if (task) {
          const dueDate = this.formatDateForForm(task.dueDate);
          this.taskForm.setValue({
            title: task.title,
            description: task.description,
            dueDate: dueDate,
            priority: task.priority,
            status: task.status,
          });
        }
      }
    });
  }
  // Custom function to format date for form control
  formatDateForForm(date: Date | string): string {
    if (!date) {
      return '';
    }

    const validDate = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(validDate.getTime())) {
      return '';
    }

    const year = validDate.getFullYear();
    const month = String(validDate.getMonth() + 1).padStart(2, '0');
    const day = String(validDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  onSaveChanges() {
    if (this.taskForm.valid) {
      const updatedTask: Task = {
        ...this.taskService.getTaskById(this.taskId),
        ...this.taskForm.value,
        dueDate: new Date(this.taskForm.value.dueDate), // Convert the string date back to a Date object
      };

      this.taskService.updateTask(updatedTask);
      this.router.navigate(['/']); // Navigate back to the TaskListComponent after saving changes
    }
  }
}
