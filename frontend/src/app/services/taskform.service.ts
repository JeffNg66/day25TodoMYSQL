import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class TaskformService {

  constructor() { }

  form: FormGroup = new FormGroup({
    task_id: new FormControl(''),
    name: new FormControl('', Validators.required),
    imageurl: new FormControl(''),
    priority: new FormControl('Low', Validators.required),
    due_date: new FormControl('', Validators.required),
  })

  initializeTaskform() {
    this.form.setValue({
      task_id: '',
      name: '',
      imageurl: '',
      priority: 'Low',
      due_date: '',
    })
  }

  populateform(task) {
    this.form.setValue(task)
  }
}
