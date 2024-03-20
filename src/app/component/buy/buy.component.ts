import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserdataService } from 'src/app/service/data/userdata.service';
import { HardcodeAuthenticationService } from 'src/app/service/hardcode-authentication.service';
import { Cart } from '../cart/cart.component';
import { Create } from '../createaccount/createaccount.component';
import { Categories1 } from '../dashboard/dashboard.component';





@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  categorys: Categories1;
  id: number;
  accountId: number;
  pname: string;
  qun: number = 0;
  total: number;
  move: number;
  flag: number = 0;
  q: boolean = true;
  public isUserLoggedIn: boolean = false;
  cart = new Cart(0, 0, 0, '', '', '', 0, 0, 0)
  duplicart: Cart;
  constructor(public hardcodeAuthenticationService: HardcodeAuthenticationService, private route: ActivatedRoute, private router: Router, private userdataService: UserdataService) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.accountId = this.route.snapshot.params['aid'];
    this.isUserLoggedIn = this.hardcodeAuthenticationService.isUserLoggedIn();
    console.log(this.isUserLoggedIn)
    console.log(this.id)
    this.move = this.accountId;

    this.cart.accountId = this.accountId;// cart purpose

    this.userdataService.getproductbyid(this.id).subscribe(Response => {
      this.categorys = Response

      console.log(Response)
    })
    this.userdataService.getproductbyid(this.id).subscribe(
      Response => {
        console.log("inside cart" + this.id)
        console.log(Response)
        this.cart.productId = Response.productId;
        console.log(this.cart.productId)
        this.cart.imgLink = Response.link;
        console.log(this.cart.imgLink)
        this.cart.productName = Response.productName;
        this.cart.productPrice = Response.productPrice;
        this.cart.productQuantity = Response.productQuantity;
        this.cart.productBrand = Response.productBrand;
        this.cart.selectedQty = 1

      }
    )
  }

  home() {
    this.router.navigate(['dashboard', this.accountId])
  }
  buynowfunc(productId: number, price: number, quan: number) {
    console.log(this.qun)

    if (quan == 0) {
      alert("OUT OF STOCK!..PLEASE CHECK AFTER 24hours!!")
    } else {
      if (this.qun > quan  || this.qun<0) {
        alert("SELECTED QUANTITY IS LESS THAN ZERO OR BEYOND THE LIMIT")
      }




      else {
        if (this.qun === 0) {
          alert("PLEASE SELECT THE QUANTITY")

        } else {
          this.total = this.qun * price;
        }

      }

      console.log(this.total);
      this.router.navigate(['buynow', productId, this.accountId, this.total, this.qun])
    }
  }

  cartsave(acctid: number, productid: number) {
    this.userdataService.noduplicateproduct(acctid, productid).subscribe(
      Response => {
        console.log(Response)
        this.duplicart = Response
        console.log(this.duplicart)
        if (Response != null) {
          alert("THIS PRODUCT IS ALREADY ADDED TO YOUR CART")
        } else {

          this.userdataService.savecart(this.cart).subscribe(
            Response => {
              console.log("inside save" + this.cart)
              this.cart = Response
              console.log(Response)
            }
          )
          alert("PRODUCT ADDED TO THE CART")
        }
      }
    )


    // this.router.navigate(['cart',this.accountId])
  }

  back() {
    console.log(this.accountId)
    this.router.navigate(['dashboard', this.accountId])
  }


}


