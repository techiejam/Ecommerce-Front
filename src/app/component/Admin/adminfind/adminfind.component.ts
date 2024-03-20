import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserdataService } from 'src/app/service/data/userdata.service';
import { Categories } from '../list-acc/list-acc.component';


@Component({
  selector: 'app-adminfind',
  templateUrl: './adminfind.component.html',
  styleUrls: ['./adminfind.component.css']
})
export class AdminfindComponent implements OnInit {
  productId: number;
  name = "PK";

  //category:Categories;

  // findAll:FindAll;
  categoryy = new Categories(0, '', '', '', 0, 0, '', '', '', '', '', '', '', '', '', '', '');
  constructor(private userdataService: UserdataService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.productId = this.route.snapshot.params['productId'];
    //this.findAll=new FindAll(this.id,'','','',0,0,'','','','','','','','','','');
    if (this.productId != -1) {
      this.userdataService.getbyid(this.productId).subscribe
        (data => this.categoryy = data);

    }
  }
  //save
  addproduct() {
    console.log(this.categoryy)
    if (this.productId == -1) {
      this.userdataService.saveproduct(this.categoryy).subscribe(
        data => {
          console.log(data)
          this.router.navigate(['list-acc', this.name])
        })
    }

    else {
      this.userdataService.updateproducts(this.productId, this.categoryy).subscribe(data => {
        console.log(data)
        this.router.navigate(['list-acc', this.name])
      })
    }

  }


}