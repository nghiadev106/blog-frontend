import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-tag-category',
  templateUrl: './tag-category.component.html',
  styleUrls: ['./tag-category.component.css']
})
export class TagCategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getData();
  }

  data: any;

  getData() {
    this.categoryService.GetAll().pipe(first())
      .subscribe((res: any) => {
        this.data = res;
      });
  }

}
