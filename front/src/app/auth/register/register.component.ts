import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]),
    verifyPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]),
  })

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  register(): void {
    if (this.registerForm?.get('password')?.value !== this.registerForm?.get('verifyPassword')?.value) {
      alert("Passwords should be same!");
      return;
    }
    const newUser = {
      email: this.registerForm?.get('email')?.value,
      password:this.registerForm?.get('password')?.value
    }
    // @ts-ignore
    this.authService.addUser(newUser).subscribe(
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
