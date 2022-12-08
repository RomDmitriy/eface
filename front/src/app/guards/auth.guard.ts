import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

export class AuthGuard implements CanActivate{

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
    if (!Boolean(localStorage.getItem('access-item'))) {
      alert('Please, log in first!');
    }
    return Boolean(localStorage.getItem('access-item'));
  }
}
