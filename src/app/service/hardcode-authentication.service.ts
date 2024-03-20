import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodeAuthenticationService {

  constructor(private http:HttpClient) { }

  //login

 public isUserLoggedIn(){
  let user=sessionStorage.getItem('accountId')
  return !(user==null)
}
// public isAdminLoggedIn(){
//   let user=sessionStorage.getItem('accountId')
//   return !(user==null)
// }




//logout
logout(){
  sessionStorage.removeItem('accountId');
}
  // admin login api
  authenticate(mail:string,pass:string){
    console.log(pass)
    console.log(mail)
  return this.http.get(`http://localhost:8080/findlogin/${mail}/${pass}`);
  }

  adminauthenticate(username:string,password:string)
  {
    if((username.trim()==="admin@123") && (password.trim()==="lk@1247")){
      sessionStorage.setItem('authenticateUser',username)
      return true;
    }
    else
    {
      return false;
    }
  }
  
}
