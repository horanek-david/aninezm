import { Component, NgZone, OnInit } from '@angular/core';
import { User } from '../model/user';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { registerLoginData } from '../navbarlogin/nav-data-login';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  loginData = registerLoginData;

  users: User[] = [];
  user = new User();
  
  
  userForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    email: new FormControl()
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private appService: AppService
  ) { 
    this.validatorForm();
  }

  ngOnInit(): void {
  }

  validatorForm() {
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(9)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
    });

  }

  onSubmit(){

    this.appService.getUsers().subscribe((data)=> {
      this.users = data as User[];

      for(this.user of this.users) {
        if(this.user.name === this.userForm.value.username){
          alert("van ilyen");
          return;
        }
      }

      if(!this.userForm.valid){
        alert("helytelen");
      }else{
        var username = (document.getElementById('uname') as HTMLInputElement).value;
        var password = (document.getElementById('password') as HTMLInputElement).value;
        var email = (document.getElementById('email') as HTMLInputElement).value;
    
        this.user.name = username;
        this.user.password = password;
        this.user.email = email;
    
        this.appService.createrUser(this.user).subscribe(data => this.user);

        //oldalt átnavigálni a belépésre
        this.router.navigate(['/login']);
      }
    })



    //alert(username + " - " + password + " - " + email);
  }

}
