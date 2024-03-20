import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HardcodeAuthenticationService } from 'src/app/service/hardcode-authentication.service';

@Component({
  selector: 'app-adminmenu',
  templateUrl: './adminmenu.component.html',
  styleUrls: ['./adminmenu.component.css']
})
export class AdminmenuComponent implements OnInit {
  acctid:number;
  public isUserLoggedIn:boolean=false;
  constructor(public hardcodeAuthenticationService:HardcodeAuthenticationService,private route:ActivatedRoute,private router:Router){}
  ngOnInit(): void {
   
   this.isUserLoggedIn=this. hardcodeAuthenticationService.isUserLoggedIn();
  }


  
}
