import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees/employees.component';
import { ActivitiesComponent } from './activities/activities.component';
import { CreateEmployeeComponent } from './employees/components/create-employee/create-employee.component';
import { CreateActivitiesComponent } from './activities/components/create-activities/create-activities.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    EmployeesComponent,
    ActivitiesComponent,
    CreateEmployeeComponent,
    CreateActivitiesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,           
    MatNativeDateModule,
  ]
})
export class ModulesModule { }
