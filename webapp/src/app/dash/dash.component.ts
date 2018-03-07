import { Component, OnInit } from '@angular/core';
import { SocketService } from '../shared/services/socket/socket.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector   : 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls  : ['./dash.component.scss']
})
export class DashComponent implements OnInit {
  orders = [];
  tableRefreshTime = 2000;
  limitOrders = 10;
  displayedColumns = ['date', 'size', 'price', 'pair', 'type'];
  dataSource;
  refresh = {current: Date.now(), last: Date.now()};

  constructor(private socket: SocketService) {
    this.getDataSource();
  }

  ngOnInit() {
    this.socket.on('GDAX:message').subscribe(msg => {
      this.processMessage(msg);
    }, console.error);
  }

  processMessage(msg) {
    switch (msg.type) {
      case('done'):
        break;
      case('received'):
        this.refresh.current = Date.now();
        if (this.orders.length > this.limitOrders) {
          this.orders.pop();
        }
        this.orders.unshift([msg['order_id']] = msg);
        if (this.tableThrottle()) {
          this.getDataSource()
        }
        break;
      default:
        break;
    }
  }

  getDataSource() {
    this.refresh.last = Date.now();
    this.dataSource = new MatTableDataSource(this.orders);
  }

  tableThrottle() {
    return (this.refresh.current - this.refresh.last) > this.tableRefreshTime;
  }

}
