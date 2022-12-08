import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { TestComponent } from './services/test/test.component';
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: 'admin', loadChildren: () => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelModule), canActivate: [AuthGuard]},
  { path: 'neuron', loadChildren: () => import('./neuron/neuron.module').then(m => m.NeuronModule), canActivate: [AuthGuard]},
  { path: 'test', component: TestComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
