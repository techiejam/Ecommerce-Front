import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { globalVariables } from 'src/app/Common/globalVariables';
import { UserdataService } from 'src/app/service/data/userdata.service';
import { HardcodeAuthenticationService } from 'src/app/service/hardcode-authentication.service';
import { Categories } from '../Admin/list-acc/list-acc.component';
import { Bankserver } from '../buynow/buynow.component';
import { Categories1 } from '../dashboard/dashboard.component';
import { Find } from '../profile/profile.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productId: number;
  catog: Categories1;
  catogs: Categories[] = []; // array
  accountId: number;
  d: boolean;
  increment: boolean = false;
  decrement: boolean = true;
  qun: number = 0;
  created: Find;//take acc deatils
  q: boolean = true;



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
  hidebuy: boolean = false;
  showpay: boolean = true;

  bank: Bankserver = new Bankserver(0, 0, 0, '', new Date());
  cart: Cart[] = [];
  constructor(public hardcodeAuthenticationService: HardcodeAuthenticationService, private route: ActivatedRoute, private router: Router, private userdataService: UserdataService) { }
  ngOnInit(): void {
    this.accountId = this.route.snapshot.params['aid']
    this.userdataService.findbyid(this.accountId).subscribe(
      Response => { this.created = Response })

    this.userdataService.getcartbyid(this.accountId).subscribe(
      Response => {
        this.cart = Response
      })
    this.userdataService.getallproducts().subscribe(
      Response => {
        this.catogs = Response

      }
    )

  }
  onchangeqty(id: number, event: any) {  //this for dont raise the qtn in cart all  product
    this.cart.forEach(prod => {
      if (prod.productId == id) {
        prod.selectedQty = Number(event.target.value)
      }
      console.log(this.cart)
    });
  }
  gettotalprice(): number {  //this for get total price of cart 
    let totalPrice: number = 0;
    this.cart.forEach(product => {
      if (product.productQuantity > 0) //out of stock purpose didnot take amount
        totalPrice = totalPrice + (Number(product.productPrice) * product.selectedQty)
    });
    return totalPrice;
  }

  deletecart(axid: number, caxid: number) {
    this.d = confirm("CONFIRM TO REMOVE")
    if (this.d == true) {
      let i = 0; //index value

      this.userdataService.deletecartbyid(axid, caxid).subscribe(
        Response => {
          console.log(Response)
        }
      )
      this.cart.forEach(cart => {

        if (cart.cartId == caxid) {
          this.cart.splice(i, 1); //splice is remove or replacing and add one new elements in place
          console.log(this.cart);
        }
        i = i + 1; 
      });
    }

  }


  back() {
    this.router.navigate(['dashboard', this.accountId])
  }

  cartbuy() {
    this.hidebuy = true;
    this.showpay = false;

  }

  callupdateQtyService(qty: number, prodId: number, cat: Categories) {
    console.log(cat);

    this.userdataService.updatesetquantity(qty, prodId, cat).subscribe(data => {
      console.log(data)
    });
  }

  order(Upi: string, cardnum: number, cvv: number, date: Date) {
    console.log(this.paymentType)

    if (this.paymentType == "cod") {
      this.b = confirm("CONFIRM YOUR ORDER")
      if (this.b == true) {
        this.cart.forEach(item => {
          if (item.productQuantity > 0) {
            console.log("call")
            this.userdataService.getbyid(item.productId).subscribe(
              Response => {
                this.callupdateQtyService(Response.productQuantity - item.selectedQty, item.productId, Response);
              }
            );
            const str = JSON.stringify(this.cart)//array to string bcoz route no pass thr array
            this.router.navigate(['cartpurchase', this.accountId, str])
          }
        });

        // for show orders
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
            this.b = confirm("CONFIRM YOUR ORDER")
            if (this.b == true) {
              this.cart.forEach(item => {
                if (item.productQuantity > 0) {
                  this.userdataService.getbyid(item.productId).subscribe(
                    Response => {
                      this.callupdateQtyService(Response.productQuantity - item.selectedQty, item.productId, Response);
                    }
                  );
                  const str = JSON.stringify(this.cart)//array to string bcoz route non pass thr array
                  this.router.navigate(['cartpurchase', this.accountId, str])
                }
              });
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
            this.b = confirm("CONFIRM YOUR ORDER")
            if (this.b == true) {
              this.cart.forEach(item => {
                if (item.productQuantity > 0) {
                  this.userdataService.getbyid(item.productId).subscribe(
                    Response => {
                      this.callupdateQtyService(Response.productQuantity - item.selectedQty, item.productId, Response);
                    }
                  );
                  const str = JSON.stringify(this.cart)//array to string bcoz route non pass thr array
                  this.router.navigate(['cartpurchase', this.accountId, str])
                }
              });


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



export class Cart {
  constructor(
    public cartId: number,
    public accountId: number,
    public productId: number,
    public imgLink: string,
    public productName: string,
    public productBrand: string,
    public productQuantity: number,
    public selectedQty: number,
    public productPrice: number

  ) { }
}
