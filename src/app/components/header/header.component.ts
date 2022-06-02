import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authen.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [AuthenticationService]
})
export class HeaderComponent implements OnInit {
  fullName: any;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.getName();
  }

  getName() {
    this.fullName = localStorage.getItem('fullname');
  }

  logout() {
    this.authenticationService.logout();
    this.getName();
  }

}
