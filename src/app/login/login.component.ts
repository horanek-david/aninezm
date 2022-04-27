import { Component, OnInit } from '@angular/core';
import { loginRegData } from '../navbarlogin/nav-data-login';

import {FormControl, FormGroup, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { User } from '../model/user';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  regData = loginRegData;

  loginForm = new FormGroup(
    {
      username: new FormControl(''),
      password: new FormControl(''),
      email: new FormControl('')
    }
  );

  users: User[] = [];
  user = new User();
  username!: string;
  found = false;

  constructor(
    private router: Router,
    private appService: AppService,
    private appComponent: AppComponent
  ) {}

  ngOnInit(): void {
  }
  

  onSubmit() {
    this.appService.getUsers().subscribe((data) => {
      this.users = data as User[];
      

      for (this.user of this.users) {
        if (this.user.name ===  this.loginForm.value.username && this.loginForm.value.password === this.user.password) {
          this.found = true;
          break;
        }
      }

      if (this.found) {
        this.appService.setLoggedInUser(this.user);
        this.appComponent.onRefreshSideNav();
        this.router.navigate(['/home']);
      }else {
        alert('Sikertelen bejelentkezés! Hibás  felhasználónév vagy  jelszó.');
      }
    });
  }


}
