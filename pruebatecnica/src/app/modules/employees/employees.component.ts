import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'app/core/model/employee';
import { EmployeeService } from 'app/core/services/employee/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = []

  constructor(
    private employee: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.obtainEmployees();
  }

  obtainEmployees() {
    this.employee.obtainEmployees().subscribe(
      res => {
        this.employees = res;
      }
    );
  }

  editEmployee(key: number) {
    this.router.navigate(['empleados/agregar', key], {
      relativeTo: this.route
    });
  }

  deleteEmployee(key: number) {
    this.employee.deleteEmployee(key).subscribe(
      res => {
        this.obtainEmployees();
      }
    );
  }

}
