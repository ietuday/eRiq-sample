import { Component, Inject } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Http, RequestOptions, Headers } from '@angular/http';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  confirmPassword: string;
  email: string;
  isActive: boolean;
  lastName: string;
  firstName: string;
  password: string;
  phone: string;
  Token: string;

    public file_srcs = 'assets/img/avatars/noavatar.png';
  public debug_size_before: string;
  public debug_size_after: string;
  profile_img;
  imageName = '';

  constructor(private fb: FormBuilder, private _http: Http) { }

  ngOnInit() {
    this.Token = JSON.parse(sessionStorage.getItem("Token").toString());
  }
  onSubmit() {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + this.Token);
    let options = new RequestOptions({ headers: headers });

    let body = JSON.stringify(
      {
        "confirmPassword": this.confirmPassword,
        "email": this.email,
        "firstName": this.firstName,
        "isActive": this.isActive,
        "lastName": this.lastName,
        "password": this.password,
        "phone": this.phone,
        "role": "4dac4d50-98c2-4595-a7d4-734f444b235b"
      })
    this._http.post("http://10.10.20.205:8002/v1/users", body, options).map(data => {
      console.log(data.json());
    });
    console.log(body);


  }
}
