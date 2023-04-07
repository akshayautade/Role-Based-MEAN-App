import { Component, OnInit } from '@angular/core';
import { navbar } from 'src/app/constant/_nav';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  menu: any = []
  filteredMenus: any = []
  role: string = ''
  constructor(private service: AuthService) { }

  ngOnInit(): void {
    this.menu = navbar.menus
    const userData = localStorage.getItem('UserData');
    if (userData != null) {
      const parseObj = JSON.parse(userData)
      this.role = parseObj.role[0]
    }
    this.menu.forEach((element: any) => {
      const isRolePresent = element.roles.find((role: any) => role == this.role);
      if (isRolePresent != undefined) {
        this.filteredMenus.push(element)
      }
    });
  }

  logout() {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Log out!'
    }).then((result) => {
      if (result.value) {
        this.service.SignOut();
      }
    })
  }

}
