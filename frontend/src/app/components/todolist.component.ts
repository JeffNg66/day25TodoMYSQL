import { Component, OnInit } from '@angular/core';
import { TaskserviceService } from './../services/taskservice.service';
import { TodoList } from './../model/taskmodel'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  todos: TodoList[]
  id: number

  constructor(private taskservice: TaskserviceService, 
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['todoId']
    if ( this.id != 0 ) {
      this.getTodos(this.id)
    } else {
      this.todos = []
    }
  }

  getTodos(id): void {
    this.taskservice.getOneTask(id)
      .subscribe(tododata => {
        this.todos = tododata;
        console.info('todo  ---> ', this.todos);
      });
  }

}
