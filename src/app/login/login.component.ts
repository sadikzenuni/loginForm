import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../_services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {DataService} from "../_helpers/data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {
  loading = false
  submitted = false;
  loginData!: FormGroup;

  info: any;
  subscription:any =  Subscription;
  error:any;

  constructor(private auth: AuthService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginFunction()
  }

  loginFunction(){
    this.loginData = this.fb.group({
      email:['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get i() {
    return this.loginData.controls;
  }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginData.invalid) {
      return;
    }

    this.loading = true;
    this.auth.login(this.i['email'].value, this.i['password'].value).subscribe(date=>{
      this.router.navigate(['/home'])
        .then(() => {
          window.location.reload();
        });
    },
      error => {
        this.error =error.error.error
        this.loading = false;
      });

  }

}
