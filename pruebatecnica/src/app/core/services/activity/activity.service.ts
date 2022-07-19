import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map } from 'rxjs';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private _HTTP: HttpService) { }

  public obtainActivities() {
    return this._HTTP.get<any>(`/api/actividades`)
    .pipe(
      map(
        response => response
      )
    );
  }

  public createActivity (data) {
    return this._HTTP.post<any>(`/api/actividades`, data)
    .pipe(
      map(
        response => response
      )
    );
  }


  public updateActivity(data) {
    return this._HTTP.put<any>(`/api/actividades`, data)
    .pipe(
      map(
        response => response
      )
    )
  }

  public deleteActivity(id) {
    return this._HTTP.delete<any>(`/api/actividades/${id}`)
    .pipe(
      map(
        response => response
      )
    )
  }
}
