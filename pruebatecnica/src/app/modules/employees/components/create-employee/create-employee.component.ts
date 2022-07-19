import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'app/core/model/employee';
import { EmployeeService } from 'app/core/services/employee/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  public dataForm: FormGroup;

  constructor(
    private employee: EmployeeService, 
    private _formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.dataForm = this._formBuilder.group({
      codigo: [''],
      nombres: ['',  Validators.required],
      apellidos: ['',  Validators.required],
      cedula: ['',  Validators.required],
      edad: ['',  Validators.required],
      telefono: ['',  Validators.required],
      cargo: ['',  Validators.required]
    });
  }

  saveEmployee() {
    console.log('entra', this.dataForm.valid, this.dataForm);
    if (this.dataForm.valid) {
      const data: Employee = this.dataForm.value;
      this.employee.createEmployee(data).subscribe(
        res => {
          if(res) {
            this.listEmployee();
          }
        }
      );
    }
  }

  listEmployee() {
    this.router.navigateByUrl('/employees');
  }

}
