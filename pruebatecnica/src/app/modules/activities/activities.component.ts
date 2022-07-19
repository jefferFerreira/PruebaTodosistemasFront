import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activities } from 'app/core/model/activities';
import { ActivityService } from 'app/core/services/activity/activity.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  activities: Activities[] = [];
  today = new Date();

  constructor(
    private activity: ActivityService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.obtainActivities();
  }

  obtainActivities() {
    this.activity.obtainActivities().subscribe(
      res => {
        this.activities = res;
      }
    );
  }

  editActivity(key) {
    this.router.navigate(['actividades/agregar', key], {
      relativeTo: this.route
    });
  }

  deleteActivity(key) {
    this.activity.deleteActivity(key).subscribe(
      res => {
        this.obtainActivities();
      }
    );
  }

  getDaysLate(date: Date): number {
    const newDate = new Date(date);    
    let daysLate = this.today.getTime() - newDate.getTime();
    daysLate = Math.round(daysLate/(1000*60*60*24));
    return (daysLate > 0) ? daysLate : 0;
  }
}
