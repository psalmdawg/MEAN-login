import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  currentUser:any;

  onMain: boolean = false;
    constructor() {

    }

  }

  // setLoggedInUser(){
  //
  //   setTimeout(function(){
  //     console.log('app comp, set Logged in User called')
  //     this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
  //     console.log(this.currentUser)
  //   }, 700 )
  //
  // }
