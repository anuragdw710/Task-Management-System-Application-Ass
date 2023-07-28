import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.module';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor() {
    this.loadTasksFromLocalStorage();
  }
  private loadTasksFromLocalStorage() {
    const tasksData = localStorage.getItem('tasks');
    if (tasksData) {
      this.tasks = JSON.parse(tasksData);
      this.tasksSubject.next(this.tasks); // Emit the loaded tasks to the observable
    }
  }

  // Get the observable to subscribe to task list changes
  getTasksObservable() {
    return this.tasksSubject.asObservable();
  }

  // Add a new task
  addTask(task: Task) {
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      dueDate: new Date(task.dueDate), // Generate a unique id using uuid
      historyLog: [{ timestamp: new Date(), action: 'Created' }], // Add the "Created" log entry
    };

    this.tasks.push(newTask);
    this.saveTasksToLocalStorage(); 
    this.tasksSubject.next(this.tasks);
  }
    // Update an existing task
    updateTask(updatedTask: Task) {
      const taskIndex = this.tasks.findIndex((task) => task.id === updatedTask.id);
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = {
          ...updatedTask,
          dueDate: new Date(updatedTask.dueDate), // Convert the dueDate to a Date object
        };
      // Add an "Edited" log entry
      this.tasks[taskIndex].historyLog.push({ timestamp: new Date(), action: 'Edited' });
      this.saveTasksToLocalStorage();
        this.tasksSubject.next(this.tasks);
      }
    }
      // Get a task by its ID
  getTaskById(taskId: string): Task | undefined {
    return this.tasks.find((task) => task.id === taskId);
  }
  // Update the status of an existing task
  updateTaskStatus(task: Task, newStatus: 'to-do' | 'in-progress' | 'completed') {
    const taskIndex = this.tasks.findIndex((t) => t.id === task.id);
    if (taskIndex !== -1) {
      this.tasks[taskIndex].status = newStatus;
      this.tasks[taskIndex].historyLog.push({ timestamp: new Date(), action: `Status changed to ${newStatus}` });
      this.saveTasksToLocalStorage();
      this.tasksSubject.next(this.tasks);
    }
  }

  // Delete a task
  deleteTask(task: Task) {
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
    this.saveTasksToLocalStorage();
    this.tasksSubject.next(this.tasks);
  }
    // Save tasks to local storage
    private saveTasksToLocalStorage() {
      console.log(this.tasks);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}
