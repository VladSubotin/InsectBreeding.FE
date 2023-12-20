import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fodder } from '../models/fodder';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FodderService {
  url = "https://192.168.31.62:7202/api";
  
  constructor(private http: HttpClient, private userService: UserService) { }

  public getFodders(): Observable<Fodder[]> {
    const userId = this.userService.userId;
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Fodder[]>(`${this.url}/Fodder/getByUserId/?id=${userId}`, { headers });
  }

  public getFodder(id: string): Observable<Fodder> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Fodder>(`${this.url}/Fodder/get/?id=${id}`, { headers });
  }

  public addFodders(fodder: Fodder): Observable<Fodder> {
    const userId = this.userService.userId;
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const addFodder = {
      name: fodder.name, 
      description: fodder.description, 
      userId: userId
    }
    return this.http.post<Fodder>(`${this.url}/Fodder/add`, addFodder, { headers });
  }

  public editFodders(fodder: Fodder): Observable<Fodder> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const editFodder = {
      id: fodder.id,
      name: fodder.name, 
      description: fodder.description
    }
    return this.http.put<Fodder>(`${this.url}/Fodder/update`, editFodder, { headers });
  }

  public deleteFodder(id: string): Observable<null> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<null>(`${this.url}/Fodder/delete/?id=${id}`, { headers });
  }

}
