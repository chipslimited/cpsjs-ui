import {observable, computed, extendObservable, toJS} from 'mobx'
import {lazyObservable, fromPromise} from 'mobx-utils'

const Account = {
  get formattedBalance() {
    return this.value.cps_balance + '' // FIXME
  },
  get hasBalance() {
    return this.value.cps_balance !== 0
  }
}

export default class Accounts {

  constructor(eos) {
    this.eos = eos
    this.accounts = {}
  }

  get(name) {
    if(this.accounts[name])
      return this.accounts[name]

    const lazy = lazyObservable(
      sink => {
        const promise = fromPromise(this.eos.getAccountAsync(name))
        extendObservable(promise, Account)
        sink(promise)
      }
    )
    lazy.refresh()
    this.accounts[name] = lazy
    return lazy
  }
}

// todo .babelrc transform-regenerator
// import {asyncAction} from 'mobx-utils'
// class C {@asyncAction *go() { const v = yield Promise.resolve(2) }}

//http://127.0.0.1:8888/v1/chain/abi_bin_to_json -X POST -d '{"code":"currency", "action":"transfer", "binargs":"000000008093dd74000000000094dd74e803000000000000"}'
