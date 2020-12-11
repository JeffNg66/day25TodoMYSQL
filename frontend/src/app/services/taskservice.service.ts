import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Tasks, TodoList } from '../model/taskmodel';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(environment.apiUrl + '/tasks')
      .pipe(
        tap(_ => console.log('fetched tasks')),
        catchError(this.handleError<Tasks[]>('getAllTasks', []))
      );
  }

  getOneTask(id): Observable<TodoList[]> {
    return this.http.get<TodoList[]>(environment.apiUrl + '/tasks/' + id)
      .pipe(
        tap(_ => console.log('fetched one task')),
        catchError(this.handleError<TodoList[]>('getOneTask', []))
      );
  }

  delOneTask(id): Observable<TodoList[]> {
    return this.http.delete<TodoList[]>(environment.apiUrl + '/del/' + id)
      .pipe(
        tap(_ => console.log('delete one task')),
        catchError(this.handleError<TodoList[]>('delOneTask', []))
      );
  }
  // addRsvp(rsvp: Rsvp): Observable<Rsvp> {
  //   return this.http.post<Rsvp>(environment.apiUrl, rsvp, this.httpOptions).pipe(
  //     tap((newRsvp: Rsvp) => console.log(`added rsvp w/ id=${newRsvp.insertId}`)),
  //     catchError(this.handleError<Rsvp>('addRsvp'))
  //   );
  // }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

}
