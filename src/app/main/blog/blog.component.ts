import { SurveyService } from './../../_services/survey.service';
import { Router } from '@angular/router';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { first, map } from 'rxjs/operators';
import { BlogService } from 'src/app/_services/blog.service';
import { of as observableOf, fromEvent } from 'rxjs';
import { FileUpload } from 'primeng/fileupload';
import { AuthenticationService } from 'src/app/_services/authen.service';
import { CategoryService } from 'src/app/_services/category.service';
import { UtilityService } from 'src/app/_services/utility.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [MessageService, FormBuilder, UtilityService]
})
export class BlogComponent implements OnInit {
  public Editor = ClassicEditor;
  formAdd!: FormGroup;
  formLogin!: FormGroup;
  blogs: any;
  categories: any;
  user: any;
  public baseUrl = 'https://localhost:5000/uploads/';
  @ViewChildren(FileUpload) files!: QueryList<FileUpload>;
  constructor(
    private messageService: MessageService,
    private categoryService: CategoryService,
    private blogService: BlogService,
    private fb: FormBuilder,
    private route: Router,
    private authenService: AuthenticationService,
    private utilityService: UtilityService,
    private surveyService: SurveyService
  ) { }
  ngOnInit(): void {
    this.user = this.authenService.userValue();
    this.checkSurvey();
    this.formAdd = this.fb.group({
      Name: this.fb.control('', [Validators.required, Validators.maxLength(250)]),
      Description: this.fb.control(''),
      Detail: this.fb.control(''),
      CategoryId: this.fb.control('', [Validators.required]),
      Status: this.fb.control(1),
      Url: this.fb.control(''),
      IsHot: this.fb.control(false),
      IsNew: this.fb.control(false)
    });
    this.loadCategories();
  }

  public createAlias() {
    this.formAdd.controls['Url'].setValue(this.utilityService.MakeSeoTitle(this.formAdd.controls['Name'].value));
  }

  checkSurvey() {
    if (this.user.UserId) {
      this.surveyService
        .checkSurvey(this.user.UserId, 6004)
        .pipe(first())
        .subscribe({
          next: (res: any) => {
            if (res === 0) {
              this.route.navigateByUrl('/khao-sat');
            }
          },
          error: (err: any) => {
            this.messageService.add({
              severity: 'error',
              summary: err.Message || 'Có lỗi vui lòng thử lại sau',
              detail: err.Errors || 'Có lỗi vui lòng thử lại sau',
            });
          },
        });
    }

  }

  loadCategories(): void {
    this.categoryService
      .GetAll()
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          this.categories = res;
        },
        error: (err: any) => {
          this.messageService.add({
            severity: 'error',
            summary: err.Message || 'Có lỗi vui lòng thử lại sau',
            detail: err.Errors || 'Có lỗi vui lòng thử lại sau',
          });
        },
      });
  }

  onAdd(): void {
    this.getEncodeFromImage(this.files.first).subscribe({
      next: (data: any) => {
        console.log(data)
        let data_image = data == '' ? null : data;
        var blog = this.formAdd.value;
        blog.Image = data_image;
        blog.CreateBy = this.user.FullName || 'Admin';
        this.blogService
          .add(blog)
          .pipe(first())
          .subscribe({
            next: (res: any) => {
              if (res !== null) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Thông báo',
                  detail: 'Thêm thành công !',
                });
                this.clearModalAdd();
                this.route.navigate(['/'])
              }
            },
            error: (err: any) => {
              this.messageService.add({
                severity: 'error',
                summary: err.Message || 'Có lỗi vui lòng thử lại sau',
                detail: err.Errors || 'Có lỗi vui lòng thử lại sau',
              });
            },
          });
      }
    });
  }

  clearModalAdd() {
    this.formAdd = this.fb.group({
      Name: this.fb.control('', [Validators.required, Validators.maxLength(250)]),
      Description: this.fb.control(''),
      Detail: this.fb.control(''),
      CategoryId: this.fb.control(''),
      Status: this.fb.control(1),
      Url: this.fb.control(''),
      IsHot: this.fb.control(false),
      IsNew: this.fb.control(false),
    });
  }

  public getEncodeFromImage(fileUpload: FileUpload) {
    if (fileUpload) {
      if (fileUpload.files == null || fileUpload.files.length == 0) {
        return observableOf('');
      }
      let file: File = fileUpload.files[0];
      let reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      return fromEvent(reader, 'load').pipe(
        map((e) => {
          let result = '';
          let tmp: any = reader.result;
          let baseCode = tmp.substring(tmp.indexOf('base64,', 0) + 7);
          result = file.name + ';' + file.size + ';' + baseCode;
          return result;
        })
      );
    } else {
      return observableOf('');
    }
  }

}
