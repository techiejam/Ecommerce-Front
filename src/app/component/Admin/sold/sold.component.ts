import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY_SUBSCRIPTION } from 'rxjs/internal/Subscription';
import { UserdataService } from 'src/app/service/data/userdata.service';
import { HardcodeAuthenticationService } from 'src/app/service/hardcode-authentication.service';
import { Customer } from '../../history/history.component';

@Component({
  selector: 'app-sold',
  templateUrl: './sold.component.html',
  styleUrls: ['./sold.component.css']
})
export class SoldComponent implements OnInit {
  acctid: number;
  custom: Customer[] = [];
  name: string;
  constructor(public hardcodeAuthenticationService: HardcodeAuthenticationService, private route: ActivatedRoute, private router: Router, private userdataService: UserdataService) { }
  ngOnInit(): void {
    this.name = this.route.snapshot.params['name']
    this.userdataService.listofsoldprod().subscribe(
      Response => {
        this.custom = Response
      }
    )
  }
  search() {
    this.userdataService.findbycustomaccid(this.acctid).subscribe(
      Response => {

        console.log(Response)
        console.log(this.custom)
        if (Response.length == 0) {
          alert("ACCOUNT ID DOES NOT EXISTS")
        }
        else {
          this.custom = Response
          // this.router.navigate(['adminserach',this.acctid])
        }
      }
    )

  }
  back() {
    this.router.navigate(['adminwelcome', this.name])
  }

}
