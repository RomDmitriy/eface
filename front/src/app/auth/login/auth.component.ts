import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  user = {
    login: "",
    password: ""
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.user).subscribe(
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
