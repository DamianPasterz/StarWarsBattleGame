import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { APP_CONFIG, AppConfig } from '../config';
import { BaseHttpService } from './base-http.service';
import { PeopleResponse, PlanetResponse, Response, StarshipResponse } from './http.model';

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

  public numberOfPage = 1;
  public itemOnPage = 65;

  getPeopleResource(): Observable<Response> {
    const request = this.http.get<Response>(
      `${HttpService.API_URL}people?page=${this.numberOfPage}&limit=${this.itemOnPage}`
    );
    return this.handleRequest(request);
  }
  getStarShipsResource(): Observable<Response> {
    const request = this.http.get<Response>(
      `${HttpService.API_URL}starships?page=${this.numberOfPage}&limit=${this.itemOnPage}`
    );
    return this.handleRequest(request);
  }
  getPlanetsResource(): Observable<Response> {
    const request = this.http.get<Response>(
      `${HttpService.API_URL}planets?page=${this.numberOfPage}&limit=${this.itemOnPage}`
    );
    return this.handleRequest(request);
  }

  getPlanetByID(id: string): Observable<PlanetResponse> {
    const request = this.http.get<PlanetResponse>(`${HttpService.API_URL}planets/${id}`);
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
