import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoopBackAuth } from '../../sdk/services/core';
import { UserApi } from '../../sdk/services/custom';

@Injectable()
export class AuthService {
  constructor(protected LBAuth: LoopBackAuth, protected userApi: UserApi, protected router: Router) {
  }

  isLogged() {
    return this.userApi.isAuthenticated();
  }

  login(credentials) {
    this.userApi.login(credentials).subscribe((token) => {
      this.LBAuth.setToken(token);
      this.LBAuth.setRememberMe(true);
      this.LBAuth.save();
      this.router.navigate(['/', 'dash']);
    })
  }

  logout() {
    this.userApi.logout().subscribe((data) => {
      this.LBAuth.clear();
      this.router.navigate(['/']);
    });
  }

  signup(credentials) {
    return new Promise((resolve, reject) => {
      this.userApi.create(credentials).subscribe((data) => {
        this.router.navigate(['/','auth','login'])
        resolve(data);
      }, reject);
    });
  }

  getCurrentUserData() {
    return this.LBAuth.getCurrentUserData()
  }

  getCurrentUserId() {
    return this.LBAuth.getCurrentUserId()
  }
}
