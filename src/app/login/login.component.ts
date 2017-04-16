import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, AuthenticationService} from '../_services/index';
import { NgForm } from '@angular/forms';
import { Subscription }   from 'rxjs/Subscription';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  // currentUser:any{} = {};

;
  constructor(
    private userService: UserService,
    private router: Router,
    private authService:AuthenticationService,


  ) {}


  login(){

    const loginInfo = this.loginForm.value.userData
    const username = loginInfo.username
    const password = loginInfo.password
    this.authService.login(username, password)
    .subscribe(data => {
      this.router.navigate(['/']);
    }),
      error => {
        // console.log("error " + error.message)

          // this.alertService.error(error._body);
          // this.loading = false;
      }

    }

  ngOnInit() {
    this.authService.logout();
  }



}
