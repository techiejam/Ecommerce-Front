import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodeAuthenticationService } from 'src/app/service/hardcode-authentication.service';

@Component({
  selector: 'app-adminlogout',
  templateUrl: './adminlogout.component.html',
  styleUrls: ['./adminlogout.component.css']
})
export class AdminlogoutComponent implements OnInit {
  constructor(public hardcodeAuthenticationService :HardcodeAuthenticationService,private router:Router){}
  ngOnInit(): void {
    this.hardcodeAuthenticationService.logout();
    this.router.navigate(['adminlogin'])
  }

}
