import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserdataService } from 'src/app/service/data/userdata.service';
import { Accounts } from '../Admin/listusers/listusers.component';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {
  id: number;
  phone: string;
  //create:Create;
  mail: string;
  pass: string;
  length: number;
  cpass: string = "";
  con: boolean;
  fname : String='';
  lname : String='';
  email : String='';
  mobile : String='';
  address : String='';
  password : String='';
  cPassword : String='';
  favourite:string='';
  isFirstNameValid: boolean = true;
  isLastNameValid: boolean = true;
  emailValid: boolean = true;
  isMobileValid: boolean = true;
  isPasswordValid: boolean = true;
  isAddressValid: boolean = true;
  isFavouriteValid: boolean = true;
  checkmobile: Accounts;
  checkemail: Accounts;
  disableSubmit:boolean=true;
  a: any;
  b: any;
  create = new Create(0, '', '', '', '','', '', '', new Date());
  constructor(private userdataService: UserdataService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {

  }

  saveaccount(password: string, inemail: string, inmobile: string,) {
    console.log(this.saveaccount)
    this.a = this.userdataService.checkbyemail(inemail).subscribe(
      Response => {
        this.checkemail = Response
        console.log(Response)
      })

    console.log(this.checkemail)
    console.log(this.checkmobile)
    if (this.checkemail != null) {
      alert("THIS EMAILID OR MOBILE NUMBER ALREADY EXISTS")

    } else {
      if (this.cpass == password) {
        this.userdataService.createAccount(this.create).subscribe(
          data => {
            console.log(data)
            alert("ACCOUNT CREATED SUCCESSFULLY")
            this.router.navigate(['login'])
          }
        )
      }
      else {
        alert("PASSWORD DOES NOT MATCH CONFIRM PASSWORD")
      }
    }
  }
  favouritevalid(event: any) {
    event.target.value = event.target.value.trim().length > 0 ? event.target.value : event.target.value.trim(); //
    console.log(event.target.value)
    this.favourite = event.target.value
    this.isFavouriteValid = this.favourite.match(/^[A-Za-z0-9\s]*$/) && this.favourite.length > 0 ? true : false
    
    this.checkValidation();
  }

  firstnamevalid(event: any) {
    event.target.value = event.target.value.trim().length > 0 ? event.target.value : event.target.value.trim(); //
    console.log(event.target.value)
    this.fname = event.target.value
    this.isFirstNameValid = this.fname.match(/^[A-Za-z\s]*$/) && this.fname.length > 2 ? true : false
    console.log(this.isFirstNameValid);
    this.checkValidation();
  }
  lastnamevalid(event: any) {
    event.target.value = event.target.value.trim().length > 0 ? event.target.value : event.target.value.trim();
    this.lname = event.target.value
    this.isLastNameValid = this.lname.match("^[A-Za-z\s]*$") && this.lname.length > 0 ? true : false
    console.log(this.isLastNameValid);
    this.checkValidation();
  }
  emailvalid(event: any) {
    event.target.value = event.target.value.trim();
    this.email = event.target.value
    this.emailValid = this.email.match("^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\\.[a-zA-Z.]{2,4}$") ? true : false
    console.log(this.emailValid);
    this.checkValidation();
  }
  mobileValid(event: any) {
    event.target.value = event.target.value.trim();
    this.mobile = event.target.value
    let m = this.mobile.split("");
    console.log(m)
    let n = new Set(m);
    console.log(new Set(m));
    console.log(n.size)

    this.isMobileValid = this.mobile.match(/^[6-9][0-9]{9}$/) && n.size > 2 ? true : false
    console.log(this.isMobileValid)
    this.checkValidation();
  }
  passwordValid(event: any) {
    event.target.value = event.target.value.trim();
    this.password = event.target.value
    this.isPasswordValid = this.password.match("^[a-zA-Z0-9._-]+[@|_|&|%|*|$|-][a-zA-Z0-9-]{2,7}$") ? true : false
    console.log(this.passwordValid)
    this.checkValidation();
  }
  cPasswordValid(event: any) {
    event.target.value = event.target.value.trim();
    this.cPassword = event.target.value
    this.isPasswordValid = this.cPassword.match("^[a-zA-Z0-9._-]+[@|_|&|%|*|$|-][a-zA-Z0-9-]{2,7}$") ? true : false
    console.log(this.passwordValid)
    this.checkValidation();
  }
  addressValid(event: any) {
    event.target.value = event.target.value.trim().length > 0 ? event.target.value : event.target.value.trim();
    this.address = event.target.value
    this.isAddressValid = this.address.match("^[a-zA-Z0-9. ,-]{15,50}$") ? true : false
    console.log(this.addressValid)
    this.checkValidation();
  }
  checkValidation(){
    this.disableSubmit=this.isFirstNameValid && this.isLastNameValid && this.isMobileValid && this.emailValid && this.isAddressValid && this.isPasswordValid && this.fname!='' && this.lname!='' && this.email!='' && this.mobile!=''  && this.favourite!='' && this.password!='' && this.cPassword!='' ?false:true;
    return this.disableSubmit;
  }
}
export class Create {
  constructor(
    public accountId: number,
    public firstName: string,
    public lastName: string,
    public accountEmail: string,
    public accountPhone: string,
    public favourite:string,
    public address: string,
    public accountPassword: string,
    public accountCreatedDate: Date

  ) { }
}


