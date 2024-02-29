import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { APP_CONFIG, AppConfig } from '../config';
import { BaseHttpService } from './base-http.service';
import { PeopleResponse, Response, StarshipResponse } from './http.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService extends BaseHttpService {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {
    super();
    HttpService.API_URL = this.config.API_URL || environment.API_URL;
  }

  getPeopleResource(): Observable<Response> {
    const request = this.http.get<Response>(`${HttpService.API_URL}people?page=${1}&limit=${65}`);
    return this.handleRequest(request);
  }
  getStarShipsResource(): Observable<Response> {
    const request = this.http.get<Response>(`${HttpService.API_URL}starships?page=${1}&limit=${65}`);
    return this.handleRequest(request);
  }

  getStarshipByID(id: string): Observable<StarshipResponse> {
    const request = this.http.get<StarshipResponse>(`${HttpService.API_URL}starships/${id}`);
    return this.handleRequest(request);
  }

  getPeopleByID(id: string): Observable<PeopleResponse> {
    const request = this.http.get<PeopleResponse>(`${HttpService.API_URL}people/${id}`);
    return this.handleRequest(request);
  }
}
