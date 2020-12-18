import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormGroupDirective, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Tasks } from './../model/taskmodel';
import { TaskserviceService } from './../services/taskservice.service';
import { TaskformService } from './../services/taskform.service';

@Component({
  selector: 'app-onetask',
  templateUrl: './onetask.component.html',
  styleUrls: ['./onetask.component.css']
})
export class OnetaskComponent implements OnInit {

  // form: FormGroup
  task: Tasks
  // isEditMode: boolean = false
  priorityList: string[] = ['Low', 'Medium', 'High']
  today = new Date()
  editID: number
  editStatus: boolean = false

  constructor( //public fb: FormBuilder,
               private router: Router,
               private snackBar: MatSnackBar,
               private taskSvc: TaskserviceService,
               public taskformSvc: TaskformService,
               private activatedRoute: ActivatedRoute,
               ) { }

  ngOnInit(): void {
    const task_id = this.activatedRoute.snapshot.params['t']
    const name = this.activatedRoute.snapshot.params['n']
    const imageurl = this.activatedRoute.snapshot.params['im']
    const priority = this.activatedRoute.snapshot.params['pr']
    const due_date = this.activatedRoute.snapshot.params['due']
    this.task = {task_id, name, imageurl, priority, due_date}
    console.info('this.task', this.task)
    this.taskformSvc.populateform(this.task)
    if (name != '') this.editStatus = true
  }

  clearForm() {
    this.editStatus = false
    this.taskformSvc.form.reset()
    this.taskformSvc.initializeTaskform()
    // this.router.navigate([""])
  }

  saveThisTask() {
    console.log("form value   ", this.taskformSvc.form.value)
    // let name = this.taskformSvc.form.get('name').value
    // let imageurl = this.taskformSvc.form.get('imageurl').value
    // let priority = this.taskformSvc.form.get('priority').value
    // let due_date = this.taskformSvc.form.get('due_date').value
    
    let { task_id, name, imageurl, priority, due_date } = this.taskformSvc.form.value

    if (this.editStatus) {
      this.taskSvc.updateTask({name, imageurl, priority, due_date, task_id} as Tasks)
        .subscribe(res => {
          console.log(res)
          this.editStatus = false
          this.snackBar.open("Task Edit", "Done", {duration:3000})
          this.clearForm()
          this.router.navigate([""])
        })
    } else {
      this.taskSvc.addNewTask({name, imageurl, priority, due_date} as Tasks)
        .subscribe(task => {
          console.log(task)
          this.snackBar.open("New Task Added", "Done", {duration:3000})
          this.clearForm()
          this.router.navigate([""])
        })
    }

    // console.log('original due_date', due_date)
    // if (typeof due_date === 'string' ) {
    //   due_date = due_date.slice(0,10)
    //   due_date = new Date(due_date)
    //   let due_year = due_date.getYear()
    //   console.log('due_year', due_year)
    // } else {
    //   due_date = `${due_date._i.year}-${due_date._i.month + 1}-${due_date._i.date}`
    // }
    // console.log('due_date --> ', due_date)


  }
}
