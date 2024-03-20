import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HardcodeAuthenticationService } from 'src/app/service/hardcode-authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  accountId: string;
  pname: string;
  public isUserLoggedIn: boolean = false;
  constructor(public hardcodeAuthenticationService: HardcodeAuthenticationService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {

    this.isUserLoggedIn = this.hardcodeAuthenticationService.isUserLoggedIn();
  }
  searchprod() {
    this.router.navigate(['search', this.pname])
  }

}
