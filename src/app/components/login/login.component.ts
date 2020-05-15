import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public credentials: {
    email: string;
    password: string;
  };

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.credentials = {
      email: '',
      password: ''
    };
  }

  login() {
    this.userService.checkCredentials(this.credentials).subscribe( user => {
      if (user) {
        this.userService.finalCheckIn(user);
      }
    });
  }
}
