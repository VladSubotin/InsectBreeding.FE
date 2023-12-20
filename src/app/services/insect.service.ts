import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { Insect } from '../models/insect';
import { InsectFodder } from '../models/insectFodder';

@Injectable({
  providedIn: 'root'
})
export class InsectService {
  url = "https://192.168.31.62:7202/api";

  constructor(private http: HttpClient, private userService: UserService) { }

  public getInsects(): Observable<Insect[]> {
    const userId = this.userService.userId;
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Insect[]>(`${this.url}/Insect/getByUserId/?id=${userId}`, { headers });
  }

  public getInsect(id: string): Observable<Insect> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Insect>(`${this.url}/Insect/get/?id=${id}`, { headers });
  }

  public addInsect(insect: Insect): Observable<Insect> {
    const userId = this.userService.userId;
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const addInsect = {
      name: insect.name, 
      description: insect.description, 
      minTemperature: insect.minTemperature,
      maxTemperature: insect.maxTemperature,
      minHumidity: insect.minHumidity,
      maxHumidity: insect.maxHumidity,
      minLivingSpace: insect.minLivingSpace,
      lifeSpan: insect.lifeSpan,
      userId: userId
    }
    return this.http.post<Insect>(`${this.url}/Insect/add`, addInsect, { headers });
  }

  public editInsect(insect: Insect): Observable<Insect> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const editInsect = {
      id: insect.id,
      name: insect.name, 
      description: insect.description, 
      minTemperature: insect.minTemperature,
      maxTemperature: insect.maxTemperature,
      minHumidity: insect.minHumidity,
      maxHumidity: insect.maxHumidity,
      minLivingSpace: insect.minLivingSpace,
      lifeSpan: insect.lifeSpan
    }
    return this.http.put<Insect>(`${this.url}/Insect/update`, editInsect, { headers });
  }

  public deleteInsect(id: string): Observable<null> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<null>(`${this.url}/Insect/delete/?id=${id}`, { headers });
  }


  
  public getInsectFodders(insectId: string): Observable<InsectFodder[]> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<InsectFodder[]>(`${this.url}/InsectFodder/getByInsectId/?id=${insectId}`, { headers });
  }

  public getInsectFodder(insectId: string, fodderId: string): Observable<InsectFodder> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<InsectFodder>(`${this.url}/InsectFodder/get?insectId=${insectId}&fodderId=${fodderId}`, { headers });
  }

  public addInsectFodder(insectFodder: InsectFodder): Observable<InsectFodder> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const addInsectFodder = {
      insectId: insectFodder.insectId,
      fodderId: insectFodder.fodderId,
      fodderConsumptionVolume: insectFodder.fodderConsumptionVolume 
    }
    return this.http.post<InsectFodder>(`${this.url}/InsectFodder/add`, addInsectFodder, { headers });
  }

  public editInsectFodder(insectFodder: InsectFodder): Observable<InsectFodder> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const editInsectFodder = {
      insectId: insectFodder.insectId,
      fodderId: insectFodder.fodderId,
      fodderConsumptionVolume: insectFodder.fodderConsumptionVolume 
    }
    return this.http.put<InsectFodder>(`${this.url}/InsectFodder/update`, editInsectFodder, { headers });
  }

  public deleteInsectFodder(insectId: string, fodderId: string): Observable<null> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<null>(`${this.url}/InsectFodder/delete?insectId=${insectId}&fodderId=${fodderId}`, { headers });
  }
  
}
