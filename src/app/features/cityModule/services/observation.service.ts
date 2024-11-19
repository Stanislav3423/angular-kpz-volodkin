import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Observation } from '../interfaces/Observation';

@Injectable({
  providedIn: 'root',
})
export class ObservationService {
  private apiGetAllUrl = 'https://localhost:7178/api/Observation/all';
  private apiPostUrl = 'https://localhost:7178/api/Observation/create';
  private apiDeleteUrl = 'https://localhost:7178/api/Observation/delete/{id}';
  private apiPutUrl = 'https://localhost:7178/api/Observation/edit/{id}';

  constructor(private http: HttpClient) {}

  getObservations(): Observable<Observation[]> {
    return this.http.get<Observation[]>(this.apiGetAllUrl);
  }

  addObservation(observation: Observation): Observable<Observation> {
    return this.http.post<Observation>(this.apiPostUrl, observation);
  }

  deleteObservation(id: number): Observable<void> {
    return this.http.delete<void>(this.apiDeleteUrl.replace('{id}', id.toString()));
  }

  updateObservation(observation: Observation): Observable<Observation> {
    return this.http.put<Observation>(this.apiPutUrl.replace('{id}', observation.id.toString()), observation);
  }
}
