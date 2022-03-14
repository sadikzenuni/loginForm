import {Component, OnInit} from '@angular/core';
import {AuthService} from "./_services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "./_services/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'loginForm';
  currentUser: any;
  userInfo: any;
  bgRandomColor: any

  currentRoute: any

  subscription: Subscription | undefined
  loginInfo: any

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService
              ) {
  }

  ngOnInit(): void {

    this.loginInfo = this.router.url;

    this.authService.currentUser.subscribe(user => this.currentUser = user);
    this.bgRandomColor = JSON.parse(localStorage.getItem('color') || '');

    this.userService.getUsers().subscribe((users: any) => {
      this.userInfo = users.data.find((user: any) => user.email == JSON.parse(localStorage.getItem('email') || ''));
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
