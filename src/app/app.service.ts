import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './model/user';
import { Series } from './model/series';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  serviceURL = 'http://localhost:4000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  user = new User();
  serie = new Series();
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.serviceURL}/users`);
  }

  createrUser(data: User): Observable<User> {
    const url = `${this.serviceURL}/register`;
    return this.http.post<User>(url, data);
  }

  setLoggedInUser(user: User){
    this.user = user;
  }

  setLoggedOutUser(){
    this.user = new User();
  }

  getLoggedInUser(){
    return this.user;
  }


  getSeries() {
    return this.http.get(`${this.serviceURL}/series/`);
  }

  createrSerie(data: Series): Observable<Series> {
    const url = `${this.serviceURL}/series`;
    return this.http.post<Series>(url, data);
  }

  deleteSeries(id: any){
    console.log("series delete");
    const url = `${this.serviceURL}/series/${id}`;
    return this.http.delete(url);
  }

  setSeen(id: any): Observable<any>{
    console.log("series seen");
    const url = `${this.serviceURL}/series_seen/${id}`;
    return this.http.post<Series>(url, id);
  }

  setunSeen(id: any): Observable<any>{
    console.log("series seen");
    const url = `${this.serviceURL}/series_unseen/${id}`;
    return this.http.post<Series>(url, id);
  }
}