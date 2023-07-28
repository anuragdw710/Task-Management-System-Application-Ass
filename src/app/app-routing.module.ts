import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskPageComponent } from './components/task-page/task-page.component';
import { DetailTaskComponent } from './components/detail-task/detail-task.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';

const routes: Routes = [
  { path: '', component: TaskPageComponent },
  { path: 'detail-task/:id', component: DetailTaskComponent },
  { path: 'edit/:taskId', component: TaskEditComponent }, // Route for TaskEditComponent with taskId parameter
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
