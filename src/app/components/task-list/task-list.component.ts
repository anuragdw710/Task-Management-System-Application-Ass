import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../models/task.module';
import { TaskService } from '../../services/task.service';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() tasks: Task[] = [];

  sortedTasks: Task[] = [];
  sortType: 'dueDate' | 'priority' | 'status' = 'dueDate'; // Default sort type

  constructor(private taskService: TaskService) { }
  ngOnInit() {
    this.sortTasks();
    this.taskService.getTasksObservable().subscribe(tasks => {
      this.tasks = tasks;
      this.sortTasks(); // Re-sort the tasks when the list changes
    });
  }

  // Sort tasks based on sortType
  sortTasks() {
    switch (this.sortType) {
      case 'dueDate':
        this.sortedTasks = [...this.tasks.sort((a, b) => this.compareDates(a.dueDate, b.dueDate))];
        break;
      case 'priority':
        this.sortedTasks = [...this.tasks.sort((a, b) => this.comparePriority(a.priority, b.priority))];
        break;
      case 'status':
        this.sortedTasks = [...this.tasks.sort((a, b) => this.compareStatus(a.status, b.status))];
        break;
      default:
        this.sortedTasks = this.tasks;
    }
  }

  // Helper method to compare dates (handles cases where a.dueDate or b.dueDate is not a valid Date object)
  private compareDates(a: Date, b: Date): number {
    // Check if a.dueDate and b.dueDate are valid Date objects
    if (!a || !(a instanceof Date) || !b || !(b instanceof Date)) {
      return 0; // Return 0 to keep the order unchanged
    }

    // Compare due dates
    return a.getTime() - b.getTime();
  }

  // Helper method to compare priority values
  private comparePriority(a: 'low' | 'medium' | 'high', b: 'low' | 'medium' | 'high'): number {
    const priorityOrder = { low: 3, medium: 2, high: 1 };
    return priorityOrder[a] - priorityOrder[b];
  }

  // Helper method to compare status values
  private compareStatus(a: 'to-do' | 'in-progress' | 'completed', b: 'to-do' | 'in-progress' | 'completed'): number {
    const statusOrder = { 'to-do': 1, 'in-progress': 2, completed: 3 };
    return statusOrder[a] - statusOrder[b];
  }

  // Update sort type and re-sort tasks
  onSortChange(sortType: 'dueDate' | 'priority' | 'status') {
    console.log("Sort Type:", sortType);
    this.sortType = sortType;
    this.sortTasks();
  }
  onUpdateStatus(task: Task, newStatus: 'to-do' | 'in-progress' | 'completed') {
    this.taskService.updateTaskStatus(task, newStatus);
  }
  onDeleteTask(task: Task) {
    this.taskService.deleteTask(task);
  }
  // Method to export tasks to CSV
  onExportToCSV() {
    const csvData = Papa.unparse(this.sortedTasks, {
      header: true, // Include header row based on object property names
    });

    // Create a Blob and download it as a CSV file
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
  // Method to check if a button should be disabled
  isButtonDisabled(taskStatus: 'to-do' | 'in-progress' | 'completed', buttonValue: 'to-do' | 'in-progress' | 'completed'): boolean {
    return taskStatus === buttonValue;
  }
    // Method to get the CSS class based on task status
    getStatusColorClass(status: 'to-do' | 'in-progress' | 'completed'): string {
      switch (status) {
        case 'to-do':
          return 'status-todo';
        case 'in-progress':
          return 'status-in-progress';
        case 'completed':
          return 'status-completed';
        default:
          return '';
      }
    }
    
}
