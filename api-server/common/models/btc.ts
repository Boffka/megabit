import { Model } from '@mean-expert/model';
const request = require('request');
/**
 * @module btc
 * @description
 * Write a useful btc Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: { name: 'before save', type: 'operation' }
  },
  remotes: {
    poolHashrate: {
      returns : { root: true, type: 'array' },
      http    : { path: '/pool/hashrate', verb: 'get' }
    }
  }
})


class btc {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {}

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('btc: Before Save');
    next();
  }
  // Example Remote Method
  poolHashrate(next: Function): void {
    request.get('https://btc.com/stats/api/realtime/poolHashrate?count=12',{json: true}, (err, data, body)=>{
      if(err) return next(err, null);
      let resp = (body)? body['data']: [];
      next(null, resp);

      //console.log(body);
    })
    //this.model.find(next);
  }
}

module.exports = btc;
