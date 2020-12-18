import { Component, OnInit } from '@angular/core';
import { TaskserviceService } from './../services/taskservice.service';
import { Todos, Tasks } from './../model/taskmodel'
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  todos: Todos[]
  // todos: FormArray
  task: Tasks
  // taskForm: FormGroup
  // todoArray: FormArray
  // id: number

  constructor(private taskservice: TaskserviceService, 
              private activatedRoute: ActivatedRoute,
              // private fb: FormBuilder,
              ) { }

  ngOnInit(): void {
    const task_id = this.activatedRoute.snapshot.params['t']
    const name = this.activatedRoute.snapshot.params['n']
    const imageurl = this.activatedRoute.snapshot.params['im']
    const priority = this.activatedRoute.snapshot.params['pr']
    const due_date = this.activatedRoute.snapshot.params['due']
    this.task = {task_id, name, imageurl, priority, due_date}
    
    // console.log(this.task.task_id)
    this.getTodos(this.task.task_id)

    // this.taskForm = this.createTodo()
    // this.todoArray = this.taskForm.get('todos') as FormArray
    // if ( this.id != 0 ) {
    //   this.getTodos(this.id)
    // } else {
    //   this.todos = []
    // }
  }

  getTodos(id): void {
    this.taskservice.getOneTask(id)
      .subscribe(tododata => {
        this.todos = tododata;
        console.info('todo  ---> ', this.todos);
      });
  }

  toggleStatus(id, i) {
    console.log('todo_id',  id)
    this.todos[i].status = !this.todos[i].status
    const status = this.todos[i].status
    const todoname = this.todos[i].todoname
    const todoid = id
    this.taskservice.updateTodoStatus({todoid, todoname, status}).subscribe()
  }
  // createTodo(): FormGroup {
  //   return this.fb.group({
  //     todo: this.fb.array([])
  //   })
  // }

  addTodo() {

  }

  delTodo() {

  }
}
