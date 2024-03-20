import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserdataService } from 'src/app/service/data/userdata.service';
import { HardcodeAuthenticationService } from 'src/app/service/hardcode-authentication.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  accountId: number;
  customers: Customer[] = [];
  constructor(public hardcodeAuthenticationService: HardcodeAuthenticationService, private route: ActivatedRoute, private router: Router, private userdataService: UserdataService) { }
  ngOnInit(): void {

    this.accountId = this.route.snapshot.params['id'];
    this.userdataService.findbycustomaccid(this.accountId).subscribe(
      Response => {
        if (Response.length == 0) {
          alert("NOTHING TO SHOW HERE!!!")
        } else {
          this.customers = Response
          console.log(Response)
        }

      })
  }


  back() {
    this.router.navigate(['dashboard', this.accountId])
  }
}
export class Customer {
  constructor(
    public cproductId: number, //auto
    public caccid: number, //take by acc
    public cmailPhonenumber: string, // take by acc
    public purchaseDate: Date,  //auto
    public category: string,// take by categories
    public productName: string,
    public productType: string,
    public productPrice: number,
    public productQuantity: number,
    public productSize: string,
    public productBrand: string,
    public material: string,// dress section
    public productWeight: string,
    public productFlavour: string,//beauty
    public gender: string,
    public productColor: string,
    public productSpecifications: string,
    public productAbout: string,
    public productSelflife: string, //date
    public totalAmount: number,
    public imgLink: string,
  ) { }

}


