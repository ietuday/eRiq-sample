import { Component, OnInit,Inject } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { User } from '../../model/users.model';
import { Router } from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  Token: string;
  filteredUsers = [];
  users: Array<User> = [];
  selectedUser:Array<any> = [];
  constructor(private _http: Http,  private router: Router) { }

  ngOnInit() {
    this.userList();
  }

  userList() {
    this.Token = JSON.parse(sessionStorage.getItem("Token").toString());
    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + this.Token);

    let options = new RequestOptions({ headers: headers });

    this._http.get("http://10.10.20.205:8002/v1/users", options)
      .subscribe(data => {
        this.users = data.json().users;
        console.log("User's List:", this.users);
      }
      );
  }

  delete(user: User): void {
    console.log("Selected User:", user.id);
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      console.log("Length of Array : ", this.users.length);
      if (this.users[i].id == user.id) {
        index = i;
        break;
      }
    }
    this.users.splice(index, 1);
  }

  edit(user) {
    console.log(user);
    this.selectedUser = user;
    this.router.navigate(['/new-user']);

    

  }

}