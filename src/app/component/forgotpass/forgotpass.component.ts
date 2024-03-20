import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserdataService } from 'src/app/service/data/userdata.service';
import { Find } from '../profile/profile.component';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {
  emailValid: boolean = true;
  isPasswordValid: boolean = true;
  isFavouriteValid: boolean = true;
  mail: string;
  find: Find;
  accountEmail: string;
  favourite:string
  accountPassword: string;
  cpass: string;
  constructor(private userdataService: UserdataService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {

  }
  updatepass() {

    console.log(this.accountEmail)
    this.userdataService.forgotpass(this.accountEmail,this.favourite).subscribe(
      Response => {
        this.find = Response
        console.log(Response)
        if (Response != null) {
          if (this.cpass == this.accountPassword) {
            this.userdataService.updatenewpassbymail(this.accountEmail, this.accountPassword, this.find).subscribe(
              Response => {
                console.log(Response)
                alert("PASSWORD SUCCESSFULLY CHANGED")
                this.router.navigate(['login'])
              }
            )
          } else {
            alert("PASSWORD AND CONFIRM PASSWORD DOES NOT MATCH")
          }

        } else {
          alert("EMAIL ID OR FAVOURITE DOES NOT MATCH")

        }
      }
    )


  }
  back()
  {
    this.router.navigate(['login']);
  }
  passwordValid(event: any) {
    event.target.value = event.target.value.trim();
    var pass = event.target.value
    this.isPasswordValid = pass.match("^[a-zA-Z0-9._-]+[@|_|&|%|*|$|-][a-zA-Z0-9-]{2,5}$") ? true : false
    console.log(this.passwordValid)
  }
  emailvalid(event: any) {
    event.target.value = event.target.value.trim();
    var email = event.target.value
    this.emailValid = email.match("^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\\.[a-zA-Z.]{2,4}$") ? true : false
    console.log(this.emailValid)
  }
  favouritevalid(event: any) {
    event.target.value = event.target.value.trim().length > 0 ? event.target.value : event.target.value.trim(); //
    console.log(event.target.value)
    var favourite = event.target.value
    this.isFavouriteValid = favourite.match(/^[A-Za-z0-9\s]*$/) && favourite.length > 0 ? true : false
    
  }
}
