import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { MatTableModule } from '@angular/material/table'





@NgModule({
  declarations: [
    AdminPanelComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    MatTableModule
  ]
})
export class AdminPanelModule { }
