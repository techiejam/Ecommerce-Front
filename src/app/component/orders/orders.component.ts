import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserdataService } from 'src/app/service/data/userdata.service';
import { HardcodeAuthenticationService } from 'src/app/service/hardcode-authentication.service';
import { Accounts } from '../Admin/listusers/listusers.component';
import { Categories1 } from '../dashboard/dashboard.component';
import { Customer } from '../history/history.component';



@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  accountId: number;
  productId: number;
  total: number;
  quantity: number;
  cato: Categories1;

  acc: Accounts; //


  customer = new Customer(0, 0, '', new Date(), '', '', '', 0, 0, '', '', '', '', '', '', '', '', '', '', 0, '');
  constructor(public hardcodeAuthenticationService: HardcodeAuthenticationService, private route: ActivatedRoute, private router: Router, private userdataService: UserdataService) { }
  ac: number = this.customer.caccid;
  ngOnInit(): void {
    this.accountId = this.route.snapshot.params['aid'];
    this.productId = this.route.snapshot.params['pid'];
    console.log(this.productId)
    this.total = this.route.snapshot.params['total'];
    this.quantity = this.route.snapshot.params['qun'];
    //to change one entity to other entity
    this.customer.totalAmount = this.total;
    this.customer.productQuantity = this.quantity;

    this.userdataService.getbyid(this.productId).subscribe(
      Response => {
        this.cato = Response
        this.customer.category = Response.category;
        this.customer.productName = Response.productName;
        this.customer.productType = Response.productType;
        this.customer.productPrice = Response.productPrice;
        this.customer.productSize = Response.productSize;
        this.customer.productBrand = Response.productBrand;
        this.customer.material = Response.material;
        this.customer.productWeight = Response.productWeight;
        this.customer.productFlavour = Response.productFlavour;
        this.customer.gender = Response.gender;
        this.customer.productColor = Response.productColor;
        this.customer.productSpecifications = Response.productSpecifications;
        this.customer.productAbout = Response.productAbout;
        this.customer.productSelflife = Response.productSelflife;
        this.customer.imgLink = Response.link
        console.log(Response)
      })
    this.userdataService.findbyid(this.accountId).subscribe(
      Response => {
        this.customer.caccid = Response.accountId;
        this.customer.cmailPhonenumber = Response.accountPhone;

        console.log(this.customer.caccid)

      })
  }

  tohistory() {
    this.userdataService.customerorder(this.customer).subscribe(
      Response => {
        console.log("inside post")
        this.router.navigate(['dashboard', this.accountId])
      })
  }


}

