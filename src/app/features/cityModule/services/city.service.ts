import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../interfaces/City';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private apiGetAllUrl = 'https://localhost:7178/api/City/all';
  private apiPostUrl = 'https://localhost:7178/api/City/create';
  private apiDeleteUrl = 'https://localhost:7178/api/City/delete/{id}';
  private apiPutUrl = 'https://localhost:7178/api/City/edit/{id}';

  constructor(private http: HttpClient) {}

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.apiGetAllUrl);
  }

  addCity(city: City): Observable<City> {
    return this.http.post<City>(this.apiPostUrl, city);
  }

  deleteCity(id: number): Observable<void> {
    return this.http.delete<void>(this.apiDeleteUrl.replace('{id}', id.toString()));
  }

  updateCity(city: City): Observable<City> {
    return this.http.put<City>(this.apiPutUrl.replace('{id}', city.id.toString()), city);
  }
}
