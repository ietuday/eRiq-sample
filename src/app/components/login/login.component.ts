import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Http, Headers, Request, Response, HttpModule, RequestOptions } from '@angular/http';

import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService],
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  res: any;
  ErrorMsg: string;

  emailFormControl = new FormControl('', [Validators.required]);

  passwordFormControl = new FormControl('', [Validators.required]);

  constructor( private login: LoginService, private router: Router) {}

  ngOnInit() { }

  onLogin() {

    const loginRequest = {
      email: this.email,
      password: this.password
    };


    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });


    let body = JSON.stringify(
      {
        'email': this.email,
        'password': this.password,
      })

    this.login.validateUser(body, options)
      .subscribe(
      data => {
        this.res = data;

        console.log(this.res.role.name);

        if (this.res.role.name == 'admin') {

          sessionStorage.setItem("Token", JSON.stringify(this.res.token));
          sessionStorage.setItem("id", JSON.stringify(this.res.id));
          sessionStorage.setItem("email", JSON.stringify(this.res.email));
          sessionStorage.setItem("name", JSON.stringify(this.res.name));

          this.router.navigate(['/home']);

        }
        else {
          this.ErrorMsg = "Invalid email id or Password";
        }

      },
      error => {
        console.log(error),
          () => console.log("validateUser() complete from loginUser " + this.res.Status)

      });
  }

}
