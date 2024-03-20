import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserdataService } from 'src/app/service/data/userdata.service';
import { HardcodeAuthenticationService } from 'src/app/service/hardcode-authentication.service';
import { Find } from '../../profile/profile.component';

@Component({
  selector: 'app-adminserach',
  templateUrl: './adminserach.component.html',
  styleUrls: ['./adminserach.component.css']
})
export class AdminserachComponent implements OnInit {
  accid: number;
  finds: Find;
  constructor(public hardcodeAuthenticationService: HardcodeAuthenticationService, public userdataService: UserdataService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.accid = this.route.snapshot.params['id'];
    this.userdataService.findaccbyid(this.accid).subscribe(
      Response => {
        this.finds = Response;
      }
    )
  }

}
