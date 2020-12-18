import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Tasks } from './../model/taskmodel';
import { TaskserviceService } from './../services/taskservice.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Tasks[]

  constructor(private taskservice: TaskserviceService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTasks()
  }

  getTasks(): void {
    this.taskservice.getAllTasks()
      .subscribe(taskdata => {
        this.tasks = taskdata;
        // console.info('tasks  ---> ', this.tasks);
      });
  }

  goTodolist(t) {
    this.router.navigate(["/todolist", t.task_id, t.name, t.imageurl, t.priority, t.due_date])
  }
  
  editTask(t) {
    // console.info('t -->', t)
    this.router.navigate(["/task", t.task_id, t.name, t.imageurl, t.priority, t.due_date])
  }

  deleteTask(id) {
    // console.info('id ---> ', id)
    if (confirm('Are you sure you want to delete')) {
      this.taskservice.delOneTask(id)
        .subscribe(() => {
          this.getTasks()
        })
    }
  }

}
