import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Region } from '../interfaces/Region';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  private apiGetAllUrl = 'https://localhost:7178/api/Region/all';
  private apiPostUrl = 'https://localhost:7178/api/Region/create';
  private apiDeleteUrl = 'https://localhost:7178/api/Region/delete/{id}';
  private apiPutUrl = 'https://localhost:7178/api/Region/edit/{id}';

  constructor(private http: HttpClient) {}

  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.apiGetAllUrl);
  }

  addRegion(region: Region): Observable<Region> {
    return this.http.post<Region>(this.apiPostUrl, region);
  }

  deleteRegion(id: number): Observable<void> {
    return this.http.delete<void>(this.apiDeleteUrl.replace('{id}', id.toString()));
  }

  updateRegion(region: Region): Observable<Region> {
    return this.http.put<Region>(this.apiPutUrl.replace('{id}', region.id.toString()), region);
  }
}
