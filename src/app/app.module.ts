import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './main/home/home.component';
import { CategoryComponent } from './main/category/category.component';
import { AboutComponent } from './main/about/about.component';
import { DetailComponent } from './main/detail/detail.component';
import { VideoComponent } from './main/video/video.component';
import { VideoDetailComponent } from './main/video-detail/video-detail.component';
import { LoginComponent } from './main/login/login.component';
import { RegisterComponent } from './main/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { TagCategoryComponent } from './components/tag-category/tag-category.component';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostBlogComponent } from './main/post-blog/post-blog.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { BlogComponent } from './main/blog/blog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryComponent,
    AboutComponent,
    DetailComponent,
    VideoComponent,
    VideoDetailComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    HeaderComponent,
    TagCategoryComponent,
    PostBlogComponent,
    BlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    ToastModule,
    BrowserAnimationsModule,
    FileUploadModule,
    CheckboxModule,
    CKEditorModule
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
