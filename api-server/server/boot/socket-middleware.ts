import { BootScript } from '@mean-expert/boot-script';

const Gdax = require('gdax');
const io = require('socket.io-client');

@BootScript()
class SocketMiddleware {
  BTCEvents = ['blocks', 'tx'];
  GDAXEvents = ['msg', 'message', 'error', 'close', 'online', 'offline'];
  app;
  BTC;
  GDAX;

  constructor(app: any) {
    this.app = app;
    this.initIo();
    this.initBtcSocket();
    this.initGDAXSocket();
  }

  initIo() {
    this.app.io = require('socket.io').listen(7777, {
      transports: ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
    });
  }

  initBtcSocket() {
    this.BTC = io("https://btc.com");
    this.proxyIoEvents('BTC', this.BTCEvents);
  }

  initGDAXSocket() {
    this.GDAX = new Gdax.WebsocketClient(['BTC-EUR', 'BTC-USD'], 'wss://ws-feed.gdax.com');
    this.proxyIoEvents('GDAX', this.GDAXEvents);
  }

  proxyIoEvents(src, events) {
    events.forEach(ev => {
      console.log(`Event listener added: ${src}:${ev}`);
      this[src].on(ev, data => {
        switch (ev) {
          case('blocks'):
            return this.app.io.emit(`${src}:${ev}`, this.getBlockSize(data));
          default:
            return this.app.io.emit(`${src}:${ev}`, data);
        }
      })
    })
  }

  getBlockSize(blocks) {
    return blocks.map(block => {
      return {
        name : block['extras']['pool_name'],
        value: block['size']
      };

    })
  }
}

module.exports = SocketMiddleware;
