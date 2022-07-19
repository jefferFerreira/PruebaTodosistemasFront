import { Routes } from '@angular/router';

import { EmployeesComponent } from 'app/modules/employees/employees.component';
import { ActivitiesComponent } from 'app/modules/activities/activities.component';
import { CreateEmployeeComponent } from 'app/modules/employees/components/create-employee/create-employee.component';
import { CreateActivitiesComponent } from 'app/modules/activities/components/create-activities/create-activities.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'employees',                component: EmployeesComponent },
    { path: 'activities',               component: ActivitiesComponent },
    { path: 'employees/add',        component: CreateEmployeeComponent },
    { path: 'activities/add',       component: CreateActivitiesComponent }
];
