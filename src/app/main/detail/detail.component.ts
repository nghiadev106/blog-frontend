import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { first } from 'rxjs';
import { BlogService } from 'src/app/_services/blog.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [BlogService]
})
export class DetailComponent implements OnInit {
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

  detail: any;
  lstTopBlogs: any;
  topReated: any;
  related: any;
  lstByCategory: any;
  Id: any;
  public baseUrl = 'https://localhost:5000/uploads/';

  getData() {
    this._service.GetById(this.Id).pipe(first())
      .subscribe((res: any) => {
        console.log(res.related);
        this.detail = res.detail;
        this.lstTopBlogs = res.lstTopBlogs;
        this.topReated = res.topReated;
        this.related = res.related;
        this.lstByCategory = res.lstByCategory;

      });
  }

}
