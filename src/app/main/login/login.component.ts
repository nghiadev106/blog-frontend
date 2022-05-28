import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/authen.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private messageService: MessageService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.authenticationService.logout();
    this.formLogin = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  onLogin() {
    var userLogin = {
      Username: this.formLogin.controls['username'].value,
      Password: this.formLogin.controls['password'].value,
    };
    this.spinner.show();
    this.authenticationService
      .login(userLogin)
      .pipe(first())
      .subscribe(
        (user) => {
          if (user !== null) {
            this.spinner.hide();
            if (user.UserRole === 'Admin' || user.UserRole === 'Customer') {
              this.messageService.add({
                severity: 'success',
                summary: 'Thông báo',
                detail: 'Đăng nhập thành công !',
              });
              this.router.navigateByUrl('/');
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Đăng nhập không thành công',
                detail: 'Bạn không có quyền truy cập',
              });
            }

          } else {
            this.spinner.hide();
          }
        },
        (err) => {
          if (err.StatusCode) {
            this.messageService.add({
              severity: 'error',
              summary: err.Message || 'Đăng nhập thất bại',
              detail: err.Errors || 'Đăng nhập thất bại',
            });
          }
          this.spinner.hide();
        }
      );
  }
  clearFormLogin() {
    this.formLogin.reset();
  }

}
