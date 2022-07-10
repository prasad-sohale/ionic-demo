import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  hide = true;
  
  loginForm! : FormGroup
  isLogin:boolean = false;

  constructor(private dataService: DataService,
    private router: Router,    
    public formBuilder: FormBuilder,   
    ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({ 
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.loginForm.get("email")
  }
  get password() {
    return this.loginForm.get("password")
  }

  get form() {
    return this.loginForm.controls;
  }

  saveLoginData() {
    const loginObject = {
      email: this.form['email'].value,
      password: this.form['password'].value,
    };
    console.log('Login Object is =====> ', loginObject);

    this.dataService.saveLoginData(loginObject).subscribe((response) => {
      if (response && response != null && response != undefined) {
        localStorage.setItem("employerData", JSON.stringify(response));
        if (response.role == "admin"){
          this.router.navigate(["/admin"]);
        }else{
          this.router.navigate(["/user"]);
        }
        
      }
      else{
        this.isLogin = false;
      }
    });
    

  }

}
