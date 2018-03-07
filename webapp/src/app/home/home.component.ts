import { Component, OnInit } from '@angular/core';
import { BtcApi } from '../shared/sdk/services/custom';
import { SocketService } from '../shared/services/socket/socket.service';

@Component({
  selector   : 'app-home',
  templateUrl: './home.component.html',
  styleUrls  : ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  blocks = [];
  blocksView = [];
  poolsView = [];
  poolsAllocation = [];
  xAxisLabel = 'PH/s';
  colorScheme = {
    domain: ['#F03434', '#674172', '#4183D7', '#446CB3', '#1BBC9B', '#F2784B', '#F27935', '#96281B', '#DB0A5B', '#9B59B6', '#9A12B3']
  };

  constructor(private socketService: SocketService, private btc: BtcApi) {
    this.blocksView = [window.innerWidth - 40, 200];
    this.poolsView = [window.innerWidth - 40, 400];
  }

  ngOnInit() {
    this.subscribeToBlocks();
    this.getPoolsAllocation();
  }

  subscribeToBlocks() {
    this.socketService.on('BTC:blocks').subscribe(blocks => {
      this.blocks = blocks;
    })
  }

  getPoolsAllocation() {
    this.btc.poolHashrate().subscribe(pools => {
      this.poolsAllocation = this.getPoolsAllocationChart(pools);
      console.log('Pools:::', pools)
    });
  }

  getPoolsAllocationChart(pools) {
    return pools.map(pool => {
      if (pool['relayed_by']) {
        return {
          name : pool['relayed_by'],
          value: pool['hashrate']
        }
      }
    })
  }

}
