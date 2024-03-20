import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HardcodeAuthenticationService } from 'src/app/service/hardcode-authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(public hardcodeAuthenticationService: HardcodeAuthenticationService, private router: Router) { }
  ngOnInit(): void {
    alert("YOU DECIDED TO LOGOUT")
    this.hardcodeAuthenticationService.logout();
    this.router.navigate(['login'])
  }

}
