import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CharactersOnlyValidator, MobileNumberValidator } from '../Helper/customValidators';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  id: string = '';
  user: any;
  role: string = ''
  myReactiveForm!: FormGroup;
  constructor(private route: ActivatedRoute, private service: UserService, private router: Router) {
    const userData = localStorage.getItem('UserData');
    this.route.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.id = params['id'];
        this.service.getSingleUser(this.id).subscribe(user => {
          this.user = user;
          this.myReactiveForm.patchValue(user)
        })
      } else
        if (userData != null) {
          const parseObj = JSON.parse(userData)
          this.role = parseObj.role[0]
          if (parseObj.role[0] != 'admin')
            this.id = parseObj._id
        }
        else
          this.id = '';
    })

  }

  ngOnInit(): void {
    console.log("Hello");
    this.myReactiveForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required, CharactersOnlyValidator]),
      'lastName': new FormControl(null, [Validators.required, CharactersOnlyValidator]),
      // 'mobile_no': new FormControl(null, [Validators.required, MobileNumberValidator]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.maxLength(12)]),
      role: new FormArray([])
    })
    this.service.getSingleUser(this.id).subscribe(user => {
      console.log(user);
      this.user = user;
      this.myReactiveForm.patchValue(user)
    },
      err => {
        console.log(err);
      })
  }

  onCheckboxChange(event: any) {

    const selectedRoles = (this.myReactiveForm.controls['role'] as FormArray);
    if (event.target.checked) {
      selectedRoles.push(new FormControl(event.target.value));
    } else {
      const index = selectedRoles.controls
        .findIndex(x => x.value === event.target.value);
      selectedRoles.removeAt(index);
    }
  }

  onSubmit() {
    console.log(this.myReactiveForm.value);
    this.myReactiveForm.markAllAsTouched();
    if (this.myReactiveForm.valid)
      if (this.id != '') {
        this.service.UpdateUser(this.id, this.myReactiveForm.value).subscribe(res => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Updated Successfully...!',
            timer: 2000
          })
          this.router.navigate(['/dashboard']);
        }, err => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err,
            timer: 2000
          })
        })
      }
      else {
        console.log(this.myReactiveForm.value);
        this.service.RegisterUser(this.myReactiveForm.value).subscribe(res => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'User Added Successfully...!',
            timer: 2000
          })
          if (this.role == 'admin')
            this.router.navigate(['users']);
          else
            this.router.navigate(['/login']);
        }, err => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err,
            timer: 10000
          })
        })
      }

  }
}
