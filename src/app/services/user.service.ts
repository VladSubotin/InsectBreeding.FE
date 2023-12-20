import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "https://192.168.31.62:7202/api/User";
  public token = "";
  public userId = "";
  
  constructor(private http: HttpClient) {  
    this.token = localStorage.getItem('auth-token') || '';
    this.userId = localStorage.getItem('user-id') || '';
  }
  
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/getAll`);
  }

  public getUser(): Observable<User> {
    const token = this.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.url}/get`, { headers });
  }

  public registerUser(user: User): Observable<User> {
    const token = this.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const newUser = {
      email: user.email,
      firstName: user.firstName, 
      lastName: user.lastName,
      password: user.password,
      role: "user"
    }
    return this.http.post<User>(`${this.url}/add`, newUser, { headers });
  }

  public login(newUser: User): Observable<{token: string}> {
    const loginForm = {
      email: newUser.email, 
      password: newUser.password
    }
    return this.http.post<{token: string}>(`${this.url}/login`, loginForm);
  }

  public logout() {
    this.userId = "";
    this.token = "";
    localStorage.clear();
  }

  public editUser(user: User): Observable<User> {
    const token = this.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const editUser = {
      id: user.id,
      firstName: user.firstName, 
      lastName: user.lastName,
      password: user.password
    }
    return this.http.put<User>(`${this.url}/update`, editUser, { headers });
  }

  public deleteUser(id: string): Observable<null> {
    const token = this.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<null>(`${this.url}/delete/?id=${id}`, { headers });
  }
}
