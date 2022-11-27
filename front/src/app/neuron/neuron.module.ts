import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NeuronRoutingModule } from './neuron-routing.module';
import { CameraComponent } from './camera/camera.component';
import { ResultComponent } from './result/result.component';


@NgModule({
  declarations: [
    CameraComponent,
    ResultComponent
  ],
  imports: [
    CommonModule,
    NeuronRoutingModule
  ]
})
export class NeuronModule { }
