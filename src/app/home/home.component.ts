import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { User } from '../_models/index'
import { UserService } from '../_services/index'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];


  @Output() changeUser = new EventEmitter();


  constructor(private userService: UserService) {

    if(localStorage.getItem('currentUser')){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser')
      )
      this.requestNewUser()
    };

  }

  requestNewUser(){
    this.changeUser.emit(this.currentUser)
  }

  ngOnInit() {
    this.loadAllUsers();
    this.requestNewUser()
  }

  deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

  private loadAllUsers() {
    this.userService.getAll()
    .subscribe(data => { this.users = data.users; });
  }
}
