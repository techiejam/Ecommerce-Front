import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserdataService } from 'src/app/service/data/userdata.service';
import { HardcodeAuthenticationService } from 'src/app/service/hardcode-authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  accountId: number;
  find: Find;
  copass: string;
  isMobileValid: Boolean = true;
  isPasswordValid: Boolean = true;
  isAddressValid: Boolean = true;
  constructor(private userdataService: UserdataService, private route: ActivatedRoute, private router: Router, public hardcodeAuthenticationService: HardcodeAuthenticationService) { }
  ngOnInit(): void {

    this.accountId = this.route.snapshot.params['id'];
    this.userdataService.findbyid(this.accountId).subscribe(
      Response => { this.find = Response })
  }

  update(accountEmail: string, password: string) {

    if (this.copass == password) {
      this.userdataService.updatebyid(accountEmail, this.find).subscribe(
        Response => { this.router.navigate(['dashboard', this.accountId]) }
      )
    } else {
      alert("PASSWORD DOES NOT MATCH CONFIRM PASSWORD")
    }

  }

  mobileValid(event: any) {
    event.target.value = event.target.value.trim();
    var mobile = event.target.value
    let m = mobile.split("");
    console.log(m)
    let n = new Set(m);
    console.log(new Set(m));
    console.log(n.size)

    this.isMobileValid = mobile.match(/^(0|91)?[6-9][0-9]{9}$/) && n.size > 2 ? true : false
    console.log(this.isMobileValid)
  }

  addressValid(event: any) {
    event.target.value = event.target.value.trim().length > 0 ? event.target.value : event.target.value.trim();
    var add = event.target.value
    this.isAddressValid = add.match("^[a-zA-Z0-9.,_-]{15,50}$") ? true : false
    console.log(this.addressValid)
  }

  passwordValid(event: any) {
    event.target.value = event.target.value.trim();
    var pass = event.target.value
    this.isPasswordValid = pass.match("^[a-zA-Z0-9._-]+[@|_|&|%|*|$|-][a-zA-Z0-9-]{2,5}$") ? true : false
    console.log(this.passwordValid)
  }
  back() {
    console.log(this.accountId)
    this.router.navigate(['dashboard', this.accountId])
  }


}
export class Find {

  constructor(
    public accountId: number,
    public firstName: string,
    public lastName: string,
    public accountEmail: string,
    public accountPhone: string,
    public address: string,
    public accountPassword: string,
    public accountCreatedDate: Date) { }

}
