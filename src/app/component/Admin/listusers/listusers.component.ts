import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserdataService } from 'src/app/service/data/userdata.service';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css']
})
export class ListusersComponent implements OnInit {
  accounts: Accounts[] = []
  //b=confirm("DO YOU WANT TO DELETE FOR SURE!!!");
  //a=alert(this.b)
  b: any;
  name: string;
  constructor(private userdataService: UserdataService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'];
    console.log('inside the onginit')
    this.userdataService.getallaccounts().subscribe(Response => { this.accounts = Response })
  } //end of ng


  //delete acc
  deleteacc(accountId: number) {

    this.b = confirm("DO YOU WANT TO DELETE FOR SURE!!!")
    if (this.b == true) {
      this.userdataService.deleteaccbyid(accountId).subscribe(
        Response => {
          this.accounts = Response
          console.log(Response)
          alert("Selected Record Is Deleted")
        })
    }
    else {
      alert("You decided not to delete")
    }
  }
  back() {
    this.router.navigate(['adminwelcome', this.name])
  }
}
export class Accounts {
  constructor(

    public accountId: number,
    public firstName: string,
    public lastName: string,
    public accountEmail: string,
    public accountPhone: string,
    public address: string,
    public accountPassword: string,
    public accountCreatedDate: Date
  ) { }
}
