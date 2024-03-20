import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HardcodeAuthenticationService } from 'src/app/service/hardcode-authentication.service';

@Component({
  selector: 'app-adminwelcome',
  templateUrl: './adminwelcome.component.html',
  styleUrls: ['./adminwelcome.component.css']
})
export class AdminwelcomeComponent implements OnInit {
  acctid: number;
  name: string;
  constructor(public hardcodeAuthenticationService: HardcodeAuthenticationService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'];
  }
  //productlist
  list() {
    this.router.navigate(['list-acc', this.name])
  }

  //useracc list
  userlist() {
    this.router.navigate(['listusers', this.name])
  }

  sold() {
    this.router.navigate(['sold', this.name]);
  }


}
