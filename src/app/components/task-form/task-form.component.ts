import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../models/task.module';
import { v4 as uuidv4 } from 'uuid';
import { TaskService } from '../../services/task.service'; 

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {}


  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        ...this.taskForm.value,
        status: 'to-do' // Assuming new tasks are added as 'to-do'
      };

      // Add the new task using the TaskService
      this.taskService.addTask(newTask);
      this.taskForm.reset();
    }
  }
}