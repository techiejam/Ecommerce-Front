import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodeAuthenticationService } from 'src/app/service/hardcode-authentication.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent  implements OnInit{

  username:string;
  password:string;
  errorMessage='Invalid Crediantials';
  inValidLogic=false;
  name='';
  constructor(private router:Router,public hardcodeAuthenticationService:HardcodeAuthenticationService){}
  ngOnInit(): void {
      // console.log(this.username)
      // console.log(this.password)
  }
  
   handlelogin(){
      if(this.hardcodeAuthenticationService.adminauthenticate(this.username,this.password)){
        this.inValidLogic=false;
        // console.log(this.password)
        // console.log(this.username)
        this.name=this.username;
        
        this.router.navigate(['adminwelcome',this.name]); //navigates to welcome page
      }else{
        alert("INVALID LOGIN")
        this.inValidLogic=true;
    }
   }
}
