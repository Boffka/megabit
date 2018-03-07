import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector   : 'app-register',
  templateUrl: './register.component.html',
  styleUrls  : ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email   : ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  signUp() {
    console.log(this.signupForm.valid);
    if (this.signupForm.valid) {
      this.auth.signup(this.signupForm.getRawValue()).then(user => {
        console.log(user);
      }, console.error)
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

}
