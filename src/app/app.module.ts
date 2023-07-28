import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskService } from './services/task.service';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { TaskPageComponent } from './components/task-page/task-page.component';
import { DetailTaskComponent } from './components/detail-task/detail-task.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskFormComponent,
    TaskListComponent,
    TaskEditComponent,
    TaskPageComponent,
    DetailTaskComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
