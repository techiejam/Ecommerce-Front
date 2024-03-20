import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserdataService } from 'src/app/service/data/userdata.service';
import { HardcodeAuthenticationService } from 'src/app/service/hardcode-authentication.service';
import { Cart } from '../cart/cart.component';
import { Customer } from '../history/history.component';
import { Find } from '../profile/profile.component';

@Component({
  selector: 'app-cartpurchase',
  templateUrl: './cartpurchase.component.html',
  styleUrls: ['./cartpurchase.component.css']
})

export class CartpurchaseComponent implements OnInit {
  accountId: number;
  totalamount: number;
  f: Find;
  cartstr: string;
  cart: Cart[] = [];
  cartItems: Customer[] = [];
  cart1: Cart;
  constructor(public hardcodeAuthenticationService: HardcodeAuthenticationService, private route: ActivatedRoute, private router: Router, private userdataService: UserdataService) { }
  ngOnInit(): void {
    this.accountId = this.route.snapshot.params['aid'];
    this.cartstr = this.route.snapshot.params['str'];
    this.cart = JSON.parse(this.cartstr); //string to array 
    console.log(this.cart)
    let customer: Customer;
    this.cart.forEach(item => {
      customer = new Customer(0, 0, '', new Date(), '', '', '', 0, 0, '', '', '', '', '', '', '', '', '', '', 0, '');
      if (item.productQuantity > 0) {
        customer.productQuantity = item.selectedQty;
        customer.totalAmount = item.selectedQty * item.productPrice;
        console.log(customer);
        this.getProductDetailsById(customer, item.productId);
      }

    });
  }
  getProductDetailsById(customer: Customer, prodId: number) {
    this.userdataService.getbyid(prodId).subscribe(
      Response => {
        customer.category = Response.category;
        customer.productName = Response.productName;
        customer.productType = Response.productType;
        customer.productPrice = Response.productPrice;
        customer.productSize = Response.productSize;
        customer.productBrand = Response.productBrand;
        customer.material = Response.material;
        customer.productWeight = Response.productWeight;
        customer.productFlavour = Response.productFlavour;
        customer.gender = Response.gender;
        customer.productColor = Response.productColor;
        customer.productSpecifications = Response.productSpecifications;
        customer.productAbout = Response.productAbout;
        customer.productSelflife = Response.productSelflife;
        customer.imgLink = Response.link
      })
    this.getAcctDetails(customer);
  }
  getAcctDetails(customer: Customer) {
    this.userdataService.findbyid(this.accountId).subscribe(
      Response => {
        customer.caccid = Response.accountId;
        customer.cmailPhonenumber = Response.accountPhone;
      })
    this.cartItems.push(customer);
    //this.updateQty();

  }
  updateQty(customer: Customer) {
    console.log(customer);
    this.userdataService.customerorder(customer).subscribe(
      Response => {
        console.log(Response)

      })

  }
  tohistory() {
    this.cartItems.forEach(customer => {
      this.updateQty(customer);

    });
    this.cart.forEach(carts => {    //carts our new object
      if (carts.productQuantity > 0) {
        this.userdataService.deletecartbyid(this.accountId, carts.cartId).subscribe(
          Response => {
            console.log(Response)
          })
      }
    })

    this.router.navigate(['dashboard', this.accountId])

  }
}
