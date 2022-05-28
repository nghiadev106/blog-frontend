import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs';
import { VideoService } from 'src/app/_services/video.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  constructor(private _service: VideoService) { }

  ngOnInit(): void {
    this.getData();
  }

  bigVideo: any;
  videos: any;
  topVideo: any;
  totalCount: any;
  Id: any;
  pageSize = 12;
  public baseUrl = 'https://localhost:5000/uploads/';

  getData() {
    this._service.GetVideo(this.pageSize).pipe(first())
      .subscribe((res: any) => {
        this.bigVideo = res.bigVideo;
        this.videos = res.videos;
        this.topVideo = res.topVideo;
        this.totalCount = res.totalCount;
        console.log(res);
      });
  }

  showMore() {
    this.pageSize = this.pageSize + 12;
    this.getData();
  }
}
