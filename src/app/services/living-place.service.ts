import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { LivingPlace } from '../models/livingPlace';
import { LivingPlaceInsect } from '../models/livingPlaceInsect';
import { LivingPlaceFodder } from '../models/livingPlaceFodder';
import { RequiredTemperatureResponse } from '../models/RequiredTemperatureResponse';
import { RequiredHumidityResponse } from '../models/RequiredHumidityResponse';
import { RequiredFoddersExistenceResponse } from '../models/RequiredFoddersExistenceResponse';
import { TimeOfResidenceResponse } from '../models/TimeOfResidenceResponse';
import { FodderEnoughVolumeResponse } from '../models/FodderEnoughVolumeResponse';
import { RequiredLivingSpaceResponse } from '../models/RequiredLivingSpaceResponse';

@Injectable({
  providedIn: 'root'
})
export class LivingPlaceService {
  url = "https://192.168.31.62:7202/api";

  constructor(private http: HttpClient, private userService: UserService) { }



  public getLivingPlaces(): Observable<LivingPlace[]> {
    const userId = this.userService.userId;
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<LivingPlace[]>(`${this.url}/LivingPlace/getByUserId/?id=${userId}`, { headers });
  }

  public getLivingPlace(id: string): Observable<LivingPlace> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<LivingPlace>(`${this.url}/LivingPlace/get/?id=${id}`, { headers });
  }

  public addLivingPlace(livingPlace: LivingPlace): Observable<LivingPlace> {
    const userId = this.userService.userId;
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const addLivingPlace = {
      name: livingPlace.name,
      description: livingPlace.description,
      location: livingPlace.location,
      livingSpace: livingPlace.livingSpace,
      userId: userId
    }
    return this.http.post<LivingPlace>(`${this.url}/LivingPlace/add`, addLivingPlace, { headers });
  }

  public editLivingPlace(livingPlace: LivingPlace): Observable<LivingPlace> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const editLivingPlace = {
      id: livingPlace.id,
      name: livingPlace.name,
      description: livingPlace.description,
      location: livingPlace.location,
      livingSpace: livingPlace.livingSpace
    }
    return this.http.put<LivingPlace>(`${this.url}/LivingPlace/update`, editLivingPlace, { headers });
  }

  public deleteLivingPlace(id: string): Observable<null> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<null>(`${this.url}/LivingPlace/delete/?id=${id}`, { headers });
  }



  public getLivingPlaceInsects(livingPlaceId: string): Observable<LivingPlaceInsect[]> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<LivingPlaceInsect[]>(`${this.url}/InsectLivingPlace/getByLivingPlaceId/?id=${livingPlaceId}`, { headers });
  }

  public getLivingPlaceInsect(livingPlaceId: string, insectId: string): Observable<LivingPlaceInsect> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<LivingPlaceInsect>(`${this.url}/InsectLivingPlace/get?insectId=${insectId}&livingPlaseId=${livingPlaceId}`, { headers });
  }

  public addLivingPlaceInsect(livingPlaceInsect: LivingPlaceInsect): Observable<LivingPlaceInsect> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const addLivingPlaceInsect = {
      insectId: livingPlaceInsect.insectId,
      livingPlaseId: livingPlaceInsect.livingPlaseId,
      insectCount: livingPlaceInsect.insectCount,
      settlementDate: livingPlaceInsect.settlementDate
    }
    return this.http.post<LivingPlaceInsect>(`${this.url}/InsectLivingPlace/add`, addLivingPlaceInsect, { headers });
  }

  public editLivingPlaceInsect(livingPlaceInsect: LivingPlaceInsect): Observable<LivingPlaceInsect> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const editLivingPlaceInsect = {
      insectId: livingPlaceInsect.insectId,
      livingPlaseId: livingPlaceInsect.livingPlaseId,
      insectCount: livingPlaceInsect.insectCount,
      settlementDate: livingPlaceInsect.settlementDate
    }
    return this.http.put<LivingPlaceInsect>(`${this.url}/InsectLivingPlace/update`, editLivingPlaceInsect, { headers });
  }

  public deleteLivingPlaceInsect(livingPlaceId: string, insectId: string): Observable<null> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<null>(`${this.url}/InsectLivingPlace/delete?insectId=${insectId}&livingPlaseId=${livingPlaceId}`, { headers });
  }



  public getLivingPlaceFodders(livingPlaceId: string): Observable<LivingPlaceFodder[]> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<LivingPlaceFodder[]>(`${this.url}/LivingPlaceFodder/getByLivingPlaceId/?id=${livingPlaceId}`, { headers });
  }

  public getLivingPlaceFodder(livingPlaceId: string, fodderId: string): Observable<LivingPlaceFodder> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<LivingPlaceFodder>(`${this.url}/LivingPlaceFodder/get?livingPlaseId=${livingPlaceId}&fodderId=${fodderId}`, { headers });
  }

  public addLivingPlaceFodder(livingPlaceFodder: LivingPlaceFodder): Observable<LivingPlaceFodder> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const addLivingPlaceFodder = {
      fodderId: livingPlaceFodder.fodderId,
      livingPlaseId: livingPlaceFodder.livingPlaseId,
      fodderVolume: livingPlaceFodder.fodderVolume
    }
    return this.http.post<LivingPlaceFodder>(`${this.url}/LivingPlaceFodder/add`, addLivingPlaceFodder, { headers });
  }

  public editLivingPlaceFodder(livingPlaceFodder: LivingPlaceFodder): Observable<LivingPlaceFodder> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const editLivingPlaceFodder = {
      fodderId: livingPlaceFodder.fodderId,
      livingPlaseId: livingPlaceFodder.livingPlaseId,
      fodderVolume: livingPlaceFodder.fodderVolume
    }
    return this.http.put<LivingPlaceFodder>(`${this.url}/LivingPlaceFodder/update`, editLivingPlaceFodder, { headers });
  }

  public deleteLivingPlaceFodder(livingPlaceId: string, fodderId: string): Observable<null> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<null>(`${this.url}/LivingPlaceFodder/delete?livingPlaseId=${livingPlaceId}&fodderId=${fodderId}`, { headers });
  }



  public checkRequiredTemperature(livingPlaceId: string, insectId: string): Observable<RequiredTemperatureResponse> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<RequiredTemperatureResponse>(`${this.url}/InsectLivingPlace/getRequiredTemperature?insectId=${insectId}&livingPlaseId=${livingPlaceId}`, { headers });
  }

  public checkRequiredHumidity(livingPlaceId: string, insectId: string): Observable<RequiredHumidityResponse> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<RequiredHumidityResponse>(`${this.url}/InsectLivingPlace/getRequiredHumidity?insectId=${insectId}&livingPlaseId=${livingPlaceId}`, { headers });
  }

  public checkRequiredFoddersExistence(livingPlaceId: string, insectId: string): Observable<RequiredFoddersExistenceResponse> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<RequiredFoddersExistenceResponse>(`${this.url}/InsectLivingPlace/getRequiredFoddersExistence?insectId=${insectId}&livingPlaseId=${livingPlaceId}`, { headers });
  }

  public checkLivingTimeIsUp(livingPlaceId: string, insectId: string): Observable<TimeOfResidenceResponse> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<TimeOfResidenceResponse>(`${this.url}/InsectLivingPlace/getLivingTimeIsUp?insectId=${insectId}&livingPlaseId=${livingPlaceId}`, { headers });
  }

  public checkFodderEnoughVolume(livingPlaceId: string, fodderId: string): Observable<FodderEnoughVolumeResponse> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<FodderEnoughVolumeResponse>(`${this.url}/LivingPlaceFodder/getFodderVolumeEnough?livingPlaseId=${livingPlaceId}&fodderId=${fodderId}`, { headers });
  }

  public checkRequiredLivingSpace(livingPlaceId: string): Observable<RequiredLivingSpaceResponse> {
    const token = this.userService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<RequiredLivingSpaceResponse>(`${this.url}/LivingPlace/getRequiredLivingSpace?id=${livingPlaceId}`, { headers });
  }
}
