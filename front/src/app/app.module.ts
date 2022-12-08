import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './services/test/test.component';
import { MatTableModule } from '@angular/material/table';
import {AuthGuard} from "./guards/auth.guard";




@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
