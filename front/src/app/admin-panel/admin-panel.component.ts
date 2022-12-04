import {Component, OnInit, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/table';
import { AdminService } from '../services/admin.service';

export interface PeriodicElement {
  email: string;
  password: string;
}

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  displayedColumns: string[] = ['email', 'password'];

  dataSource: PeriodicElement[] = [
    {email: 'loading...', password: 'loading...'},
  ];

  constructor(
    private adminService: AdminService
  ) {
  }

  ngOnInit() {
    this.adminService.getUsers().subscribe(
      data => {

          this.dataSource=data

      }
    )
  }

  save(): void {
    alert("And so?")
  }

}
