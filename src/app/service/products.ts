import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Products {
  constructor( private http:HttpClient){}
  getProduct(){
  const url = "https://dummyjson.com/products";
  return this.http.get(url);
}
addProduct(product:any){
  const url  = 'https://dummyjson.com/products/add';
  return this.http.post(url,product);
}
deleteProduct(id: number) {
  const url = `https://dummyjson.com/products/${id}`;
  return this.http.delete(url);
}
updateProduct(id:number , updatedProduct:any){
    const url = `https://dummyjson.com/products/${id}`;
  return this.http.patch(url,updatedProduct);
}

}

