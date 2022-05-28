import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './main/about/about.component';
import { BlogComponent } from './main/blog/blog.component';
import { CategoryComponent } from './main/category/category.component';
import { DetailComponent } from './main/detail/detail.component';
import { HomeComponent } from './main/home/home.component';
import { LoginComponent } from './main/login/login.component';
import { PostBlogComponent } from './main/post-blog/post-blog.component';
import { RegisterComponent } from './main/register/register.component';
import { VideoDetailComponent } from './main/video-detail/video-detail.component';
import { VideoComponent } from './main/video/video.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'bai-viet/chi-tiet/:url/:id',
    component: DetailComponent,
  },
  {
    path: ':url/:id',
    component: CategoryComponent,
  },
  {
    path: 'video',
    component: VideoComponent,
  },
  {
    path: 'video/chi-tiet/:url/:id',
    component: VideoDetailComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'dang-bai',
    component: BlogComponent,
  }
  , {
    path: 'dang-nhap',
    component: LoginComponent,
  }, {
    path: 'dang-ky',
    component: RegisterComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
