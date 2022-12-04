import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NeuronRoutingModule } from './neuron-routing.module';
import { CameraComponent } from './camera/camera.component';
import { ResultComponent } from './result/result.component';
import { WebcamModule } from 'ngx-webcam';


@NgModule({
  declarations: [
    CameraComponent,
    ResultComponent
  ],
  imports: [
    CommonModule,
    NeuronRoutingModule,
    WebcamModule
  ]
})
export class NeuronModule { }
