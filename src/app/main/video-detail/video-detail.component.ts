import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs';
import { VideoService } from 'src/app/_services/video.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {
  constructor(private _service: VideoService, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.Id = params["id"];
    });
    this.getData();
  }

  video: any = {
    Name: '',
    Description: '',
    Link: '',
    Detail: ''
  };
  Id: any;
  public baseUrl = 'https://localhost:5000/uploads/';

  getData() {
    this._service.GetById(this.Id).pipe(first())
      .subscribe((res: any) => {
        this.video = res;
        this.video.Link = this.sanitizer.bypassSecurityTrustHtml(res.Link);
        console.log(this.video.Link)
      });
  }

}
