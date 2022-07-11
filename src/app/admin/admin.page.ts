import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  registerForm!: FormGroup;
  dataId!: string;
  isRegister: boolean = false;
  myDataList: Array<any> = [];

  constructor(
    private router: Router,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) {
    this.getAllData();
  }

  ngOnInit(): void {}

  getAllData() {
    console.log(1);
    this.dataService.getAllData().subscribe((response) => {
      this.myDataList = response;
      console.log('my data are =======>', response);
    });
  }

  deleteMyData(dataId: any) {
    this.dataService.deleteMyData(dataId).subscribe((response) => {
      alert('data deleted succefully');
      this.getAllData();
    });
  }

  editMyData(dataId: any) {
    console.log(1234);
    this.router.navigate(['edit-data', { id: dataId }], {
      relativeTo: this.activatedRoute,
    });
  }

  getLogout() {
    localStorage.clear();
    this.router.navigate(['login']);
    alert('Your are Successfully Loged Out');
  }
}
