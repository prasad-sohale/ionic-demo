import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  registerForm!: FormGroup;
  dataId!: string;
  isRegister: boolean = false;
  myDataList: Array<any> = [];

  constructor(
    private router: Router,
    private dataService: DataService,
    // private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.getAllData();
  }

  ngOnInit(): void {
    //  this.getAllData();
  }
  getAllData() {
    console.log(1);
    this.dataService.getAllData().subscribe((response) => {
      this.myDataList = response;
      console.log('my data are =======>', response);
    });
  }

  deleteMyData(dataId: any) {
      this.dataService.deleteMyData(dataId).subscribe((response) => {
        this.myDataList = response;
        console.log('data deleting data =======>', this.myDataList);
        alert('data deleted succefully');
        this.getAllData();
      });
  }

  editMyData(dataId: any) {
    this.router.navigate(['../edit-data', { id: dataId }], {
      relativeTo: this.activatedRoute,
    });
  }
  
  getLogout(){
    localStorage.clear();
    this.router.navigate(["login"]);
  }

}
