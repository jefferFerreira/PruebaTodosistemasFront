import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map } from 'rxjs';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _HTTP: HttpService) { }

  public obtainEmployees() {
    return this._HTTP.get<any>(`/api/empleados`)
    .pipe(
      map(
        response => response
      )
    );
  }

  public createEmployee(data) {
    return this._HTTP.post<any>(`/api/empleados`, data)
    .pipe(
      map(
        response => response
      )
    );
  }


  public updateEmployee(data) {
    return this._HTTP.put<any>(`/api/empleados`, data)
    .pipe(
      map(
        response => response
      )
    )
  }

  public deleteEmployee(id) {
    return this._HTTP.delete<any>(`/api/empleados/${id}`)
    .pipe(
      map(
        response => response
      )
    )
  }
}
