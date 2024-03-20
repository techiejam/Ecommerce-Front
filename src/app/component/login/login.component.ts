import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HardcodeAuthenticationService } from 'src/app/service/hardcode-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  accountId!: string; //number to string bcoz hardcode neded
  accountEmail!: string;
  accountPassword!: string;
  constructor(public hardcodeAuthenticationService: HardcodeAuthenticationService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void { }



  handlelogin() {
    this.hardcodeAuthenticationService.authenticate(this.accountEmail, this.accountPassword).subscribe
      (Response => {

        if (Response == null) { alert("USERNAME OR PASSWORD IS INCORRECT") }
        else if (this.accountEmail == null || this.accountPassword == null) {
          alert("YOU CANNOT LEAVE USERNAME OR PASSWORD AS EMPTY ")
        }
        else {
          this.accountId = Object.values(Response)[0];
          console.log(this.accountId);
          sessionStorage.setItem('accountId', this.accountId);
          this.router.navigate(['dashboard', this.accountId]);

        }
      })

  }

  createacc() {
    console.log(this.createacc)
    this.router.navigate(['createaccount']);
  }

  forgotpass() {
    this.router.navigate(['forgotpass'])
  }

}
