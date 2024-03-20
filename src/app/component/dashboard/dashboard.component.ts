import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserdataService } from 'src/app/service/data/userdata.service';
import { HardcodeAuthenticationService } from 'src/app/service/hardcode-authentication.service';
import { Find } from '../profile/profile.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  accountId: number;
  pname: string;
  productId: number;
  firstName: string;
  prodlist: Categories1[] = [];
  public isUserLoggedIn: boolean = false;
  constructor(private userdataService: UserdataService, public hardcodeAuthenticationService: HardcodeAuthenticationService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.accountId = this.route.snapshot.params['id'];
    this.isUserLoggedIn = this.hardcodeAuthenticationService.isUserLoggedIn();

    this.userdataService.getproducts().subscribe(Response => { this.prodlist = Response })
    this.userdataService.findaccbyid(this.accountId).subscribe(
      Response => {
        this.firstName = Response.firstName;
      }
    )
  }
  searchprod() {
    console.log(this.pname)
    this.router.navigate(['search', this.accountId, this.pname])
  }

  //buy
  viewprod(productId: number) {
    this.router.navigate(['buy', productId, this.accountId])
  }

  allproducts() {
    this.userdataService.getproducts().subscribe(
      Response => {
        this.prodlist = Response
      })

  }

  electronicProducts() {
    this.userdataService.searchcategory("electronics").subscribe(
      Response => {
        this.prodlist = Response;
      }
    )
  }
  menProducts() {
    this.userdataService.searchcategory("men").subscribe(
      Response => {
        this.prodlist = Response;
      }
    )
  }
  womenProducts() {
    this.userdataService.searchcategory("women").subscribe(
      Response => {
        this.prodlist = Response;
      }
    )
  }
  kidsProducts() {
    this.userdataService.searchcategory("kids").subscribe(
      Response => {
        this.prodlist = Response;
      }
    )
  }
  footwearProducts() {
    this.userdataService.searchcategory("footwear").subscribe(
      Response => {
        this.prodlist = Response;
      }
    )
  }

  groceryProducts() {
    this.userdataService.searchcategory("grocery").subscribe(
      Response => {
        this.prodlist = Response;
      }
    )
  }



}
export class Categories1 {

  constructor(
    public productId: number,
    public category: string,
    public productName: string,
    public productType: string,
    public productPrice: number,
    public productQuantity: number,
    public productSize: string,
    public productBrand: string,
    public material: string,
    public productWeight: string,
    public productFlavour: string,
    public gender: string,
    public productColor: string,
    public productSpecifications: string,
    public productAbout: string,
    public productSelflife: string,
    public link: string,
  ) { }
}



