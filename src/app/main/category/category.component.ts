import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { first } from 'rxjs';
import { BlogService } from 'src/app/_services/blog.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  private routeReuseStrategy: any;
  constructor(private _service: BlogService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.routeReuseStrategy = this.router.routeReuseStrategy.shouldReuseRoute;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.Id = params["id"];
    });
    this.getData();
  }

  bigBlog: any;
  blogs: any;
  categoryName: any;
  Id: any;
  totalCount: any;
  pageSize = 10;
  public baseUrl = 'https://localhost:5000/uploads/';

  getData() {
    this._service.GetByCategory(this.Id, this.pageSize).pipe(first())
      .subscribe((res: any) => {
        this.bigBlog = res.bigBlog;
        this.blogs = res.blogs;
        this.categoryName = res.categoryName;
        this.totalCount = res.totalCount;
      });
  }

  showMore() {
    this.pageSize = this.pageSize + 10;
    this.getData();
  }
}
