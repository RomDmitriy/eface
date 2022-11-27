import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {



  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]),
  })

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  login(): void {
    const user: any = {
      email: this.loginForm?.get('email')?.value,
      password: this.loginForm?.get('password')?.value
    };
    this.authService.login(user).subscribe(
      logged => {
        if (logged) {
          this.router.navigateByUrl('/neuron/start');
        } else {
          alert("Wrong login or password");
        }
      }
    )
  }
}
