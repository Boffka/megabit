import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth/auth.service';
import { SocketService } from './shared/services/socket/socket.service';

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : ['./app.component.scss']
})
export class AppComponent {
  unconfirmedTransactions;

  constructor(private auth: AuthService, private socketService: SocketService) {
    this.subscribeToTX();
  }

  isLoggedIn() {
    return this.auth.getCurrentUserId();
  }

  getUsername() {
    return this.auth.getCurrentUserData()['username'];
  }

  logout() {
    this.auth.logout();
  }

  subscribeToTX() {
    this.socketService.on('BTC:tx').subscribe(tx => {
      this.unconfirmedTransactions = tx.cnt;
    })
  }

}
