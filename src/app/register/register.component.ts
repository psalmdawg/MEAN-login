

import { NgModule, Component, ViewChild } from '@angular/core';
import { UserService } from '../_services/index';
import { NgForm } from '@angular/forms';


import { Router } from '@angular/router';
// import { User } from "../models/user";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('f') signUpForm: NgForm;



  constructor(private userService: UserService, private router: Router) { }

  onSubmit() {

    this.userService.create(this.signUpForm.value.userData)
      .subscribe(
        data => {
          // this.alertService.success('Registration successful', true);
          console.log(data)
          this.router.navigate(['/login']);

        },
        error => {
          console.log(error)
          // this.alertService.error(error._body);
          // this.loading = false;
        }
      );
    }



}
