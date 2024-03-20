import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import {  Categories } from 'src/app/component/Admin/list-acc/list-acc.component';
import { Accounts } from 'src/app/component/Admin/listusers/listusers.component';
import { Bankserver } from 'src/app/component/buynow/buynow.component';
import { Cart } from 'src/app/component/cart/cart.component';

import { Create } from 'src/app/component/createaccount/createaccount.component';
import { Categories1 } from 'src/app/component/dashboard/dashboard.component';
import { Customer } from 'src/app/component/history/history.component';



import { Find } from 'src/app/component/profile/profile.component';


@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private http:HttpClient,
    ) { }

  createAccount(create:Create){
    return this.http.post<Create>(`http://localhost:8080/saveaccs`,create);
    }

    findbyid(aid:number){
      return this.http.get<Find>(`http://localhost:8080/findbyacid/${aid}`)
    }

updatebyid(mailid:string,find:Find){
  return this.http.put<Find>(`http://localhost:8080/updatebymailid/${mailid}`,find)
}

getproducts(){
  return this.http.get<Categories1[]>(`http://localhost:8080/findallproducts`)
 
}

getproductbyid(id:number){
return this.http.get<Categories1>(`http://localhost:8080/getbypid/${id}`)
}


searchproduct(pname:string){
  return this.http.get<Categories1[]>(`http://localhost:8080/findbyproductname/${pname}`)
}

updatesetquantity(pqun:number,pid:number,categories:Categories){
  return this.http.put<Categories>(`http://localhost:8080/updatequn/${pqun}/${pid}`,categories)
}

checkbyemail(mail:string){
  console.log(mail)
  return this.http.get<Accounts>(`http://localhost:8080/findbymobemail/${mail}`)
}

checkbyphone(mob:string){
  console.log(mob)
  return this.http.get<Accounts>(`http://localhost:8080/findbymobnum/${mob}`)
}

customerorder(customer:Customer){
return this.http.post<Customer>(`http://localhost:8080/savecustprod`,customer)
}

findbycustomaccid(acid:number){
  return this.http.get<Customer[]>(`http://localhost:8080/findcustomeraccid/${acid}`)
}


savecart(cart:Cart){
  return this.http.post<Cart>(`http://localhost:8080/savecart`,cart)
}

getcartbyid(aid:number){
  return this.http.get<Cart[]>(`http://localhost:8080/findcartbyaccid/${aid}`)
}

deletecartbyid(aid:number,cid:number){
  return this.http.delete<Cart>(`http://localhost:8080/deletecartbyid/${aid}/${cid}`)
}
findupi(upi:string){
  return this.http.get<Bankserver>(`http://localhost:8080/findbyupi/${upi}`)
}

findcardcvv(cnum:number,cvv:number,edate:Date){
  return this.http.get<Bankserver>(`http://localhost:8080/findcardnumcvv/${cnum}/${cvv}/${edate}`)
}

updatenewpassbymail(mail:string,npass:string,find:Find){
  return this.http.put<Find>(`http://localhost:8080/updatenewpass/${mail}/${npass}`,find)
}
updateaddressbyid(aid:number,add:string,find:Find)
{
  return this.http.put<Find>(`http://localhost:8080/updateaddress/${aid}/${add}`,find)
}

noduplicateproduct(accid:number,pid:number){
  return this.http.get<Cart>(`http://localhost:8080/findbyaccid/${accid}/${pid}`)
}

searchcategory(category:string){
  return this.http.get<Categories1[]>(`http://localhost:8080/searchcategory/${category}`)
}

//forgot pass 
forgotpass(mail:string,fav:string){
return this.http.get<Create>( `http://localhost:8080/findbymailandfav/${mail}/${fav}`)
}
//for admin update categories

getallproducts(){
   return this.http.get<Categories[]>(`http://localhost:8080/findallproducts`)
  
 }
 
 getallaccounts(){
  return this.http.get<Accounts[]>(`http://localhost:8080/findallaccounts`)
 
}

saveproduct(findAll:Categories){
  console.log("Inside saveproduct")
  return this.http.post<Categories>(`http://localhost:8080/saveproducts`,findAll)
}

updateproducts(pid:number,categories:Categories){
  return this.http.put<Categories>(`http://localhost:8080/updatebyid/${pid}`,categories)
}

getbyid(id:Number){
  return this.http.get<Categories>(`http://localhost:8080/getbypid/${id}`)
}

deletebyid(pid:number){
  return this.http.delete<Categories[]>(`http://localhost:8080/deletebypid/${pid}`)
}

deleteaccbyid(aid:number){
  return this.http.delete<Accounts[]>(`http://localhost:8080/deletebyaid/${aid}`)
}

listofsoldprod(){
  return this.http.get<Customer[]>(`http://localhost:8080/findallsoldprod`)
}

findaccbyid(aid:number){

    return this.http.get<Find>(`http://localhost:8080/findbyacid/${aid}`)
}

}
