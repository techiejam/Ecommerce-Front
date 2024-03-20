import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserdataService } from 'src/app/service/data/userdata.service';


@Component({
  selector: 'app-list-acc',
  templateUrl: './list-acc.component.html',
  styleUrls: ['./list-acc.component.css']
})
export class ListAccComponent implements OnInit {
  categories: Categories[] = []
  category: Categories
  a: boolean;
  name: string;
  pname:string;
  constructor(private userdataService: UserdataService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'];
    console.log('inside the onginit')
    this.userdataService.getallproducts().subscribe(Response => { this.categories = Response })
  } //end of ng

  // button for add
  add() {
    this.router.navigate(['adminfind', -1])
  }

  //update
  updateprod(productId: number) {
    this.router.navigate(['adminfind', productId])
  }

  searchprod(){
    this.userdataService.searchproduct(this.pname).subscribe(Response => { this.categories = Response })
  }

  //delete by id
  deleteprod(productId: number) {
    this.a = confirm("ARE YOU SURE TO DELETE THIS PRODUCT")
    if (this.a == true) {
      this.userdataService.deletebyid(productId).subscribe(
        response => {
          this.categories = response
          console.log(Response)
        })
      alert("PRODUCT IS DELETED")
    } else {
      alert("YOU DECIDED NOT TO DELETE PRODUCT")
    }


  }
  back() {
    this.router.navigate(['adminwelcome', this.name])
  }

}
export class Categories {

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

