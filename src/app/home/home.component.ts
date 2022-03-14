import { Component, OnInit } from '@angular/core';
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users: any = []

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((res:any)=>{
      this.users = res.data
    })
  }

}
