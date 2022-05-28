import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { first } from 'rxjs';
import { BlogService } from 'src/app/_services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [BlogService]
})
export class HomeComponent implements OnInit {
  data: any;
  lstTopBlogs: any;
  videos: any;
  blogs: any;
  topNewFeed: any;
  topVideo: any;
  topNewVideo: any;
  dataNow: any;
  public baseUrl = 'https://localhost:5000/uploads/';
  constructor(private _service: BlogService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.dataNow = new Date(Date.now()).getDate() + '/' + (new Date(Date.now()).getMonth() + 1);
    this.getData();
  }

  getData() {
    this._service.GetHome().pipe(first())
      .subscribe((res: any) => {
        this.data = res;
        this.lstTopBlogs = res.lstTopBlogs;
        this.topVideo = res.topVideo;
        this.topVideo.Link = this.sanitizer.bypassSecurityTrustHtml(res.topVideo.Link);
        this.topNewVideo = res.topNewVideo;
        this.videos = res.videos;
        this.topNewFeed = res.topNewFeed;
        this.blogs = res.blogs
      });
  }

}
