import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  }

  register() {
    this.userService
      .register(this.user)
      .subscribe((res) => {
        console.log(res);
        // this.router.navigate(['/login']);
      }, (error) => {
        console.error(error);
      });
  }

}
