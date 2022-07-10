import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  hide = true;

  registerForm!: FormGroup;
  id!: string;
  isRegister: boolean = false;
  myDataList: Array<any> = [];

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id != undefined && this.id != null && this.id != '') {
      this.isRegister = true;
      this.getDataById(this.id);
    }

    console.log(
      'Check editing customer id =====>> ',
      this.id,
      'isRegister-->> ',
      this.isRegister
    );

    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,  Validators.minLength(5)]],
      mobile: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  get fullName() {
    return this.registerForm.get('fullName');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get mobile() {
    return this.registerForm.get('mobile');
  }
 

  get form() {
    return this.registerForm.controls;
  }

  saveRegisterData() {
    const registerDataObj = {
      fullName: this.form['fullName'].value,
      email: this.form['email'].value,
      password: this.form['password'].value,
      mobile: this.form['mobile'].value,
    };
    console.log('Register Data Object is =====> ', registerDataObj);

    this.dataService.saveRegisterData(registerDataObj).subscribe((response) => {
      if (response && response != null && response != undefined) {
        alert('Your are Successfully registered');
      } else {
        this.isRegister = false;
      }
    });
    this.registerForm.reset();
  }

  updateRegisterData() {
    const registerDataObj = {
      fullName: this.form['fullName'].value,
      email: this.form['email'].value,
      password: this.form['password'].value,
      mobile: this.form['mobile'].value,
    };
    console.log('Register Data Object is =====> ', registerDataObj);

    this.dataService.updateRegisterData(this.id,registerDataObj).subscribe((response) => {
      if (response && response != null && response != undefined) {
        alert('Your Data Is Successfully Updated');
      } else {
        this.isRegister = false;
      }
    });
    this.registerForm.reset();
  }

  getDataById(dataId: any) {
    this.dataService.getDataById(dataId).subscribe((res) => {
      const response = res?.[0] || {}
      console.log('Check edit response ---->> ', response);
      this.registerForm = this.formBuilder.group({
        fullName: response.fullName,
        email: response.email,
        password: response.password,
        mobile: response.mobile,
      });
    });
  }

  resetRegisterData(){
    this.registerForm.reset();
  }

}
