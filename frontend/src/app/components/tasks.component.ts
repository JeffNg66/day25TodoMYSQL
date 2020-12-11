import { Component, OnInit } from '@angular/core';
import { Tasks } from './../model/taskmodel';
import { TaskserviceService } from './../services/taskservice.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Tasks[]

  constructor(private taskservice: TaskserviceService) { }

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

  deleteTask(id) {
    console.info('id ---> ', id)
    this.taskservice.delOneTask(id)
      .subscribe(() => {
        this.getTasks()
      })
  }

}
