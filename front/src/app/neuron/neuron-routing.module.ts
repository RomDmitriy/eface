import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraComponent } from './camera/camera.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: 'start', component: CameraComponent},
  { path: 'result', component: ResultComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NeuronRoutingModule { }
