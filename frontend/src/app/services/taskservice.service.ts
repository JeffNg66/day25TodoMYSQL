import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Tasks, Todos } from '../model/taskmodel';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(environment.apiUrl + '/tasks')
      .pipe(
        tap(_ => console.log('fetched tasks')),
        catchError(this.handleError<Tasks[]>('getAllTasks', []))
      );
  }

  getOneTask(id): Observable<Todos[]> {
    return this.http.get<Todos[]>(environment.apiUrl + '/tasks/' + id)
      .pipe(
        tap(_ => console.log('fetched one task')),
        catchError(this.handleError<Todos[]>('getOneTask', []))
      );
  }

  delOneTask(id): Observable<Todos[]> {
    return this.http.delete<Todos[]>(environment.apiUrl + '/del/' + id)
      .pipe(
        tap(_ => console.log('delete one task')),
        catchError(this.handleError<Todos[]>('delOneTask', []))
      );
  }
 
 addNewTask(task: Tasks): Observable<Tasks> {
    return this.http.post<Tasks>(environment.apiUrl + '/add/', task, this.httpOptions).pipe(
      tap(() => console.log(`added task`)),
      catchError(this.handleError<Tasks>('addNewTask'))
    );
  }

  updateTask(task: Tasks): Observable<Tasks> {
    return this.http.put<Tasks>(environment.apiUrl + '/update/', task, this.httpOptions)
      .pipe(
      tap(() => console.log(`added task`)),
      catchError(this.handleError<Tasks>('addNewTask'))
    );
  }

  updateTodoStatus(todo: Todos): Observable<Todos> {
    return this.http.put<Todos>(environment.apiUrl + '/upda/', todo, this.httpOptions)
      .pipe(
      tap(() => console.log(`added task`)),
      catchError(this.handleError<Todos>('updateTodoStatus'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

}
