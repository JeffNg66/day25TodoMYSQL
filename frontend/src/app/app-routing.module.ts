import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './components/tasks.component';
import { TodolistComponent } from './components/todolist.component';

const routes: Routes = [
  { path: "", component: TasksComponent },
  { path: "todolist/:todoId", component: TodolistComponent},
  { path: "", redirectTo: "/", pathMatch: "full" },
  { path: "**", redirectTo: "/", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
