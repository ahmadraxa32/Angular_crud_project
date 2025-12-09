import { NgFor, NgIf } from '@angular/common';
import { Products } from './service/products';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  add_Product = { title: '' };
  next_id = 1;
  editmode: boolean = false;
  updatedTitle: string = '';
  editid: number | null = null;
  searchedtype: string = '';
  searchResult: any[] = [];
  productList: any[] = [];
  trackById(index: number, item: any) {
    return item.id;
  }
  constructor(private productService: Products) {}

  ngOnInit() {
    this.productService.getProduct().subscribe((data: any) => {
      this.productList = data.products;
    });
  }

sumbitProduct() {
  if (!this.add_Product.title.trim()) {
    alert('Product title cannot be empty');
    return;
  }

  this.productService.addProduct(this.add_Product).subscribe((res: any) => {

    const newProduct = {
      id: this.next_id++,
      title: res.title
    };

    this.productList.unshift(newProduct);

    this.add_Product.title = '';

    this.searchResult = [];
  });
}

  delete(id: number) {
    this.productService.deleteProduct(id).subscribe((res) => {
      this.productList = this.productList.filter((p) => p.id !== id);
      this.searchResult = this.searchResult.filter((p) => p.id !== id);
    });
  }

  startEdit(product: any) {
    this.editmode = true;
    this.updatedTitle = product.title;
    this.editid = product.id;
  }

  update() {
    if (this.editid === null) return;

    const updatedProduct = {
      title: this.updatedTitle,
    };

    this.productService.updateProduct(this.editid, updatedProduct).subscribe((res) => {
  const item = this.productList.find(p => p.id === this.editid);
if (item) item.title = this.updatedTitle;

      this.editmode = false;
      this.editid = null;
      this.updatedTitle = '';
      this.searchResult = []
    });
  }
  search() {
    this.searchedtype.trim().toLowerCase();
    this.searchResult = this.productList.filter(item =>
    item.title.toLowerCase().includes(this.searchedtype))
  }
}
