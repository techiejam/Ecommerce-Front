import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PatternValidator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserdataService } from 'src/app/service/data/userdata.service';
import { HardcodeAuthenticationService } from 'src/app/service/hardcode-authentication.service';
import { Categories } from '../Admin/list-acc/list-acc.component';


import { Find } from '../profile/profile.component';

@Component({
  selector: 'app-buynow',
  templateUrl: './buynow.component.html',
  styleUrls: ['./buynow.component.css']
})
export class BuynowComponent implements OnInit {
  accountId: number;
  productId: any;
  created: Find;//take acc details
  catogored: Categories;
  id: number;
  total: number;
  quantity: number;
  b: boolean;
  a: number;
  upicheck: string;
  c: boolean;//for switch case payment
  isUpiValid: boolean = true;
  isCardValid: boolean = true;
  isCvvValid: boolean = true;
  isDateValid: boolean = true;
  paymentType: String = "cod";
  productQuantity: number;
  public show: boolean = false;
  public visibile: any = 'Show';
  public shows: boolean = false;
  public visibiles: any = 'Shows';
  public isUserLoggedIn: boolean = false;
  public isCardNumberValid: boolean = false;
  public isCvvNumberValid: boolean = false;
  address: string;

  bank = new Bankserver(0, 0, 0, '', new Date())
  constructor(public hardcodeAuthenticationService: HardcodeAuthenticationService, private route: ActivatedRoute, private router: Router, private userdataService: UserdataService) { }
  ngOnInit(): void {
    this.accountId = this.route.snapshot.params['aid'];
    this.productId = this.route.snapshot.params['pid'];
    this.total = this.route.snapshot.params['total'];
    this.quantity = this.route.snapshot.params['qun']
    this.isUserLoggedIn = this.hardcodeAuthenticationService.isUserLoggedIn();
    this.userdataService.getbyid(this.productId).subscribe(
      Response => { this.catogored = Response }
    )

    this.userdataService.findbyid(this.accountId).subscribe(
      Response => { this.created = Response })


  }
  changeaddress() {
    this.userdataService.updateaddressbyid(this.accountId, this.address, this.created).subscribe(
      Response => { console.log(Response) }
    )
  }

  home() {
    this.router.navigate(['dashboard', this.accountId])
  }
  order(productQuantity: number, prodId: number, Upi: string, cardnum: number, cvv: number, date: Date) {
    console.log(this.paymentType)
    console.log(this.catogored);

    if (this.paymentType == "cod") {
      this.b = confirm("CONFIRM YOUR ORDER")
      if (this.b == true) {
        this.a = productQuantity - this.quantity; //this.quantity is client select quan it is subtract with our stock
        console.log(this.a)
        this.userdataService.updatesetquantity(this.a, prodId, this.catogored).subscribe(data => {
          console.log(this.a)
          console.log(this.productId)
        })
        this.router.navigate(['orders', this.quantity, this.total, this.accountId, this.productId]); // for show orders
      }
    }

    if (this.paymentType == "upi") {
      this.userdataService.findupi(Upi).subscribe(
        Response => {
          // this.bank=Response
          console.log(Response)
          if (Response == null) {
            alert("UPI ID DOES NOT EXITS")
          }
          else {
            this.b = confirm("CONFIRM YOUR ORDER");
            if (this.b == true) {
              // alert("Your order is Placed");
              this.a = productQuantity - this.quantity; //this.quantity is client select quan it is subtract with our stock
              console.log(this.catogored)

              this.userdataService.updatesetquantity(this.a, prodId, this.catogored).subscribe(data => {
                console.log(this.a)

                console.log(this.productId)
              })
              this.router.navigate(['orders', this.quantity, this.total, this.accountId, this.productId]); // for show orders
              // this.router.navigate(['dashboard',this.accountId]);
            } else {
              alert("Your order is not placed")
            }
          }
        })
    }

    if (this.paymentType == "cards") {
      this.userdataService.findcardcvv(cardnum, cvv, date).subscribe(

        Response => {
          console.log(Response)
          console.log(date)
          if (Response == null) {
            alert("Card details not found")

          } else {
            this.b = confirm("CONFIRM YOUR ORDER");
            if (this.b == true) {
              // alert("Your order is Placed");
              this.a = productQuantity - this.quantity; //this.quantity is client select quan it is subtract with our stock
              console.log(this.a)
              this.userdataService.updatesetquantity(this.a, prodId, this.catogored).subscribe(data => {
                console.log(this.a)
                console.log(this.productId)
              })
              this.router.navigate(['orders', this.quantity, this.total, this.accountId, this.productId]); // for show orders
              // this.router.navigate(['dashboard',this.accountId]);
            } else {
              alert("Your order is not placed")
            }
          }
        })
    }


  }

  card(event: any) { // dropdown table
    let value = event.target.value
    switch (value) {
      case "cod":
        this.c = false;
        this.paymentType = "cod";
        break;
      case "upi":
        this.c = true;
        this.paymentType = "upi";
        break;
      case "cards":
        this.c = true;
        this.paymentType = "cards"
        break;

      default:
        break;
    }
    console.log(this.c)
    this.show = event.target.value == "cards" ? true : false;
    this.shows = event.target.value == "upi" ? true : false;
  }

  back() {
    this.router.navigate(['buy', this.productId, this.accountId])
  }

  checkupi(event: any) {
    event.target.value = event.target.value.trim();
    var pass = event.target.value.trim()
    this.isUpiValid = pass.match("^[a-zA-Z0-9._-]+@[a-zA-Z-]{3,8}$") ? true : false
    console.log(this.isUpiValid)
    if (this.isUpiValid == true && pass.length > 0) {
      this.c = false
    }
    else {
      this.c = true
    }
  }
  checkdate(event: any) {
    console.log(event.target.value);
    event.target.value = event.target.value.trim();




    var date = new Date().getDate();
    var tdate = new Date(event.target.value).getDate()
    //  this.isDateValid=date.match("^[a-zA-Z0-9._-]+@[a-zA-Z-]{3,8}$")?true:false
    //  console.log(this.isUpiValid)
    if (tdate < date) {
      this.c = false
    }
    else {
      this.c = true
    }
  }
  checkcards(event: any) {
    event.target.value = event.target.value.trim();
    var pass = event.target.value
    var ccard = event.target.value
    let m = ccard.split("");
    let n = new Set(m);
    console.log(new Set(m));
    console.log(n.size)
    this.isCardValid = pass.match("^[0-9]{16}$") && n.size > 3 ? true : false
    console.log(this.isUpiValid)
    this.isCardNumberValid = this.isCardValid
    if (this.isCardNumberValid == true && this.isCvvNumberValid == true) {
      this.c = false;
    } else {
      this.c = true
    }
  }


  checkcvv(event: any) {
    event.target.value = event.target.value.trim();
    var pass = event.target.value
    this.isCvvValid = pass.match("^[0-9._-]{3}$") ? true : false
    console.log(this.isCvvValid)
    this.isCvvNumberValid = this.isCvvValid;
    if (this.isCardNumberValid == true && this.isCvvNumberValid == true) {
      this.c = false
    } else {
      this.c = true
    }

  }



}
export class Bankserver {
  constructor(

    public id: number,
    public cCardnumber: number,
    public cCvvnumber: number,
    public cUpi: string,
    public expiryDate: Date
  ) { }
}