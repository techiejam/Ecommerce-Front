import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserdataService } from 'src/app/service/data/userdata.service';
import { HardcodeAuthenticationService } from 'src/app/service/hardcode-authentication.service';
import { Categories1 } from '../dashboard/dashboard.component';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  catogory: Categories1[] = [];
  pname: string;
  accid: number;
  productid: number;
  accountId: number;
  constructor(public hardcodeAuthenticationService: HardcodeAuthenticationService, public userdataService: UserdataService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.accid = this.route.snapshot.params['id'];

    this.pname = this.route.snapshot.params['pname'];
    this.userdataService.searchproduct(this.pname).subscribe(
      Response => {
        this.catogory = Response
      })
  }

  searchproduct(productId: number) {
    this.router.navigate(['buy', productId, this.accid])

  }

  searchprod() {
    console.log(this.searchprod)
    console.log(this.pname)
    this.userdataService.searchproduct(this.pname).subscribe(
      Response => {
        this.catogory = Response
      })
    // this.router.navigate(['search',this.accid,this.pname])
  }

  back() {
    console.log(this.accountId)
    this.router.navigate(['dashboard', this.accid])
  }

  home() {
    this.router.navigate(['dashboard', this.accid])
  }
}