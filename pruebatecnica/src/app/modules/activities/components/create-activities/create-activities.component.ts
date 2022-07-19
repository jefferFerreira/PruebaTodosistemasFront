import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Activities } from 'app/core/model/activities';
import { Employee } from 'app/core/model/employee';
import { ActivityService } from 'app/core/services/activity/activity.service';
import { EmployeeService } from 'app/core/services/employee/employee.service';

@Component({
  selector: 'app-create-activities',
  templateUrl: './create-activities.component.html',
  styleUrls: ['./create-activities.component.css']
})
export class CreateActivitiesComponent implements OnInit {
  public dataForm: FormGroup;
  employees: Employee[] = []

  constructor(
    private activity: ActivityService, 
    private employee: EmployeeService,
    private _formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.obtainEmployees();
    this.dataForm = this._formBuilder.group({
      codigo: [''],
      descripcion: ['',  Validators.required],
      estado: ['',  Validators.required],
      fecha_creado: [''],
      fecha_ejecucion: ['',  Validators.required],
      empleado: ['',  Validators.required]
    });
  }

  saveActivity() {
    console.log('entra', this.dataForm.valid, this.dataForm);
    if (this.dataForm.valid) {
      const data: any = this.dataForm.value;
      let employee: Employee = {
        codigo: data.empleado,
        nombres: '',
        apellidos: '',
        cedula: 0,
        edad: 0,
        telefono: 0,
        cargo: '',
      }
      let activities: Activities = {
        codigo: data.codigo,
        descripcion: data.descripcion,
        estado: data.estado,
        fecha_creado: new Date(),
        fecha_ejecucion: data.fecha_ejecucion,
        empleado: employee
      }
      this.activity.createActivity(activities).subscribe(
        res => {
          if(res) {
            this.listActivity();
          }
        }
      );
    }
  }

  listActivity() {
    this.router.navigateByUrl('/activities');
  }

  obtainEmployees() {
    this.employee.obtainEmployees().subscribe(
      res => {
        this.employees = res;
      }
    );
  }

}
